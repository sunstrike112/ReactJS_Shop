import { REGEX } from 'Constants'
import * as yup from 'yup'

const validUrl = (value) => REGEX.URL.test(value)

export default (t) => (
  yup.object().shape({
    iosVersion: yup
      .number()
      .nullable()
      .required(
        t('error_message:validation.required', {
          key: t('ios_version')
        })
      ),
    iosLink: yup
      .string()
      .required(
        t('error_message:validation.required', {
          key: t('ios_link')
        })
      )
      .test('isNotUrl', t('error_message:validation.invalid_url'), validUrl),
    androidVersion: yup
      .number()
      .nullable()
      .required(
        t('error_message:validation.required', {
          key: t('android_version')
        })
      ),
    androidLink: yup
      .string()
      .required(
        t('error_message:validation.required', {
          key: t('android_link')
        })
      )
      .test('isNotUrl', t('error_message:validation.invalid_url'), validUrl)
  }))
