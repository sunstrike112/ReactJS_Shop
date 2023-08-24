/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import Container from '../../../components/container'
import HomeLayout from '../../layouts/home'
import Wrapper from './styled'
import { CourseDetail, ComletionStatus } from '../components'
import { WarningButton } from '../../../components'
import { useCourseDetail, useGlobalStore, useHistories, useProfile } from '../../../hooks'
import useQuery from '../../../hooks/useQuery'
import { STORAGE } from '../../../utils'

const CourseDetailScreen = () => {
  const { courseId } = useParams()
  const { profile } = useProfile()
  const history = useHistories()
  const { t } = useTranslation()

  const { initRoute } = useGlobalStore()

  const query = useQuery()
  const fromTab = query.get('fromTab')
  const isCourseList = query.get('isCourseList')
  const { courseDetail, loadCouresDetail } = useCourseDetail({
    userId: profile.userId,
    courseId
  })
  useEffect(() => {
    if (isCourseList && isCourseList !== 'TRUE') {
      history.push('page-not-found')
    }
    window.scrollTo(0, 0)
    // TODO: Handle back browser
  }, [isCourseList])

  useEffect(() => {
    loadCouresDetail()
  }, [courseId])

  useEffect(() => {
    const removeRequestView = () => {
      if (history.location.state && history.location.state.flagCount) {
        let state = { ...history.location.state }
        delete state.flagCount
        history.replace({ ...history.location, state })
      }
    }
    window.addEventListener('beforeunload', removeRequestView)
    return () => {
      window.removeEventListener('beforeunload', removeRequestView)
    }
  }, [])

  const goBack = () => {
    const sourcePathLocal = localStorage.getItem(STORAGE.SOURCE_PATH)
    if (sourcePathLocal && fromTab) {
      history.push(`${localStorage.getItem(STORAGE.SOURCE_PATH)}?fromTab=${fromTab}`)
    } else if (sourcePathLocal && !fromTab) {
      history.push(`${localStorage.getItem(STORAGE.SOURCE_PATH)}`)
    } else {
      history.push(initRoute.home)
    }
  }
  return (
    <HomeLayout>
      {courseDetail ? (
        <Wrapper>
          <Container>
            <WarningButton
              title={t('examination.back')}
              color="text_primary"
              fontWeight="fw_600"
              onClick={goBack}
              className="back-button-mobile"
            />
            <div className="top">
              <WarningButton
                title={t('examination.back')}
                color="text_primary"
                fontWeight="fw_600"
                onClick={goBack}
                className="back-button"
              />
              <div className="course-content">
                {!isCourseList && (
                  <ComletionStatus
                    isCourseDetail={false}
                    numberOfTotalCourse={courseDetail?.numberOfTotalCourse}
                    numberOfCompletedCourse={courseDetail?.numberOfCompletedCourse}
                    courseProgress={courseDetail?.progressCourseComplete || 0}
                    courseTags={courseDetail?.tagName}
                  />
                )}
                <div className="course-content-bottom">
                  <div className="course-list ">
                    <CourseDetail dataSource={courseDetail} />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Wrapper>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </HomeLayout>
  )
}

export default CourseDetailScreen
