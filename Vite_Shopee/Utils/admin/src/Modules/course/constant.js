import {
  // ICON_PEN_TOOL,
  MANAGEMENT_ICON
} from 'Assets'
import { RoutesName } from './routes'

export default {
  course: [
    {
      name: 'registration_course_categories',
      Icon: MANAGEMENT_ICON,
      path: '/course-management/lesson-cate',
      fill: 'text_hight_light',
      stroke: 'none'
    },
    {
      name: 'registration_courses',
      Icon: MANAGEMENT_ICON,
      path: '/course-management/lesson-course',
      fill: 'text_hight_light',
      stroke: 'none'
    },
    {
      name: 'unit_settings',
      Icon: MANAGEMENT_ICON,
      path: '/course-management/unit-settings',
      fill: 'text_hight_light',
      stroke: 'none'
    },
    {
      name: 'upload_file',
      Icon: MANAGEMENT_ICON,
      path: '/course-management/upload-file',
      fill: 'text_hight_light',
      stroke: 'none'
    },
    // {
    //   name: 'registration_certificates',
    //   Icon: MANAGEMENT_ICON,
    //   path: '/',
    //   fill: 'text_hight_light',
    //   stroke: 'none'
    // },
    {
      name: 'auto_assignment',
      Icon: MANAGEMENT_ICON,
      path: '/course-management/auto-assignment',
      fill: 'text_hight_light',
      stroke: 'none'
    },
    {
      name: 'test_question',
      Icon: MANAGEMENT_ICON,
      path: RoutesName.TEST_QUESTION_MANAGEMENT,
      fill: 'text_hight_light',
      stroke: 'none'
    }
    // {
    //   name: 'teaching_materials',
    //   Icon: MANAGEMENT_ICON,
    //   path: '/',
    //   fill: 'text_hight_light',
    //   stroke: 'none'
    // },
    // {
    //   name: 'report_publishing',
    //   Icon: ICON_PEN_TOOL,
    //   path: '/course-management/report-sharing',
    //   fill: 'text_hight_light',
    //   stroke: 'none'
    // }
  ],
  attendance_permissions: [
    {
      name: 'issus_permission',
      Icon: MANAGEMENT_ICON,
      path: '/course-management/create-user-learning-lesson',
      fill: 'text_hight_light',
      stroke: 'none'
    },
    // {
    //   name: 'bulk_issue_permission',
    //   Icon: MANAGEMENT_ICON,
    //   path: '/course-management/user-learning-lesson-csv',
    //   fill: 'text_hight_light',
    //   stroke: 'none'
    // },
    {
      name: 'issue_status_permissions',
      Icon: MANAGEMENT_ICON,
      path: '/course-management/user-learning-lesson',
      fill: 'text_hight_light',
      stroke: 'none'
    }
  ]
}
