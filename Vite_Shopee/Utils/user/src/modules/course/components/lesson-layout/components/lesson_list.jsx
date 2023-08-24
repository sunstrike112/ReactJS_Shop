/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { TextPrimary, ClickAble } from '../../../../../components'
import { REPORT, SURVEY, TEST, REPORT_DISABLE, SURVEY_DISABLE,
  TEST_DISABLE, LESSON, LESSON_DISABLE, PPT, PDF, PPT_DISABLE,
  PDF_DISABLE, EXTERNAL, EXTERNAL_DISABLE, ICON_YOUTUBE, ICON_YOUTUBE_DISABLED, IMAGE, IMAGE_OFF } from '../../../../../assets'
import { Wrapper, LessonWrapper } from './styled'
import { LESSON_TYPE, TYPE_PATH_LESSON } from '../../../../../constants'
import { renderStatus } from './box-status'
import useQuery from '../../../../../hooks/useQuery'
import { useCourseDetail, useHistories, useProfile } from '../../../../../hooks'
import Image from '../../../../../components/image'
import { countViewUnit, getLessonById, submitLessonById } from '../../../../../apis'

const LessonList = ({
  code,
  lessons,
  setIsLesson,
  isCompleted
}) => {
  const stylesIcon = {
    fontSize: 24,
    width: 32,
    height: 32,
    marginRight: 12
  }
  const { courseId } = useParams()
  const history = useHistories()
  const profile = useProfile()
  const query = useQuery()
  const fromTab = query.get('fromTab')

  const { t } = useTranslation()
  const { loadCouresDetail } = useCourseDetail({ userId: profile.userId, courseId })
  const renderIcon = (icon, type, typePath, isactive = true) => {
    if (icon !== null) {
      switch (icon) {
        case LESSON_TYPE.REPORT:
          return isactive ? <REPORT style={stylesIcon} /> : <REPORT_DISABLE style={stylesIcon} />
        case LESSON_TYPE.SURVEY:
          return isactive ? <SURVEY style={stylesIcon} /> : <SURVEY_DISABLE style={stylesIcon} />
        case LESSON_TYPE.TEST:
          return isactive ? <TEST style={stylesIcon} /> : <TEST_DISABLE style={stylesIcon} />
        case LESSON_TYPE.PPT:
          return isactive ? <PPT style={stylesIcon} /> : <PPT_DISABLE style={stylesIcon} />
        case LESSON_TYPE.PDF:
          return isactive ? <PDF style={stylesIcon} /> : <PDF_DISABLE style={stylesIcon} />
        case LESSON_TYPE.IMAGE:
          return isactive ? (
            <Image
              src={IMAGE}
              style={{ with: 31, height: 31 }}
            />
          ) : (
            <Image
              src={IMAGE_OFF}
              style={{ with: 31, height: 31 }}
            />
          )
        case LESSON_TYPE.VIDEO:
          if (typePath === 'DEFAULT') {
            return isactive ? <LESSON style={stylesIcon} /> : <LESSON_DISABLE style={stylesIcon} />
          } if (typePath === 'EXTERNAL') {
            return isactive ? (
              <Image
                src={EXTERNAL}
                style={{ with: 31, height: 31 }}
              />
            ) : (
              <Image
                src={EXTERNAL_DISABLE}
                style={{ with: 31, height: 31 }}
              />
            )
          }
          return isactive ? <ICON_YOUTUBE style={stylesIcon} /> : <ICON_YOUTUBE_DISABLED style={stylesIcon} />

        default:
          return isactive ? <LESSON style={stylesIcon} /> : <LESSON_DISABLE style={stylesIcon} />
      }
    } else {
      switch (type) {
        case LESSON_TYPE.TEST:
          return isactive ? <TEST style={stylesIcon} /> : <TEST_DISABLE style={stylesIcon} />
        case LESSON_TYPE.REPORT:
          return isactive ? <REPORT style={stylesIcon} /> : <REPORT_DISABLE style={stylesIcon} />
        case LESSON_TYPE.SURVEY:
          return isactive ? <SURVEY style={stylesIcon} /> : <SURVEY_DISABLE style={stylesIcon} />
        case LESSON_TYPE.VIDEO:
          if (typePath === 'DEFAULT') {
            return isactive ? <LESSON style={stylesIcon} /> : <LESSON_DISABLE style={stylesIcon} />
          }
          return isactive ? <ICON_YOUTUBE style={stylesIcon} /> : <ICON_YOUTUBE_DISABLED style={stylesIcon} />
        default:
          return isactive ? <LESSON style={stylesIcon} /> : <LESSON_DISABLE style={stylesIcon} />
      }
    }
  }

  const confirmNavigate = async ({ type, unitId, typePath, path }) => {
    if (type === LESSON_TYPE.TEST) {
      history.push(`/examination/${courseId}/${unitId}?fromTab=${fromTab}`)
    }

    if (type === LESSON_TYPE.SURVEY) {
      history.push(`/survey/${courseId}/${unitId}?fromTab=${fromTab}`)
    }

    if (type === LESSON_TYPE.REPORT) {
      history.push(`/report/${courseId}/${unitId}?fromTab=${fromTab}`)
    }

    if (type === LESSON_TYPE.LESSON) {
      if (typePath === TYPE_PATH_LESSON.EXTERNAL) {
        window.open(path, '_blank')

        await getLessonById({ courseId, lessonId: unitId })
        const { data: historyId } = await countViewUnit(courseId, unitId, LESSON_TYPE.LESSON)
        await submitLessonById({ courseId, lessonId: unitId, queryParams: { historyId } })
        loadCouresDetail()
      } else {
        history.push(`/course/${courseId}/lesson/${unitId}?fromTab=${fromTab}`)
      }
    }

    if (!isCompleted && code !== unitId) {
      setIsLesson(true)
    }
  }

  const isActiveLesson = (lesson) => {
    const date = moment()
    if (!lesson.limitAttendPeriodStart && !lesson.limitAttendPeriodEnd) return true
    if (lesson.limitAttendPeriodStart && !lesson.limitAttendPeriodEnd && lesson.limitAttendPeriodStart <= moment(date).valueOf()) return true
    return moment(date).isBetween(moment(lesson.limitAttendPeriodStart).toDate(), moment(lesson.limitAttendPeriodEnd).toDate())
  }

  // FOR scroll into lesson active
  useEffect(() => {
    const lessonActiveEl = document.getElementsByClassName('active')[0]

    if (lessonActiveEl) {
      lessonActiveEl.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [lessons])

  return (
    <Wrapper>
      {
        lessons && lessons.length > 0 && lessons.map((lesson, key) => {
          const currentLesson = code === lesson.unitId && lesson.type === 'LESSON'
          return (
            <ClickAble
              id={`lesson-${key}`}
              className="unit__container"
              key={lesson.id}
              disabled={!isActiveLesson(lesson)}
              onClick={() => (currentLesson
                ? null
                : confirmNavigate({
                  type: lesson.type,
                  unitId: lesson.unitId,
                  typePath: lesson.typePath,
                  path: lesson.path
                }))}
            >
              {lesson.statusCourse && (
              <>
                <div className="unit__new">{t('course_screen.mark_new')}</div>
                <div className="unit__draw" />
              </>
              )}
              <LessonWrapper
                aria-hidden="true"
                currentLesson={currentLesson}
                key={key}
                className={`disableItem ${currentLesson ? 'active' : ''}`}
                isactive={isActiveLesson(lesson)}
              >
                <div className="header">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {renderIcon(lesson.typeLesson, lesson.type, lesson.typePath, isActiveLesson(lesson))}
                    {
                  lesson.estimateTime > 0 && (
                    <div className="estimatedtime-box">
                      <TextPrimary color={lesson.isactive ? 'black' : 'grey'}>
                        {t('examination.estimate_time', { estimate_time: lesson.estimateTime })}
                      </TextPrimary>
                    </div>
                  )
                }
                  </div>
                  {lesson && renderStatus(lesson, t)}
                </div>
                <TextPrimary style={{ marginTop: 0 }} fontSize="size_18" fontWeight="fw_600">{lesson.unitName}</TextPrimary>
              </LessonWrapper>
            </ClickAble>
          )
        })
      }
    </Wrapper>
  )
}
export default LessonList
