export {
  getListCourseByUser,
  getCourseDetail,
  getCourseCompany,
  getCourseCost,
  getCourseFree,
  getCourseNissoken,
  getCourseType,
  getCourseDetailUnregistered,
  addToCart,
  getCourseInCart,
  removeFromCart,
  voteLikeUnit,
  countViewUnit,
  getNewCourse
} from './course.api'

export {
  getCourseStudyingIndividual,
  getCourseStudyingCompany,
  getCourseBookMarkedApi,
  getCourseCostIndividual,
  hiddenCourseAPI,
  getCourseRequiredCompany,
  voteLikeCourse,
  changeOrderCourseApi
} from './mypage.api'

export * from './auth.api'

export {
  getListCategoryByUser,
  getCourseCategoryByUser
} from './categories.api'

export {
  getUnitQuestions,
  getLessonById,
  getTestResult,
  submitTest,
  submitLessonById,
  countTestUnit,
  submitAndViewLessonAtOnce,
  saveLastViewedVideoAPI
} from './unit-test.api'

export { getSurvey, getSurveyResult, submitSurvey, countSurvey } from './survey.api'

export { getReport, submitReport, countReport } from './report.api'

export { getListNotification, getNotificationDetail, getNotificationUnread } from './notification.api'

export {
  getUserProfile,
  getUserProfileWorkspaceAPI,
  uploadFile,
  changePassword,
  updateProfile,
  uploadAvatar,
  verifyCode,
  updateEmail,
  getPlan,
  generateToken,
  changePlan
} from './profile.api'

export {
  getListPlanPackage,
  checkOverSizeAPI
} from './plan-package.api'

export {
  getSeminarList,
  getSeminarDetail
} from './seminar.api'

export * from './workspace.api'
export * from './s3.api'
export * from './talk-board.api'
export * from './talkboard.api'
export * from './dailyReports.api'
