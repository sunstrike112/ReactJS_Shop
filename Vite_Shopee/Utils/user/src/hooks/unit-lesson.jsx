/* eslint-disable no-restricted-globals */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useInjectSaga } from '../store'
import courseSaga from '../modules/course/store/saga'
import { makeSelectError, makeSelectLessonDetail, makeSelectLessonIsSubmited } from '../modules/course/store/selectors'
import { loadLessonById, submitLessonById } from '../modules/course/store/actions'
import { usePageNotFound } from '.'
import { useHistories } from './useHistories'

export const useUnitLesson = ({ userId, courseId, lessonId }) => {
  useInjectSaga({ key: 'courseStore', saga: courseSaga })

  const dispatch = useDispatch()
  const history = useHistories()

  const { data: lessonDetail, isLoadDataSuccess, historyId } = useSelector(makeSelectLessonDetail())
  const isSubmitEnd = useSelector(makeSelectLessonIsSubmited())
  const errorCourseStore = useSelector(makeSelectError())
  const submitLesson = (payload) => {
    dispatch(submitLessonById({
      userId,
      courseId,
      lessonId,
      queryParams: { historyId },
      ...payload
    }))
  }

  usePageNotFound({ error: errorCourseStore })

  useEffect(() => {
    if (isNaN(courseId) || isNaN(lessonId)) {
      history.push('/lesson/page-not-found')
    } else {
      dispatch(loadLessonById({
        userId,
        courseId,
        lessonId
      }))
    }
  }, [userId, courseId, lessonId])

  return {
    isSubmitEnd,
    lessonDetail,
    historyId,
    submitLesson,
    isLoadDataSuccess,
    errorCourseStore
  }
}
