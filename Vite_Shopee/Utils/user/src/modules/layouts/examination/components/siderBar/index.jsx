/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Progress } from 'antd'

import { TextPrimary } from '../../../../../components'
import { usePageVisibility } from '../../../../../hooks'
import { IMG_CLOSE_EXAM_SIDEBAR, IMG_CLOCK, IMG_OPEN_EXAM_SIDEBAR } from '../../../../../assets'
import { Wrapper, Step } from './styled'

const Sidebar = ({
  setIsOpen,
  isOpen,
  timeTest = 0,
  questionsList,
  setCurrentNumber,
  currentNumber,
  unitAnswer,
  onSubmitTest,
  setModalStatus
}) => {
  const { t } = useTranslation()

  const [countDown, setCountDown] = useState({
    minutes: 0,
    seconds: 0
  })

  const [currentTime, setCurrentTime] = useState(timeTest)
  const isVisible = usePageVisibility()

  useEffect(() => {
    if (timeTest) {
      const limit = timeTest * 60 * 1000
      setCurrentTime(limit)
    }
  }, [timeTest])
  useEffect(() => {
    const interval = setInterval(() => {
      if (isVisible) {
        setCurrentTime((times) => (times <= 0 ? 0 : times - 1000))
      } else {
        setCurrentTime((times) => times)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [timeTest, isVisible])

  useEffect(() => {
    if (currentTime) {
      const timer = currentTime - 1000
      const seconds = Math.floor((timer / 1000) % 60)
      const minutes = Math.floor(timer / 1000 / 60)
      setCountDown({ minutes, seconds })
    }
    if (currentTime === 0 && timeTest) {
      setCountDown({ minutes: 0, seconds: 0 })
      onSubmitTest()
      setModalStatus('TIME_OUT')
    }
  }, [currentTime])

  const isValid = (index) => {
    if (unitAnswer[index].questionType === 'SELECT_ONE' || unitAnswer[index].questionType === 'CHOOSE_MANY') {
      return unitAnswer[index].answerId.length > 0
    }

    if (unitAnswer[index].questionType === 'DESCRIPTION') {
      return unitAnswer[index].selectedAnswer.length > 0
    }

    return false
  }

  if (!isOpen) {
    return (
      <Wrapper>
        <div className="close-sidebar">
          {timeTest ? (
            <div className="header">
              <div className="header-icon">
                <img src={IMG_CLOCK} alt="clock_icon" />
              </div>
              <TextPrimary color="white">
                {`${countDown.minutes}:${countDown.seconds < 10 ? `0${countDown.seconds}` : countDown.seconds}`}
              </TextPrimary>
            </div>
          ) : (
            <div />
          )}
          <div className="open-icon">
            <img
              width={32}
              height={32}
              onClick={() => setIsOpen(!isOpen)}
              src={IMG_OPEN_EXAM_SIDEBAR}
              alt="close_sidebar"
            />
          </div>
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className="side-open">
        <div className="content">
          {timeTest ? (
            <>
              <div className="header">
                <TextPrimary color="white" fontSize="size_16">
                  {t('examination.time')}
                </TextPrimary>
                <div />
              </div>
              <div className="time-progress">
                <Progress
                  className="text-white"
                  strokeColor="#07CF84"
                  type="circle"
                  percent={Math.round(currentTime / 600 / timeTest)}
                  format={() => `${countDown.minutes}:${countDown.seconds < 10 ? `0${countDown.seconds}` : countDown.seconds}`}
                />
              </div>
            </>
          ) : (
            <>
              <div className="header" />
              <div className="time-progress" />
            </>
          )}

          <div className="header">
            <TextPrimary color="white" fontSize="size_16">
              {t('examination.question_navigation')}
            </TextPrimary>
            <div />
          </div>
          <div className="container">
            {questionsList.map((number, idx) => (
              <Step
                isValid={isValid(idx)}
                isPassStep={currentNumber === idx}
                key={number.id}
                aria-hidden="true"
                onClick={() => {
                  setCurrentNumber(idx)
                }}
              >
                <TextPrimary color={isValid(idx) ? 'white' : 'black'} fontSize="size_16">
                  {idx + 1}
                </TextPrimary>
              </Step>
            ))}
          </div>
          <img
            className="open-icon"
            width={32}
            height={32}
            onClick={() => setIsOpen(!isOpen)}
            src={IMG_CLOSE_EXAM_SIDEBAR}
            alt="close_sidebar"
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default Sidebar
