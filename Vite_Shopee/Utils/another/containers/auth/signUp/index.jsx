import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Center, Heading, Stack, VStack } from '@chakra-ui/react';
// import { AuthContext } from "../../../contexts/AuthContext";
import { DHMForm } from 'dhm/components/Form';
import { useDispatch } from 'react-redux';
import { signUp } from 'dhm/store/auth/action';
import { ROUTES } from 'dhm/utils/constants/routes';
import { WrapperForm } from '../styled';

export function SignUpForm() {
  const { InputForm } = DHMForm;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { signIn } = useContext(AuthContext);

  const methods = useForm();
  const onSubmit = (data) => {
    const onSuccess = () => {
      navigate(ROUTES.login);
    };
    const onFailed = () => {};
    const payload = {
      data,
      onSuccess,
      onFailed,
    };
    dispatch(signUp(payload));
  };

  return (
    <FormProvider {...methods}>
      <WrapperForm onSubmit={methods.handleSubmit(onSubmit)}>
        <VStack spacing={4} w='full' maxW='md'>
          <Heading fontSize='2xl' placeSelf='start'>
            Sign up
          </Heading>
          <InputForm label='Email' name='email' />
          <InputForm label='Name' name='name' />
          <InputForm label='Password' name='password' type='password' />
          <InputForm label='Address' name='address' />
          <Stack spacing={6} w='100%'>
            <Button colorScheme='blue' variant='solid' type='submit'>
              Sign Up
            </Button>
            <Center>
              <Link to={ROUTES.login}>Go to home</Link>
            </Center>
          </Stack>
        </VStack>
      </WrapperForm>
    </FormProvider>
  );
}
