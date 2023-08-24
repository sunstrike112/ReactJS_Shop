/* eslint-disable react/prop-types */
import React, { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { STATUS } from '../../examination/constants'
import { Toast, Modal, TextNormal } from '../../../components'
import { Header, Footer, Sidebar } from './components'
import { Body, Wrapper, Network, ContentChild } from './styled'
import { makeSelectIsOnline } from '../../../routes/store/selectors'
import useQuery from '../../../hooks/useQuery'
import { useHistories } from '../../../hooks'

const ExaminationLayout = ({
  status,
  children,
  setCurrentNumber,
  currentNumber = 0,
  isSidebar = true,
  submitTest,
  unitAnswer,
  isSubmitSuccess,
  testIntro,
  answerNumber,
  userId
}) => {
  const { courseId, testId } = useParams()

  const isOnline = useSelector(makeSelectIsOnline())
  const history = useHistories()
  const { t } = useTranslation()
  const { listQuestion, timeLimit, testName } = testIntro
  const query = useQuery()
  const fromTab = query.get('fromTab')

  const [isOpen, setIsOpen] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isCancel, setIsCancel] = useState(true)

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modalStatus, setModalStatus] = useState('SUBMIT')

  const [innerWidth, setInnerWidth] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth)
    }
    if (window.innerWidth < 960) setIsOpen(false)
    else setIsOpen(true)
    window.addEventListener('resize', handleResize)
  }, [innerWidth])

  const handleNextButton = async () => {
    await setIsError(false)
    if (status === STATUS.TESTING) {
      const isValid = unitAnswer.map((item) => !item.isRequired || item.answerId.length > 0 || item.selectedAnswer.length > 0).filter((item) => !item)
      if ((currentNumber + 1) < listQuestion.length) setCurrentNumber(currentNumber + 1)
      if (currentNumber + 1 >= listQuestion.length) {
        if (isValid.length > 0) {
          setIsError(true)
        } else {
          setIsOpenModal(true)
          setModalStatus('SUBMIT')
        }
      }
    }
  }

  const handleSubmitTest = () => {
    const submitTestRequest = unitAnswer.map((item) => ({
      answerId: item.answerId,
      questionId: item.questionId,
      answerTextDescription: item.selectedAnswer,
      version: item.version
    }))
    submitTest({
      id: userId,
      course: courseId,
      TestingId: testId,
      submitTestRequest
    })
  }

  const handleOk = () => {
    if (modalStatus === 'END') {
      history.push(`/course/detail/${courseId}?fromTab=${fromTab}`)
    }
    if (modalStatus === 'SUBMIT') {
      handleSubmitTest()
    }

    if (modalStatus === 'TIME_OUT') {
      history.push(`/examination/test-result/${courseId}/${testId}?fromTab=${fromTab}`)
    }
  }

  useEffect(() => {
    if (isSubmitSuccess && modalStatus === 'SUBMIT') {
      history.push(`/examination/test-result/${courseId}/${testId}?fromTab=${fromTab}`)
    }
  }, [isSubmitSuccess])

  const ModalKey = useMemo(() => {
    if (modalStatus === 'TIME_OUT') {
      return t('examination.confirm_popup_timeout')
    }
    if (modalStatus !== 'SUBMIT') {
      return t('common.leave_unit')
    }
    return t('examination.confirm_popup')
  }, [modalStatus])

  const okText = useMemo(() => {
    if (modalStatus === 'TIME_OUT') {
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

  return (
    <Wrapper>
      {isSidebar && (
        <Sidebar
          questionsList={listQuestion}
          setCurrentNumber={setCurrentNumber}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          currentNumber={currentNumber}
          timeTest={timeLimit}
          unitAnswer={unitAnswer}
          setModalStatus={setModalStatus}
          onSubmitTest={async () => {
            await handleSubmitTest()
            setIsOpenModal(true)
            setIsCancel(false)
          }}
        />
      )}
      <Body>
        <Header
          isSidebar={isSidebar}
          isOpen={isOpen}
          answerNumber={answerNumber.length || 0}
          questionsNumber={listQuestion.length}
          testName={testName}
          onClickEnd={() => {
            setIsOpenModal(true)
            setModalStatus('END')
          }}
        />
        <Footer
          status={status}
          isSidebar={isSidebar}
          handleNextButton={handleNextButton}
          isOpen={isOpen}
          setCurrentNumber={setCurrentNumber}
          currentNumber={currentNumber}
          isSubmit={currentNumber + 1 >= testIntro.listQuestion.length}
        />
        <div className="content">
          {!isOnline && (
            <Network>
              <TextNormal color="white">
                {t('common.network_error')}
              </TextNormal>
            </Network>
          )}
          <ContentChild isOpen={isOpen}>{children}</ContentChild>
        </div>
      </Body>
      <Toast
        content={t('errors.question_unanswer')}
        type="error"
        isShow={isError}
      />
      <Toast content={t('common.submit_success')} type="success" isShow={isSubmitSuccess && modalStatus === 'SUBMIT'} />
      <Modal
        isModalVisible={isOpenModal}
        setIsModalVisible={setIsOpenModal}
        setIsCancel={setIsCancel}
        onOk={handleOk}
        description={ModalKey}
        okText={okText}
        cancelText={cancelText}
        isCancel={isCancel}
      />
    </Wrapper>
  )
}

export default ExaminationLayout
