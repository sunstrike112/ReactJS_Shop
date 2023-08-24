/* eslint-disable no-plusplus */
import {
  put, takeLatest
} from 'redux-saga/effects'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  deleteByCsv
} from 'APIs'

import {
  DELETE_BY_CSV
} from './constants'

export function* deleteByCsvSaga({ payload = [] }) {
  yield put({
    type: `RESET_DATA_${DELETE_BY_CSV}`
  })
  try {
    const maxChunk = yield Math.floor(payload.length / 20)
    for (let i = 0; i <= maxChunk; i++) {
      const payloadchunk = yield payload.slice((i * 20), i === maxChunk ? payload.length : (i * 20) + 20)
      const data = yield deleteByCsv(payloadchunk)
      yield put({
        type: SUCCESS(DELETE_BY_CSV),
        userList: data
      })
    }
    yield put({
      type: `ENDING_${DELETE_BY_CSV}`
    })
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_BY_CSV),
      error
    })
  }
}

export default function* userDeleteByCsvSaga() {
  yield takeLatest(REQUEST(DELETE_BY_CSV), deleteByCsvSaga)
}
