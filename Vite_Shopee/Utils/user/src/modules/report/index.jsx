/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Answer, Question, ModalReport, Toast } from '../../components'
import { ICON_LESSON } from '../../assets'

import Layout from '../layouts/unitType'
import { Container } from './styled'
import Header from './components/header'
import Status from './components/status'
import { REPORT_STATUS } from './constants'
import { LESSON_TYPE } from '../../constants'
import { useCourseDetail, useReport, useProfile, useHistories } from '../../hooks'
import { getUnitPath, isActiveLesson } from '../../utils'
import useQuery from '../../hooks/useQuery'

const ReportScreen = () => {
  const { t } = useTranslation()
  const history = useHistories()
  const { courseId, reportId } = useParams()
  const { profile } = useProfile()
  const query = useQuery()
  const fromTab = query.get('fromTab')

  const { courseDetail, loadCouresDetail, countViewUnit } = useCourseDetail({
    userId: profile.userId,
    courseId
  })
  const {
    report,
    reportAnswer,
    isSubmitSuccess,
    isSaveDraftSuccess,
    dataQuestion,
    onUpdateReportAnswer,
    isInValid,
    onSubmitReport,
    onSaveDraftReport,
    answerNumber,
    isLoadReportSuccess,
    isLoading
  } = useReport({
    id: profile.userId, courseId, reportId
  })

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSubmit, setIsSubmit] = useState(report.status === REPORT_STATUS.NEW)
  const [modalStatus, setModalStatus] = useState('SUBMIT')
  const [currentUnit, setCurrentUnit] = useState(0)
  const lessonsActive = courseDetail?.unit?.filter((lesson) => isActiveLesson(lesson))

  useEffect(() => {
    countViewUnit({ courseId, lessonId: reportId, typeUnit: LESSON_TYPE.REPORT })
  }, [reportId])

  useEffect(() => {
    setIsSubmit(report.status === REPORT_STATUS.NEW)
  }, [report])

  const isShowPopupConfirm = useMemo(() => {
    const isDraftChange = (reportAnswer.map((item, index) => item.textDraft === dataQuestion[index]?.textDraft).includes(false))
    const conditionDependStatus = report.isDraft
      || report.status === REPORT_STATUS.SUBMITTED
      || report.status === REPORT_STATUS.EVALUATION_COMPLETED
      || report.listQuestion.length === 0
    const conditionDependIsDraft = report.isDraft
      ? (conditionDependStatus && !isDraftChange)
      : (!isDraftChange)

    const isShow = report.isExpiredSubmit
      ? isDraftChange
        ? conditionDependIsDraft
        : !isDraftChange
      : true
    return isShow
  },
  [report, reportAnswer, dataQuestion])

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
    if (modalStatus === 'RESUBMIT') {
      goToTop()
      setIsSubmit(!isSubmit)
    }
    if (modalStatus === 'SAVE_DRAFT') {
      onSaveDraftReport()
    }
    if (modalStatus === 'END') {
      onSaveDraftReport()
      history.push(`/course/detail/${courseId}?fromTab=${fromTab}`)
    }
    if (modalStatus === 'SUBMIT') {
      onSubmitReport()
    }
    if (modalStatus === 'NEXT') {
      onSaveDraftReport()
      const next = lessonsActive[currentUnit + 1]
      const path = getUnitPath({
        type: next.type,
        unitId: next.unitId,
        courseId
      })
      history.push(`${path}?fromTab=${fromTab}`)
    }

    if (modalStatus === 'PREV') {
      onSaveDraftReport()
      const prev = lessonsActive[currentUnit - 1]
      const path = getUnitPath({
        type: prev.type,
        unitId: prev.unitId,
        courseId
      })
      history.push(`${path}?fromTab=${fromTab}`)
    }
  }

  const handleCancel = () => {
    if (modalStatus === 'END') {
      history.push(`/course/detail/${courseId}?fromTab=${fromTab}`)
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

    if (modalStatus === 'SAVE_DRAFT') {
      setIsOpenModal(false)
    }
  }
  const handleClosePopupReport = () => {
    setIsOpenModal(false)
  }

  useEffect(() => {
    if (isLoadReportSuccess) {
      loadCouresDetail()
    }
  }, [isLoadReportSuccess])

  useEffect(() => {
    if (courseDetail && courseDetail.unit && courseDetail.unit.length > 0) {
      const findIndex = (lessonsActive || []).findIndex((item) => item.unitId.toString() === reportId && item.type === 'REPORT')
      setCurrentUnit(findIndex >= 0 ? findIndex : 0)
    }
  }, [courseDetail, reportId])

  useEffect(() => {
    if (!report.isExpiredSubmit) {
      report.status = REPORT_STATUS.EXPIRED
    }
  }, [report.isExpiredSubmit])

  const ModalKey = useMemo(() => {
    if (modalStatus === 'RESUBMIT') {
      return t('report.resubmit_text')
    }
    if (modalStatus !== 'SUBMIT') {
      return t('common.leave_unit_report')
    }
    return t('report.confirm_popup')
  }, [modalStatus])

  const okText = useMemo(() => {
    if (modalStatus === 'RESUBMIT') {
      return t('common.ok')
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
    if (isShowPopupConfirm) {
      history.push(`/course/detail/${courseId}?fromTab=${fromTab}`)
    } else {
      setIsOpenModal(true)
      setModalStatus('END')
    }
  }

  const onNext = () => {
    if (isShowPopupConfirm) {
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
    if (isShowPopupConfirm) {
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

  const generateTitleSubmitButton = () => {
    if (!report?.isExpiredSubmit) {
      return t('report.expired')
    }

    if (report.status === 'RESUBMITTED' && !isSubmit) {
      return t('report.resubmit_button')
    }

    return ''
  }
  const titleSubmitButton = generateTitleSubmitButton()

  const onResubmit = () => {
    setModalStatus('RESUBMIT')
    setIsOpenModal(true)
  }

  const onSaveDraft = () => {
    setModalStatus('SAVE_DRAFT')
    setIsOpenModal(true)
  }

  return (
    <Layout
      unitName={report.nameReport}
      numberQuestions={report.numberQuestion}
      onSubmit={report.status === 'RESUBMITTED' && !isSubmit ? onResubmit : onSubmit}
      onSaveDraft={onSaveDraft}
      isDraft
      isShowSubmit={isSubmit || report.status === 'RESUBMITTED' || report.isDraft}
      isDisableSubmit={!report?.isExpiredSubmit || !dataQuestion || dataQuestion.length === 0}
      answerNumber={answerNumber}
      onClickEnd={onClickEnd}
      onNext={onNext}
      onPrevious={onPrevious}
      title={titleSubmitButton}
      isDisabledNext={currentUnit >= (lessonsActive?.length - 1)}
      isDisabledPrev={currentUnit <= 0}
    >
      <ICON_LESSON style={{ alignSelf: 'center', marginTop: '28px' }} />
      <Header
        nameReport={report?.nameReport}
        overview={report?.overview}
        imageOverview={report?.imageOverview}
        dateSubmit={report?.dateSubmit}
        status={report.status}
        point={report?.point}
        evaluate={report?.feedback}
        fileAttachOverview={report?.fileAttachOverview}
        fileAttachFeedback={report?.fileAttachFeedback}
      />
      {
        (report.status === REPORT_STATUS.EVALUATION_COMPLETED || report.status === REPORT_STATUS.RESUBMITTED
          || report.status === REPORT_STATUS.SUBMITTED || report.status === REPORT_STATUS.WAITING_FOR_RELEASE
          || report.status === REPORT_STATUS.EXPIRED) && (
          <Status
            status={report?.status}
            isLoading={isLoading}
          />
        )
      }
      {
        (dataQuestion || []).map((question, idx) => (
          <Container key={question.id}>
            <Question
              className="report"
              currentNumber={idx}
              questions={question}
              isRequired={question.isRequired}
            />
            <Answer
              className="report"
              questionType={question.questionType}
              listAnswer={question.listAnswer}
              currentNumber={idx}
              onChange={onUpdateReportAnswer}
              unitAnswer={reportAnswer}
              questionId={question.id}
              isUnitType
              isDraft={report.isDraft}
              readOnly={report.isDraft === true ? false : (!isSubmit || !report?.allowSubmit)}
              isSurveyDone={report.isDraft === true ? false : (!isSubmit || !report?.allowSubmit)}
            />
          </Container>
        ))
      }
      <ModalReport
        isModalVisible={isOpenModal}
        setIsModalVisible={setIsOpenModal}
        onOk={handleOk}
        onCancel={handleClosePopupReport}
        handleCancelButton={handleCancel}
        handleCancelReport={handleClosePopupReport}
        description={ModalKey}
        okText={okText}
        cancelText={cancelText}
        maskClosable
        mask
      />
      <Toast content={t('report.question_unanswer')} type="error" isShow={isError} />
      <Toast
        content={t('report.submit_success')}
        type="success"
        isShow={isSubmitSuccess}
      />
      <Toast
        content={t('common.draft')}
        type="success"
        isShow={isSaveDraftSuccess}
      />
    </Layout>
  )
}
export default ReportScreen
