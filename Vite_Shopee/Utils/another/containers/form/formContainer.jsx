import React, { useContext } from 'react';
import { Box, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { formService } from 'dhm/services/form';
import { COLORS } from 'dhm/utils/constants/style';
import LanguageContext, { currentLanguage } from 'dhm/contexts/TranslateContext';

function FormContainer({
  type = 'default',
  name,
  label,
  formElement = () => {},
  onlyView = false,
  isDisabled = false,
  styleError = null,
  styleWrapperForm = {},
}) {
  const { getValidation, statusValidation } = formService;
  const { register, formState } = useFormContext();
  const { tForm } = useContext(LanguageContext);
  const { errors } = formState;
  const connectForm = {
    ...register(name, {
      validate: (key) =>
        getValidation(name)
          .validate({ [name]: key })
          .catch((e) => e.errors[0]),
    }),
  };
  const specCase = ['endDate'];
  const verifySpecCase = specCase.includes(name);
  const showRequired = Boolean(statusValidation(name).isRequired || verifySpecCase);
  return (
    <FormControl isInvalid={errors[name]} {...styleWrapperForm}>
      {label && type !== 'checkbox' && (
        <FormLabel htmlFor={name}>
          <Box position='relative' width='fit-content'>
            {label}
            {!onlyView && showRequired && (
              <Box
                position='absolute'
                right={currentLanguage('jp') ? '-40px' : '-50px'}
                fontSize='8px'
                top='4px'
                color={COLORS.white}
                background={COLORS.danger_300}
                padding='2px 8px'
                border={isDisabled && `1px solid #646464`}
                boxShadow={isDisabled && `none`}
              >
                {tForm('required')}
              </Box>
            )}
          </Box>
        </FormLabel>
      )}
      {formElement(connectForm)}
      {!isDisabled && errors[name] && (
        <FormErrorMessage {...(styleError || {})}>{errors[name].message}</FormErrorMessage>
      )}
    </FormControl>
  );
}
export { FormContainer };
