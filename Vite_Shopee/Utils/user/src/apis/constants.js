const V1 = 'api/v1'
const END_POINT = {
  PRE_SIGN: `${V1}/file/pre-signed`,
  UPLOAD_AVATAR: `${V1}/update-avatar`,
  CHANGE_PASSWORD: `${V1}/user/authentication/external/change-password-profile`,
  UPDATE_PROFILE: `${V1}/update-user-profile`,
  USER_PROFILE: `${V1}/profile-user`,
  USER_CATEGORY: `${V1}/user/course-list/category-user`,
  COURSE_CATEGORY: `${V1}/user/course-list/course-category`,
  COURSE: `${V1}/user/course/user-course`,
  COURSE_DETAIL: `${V1}/user/course/course-detail`,
  VOTE_LIKE_UNIT: ({ courseId, courseUnitId, typeUnit }) => `${V1}/user/course/${courseId}/${courseUnitId}/${typeUnit}`,
  COUNT_VIEW_UNIT: ({ courseId, lessonId, typeUnit }) => `${V1}/user/unit/${courseId}/count-lesson/${lessonId}/${typeUnit}`,
  COURSE_DETAIL_UNREGISTERED: `${V1}/user/course/unregistered-course-details`,
  VERIFY_CODE: `${V1}/verify-code`,
  UPDATE_EMAIL: `${V1}/update-email`,
  GET_PLAN: `${V1}/admin/plan-package/list`,
  GENERATE_PAYMENT_TOKEN: `${V1}/admin/robot-payment/generate-token`,
  CHANGE_PLAN: `${V1}/admin/company-management/update-plan`,
  MY_PAGE: {
    STUDYING_INDIVIDUAL: `${V1}/user/mypage/course-studying-individual`,
    STUDYING_COMPANY: `${V1}/user/mypage/course-studying-company`,
    BOOK_MARKED: `${V1}/user/mypage/courses-bookmark`,
    COSTS_INDIVIDUAL: `${V1}/user/mypage/course-costs-individual`,
    REQUIRED_COMPANY: `${V1}/user/mypage/course-required-company`,
    HIDE_COURSES: ({ courseId }) => `${V1}/user/mypage/hide-course/${courseId}`,
    VOTE_LIKE_COURSE: ({ courseId }) => `${V1}/user/course/${courseId}`,
    CHANGE_ORDER: (courseId) => `${V1}/user/mypage/change-order/${courseId}`
  },
  UNIT_TEST: {
    LIST_QUESTION: ({ courseId, testId }) => `${V1}/user/unit/${courseId}/test-intro/${testId}`,
    LESSON_DETAIL: ({ courseId, lessonId }) => `${V1}/user/unit/${courseId}/lesson/${lessonId}`,
    SUBMIT: ({ courseId, lessonId }) => `${V1}/user/unit/${courseId}/complete/lesson/${lessonId}`,
    LAST_VIEWED_VIDEO: ({ courseId, lessonId }) => `${V1}/user/unit/${courseId}/lesson/${lessonId}/last-viewed`,
    CONFIRM_PASSWORD_VIDEO: ({ courseId, lessonId }) => `${V1}/user/unit/${courseId}/lesson/${lessonId}/check-password`,
    TEST_RESULT: ({ courseId, testId }) => `${V1}/user/unit/${courseId}/result-test/${testId}`,
    SUBMIT_TEST: ({ courseId, testId }) => `${V1}/user/unit/${courseId}/submit/${testId}`,
    COUNT: ({ courseId, testId }) => `${V1}/user/unit/${courseId}/count-test/${testId}`
  },
  SURVEY: {
    LIST_QUESTION: ({ courseId, surveyId }) => `${V1}/user/course/${courseId}/survey/${surveyId}`,
    RESULT: ({ courseId, surveyId }) => `${V1}/user/course/${courseId}/survey-result/${surveyId}`,
    SUBMIT: ({ courseId, surveyId }) => `${V1}/user/course/${courseId}/submit/${surveyId}`,
    COUNT: ({ courseId, surveyId }) => `${V1}/user/course/${courseId}/count-survey/${surveyId}`
  },
  REPORT: {
    DETAIL: ({ courseId, reportId }) => `${V1}/user/unit/${courseId}/report-detail/${reportId}`,
    SUBMIT: ({ courseId, reportId }) => `${V1}/user/unit/${courseId}/submit-report/${reportId}`,
    COUNT: ({ courseId, reportId }) => `${V1}/user/unit/${courseId}/count-report/${reportId}`
  },
  NOTIFICATION: {
    LIST: `${V1}/user/notification/notification-list`,
    DETAIL: `${V1}/user/notification/notification-detail`,
    UNREAD: `${V1}/user/notification/number-notification-unread`,
    DELETE: `${V1}/user/notification/delete-notifications`
  },
  COURSE_LIST: {
    COMPANY: `${V1}/user/course-list/course-type-company`,
    COST: `${V1}/user/course-list/course-type-cost`,
    FREE: `${V1}/user/course-list/course-type-free`,
    NISSOKEN: `${V1}/user/course-list/course-type-nissoken`,
    TYPE: `${V1}/user/course-list/course-type`,
    NEW_COURSE: `${V1}/user/course-list/new-course`,
    UPDATE_BOOKMARK: `${V1}/user/course/change-bookmark`
  },
  AUTH: {
    EMAIL_RESET: `${V1}/user/authentication/external/password/reset`,
    LOGIN: `${V1}/user/authentication/external/login`,
    LOG_OUT: `${V1}/user/authentication/external/logout`,
    MAINTAIN_NOTICE: `${V1}/admin/maintenance_setting/maintenance-notice`,
    GET_THEME: `${V1}/user/theme`
  },
  REGISTER: {
    EMAIL: `${V1}/user/authentication/external/users`,
    VERIFY_PASSWORD: `${V1}/user/authentication/external/password`,
    SETTING_PASSWORD: `${V1}/user/authentication/external/password`,
    REGISTER_COMPANY: `${V1}/user/authentication/external/company-users`,
    VERIFY_COMPANY: `${V1}/user/authentication/external/company-users`,
    VERIFY_EMPLOYEE: `${V1}/user/authentication/external/employee-users`,
    RESEND_EMAIL: `${V1}/user/authentication/external/resend-token-web`,
    GET_EMAIL: `${V1}/user/authentication/external/mail-token-web`,
    CHECK_EMAIL_EXIST: `${V1}/user/authentication/external/register-company`
  },
  PLAN_PACKAGE: {
    LIST: `${V1}/admin/plan-package/list`,
    CHECK_OVERSIZE: ({ totalSize }) => `${V1}/admin/course/course-file/check-over-size-package/${totalSize}`
  },
  WORKSPACE: {
    LIST: `${V1}/user/workspace/list`
  },
  CART: `${V1}/cart`,
  SEMINAR: `${V1}/user/seminar`,
  TALK_BOARD: {
    COMMENT_LIST: (talkBoardId) => `${V1}/user/talk-board/${talkBoardId}/comments`,
    UPLOAD_FILE_COMMENT: ({ commentId }) => `${V1}/user/talk-board-file/file/${commentId}`,
    UPLOAD_FILE_CREATE_TALK_BOARD: ({ talkBoardId }) => `${V1}/user/talk-board-file/talk-board/${talkBoardId}`,
    CREATE_COMMENT: ({ talkBoardId }) => `${V1}/user/talk-board/${talkBoardId}/comments`,
    GET_TAG: `${V1}/user/tags`,
    GET_GROUP: `${V1}/user/talk-board/user-groups`,
    GET_ATTRIBUTE: `${V1}/user/talk-board/user-attributes`,
    CREATE_TALK_BOARD: `${V1}/user/talk-board/create`,
    GET_LIST_TALK_BOARD: `${V1}/user/talk-board/list`,
    GET_UNREAD_TALK_BOARD: `${V1}/user/talk-board/count-unread`,
    DELETE_TALK_BOARD: ({ talkBoardId }) => `${V1}/user/talk-board/delete/${talkBoardId}`,
    LIKE_COMMENT: ({ commentId }) => `${V1}/user/talk-board/like-comment/${commentId}`,
    DISLIKE_COMMENT: ({ commentId }) => `${V1}/user/talk-board/dislike-comment/${commentId}`,
    GET_USER_LIKE_COMMENT: ({ commentId }) => `${V1}/user/talk-board/comment-talk-board-like/${commentId}`,
    GET_USER_DISLIKE_COMMENT: ({ commentId }) => `${V1}/user/talk-board/comment-talk-board-dislike/${commentId}`,
    READ_COMMENT: ({ commentId }) => `${V1}/user/talk-board/read-talk-comment/${commentId}`,
    GET_TALK_BOARD_DETAIL_VIEW: ({ talkBoardId }) => `${V1}/user/talk-board/detail-view/${talkBoardId}`,
    GET_TALK_BOARD_DETAIL_EDIT: ({ talkBoardId }) => `${V1}/user/talk-board/detail-edit/${talkBoardId}`,
    UPDATE_TALK_BOARD: ({ talkBoardId }) => `${V1}/user/talk-board/update/${talkBoardId}`,
    DELETE_TALK_BOARD_FILE: `${V1}/user/talk-board-file/delete-talk-board-file`,
    DELETE_COMMENT_FILE: `${V1}/user/talk-board-file/delete-comment-file`,
    UPDATE_COMMENT: ({ talkBoardId, commentId }) => `${V1}/user/talk-board/${talkBoardId}/comments/${commentId}`,
    GET_USER_LIKE_TALK_BOARD: ({ talkBoardId }) => `${V1}/user/talk-board/talk-board-like/${talkBoardId}`,
    GET_USER_DISLIKE_TALK_BOARD: ({ talkBoardId }) => `${V1}/user/talk-board/talk-board-dislike/${talkBoardId}`,
    GET_USER_CHECK_COMPLETE_TALK_BOARD: ({ talkBoardId }) => `${V1}/user/talk-board/complete-talk-board/${talkBoardId}`,
    LIKE_TALK_BOARD: ({ talkBoardId }) => `${V1}/user/talk-board/like-talk-board/${talkBoardId}`,
    DISLIKE_TALK_BOARD: ({ talkBoardId }) => `${V1}/user/talk-board/dislike-talk-board/${talkBoardId}`,
    CHECK_COMPLETE_TALK_BOARD: ({ talkBoardId }) => `${V1}/user/talk-board/complete-talk-board/${talkBoardId}`,
    READ_TALK_BOARD: ({ talkBoardId }) => `${V1}/user/talk-board/read-talk-board/${talkBoardId}`,
    DELETE_COMMENT: ({ talkBoardId, commentId }) => `${V1}/user/talk-board/${talkBoardId}/comments/${commentId}`
  },
  DAILY_REPORT: {
    // Daily reports
    SEARCH: `${V1}/user/report/search`,
    GET_DAILY_REPORT: (dailyReportId) => `${V1}/user/report/information/${dailyReportId}`,
    CREATE_DAILY_REPORT: `${V1}/user/report/create`,
    EDIT_DAILY_REPORT: (dailyReportId) => `${V1}/user/report/update/${dailyReportId}`,
    DELETE_DAILY_REPORT: (dailyReportId) => `${V1}/user/report/delete/${dailyReportId}`,
    LIKE_DAILY_REPORT: (dailyReportId) => `${V1}/user/report/like/${dailyReportId}`,
    DISLIKE_DAILY_REPORT: (dailyReportId) => `${V1}/user/report/dislike/${dailyReportId}`,
    GET_USERS_INTERACTED_DAILY_REPORT: (action, dailyReportId) => `${V1}/user/report/list-user-have-action/${action}/${dailyReportId}`,
    MARK_READ: (dailyReportId) => `${V1}/user/report/mark-read/${dailyReportId}`,
    SEARCH_COMMENTS: `${V1}/user/report/comment/search`,
    CREATE_COMMENT: `${V1}/user/report/comment/create`,
    EDIT_COMMENT: (commentId) => `${V1}/user/report/comment/edit/${commentId}`,
    DELETE_COMMENT: (commentId) => `${V1}/user/report/comment/delete/${commentId}`,
    LIKE_COMMENT: (commentId) => `${V1}/user/report/comment/like/${commentId}`,
    DISLIKE_COMMENT: (commentId) => `${V1}/user/report/comment/dislike/${commentId}`,
    GET_USERS_INTERACTED_COMMENT: (action, commentId) => `${V1}/user/report/comment/list-user-have-action/${action}/${commentId}`,
    SET_COMPLETE: (dailyReportId) => `${V1}/user/report/complete/${dailyReportId}`,
    GET_UNREAD: `${V1}/user/report/report-unread-count`,
    GET_PREV_NEXT: `${V1}/user/report/process-next-previous`,
    // Template
    TEMPLATES: `${V1}/user/template/list`,
    TEMPLATE_DETAIL: (templateId) => `${V1}/user/template/detail-edit/${templateId}`,
    DELETE_TEMPLATE: (templateId) => `${V1}/user/template/delete/${templateId}`,
    EDIT_TEMPLATE: (templateId) => `${V1}/user/template/update/${templateId}`,
    CREATE_TEMPLATE: `${V1}/user/template/create`
  }
}

export default END_POINT
