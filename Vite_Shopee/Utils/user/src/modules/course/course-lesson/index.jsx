/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { LESSON_DETAIL_TYPE } from '../../../constants'
import { useCourseDetail, useProfile, useUnitLesson } from '../../../hooks'
import { LessonPDF, LessonSlide, LessonVideo } from '../components'

const CourseLessonScreen = () => {
  const { courseId, lessonId } = useParams()
  const { profile } = useProfile()

  const { pathname } = useLocation()
  const { lessonDetail, historyId, submitLesson, isLoadDataSuccess, isSubmitEnd } = useUnitLesson({
    userId: profile.userId,
    courseId,
    lessonId
  })
  const { courseDetail, loadCouresDetail, countViewUnit, isRequestPasswordVideo, requestPasswordVideoAction, isLoading } = useCourseDetail({
    userId: profile.userId,
    courseId
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (isLoadDataSuccess) {
      loadCouresDetail()
    }
  }, [isLoadDataSuccess])

  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
    document.onkeydown = (e) => {
      if (e.keyCode === 123) {
        return false
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
        return false
      }
      if (e.metaKey && e.altKey && e.keyCode === 'I'.charCodeAt(0)) {
        return false
      }
      if (e.metaKey && e.altKey && e.keyCode === 'U'.charCodeAt(0)) {
        return false
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) {
        return false
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
        return false
      }
      if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
        return false
      }
      return true
    }
  }, [])

  const renderLesson = (currentLesson) => {
    switch (currentLesson) {
      case LESSON_DETAIL_TYPE.VIDEO: return (
        <LessonVideo
          courseDetail={courseDetail}
          lessonDetail={lessonDetail}
          submitLesson={submitLesson}
          countViewUnit={countViewUnit}
          courseId={courseId}
          lessonId={lessonId}
          historyId={historyId}
          isLoading={isLoading}
          isRequestPasswordVideo={isRequestPasswordVideo}
          requestPasswordVideoAction={requestPasswordVideoAction}
        />
      )
      case LESSON_DETAIL_TYPE.PDF: return (
        <LessonPDF
          courseDetail={courseDetail}
          lessonDetail={lessonDetail}
          submitLesson={submitLesson}
          countViewUnit={countViewUnit}
          courseId={courseId}
          lessonId={lessonId}
          historyId={historyId}
          isLoading={isLoading}
        />
      )
      case LESSON_DETAIL_TYPE.PPT: return (
        <LessonSlide
          courseDetail={courseDetail}
          lessonDetail={lessonDetail}
          submitLesson={submitLesson}
          isSubmitEnd={isSubmitEnd}
          countViewUnit={countViewUnit}
          courseId={courseId}
          lessonId={lessonId}
          historyId={historyId}
          isLoading={isLoading}
        />
      )
      case LESSON_DETAIL_TYPE.IMAGE: return (
        <LessonPDF
          courseDetail={courseDetail}
          lessonDetail={lessonDetail}
          submitLesson={submitLesson}
          countViewUnit={countViewUnit}
          courseId={courseId}
          lessonId={lessonId}
          historyId={historyId}
        />
      )
      default: return (
        <LessonVideo
          courseDetail={courseDetail}
          lessonDetail={lessonDetail}
          submitLesson={submitLesson}
          countViewUnit={countViewUnit}
          courseId={courseId}
          lessonId={lessonId}
          isLoading={isLoading}
        />
      )
    }
  }

  return (
    <div>
      {!!lessonDetail.type && renderLesson(lessonDetail.type)}
    </div>
  )
}
export default CourseLessonScreen
