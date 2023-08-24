import { FormProvider, useForm } from 'react-hook-form';
import { Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DHMButton } from 'dhm/components/Button';
import { useContext, useEffect } from 'react';
import DHMForm from 'dhm/components/Form';
import { useDispatch } from 'react-redux';
import { resetPassword } from 'dhm/store/auth/action';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { ROUTES } from 'dhm/utils/constants/routes';
import { WrapperForm } from '../styled';

export function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const methods = useForm();
  const { InputForm } = DHMForm;
  const { tForm, tLogin } = useContext(LanguageContext);

  const { search } = useLocation();
  const token = new URLSearchParams(search).get('token');

  const onSubmit = (data) => {
    const onSuccess = () => {
      navigate(ROUTES.login);
    };
    const request = { ...data, token };
    const payload = {
      data: request,
      onSuccess,
    };
    dispatch(resetPassword(payload));
  };

  useEffect(() => {
    if (!token) {
      navigate(ROUTES.login);
    }
  });

  return (
    <FormProvider {...methods}>
      <WrapperForm onSubmit={methods.handleSubmit(onSubmit)}>
        <VStack mt={14} spacing={4} w='full' maxW='md'>
          <Heading fontSize='35px' placeSelf='center'>
            {tLogin('change_new_password')}
          </Heading>
          <Text pb={4} fontSize='14px'>
            {tLogin('describe_change_password')}
          </Text>
          <InputForm label={tForm('password')} name='newPassword' type='password' />
          <InputForm label={tForm('confirm_password')} name='confirmPassword' type='password' />

          <Stack pt={3} w='100%'>
            <DHMButton buttonType='primary' type='submit' text={tForm('confirm')} />
          </Stack>
          <Flex w='md'>
            <Link to={ROUTES.login}>
              <ArrowBackIcon boxSize={6} mr={1} pb={1} />
              {tLogin('back_to_sign_in')}
            </Link>
          </Flex>
        </VStack>
      </WrapperForm>
    </FormProvider>
  );
}
