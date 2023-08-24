import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { Flex, Heading, Stack, VStack } from '@chakra-ui/react';
import { DHMForm } from 'dhm/components/Form';
import { useContext, useState } from 'react';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { DHMButton } from 'dhm/components/Button';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { forgotPassword } from 'dhm/store/auth/action';
import { ROUTES } from 'dhm/utils/constants/routes';
import { ConfirmForm } from '../resetPassword/confirmForm';

export function ForgetPassword() {
  const dispatch = useDispatch();

  const methods = useForm();
  const { InputForm } = DHMForm;
  const { tLogin, tForm } = useContext(LanguageContext);
  const [isOpen, setOpen] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const onSubmit = (data) => {
    const onSuccess = () => {
      setOpen(!isOpen);
      setDisabled(!isDisabled);
    };
    const payload = { data, onSuccess };
    dispatch(forgotPassword(payload));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <VStack spacing={4} w='full' maxW='md'>
          <Heading mb={10} fontSize='35px' placeSelf='center'>
            {tLogin('reset_password')}
          </Heading>
          <InputForm label={tForm('email')} name='email' isDisabled={isDisabled} />
          <Stack pt={3} w='100%'>
            <DHMButton isDisabled={isDisabled} buttonType='primary' type='submit' text={tLogin('send_mail')} />
          </Stack>
          <Flex w='md'>
            <Link to={ROUTES.login}>
              <ArrowBackIcon boxSize={6} mr={1} pb={1} />
              {tLogin('back_to_sign_in')}
            </Link>
          </Flex>
        </VStack>
      </form>
      <ConfirmForm onOpen={isOpen} setOpen={setOpen} />
    </FormProvider>
  );
}
