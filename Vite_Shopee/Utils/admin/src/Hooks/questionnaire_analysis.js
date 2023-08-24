import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/course_result/questionnaire_analysis/store/saga'
import reducer from 'Modules/course_result/questionnaire_analysis/store/reducer'
import { makeSelectQuestionnaireAnalysis } from 'Modules/course_result/questionnaire_analysis/store/selectors'
import {
  // test
  loadAnalysisTestResult,
  loadAnalysisTestChartAnswer,
  loadAnalysisTestChartPoint,
  loadAnalysisTestDescription,
  loadVersionListTest,
  loadAnalysisVersionTest,
  // survey
  loadAnalysisSurveyResult,
  loadAnalysisSurveyChartAnswer,
  loadAnalysisSurveyDescription,
  loadVersionListSurvey,
  loadAnalysisVersionSurvey,

  // common
  loadCourseList,
  loadUnitListAll,
  saveFilter,
  resetDataTable,
  resetAll
} from 'Modules/course_result/questionnaire_analysis/store/actions'
import { useInjectSaga, useInjectReducer } from 'Stores'

export const useQuestionnaire = () => {
  useInjectSaga({ key: 'questionnaireAnalysis', saga })
  useInjectReducer({ key: 'questionnaireAnalysis', reducer })
  const dispatch = useDispatch()

  const {
    // main
    analysisResult,
    pagination,
    filter,
    isLoading,
    error,
    listVersion: listVersionState,

    // chart
    chartAnswer,
    chartPoint,
    testDescription,
    listCourse: listCourseState,
    listUnit: listUnitAllState
  } = useSelector(makeSelectQuestionnaireAnalysis())

  const { isLoading: isLoadingCourseList, data: listCourse, error: errorCourseList } = listCourseState
  const { isLoading: isLoadingUnitList, data: listUnitAll, error: errorUnitList } = listUnitAllState
  const { isLoading: isLoadingVersionList, data: listVersion, error: errorVersionList } = listVersionState

  // TEST
  const loadAnalysisTestResultAction = (payload) => dispatch(loadAnalysisTestResult(payload))
  const loadAnalysisTestChartAnswerAction = (payload) => dispatch(loadAnalysisTestChartAnswer(payload))
  const loadAnalysisTestChartPointAction = (payload) => dispatch(loadAnalysisTestChartPoint(payload))
  const loadAnalysisTestDescriptionAction = (payload) => dispatch(loadAnalysisTestDescription(payload))
  const loadAnalysisVersionTestAction = (payload) => dispatch(loadAnalysisVersionTest(payload))
  const loadVersionListTestAction = (payload) => dispatch(loadVersionListTest(payload))

  // SURVEY
  const loadAnalysisSurveyResultAction = (payload) => dispatch(loadAnalysisSurveyResult(payload))
  const loadAnalysisSurveyChartAnswerAction = (payload) => dispatch(loadAnalysisSurveyChartAnswer(payload))
  const loadAnalysisSurveyDescriptionAction = (payload) => dispatch(loadAnalysisSurveyDescription(payload))
  const loadAnalysisVersionSurveyAction = (payload) => dispatch(loadAnalysisVersionSurvey(payload))
  const loadVersionListSurveyAction = (payload) => dispatch(loadVersionListSurvey(payload))

  // select data
  const loadUnitListAllAction = (payload) => dispatch(loadUnitListAll(payload))
  const loadCourseListAction = (payload) => dispatch(loadCourseList(payload))

  // common
  const resetAction = (payload) => dispatch(resetAll(payload))
  const resetDataTableAction = (payload) => dispatch(resetDataTable(payload))
  const loadSaveFilterAction = (payload) => dispatch(saveFilter(payload))

  return {
    // main
    analysisResult,
    pagination,
    filter,
    isLoading,
    error,
    resetAction,
    resetDataTableAction,

    // VERSION
    isLoadingVersionList,
    listVersion,
    errorVersionList,

    // TEST
    loadAnalysisTestResultAction,
    loadAnalysisTestChartAnswerAction,
    loadAnalysisTestChartPointAction,
    loadAnalysisTestDescriptionAction,
    loadVersionListTestAction,
    loadAnalysisVersionTestAction,
    // chart
    chartAnswer,
    chartPoint,
    testDescription,

    // SURVEY

    loadAnalysisSurveyResultAction,
    loadAnalysisSurveyChartAnswerAction,
    loadAnalysisSurveyDescriptionAction,
    loadVersionListSurveyAction,
    loadAnalysisVersionSurveyAction,

    loadSaveFilterAction,
    // select data
    loadCourseListAction,
    isLoadingCourseList,
    listCourse,
    errorCourseList,
    loadUnitListAllAction,
    isLoadingUnitList,
    listUnitAll,
    errorUnitList
  }
}
