import * as yup from 'yup'

export default (t) => yup.object().shape({
  workSpaceName: yup
    .string()
    .required(
      t('error_message:validation.required', {
        key: t('workspace_name')
      })
    )
    .max(20, t('error_message:validation.max_length', { key: t('workspace_name'), max: 20 }))
    .trim(),
  description: yup
    .string()
    .max(200, t('error_message:validation.max_length', { key: t('common:description'), max: 200 }))
    .trim(),
  listAdmins: yup.array().min(
    1,
    t('error_message:validation.required', {
      key: t('list_admins')
    })
  ),
  startDateWorkspace: yup.string().required(t('message.created_date_required'))
})
