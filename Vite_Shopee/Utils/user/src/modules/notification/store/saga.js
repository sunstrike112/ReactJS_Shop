import { notification } from 'antd'
import i18next from 'i18next'
import { put, takeEvery, takeLatest } from 'redux-saga/effects'
import { getListNotification, getNotificationDetail, getNotificationUnread } from '../../../apis'
import { deleteNotification } from '../../../apis/notification.api'
import { DEFAULT_PAG } from '../../../constants'
import {
  repoLoadingError,
  loadNotificationsSuccess,
  loadNotificationDetailSuccess,
  loadNoticesSuccess,
  loadNotificationUnreadSuccess,
  loadNotificationUnreadFailure
} from './actions'

import { LOAD_NOTIFICATION_LIST, LOAD_NOTIFICATION_DETAIL, LOAD_NOTIFICATION_UNREAD, DELETE_NOTIFICATION } from './constants'

export function* loadNotificationsSaga({ payload, isNotice }) {
  try {
    const { data } = yield getListNotification(payload)
    if (isNotice) {
      yield put(loadNoticesSuccess(data?.result))
    } else {
      yield put(loadNotificationsSuccess(data))
    }
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadNotificationUnread({ payload }) {
  try {
    const { data } = yield getNotificationUnread(payload)
    yield put(loadNotificationUnreadSuccess(data))
  } catch (error) {
    yield put(loadNotificationUnreadFailure(error))
  }
}

export function* loadNotificationDetailSaga({ payload }) {
  try {
    const { data } = yield getNotificationDetail(payload)
    yield put(loadNotificationDetailSuccess(data))
    // Load notification unread again after read notification
    yield loadNotificationUnread({ loginId: payload.loginId })
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* deleteNotifications({ payload }) {
  const { callback, ids, loginId, searchText, page } = payload
  const { code } = yield deleteNotification(ids)
  if (code === 200) {
    notification.success({
      message: i18next.t('common.message.delete_success'),
      duration: 2
    })
    const { data } = yield getListNotification({ loginId, page, limit: DEFAULT_PAG.limit, searchText })

    if (data.result.length === 0 && data.page > 1) {
      const { data: dataBack } = yield getListNotification({ loginId, page: page - 1, limit: DEFAULT_PAG.limit, searchText })
      yield put(loadNotificationsSuccess(dataBack))
    } else {
      yield put(loadNotificationsSuccess(data))
    }
    callback.done()
  }
}

export default function* NotificationSaga() {
  yield takeLatest(LOAD_NOTIFICATION_LIST, loadNotificationsSaga)
  yield takeEvery(LOAD_NOTIFICATION_DETAIL, loadNotificationDetailSaga)
  yield takeEvery(LOAD_NOTIFICATION_UNREAD, loadNotificationUnread)
  yield takeEvery(DELETE_NOTIFICATION, deleteNotifications)
}
