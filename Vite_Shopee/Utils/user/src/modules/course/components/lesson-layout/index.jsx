/* eslint-disable react/prop-types */
import React, { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Button, Spin } from 'antd'
import { FastBackwardOutlined } from '@ant-design/icons'
import {
  TextPrimary,
  Modal,
  WarningButton
} from '../../../../components'
import { LessonVideoWrapper } from './styled'
import LessonList from './components/lesson_list'
import useQuery from '../../../../hooks/useQuery'
import { TYPE_PATH_LESSON } from '../../../../constants'
import { useHistories } from '../../../../hooks'

const LessonLayout = ({
  courseDetail,
  isLoading,
  children,
  lessonDetail,
  description = true,
  submitLesson,
  isToggle,
  setIsToggle,
  videojs,
  headerRightAction,
  onPrevVideo,
  isRequestPasswordVideo
}) => {
  const { courseId } = useParams()
  const history = useHistories()
  const { t } = useTranslation()
  const query = useQuery()
  const fromTab = query.get('fromTab')

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLesson, setIsLesson] = useState(false)
  const [path, setPath] = useState('')
  const [isSideBar, setIsSidebar] = useState(false)

  const handleOk = async () => {
    if (!isLesson) {
      await submitLesson()
      history.push(`/course/detail/${courseId}?fromTab=${fromTab}`)
    } else {
      await submitLesson()
      history.push(`${path}?fromTab=${fromTab}`)
    }
    setIsOpenModal(false)
    setIsLesson(false)
    setPath('')
  }
  const handleCancel = () => {
    if (!isLesson) {
      history.push(`/course/detail/${courseId}?fromTab=${fromTab}`)
    } else {
      history.push(`${path}?fromTab=${fromTab}`)
    }
    setIsLesson(false)
    setPath('')
  }

  const isCompleted = useMemo(() => {
    if (courseDetail && courseDetail.unit && courseDetail.unit.length > 0 && lessonDetail) {
      const found = courseDetail.unit.find((item) => item.unitId === lessonDetail.lessonId)
      return found?.complete === 'COMPLETED'
    }
    return false
  }, [courseDetail, lessonDetail])
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  })

  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
    if (window.innerWidth > 1070) {
      setIsSidebar(true)
    } else setIsToggle(false)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [courseDetail])

  const renderLayoutWidth = () => {
    if (windowSize?.width < 1070) {
      if (description) return '100%'
      return 'calc(100% - 71px)'
    }
    return ''
  }
  const renderCourseRequired = () => (
    <div className="course_required_container">
      <div style={{ width: renderLayoutWidth() }} className="course">
        <div className="video-header">
          <WarningButton
            title={t('examination.back')}
            color="text_primary"
            fontWeight="fw_600"
            onClick={() => history.push(`/course/detail/${courseId}?fromTab=${fromTab}`)}
          />
          {headerRightAction}
        </div>
        <div className="video-content">
          <div className="video-container">
            {children}
          </div>
          {
            (window.innerWidth < 1070 && description) && (
              <div className="list_program">
                <div className="program_item">
                  <TextPrimary
                    className={`lesson_tab ${!isSideBar && 'active'}`}
                    fontSize="size_20"
                    fontWeight="fw_600"
                    onClick={() => setIsSidebar(true)}
                  >
                    {t('examination.overview')}
                  </TextPrimary>
                  <TextPrimary
                    className={`lesson_tab ${!isSideBar && 'active'}`}
                    fontSize="size_20"
                    fontWeight="fw_600"
                    onClick={() => setIsSidebar(false)}
                  >
                    {t('course_detail.list_lesson')}
                  </TextPrimary>
                </div>
                {(videojs && lessonDetail?.typePath === TYPE_PATH_LESSON.DEFAULT) && (
                  <Button
                    type="primary"
                    onClick={onPrevVideo}
                    size="large"
                    className="btn_prev_video"
                    disabled={isRequestPasswordVideo}
                  >
                    {t('lesson_video.prev_btn')}
                    <FastBackwardOutlined style={{ fontSize: 24 }} />
                  </Button>
                )}
              </div>
            )
          }
          {
            isSideBar || !description ? (
              <>
                {
                  description && (
                    <div className="course-info">
                      <div className="course_item">
                        <TextPrimary className="lesson-name" fontWeight="fw_600" fontSize="size_24">{lessonDetail?.unitName}</TextPrimary>
                        {
                          (videojs && windowSize.width > 1070 && lessonDetail?.typePath === TYPE_PATH_LESSON.DEFAULT) && (
                            <Button
                              type="primary"
                              onClick={onPrevVideo}
                              size="large"
                              className="btn_prev_video"
                              disabled={isRequestPasswordVideo}
                            >
                              <span>
                                {t('lesson_video.prev_btn')}
                              </span>
                              <FastBackwardOutlined style={{ fontSize: 24 }} />
                            </Button>
                          )
                        }
                      </div>
                      <TextPrimary color="grey">{lessonDetail?.unitDetails}</TextPrimary>
                    </div>
                  )
                }
              </>
            ) : windowSize.width < 1070 && (
              <LessonList
                code={lessonDetail.lessonId}
                lessons={courseDetail?.unit || []}
                setPath={setPath}
                setIsLesson={setIsLesson}
                setIsOpenModal={setIsOpenModal}
                isCompleted={isCompleted}
              />
            )
          }
        </div>
      </div>
      {
        (windowSize?.width > 1070 || !description) && (
          <div className="sidebar">
            {
              isToggle && (
                <>
                  <div className="header">
                    <TextPrimary className="title" fontSize="size_20" fontWeight="fw_600">{t('course_detail.list_lesson')}</TextPrimary>
                  </div>
                  <div className="lesson-list">
                    {
                      isLoading ? (
                        <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <Spin size="large" />
                        </div>
                      ) : (
                        <LessonList
                          code={lessonDetail.lessonId}
                          lessons={courseDetail?.unit || []}
                          setPath={setPath}
                          setIsLesson={setIsLesson}
                          setIsOpenModal={setIsOpenModal}
                          isCompleted={isCompleted}
                        />
                      )
                    }
                  </div>
                </>
              )
            }
            <div className="bottom">
              <Button type="primary" onClick={() => setIsToggle(!isToggle)}>{isToggle ? t('course_detail.show_sidebar') : t('course_detail.hide_sidebar')}</Button>
            </div>
          </div>
        )
      }
    </div>
  )

  return (
    <LessonVideoWrapper description={description} isToggle={isToggle} videojs={videojs}>
      <div className="course-list-content">
        <div className="course-tab-content">
          {renderCourseRequired()}
        </div>
      </div>
      <Modal
        isModalVisible={isOpenModal}
        setIsModalVisible={setIsOpenModal}
        onOk={handleOk}
        description={t('common.leave_lesson')}
        cancelText={t('common.no')}
        okText={t('common.yes')}
        onCancel={handleCancel}
      />
    </LessonVideoWrapper>
  )
}

export default LessonLayout
