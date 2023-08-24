/* eslint-disable no-unused-vars */
import { put, takeLatest } from 'redux-saga/effects'
import { RoutesName } from 'Modules/user/routes'
import { notification } from 'antd'
import i18next from 'I18n'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  createWorkSpaceAPI,
  editWorkSpaceAPI,
  getAdminsNissokenAPI,
  getWorkSpaceAllAPI,
  getWorkSpaceDetailAPI,
  deleteWorkSpaceAPI,
  deleteUserWorkSpaceAPI,
  addUserWorkSpaceAPI
} from 'APIs'

import { LOAD_USERS } from 'Modules/user/user_management/store/constants'
import {
  CREATE_WORKSPACE,
  DELETE_USER_WORKSPACE,
  DELETE_WORKSPACE,
  EDIT_WORKSPACE,
  GET_ADMINS_NISSOKEN,
  GET_WORKSPACE_ALL,
  GET_WORKSPACE_DETAIL,
  LOAD_WORKSPACE_DETAIL,
  ADD_USER_WORKSPACE
} from './constants'

export function* getAllWorkspaceSaga({ payload }) {
  try {
    const { code, data } = yield getWorkSpaceAllAPI(payload)
    const { result: workspaceAll, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_WORKSPACE_ALL),
        payload: {
          data,
          pagination,
          filter: payload?.params?.workSpaceName || ''
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_WORKSPACE_ALL),
      error
    })
  }
}

export function* createWorkSpaceSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield createWorkSpaceAPI(payload)
    if (code === 200) {
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(CREATE_WORKSPACE)
      })
      callback()
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_WORKSPACE),
      error
    })
  }
}

export function* editWorkSpaceSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield editWorkSpaceAPI(payload)
    if (code === 200) {
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(EDIT_WORKSPACE)
      })
      callback()
    }
  } catch (error) {
    yield put({
      type: FAILURE(EDIT_WORKSPACE),
      error
    })
  }
}

export function* getAdminsNissokenSaga({ payload }) {
  try {
    const { code, data: dataAPI } = yield getAdminsNissokenAPI(payload)
    const { result: data, ...pagination } = dataAPI
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_ADMINS_NISSOKEN),
        payload: {
          data,
          pagination,
          filter: payload?.params?.filter
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_ADMINS_NISSOKEN),
      error
    })
  }
}

export function* getWorkSpaceDetailSaga({ payload }) {
  try {
    const { code, data } = yield getWorkSpaceDetailAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_WORKSPACE_DETAIL),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_WORKSPACE_DETAIL),
      error
    })
  }
}

export function* deleteWorkSpaceSaga({ payload }) {
  const { callback, pagination: { page, limit } } = payload
  try {
    const { code } = yield deleteWorkSpaceAPI(payload)
    if (code === 200) {
      yield put({
        type: REQUEST(GET_WORKSPACE_ALL),
        payload: {
          params: { ...payload.params, page, limit }
        }
      })
      yield put({ type: SUCCESS(DELETE_WORKSPACE) })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_WORKSPACE),
      error
    })
  }
}

export function* deleteUserWorkSpaceSaga({ payload }) {
  const { callback, pagination, sort, filter } = payload
  try {
    const { code } = yield deleteUserWorkSpaceAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_USER_WORKSPACE)
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
      type: FAILURE(DELETE_USER_WORKSPACE),
      error
    })
  }

  // Maybe: half done, half errors on seraku ==> alway fetch again
  yield put({
    type: REQUEST(LOAD_USERS),
    payload: {
      params: {
        page: pagination.page,
        limit: pagination.limit,
        sort,
        filter
      }
    }
  })
}

export function* addUserWorkSpaceSaga({ payload }) {
  try {
    const { history, data } = payload
    const { code } = yield addUserWorkSpaceAPI({ data })
    if (code === 200) {
      yield put({
        type: SUCCESS(ADD_USER_WORKSPACE)
      })
      history.push(RoutesName.USER_MANAGEMENT)
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(ADD_USER_WORKSPACE),
      error
    })
  }
}

export default function* workspaceSaga() {
  yield takeLatest(REQUEST(GET_WORKSPACE_ALL), getAllWorkspaceSaga)
  yield takeLatest(REQUEST(CREATE_WORKSPACE), createWorkSpaceSaga)
  yield takeLatest(REQUEST(EDIT_WORKSPACE), editWorkSpaceSaga)
  yield takeLatest(REQUEST(GET_ADMINS_NISSOKEN), getAdminsNissokenSaga)
  yield takeLatest(REQUEST(GET_WORKSPACE_DETAIL), getWorkSpaceDetailSaga)
  yield takeLatest(REQUEST(DELETE_WORKSPACE), deleteWorkSpaceSaga)
  yield takeLatest(REQUEST(DELETE_USER_WORKSPACE), deleteUserWorkSpaceSaga)
  yield takeLatest(REQUEST(ADD_USER_WORKSPACE), addUserWorkSpaceSaga)
}
