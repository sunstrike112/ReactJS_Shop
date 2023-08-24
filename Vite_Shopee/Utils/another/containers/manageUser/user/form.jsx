import { AddIcon, ViewIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Img, useDisclosure } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
import { SelectRole } from 'dhm/components/Form/elements/SelectRole';
// import { AsyncSelectForm } from 'dhm/components/Form/elements/AsyncSelect';
import { InputForm } from 'dhm/components/Form/elements/Text';
import DHMModal from 'dhm/components/Modal';
import { WrapperForm } from 'dhm/containers/auth/styled';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServiceUser } from 'dhm/store/manageUser/user/services';
import { COLORS } from 'dhm/utils/index';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export function CRUForm({ type = 'create', originData = {}, table }) {
  const { tKeyValidator, tForm } = useContext(LanguageContext);
  const { event } = ServiceUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const methods = useForm({
    defaultValues: originData,
    mode: 'onChange',
  });
  const { handleSubmit, reset, getValues } = methods;
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
      table.options.meta.funcResetDelete();
    };
    const payload = {
      data: { ...data, version: originData.version },
      onSuccess,
    };
    const dispatchFunc = {
      create: () => event.createUser(payload),
    };
    dispatchFunc[type]();
  };
  const titleModal = {
    create: tForm('user_create'),
    edit: tForm('user_edit'),
  };

  const propsModal = {
    title: titleModal[type],
    isOpen,
    onCancel: handleClose,
    onConfirm: onSubmit,
  };
  const chooseButton = {
    create: (
      <Box
        width='fit-content'
        cursor='pointer'
        onClick={handleOpen}
        padding='7px 18px'
        background={COLORS.neutral_300}
        color='white'
        _hover={{
          bg: COLORS.neutral_500,
        }}
      >
        <AddIcon boxSize={3} mr={2} />
        {tForm('add')}
      </Box>
    ),
    view: <IconButton aria-label='View department' size='sm' icon={<ViewIcon />} mr='2' onClick={handleOpen} />,
    edit: <Img src={DHMAssets.ICON_EDIT_BLACK} onClick={handleOpen} cursor='pointer' />,
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
              <InputForm name='userName' label={tKeyValidator('userName')} />
              <InputForm name='mailAddress' label={tKeyValidator('mailAddress')} />
              <SelectRole
                methods={methods}
                name='roleId'
                label={tKeyValidator('roleId')}
                stylesProps={{
                  container: (provided) => ({
                    ...provided,
                    width: '200px',
                  }),
                }}
              />
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
