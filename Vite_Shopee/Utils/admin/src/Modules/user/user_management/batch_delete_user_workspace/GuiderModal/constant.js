export const columns = ({ t }) => [
  {
    title: t('guider.title'),
    dataIndex: 'title',
    key: 'title',
    render: (text) => t(text),
    width: 180
  },
  {
    title: t('guider.description'),
    dataIndex: 'description',
    key: 'description',
    render: (text) => t(text)
  }
]

export const dataGuider = [
  {
    title: 'guider.email_title',
    description: 'guider.email_des'
  },
  {
    title: 'guider.company_code_title_for_ws',
    description: 'guider.company_code_des'
  },
  {
    title: 'guider.signinId_title_for_ws',
    description: 'guider.signinId_des_not_required'
  }
]
