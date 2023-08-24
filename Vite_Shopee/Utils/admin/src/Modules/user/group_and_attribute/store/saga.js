import {
  put, takeLatest
} from 'redux-saga/effects'
import { notification } from 'antd'
import i18next from 'I18n'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroups,
  getAttributes,
  getAttribute,
  createAttribute,
  updateAttribute,
  deleteAttributes
} from 'APIs'
import { normailizeGroupTree } from 'Utils'
import {
  LOAD_GROUPS,
  LOAD_GROUP,
  CREATE_GROUP,
  UPDATE_GROUP,
  DELETE_GROUPS,
  LOAD_ATTRIBUTES,
  LOAD_ATTRIBUTE,
  CREATE_ATTRIBUTE,
  UPDATE_ATTRIBUTE,
  DELETE_ATTRIBUTES,
  SAVE_FILTER
} from './constants'

export function* loadGroupsSaga({ payload }) {
  try {
    const { data: groups } = yield getGroups(payload)
    const groupsTree = normailizeGroupTree(groups)
    yield put({
      type: SUCCESS(LOAD_GROUPS),
      payload: {
        groups,
        groupsTree,
        filter: payload?.params?.filter
      }
    })
    if (payload.resolved) {
      payload.resolved(groupsTree)
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_GROUPS),
      error
    })
  }
}

export function* loadGroupSaga({ payload }) {
  try {
    const { data } = yield getGroup(payload)
    const { data: group } = data
    yield put({
      type: SUCCESS(LOAD_GROUP),
      payload: {
        group
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_GROUP),
      error
    })
  }
}

export function* createGroupSaga({ payload }) {
  try {
    const { code } = yield createGroup(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(CREATE_GROUP)
      })
      yield put({
        type: REQUEST(LOAD_GROUPS),
        payload: { params: {} }
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_GROUP),
      error
    })
  }
}

export function* editGroupSaga({ payload }) {
  try {
    const { code } = yield updateGroup(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(UPDATE_GROUP)
      })
      yield put({
        type: REQUEST(LOAD_GROUPS),
        payload: { params: {} }
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_GROUP),
      error
    })
  }
}

export function* deleteGroupsSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield deleteGroups(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_GROUPS)
      })
      yield put({
        type: REQUEST(LOAD_GROUPS),
        payload: { params: {} }
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
      type: FAILURE(DELETE_GROUPS),
      error
    })
  }
}

export function* loadAttributesSaga({ payload }) {
  try {
    const { data } = yield getAttributes(payload)
    const filter = { searchName: payload?.params?.searchName }
    const { result: attributes, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_ATTRIBUTES),
      payload: {
        attributes,
        pagination,
        filter
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ATTRIBUTES),
      error
    })
  }
}

export function* loadAttributeSaga({ payload }) {
  try {
    const { data } = yield getAttribute(payload)
    const { data: attribute } = data
    yield put({
      type: SUCCESS(LOAD_ATTRIBUTE),
      payload: {
        attribute
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ATTRIBUTE),
      error
    })
  }
}

export function* createAttributeSaga({ payload }) {
  try {
    const { code } = yield createAttribute(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(CREATE_ATTRIBUTE)
      })
      yield put({
        type: REQUEST(LOAD_ATTRIBUTES),
        payload: {
          params: {
            page: 1,
            limit: payload?.pageSize
          }
        }
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_ATTRIBUTE),
      error
    })
  }
}

export function* editAttributeSaga({ payload }) {
  try {
    const { code } = yield updateAttribute(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(UPDATE_ATTRIBUTE)
      })
      yield put({
        type: REQUEST(LOAD_ATTRIBUTES),
        payload: {
          params: {
            page: 1,
            limit: 100
          }
        }
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_ATTRIBUTE),
      error
    })
  }
}

export function* deleteAttributesSaga({ payload }) {
  const { callback, pagination: { page, limit } } = payload
  try {
    const { code } = yield deleteAttributes(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_ATTRIBUTES)
      })
      yield put({
        type: REQUEST(LOAD_ATTRIBUTES),
        payload: {
          params: { page, limit }
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
      type: FAILURE(DELETE_ATTRIBUTES),
      error
    })
  }
}

export function* saveFilterSaga(filter) {
  try {
    yield put({
      type: SUCCESS(SAVE_FILTER),
      filter
    })
  } catch (error) {
    yield put({
      type: FAILURE(SAVE_FILTER),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(LOAD_GROUPS), loadGroupsSaga)
  yield takeLatest(REQUEST(LOAD_GROUP), loadGroupSaga)
  yield takeLatest(REQUEST(CREATE_GROUP), createGroupSaga)
  yield takeLatest(REQUEST(UPDATE_GROUP), editGroupSaga)
  yield takeLatest(REQUEST(DELETE_GROUPS), deleteGroupsSaga)

  yield takeLatest(REQUEST(LOAD_ATTRIBUTES), loadAttributesSaga)
  yield takeLatest(REQUEST(LOAD_ATTRIBUTE), loadAttributeSaga)
  yield takeLatest(REQUEST(CREATE_ATTRIBUTE), createAttributeSaga)
  yield takeLatest(REQUEST(UPDATE_ATTRIBUTE), editAttributeSaga)
  yield takeLatest(REQUEST(DELETE_ATTRIBUTES), deleteAttributesSaga)
  yield takeLatest(REQUEST(SAVE_FILTER), saveFilterSaga)
}
