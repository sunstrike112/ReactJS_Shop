/* eslint-disable no-unused-vars */
import { put, takeLatest } from 'redux-saga/effects'
import { RoutesName } from 'Modules/course/routes'
import { notification } from 'antd'
import i18next from 'I18n'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  loadDetailPublishReportAPI,
  loadReportsAPI,
  updateDetailPublishReportAPI
} from 'APIs'

import {
  LOAD_DETAIL_PUBLISH_REPORT,
  LOAD_REPORTS,
  UPDATE_DETAIL_PUBLISH_REPORT
} from './constants'

export function* loadReportsSaga({ payload }) {
  try {
    const { code, data } = yield loadReportsAPI(payload)
    const { result: reports, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_REPORTS),
        payload: {
          reports,
          pagination,
          filter: payload?.params?.filter
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_REPORTS),
      error
    })
  }
}

export function* loadDetailPublishReportsSaga({ payload }) {
  try {
    const { code, data } = yield loadDetailPublishReportAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_DETAIL_PUBLISH_REPORT),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_DETAIL_PUBLISH_REPORT),
      error
    })
  }
}

export function* updateDetailPublishReportsSaga({ payload }) {
  try {
    const { code } = yield updateDetailPublishReportAPI(payload)
    const { history, reportId } = payload
    if (code === 200) {
      if (history.location.state.from.includes('report-detail')) {
        history.push(`${RoutesName.REPORT_DETAIL}/${reportId}`)
      } else {
        history.push(RoutesName.REPORT_PUBLISHING)
      }
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(UPDATE_DETAIL_PUBLISH_REPORT)
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_DETAIL_PUBLISH_REPORT),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(LOAD_REPORTS), loadReportsSaga)
  yield takeLatest(REQUEST(LOAD_DETAIL_PUBLISH_REPORT), loadDetailPublishReportsSaga)
  yield takeLatest(REQUEST(UPDATE_DETAIL_PUBLISH_REPORT), updateDetailPublishReportsSaga)
}
