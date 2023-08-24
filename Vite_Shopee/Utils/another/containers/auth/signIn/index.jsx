import { Heading } from '@chakra-ui/react';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ButtonSSOSignIn } from '../signInSSO';

export function SignInForm() {
  const { tLogin } = useContext(LanguageContext);

  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Heading fontSize='18px' fontWeight='400' textAlign='center' mb='16px'>
        {tLogin('welcome')}
      </Heading>
      <ButtonSSOSignIn />
    </FormProvider>
  );
}
