/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'

import { useCallback } from 'react'
import { useInjectReducer, useInjectSaga } from '../store'
import courseSaga from '../modules/course/store/saga'
import courseReducer from '../modules/course/store/reducer'
import {
  makeSelectCourseDetail,
  makeSelectCourseDetailUnregistered,
  makeSelectError,
  makeSelectIsRequestPasswordVideo
} from '../modules/course/store/selectors'
import {
  loadCouresDetail,
  loadCouresDetailUnregistered,
  voteLikeUnit,
  countViewUnitAction,
  requestPasswordVideo
} from '../modules/course/store/actions'
import { usePageNotFound } from '.'
import { useHistories } from './useHistories'

export const useCourseDetail = ({ userId, courseId }) => {
  useInjectSaga({ key: 'courseStore', saga: courseSaga })
  useInjectReducer({ key: 'courseStore', reducer: courseReducer })
  const history = useHistories()
  const flagCount = history.location?.state?.flagCount

  const dispatch = useDispatch()
  const { data: courseDetail, isLoading, isLiking, error } = useSelector(makeSelectCourseDetail())
  const { data: courseDetailUnregistered } = useSelector(makeSelectCourseDetailUnregistered())
  const errorCourseStore = useSelector(makeSelectError())
  const isRequestPasswordVideo = useSelector(makeSelectIsRequestPasswordVideo())

  const voteLikeUnitAction = (payload) => dispatch(voteLikeUnit(payload))
  const requestPasswordVideoAction = useCallback((payload) => dispatch(requestPasswordVideo(payload)), [dispatch])

  usePageNotFound({ error: errorCourseStore })

  const getCourseDetail = () => {
    if (isNaN(courseId)) {
      history.push('/page-not-found')
    } else {
      dispatch(loadCouresDetail({
        userId,
        courseId,
        flagCount: flagCount || false
      }))
    }
  }

  const getCourseDetailUnregistered = () => {
    if (isNaN(courseId)) {
      history.push('/page-not-found')
    } else {
      dispatch(loadCouresDetailUnregistered({
        courseId,
        flagCount: flagCount || false
      }))
    }
  }

  const countViewUnit = (payload) => dispatch(countViewUnitAction(payload))

  return {
    courseDetail,
    loadCouresDetail: getCourseDetail,
    isLoading,
    isLiking,
    isRequestPasswordVideo,
    error,
    errorCourseStore,
    courseDetailUnregistered,
    getCourseDetailUnregistered,
    voteLikeUnitAction,
    countViewUnit,
    requestPasswordVideoAction
  }
}
