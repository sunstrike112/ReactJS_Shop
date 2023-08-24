/* eslint-disable no-unused-vars */
import { Loading, SideBarWebview } from 'Components'
import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants'
import CommunityScreen from 'Modules/community'
import CommunityManagementScreen from 'Modules/community_management'
import CourseScreen from 'Modules/course'
import CourseResultScreen from 'Modules/course_result'
import DownloadManualScreen from 'Modules/download_manual'
import HomeScreen from 'Modules/home'
import InquiryScreen from 'Modules/inquiry'
import LibraryScreen from 'Modules/library'
import MyCompanyScreen from 'Modules/my_company'
import ContactScreen from 'Modules/notification'
import PaymentManagementScreen from 'Modules/payment_manager'
import ReportManagementScreen from 'Modules/report_management'
import SettingDomainScreen from 'Modules/setting_domain'
import SettingMailServerScreen from 'Modules/setting_mail_server'
import SettingMaintainScreen from 'Modules/setting_maintain'
import SettingMobileScreen from 'Modules/setting_mobile'
import SettingPasswordPlanScreen from 'Modules/setting_password_plan'
import SettingsScreen from 'Modules/settings'
import TagManagementScreen from 'Modules/tag_management'
import TemplateManagementScreen from 'Modules/template_management'
import UserScreen from 'Modules/user'
import WorkSpaceManagementScreen from 'Modules/workspace'

const RoutesName = {
  HOME: '/',
  LOGOUT: '/auth/logout',
  VERIFY: '/auth/verify',
  COMMUNITY: '/community-management',
  USER: '/user-management',
  CONTACT: '/contact-management',
  COURSE: '/course-management',
  COURSE_RESULT: '/course-result',
  INQUIRY: '/inquiry-management',
  LIBRARY: '/library-management',
  SETTINGS: '/site-settings',
  RECORDING: '/recording',
  MY_COMPANY: '/my-company',
  COMPANY_DETAIL: '/company-management/company-detail',
  COMPANY_WAITING: '/company-management/waiting',
  COMPANY_WAITING_DETAIL: '/company-management/waiting-detail',
  MAIL_SERVER: '/setting-mail-server',
  PAYMENT_MANAGER: '/payment-management',
  DOWNLOAD_MANUAL: '/download-manual',
  SETTING_MAINTAIN: '/setting-maintain',
  SETTING_MOBILE: '/setting-mobile',
  SETTING_DOMAIN: '/setting-domain',
  SETTING_IP: '/setting-ip',
  SETTING_PASSWORD_PLAN: '/setting-password-plan',
  WORK_SPACE: '/workspace-management',
  TAG_MANAGEMENT: '/tag-management',
  COMMUNITY_MANAGEMENT: '/community-managements/community-management',
  COMMENT_MANAGEMENT: '/community-managements/comment-management',
  TEMPLATE_MANAGEMENT: '/community-managements/template-management',
  REPORT_MANAGEMENT: '/community-managements/report-management',
  LOADING: '/loading'
}

export const ROUTES = ({ isWebviewMode }) => [
  {
    path: RoutesName.HOME,
    Component: isWebviewMode ? SideBarWebview : HomeScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.APPROVAL_MANAGEMENT, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.WORK_SPACE,
    Component: WorkSpaceManagementScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    path: RoutesName.COMMUNITY,
    Component: CommunityScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.USER,
    Component: UserScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.CONTACT,
    Component: ContactScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    path: RoutesName.COURSE,
    Component: CourseScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.COURSE_RESULT,
    Component: CourseResultScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    path: RoutesName.INQUIRY,
    Component: InquiryScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.LIBRARY,
    Component: LibraryScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.MY_COMPANY,
    Component: MyCompanyScreen,
    rules: [USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.COMPANY_DETAIL,
    Component: MyCompanyScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.SETTINGS,
    Component: SettingsScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.PAYMENT_MANAGER,
    Component: PaymentManagementScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    path: RoutesName.DOWNLOAD_MANUAL,
    Component: DownloadManualScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.MAIL_SERVER,
    Component: SettingMailServerScreen,
    rules: [USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    path: RoutesName.SETTING_MAINTAIN,
    Component: SettingMaintainScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.SETTING_MOBILE,
    Component: SettingMobileScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.SETTING_DOMAIN,
    Component: SettingDomainScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    path: RoutesName.SETTING_PASSWORD_PLAN,
    Component: SettingPasswordPlanScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.TAG_MANAGEMENT,
    Component: TagManagementScreen,
    rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.COMMUNITY_MANAGEMENT,
    Component: CommunityManagementScreen,
    rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.TEMPLATE_MANAGEMENT,
    Component: TemplateManagementScreen,
    rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.REPORT_MANAGEMENT,
    Component: ReportManagementScreen,
    rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.LOADING,
    Component: Loading,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  }
]

export default RoutesName
