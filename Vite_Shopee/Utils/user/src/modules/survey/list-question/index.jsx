import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { Spin } from 'antd'
import { Answer, Question, Modal, Toast, TextNormal, TextPrimary } from '../../../components'
import { useCourseDetail, useSurvey, useProfile, useHistories } from '../../../hooks'
import { getUnitPath, isActiveLesson } from '../../../utils'
import Layout from '../../layouts/unitType'
import { SURVEY } from '../../../assets'
import { LESSON_TYPE } from '../../../constants'
import Wrapper from './styled'
import useQuery from '../../../hooks/useQuery'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;
`

const stylesIcon = {
  fontSize: 24,
  width: 52,
  height: 52
}

const SurveyScreen = () => {
  const { t } = useTranslation()
  const { courseId, surveyId } = useParams()
  const { profile } = useProfile()

  const {
    survey,
    surveyResult,
    surveyAnswer,
    isSubmitSuccess,
    isSurveyDone,
    onUpdateSurveyAnswer,
    onSubmitSurvey,
    answerNumber,
    isInValid,
    dataQuestion,
    isLoadSurveyDone,
    setIsSurveyDone,
    setIsReSubmit,
    isLoadingBothTestAndResult
  } = useSurvey({
    id: profile.userId,
    courseId,
    surveyId
  })

  const history = useHistories()
  const query = useQuery()
  const fromTab = query.get('fromTab')
  const { courseDetail, loadCouresDetail, countViewUnit } = useCourseDetail({
    userId: profile.userId,
    courseId
  })
  const [modalStatus, setModalStatus] = useState('SUBMIT')
  const [currentUnit, setCurrentUnit] = useState(0)

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isError, setIsError] = useState(false)

  const lessonsActive = courseDetail?.unit?.filter((lesson) => isActiveLesson(lesson))

  useEffect(() => {
    countViewUnit({ courseId, lessonId: surveyId, typeUnit: LESSON_TYPE.SURVEY })
  }, [surveyId])

  useEffect(() => {
    if (isLoadSurveyDone || isSurveyDone) {
      loadCouresDetail()
    }
  }, [isLoadSurveyDone, isSurveyDone])

  useEffect(() => {
    if (courseDetail && courseDetail.unit && courseDetail.unit.length > 0) {
      const findIndex = (lessonsActive || []).findIndex(
        (item) => item.unitId.toString() === surveyId && item.type === 'SURVEY'
      )
      setCurrentUnit(findIndex >= 0 ? findIndex : 0)
    }
  }, [courseDetail])

  const onSubmit = async () => {
    await setIsError(false)

    if (isInValid) {
      setIsError(true)
    } else {
      setIsOpenModal(true)
      setModalStatus('SUBMIT')
    }
  }

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleOk = () => {
    if (modalStatus === 'END') {
      history.push(`/course/detail/${courseId}?fromTab=${fromTab}`)
    }
    if (modalStatus === 'SUBMIT') {
      onSubmitSurvey()
      setIsReSubmit(false)
    }
    if (modalStatus === 'RESUBMIT') {
      goToTop()
      setIsSurveyDone(false)
      setIsReSubmit(true)
    }

    if (modalStatus === 'NEXT') {
      const next = lessonsActive[currentUnit + 1]
      const path = getUnitPath({
        type: next.type,
        unitId: next.unitId,
        courseId
      })
      history.push(`${path}?fromTab=${fromTab}`)
    }

    if (modalStatus === 'PREV') {
      const prev = lessonsActive[currentUnit - 1]
      const path = getUnitPath({
        type: prev.type,
        unitId: prev.unitId,
        courseId
      })
      history.push(`${path}?fromTab=${fromTab}`)
    }
  }

  const ModalKey = useMemo(() => {
    if (modalStatus === 'RESUBMIT') {
      return t('survey.confirm_popup_resubmit')
    }

    if (modalStatus !== 'SUBMIT') {
      return t('common.leave_unit')
    }
    return t('survey.confirm_popup')
  }, [modalStatus])

  const okText = useMemo(() => {
    if (modalStatus === 'RESUBMIT') {
      return t('common.yes')
    }
    if (modalStatus !== 'SUBMIT') {
      return t('common.yes')
    }
    return t('common.submit')
  }, [modalStatus])

  const cancelText = useMemo(() => {
    if (modalStatus !== 'SUBMIT') {
      return t('common.no')
    }
    return t('common.cancel')
  }, [modalStatus])

  const onClickEnd = () => {
    if (isSurveyDone) {
      history.push(`/course/detail/${courseId}?fromTab=${fromTab}`)
    } else {
      setIsOpenModal(true)
      setModalStatus('END')
    }
  }

  const onNext = () => {
    if (isSurveyDone) {
      const next = lessonsActive[currentUnit + 1]
      const path = getUnitPath({
        type: next.type,
        unitId: next.unitId,
        courseId
      })
      history.push(`${path}?fromTab=${fromTab}`)
    } else {
      setIsOpenModal(true)
      setModalStatus('NEXT')
    }
  }

  const onPrevious = () => {
    if (isSurveyDone) {
      const prev = lessonsActive[currentUnit - 1]
      const path = getUnitPath({
        type: prev.type,
        unitId: prev.unitId,
        courseId
      })
      history.push(`${path}?fromTab=${fromTab}`)
    } else {
      setIsOpenModal(true)
      setModalStatus('PREV')
    }
  }

  const onResubmit = () => {
    setModalStatus('RESUBMIT')
    setIsOpenModal(true)
  }

  return (
    <Layout
      unitName={isSurveyDone ? surveyResult?.surveyName : survey?.surveyName}
      numberQuestions={isSurveyDone ? surveyResult?.numberOfQuestions : survey?.numberOfQuestions}
      answerNumber={answerNumber}
      onSubmit={!isSurveyDone ? onSubmit : onResubmit}
      onClickEnd={onClickEnd}
      onNext={onNext}
      onPrevious={onPrevious}
      title={isSurveyDone ? t('survey.resubmit') : ''}
      isDisabledNext={currentUnit >= lessonsActive?.length - 1}
      isDisabledPrev={currentUnit <= 0}
    >
      <Wrapper>
        <div className="examination-header">
          <SURVEY style={stylesIcon} />
          <TextNormal className="header-text" fontWeight="fw_600" fontSize="size_24">
            {survey?.surveyName || ''}
          </TextNormal>
        </div>
        <div className="examination-content">
          <TextNormal color="grey" fontSize="size_18" className="text-content">
            {survey?.surveyDetail || ''}
          </TextNormal>
        </div>
        <div className="examination-info">
          <TextPrimary fontSize="size_18">{t('examination.num_questions_title')}</TextPrimary>
          <TextPrimary fontWeight="fw_600" fontSize="size_18">
            {t('examination.num_questions', { num: dataQuestion.length || 0 })}
          </TextPrimary>
        </div>
        {isLoadingBothTestAndResult
          ? <Container><Spin /></Container>
          : (dataQuestion || []).map((question, idx) => (
            <Container key={question.id}>
              <Question currentNumber={idx} questions={question} isRequired={question.required} />
              <Answer
                questionType={question.questionType}
                listAnswer={question.listAnswer}
                answerText={question.answerText}
                currentNumber={idx}
                onChange={onUpdateSurveyAnswer}
                unitAnswer={surveyAnswer}
                questionId={question.id}
                readOnly={isSurveyDone}
                isSurveyDone={isSurveyDone}
                isUnitType
              />
            </Container>
          ))}
        <Modal
          isModalVisible={isOpenModal}
          setIsModalVisible={setIsOpenModal}
          onOk={handleOk}
          description={ModalKey}
          okText={okText}
          cancelText={cancelText}
        />
        <Toast content={t('errors.question_unanswer')} type="error" isShow={isError} />
        <Toast content={t('common.submit_success')} type="success" isShow={isSubmitSuccess} />
      </Wrapper>
    </Layout>
  )
}
export default SurveyScreen
