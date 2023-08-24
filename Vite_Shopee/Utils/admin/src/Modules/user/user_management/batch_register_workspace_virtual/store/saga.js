/* eslint-disable no-plusplus */
import { put, takeLatest } from 'redux-saga/effects'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import { registerWorkspaceCsvWsAPI } from 'APIs'

import {
  REGISTER_WORKSPACE_BY_CSV
} from './constants'

export function* registerWorkspaceByCsvSaga({ payload }) {
  const { dataTransform } = payload
  yield put({
    type: `RESET_DATA_${REGISTER_WORKSPACE_BY_CSV}`
  })
  try {
    const maxChunk = yield Math.floor(dataTransform.length / 20)
    for (let i = 0; i <= maxChunk; i++) {
      const payloadchunk = yield dataTransform.slice((i * 20), i === maxChunk ? dataTransform.length : (i * 20) + 20)
      const data = yield registerWorkspaceCsvWsAPI(payloadchunk)
      yield put({
        type: SUCCESS(REGISTER_WORKSPACE_BY_CSV),
        userList: data
      })
    }
    yield put({
      type: `ENDING_${REGISTER_WORKSPACE_BY_CSV}`
    })
  } catch (error) {
    yield put({
      type: FAILURE(REGISTER_WORKSPACE_BY_CSV),
      error
    })
  }
}

export default function* userRegisterWorkspaceByCsvSaga() {
  yield takeLatest(REQUEST(REGISTER_WORKSPACE_BY_CSV), registerWorkspaceByCsvSaga)
}
