import { Flex, Grid, GridItem, IconButton, Img, useDisclosure, VStack } from '@chakra-ui/react';
import DHMModal from 'dhm/components/Modal';

import { DHMAssets } from 'dhm/assets/index';
import { DHMButton } from 'dhm/components/Button';
import { InputForm } from 'dhm/components/Form/elements/Text';
import { WrapperSubForm } from 'dhm/components/Form/WrapperSubForm.jsx';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { addCodeMaster, searchDetailDisplay, updateCodeMaster } from 'dhm/store/codeMaster/action.js';
import { BORDERS, COLORS } from 'dhm/utils/constants/style.js';
import { isSameObj } from 'dhm/utils/helpers/condition';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { WrapperForm } from '../auth/styled';

export function AddForm({ type = 'create', originData = {} }) {
  const { tForm, tTabs } = useContext(LanguageContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { handleSubmit, reset, watch, getValues, ...methods } = useForm({
    // defaultValues: originData,
    values: originData,
    mode: 'onChange',
  });
  const handleOpen = () => {
    reset();
    onOpen();
  };
  const handleClose = () => {
    onClose();
  };
  const onSubmit = () => {
    const data = getValues();
    const onSuccess = () => {
      handleClose();
      const paramsFilter = {
        params: { codeListIds: [data.codeListId] },
      };
      dispatch(searchDetailDisplay(paramsFilter));
    };
    const payload = {
      data: {
        codeListId: data.codeListId,
        codeListName: data.codeListName,
        codeValue: data.codeValue,
        codeName: data.codeName,
        codeNameEn: data.codeNameEn,
        sortOrder: data.sortOrder,
        version: data.version || 0,
      },
      onSuccess,
    };
    const dispatchFunc = {
      create: () => dispatch(addCodeMaster(payload)),
      edit: () => dispatch(updateCodeMaster(payload)),
    };
    if (isSameObj(originData, data)) {
      handleClose();
    } else {
      dispatchFunc[type]();
    }
  };

  const titleModal = {
    create: tForm('add_code'),
    edit: tForm('edit_code'),
    view: tForm('department_detail'),
  };
  const propsModal = {
    title: titleModal[type],
    isOpen,
    onCancel: handleClose,
    onConfirm: onSubmit,
  };
  const chooseButton = {
    create: (
      <DHMButton buttonType='create' onClick={handleOpen} text={tForm('add')}>
        <AiOutlinePlusCircle style={{ marginLeft: '5px', color: `${COLORS.primary_900}` }} />
      </DHMButton>
    ),
    view: <DHMButton onClick={handleOpen} text={tTabs('history')} />,
    edit: (
      <IconButton
        aria-label='Edit code master'
        size='sm'
        icon={<Img src={DHMAssets.ICON_EDIT_BLACK} />}
        mr='2'
        onClick={handleOpen}
      />
    ),
  };
  return (
    <>
      {chooseButton[type]}
      <DHMModal
        {...propsModal}
        haveConfirm
        typeConfirm={type === 'create' ? 'create' : 'update'}
        content={({ onOpenConfirm }) => (
          <FormProvider {...methods}>
            <WrapperForm onSubmit={handleSubmit(onOpenConfirm)}>
              <VStack spacing={4} w='full' maxW='md'>
                <WrapperSubForm title={tForm('gr_code_list')}>
                  <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                    <GridItem w='100%'>
                      <InputForm
                        label={tForm('codeListId')}
                        name='codeListId'
                        border={BORDERS.border_1(COLORS.gray_700)}
                        pointerEvents='none'
                        isDisabled
                        bg={COLORS.gray_400}
                      />
                    </GridItem>
                    <GridItem w='100%'>
                      <InputForm
                        label={tForm('codeListName')}
                        name='codeListName'
                        border={BORDERS.border_1(COLORS.gray_700)}
                        pointerEvents='none'
                        isDisabled
                        bg={COLORS.gray_400}
                      />
                    </GridItem>
                  </Grid>
                </WrapperSubForm>
                <InputForm
                  label={tForm('codeValue')}
                  name='codeValue'
                  isDisabled={type !== 'create'}
                  border={BORDERS.border_1(COLORS.gray_700)}
                  bg={type !== 'create' && COLORS.gray_400}
                  width='60%'
                />
                <InputForm
                  border={BORDERS.border_1(COLORS.gray_700)}
                  label={tForm('codeName')}
                  name='codeName'
                  width='60%'
                />
                <InputForm
                  border={BORDERS.border_1(COLORS.gray_700)}
                  label={tForm('codeNameEn')}
                  name='codeNameEn'
                  width='60%'
                />
                <InputForm
                  border={BORDERS.border_1(COLORS.gray_700)}
                  label={tForm('sortOrder')}
                  name='sortOrder'
                  width='40%'
                />
              </VStack>
              <Flex mt={10} gap='10px' justifyContent='end'>
                <DHMButton
                  text='cancel'
                  buttonType='cancel'
                  type={type === 'view' ? 'submit' : 'button'}
                  onClick={handleClose}
                />
                {type !== 'view' && <DHMButton text={type === 'create' ? tForm('add') : 'update'} type='submit' />}
              </Flex>
            </WrapperForm>
          </FormProvider>
        )}
      />
    </>
  );
}
