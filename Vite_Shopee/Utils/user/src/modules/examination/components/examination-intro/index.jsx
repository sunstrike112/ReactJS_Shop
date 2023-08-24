/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'

import { IMG_EXAMINATION } from '../../../../assets'
import {
  PrimaryButton,
  SecondaryButtonLink,
  TextPrimary,
  TextNormal,
  OutlineButton
} from '../../../../components'
import { STATUS } from '../../constants'
import { getUnitPath, isActiveLesson } from '../../../../utils'
import { useCourseDetail, useHistories, useProfile, useGetQuery } from '../../../../hooks'
import { LESSON_TYPE, QUERY } from '../../../../constants'

import Wrapper from './styled'
import UnitTypeLayout from '../../../layouts/unitType'
import useQuery from '../../../../hooks/useQuery'

const ExaminationIntro = ({ setStatus, testResult, testIntro, loadingSucess }) => {
  const { courseId, testId } = useParams()
  const { profile } = useProfile()
  const query = useQuery()
  const fromTab = query.get('fromTab')
  const { queryWorkspaceID } = useGetQuery()

  const history = useHistories()
  const { t } = useTranslation()
  const { courseDetail, loadCouresDetail, countViewUnit } = useCourseDetail({
    userId: profile.userId,
    courseId
  })

  const { listQuestion, timeLimit, testName, benchmark, countSubmitted, countQuestion, testGuide } = testIntro
  const [currentUnit, setCurrentUnit] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const lessonsActive = courseDetail?.unit?.filter((lesson) => isActiveLesson(lesson))

  const checkExpiredTime = (course, testInfo) => {
    const courseCurrent = course?.unit?.filter((item) => (item?.unitId === testInfo?.testId))
    if (!courseCurrent[0]?.limitAttendPeriodStart && !courseCurrent[0]?.limitAttendPeriodEnd) return false
    if (courseCurrent[0]?.limitAttendPeriodStart && courseCurrent[0]?.limitAttendPeriodEnd) {
      if ((courseCurrent[0]?.limitAttendPeriodStart > Date.now()) || (courseCurrent[0]?.limitAttendPeriodEnd < Date.now())) return true
    }
    if (courseCurrent[0]?.limitAttendPeriodStart && !courseCurrent[0]?.limitAttendPeriodEnd) {
      if ((courseCurrent[0]?.limitAttendPeriodStart > Date.now())) return true
    }
    if (!courseCurrent[0]?.limitAttendPeriodStart && courseCurrent[0]?.limitAttendPeriodEnd) {
      if ((courseCurrent[0]?.limitAttendPeriodEnd < Date.now())) return true
    }
    return false
  }

  useEffect(() => {
    countViewUnit({
      courseId,
      lessonId: testId,
      typeUnit: LESSON_TYPE.TEST
    })
  }, [testId])

  useEffect(() => {
    if (loadingSucess) {
      loadCouresDetail()
    }
  }, [loadingSucess])

  useEffect(() => {
    if (courseDetail !== null) {
      const isExpired = checkExpiredTime(courseDetail, testIntro)
      if (!listQuestion || listQuestion.length <= 0 || isExpired) {
        setDisabled(true)
      } else {
        setDisabled(false)
      }
    }

    if (courseDetail && courseDetail.unit && courseDetail.unit.length > 0) {
      const findIndex = (lessonsActive || []).findIndex(
        (item) => item.unitId.toString() === testId && item.type === 'TEST'
      )
      setCurrentUnit(findIndex >= 0 ? findIndex : 0)
    }
  }, [courseDetail, testId, listQuestion])

  const handleNavigate = (type) => {
    if (type === 'NEXT') {
      const next = lessonsActive[currentUnit + 1]
      const path = getUnitPath({
        type: next.type,
        unitId: next.unitId,
        courseId
      })
      loadCouresDetail()
      history.push(`${path}?fromTab=${fromTab}`)
    }

    if (type === 'PREV') {
      const prev = lessonsActive[currentUnit - 1]
      const path = getUnitPath({
        type: prev.type,
        unitId: prev.unitId,
        courseId
      })
      loadCouresDetail()
      history.push(`${path}?fromTab=${fromTab}`)
    }
  }
  const onClickEnd = () => {
    history.push(`/course/detail/${courseId}?fromTab=${fromTab}`)
  }

  return (
    <UnitTypeLayout unitName={testName} showAnswer={false} footer={false} onClickEnd={onClickEnd}>
      <Wrapper>
        <div className="content">
          <div className="examination-header">
            <img src={IMG_EXAMINATION} alt="examination_img" />
            <TextNormal className="header-text" fontWeight="fw_600" fontSize="size_24">
              {testName || ''}
            </TextNormal>
          </div>
          <div className="examination-content">
            <TextNormal color="grey" fontSize="size_18" className="text-content">
              {testGuide || ''}
            </TextNormal>
            <div className="examination-content-info">
              <div className="info">
                <TextPrimary fontSize="size_18">{t('examination.num_questions_title')}</TextPrimary>
                {(countQuestion || countQuestion === 0 || countQuestion === null)
                  ? (
                    <TextPrimary fontWeight="fw_600" fontSize="size_18">
                      {t('examination.num_questions', { num: countQuestion || 0 })}
                    </TextPrimary>
                  ) : <Spin />}
              </div>

              {(benchmark && benchmark !== null && benchmark !== 0) ? (
                <div className="info">
                  <TextPrimary fontSize="size_18">{t('examination.intro.point_pass')}</TextPrimary>
                  {((benchmark || benchmark === 0) && countQuestion) ? (
                    benchmark === countQuestion ? (
                      <TextPrimary fontWeight="fw_600" fontSize="size_18">
                        {t('examination.intro.need_to_pass_all')}
                      </TextPrimary>
                    )
                      : (
                        <TextPrimary fontWeight="fw_600" fontSize="size_18">
                          {t('examination.intro.point_require_for_pass', { point: benchmark || 0 })}
                        </TextPrimary>
                      )
                  ) : <Spin />}
                </div>
              ) : <div />}

              <div className="info">
                <TextPrimary fontSize="size_18">{t('examination.intro.times_test_title')}</TextPrimary>
                {(countSubmitted || countSubmitted === 0 || countSubmitted === null)
                  ? (
                    <TextNormal fontWeight="fw_600" fontSize="size_18" color="text_primary">
                      {t('examination.intro.times_test', { times: countSubmitted || 0 })}
                    </TextNormal>
                  ) : <Spin />}
              </div>
              {(timeLimit && timeLimit !== null && timeLimit !== 0) ? (
                <div className="info" style={{ border: 'none' }}>
                  <TextPrimary fontSize="size_18">{t('examination.time_limit')}</TextPrimary>
                  <TextPrimary fontWeight="fw_600" fontSize="size_18">
                    {t('examination.time_test', { time: timeLimit })}
                  </TextPrimary>
                </div>
              )
                : <div />}
            </div>
          </div>
          <div className="examination-action">
            <PrimaryButton
              className="examination-action__button"
              disabled={disabled}
              onClick={() => setStatus(STATUS.TESTING)}
              title={t('examination.intro.test_start')}
            />
            {testResult && (
              <SecondaryButtonLink
                backgroundcolor="primary_btn"
                to={`/examination/test-result/${courseId}/${testId}?${QUERY.FROM_TAB}=${fromTab}${queryWorkspaceID.CONNECT}`}
              >
                {t('examination.intro.test_result_btn')}
              </SecondaryButtonLink>
            )}
          </div>
        </div>
        <div className="footer">
          <OutlineButton
            title={t('common.prev')}
            onClick={() => handleNavigate('PREV')}
            disabled={currentUnit <= 0 || courseDetail === null}
          />
          <OutlineButton
            title={t('common.next')}
            onClick={() => handleNavigate('NEXT')}
            disabled={(currentUnit === lessonsActive?.length - 1) || courseDetail === null}
          />
        </div>
      </Wrapper>
    </UnitTypeLayout>
  )
}
export default ExaminationIntro
