import {
  put, takeLatest
} from 'redux-saga/effects'
import { notification } from 'antd'
import { omit } from 'lodash'
import i18next from 'I18n'
import { createNotifi, getFindUser, deleteNotifi, getListUserFind, getNotifi, editNotifi, getListSendHistory, deleteHistory, getEmailDetail } from 'APIs'
import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import { RoutesName } from 'Modules/notification/routes'
import { getResultWithPaging } from 'Utils'
import { CREATE_NOTIFI, LOAD_FIND_USER, LOAD_ORDER_NOTIFI, DELETE_NOTIFI, LOAD_LIST_USER, GET_NOTIFI, EDIT_NOTIFI, LOAD_SEND_HISTORY, DELETE_HISTORY, GET_EMAIL_DETAIL } from './constants'

export function* createNotifiSaga({ payload }) {
  const { data, history } = payload
  try {
    const { code } = yield createNotifi({ data })
    if (code === 200) {
      yield put({
        type: SUCCESS(CREATE_NOTIFI)
      })
      yield put({
        type: REQUEST(LOAD_ORDER_NOTIFI)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
      yield history.push(RoutesName.NOTIFY_MANAGEMENT)
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_NOTIFI),
      error
    })
  }
}

export function* loadFindUserSaga({ payload }) {
  try {
    const { data } = yield getResultWithPaging({ action: getFindUser, payload })
    const { result: findUser, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_FIND_USER),
      payload: {
        findUser,
        pagination,
        filter: payload?.params?.filter
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_FIND_USER),
      error
    })
  }
}

export function* loadSendHistorySaga({ payload }) {
  try {
    const { data } = yield getResultWithPaging({ action: getListSendHistory, payload })
    const { result: listSendHistory, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_SEND_HISTORY),
      payload: {
        listSendHistory,
        pagination,
        filter: payload?.params?.filter
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_SEND_HISTORY),
      error
    })
  }
}

export function* deleteHistorySaga({ payload }) {
  const { callback, filter, pagination: { page, limit } } = payload
  try {
    const { code } = yield deleteHistory(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_HISTORY)
      })
      yield put({
        type: REQUEST(LOAD_SEND_HISTORY),
        payload: {
          params: {
            page,
            limit,
            filter
          }
        }
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_HISTORY),
      error
    })
  }
}

export function* loadEmailDetailSaga({ payload }) {
  try {
    const { data: emailDetail } = yield getResultWithPaging({ action: getEmailDetail, payload, condition: (res) => res.pageInfoUserEmailSendHistories.result.length })
    yield put({
      type: SUCCESS(GET_EMAIL_DETAIL),
      payload: { emailDetail, pagination: emailDetail.pageInfoUserEmailSendHistories || {}, filter: payload?.params?.filter }
    })
  } catch (error) {
    yield put({
      type: FAILURE(GET_EMAIL_DETAIL),
      error
    })
  }
}

export function* deleteNotifiSaga({ payload }) {
  const dataDelete = omit(payload, ['isSuperAdmin', 'isAdmin', 'pagination'])
  const { callback, filter, isSuperAdmin, isAdmin, pagination: { page, limit } } = payload
  try {
    const { code } = yield deleteNotifi(dataDelete)
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_NOTIFI)
      })
      if (isSuperAdmin || isAdmin) {
        yield put({
          type: REQUEST(LOAD_FIND_USER),
          payload: {
            params: {
              page,
              limit,
              filter
            }
          }
        })
      } else {
        yield put({
          type: REQUEST(LOAD_FIND_USER),
          payload: {
            params: {
              page,
              limit,
              filter
            }
          }
        })
      }
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_NOTIFI),
      error
    })
  }
}

export function* loadListUserSaga({ payload }) {
  const { loadAll } = payload
  try {
    const { data } = yield getResultWithPaging({ action: getListUserFind, payload, condition: (res) => res.lstUser.result.length })
    let listDataUserAll = []
    if (loadAll) {
      delete payload.params.limit
      delete payload.params.page
      const { data: dataAll } = yield getListUserFind(payload)
      listDataUserAll = dataAll.lstUser.result
    }
    const { result: listDataUser, ...pagination } = data.lstUser
    yield put({
      type: SUCCESS(LOAD_LIST_USER),
      payload: {
        listDataUser,
        listDataUserAll,
        pagination,
        filter: payload?.params
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_LIST_USER),
      error
    })
  }
}

export function* loadNotifiSaga({ payload }) {
  try {
    const { data: notifi } = yield getResultWithPaging({ action: getNotifi, payload, condition: (res) => res?.userList?.result?.length })
    yield put({
      type: SUCCESS(GET_NOTIFI),
      payload: { notifi, pagination: notifi.userList || {}, filter: payload?.params?.filter }
    })
  } catch (error) {
    yield put({
      type: FAILURE(GET_NOTIFI),
      error
    })
  }
}

export function* editNotifiSaga({ payload }) {
  const { data, history } = payload
  try {
    const { code } = yield editNotifi({ data })
    if (code === 200) {
      yield put({
        type: SUCCESS(EDIT_NOTIFI)
      })
      yield put({
        type: REQUEST(LOAD_ORDER_NOTIFI)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield history.push(RoutesName.NOTIFY_MANAGEMENT)
    }
  } catch (error) {
    yield put({
      type: FAILURE(EDIT_NOTIFI),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(CREATE_NOTIFI), createNotifiSaga)
  yield takeLatest(REQUEST(LOAD_FIND_USER), loadFindUserSaga)
  yield takeLatest(REQUEST(LOAD_SEND_HISTORY), loadSendHistorySaga)
  yield takeLatest(REQUEST(DELETE_HISTORY), deleteHistorySaga)
  yield takeLatest(REQUEST(DELETE_NOTIFI), deleteNotifiSaga)
  yield takeLatest(REQUEST(LOAD_LIST_USER), loadListUserSaga)
  yield takeLatest(REQUEST(GET_NOTIFI), loadNotifiSaga)
  yield takeLatest(REQUEST(GET_EMAIL_DETAIL), loadEmailDetailSaga)
  yield takeLatest(REQUEST(EDIT_NOTIFI), editNotifiSaga)
}
