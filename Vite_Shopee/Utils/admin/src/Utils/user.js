import { COMPANY_NAME } from 'Constants'

export const MEMBER_TYPE_CONVERT = {
  'COMPANY_EMPLOYEE': 'user:employee',
  'COMPANY_ADMIN': 'user:admin',
  'SUB_ADMINISTRATOR': 'user:sub_admin',
  'COURSE_ADMIN': 'user:course_admin',
  'APPROVAL_MANAGEMENT': 'user:approval_management',
  'NISSHOKEN_ADMIN': COMPANY_NAME.NISSOKEN
}

export const MEMBER_TYPE_CONSTANT = {
  'COMPANY_EMPLOYEE': 'EMPLOYEE',
  'COMPANY_ADMIN': 'ADMIN',
  'SUB_ADMINISTRATOR': 'SUB_ADMIN',
  'COURSE_ADMIN': 'COURSE_ADMIN',
  'NISSOKEN_ADMIN': 'NISHOKEN_ADMIN',
  'APPROVAL_MANAGEMENT': 'APPROVAL_MANAGEMENT'
}

export const MEMBER_TYPES_WORKSPACE = [
  { value: MEMBER_TYPE_CONSTANT.COMPANY_EMPLOYEE, label: 'user:employee' },
  { value: MEMBER_TYPE_CONSTANT.SUB_ADMINISTRATOR, label: 'user:sub_admin' },
  { value: MEMBER_TYPE_CONSTANT.COURSE_ADMIN, label: 'user:course_admin' }
]

export const MEMBER_TYPES_VIRTUAL_COMPANY = [
  { value: MEMBER_TYPE_CONSTANT.COMPANY_EMPLOYEE, label: 'user:employee' }
]

export const MEMBER_TYPES = [
  { value: MEMBER_TYPE_CONSTANT.COMPANY_EMPLOYEE, label: 'user:employee' },
  { value: MEMBER_TYPE_CONSTANT.COMPANY_ADMIN, label: 'user:admin' },
  { value: MEMBER_TYPE_CONSTANT.SUB_ADMINISTRATOR, label: 'user:sub_admin' },
  { value: MEMBER_TYPE_CONSTANT.COURSE_ADMIN, label: 'user:course_admin' }
]

export const MEMBER_TYPES_SUPER_ADMIN = [
  { value: MEMBER_TYPE_CONSTANT.NISSOKEN_ADMIN, label: COMPANY_NAME.NISSOKEN },
  { value: MEMBER_TYPE_CONSTANT.APPROVAL_MANAGEMENT, label: 'user:approval_management' }
]
