import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    maintenanceMessage: yup
      .string()
      .max(500, t('error_message:validation.max_length', { key: t('maintenance_notice'), max: 500 })),
    maintenanceSpecialEmail: yup
      .string()
      .max(2000, t('error_message:validation.max_length', { key: t('special_user'), max: 2000 }))
  }))
