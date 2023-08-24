import * as yup from 'yup';
import { validation } from './validation';

const getMultiValidation = (...fields) => {
  const schema = yup.object().shape(
    fields.reduce((acc, field) => {
      acc[field] = validation[field];
      return acc;
    }, {}),
  );
  return schema;
};
const getValidation = (field) =>
  yup.object().shape({
    [field]: validation[field],
  });
const statusValidation = (field) => {
  const schema = getValidation(field);
  const fieldSchema = schema?.fields[field];
  const tests = fieldSchema?.tests;
  const isRequired = tests?.some((test) => test.OPTIONS.name === 'required');
  const hasMinLength = tests?.some((test) => test.OPTIONS.name === 'min');
  const hasMaxLength = tests?.some((test) => test.OPTIONS.name === 'max');

  return { isRequired, hasMinLength, hasMaxLength };
};
export { getValidation, getMultiValidation, statusValidation };
