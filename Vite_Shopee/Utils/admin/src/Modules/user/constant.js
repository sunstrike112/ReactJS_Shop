import { MANAGEMENT_ICON } from 'Assets'

export default {
  user: [
    // {
    //   name: 'register',
    //   Icon: MANAGEMENT_ICON,
    //   path: '/user-management/register',
    //   fill: 'text_hight_light',
    //   stroke: 'none'
    // },
    // {
    //   name: 'batch_register',
    //   Icon: MANAGEMENT_ICON,
    //   path: '/user-management/batch_register',
    //   fill: 'text_hight_light',
    //   stroke: 'none'
    // },
    {
      name: 'user_management',
      Icon: MANAGEMENT_ICON,
      path: '/user-management/user',
      fill: 'text_hight_light',
      stroke: 'none'
    }
  ],
  group_and_attribute: [
    {
      name: 'group_management',
      Icon: MANAGEMENT_ICON,
      path: '/user-management/group',
      fill: 'text_hight_light',
      stroke: 'none'
    },
    {
      name: 'attribute_management',
      Icon: MANAGEMENT_ICON,
      path: '/user-management/attribute',
      fill: 'text_hight_light',
      stroke: 'none'
    }
  ],
  login_history: [
    {
      name: 'login_history',
      Icon: MANAGEMENT_ICON,
      path: '/user-management/login-history',
      fill: 'text_hight_light',
      stroke: 'none'
    }
  ]
}

export const userClassificationOptions = [
  { value: 1, label: '経営者' },
  { value: 2, label: '役職者' },
  { value: 3, label: '正社員' },
  { value: 4, label: '非正規社員' },
  { value: 5, label: 'ビジネスパートナー' }
]
export const USER_ROLE_CSV = [
  { value: 'employee', label: '一般' },
  { value: 'sub_admin', label: 'サブ管理者' },
  { value: 'admin', label: 'システム管理者' },
  { value: 'course_admin', label: 'チャンネル管理者' }
]

export const registerFieldName = {
  email: 'メール(必須)',
  fullName: '氏名(必須)',
  fullNameKatakana: 'フリガナ(必須)',
  classification: '職位(必須)',
  departmentIdList: '部署',
  attributeIdList: 'グループ',
  userRole: '管理権限'
}
