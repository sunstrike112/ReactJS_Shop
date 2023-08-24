/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/course_result/statistical_results_of_survey/store/saga'
import reducer from 'Modules/course_result/statistical_results_of_survey/store/reducers'
import {
  makeSelectSurveyQuestion,
  makeSelectSurveyResults
} from 'Modules/course_result/statistical_results_of_survey/store/selectors'
import {
  loadStatisticResultsOfSurvey, loadSurveyQuestions, resetSurveyQuestion
} from 'Modules/course_result/statistical_results_of_survey/store/actions'
import { useInjectSaga, useInjectReducer } from 'Stores'

export const UseSurveyResult = () => {
  useInjectSaga({ key: 'surveyResults', saga })
  useInjectReducer({ key: 'surveyResults', reducer })

  const { results, pagination, filter, isLoading, error } = useSelector(makeSelectSurveyResults())
  const {
    questions,
    pagination: questionPagination,
    isLoading: questionIsLoading,
    error: questionError
  } = useSelector(makeSelectSurveyQuestion())

  const dispatch = useDispatch()
  const loadSurveyResultAction = (payload) => dispatch(loadStatisticResultsOfSurvey(payload))
  const loadSurveyQuestionAction = (payload) => dispatch(loadSurveyQuestions(payload))
  const resetSurveyQuestionAction = () => dispatch(resetSurveyQuestion())

  return {
    results,
    questions,
    pagination,
    isLoading,
    error,
    filter,
    questionPagination,
    questionIsLoading,
    questionError,
    loadSurveyResultAction,
    loadSurveyQuestionAction,
    resetSurveyQuestionAction
  }
}
