/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import { Card, List, Tooltip } from 'antd'
import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { getLessonById, submitLessonById } from '../../../../apis'
import { countViewUnit } from '../../../../apis/course.api'
import {
  EXTERNAL,
  EXTERNAL_DISABLE,
  ICON_YOUTUBE,
  ICON_YOUTUBE_DISABLED,
  LESSON, LESSON_DISABLE,
  NOTIFY_BELL, NOT_FOUND_IMAGE, PDF, PDF_DISABLE, PPT, PPT_DISABLE, QUESTION_ICON, REPORT, REPORT_DISABLE, SURVEY, SURVEY_DISABLE, TEST, TEST_DISABLE, IMAGE,
  IMAGE_OFF
} from '../../../../assets'
import { ClickAble, Image, TextPrimary, VoteLike, Watched } from '../../../../components'
import CustomImage from '../../../../components/image'
import { LESSON_STATUS_COMPLETE, LESSON_TYPE, TYPE_PATH_LESSON } from '../../../../constants'
import { useCourseDetail, useHistories, useProfile } from '../../../../hooks'
import useQuery from '../../../../hooks/useQuery'
import { dateFormat, SLASH_DATE_FORMAT } from '../../../../utils'
import { FULL_DATE_TIME } from '../../../../utils/date'
import { renderStatus } from '../lesson-layout/components/box-status'
import UnitOverview from './components/unit-overview'
import { LessonWrapper, SearchEmpty, ToolTipLessonIconWrapper, Wrapper } from './styled'

const LessonList = ({ lessons, isFree = true }) => {
  const stylesIcon = {
    fontSize: 24,
    width: 32,
    height: 32,
    marginRight: 12
  }
  const { courseId } = useParams()
  const history = useHistories()
  const { t } = useTranslation()
  const query = useQuery()
  const fromTab = query.get('fromTab')
  const { profile } = useProfile()

  const { voteLikeUnitAction, isLiking, loadCouresDetail } = useCourseDetail({
    userId: profile.userId,
    courseId
  })
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

  const renderToolTipUnitIcon = () => (
    <ToolTipLessonIconWrapper>
      <Card title={t('course_detail.notify_description')} className="lesson-tooltip-icon" bordered={false}>
        <List
          split={false}
          dataSource={[1]}
          renderItem={() => (
            <>
              <List.Item>
                <LESSON style={stylesIcon} /> {t('course_detail.lesson_type_test')}
              </List.Item>
              <List.Item>
                <TEST style={stylesIcon} /> {t('course_detail.lesson_type_lesson')}
              </List.Item>
              <List.Item>
                <REPORT style={stylesIcon} /> {t('course_detail.lesson_type_survey')}
              </List.Item>
              <List.Item>
                <SURVEY style={stylesIcon} /> {t('course_detail.lesson_type_report')}
              </List.Item>
              <List.Item>
                <PDF style={stylesIcon} /> {t('course_detail.lesson_type_pdf')}
              </List.Item>
              <List.Item>
                <PPT style={stylesIcon} /> {t('course_detail.lesson_type_ppt')}
              </List.Item>
              <List.Item>
                <ICON_YOUTUBE style={stylesIcon} />
                {t('course_detail.lesson_type_youtube')}
              </List.Item>
              <List.Item>
                <Image src={EXTERNAL} style={stylesIcon} />
                {t('course_detail.lesson_type_external')}
              </List.Item>
              <List.Item>
                <Image src={IMAGE} style={stylesIcon} />
                {t('course_detail.lesson_type_image')}
              </List.Item>
            </>
          )}
        />
      </Card>
    </ToolTipLessonIconWrapper>
  )

  const renderLimitDate = (lesson) => {
    if (lesson.limitAttendPeriodStart && lesson.limitAttendPeriodEnd) {
      return (
        <TextPrimary className="period_time" fontSize="size_12">
          {t('course_detail.period')}:{' '}
          {dateFormat(lesson.limitAttendPeriodStart, SLASH_DATE_FORMAT)} ～ {dateFormat(lesson.limitAttendPeriodEnd, SLASH_DATE_FORMAT)}
        </TextPrimary>
      )
    }
    if (lesson.limitAttendPeriodStart && !lesson.limitAttendPeriodEnd) {
      return (
        <TextPrimary className="period_time" fontSize="size_12">
          {t('course_detail.period')}:{' '}
          {dateFormat(lesson.limitAttendPeriodStart, SLASH_DATE_FORMAT)} ～
        </TextPrimary>
      )
    }
    if (!lesson.limitAttendPeriodStart && lesson.limitAttendPeriodEnd) {
      return (
        <TextPrimary className="period_time" fontSize="size_12">
          {t('course_detail.period')}:{' '}
          ～ {dateFormat(lesson.limitAttendPeriodEnd, SLASH_DATE_FORMAT)}
        </TextPrimary>
      )
    }
    return null
  }

  const isActiveLesson = (lesson) => {
    const date = moment()
    if (!lesson.limitAttendPeriodStart && !lesson.limitAttendPeriodEnd) return true
    if (lesson.limitAttendPeriodStart && !lesson.limitAttendPeriodEnd && lesson.limitAttendPeriodStart <= moment(date).valueOf()) return true
    return moment(date).isBetween(moment(lesson.limitAttendPeriodStart).toDate(), moment(lesson.limitAttendPeriodEnd).toDate())
  }

  const navigateToUnit = ({ type, unitId }) => {
    if (type === LESSON_TYPE.TEST) {
      return `/examination/${courseId}/${unitId}?fromTab=${fromTab}`
    }
    if (type === LESSON_TYPE.SURVEY) {
      return `/survey/${courseId}/${unitId}?fromTab=${fromTab}`
    }
    if (type === LESSON_TYPE.REPORT) {
      return `/report/${courseId}/${unitId}?fromTab=${fromTab}`
    }
    return `/course/${courseId}/lesson/${unitId}?fromTab=${fromTab}`
  }
  const handleNavigate = async (e, lesson) => {
    e.stopPropagation()
    if (isFree) {
      if (lesson.type === LESSON_TYPE.LESSON && lesson.typePath === TYPE_PATH_LESSON.EXTERNAL) {
        window.open(lesson.path, '_blank')
        await getLessonById({ courseId, lessonId: lesson.unitId })
        const { data: historyId } = await countViewUnit(courseId, lesson.unitId, LESSON_TYPE.LESSON)
        await submitLessonById({ courseId, lessonId: lesson.unitId, queryParams: { historyId } })
        loadCouresDetail()
        return
      }
      history.push(
        navigateToUnit({
          type: lesson.type,
          unitId: lesson.unitId,
          typePath: lesson.typePath
        })
      )
    }
  }

  return (
    <Wrapper>
      <div className="lesson-header">
        <div className="lesson-title">
          <TextPrimary fontWeight="fw_600" fontSize="size_24">{t('course_detail.list_lesson')}</TextPrimary>
          <Tooltip placement="bottom" title={renderToolTipUnitIcon()} color="white">
            <Image src={QUESTION_ICON} />
          </Tooltip>
        </div>
      </div>
      {
        lessons.map((lesson) => (
          <ClickAble
            className="unit"
            key={lesson.id}
            style={{
              pointerEvents: isActiveLesson(lesson) ? 'initial' : 'none',
              cursor: !isFree && 'default'
            }}
          >
            <LessonWrapper key={lesson.unitId} isactive={isActiveLesson(lesson)}>
              <div className="unit__container">
                {lesson.statusCourse
                  && (
                  <>
                    <div className="unit__new">{t('course_screen.mark_new')}</div>
                    <div className="unit__draw" />
                  </>
                  )}
                <div
                  className="unit__container__content"
                  onClick={(e) => handleNavigate(e, lesson)}
                >
                  <div className="unit__container__content__header">
                    <div className="unit__container__content__header--left">
                      {renderIcon(lesson.typeLesson, lesson.type, lesson.typePath, isActiveLesson(lesson))}
                    </div>
                    <div className="unit__container__content__header--right">
                      {lesson.complete && renderStatus(lesson, t)}
                      {
                      !!lesson.estimateTime && (
                        <div className="estimatedtime-box">
                          <TextPrimary color="grey" style={{ marginRight: 4 }}>
                            {t('course_detail.estimate_time_list')}:
                          </TextPrimary>
                          <TextPrimary color={isActiveLesson(lesson) ? 'black' : 'grey'}>
                            {t('common.time.minute', { minutes: lesson.estimateTime })}
                          </TextPrimary>
                        </div>
                      )
                    }
                      {
                      !!lesson?.submissionDeadline && (
                        <div className="estimatedtime-box">
                          <TextPrimary color="grey" style={{ marginRight: 4 }}>
                            {t('course_detail.submission_deadline')}:
                          </TextPrimary>
                          <TextPrimary color={isActiveLesson(lesson) ? 'black' : 'grey'}>
                            {moment.unix(lesson?.submissionDeadline / 1000).format(FULL_DATE_TIME)}
                          </TextPrimary>
                        </div>
                      )
                    }
                      {renderLimitDate(lesson)}
                    </div>
                  </div>
                  <TextPrimary style={{ marginTop: 24 }} fontSize="size_18" fontWeight="fw_600">{lesson.unitName}</TextPrimary>
                  <UnitOverview overview={lesson.detail} />
                  {
                  lesson.messageCompleteText && (
                    <div className="notify-box">
                      <Image src={NOTIFY_BELL} />
                      <TextPrimary fontSize="size_16">{lesson.messageCompleteText}</TextPrimary>
                    </div>
                  )
                }
                </div>
                <div className="vote-container">
                  <Watched
                    voteNumber={lesson?.countOpenLesson}
                  />
                  <VoteLike
                    isLike={lesson?.isLike}
                    courseId={courseId}
                    courseUnitId={lesson?.unitId}
                    typeUnit={lesson?.type}
                    voteAction={voteLikeUnitAction}
                    voteNumber={lesson?.countLikeCourse}
                    item={lesson}
                    isLiking={isLiking}
                  />
                </div>
              </div>
              {
                (lesson?.statusReview === LESSON_STATUS_COMPLETE.EVALUATION_COMPLETED || lesson?.statusReview === LESSON_STATUS_COMPLETE.RESUBMITTED) && (
                  <TextPrimary fontSize="size_12" color="text_danger" className="evaluate">
                    {t('course_detail.evaluate')}
                  </TextPrimary>
                )
              }
            </LessonWrapper>
          </ClickAble>
        ))
      }
      {!lessons.length && (
        <SearchEmpty>
          <CustomImage src={NOT_FOUND_IMAGE} />
          <TextPrimary color="grey">{t('course_screen.empty_lesson')}</TextPrimary>
        </SearchEmpty>
      )}
    </Wrapper>
  )
}
export default LessonList
