import { notification } from 'antd'
import {
  createIssuePermission, deleteIssuePermission, getListIssuePermission, getListUpdateIssuePermission, updateIssuePermission
} from 'APIs'
import i18next from 'I18n'
import { RoutesName } from 'Modules/course/routes'
import {
  put, takeLatest, select
} from 'redux-saga/effects'
import { FAILURE, REQUEST, SUCCESS } from 'Stores'
import {
  CREATE_ISSUE_PERMISSION,
  DELETE_ISSUE_PERMISSION,
  EDIT_ISSUE_PERMISSION,
  LOAD_ISSUE_PERMISSION,
  LOAD_LIST_ISSUE_PERMISSION,

  LOAD_LIST_CATEGORY,
  LOAD_LIST_USER,
  LOAD_LIST_USER_SELECTED,
  LOAD_LIST_ATTRIBUTE,
  LOAD_LIST_GROUP,
  LOAD_LIST_COURSE,
  LOAD_LIST_UPDATE_ISSUE_PERMISSION
} from '../constants'
import { makeSelectIssuePermission } from '../selectors'
import {
  loadListAttributeSaga,
  loadListCategorySaga,
  loadListCourseSaga,
  loadListGroupSaga,
  loadListUserSaga,
  loadListUserSelectedSaga
} from './select'

i18next.loadNamespaces(['common'])

export function* loadListIssuePermissionSaga({ payload }) {
  try {
    const { data } = yield getListIssuePermission({
      limit: payload.params.limit,
      page: payload.params.page,
      ...payload.params.filter
    })
    const payloadSuccess = {
      filter: payload.params?.filter || {}
    }
    if (data) {
      const { result: listIssuePermission, ...pagination } = data
      payloadSuccess.data = listIssuePermission
      payloadSuccess.pagination = pagination
    } else {
      payloadSuccess.data = []
      payloadSuccess.pagination = {
        limit: 100,
        page: 1,
        total: 0
      }
    }
    yield put({
      type: SUCCESS(LOAD_LIST_ISSUE_PERMISSION),
      payload: payloadSuccess
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_LIST_ISSUE_PERMISSION),
      error
    })
  }
}

export function* createIssuePermissionSaga({ payload }) {
  const { data, history, langCode, isWebviewMode, callback } = payload
  try {
    const { code } = yield createIssuePermission({ data, langCode })
    if (code === 200) {
      yield put({
        type: SUCCESS(CREATE_ISSUE_PERMISSION)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
      if (isWebviewMode) {
        callback.done()
      } else {
        yield history.push(RoutesName.ISSUE_STATUS_PERMISSION)
      }
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_ISSUE_PERMISSION),
      error
    })
  }
}

export function* editIssuePermissionSaga({ payload }) {
  const { data, history } = payload
  try {
    const { code } = yield updateIssuePermission(data)
    if (code === 200) {
      yield put({
        type: SUCCESS(EDIT_ISSUE_PERMISSION)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield history.push(RoutesName.ISSUE_STATUS_PERMISSION)
    }
  } catch (error) {
    yield put({
      type: FAILURE(EDIT_ISSUE_PERMISSION),
      error
    })
  }
}

export function* loadIssuePermissionSaga({ payload }) {
  try {
    const { data } = yield getListIssuePermission(payload.params)
    yield put({
      type: SUCCESS(LOAD_ISSUE_PERMISSION),
      payload: {
        data
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ISSUE_PERMISSION),
      error
    })
  }
}

export function* deleteIssuePermissionSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield deleteIssuePermission(payload)
    const { list: { pagination, filter } } = yield select(makeSelectIssuePermission())
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_ISSUE_PERMISSION)
      })
      yield put({
        type: REQUEST(LOAD_LIST_ISSUE_PERMISSION),
        payload: {
          params: {
            ...pagination,
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
      type: FAILURE(DELETE_ISSUE_PERMISSION),
      error
    })
  }
}

export function* loadListUpdateIssuePermissionSaga({ payload }) {
  try {
    const { data } = yield getListUpdateIssuePermission(payload.params)
    const { result: listUpdateIssuePermission, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_LIST_UPDATE_ISSUE_PERMISSION),
      payload: {
        data: listUpdateIssuePermission,
        pagination,
        filter: payload.params
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_LIST_UPDATE_ISSUE_PERMISSION),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(LOAD_LIST_UPDATE_ISSUE_PERMISSION), loadListUpdateIssuePermissionSaga)

  yield takeLatest(REQUEST(LOAD_LIST_ISSUE_PERMISSION), loadListIssuePermissionSaga)
  yield takeLatest(REQUEST(CREATE_ISSUE_PERMISSION), createIssuePermissionSaga)
  yield takeLatest(REQUEST(LOAD_ISSUE_PERMISSION), loadIssuePermissionSaga)
  yield takeLatest(REQUEST(EDIT_ISSUE_PERMISSION), editIssuePermissionSaga)
  yield takeLatest(REQUEST(DELETE_ISSUE_PERMISSION), deleteIssuePermissionSaga)

  yield takeLatest(REQUEST(LOAD_LIST_ATTRIBUTE), loadListAttributeSaga)
  yield takeLatest(REQUEST(LOAD_LIST_GROUP), loadListGroupSaga)

  yield takeLatest(REQUEST(LOAD_LIST_CATEGORY), loadListCategorySaga)
  yield takeLatest(REQUEST(LOAD_LIST_USER), loadListUserSaga)
  yield takeLatest(REQUEST(LOAD_LIST_USER_SELECTED), loadListUserSelectedSaga)
  yield takeLatest(REQUEST(LOAD_LIST_COURSE), loadListCourseSaga)
}
