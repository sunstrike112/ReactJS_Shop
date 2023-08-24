import { REGEX } from 'Constants'
import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    apiId: yup
      .number()
      .nullable()
      .required(t('error_message:validation.required', { key: t('externalApi.externalApi') })),
    listIp: yup
      .string()
      .trim()
      .required(t('error_message:validation.required', { key: t('externalIp.ipAddress') }))
      .matches(REGEX.IPS_SPREAD_BY_COMMA_OR_ASTERISK, t('error_message:validation.ipAddressInvalid'))
  }))
