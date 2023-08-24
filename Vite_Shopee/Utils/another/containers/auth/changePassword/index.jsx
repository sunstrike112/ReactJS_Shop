import { useContext, useMemo, useState } from 'react';
import { ButtonGroup, Flex, VStack, useDisclosure } from '@chakra-ui/react';
import { AuthContext } from 'dhm/contexts/AuthContext';
import DHMComponents from 'dhm/components/index';
import { useDispatch } from 'react-redux';
import { changePassword } from 'dhm/store/auth/action';
import { FormProvider, useForm } from 'react-hook-form';
import { InputForm } from 'dhm/components/Form/elements/Text';
import { DHMButton } from 'dhm/components/Button';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { WrapperForm } from '../styled';

export function ChangePassword({ onOpen, setOpen }) {
  const { tForm } = useContext(LanguageContext);
  const ModalForm = DHMComponents.DHMModal;
  const methods = useForm();
  const { signOut } = useContext(AuthContext);
  const { onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChangePassword = () => {
    const onSuccess = () => {
      onClose();
      signOut();
    };

    const onFailed = () => {};
    const payload = {
      data: methods.getValues(),
      onSuccess,
      onFailed,
    };
    dispatch(changePassword(payload));
  };

  const handleCancel = () => {
    setOpen(!onOpen);
    methods.reset();
  };

  const propsModal = {
    title: tForm('change_password'),
    isOpen: onOpen,
    onCancel: handleCancel,
    onConfirm: handleChangePassword,
  };

  useMemo(() => {
    setIsDisabled(!isDisabled);
  }, [methods.formState.isValid]);

  return (
    <ModalForm
      {...propsModal}
      haveConfirm
      content={({ onOpenConfirm }) => (
        <FormProvider {...methods}>
          <WrapperForm
            onSubmit={(e) => {
              e.preventDefault();
              onOpenConfirm();
            }}
          >
            <VStack spacing={4} w='full' maxW='md'>
              <InputForm label={tForm('old_password')} name='oldPassword' type='password' />
              <InputForm label={tForm('password')} name='password' type='password' />
              <InputForm label={tForm('confirm_password')} name='confirmPassword' type='password' />
            </VStack>
            <Flex justify='flex-end' alignItems='center'>
              <ButtonGroup gap='2' mt={7}>
                <DHMButton onClick={handleCancel} buttonType='cancel' text='cancel' />
                <DHMButton type='submit' isDisabled={isDisabled} text='save' />
              </ButtonGroup>
            </Flex>
          </WrapperForm>
        </FormProvider>
      )}
    />
  );
}
