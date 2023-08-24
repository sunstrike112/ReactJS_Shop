import { put, takeLatest, select } from 'redux-saga/effects'
import { notification } from 'antd'
import i18next from 'I18n'
import { RoutesName } from 'Modules/course/routes'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  registerTest,
  getDetailTestAPI,
  deleteListUnitLesson,
  getListUnitLesson,
  getListOrderUnitLesson,
  updateOrderUnitLesson,
  basicInfoSetting,
  optionSettingTest,
  createUnitLesson,
  getDetailLecture,
  editUnitLesson,
  updatePassScore,
  getQuestionsCategory,
  getQuestionListAPI,
  deleteQuestion,
  loadOrderQuestionAPI,
  updateSortQuestionAPI,
  registerReportAPI,
  loadReportDetailAPI,
  createUnitSurvey,
  getUnitSurvey,
  updateUnitSurvey,
  getUnitSurveyQuestions,
  deleteUnitSurveyQuestions,
  createUnitSurveyQuestion,
  getUnitSurveyQuestion,
  updateUnitSurveyQuestion,
  updateOrderUnitSurveyQuestion,
  loadQuestionReportAPI,
  updateBasicReportAPI,
  createQuestion,
  getDetailQuestion,
  editQuestion,
  settingQuestionReportAPI,
  deleteQuestionReportAPI,
  createQuestionReportAPI,
  loadDetailQuestionReportAPI,
  editQuestionReportAPI,
  createUnitLessonImage
} from 'APIs'

import { getUnitLessonImage, getUnitSurveyQuestionsCreate, getUnitSurveyQuestionsEdit } from 'APIs/unit-setting.api'
import { QUERY } from 'Constants'
import {
  GET_DETAIL_TEST,
  REGISTER_TEST,
  LOAD_LIST_UNIT_LESSON,
  LOAD_LIST_ORDER_UNIT_LESSON,
  UPDATE_ORDER_UNIT_LESSON,
  DELETE_LIST_UNIT_LESSON,
  DELETE_ERROR_REGISTER,
  BASIC_INFO_SETTING,
  OPTION_SETTING,
  CREATE_UNIT_LESSON,
  GET_DETAIL_LESSON,
  EDIT_UNIT_LESSON,
  UPDATE_PASS_SCORE,
  GET_QUESTIONS_CATEGORY,
  GET_QUESTION_LIST,
  DELETE_QUESTION,
  LOAD_ORDER_QUESTION,
  UPDATE_SORT_QUESTION,
  REGISTER_REPORT,
  LOAD_REPORT_DETAIL,
  CREATE_UNIT_SURVEY,
  GET_UNIT_SURVEY,
  UPDATE_UNIT_SURVEY,
  LOAD_LIST_UNIT_SURVEY_QUESTION,
  DELETE_LIST_UNIT_SURVEY_QUESTION,
  CREATE_UNIT_SURVEY_QUESTION,
  UPDATE_UNIT_SURVEY_QUESTION,
  GET_UNIT_SURVEY_QUESTION,
  LOAD_QUESTION_REPORT,
  UPDATE_BASIC_SETTING_REPORT,
  CREATE_QUESTION,
  GET_DETAIL_QUESTION,
  EDIT_QUESTION,
  SETTING_QUESTION_REPORT,
  DELETE_QUESTION_REPORT,
  MODIFY_LIST_UNIT_SURVEY_QUESTION,
  UPDATE_ORDER_UNIT_SURVEY_QUESTION,
  CREATE_QUESTION_REPORT,
  LOAD_DETAIL_QUESTION_REPORT,
  EDIT_QUESTION_REPORT,
  SORT_QUESTION_REPORT,
  CREATE_UNIT_LESSON_IMAGE,
  GET_DETAIL_LESSON_IMAGE
} from './constants'
import { makeSelectCourseId, makeSelectSurveyQuestionIds, makeSelectUnitSetting } from './selectors'
import { getQuestionList, loadOrderQuestion, loadQuestionReport, getDetailTest } from './actions'

i18next.loadNamespaces(['common'])

export function* registerTestSaga({ payload }) {
  try {
    const { code, data } = yield registerTest(payload)
    const { history, courseId } = payload
    if (code === 200) {
      history.push(`${RoutesName.TEST_DETAIL}/${courseId}/${data.testId}`)
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(REGISTER_TEST),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(REGISTER_TEST),
      error
    })
  }
}

export function* deleteErrorRegisterSaga() {
  try {
    yield put({
      type: SUCCESS(DELETE_ERROR_REGISTER)
    })
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_ERROR_REGISTER),
      error
    })
  }
}

export function* getDetailTestSaga({ payload }) {
  try {
    const { code, data } = yield getDetailTestAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_DETAIL_TEST),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_DETAIL_TEST),
      error
    })
  }
}

export function* loadListUnitLessonSaga({ payload }) {
  try {
    const courseId = yield select(makeSelectCourseId())
    const { data } = yield getListUnitLesson({ ...payload, courseId })
    const { result: unitLessons, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_LIST_UNIT_LESSON),
      payload: {
        unitLessons,
        pagination
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_LIST_UNIT_LESSON),
      error
    })
  }
}

export function* loadListOrderUnitLesson({ payload }) {
  try {
    const courseId = yield select(makeSelectCourseId())
    const { data } = yield getListOrderUnitLesson({ ...payload, courseId })
    yield put({
      type: SUCCESS(LOAD_LIST_ORDER_UNIT_LESSON),
      payload: {
        order: data
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_LIST_ORDER_UNIT_LESSON),
      error
    })
  }
}

export function* updateOrderUnitLessonSaga({ payload }) {
  try {
    const { code } = yield updateOrderUnitLesson(payload)
    const { pageSize, currentPage } = payload
    if (code === 200) {
      yield put({
        type: SUCCESS(UPDATE_ORDER_UNIT_LESSON)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.sort_success'),
        duration: 2
      })
      yield put({
        type: REQUEST(LOAD_LIST_ORDER_UNIT_LESSON)
      })
      yield put({
        type: REQUEST(LOAD_LIST_UNIT_LESSON),
        payload: {
          courseId: payload.courseId, // get from auth store
          params: {
            limit: pageSize,
            page: currentPage
          }
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_ORDER_UNIT_LESSON),
      error
    })
  }
}

export function* deleteListUnitLessonSaga({ payload }) {
  try {
    const { code } = yield deleteListUnitLesson(payload)
    const { pageSize, currentPage } = payload
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_LIST_UNIT_LESSON)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      yield put({
        type: REQUEST(LOAD_LIST_UNIT_LESSON),
        payload: {
          params: {
            limit: pageSize,
            page: currentPage
          }
        }
      })
      yield put({
        type: REQUEST(LOAD_LIST_ORDER_UNIT_LESSON)
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_LIST_UNIT_LESSON),
      error
    })
  }
}

export function* createUnitLessonSaga({ payload }) {
  const { isWebviewMode, history } = payload
  try {
    const { code, data } = yield createUnitLesson(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(CREATE_UNIT_LESSON),
        data: data?.unitId
      })
      notification.success({
        message: payload.t('common:message.create_success'),
        duration: 2
      })
      if (isWebviewMode) {
        history.push('/')
      }
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_UNIT_LESSON),
      error
    })
  }
}

export function* createUnitLessonImageSaga({ payload }) {
  const { isWebviewMode, history } = payload
  try {
    const { code, data } = yield createUnitLessonImage(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(CREATE_UNIT_LESSON_IMAGE),
        data: data?.unitId
      })
      notification.success({
        message: payload.t('common:message.create_success'),
        duration: 2
      })
      if (isWebviewMode) {
        history.push('/')
      }
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_UNIT_LESSON_IMAGE),
      error
    })
  }
}

export function* createQuestionSaga({ payload }) {
  try {
    const { t, ...restPayload } = payload
    const { code } = yield createQuestion(restPayload)
    if (code === 200) {
      yield put({
        type: SUCCESS(CREATE_QUESTION)
      })
      notification.success({
        message: t('common:message.create_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_QUESTION),
      error
    })
  }
}
export function* getDetailQuestionSaga({ payload }) {
  try {
    const { code, data } = yield getDetailQuestion(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_DETAIL_QUESTION),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_DETAIL_QUESTION),
      error
    })
  }
}
export function* editQuestionSaga({ payload }) {
  try {
    const { code } = yield editQuestion(payload)
    const { history, locationFrom, courseId, testId } = payload
    if (code === 200) {
      if (locationFrom) {
        history.push(locationFrom)
      } else {
        history.push(`${RoutesName.QUESTION_SETTING}/${courseId}/${testId}`)
      }
      yield put({
        type: SUCCESS(EDIT_QUESTION)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(EDIT_QUESTION),
      error
    })
  }
}

export function* basicInfoSettingSaga({ payload }) {
  try {
    const { code, data } = yield basicInfoSetting(payload)
    const { history, createBy, courseId, testId } = payload
    if (code === 200) {
      history.push(`${RoutesName.TEST_DETAIL}/${courseId}/${testId}?${QUERY.CREATE_BY}=${createBy}`)
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(BASIC_INFO_SETTING),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(BASIC_INFO_SETTING),
      error
    })
  }
}

export function* optionSettingTestSaga({ payload }) {
  try {
    const { code, data } = yield optionSettingTest(payload)
    const { history, createBy, courseId, unitId } = payload
    if (code === 200) {
      history.push(`${RoutesName.TEST_DETAIL}/${courseId}/${unitId}?${QUERY.CREATE_BY}=${createBy}`)
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(OPTION_SETTING),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(OPTION_SETTING),
      error
    })
  }
}

export function* getDetailLessonSaga({ payload }) {
  try {
    const { code, data } = yield getDetailLecture(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_DETAIL_LESSON),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_DETAIL_LESSON),
      error
    })
  }
}

export function* updatePassScoreSaga({ payload }) {
  try {
    const { code, data } = yield updatePassScore(payload)
    const { courseId, unitId } = payload
    if (code === 200) {
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(UPDATE_PASS_SCORE),
        data
      })
      yield put(getDetailTest({ courseId, unitId }))
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_PASS_SCORE),
      error
    })
  }
}

export function* editUnitLessonSaga({ payload }) {
  try {
    const { code } = yield editUnitLesson(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(EDIT_UNIT_LESSON)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(EDIT_UNIT_LESSON),
      error
    })
  }
}

export function* getQuestionsCategorySaga() {
  try {
    const { code, data } = yield getQuestionsCategory()
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_QUESTIONS_CATEGORY),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_QUESTIONS_CATEGORY),
      error
    })
  }
}

export function* getQuestionListSaga({ payload }) {
  try {
    const { code, data } = yield getQuestionListAPI(payload)
    const { result: questions, ...pagination } = data.questions
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_QUESTION_LIST),
        payload: {
          questions,
          pagination,
          filter: payload?.params?.filter
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_QUESTION_LIST),
      error
    })
  }
}

export function* loadOrderQuestionSaga({ payload }) {
  try {
    const { code, data } = yield loadOrderQuestionAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_ORDER_QUESTION),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ORDER_QUESTION),
      error
    })
  }
}

export function* deleteQuestionSaga({ payload }) {
  try {
    const { questionSetting } = yield select(makeSelectUnitSetting())
    const { pagination, filter } = questionSetting
    const { unitId, courseId } = payload
    const { code } = yield deleteQuestion(payload)
    if (code === 200) {
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      yield put(getDetailTest({ courseId, unitId }))
      yield put(getQuestionList({
        unitId,
        params:
        {
          page: pagination.page,
          limit: pagination.limit,
          filter
        }
      }))
      yield put(loadOrderQuestion({ unitId }))
      yield put({
        type: SUCCESS(DELETE_QUESTION)
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_QUESTION),
      error
    })
  }
}

export function* updateSortQuestionSaga({ payload }) {
  try {
    const { questionSetting } = yield select(makeSelectUnitSetting())
    const { pagination, filter } = questionSetting
    const { unitId } = payload
    const { code } = yield updateSortQuestionAPI(payload)
    if (code === 200) {
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield put(getQuestionList({
        unitId,
        params:
        {
          page: pagination.page,
          limit: pagination.limit,
          filter
        }
      }))
      yield put(loadOrderQuestion({ unitId }))
      yield put({
        type: SUCCESS(UPDATE_SORT_QUESTION)
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_SORT_QUESTION),
      error
    })
  }
}

export function* registerReportSaga({ payload }) {
  try {
    const { code, data } = yield registerReportAPI(payload)
    const { history } = payload
    if (code === 200) {
      history.push(`${RoutesName.REPORT_DETAIL}/${data.testId}`)
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(REGISTER_REPORT),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(REGISTER_REPORT),
      error
    })
  }
}

export function* createUnitSurveySaga({ payload }) {
  const { courseId, data, history, langCode } = payload
  try {
    const { code } = yield createUnitSurvey({ courseId, data, langCode })
    if (code === 200) {
      yield put({
        type: SUCCESS(CREATE_UNIT_SURVEY)
      })

      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
      yield history.push(RoutesName.UNIT_SETTINGS)
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_UNIT_SURVEY),
      error
    })
  }
}

export function* loadReportDetailSaga({ payload }) {
  try {
    const { code, data } = yield loadReportDetailAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_REPORT_DETAIL),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_REPORT_DETAIL),
      error
    })
  }
}

export function* getUnitSurveySaga({ payload }) {
  try {
    const { code, data: survey } = yield getUnitSurvey(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_UNIT_SURVEY),
        survey
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_UNIT_SURVEY),
      error
    })
  }
}

export function* updateUnitSurveySaga({ payload }) {
  const { courseId, surveyId, data, history } = payload
  try {
    const { code } = yield updateUnitSurvey({ courseId, surveyId, data })
    if (code === 200) {
      yield put({
        type: SUCCESS(UPDATE_UNIT_SURVEY)
      })

      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield history.push(RoutesName.UNIT_SETTINGS)
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_UNIT_SURVEY),
      error
    })
  }
}

export function* getUnitSurveyQuestionsSaga({ payload }) {
  const { surveyQuestionsTemp } = payload
  try {
    let apiCall = null
    switch (payload.type) {
      case 'create':
        apiCall = getUnitSurveyQuestionsCreate
        break
      case 'edit':
        apiCall = getUnitSurveyQuestionsEdit
        break
      default:
        apiCall = getUnitSurveyQuestions
        break
    }
    const { code, data: surveyQuestions } = yield apiCall(payload)
    if (code === 200) {
      (surveyQuestionsTemp || []).forEach((item, index, self) => {
        const indexTemp = surveyQuestions.findIndex(({ cloneId }) => cloneId === item.questionId)
        if (indexTemp !== -1) {
          self[index] = surveyQuestions[indexTemp]
        }
      })
      yield put({
        type: SUCCESS(LOAD_LIST_UNIT_SURVEY_QUESTION),
        surveyQuestions: surveyQuestionsTemp || surveyQuestions
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_LIST_UNIT_SURVEY_QUESTION),
      error
    })
  }
}

export function* deleteUnitSurveyQuestionsSaga({ payload }) {
  const { surveyQuestionsTemp } = payload
  try {
    const { code } = yield deleteUnitSurveyQuestions(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_LIST_UNIT_SURVEY_QUESTION)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })

      const ids = yield select(makeSelectSurveyQuestionIds())
      yield put({
        type: REQUEST(LOAD_LIST_UNIT_SURVEY_QUESTION),
        payload: payload.surveyId ? {
          type: 'edit',
          params: { surveyId: payload.surveyId },
          surveyQuestionsTemp
        } : {
          type: 'create',
          data: { ids },
          surveyQuestionsTemp
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_LIST_UNIT_SURVEY_QUESTION),
      error
    })
  }
}

export function* createUnitSurveyQuestionSaga({ payload }) {
  try {
    const { code, data: surveyQuestion } = yield createUnitSurveyQuestion(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(CREATE_UNIT_SURVEY_QUESTION)
      })
      yield put({
        type: SUCCESS(MODIFY_LIST_UNIT_SURVEY_QUESTION),
        surveyQuestion
      })

      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_UNIT_SURVEY_QUESTION),
      error
    })
  }
}

export function* getUnitSurveyQuestionSaga({ payload }) {
  try {
    const { code, data: surveyQuestion } = yield getUnitSurveyQuestion(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_UNIT_SURVEY_QUESTION),
        surveyQuestion
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_UNIT_SURVEY_QUESTION),
      error
    })
  }
}

export function* updateUnitSurveyQuestionSaga({ payload }) {
  const { surveyQuestionsTemp } = payload
  try {
    const { code, data } = yield updateUnitSurveyQuestion(payload)
    surveyQuestionsTemp.forEach((item, index, self) => {
      if (item.questionId === data.cloneId) {
        self[index] = data
      }
    })
    if (code === 200) {
      yield put({
        type: SUCCESS(UPDATE_UNIT_SURVEY_QUESTION)
      })

      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })

      const ids = yield select(makeSelectSurveyQuestionIds())
      yield put({
        type: REQUEST(LOAD_LIST_UNIT_SURVEY_QUESTION),
        payload: payload.data.surveyId ? {
          type: 'edit',
          params: {
            surveyId: payload.data.surveyId
          },
          surveyQuestionsTemp
        } : {
          type: 'create',
          data: {
            ids
          },
          surveyQuestionsTemp
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_UNIT_SURVEY_QUESTION),
      error
    })
  }
}

export function* updateOrderUnitSurveyQuestionSaga({ payload }) {
  try {
    const { code } = yield updateOrderUnitSurveyQuestion(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(UPDATE_ORDER_UNIT_SURVEY_QUESTION),
        surveyQuestions: payload.surveyQuestions
      })

      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.sort_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_ORDER_UNIT_SURVEY_QUESTION),
      error
    })
  }
}

export function* loadQuestionReportSaga({ payload }) {
  try {
    const { code, data: reportQuestions } = yield loadQuestionReportAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_QUESTION_REPORT),
        reportQuestions
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_QUESTION_REPORT),
      error
    })
  }
}

export function* updateBasicReportSaga({ payload }) {
  try {
    const { code } = yield updateBasicReportAPI(payload)
    const { history, createBy, reportId } = payload
    if (code === 200) {
      history.push(`${RoutesName.REPORT_DETAIL}/${reportId}?${QUERY.CREATE_BY}=${createBy}`)
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(UPDATE_BASIC_SETTING_REPORT)
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_BASIC_SETTING_REPORT),
      error
    })
  }
}

export function* settingQuestionReportSaga({ payload }) {
  try {
    const { code } = yield settingQuestionReportAPI(payload)
    const { history, reportId, t, createBy } = payload
    if (code === 200) {
      yield history.push(`${RoutesName.REPORT_DETAIL}/${reportId}?createBy=${createBy}`)
      notification.success({
        message: t('common:message.update_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(SETTING_QUESTION_REPORT)
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(SETTING_QUESTION_REPORT),
      error
    })
  }
}

export function* deleteQuestionReportSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield deleteQuestionReportAPI(payload)
    const { reportId, t } = payload
    if (code === 200) {
      notification.success({
        message: t('common:message.delete_success'),
        duration: 2
      })
      yield put(loadQuestionReport({ reportId }))
      yield put({
        type: SUCCESS(DELETE_QUESTION_REPORT)
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_QUESTION_REPORT),
      error
    })
  }
}

export function* createQuestionReportSaga({ payload }) {
  try {
    const { code } = yield createQuestionReportAPI(payload)
    const { reportId, setVisible } = payload
    if (code === 200) {
      notification.success({
        message: i18next.t('common:message.create_success'),
        duration: 2
      })
      setVisible(false)
      yield put(loadQuestionReport({ reportId }))
      yield put({
        type: SUCCESS(CREATE_QUESTION_REPORT)
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_QUESTION_REPORT),
      error
    })
  }
}

export function* editQuestionReportSaga({ payload }) {
  try {
    const { code } = yield editQuestionReportAPI(payload)
    const { reportId, setVisible } = payload
    if (code === 200) {
      notification.success({
        message: i18next.t('common:message.update_success'),
        duration: 2
      })
      setVisible(false)
      yield put(loadQuestionReport({ reportId }))
      yield put({
        type: SUCCESS(EDIT_QUESTION_REPORT)
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(EDIT_QUESTION_REPORT),
      error
    })
  }
}

export function* sortQuestionReportSaga({ payload }) {
  try {
    const { code } = yield updateSortQuestionAPI(payload)
    if (code === 200) {
      notification.success({
        message: i18next.t('common:message.sort_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(SORT_QUESTION_REPORT)
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(SORT_QUESTION_REPORT),
      error
    })
  }
}

export function* loadDetailQuestionReportSaga({ payload }) {
  try {
    const { code, data } = yield loadDetailQuestionReportAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_DETAIL_QUESTION_REPORT),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_DETAIL_QUESTION_REPORT),
      error
    })
  }
}

export function* loadDetailLessonImageSaga({ payload }) {
  try {
    const { code, data } = yield getUnitLessonImage(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_DETAIL_LESSON_IMAGE),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_DETAIL_LESSON_IMAGE),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(REGISTER_TEST), registerTestSaga)
  yield takeLatest(REQUEST(DELETE_ERROR_REGISTER), deleteErrorRegisterSaga)
  yield takeLatest(REQUEST(GET_DETAIL_TEST), getDetailTestSaga)
  yield takeLatest(REQUEST(DELETE_LIST_UNIT_LESSON), deleteListUnitLessonSaga)
  yield takeLatest(REQUEST(LOAD_LIST_UNIT_LESSON), loadListUnitLessonSaga)
  yield takeLatest(
    REQUEST(LOAD_LIST_ORDER_UNIT_LESSON),
    loadListOrderUnitLesson
  )
  yield takeLatest(
    REQUEST(UPDATE_ORDER_UNIT_LESSON),
    updateOrderUnitLessonSaga
  )
  yield takeLatest(REQUEST(CREATE_UNIT_LESSON), createUnitLessonSaga)

  yield takeLatest(REQUEST(CREATE_QUESTION), createQuestionSaga)
  yield takeLatest(REQUEST(GET_DETAIL_QUESTION), getDetailQuestionSaga)
  yield takeLatest(REQUEST(EDIT_QUESTION), editQuestionSaga)

  yield takeLatest(REQUEST(BASIC_INFO_SETTING), basicInfoSettingSaga)
  yield takeLatest(REQUEST(OPTION_SETTING), optionSettingTestSaga)
  yield takeLatest(REQUEST(GET_DETAIL_LESSON), getDetailLessonSaga)
  yield takeLatest(REQUEST(EDIT_UNIT_LESSON), editUnitLessonSaga)
  yield takeLatest(REQUEST(UPDATE_PASS_SCORE), updatePassScoreSaga)
  yield takeLatest(REQUEST(GET_QUESTIONS_CATEGORY), getQuestionsCategorySaga)
  yield takeLatest(REQUEST(GET_QUESTION_LIST), getQuestionListSaga)
  yield takeLatest(REQUEST(DELETE_QUESTION), deleteQuestionSaga)
  yield takeLatest(REQUEST(LOAD_ORDER_QUESTION), loadOrderQuestionSaga)
  yield takeLatest(REQUEST(UPDATE_SORT_QUESTION), updateSortQuestionSaga)
  yield takeLatest(REQUEST(REGISTER_REPORT), registerReportSaga)
  yield takeLatest(REQUEST(LOAD_REPORT_DETAIL), loadReportDetailSaga)
  yield takeLatest(REQUEST(CREATE_UNIT_SURVEY), createUnitSurveySaga)
  yield takeLatest(REQUEST(GET_UNIT_SURVEY), getUnitSurveySaga)
  yield takeLatest(REQUEST(UPDATE_UNIT_SURVEY), updateUnitSurveySaga)
  yield takeLatest(REQUEST(LOAD_LIST_UNIT_SURVEY_QUESTION), getUnitSurveyQuestionsSaga)
  yield takeLatest(REQUEST(DELETE_LIST_UNIT_SURVEY_QUESTION), deleteUnitSurveyQuestionsSaga)
  yield takeLatest(REQUEST(CREATE_UNIT_SURVEY_QUESTION), createUnitSurveyQuestionSaga)
  yield takeLatest(REQUEST(GET_UNIT_SURVEY_QUESTION), getUnitSurveyQuestionSaga)
  yield takeLatest(REQUEST(UPDATE_UNIT_SURVEY_QUESTION), updateUnitSurveyQuestionSaga)
  yield takeLatest(REQUEST(UPDATE_ORDER_UNIT_SURVEY_QUESTION), updateOrderUnitSurveyQuestionSaga)
  yield takeLatest(REQUEST(LOAD_QUESTION_REPORT), loadQuestionReportSaga)
  yield takeLatest(REQUEST(UPDATE_BASIC_SETTING_REPORT), updateBasicReportSaga)
  yield takeLatest(REQUEST(SETTING_QUESTION_REPORT), settingQuestionReportSaga)
  yield takeLatest(REQUEST(DELETE_QUESTION_REPORT), deleteQuestionReportSaga)
  yield takeLatest(REQUEST(CREATE_QUESTION_REPORT), createQuestionReportSaga)
  yield takeLatest(REQUEST(EDIT_QUESTION_REPORT), editQuestionReportSaga)
  yield takeLatest(REQUEST(LOAD_DETAIL_QUESTION_REPORT), loadDetailQuestionReportSaga)
  yield takeLatest(REQUEST(SORT_QUESTION_REPORT), sortQuestionReportSaga)
  yield takeLatest(REQUEST(CREATE_UNIT_LESSON_IMAGE), createUnitLessonImageSaga)
  yield takeLatest(REQUEST(GET_DETAIL_LESSON_IMAGE), loadDetailLessonImageSaga)
}
