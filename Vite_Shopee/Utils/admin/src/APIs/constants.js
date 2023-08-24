const END_POINT = {
  TEST_API: 'api/0.4/',
  COURSE_CATEGORIES: '/admin/course-category/category',
  COURSE_CATEGORY_DETAIL: '/admin/course-category/detail-category',
  COURSE_CATEGORIES_ALL: '/admin/course-category/get-all-category',
  COURSE_CATEGORIES_COMPANY: '/admin/course-category/category-company',
  UPDATE_COURSE_CATEGORY: '/admin/course-category/update-category',
  DELETE_COURSE_CATEGORIES: '/admin/course-category/delete-course-category/',
  GET_COURSE_CATEGORIES_REORDER: '/admin/course-category/get-order-category',
  REORDER_COURSE_CATEGORIES: '/admin/course-category/order-category',

  COURSE_LIST: '/admin/course/course-search',
  GET_ORDER_COURSE: '/admin/course/get-order-course',
  ORDER_COURSE: '/admin/course/order-course',
  COURSE: '/admin/course/',
  DELETE_COURSES: '/admin/course/delete-course/',

  // common
  GET_THEME: '/api/v1/user/theme',
  PRESIGNED: '/api/v1/file/pre-signed',
  GET_UPLOAD_ID_FROM_S3: '/api/v1/admin/course/course-file/list-presigned-by-parts',
  COMPLETE_UPLOAD_FILE: '/api/v1/admin/course/course-file/complete-upload-file',
  USER_ATTRIBUTE: '/admin/user-management/attribute-list',
  USER_COURSE: '/admin/course/course-list',
  USER_GROUP: '/admin/department/list-department',
  USER_UNIT: '/admin/common/user-unit/list',

  ADD_NEW: '/admin/notification/add-news',
  EDIT_NEW: '/admin/notification/edit-news',
  GET_FIND_USER: '/admin/notification/find-user',
  GET_NEWS_DETAIL: '/admin/notification/news-detail',
  LIST_NOTIFICATION: '/admin/notification/list',
  DELETE_NOTIFICATION: '/admin/notification/delete',
  GET_NOTIFICATION: '/notification/detail/',
  SEND_HISTORY: 'admin/contact-management/email/send-history',
  DELETE_HISTORY: 'admin/contact-management/email/delete-history',
  SEND_EMAIL: '/admin/contact-management/email/send-mail',
  EMAIL_DETAIL: '/admin/contact-management/email/email-details',
  SYSTEM_VARIABLE: ({ variable }) => `/system-variable?variable=${variable}`,

  AUTOCOMPLETE: {
    SEARCH_COURSE: '/admin/course/course-unit-search'
  },

  UNIT_SETTING: {
    LIST: '/admin/course/lesson/list-unit-lesson',
    DELETE: '/admin/course/lesson/delete-unit-setting',
    LIST_ORDER: '/admin/course/lesson/order-unit-setting',
    UPDATE_ORDER: '/admin/course/lesson/order-unit-setting',
    CREATE_LECTURE: '/admin/course/lesson/unit-lesson',
    CREATE_LECTURE_IMAGE: '/admin/course/lesson/unit-lesson-image',
    UPDATE_LECTURE: ({ courseId, unitId }) => `/admin/course/lesson/${courseId}/unit-lesson/${unitId}`,
    GET_DETAIL_LECTURE: '/admin/course/lesson/unit',
    PARENT: '/admin/course/unit-setting/',
    REGISTER_TEST: '/admin/course/lesson/register-test/',
    GET_DETAIL_TEST: '/admin/course/unit-setting/detail-test/',
    OPTION_SETTING: '/admin/course/unit-setting/option-settings/',
    UPDATE_PASS_SCORE: '/admin/course/unit-setting/pass-score/',
    GET_QUESTIONS_CATEGORY: '/admin/question-category/test-question-category',
    GET_QUESTIONS_LIST: '/admin/course/unit-setting/question-settings',
    LOAD_ORDER_QUESTIONS: '/admin/course/unit-setting/order-question-settings/',
    DELETE_QUESTION: '/admin/course/unit-setting/delete-question-test/',
    UPDATE_SORT_QUESTION: '/admin/course/unit-setting/order-course',

    CREATE_UNIT_SURVEY: '/admin/course/unit-setting/unit-survey/unit-survey',
    GET_UNIT_SURVEY: '/admin/course/unit-setting/unit-survey/get-detail',
    UPDATE_UNIT_SURVEY: '/admin/course/unit-setting/unit-survey',
    GET_UNIT_SURVEY_QUESTIONS: '/admin/course/unit-setting/unit-survey/unit-question/list',
    DELETE_UNIT_SURVEY_QUESTIONS: '/admin/course/unit-setting/unit-survey/unit-question/delete',
    GET_UNIT_SURVEY_QUESTIONS_CREATE: '/admin/course/unit-setting/unit-survey/question-create',
    CREATE_UNIT_SURVEY_QUESTION: '/admin/course/unit-setting/unit-survey/question',
    GET_UNIT_SURVEY_QUESTION: '/admin/course/unit-setting/unit-survey/question-detail/{questionId}',
    GET_UNIT_SURVEY_QUESTIONS_EDIT: '/admin/course/unit-setting/unit-survey/question-update/{surveyId}',
    UPDATE_UNIT_SURVEY_QUESTION: '/admin/course/unit-setting/unit-survey/question/{questionId}',
    UPDATE_ORDER_UNIT_SURVEY_QUESTION: '/admin/course/unit-setting/order-course',

    CREATE_QUESTION: '/admin/course/unit-setting/question-test',
    GET_DETAIL_QUESTION: 'admin/course/unit-setting/question-detail',
    UPDATE_QUESTION: ({ testId, questionId }) => `/admin/course/unit-setting/${testId}/question-test/${questionId}`,

    // REPORT
    LOAD_DETAIL_REPORT: '/admin/course/unit-report/',
    LOAD_REPORTS: '/admin/publishing-setting',
    REGISTER_REPORT: '/admin/course/lesson/unit-report/',
    LOAD_QUESTION_REPORT: '/admin/course/report-question/',
    QUESTION_SETTING_REPORT: '/admin/course/question-settings/',
    DELETE_QUESTION_REPORT: ({ reportId }) => `/admin/course/report-question/${reportId}`,
    CREATE_QUESTION_REPORT: ({ reportId }) => `/admin/course/report-question/${reportId}`,
    EDIT_QUESTION_REPORT: ({ reportId, questionId }) => `/admin/course/report-question/${reportId}/question/${questionId}`,
    LOAD_DETAIL_QUESTION_REPORT: ({ reportId, questionId }) => `/admin/course/report-question/${reportId}/question/${questionId}`,
    LOAD_DETAIL_PUBLISH_REPORT: ({ reportId }) => `/admin/course/report-question/setting-public/${reportId}`,
    UPDATE_DETAIL_PUBLISH_REPORT: ({ reportId }) => `/admin/course/report-question/setting-public/${reportId}`,
    DOWNLOAD_UNIT_SETTING_CSV: (courseId) => `/admin/course/lesson/list-unit-lesson/${courseId}/export-csv`
  },

  TEST_QUESTION_MANAGEMENT: {
    LOAD_TEST_UNITS: '/admin/question-management/unit-test',
    LOAD_TEST_QUESTIONS: '/admin/question-management/',
    LOAD_TEST_QUESTION_DETAIL: ({ questionId }) => `admin/course/unit-setting/question-detail/${questionId}`,
    DELETE_TEST_QUESTIONS: '/admin/question-management/'
  },

  AUTO_ASSIGNMENT_COURSE: {
    LOAD_AUTOMATIC_ASSIGNMENT: '/admin/course/course-assignment-setting/list',
    DELETE_COURSE_ASSIGNMENT: '/admin/course/course-assignment-setting/delete',
    LOAD_COURSE_CATEGORY: '/admin/course-category/category-company',
    LOAD_COURSE_ASSIGNMENT: '/admin/course/course-assignment-setting/list-course-assign',
    LOAD_TARGET_GROUP: '/admin/department/list-department',
    LOAD_TARGET_ATTRIBUTE: '/admin/user-management/attribute-list',
    CREATE_ASSIGNMENT: '/admin/course/course-assignment-setting/create',
    UPDATE_ASSIGNMENT: '/admin/course/course-assignment-setting/update',
    LOAD_DETAIL_ASSIGNMENT: ({ assignId }) => `/admin/course/course-assignment-setting/${assignId}/detail`
  },

  RECORDING: {
    UPLOAD: 'admin/course/course-file/upload-file/',
    GET_FOLDER_RECORDING: 'admin/course/course-file/get-recording-folders',
    CHECK_EXIST_FILE_NAME: 'admin/course/course-file/check-existed-file'
  },
  PROFILE_USER: '/profile-user',

  UPLOAD_FILE: {
    DELETE_FILES: '/admin/course/course-file/delete',
    DETAIL_FILE: '/admin/course/course-file/detail-file',
    GET_FOLDER_TREE: '/admin/course/course-file/treefile',
    GET_FILES: '/admin/course/course-file/file',
    REGISTER_FOLDER: '/admin/course/course-file/register-folder',
    SEARCH_FILE: '/admin/course/course-file/search-file',
    UPDATE_FILE: '/admin/course/course-file/update-file',
    UPLOAD_FILE: '/admin/course/course-file/upload-file',
    CHECK_EXIST_FILE: '/admin/course/course-file/check-existed-file',
    SUBTITLE_VIDEO: '/admin/course/course-file/subtitle',
    CHECK_LINK_PROJECT: '/admin/project/check-linked-project',
    VIDEO_DETAIL: '/admin/course/course-file/video-detail',
    CHECK_UPLOAD_FILE_STATUS: (id) => `/admin/course/course-file/check-file-upload-status/${id}`,
    GET_FOLDER_ID: '/admin/course/course-file/folder-id-upload-by-web-view'
  },

  UPLOAD_FILE_IMAGE: {
    GET_FOLDER_TREE: '/admin/course/course-file/tree-file-image',
    GET_FILES: '/admin/course/course-file/file-image',
    REGISTER_FOLDER_IMAGE: '/admin/course/course-file/register-folder-image',
    UPLOAD_FILE: '/admin/course/course-file/upload-files'
  },

  COURSE_RESULT: {
    COMPLETE_STATUS: '/admin/study/hist-learn-course/complete-status',
    UNIT_STATUS: '/admin/study/hist-learn-unit/complete-status',
    UNIT_LEARN_COURSE_STATUS: '/admin/study/history-learn-unit/complete-status',
    UNIT_LIST_TEST: '/admin/study/user-unit/list?unitType=TEST',
    UNIT_LIST_SURVEY: '/admin/study/user-unit/list?unitType=SURVEY',
    UNIT_LIST_LESSON: '/admin/study/user-unit/list?unitType=LESSON',
    UNIT_LIST_REPORT: '/admin/study/user-unit/list?unitType=REPORT',
    UNIT_LIST_ALL: '/admin/study/user-unit/list',
    UNIT_DETAIL: '/admin/study/hist-learn-unit/complete-status/history-open-unit',
    UNIT_DETAIL_BY_ID: '/admin/study/hist-learn-unit/complete-status/history-open-unit/detail',
    TEST_RESULT: '/admin/study/hist-test-status/list',
    SURVEY_ANSWER: '/admin/study/hist-survey-status/list',
    SURVEY_RESULTS: 'admin/study/hist-survey-result/list',
    SURVEY_QUESTION: 'admin/study/course',
    GET_COURSE: 'admin/course/course-list',
    GET_REPORT_HISTORIES: 'admin/study/hist-report-result/list',
    GET_REPORT_DETAIL: ({ userId, courseId, reportId }) => `admin/study/user/${userId}/course/${courseId}/report/${reportId}`,
    SURVEY_ANSWER_DETAIL: ({ userId, courseId, surveyId }) => `admin/study/user/${userId}/course/${courseId}/survey/${surveyId}/result-detail`,
    EVALUATE_REPORT: 'admin/study/report-evaluation',
    GET_REPORT_QUESTIONS: ({ userId, courseId, reportId }) => `admin/study/hist-report-result/list-detail?userId=${userId}&courseId=${courseId}&reportId=${reportId}`,
    PUBLIC_REPORT: ({ userId, courseId, reportId, publicStatus }) => `admin/study/user/${userId}/course/${courseId}/report/${reportId}/public-status/${publicStatus}`,
    GET_UNIT: 'admin/study/user-unit/list',
    DOWNLOAD_COURSE_RESULT_CSV: '/admin/study/hist-learn-course/complete-status/export-csv',
    DOWNLOAD_TEST_RESULT_CSV: '/admin/study/hist-test-status/export-csv',
    DOWNLOAD_UNIT_RESULT_CSV: '/admin/study/hist-learn-unit/complete-status/export-csv',
    DOWNLOAD_SURVEY_RESULT_CSV: '/admin/study/hist-survey-status/export-csv',
    DOWNLOAD_UNIT_LEARN_COURSE_RESULT_CSV: '/admin/study/history-learn-unit/complete-status/export-csv',
    UNIT_LEARN_COURSE_DETAIL: '/admin/study/history-learn-unit/complete-status/history-open-unit',

    // Questionnaire Analysis
    ANALYSIS_TEST_RESULT: '/admin/study/analysis-test/list',
    ANALYSIS_TEST_CHART_ANSWER: '/admin/study/analysis-test/get-chart-answer',
    ANALYSIS_TEST_CHART_POINT: '/admin/study/analysis-test/get-chart-point',
    ANALYSIS_TEST_DESCRIPTION: '/admin/study/analysis-test/get-test-description',
    ANALYSIS_TEST_VERSION: '/admin/study/analysis-test/test-result-version',
    ANALYSIS_TEST_ALL_VERSION: '/admin/study/analysis-test/all-version-test',
    DOWNLOAD_ANALYSIS_TEST_RESULT_CSV: '/admin/study/analysis-test/export-test-result',
    ANALYSIS_SURVEY_RESULT: '/admin/study/analysis-survey/list',
    ANALYSIS_SURVEY_CHART_ANSWER: '/admin/study/analysis-survey/get-chart-answer',
    ANALYSIS_SURVEY_TEST_DESCRIPTION: '/admin/study/analysis-survey/get-test-description',
    DOWNLOAD_ANALYSIS_SURVEY_RESULT_CSV: '/admin/study/analysis-survey/export-survey-result',
    ANALYSIS_SURVEY_VERSION: '/admin/study/analysis-survey/survey-result-version',
    ANALYSIS_SURVEY_ALL_VERSION: '/admin/study/analysis-survey/all-version-survey'
  },
  USER: {
    IMPORT_MULTI_USER_CSV: '/admin/user/upload',
    REGISTER_BY_CSV: 'admin/user/external/employee-users-import-csv',
    REGISTER_BY_CSV_WS: 'admin/user/external/employee-users-import-csv-ws',
    REGISTER_WORKSPACE_BY_CSV: 'admin/user/external/work-space/employee-users-import-csv',
    DOWNLOAD_CSV_TEMPLATE: '/admin/company-management/export-csv',
    DOWNLOAD_CSV_USER_LIST: '/admin/user/export-users-csv',
    GET_IMPORT_USER_RESULT: '/admin/user/user-list',
    GET_USERS: '/admin/user/list',
    DELETE_USERS: '/admin/user/delete',
    GET_USER: '/admin/user/user-detail',
    CREATE_USER: '/admin/user/external/employee-users',
    ASSIGN_REMOVE_GROUP: '/admin/user/assign-remove-for-group',
    ASSIGN_REMOVE_ATTRIBUTE: '/admin/user/assign-remove-for-attribute',
    UPDATE_LOGIN_STATUS: '/admin/user/change-status',
    USER_LEARN_STATUS: '',
    USER_TEST_RESULT: '/admin/user/result-test',
    USER_LEARN_HISTORY: '/admin/user-management/course/learned-histories',
    UPDATE_USER: '/admin/user/update',
    UPDATE_USER_WORKSPACE: '/admin/user/work-space/update',

    LOGIN_HISTORY: '/admin/login/history/list',
    LOG_OUT: 'user/authentication/external/logout',

    GET_GROUPS: '/admin/department/list-department',
    GET_GROUP: '',
    CREATE_GROUP: '/admin/department/create-department',
    UPDATE_GROUP: '/admin/department/update-department',
    DELETE_GROUPS: '/admin/department/delete-department',

    GET_ATTRIBUTES: '/admin/user-management/attribute-list',
    GET_ATTRIBUTE: '/admin/user-management/attribute-detail',
    CREATE_ATTRIBUTE: '/admin/user-management/attribute-create',
    UPDATE_ATTRIBUTE: '/admin/user-management/attribute-update',
    DELETE_ATTRIBUTES: '/admin/user-management/attribute-delete',
    GET_COMPANIES: '/admin/company-management/company/list',
    CREATE_NISSOKEN_USER: '/admin/user/nisoken-admin',
    CHECK_EXIST_EMAIL: 'user/authentication/external/exist-email',
    FORMAT_CSV_TO_UTF8: 'admin/user/external/employee-users-format',
    FORMAT_CSV_TO_UTF8_WS: 'admin/user/external/employee-users-format-work-space',
    FORMAT_CSV_TO_UTF8_WS_VIRTUAL: 'admin/user/external/employee-users-format-virtual-company',
    FORMAT_CSV_DELETE_TO_UTF8: 'admin/user/delete-mutil-user-format',
    DELETE_BY_CSV: 'admin/user/delete-mutil-user'
  },
  ISSUE_PERMISSION: {
    GET_LIST_CATEGORY: '/admin/course/enrollment/list-category',
    GET_LIST_USER: '/admin/course/enrollment/list-user',
    GET_LIST_USER_SELECTED: '/admin/course/enrollment/list-user-seleted',

    GET_LIST_ATTRIBUTE: '/admin/user-management/attribute-list',
    GET_LIST_GROUP: '/admin/department/list-department',
    GET_LIST_COURSE: '/admin/course/course-list',

    GET_LIST_ISSUE_PERMISSION: '/admin/course/enrollment/user-course/list',

    UPDATE_ISSUE_PERMISSION: '/admin/course/enrollment/update',
    CREATE_ISSUE_PERMISSION: '/admin/course/enrollment/course-enrollment',
    DELETE_ISSUE_PERMISSION: '/admin/course/enrollment/delete',
    COMPLETE_STATUS: '/admin/study/hist-learn-course/complete-status',

    GET_LIST_UPDATE_ISSUE_PERMISSION: '/admin/course/enrollment/enrollment-update'
  },
  COMPANY_MANAGEMENT: {
    GET_ALL_COMPANY: '/admin/company-management/company/list',
    LOAD_CONTRACT_PLAN: '/admin/plan-package/list',
    GET_COMPANY_DETAIL: (companyId) => `/admin/company-management/detail/${companyId}`,
    LOAD_COMPANY_LIST: '/admin/company-management/list',
    GET_COMPANY_INFO: '/admin/company/my-company',
    UPLOAD_AVATAR: '/admin/company-management/update-avatar',
    GET_PAYMENT_HISTORIES: 'admin/payment-histories/list-history',
    GET_PLANS: '/admin/plan-package/list',
    GENERATE_PAYMENT_TOKEN: '/admin/robot-payment/generate-token',
    ROBOT_PAYMENT_VERIFY: '/admin/robot-payment/verify',
    LOG_BEFORE_CHANGE_CARD: '/admin/robot-payment/log-before-change-card',
    CHANGE_PLAN: '/admin/company-management/update-plan',
    UPDATE_COMPANY_INFO: '/admin/company-management/update-company',
    BLOCK_COMPANY: '/admin/company-management/change-block',
    GET_COMPANY_TYPES: '/admin/company-management/company-trial',
    GET_COMPANY_SELECTED: '/admin/company-management/company-list',
    UPDATE_TRIAL_TIME: '/admin/company-management/update-trial',
    DOWNLOAD_CSV: '/admin/company-management/export-csv',
    DELETE_COMPANY: (companyId) => `/admin/company-management/delete-company/${companyId}`,
    CANCEL_PLAN: (companyId) => `/admin/company-management/cancellation/${companyId}`,
    NOTICE_PAYMENT_SUCCESS: '/admin/company/payment-processing',
    UPDATE_PUSH_NOTIFICATION: '/admin/company/update-company-push-notification',
    GET_COMPANY_LIST_WAITING: '/admin/company-management/list-company-waiting',
    GET_AMOUNT_OF_COMPANY_UNAPPROVED: '/admin/company-management/count-company-waiting',
    GET_COMPANY_WAITING_DETAIL: (companyId) => `/admin/company-management/company-detail/${companyId}`,
    GET_COMPANY_LIST_REFUSED: '/admin/company-management/list-company-refuse',
    GET_ADMIN_PROFILE: '/admin/profile',
    UPDATE_ADMIN_PROFILE: '/admin/profile/update',
    UPDATE_STATUS_FOR_COMPANY_WAITING: '/admin/company-management/approval-company',
    MOVE_COMPANY_REFUSED_TO_WAITING: (companyId) => `/admin/company-management/refuse-to-waiting-status/${companyId}`
  },
  PAYMENT_MANAGER: {
    PAYMENT_HISTORY: '/admin/payment-histories/summary'
  },
  COMPANY_SEMINAR: {
    GET_LIST_SEMINAR: '/admin/seminar/list',
    UPDATE_SEMINAR: '/admin/seminar/update',
    DELETE_SEMINAR: '/admin/seminar/delete',
    CREATE_SEMINAR: '/admin/seminar/create',
    GET_DETAIL_SEMINAR: (seminarId) => `/admin/seminar/${seminarId}/detail`
  },

  WORK_SPACE: {
    CREATE: '/admin/work-space/create',
    GET_ALL_WORKSPACE: '/admin/work-space/',
    GET_DETAIL: (workspaceId) => `/admin/work-space/detail/${workspaceId}`,
    GET_ADMINS_NISSOKEN: '/admin/work-space/user-admin',
    EDIT: (workspaceId) => `/admin/work-space/update/${workspaceId}`,
    DELETE_WORKSPACE: 'admin/work-space/delete-workspace/',
    DELETE_USER_WORKSPACE: (workspaceId) => `admin/work-space/delete-user-workspace/${workspaceId}`,
    ADD_USER_WORKSPACE: 'admin/user/external/work-space/employee-users'
  },

  SETTING_MAINTENANCE: {
    GET_SETTTING_MAINTENANCE_STATUS: '/admin/maintenance_setting/maintenance-setting',
    UPDATE_SETTING_MAINTENANCE_STATUS: '/admin/maintenance_setting/update-maintenance-setting'
  },

  SETTING_DOMAIN: {
    LOAD_DOMAINS: '/admin/domain_setting/white-list',
    ADD_DOMAIN: '/admin/domain_setting/white-list/add',
    DELETE_DOMAIN: '/admin/domain_setting/white-list/delete'
  },

  SETTING_PASSWORD_PLAN: {
    GET_PASSWORDS: '/admin/plan-package/planzz-list-password',
    ADD_PASSWORD: '/admin/plan-package/planzz-register-password',
    DELETE_PASSWORD: '/admin/plan-package/planzz-delete-password',
    CHANGE_STATUS: (companyId) => `/admin/planzz/enable-planzz/${companyId}`,
    APPLY_PLAN_ZZ: (companyId) => `/admin/planzz/register-planzz/${companyId}`
  },

  SETTING_COURSE_JOBNARE: {
    UPDATE_AUTO_STATUS: '/admin/course/except/change-auto',
    GET_EXCEPT_COURSE: '/admin/course/except/detail-except-course',
    ADD_EXCEPT_COURSE: '/admin/course/except/add-except-course',
    DELETE_EXCEPT_COURSE: '/admin/course/except/delete-except-course'
  },

  PROJECT_MANAGAMENT: {
    GET_LIST_PROJECT: '/admin/project/list',
    DELETE_PROJECT: '/admin/project/delete',
    CREATE_PROJECT: '/admin/project/create',
    CHECK_EXIST_PROJECT_NAME: '/admin/project/check-existed-project',
    PROJECT_DETAIL: '/admin/project/detail',
    UPDATE_PROJECT_NAME: (projectId) => `/admin/project/update-project-name/${projectId}`,
    CREATE_THUMBNAIL: '/admin/project/create-video-thumbnail',
    PUBLISH_PROJECT: '/admin/project/publishVideo'
  },

  VIDEO_EDITOR: 'admin/project/combine-video',
  VIDEO_SPLIT_PAUSE: 'admin/project/cut-pause-video',

  TAG_MANAGEMENT: 'admin/tags',

  COMMUNITY_MANAGEMENT: {
    GET_LIST_TALKBOARD: '/admin/talk-board/list',
    GET_TALKBOARD_DETAIL: '/admin/talk-board',
    CREATE_TALKBOARD: '/admin/talk-board',
    DELETE_TALKBOARD: '/admin/talk-board',
    UPDATE_TALKBOARD: (talkBoardId) => `/admin/talk-board/${talkBoardId}`,
    GET_GROUP: '/admin/talk-board/groups',
    GET_ATTRIBUTE: '/admin/talk-board/attributes',
    GET_TAG: '/admin/talk-board/tags',
    DOWNLOAD_TALKBOARD_CSV: '/admin/talk-board/export-csv',
    UPLOAD_FILE: (talkBoardId) => `/admin/talk-board/file/${talkBoardId}`,
    DELETE_TALKBOARD_FILE: 'admin/talk-board/file',
    CHECK_OVERSIZE: ({ totalSize }) => `/admin/course/course-file/check-over-size-package/${totalSize}`,
    GET_LIST_COMMENT: 'admin/comments',
    DOWNLOAD_COMMENT_CSV: '/admin/comments/export-csv',
    HIDE_COMMENT: 'admin/comments/hide'
  },

  // SETTING-MAIL-SERVER
  SETTING_MAIL_SERVER: {
    GET_EMAIL_SERVER: ({ companyId }) => `/admin/company-management/config-email/${companyId}`,
    UPDATE_EMAIL_SERVER: 'admin/company-management/config-email'
  },

  // REPORT-TEMPLATE-MANAGEMENT
  REPORT_TEMPLATE_MANAGEMENT: {
    GET_LIST_TEMPLATE: '/admin/template/list',
    GET_DETAIL_TEMPLATE: ({ templateId }) => `/admin/template/detail/${templateId}`,
    GET_LIST_REPORT: '/admin/report/search',
    GET_DETAIL_REPORT: ({ reportId }) => `/admin/report/information/${reportId}`,
    SEARCH_COMMENTS: 'user/report/comment/search'
  },
  SETTING_MOBILE: {
    GET_DETAIL: '/admin/mobile-settings/detail',
    UPDATE: '/admin/mobile-settings'
  },
  EXTERNAL: {
    GET_APIS: '/admin/external-apis',
    DELETE_API: (id) => `/admin/external-apis/${id}`,
    GET_IPS: '/admin/ip-configurations',
    DELETE_IP: (id) => `/admin/ip-configurations/${id}`,
    GET_APIS_MANAGER: '/admin/external-api-managers',
    DELETE_API_MANAGER: (id) => `/admin/external-api-managers/${id}`
  }
}

export default END_POINT
