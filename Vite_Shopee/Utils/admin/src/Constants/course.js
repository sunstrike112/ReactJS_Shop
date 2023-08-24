import { TYPE_FILE } from './upload_file'

export const PUBLISH_COURSE_OPTION_SEMINAR = [
  { value: 'PUBLIC', label: 'company_seminar:common.public' },
  { value: 'PRIVATE', label: 'company_seminar:common.private' }
]

export const PUBLISH_COURSE_OPTION = [
  { value: 'PUBLIC', label: 'course:registration_course.publish_course_option.public' },
  { value: 'PRIVATE', label: 'course:registration_course:publish_course_option.private' }
]

export const PAID_COURSE_OPTION = [
  { value: 0, label: 'registration_course.paid_course_option.free' }
  // { value: 1, label: 'registration_course.paid_course_option.paid' }
]

export const PAID_COURSE_OPTION_TEXT = [
  { value: 'FREE', label: 'registration_course.paid_course_option.free' },
  { value: 'PAID', label: 'registration_course.paid_course_option.paid' }
]

export const OWNER_OPTION = [
  { value: 'ALL', label: 'registration_course.owner_option.all' },
  { value: 'COMPANY', label: 'registration_course.owner_option.company' },
  { value: 'NISSOKEN', label: 'registration_course.owner_option.nissoken' }
]

export const UNIT_TYPE = {
  LESSON: 'lesson',
  TEST: 'test',
  SURVEY: 'survey',
  REPORT: 'report',
  SEMINAR: 'seminar'
}

export const UNIT_TYPE_UPPERCASE = {
  LESSON: 'LESSON',
  TEST: 'TEST',
  SURVEY: 'SURVEY',
  REPORT: 'REPORT',
  SEMINAR: 'SEMINAR'
}

export const PUBLISH_TYPE = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE'
}

export const OPTIONAL_OR_REQUIRED_ANSWER = [
  { value: 'UNREQUIRED', label: 'options.optional' },
  { value: 'REQUIRED', label: 'options.required' }
]

export const OPTIONAL_OR_REQUIRED_COURSE = [
  { value: false, label: 'common:label_optional' },
  { value: true, label: 'common:label_required' }
]

export const RESTRICT_ANSWER = [
  { value: 'RESTRICT', label: 'create.restrict' },
  { value: 'DO_NOT_RESTRICT', label: 'create.un_restrict' }
]

export const SHOW_MODEL_ANSWER = [
  { value: 'SHOW', label: 'create.show' },
  { value: 'HIDE', label: 'create.un_show' }
]

export const OPTIONAL_OR_REQUIRED_ANSWER_COURSE = [
  { value: false, label: 'options.optional' },
  { value: true, label: 'options.required' }
]

export const REQUEST_PASSWORD_OPTIONS = [
  { value: false, label: 'options.not_request_password' },
  { value: true, label: 'options.request_password' }
]

export const QUESTION_TYPE = [
  { value: 'SELECT_ONE', label: 'options.single_choice' },
  { value: 'CHOOSE_MANY', label: 'options.multiple_choice' },
  { value: 'DESCRIPTION', label: 'options.description' }
]

export const QUESTION_TYPE_SELECT = [
  { value: null, label: 'common:select_all' },
  { value: 'SELECT_ONE', label: 'unit_setting:question_setting.single_choice' },
  { value: 'CHOOSE_MANY', label: 'unit_setting:question_setting.multiple_choice' },
  { value: 'DESCRIPTION', label: 'unit_setting:question_setting.description_choice' }
]

export const STATUS = [
  { value: true, label: 'common:enable' },
  { value: false, label: 'common:disabled' }
]

export const TARGET_RANGE = [
  { value: false, label: 'auto_assignment_course:create_automatic.condition_specification' },
  { value: true, label: 'auto_assignment_course:create_automatic.everyone' }
]

export const COMPANY_NAME = {
  COMPANY: 'ジョブナビ',
  NISSOKEN: 'ジョブナレ'
}

export const LESSON_PATH_TYPES = {
  DEFAULT: 'DEFAULT',
  YOUTUBE: 'YOUTUBE',
  EXTERNAL: 'EXTERNAL'
}

export const OPTIONS_PATH_LESSON = [
  { value: LESSON_PATH_TYPES.DEFAULT, label: 'type_path_file' },
  { value: LESSON_PATH_TYPES.YOUTUBE, label: 'type_path_youTube' },
  { value: LESSON_PATH_TYPES.EXTERNAL, label: 'type_path_external' }
]

export const SHARING_RANGE_TALKBOARD = [
  { value: true, label: 'auto_assignment_course:create_automatic.everyone' },
  { value: false, label: 'auto_assignment_course:create_automatic.condition_specification' }
]

export const PROGRESS_OPTION = (t) => [
  { label: t('notification:management.ALL'), value: null },
  { label: t('courseResult:completed_learn'), value: 'COMPLETED' },
  { label: t('courseResult:uncompleted_learn'), value: 'UNCOMPLETED' }
]

export const OPTIONS_PATH_LESSON_IMAGE = [
  { value: LESSON_PATH_TYPES.DEFAULT, label: 'type_path_file' },
  { value: LESSON_PATH_TYPES.EXTERNAL, label: 'type_path_external' }
]

export const OPTIONS_TYPE_LESSON = [
  { value: TYPE_FILE.DEFAULT, label: 'type_file_default' },
  { value: TYPE_FILE.IMAGE, label: 'type_file_image' }
]
