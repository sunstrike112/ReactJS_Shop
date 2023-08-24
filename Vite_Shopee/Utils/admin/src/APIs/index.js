export { testAPI } from './test.api'
export {
  getCourseCategories,
  getAllCourseCategories,
  createCourseCategories,
  getDetailCourseCategory,
  editCourseCategories,
  deleteCourseCategories,
  getCourseCategoriesReorder,
  reOderCourseCategories,
  getCourses,
  getOrderCourse,
  updateOrderCourse,
  getCourse,
  createCourse,
  editCourse,
  deleteCourse,
  updateStatusAuto,
  addExceptCourse,
  getExceptCourse,
  deleteExceptCourse
} from './course.api'

export {
  createNotifi,
  getFindUser,
  deleteNotifi,
  getNotifi,
  editNotifi,
  getListUserFind,
  getReceiverEmail,
  sendEmailAPI,
  getListSendHistory,
  deleteHistory,
  getEmailDetail
} from './notification.api'

export { getAutocompleteCourse } from './autocomplete.api'

export { getS3PresinedUrl, getThemeAPI, getUploadIdFromS3Api, completeUpLoadFileApi } from './common.api'
export * from './register-by-csv'
export * from './delete-by-csv'

export {
  getListUnitLesson,
  deleteListUnitLesson,
  getListOrderUnitLesson,
  updateOrderUnitLesson,
  createUnitLesson,
  createQuestion,
  basicInfoSetting,
  registerTest,
  getDetailTestAPI,
  optionSettingTest,
  getDetailLecture,
  editUnitLesson,
  updatePassScore,
  getQuestionsCategory,
  getQuestionListAPI,
  deleteQuestion,
  loadOrderQuestionAPI,
  updateSortQuestionAPI,
  createUnitSurvey,
  getUnitSurvey,
  updateUnitSurvey,
  getUnitSurveyQuestions,
  deleteUnitSurveyQuestions,
  createUnitSurveyQuestion,
  getUnitSurveyQuestion,
  updateUnitSurveyQuestion,
  updateOrderUnitSurveyQuestion,
  getDetailQuestion,
  editQuestion,
  downloadUnitSettingsCSV,
  createUnitLessonImage,
  getUnitLessonImage
} from './unit-setting.api'

export {
  loadReportsAPI,
  loadReportDetailAPI,
  registerReportAPI,
  loadQuestionReportAPI,
  updateBasicReportAPI,
  settingQuestionReportAPI,
  deleteQuestionReportAPI,
  createQuestionReportAPI,
  loadDetailQuestionReportAPI,
  editQuestionReportAPI,
  loadDetailPublishReportAPI,
  updateDetailPublishReportAPI
} from './report-setting.api'

export {
  loadTestUnitsAPI,
  loadTestQuestionsAPI,
  deleteTestQuestionsAPI,
  loadTestQuestionDetailAPI
} from './test-question-management'

export {
  loadAutomaticAssignmentAPI,
  deleteCourseAssignmentAPI,
  loadCourseCategoryAPI,
  loadCourseAssignmentAPI,
  loadTargetGroupAPI,
  loadTargetAttributeAPI,
  createAssignmentAPI,
  updateAssignmentAPI,
  loadDetailAssignmentAPI
} from './auto-assignment-course'

export * from './auth.api'

export {
  getListPaymentHistory
} from './payment-manager.api'

export * from './recording'

export {
  getFolderTreeAPI,
  getFolderFilesAPI,
  getFolderFileAPI,
  deleteFolderFilesAPI,
  updateFolderFileAPI,
  uploadFileAPI,
  addNewFolderAPI,
  searchFileAPI,
  uploadSubtitle,
  checkLinkProject,
  getVideoDetail,
  checkUploadFileStatusAPI,
  getFolderIdAPI
} from './upload-file.api'

export {
  getFolderTreeImageApi,
  getFolderFilesImageAPI,
  addNewFolderImageAPI,
  deleteFolderFilesImageAPI,
  uploadFilesAPI
} from './upload-file-image'

export {
  getUserAttribute,
  getUserCourse,
  getUserGroup,
  getUserUnit,
  getCourseStatus,
  getUnitStatus,
  getUnitListTest,
  getUnitListSurvey,
  getUnitListLesson,
  getUnitListReport,
  getUnitListAll,
  getTestResult,
  getSurveyAnswer,
  getResultOfSurvey,
  getSurveyQuestion,
  getUnitsByCourseIds,
  getReportHistories,
  getSurveyAnswerDetail,
  getReportDetail,
  evaluateReport,
  getReportQuestions,
  publicReport,
  downloadCourseResultCSV,
  downloadTestResultCSV,
  downloadUnitResultCSV,
  downloadSurveyResultCSV,
  getUnitDetail,
  getUnitDetailById,
  getVariable,

  // Questionnaire Analysis
  loadAnalysisTestResultAPI,
  loadAnalysisTestChartAnswerAPI,
  loadAnalysisTestChartPointAPI,
  loadAnalysisTestDescriptionAPI,
  loadAnalysisTestVersionAPI,
  getVersionTestListAPI,
  downloadAnalysisTestResultCSV,

  loadAnalysisSurveyResultAPI,
  loadAnalysisSurveyChartAnswerAPI,
  loadAnalysisSurveyDescriptionAPI,
  loadAnalysisSurveyVersionAPI,
  getVersionSurveyListAPI,
  downloadAnalysisSurveyResultCSV
} from './course-result.api'

export {
  downloadUnitLearnCourseResultCSV
} from './unit_learn_course_result'

export * from './user.api'

export {
  getListCategory,
  getListUser,
  getListUserSelectedAPI,

  getListAttribute,
  getListGroup,
  getListCourse,

  getListIssuePermission,
  updateIssuePermission,
  deleteIssuePermission,
  createIssuePermission,

  getListUpdateIssuePermission
} from './issue-permission.api'

export {
  loadContractPlanAPI,
  loadCompanyListAPI,
  getCompanyInfo,
  uploadAvatar,
  getPaymentHistories,
  getPlans,
  generateToken,
  noticePaymentSuccessAPI,
  changePlan,
  updateCompanyInfoAPI,
  getCompanyAllAPI,
  robotPaymentVerifyAPI,
  getCompanyDetailAPI,
  deleteCompany,
  blockCompanyAPI,
  getCompanyTypesAPI,
  getCompanySelectedAPI,
  downloadCompanyCSV,
  cancelPlanAPI,
  updateTrialTimeAPI,
  logBeforeChangeCardAPI,
  getCompanyListWaitingAPI,
  getAmountOfCompanyUnapprovedApi,
  getCompanyWaitingDetailAPI,
  getCompanyListRefusedAPI,
  getAdminProfileAPI,
  updateAdminProfileAPI,
  updateStatusForCompanyWaitingAPI,
  moveCompanyRefusedToWaitingAPI
} from './company.api'

export {
  getListSeminar,
  updateSeminar,
  deleteSeminar,
  createSeminar,

  getDetailSeminar
} from './company-seminar.api'

export {
  loadSettingMaintenanceStatus,
  updateSettingMaintenanceStatus
} from './setting-maintenance.api'

export {
  getListTemplateAPI,
  getTemplateDetailAPI,
  getListReportAPI,
  getReportDetailAPI,
  searchCommentsDailyReportAPI
} from './report-template-management'

export * from './setting-domain.api'
export * from './setting_password_plan.api'
export * from './project.api'
export * from './workspace.api'

export * from './video-editor'
export * from './tag-management'
export * from './community-management'
export * from './setting-mail-server'
export * from './setting-mobile.api'
export * from './external.api'
