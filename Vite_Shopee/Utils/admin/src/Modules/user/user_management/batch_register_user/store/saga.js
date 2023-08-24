/* eslint-disable no-plusplus */
import {
  put, takeLatest
} from 'redux-saga/effects'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  registerByCsv
} from 'APIs'

import {
  REGISTER_BY_CSV
} from './constants'

export function* registerByCsvSaga({ payload = [] }) {
  yield put({
    type: `RESET_DATA_${REGISTER_BY_CSV}`
  })
  try {
    const maxChunk = yield Math.floor(payload.length / 20)
    for (let i = 0; i <= maxChunk; i++) {
      const payloadchunk = yield payload.slice((i * 20), i === maxChunk ? payload.length : (i * 20) + 20)
      const data = yield registerByCsv(payloadchunk)
      yield put({
        type: SUCCESS(REGISTER_BY_CSV),
        userList: data
      })
    }
    yield put({
      type: `ENDING_${REGISTER_BY_CSV}`
    })
  } catch (error) {
    yield put({
      type: FAILURE(REGISTER_BY_CSV),
      error
    })
  }
}

export default function* userRegisterByCsvSaga() {
  yield takeLatest(REQUEST(REGISTER_BY_CSV), registerByCsvSaga)
}
