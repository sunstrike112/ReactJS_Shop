import { ViewIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Img, useDisclosure } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
// import { AsyncSelectForm } from 'dhm/components/Form/elements/AsyncSelect';
import { CheckboxForm2 } from 'dhm/components/Form/elements/CheckBox2';
import { SelectForm } from 'dhm/components/Form/elements/Select';
import { InputForm } from 'dhm/components/Form/elements/Text';
import { TextareaForm } from 'dhm/components/Form/elements/Textarea';
import DHMModal from 'dhm/components/Modal';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { DHMHook } from 'dhm/hooks/index';
import { ServiceEsMaster } from 'dhm/store/esMaster/services';
import { isSameObj } from 'dhm/utils/helpers/condition';
import { useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { WrapperForm } from '../auth/styled';

export function CRUForm({ type = 'create', originData = {}, table }) {
  const { isValid, setError, ShowError, clearError } = DHMHook.useSetError();
  const { tForm, tKeyValidator } = useContext(LanguageContext);
  const { event, state } = ServiceEsMaster();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const methods = useForm({
    defaultValues: { ...originData, esMngTeamLeader: originData?.esMngTeamLeader === 'true' },
    mode: 'onChange',
  });
  const { handleSubmit, reset, getValues, watch } = methods;
  useEffect(() => {
    if (isOpen) {
      const payload = {
        onSuccess: () => {},
      };
      event.getDropdown(payload);

      if (type !== 'create') {
        event.getCheckLeaderEsMaster({
          esLeader: originData?.userCode,
        });
      }
    }
  }, [isOpen]);
  const handleOpen = () => {
    reset();
    onOpen();
  };
  useEffect(() => {
    if (!watch('esMngTeamLeader') && watch('esMngBelong') === watch('userCode')) {
      methods.setValue('esMngBelong', null);
    }
  }, [watch('esMngTeamLeader'), watch('userCode'), watch('esMngBelong')]);
  const handleClose = () => {
    onClose();
  };
  const onSubmit = () => {
    const data = getValues();
    const onSuccess = () => {
      handleClose();
      table.options.meta.funcResetDelete();
    };
    const esMngTeamLeader = {
      esMngTeamLeader: watch('esMngTeamLeader') ? 1 : 0,
    };
    const payload = {
      data: { ...data, version: originData.version, ...esMngTeamLeader },
      onSuccess,
    };
    const dispatchFunc = {
      create: () => event.createEsMaster(payload),
      edit: () => event.updateEsMaster(payload),
    };
    if (isSameObj(data, originData)) {
      handleClose();
    } else {
      dispatchFunc[type]();
    }
  };
  const titleModal = {
    create: tForm('esMaster_create'),
    edit: tForm('esMaster_edit'),
  };

  const propsModal = {
    title: titleModal[type],
    isOpen,
    onCancel: handleClose,
    onConfirm: onSubmit,
  };
  const chooseButton = {
    create: <DHMButton buttonType='create' onClick={handleOpen} text='register' />,
    view: <IconButton aria-label='View department' size='sm' icon={<ViewIcon />} mr='2' onClick={handleOpen} />,
    edit: <Img src={DHMAssets.ICON_EDIT_BLACK} onClick={handleOpen} cursor='pointer' />,
  };
  const realValue = {
    value: watch('userCode'),
    label: watch('userCode'),
  };
  useEffect(() => {
    if (type === 'edit' && state.isHaveMember && !watch('esMngTeamLeader')) {
      setError('esMngTeamLeader', {
        type: 'required',
        message: '本ES担当者の直下に担当メンバーが存在しましたので、チームリーダを抜けないでした。',
      });
    } else {
      clearError('esMngTeamLeader');
    }
  }, [state.isHaveMember, watch('esMngTeamLeader')]);
  useEffect(() => {
    if (watch('esMngTeamLeader')) {
      methods.setValue('esMngBelong', watch('userCode'));
    }
  }, [watch('esMngTeamLeader'), watch('userCode')]);
  return (
    <>
      {chooseButton[type]}
      <DHMModal
        {...propsModal}
        haveConfirm
        typeConfirm={type === 'create' ? 'create' : 'update'}
        content={({ onOpenConfirm }) => (
          <FormProvider {...methods}>
            <WrapperForm onSubmit={handleSubmit(() => isValid() && onOpenConfirm())}>
              <InputForm
                name='userCode'
                label={tForm('userCode')}
                disabled={type !== 'create'}
                onlyView={type !== 'create'}
                // otherOnInput={() => {
                //   if (type === 'create' && watch('esMngTeamLeader')) {
                //     methods.setValue('esMngBelong', null);
                //   }
                // }}
              />
              <InputForm name='esMngPred' label={tForm('esMngPred')} />
              <Flex mt='10px'>
                <Box width='129px'>{tKeyValidator('esMngTeamLeader')}</Box>
                <Box width='30px'>
                  <CheckboxForm2 type='checkbox' name='esMngTeamLeader' label='' isChecked={watch('esMngTeamLeader')} />
                </Box>
              </Flex>
              <ShowError name='esMngTeamLeader' />

              <Box mt='10px'>
                <SelectForm
                  options={state.dropdownEs?.filter((item) => item.value !== watch('userCode'))}
                  customOption={watch('esMngTeamLeader') ? [realValue] : []}
                  preventSelect={watch('esMngTeamLeader')}
                  otherOnChange={() => {
                    if (watch('esMngTeamLeader')) {
                      methods.setValue('esMngBelong', watch('userCode'));
                    }
                  }}
                  methods={methods}
                  name='esMngBelong'
                  label={tKeyValidator('esMngBelong')}
                  originValue={watch('esMngBelong')}
                  stylesProps={{
                    container: (provided) => ({
                      ...provided,
                      width: '270px',
                    }),
                  }}
                  styleWrapperForm={{
                    display: 'flex',
                    gap: '36.5px',
                  }}
                  styleError={{
                    position: 'absolute',
                    top: '34px',
                    left: '126px',
                  }}
                />
              </Box>
              <TextareaForm name='esMngPredDescription' label={tForm('esMngPredDes')} resize='none' height={100} />
              <Flex mt={10} gap='10px' justifyContent='end'>
                <CloseButton handleClose={handleClose} />
                {type !== 'view' && <DHMButton text={type === 'create' ? 'register' : 'update'} type='submit' />}
              </Flex>
            </WrapperForm>
          </FormProvider>
        )}
      />
    </>
  );
}
