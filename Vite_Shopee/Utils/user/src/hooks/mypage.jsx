import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import reducer from '../modules/mypage/store/reducer'
import saga from '../modules/mypage/store/saga'
import { USER_ROLE } from '../constants'
import { useInjectSaga, useInjectReducer } from '../store'
import {
  makeSelectCoursesStudingIndividual,
  makeSelectCoursesRequired,
  makeSelectCoursesStudyingCompany,
  makeSelectCoursesStudyingNissoken,
  makeSelectCoursesStudyingRequired,
  makeSelectIsLoading,
  makeSelectCourseProgress,
  makeSelectIsLiking,
  makeSelectTotalCourse,
  makeSelectSavedFilter,
  makeSelectDisplayType
} from '../modules/mypage/store/selectors'
import {
  loadCourseStudyingIndividual,
  loadCourseStudyingCompany,
  loadCourseStudyingNissoken,
  loadCourseCostsIndividual,
  loadCourseRequiredCompany,
  loadCourseProgress,
  hiddenCourse,
  voteLikeCourseRequest,
  resetFilter,
  updateOrderCourses,
  updateDisplayType
} from '../modules/mypage/store/actions'

export const useCourseStudying = ({ userRole }) => {
  useInjectSaga({ key: 'myPageStore', saga })
  useInjectReducer({ key: 'myPageStore', reducer })
  const dispatch = useDispatch()
  const { courseIndividual } = useSelector(makeSelectCoursesStudingIndividual())
  const { data: courseNissoken } = useSelector(makeSelectCoursesStudyingNissoken())
  const { data: courseCompany } = useSelector(makeSelectCoursesStudyingCompany())
  const { data: courseRequired } = useSelector(makeSelectCoursesStudyingRequired())
  const courseProgress = useSelector(makeSelectCourseProgress())
  const isLoading = useSelector(makeSelectIsLoading())
  const isLiking = useSelector(makeSelectIsLiking())
  const totalCourse = useSelector(makeSelectTotalCourse())
  const displayType = useSelector(makeSelectDisplayType())

  const getCourseStudyingCompany = (payload) => dispatch(loadCourseStudyingCompany(payload))
  const getCourseStudyingNissoken = (payload) => dispatch(loadCourseStudyingNissoken(payload))
  const getCourseStudyingRequired = (payload) => dispatch(loadCourseRequiredCompany(payload))
  const getCourseStudyingIndividual = (payload) => dispatch(loadCourseStudyingIndividual(payload))
  const getCourseProgress = (payload) => dispatch(loadCourseProgress(payload))
  const hiddenCourseAction = (payload) => dispatch(hiddenCourse(payload))
  const voteLikeCourse = (payload) => dispatch(voteLikeCourseRequest(payload))
  const updateOrderCoursesAction = useCallback((payload) => {
    dispatch(updateOrderCourses(payload))
  }, [dispatch])
  const updateDisplayTypeAction = useCallback((payload) => {
    dispatch(updateDisplayType(payload))
  }, [dispatch])

  // filter search
  const savedFilter = useSelector(makeSelectSavedFilter())
  const resetFilterMyPageAction = () => dispatch(resetFilter())

  return {
    courseCompany: userRole === USER_ROLE.INDIVIDUAL_USER ? courseIndividual : courseCompany,
    courseNissoken,
    courseRequired,
    isLoading,
    isLiking,
    courseProgress,
    totalCourse,
    savedFilter,
    displayType,
    getCourseStudyingCompany,
    getCourseStudyingNissoken,
    getCourseStudyingRequired,
    getCourseStudyingIndividual,
    getCourseProgress,
    hiddenCourseAction,
    voteLikeCourse,
    resetFilterMyPageAction,
    updateOrderCoursesAction,
    updateDisplayTypeAction
  }
}

export const useCourseCosts = ({ userRole }) => {
  useInjectSaga({ key: 'myPageStore', saga })
  useInjectReducer({ key: 'myPageStore', reducer })
  const dispatch = useDispatch()
  const getCourseCosts = () => dispatch(loadCourseCostsIndividual())

  const data = useSelector(makeSelectCoursesRequired())
  useEffect(() => {
    if (userRole === USER_ROLE.INDIVIDUAL_USER) {
      dispatch(loadCourseCostsIndividual())
    }
    if ([USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN].includes(userRole)) {
      dispatch(loadCourseRequiredCompany())
    }
  }, [userRole])

  return {
    courseCosts: userRole === USER_ROLE.INDIVIDUAL_USER ? data.data.myPageCourseCosts : data.data.myPageCourseCompanyRequired,
    loadCourseCosts: getCourseCosts
  }
}
