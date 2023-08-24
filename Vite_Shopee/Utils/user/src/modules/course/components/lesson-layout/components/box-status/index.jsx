import React from 'react'
/* eslint-disable react/prop-types */
import { BoxStatusWrapper } from '../../../lesson-list/styled'
import { TextPrimary } from '../../../../../../components'
import { LESSON_TYPE, LESSON_STATUS_COMPLETE } from '../../../../../../constants'

export const BoxStatus = ({ background, color, isactive, text, ...rest }) => (
  <BoxStatusWrapper
    isactive={isactive || true}
    background={background}
    className="box-status"
    {...rest}
  >
    <TextPrimary color={color} fontSize="size_14">
      {text}
    </TextPrimary>
  </BoxStatusWrapper>
)
export const renderStatus = (lesson, t) => {
  if (lesson?.complete === LESSON_STATUS_COMPLETE.COMPLETED && lesson.type !== LESSON_TYPE.REPORT) {
    return (
      <BoxStatus color="green" background="green_light" isactive={lesson.isactive} text={t('course_detail.completed')} />
    )
  }
  if (lesson?.statusReview === LESSON_STATUS_COMPLETE.SUBMITTED) {
    return (
      <BoxStatus color="yellow" background="bg_status_pending" isactive={lesson.isactive} text={t('course_detail.report_submitted')} />
    )
  }
  if (lesson?.statusReview === LESSON_STATUS_COMPLETE.RESUBMITTED) {
    return (
      <BoxStatus color="error" background="bg_status_resubmitted" isactive={lesson.isactive} text={t('course_detail.report_resubmitted')} />
    )
  }
  if (lesson?.statusReview === LESSON_STATUS_COMPLETE.EVALUATION_COMPLETED) {
    return (
      <div style={{ display: 'flex' }}>
        <BoxStatus style={{ marginRight: 10 }} color="green" background="green_light" isactive={lesson.isactive} text={t('course_detail.report_evaluation_completed')} />
        <BoxStatus color="green" background="green_light" isactive={lesson.isactive} text={t('course_detail.completed')} />
      </div>
    )
  }
  if (lesson?.statusReview === LESSON_STATUS_COMPLETE.WAITING_FOR_RELEASE) {
    return (
      <BoxStatus color="text_thirsdary" background="bg_status_waiting_release" isactive={lesson.isactive} text={t('course_detail.report_watting_release')} />
    )
  }
  return null
}
