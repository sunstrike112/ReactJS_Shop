/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { dateFormat } from '../../../utils'

import { IMG_EXAMINATION_RESULT } from '../../../assets'
import { TextNormal, Answer, Question } from '../../../components'
import { Wrapper } from './styled'
import TestUnitLayout from '../../layouts/test-unit'
import { TABS } from '../constants'
import { useExamination, useHistories, useProfile } from '../../../hooks'

function useQuery() {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

const ExaminationResult = () => {
  const history = useHistories()
  const { t } = useTranslation()
  const { courseId, testId } = useParams()
  const { profile } = useProfile()
  const query = useQuery()
  const fromTab = query.get('fromTab')

  const {
    testResult,
    getTestResult,
    answers,
    correctAnswer,
    inCorrectAnswer,
    unAnswers
  } = useExamination({
    userId: query.get('userId') ? query.get('userId') : profile.userId,
    courseId,
    testId
  })
  const [dataQuestion, setQuestions] = useState([])
  const [currentTab, setCurrentTab] = useState(TABS[0].key)

  useEffect(() => {
    if (answers.length > 0) {
      if (currentTab === TABS[0].key) {
        setQuestions(answers)
      }
      if (currentTab === TABS[1].key) {
        setQuestions(correctAnswer)
      }

      if (currentTab === TABS[2].key) {
        setQuestions(inCorrectAnswer)
      }
      if (currentTab === TABS[3].key) {
        setQuestions(unAnswers)
      }
    }
  }, [currentTab, answers])

  useEffect(() => {
    getTestResult()
  }, [courseId, testId, profile.userId])

  const isSubmit = useMemo(() => {
    if (!testResult?.limitCountTest) {
      return true
    }
    if (testResult?.limitCountTest && testResult?.countStudyTest >= testResult?.limitCountTest) {
      return false
    }
    return true
  }, [testResult])

  const onTab = (tab) => {
    setCurrentTab(tab)
  }
  const renderTabs = () => {
    if (testResult) {
      return TABS.map(({ key, title, Numquestion }) => (
        <div key={key} className="content-box" onClick={() => onTab(key)}>
          <TextNormal color="foursdary" fontSize="size_14">
            {t(title)}
          </TextNormal>
          <TextNormal
            className="text-underline"
            color={`${key === currentTab ? 'primary_btn' : 'black'}`}
            fontWeight="fw_600"
            fontSize="size_20"
          >
            {testResult[Numquestion] || 0}
          </TextNormal>
        </div>
      ))
    }
    return null
  }

  const getScoreAchieved = () => {
    if (!testResult?.passScore) {
      return t('examination.test_result.always_pass')
    }

    if (testResult?.passScore !== testResult?.numberQuestion) {
      return t('examination.test_result.benchmark', { point: testResult?.passScore })
    }

    return t('examination.test_result.all_correct')
  }
  const achiveGoal = testResult?.resultLesson === 'PASS' ? t('examination.test_result.achieve_goal') : t('examination.test_result.goal_not_achieve')
  const scoreAchieved = getScoreAchieved()
  return (
    <TestUnitLayout
      testName={testResult?.nameLesson}
      questionsNumber={testResult?.numberQuestion}
      answerNumber={(testResult?.numberQuestion - testResult?.unansweredQuestion) || 0}
      isSubmit={isSubmit}
      onClickEnd={() => history.push(`/course/detail/${courseId}?fromTab=${fromTab}`)}
      redirectFrom={query.get('redirectFrom')}
    >
      <Wrapper>
        <div className="examination-result">
          <img src={IMG_EXAMINATION_RESULT} alt="examination_resul" style={{ maxWidth: 167 }} />
          <TextNormal fontWeight="fw_600" fontSize="size_24">{achiveGoal}</TextNormal>
          <div className="d-flex">
            <TextNormal fontWeight="fw_600" fontSize="size_14">
              {t('examination.test_result.score_achieved', { point: testResult?.point })}
            </TextNormal>
            <TextNormal className="m-4" fontSize="size_14">/</TextNormal>
            <TextNormal fontSize="size_14">
              {t('examination.test_result.total_score', { total: testResult?.totalPoints })}
            </TextNormal>
          </div>
          {!!testResult?.passScore && (
            <div className="complete-box">
              <TextNormal
                color="success"
                fontWeight="fw_600"
                className="m-4"
                fontSize="size_14"
              >
                {scoreAchieved}
              </TextNormal>
            </div>
          )}
          <div className="result-box">
            <div className="result-box-content">
              {renderTabs()}
            </div>
          </div>
          <TextNormal
            className="mb-12"
            color="foursdary"
            fontSize="size_14"
          >
            {t('examination.test_result.date_test', { date: dateFormat(testResult?.dateReply) })}
          </TextNormal>
        </div>
        {
          (dataQuestion || []).map((question, idx) => (
            <div key={question.id} className="examination-confirm-container">
              <Question
                currentNumber={question.numberIndex}
                questions={question}
                isRequired={question.isRequired}
                isInCorrectAnswer={!question.resultQuestion}
              />
              <div className="answer">
                <Answer
                  questionType={question.questionType}
                  listAnswer={question.listAnswer}
                  currentNumber={idx}
                  readOnly
                  testResult={testResult}
                  showAnswer={testResult?.isShowAnswer === null ? true : !!testResult?.isShowAnswer}
                  key={question.id}
                  resultQuestion={question.resultQuestion}
                  description={question.description}
                />
              </div>
            </div>
          ))
        }
      </Wrapper>
    </TestUnitLayout>

  )
}

export default ExaminationResult
