/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
import * as yup from 'yup'

const DOMAIN_REGEX = /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/g

export default (t) => (
  yup.object().shape({
    domain: yup
      .string()
      .trim()
      .required(t('error_message:validation.required', { key: t('domain') }))
      .matches(DOMAIN_REGEX, t('error_message:validation.domain_invalid'))
  }))
