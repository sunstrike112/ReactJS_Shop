import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  LOAD_ANALYSIS_TEST_RESULT,
  LOAD_ANALYSIS_TEST_CHART_ANSWER,
  LOAD_ANALYSIS_TEST_CHART_POINT,
  LOAD_ANALYSIS_TEST_DESCRIPTION,
  LOAD_ANALYSIS_TEST_VERSION,
  LOAD_VERSION_TEST_LIST,
  LOAD_ANALYSIS_SURVEY_RESULT,
  LOAD_ANALYSIS_SURVEY_CHART_ANSWER,
  LOAD_ANALYSIS_SURVEY_DESCRIPTION,
  LOAD_ANALYSIS_SURVEY_VERSION,
  LOAD_VERSION_SURVEY_LIST,
  LOAD_COURSE_LIST,
  LOAD_UNIT_LIST_ALL,
  SAVE_FILTER,
  RESET_DATA_TABLE,
  RESET_ALL
} from './constants'

export const initialState = {
  isLoading: false,
  error: null,
  analysisResult: [],
  pagination: {
    limit: 100,
    page: 1,
    total: 0
  },
  testDescription: {
    isLoading: false,
    error: null,
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0
    }
  },
  filter: {},
  order: [],
  chartAnswer: {
    isLoading: false,
    data: [],
    error: null
  },
  chartPoint: {
    isLoading: false,
    data: [],
    error: null
  },
  listCourse: {
    isLoading: false,
    data: [],
    error: null
  },
  listVersion: {
    isLoading: false,
    data: [],
    error: null
  },
  currVersion: {
    isLoading: false,
    data: {},
    error: null
  },
  listUnit: {
    isLoading: false,
    data: [],
    error: null
  }
}

function loadAnalysis(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadAnalysisSuccess(state, { payload }) {
  const { result, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    analysisResult: result.map((item) => ({ ...item, versionTrue: item.version })),
    pagination,
    filter
  })
}

function loadAnalysisFailure(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function loadAnalysisChartAnswer(state) {
  return updateObject(state, {
    chartAnswer: {
      ...state.chartAnswer,
      isLoading: true
    }
  })
}

function loadAnalysisChartAnswerSuccess(state, { data }) {
  return updateObject(state, {
    chartAnswer: {
      ...state.chartAnswer,
      isLoading: false,
      data
    }
  })
}

function loadAnalysisChartAnswerFailure(state, { error }) {
  return updateObject(state, {
    chartAnswer: {
      ...state.chartAnswer,
      isLoading: false,
      error
    }
  })
}

function loadAnalysisChartPoint(state) {
  return updateObject(state, {
    chartPoint: {
      ...state.chartPoint,
      isLoading: true
    }
  })
}

function loadAnalysisChartPointSuccess(state, { data }) {
  return updateObject(state, {
    chartPoint: {
      ...state.chartPoint,
      isLoading: false,
      data
    }
  })
}

function loadAnalysisChartPointFailure(state, { error }) {
  return updateObject(state, {
    chartPoint: {
      ...state.chartPoint,
      isLoading: false,
      error
    }
  })
}

function loadAnalysisDescription(state) {
  return updateObject(state, {
    testDescription: {
      ...state.testDescription,
      isLoading: true
    }
  })
}

function loadAnalysisDescriptionSuccess(state, { payload }) {
  const { result, pagination, filter } = payload
  return updateObject(state, {
    testDescription: {
      ...state.testDescription,
      isLoading: false,
      data: result,
      pagination,
      filter
    }
  })
}

function loadAnalysisDescriptionFailure(state, { error }) {
  return updateObject(state, {
    testDescription: {
      ...state.testDescription,
      error,
      isLoading: false
    }
  })
}

function loadAnalysisTestVersion(state) {
  return updateObject(state, {
    currVersion: {
      ...state.currVersion,
      isLoading: true
    }
  })
}

function loadAnalysisTestVersionSuccess(state, { data }) {
  const index = state.analysisResult.findIndex((item) => {
    if (item.unitTestId) return item.unitTestId === data.unitTestId
    return item.unitSurveyId === data.unitSurveyId
  })
  if (index !== -1) {
    state.analysisResult[index] = { ...state.analysisResult[index], ...data }
  }
  return updateObject(state, {
    analysisResult: [...state.analysisResult],
    currVersion: {
      ...state.currVersion,
      isLoading: false,
      data
    }
  })
}

function loadAnalysisTestVersionFailure(state, { error }) {
  return updateObject(state, {
    currVersion: {
      ...state.currVersion,
      isLoading: false,
      error
    }
  })
}

function loadAnalysisSurveyVersion(state) {
  return updateObject(state, {
    currVersion: {
      ...state.currVersion,
      isLoading: true
    }
  })
}

function loadAnalysisSurveyVersionSuccess(state, { data }) {
  const index = state.analysisResult.findIndex((item) => {
    if (item.unitSurveyId) return item.unitSurveyId === data.unitSurveyId
    return item.unitSurveyId === data.unitSurveyId
  })
  if (index !== -1) {
    state.analysisResult[index] = { ...state.analysisResult[index], ...data }
  }
  return updateObject(state, {
    analysisResult: [...state.analysisResult],
    currVersion: {
      ...state.currVersion,
      isLoading: false,
      data
    }
  })
}

function loadAnalysisSurveyVersionFailure(state, { error }) {
  return updateObject(state, {
    currVersion: {
      ...state.currVersion,
      isLoading: false,
      error
    }
  })
}

function loadUnitListAll(state) {
  return updateObject(state, {
    listUnit: {
      ...state.listUnit,
      isLoading: true
    }
  })
}

function loadUnitListAllSuccess(state, { data }) {
  return updateObject(state, {
    listUnit: {
      ...state.listUnit,
      isLoading: false,
      data
    }
  })
}

function loadUnitListAllFailure(state, { error }) {
  return updateObject(state, {
    listUnit: {
      ...state.listUnit,
      isLoading: false,
      error
    }
  })
}

function loadCourseList(state) {
  return updateObject(state, {
    listCourse: {
      ...state.listCourse,
      isLoading: true
    }
  })
}

function loadCourseListSuccess(state, { data }) {
  return updateObject(state, {
    listCourse: {
      ...state.listCourse,
      isLoading: false,
      data
    }
  })
}

function loadCourseListFailure(state, { error }) {
  return updateObject(state, {
    listCourse: {
      ...state.listCourse,
      isLoading: false,
      error
    }
  })
}

function loadVersionListTest(state) {
  return updateObject(state, {
    listVersion: {
      ...state.listVersion,
      isLoading: true
    }
  })
}

function loadVersionListTestSuccess(state, { data }) {
  return updateObject(state, {
    listVersion: {
      ...state.listVersion,
      isLoading: false,
      data
    }
  })
}

function loadVersionListTestFailure(state, { error }) {
  return updateObject(state, {
    listVersion: {
      ...state.listVersion,
      isLoading: false,
      error
    }
  })
}

function loadVersionListSurvey(state) {
  return updateObject(state, {
    chartAnswer: {
      ...state.chartAnswer,
      isLoading: true
    },
    chartPoint: {
      ...state.chartAnswer,
      isLoading: true
    },
    listVersion: {
      ...state.listVersion,
      isLoading: true
    }
  })
}

function loadVersionListSurveySuccess(state, { data }) {
  return updateObject(state, {
    chartAnswer: {
      ...state.chartAnswer,
      isLoading: false
    },
    chartPoint: {
      ...state.chartAnswer,
      isLoading: false
    },
    listVersion: {
      ...state.listVersion,
      isLoading: false,
      data
    }
  })
}

function loadVersionListSurveyFailure(state, { error }) {
  return updateObject(state, {
    chartAnswer: {
      ...state.chartAnswer,
      isLoading: false
    },
    chartPoint: {
      ...state.chartAnswer,
      isLoading: false
    },
    listVersion: {
      ...state.listVersion,
      isLoading: false,
      error
    }
  })
}

function saveFilter(state) {
  return updateObject(state, {
    // isLoading: true
  })
}

function filterSaved(state, payload) {
  const { filter } = payload
  return updateObject(state, {
    // isLoading: false,
    filter
  })
}

function savedFilterError(state, { error }) {
  return updateObject(state, {
    error
    // isLoading: false
  })
}

function resetAll(state) {
  return updateObject(state, initialState)
}

function resetDataTable(state) {
  return updateObject(state, {
    analysisResult: [],
    chartAnswer: {
      isLoading: false,
      data: [],
      error: null
    },
    chartPoint: {
      isLoading: false,
      data: [],
      error: null
    },
    listVersion: {
      isLoading: false,
      data: [],
      error: null
    },
    currVersion: {
      isLoading: false,
      data: {},
      error: null
    }
  })
}
// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_ANALYSIS_TEST_RESULT)]: loadAnalysis,
  [SUCCESS(LOAD_ANALYSIS_TEST_RESULT)]: loadAnalysisSuccess,
  [FAILURE(LOAD_ANALYSIS_TEST_RESULT)]: loadAnalysisFailure,
  [REQUEST(LOAD_ANALYSIS_SURVEY_RESULT)]: loadAnalysis,
  [SUCCESS(LOAD_ANALYSIS_SURVEY_RESULT)]: loadAnalysisSuccess,
  [FAILURE(LOAD_ANALYSIS_SURVEY_RESULT)]: loadAnalysisFailure,

  [REQUEST(LOAD_ANALYSIS_TEST_CHART_ANSWER)]: loadAnalysisChartAnswer,
  [SUCCESS(LOAD_ANALYSIS_TEST_CHART_ANSWER)]: loadAnalysisChartAnswerSuccess,
  [FAILURE(LOAD_ANALYSIS_TEST_CHART_ANSWER)]: loadAnalysisChartAnswerFailure,
  [REQUEST(LOAD_ANALYSIS_SURVEY_CHART_ANSWER)]: loadAnalysisChartAnswer,
  [SUCCESS(LOAD_ANALYSIS_SURVEY_CHART_ANSWER)]: loadAnalysisChartAnswerSuccess,
  [FAILURE(LOAD_ANALYSIS_SURVEY_CHART_ANSWER)]: loadAnalysisChartAnswerFailure,

  [REQUEST(LOAD_ANALYSIS_TEST_CHART_POINT)]: loadAnalysisChartPoint,
  [SUCCESS(LOAD_ANALYSIS_TEST_CHART_POINT)]: loadAnalysisChartPointSuccess,
  [FAILURE(LOAD_ANALYSIS_TEST_CHART_POINT)]: loadAnalysisChartPointFailure,

  [REQUEST(LOAD_ANALYSIS_TEST_VERSION)]: loadAnalysisTestVersion,
  [SUCCESS(LOAD_ANALYSIS_TEST_VERSION)]: loadAnalysisTestVersionSuccess,
  [FAILURE(LOAD_ANALYSIS_TEST_VERSION)]: loadAnalysisTestVersionFailure,
  [REQUEST(LOAD_ANALYSIS_SURVEY_VERSION)]: loadAnalysisSurveyVersion,
  [SUCCESS(LOAD_ANALYSIS_SURVEY_VERSION)]: loadAnalysisSurveyVersionSuccess,
  [FAILURE(LOAD_ANALYSIS_SURVEY_VERSION)]: loadAnalysisSurveyVersionFailure,

  [REQUEST(LOAD_VERSION_TEST_LIST)]: loadVersionListTest,
  [SUCCESS(LOAD_VERSION_TEST_LIST)]: loadVersionListTestSuccess,
  [FAILURE(LOAD_VERSION_TEST_LIST)]: loadVersionListTestFailure,
  [REQUEST(LOAD_VERSION_SURVEY_LIST)]: loadVersionListSurvey,
  [SUCCESS(LOAD_VERSION_SURVEY_LIST)]: loadVersionListSurveySuccess,
  [FAILURE(LOAD_VERSION_SURVEY_LIST)]: loadVersionListSurveyFailure,

  [REQUEST(LOAD_ANALYSIS_TEST_DESCRIPTION)]: loadAnalysisDescription,
  [SUCCESS(LOAD_ANALYSIS_TEST_DESCRIPTION)]: loadAnalysisDescriptionSuccess,
  [FAILURE(LOAD_ANALYSIS_TEST_DESCRIPTION)]: loadAnalysisDescriptionFailure,
  [REQUEST(LOAD_ANALYSIS_SURVEY_DESCRIPTION)]: loadAnalysisDescription,
  [SUCCESS(LOAD_ANALYSIS_SURVEY_DESCRIPTION)]: loadAnalysisDescriptionSuccess,
  [FAILURE(LOAD_ANALYSIS_SURVEY_DESCRIPTION)]: loadAnalysisDescriptionFailure,

  [REQUEST(LOAD_COURSE_LIST)]: loadCourseList,
  [SUCCESS(LOAD_COURSE_LIST)]: loadCourseListSuccess,
  [FAILURE(LOAD_COURSE_LIST)]: loadCourseListFailure,

  [REQUEST(LOAD_UNIT_LIST_ALL)]: loadUnitListAll,
  [SUCCESS(LOAD_UNIT_LIST_ALL)]: loadUnitListAllSuccess,
  [FAILURE(LOAD_UNIT_LIST_ALL)]: loadUnitListAllFailure,

  [REQUEST(SAVE_FILTER)]: saveFilter,
  [SUCCESS(SAVE_FILTER)]: filterSaved,
  [FAILURE(SAVE_FILTER)]: savedFilterError,

  [REQUEST(RESET_DATA_TABLE)]: resetDataTable,

  [REQUEST(RESET_ALL)]: resetAll
})
