import { Box } from '@chakra-ui/react';
import { useState } from 'react';

export const useSetError = () => {
  const [errors, setErrors] = useState({});
  const setError = (name, error) => {
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };
  const getError = (name) => errors[name] || {};

  const clearError = (name) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });
  };

  const isValid = () => Object.keys(errors).length === 0;

  const isFieldInvalid = (name) => {
    const error = getError(name);
    return Boolean(Object.keys(error).length !== 0);
  };

  const isEmpty = (value) => Boolean(value === undefined || value === null || value === '' || value.trim() === '');
  function ShowError({ name, ...props }) {
    const error = getError(name);
    return (
      error && (
        <Box color='red.500' fontSize='sm' {...props}>
          {error.message}
        </Box>
      )
    );
  }
  return { setError, getError, clearError, isValid, isEmpty, ShowError, isFieldInvalid };
};
