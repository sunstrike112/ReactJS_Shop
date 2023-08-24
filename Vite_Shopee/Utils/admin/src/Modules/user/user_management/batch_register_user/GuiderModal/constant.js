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
    title: 'guider.signinId_title_for_ws',
    description: 'guider.signinId_des_not_required'
  },
  {
    title: 'guider.pass_title',
    description: 'guider.pass_des'
  },
  {
    title: 'guider.fullname_title',
    description: 'guider.fullname_des'
  },
  {
    title: 'guider.furigana_title',
    description: 'guider.furigana_des'
  },
  {
    title: 'guider.job_title',
    description: 'guider.job_des'
  },
  {
    title: 'guider.employee_number_title',
    description: 'guider.employee_number_des'
  },
  {
    title: 'guider.group_title',
    description: 'guider.group_des'
  },
  {
    title: 'guider.attribute_title',
    description: 'guider.attribute_des'
  },
  {
    title: 'guider.member_type_title',
    description: 'guider.member_type'
  }
]
