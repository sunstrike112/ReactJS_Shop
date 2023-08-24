import { Flex, Grid, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import DHMModal from 'dhm/components/Modal';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { DHMButton } from 'dhm/components/Button';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { WrapperForm } from 'dhm/containers/auth/styled';
import { InputForm } from 'dhm/components/Form/elements/Text';
import { WrapperSubForm } from 'dhm/components/Form/WrapperSubForm';
import { useDispatch, useSelector } from 'react-redux';
import { detailBasicInfoSub, updateBasicInfoSub, createBasicInfoSub } from 'dhm/store/basicInfo/action';
import { LoadingCommon } from 'dhm/components/Loading';
import { updateSubSummaryStaff } from 'dhm/store/summary/action';
import { ROYALTIES_OPTIONAL } from 'dhm/utils/constants/select';
import { EditIcon } from '@chakra-ui/icons';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { SelectForm } from 'dhm/components/Form/elements/Select';
import { DeleteBasicInfo } from './DeleteBasicInfo';

const templateColumns = {
  base: 'repeat(1, 1fr)',
  md: 'repeat(2, 1fr)',
  lg: 'repeat(4, 1fr)',
};

function TemplateGrid({ children }) {
  return (
    <Grid mt='10px' templateColumns={templateColumns} gap='20px'>
      {children}
    </Grid>
  );
}

export function RegForm({ originData = {}, ...props }) {
  const { tTable } = useContext(LanguageContext);
  const { loadingBasicInfoSub, basicInfoSubDetail } = useSelector((state) => state.basicInfo);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const methods = useForm({
    defaultValues: originData,
    mode: 'onChange',
  });
  const { handleSubmit, reset, setValue, getValues } = methods;

  const { can, will, royaltiesOptional, royaltiesDescription, updatedDatetime, updatedUser } = basicInfoSubDetail;
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    const onSuccess = () => {};
    const payload = {
      id: originData.employeeId,
      onSuccess,
    };
    if (isOpen) {
      dispatch(detailBasicInfoSub(payload));
      setEditing(false);
    }
  }, [isOpen]);

  const resetOriginData = () => {
    const canArr = can?.split('|') || [];
    const willArr = will?.split('|') || [];
    setValue('can1', canArr[0]?.trim());
    setValue('can2', canArr[1]?.trim());
    setValue('will1', willArr[0]?.trim());
    setValue('will2', willArr[1]?.trim());
    setValue('royaltiesOptional', +royaltiesOptional || '');
    setValue('royaltiesDescription', royaltiesDescription);
  };
  useEffect(() => {
    if (basicInfoSubDetail) {
      resetOriginData();
    }
  }, [basicInfoSubDetail]);
  const handleOpen = () => {
    reset();
    onOpen();
  };
  const handleClose = () => {
    onClose();
  };
  const onSubmit = useCallback(() => {
    const data = getValues();
    const { can1, can2, will1, will2, employeeId, royaltiesOptional: option, royaltiesDescription: description } = data;
    const dataCan = `${can1 || ''}|${can2 || ''}`;
    const dataWill = `${will1 || ''}|${will2 || ''}`;
    const dataPayload = {
      employeeId,
      royaltiesOptional: +option,
      royaltiesDescription: description,
      can: dataCan,
      will: dataWill,
    };
    const conditionUpdate = Object.keys(basicInfoSubDetail).length > 0;

    const onSucess = () => {
      handleClose();
      conditionUpdate && dispatch(updateSubSummaryStaff(dataPayload));
    };
    const payload = {
      data: dataPayload,
      onSucess: onSucess(),
    };
    dispatch(conditionUpdate ? updateBasicInfoSub(payload) : createBasicInfoSub(payload));
  }, [getValues, basicInfoSubDetail]);

  const propsModal = {
    title: tTable('quarterly_evaluation'),
    isOpen,
    onCancel: handleClose,
    onConfirm: onSubmit,
  };
  if (loadingBasicInfoSub) return <LoadingCommon />;
  return (
    <>
      <Text onClick={handleOpen} {...props}>
        四半期評価
      </Text>
      <DHMModal
        {...propsModal}
        haveConfirm
        typeConfirm='update'
        size='6xl'
        typeHeader='info'
        content={({ onOpenConfirm }) => (
          <FormProvider {...methods}>
            <WrapperForm onSubmit={handleSubmit(onOpenConfirm)}>
              {updatedUser && updatedDatetime && (
                <Flex paddingBottom='10px' justify='end'>{`最終更新者： ${updatedUser?.split('@')[0]} (${formatDateJP(
                  updatedDatetime,
                )})`}</Flex>
              )}

              <Flex justify='end'>
                {editing ? (
                  <Text color='green.700'> 編集中。。。</Text>
                ) : (
                  <>
                    {basicInfoSubDetail && (
                      <DeleteBasicInfo type='deleteSub' idRow={originData.employeeId} closeParent={handleClose} />
                    )}
                    <IconButton icon={<EditIcon />} onClick={() => setEditing(true)} />
                  </>
                )}
              </Flex>
              <TemplateGrid>
                <InputForm name='employeeId' label='社員ID' isDisabled />
              </TemplateGrid>
              <Text>Can</Text>
              <TemplateGrid>
                <InputForm name='can1' isDisabled={!editing} />
                <InputForm name='can2' isDisabled={!editing} />
                <InputForm name='can3' isDisabled={!editing} />
                <InputForm name='can4' isDisabled={!editing} />
              </TemplateGrid>
              <Text>Will</Text>
              <TemplateGrid>
                <InputForm name='will1' isDisabled={!editing} />
                <InputForm name='will2' isDisabled={!editing} />
                <InputForm name='will3' isDisabled={!editing} />
                <InputForm name='will4' isDisabled={!editing} />
              </TemplateGrid>
              <WrapperSubForm title='ロイヤリティ' mt='30px'>
                {editing ? (
                  <SelectForm
                    options={ROYALTIES_OPTIONAL}
                    methods={methods}
                    name='royaltiesOptional'
                    label='選択'
                    originValue={+royaltiesOptional || 0}
                    stylesProps={{
                      container: (provided) => ({
                        ...provided,
                        width: '120px',
                      }),
                    }}
                  />
                ) : (
                  <InputForm name='royaltiesOptional' mb='10px' width='120px' label='選択' isDisabled />
                )}

                <InputForm name='royaltiesDescription' label='記述' isDisabled={!editing} />
              </WrapperSubForm>
              <Flex mt={10} gap='10px' justifyContent='end'>
                {editing ? (
                  <>
                    <DHMButton
                      text='cancel'
                      buttonType='cancel'
                      onClick={() => {
                        setEditing(false);
                        resetOriginData();
                      }}
                    />
                    <DHMButton text='update' type='submit' />
                  </>
                ) : (
                  <DHMButton text='cancel' buttonType='cancel' onClick={handleClose} />
                )}
              </Flex>
            </WrapperForm>
          </FormProvider>
        )}
      />
    </>
  );
}
