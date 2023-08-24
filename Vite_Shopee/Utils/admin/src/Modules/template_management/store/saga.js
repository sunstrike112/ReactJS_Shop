import { put, takeLatest } from 'redux-saga/effects'

import {
  getListTemplateAPI,
  getTemplateDetailAPI
} from 'APIs'
import { FAILURE, REQUEST, SUCCESS } from 'Stores'
import {
  GET_LIST_TEMPLATE,
  GET_TEMPLATE_DETAIL
} from './constants'

export function* getListTemplateSaga({ payload }) {
  try {
    const { code, data } = yield getListTemplateAPI(payload)
    const { result, page, pages, total, limit } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_LIST_TEMPLATE),
        payload: {
          result,
          pagination: { page, pages, total, limit },
          filter: payload
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_LIST_TEMPLATE),
      error
    })
  }
}

export function* getTemplateDetailSaga({ payload }) {
  try {
    const { code, data } = yield getTemplateDetailAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_TEMPLATE_DETAIL),
        payload: data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_TEMPLATE_DETAIL),
      error
    })
  }
}

export default function* workspaceSaga() {
  yield takeLatest(REQUEST(GET_LIST_TEMPLATE), getListTemplateSaga)
  yield takeLatest(REQUEST(GET_TEMPLATE_DETAIL), getTemplateDetailSaga)
}
