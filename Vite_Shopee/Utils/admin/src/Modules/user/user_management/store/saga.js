import {
  put, takeLatest
} from 'redux-saga/effects'
import { notification } from 'antd'
import i18next from 'I18n'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  getUsers,
  getUser,
  createUser,
  createNissokenUser,
  deleteUsers,
  assignRemoveGroup,
  assignRemoveAttribute,
  updateLoginStatus,
  getUserLearnStatus,
  getUserTestResults,
  getUserLearnHistories,
  batchRegisterUser,
  downloadCSVTemplate,
  getImportUserResults,
  updateUser,
  updateUserWorkspace,
  getCompanies,
  checkEmailExist
} from 'APIs'

import RoutesName from 'Routes/constant'
import { getResultWithPaging } from 'Utils'
import {
  LOAD_USERS,
  LOAD_USER,
  CREATE_USER,
  DELETE_USERS,
  ASSIGN_REMOVE_GROUP,
  ASSIGN_REMOVE_ATTRIBUTE,
  UPDATE_LOGIN_STATUS,
  LOAD_USER_LEARN_STATUS,
  LOAD_USER_TEST_RESULT,
  LOAD_USER_LEARN_HISTORY,
  BATCH_REGISTER_USER,
  DOWNLOAD_CSV_TEMPLATE,
  LOAD_IMPORT_USER_RESULT,
  UPDATE_USER,
  LOAD_ALL_COMPANY,
  CREATE_NISSOKEN_USER,
  CHECK_EXIST_EMAIL
} from './constants'

export function* checkExistUsersSaga({ payload }) {
  try {
    const { data } = yield checkEmailExist(payload)
    if (data) {
      const { name, kana } = data
      yield put({
        type: SUCCESS(CHECK_EXIST_EMAIL),
        userExist: {
          name,
          kana,
          isExist: true
        }
      })
    } else {
      yield put({
        type: SUCCESS(CHECK_EXIST_EMAIL),
        userExist: {
          name: '',
          kana: '',
          isExist: false
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(CHECK_EXIST_EMAIL),
      error
    })
  }
}

export function* loadUsersSaga({ payload }) {
  try {
    const { data } = yield getResultWithPaging({ action: getUsers, payload })
    const { result: users, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_USERS),
      payload: {
        users,
        pagination,
        sort: payload?.params?.filter || {},
        filter: payload?.params?.filter || {}
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_USERS),
      error
    })
  }
}

export function* loadCompaniesSaga({ payload }) {
  try {
    const { data: companies } = yield getCompanies(payload)
    yield put({
      type: SUCCESS(LOAD_ALL_COMPANY),
      companies
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ALL_COMPANY),
      error
    })
  }
}

export function* loadUserSaga({ payload }) {
  try {
    const { data: user } = yield getUser(payload)
    yield put({
      type: SUCCESS(LOAD_USER),
      payload: { user }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_USER),
      error
    })
  }
}

export function* createUserSaga({ payload }) {
  const { setIsShowModal, history, ...newPayload } = payload
  try {
    const { code } = yield createUser(newPayload)
    if (code === 200) {
      yield put({
        type: SUCCESS(CREATE_USER)
      })
      yield history.push('/user-management/user')
    }
  } catch (error) {
    if (error?.error === 'ERROR_NUMBER_USER_OVER_PLAN_PACKAGE') {
      setIsShowModal(true)
    }
    yield put({
      type: FAILURE(CREATE_USER),
      error
    })
  }
}

export function* createNissokenUserSaga({ payload }) {
  const { data, history } = payload
  try {
    const { code } = yield createNissokenUser(data)
    if (code === 200) {
      yield put({
        type: SUCCESS(CREATE_NISSOKEN_USER)
      })
      yield history.push('/user-management/user')
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_NISSOKEN_USER),
      error
    })
  }
}

export function* updateUserSaga({ payload }) {
  const { data, history, isWorkspaceAdmin } = payload
  try {
    const { code } = isWorkspaceAdmin ? yield updateUserWorkspace(data) : yield updateUser(data)
    if (code === 200) {
      yield put({
        type: SUCCESS(UPDATE_USER)
      })
      yield history.push('/user-management/user')
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_USER),
      error
    })
  }
}

export function* deleteUsersSaga({ payload }) {
  const { callback, pagination, sort, filter, indexOfAdmin, history } = payload
  try {
    const { code } = yield deleteUsers(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_USERS)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      callback.done()
      if (indexOfAdmin !== -1) {
        history.push(RoutesName.LOGOUT)
      }
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_USERS),
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

export function* assignRemoveGroupSaga({ payload }) {
  const { params, data, history } = payload
  try {
    const { code } = yield assignRemoveGroup({ data, params })
    if (code === 200) {
      yield put({
        type: SUCCESS(ASSIGN_REMOVE_GROUP)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield history.push('/user-management/user')
    }
  } catch (error) {
    yield put({
      type: FAILURE(ASSIGN_REMOVE_GROUP),
      error
    })
  }
}

export function* assignRemoveAttributeSaga({ payload }) {
  const { data, params, history } = payload
  try {
    const { code } = yield assignRemoveAttribute({ data, params })
    if (code === 200) {
      yield put({
        type: SUCCESS(ASSIGN_REMOVE_ATTRIBUTE)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield history.push('/user-management/user')
    }
  } catch (error) {
    yield put({
      type: FAILURE(ASSIGN_REMOVE_ATTRIBUTE),
      error
    })
  }
}

export function* updateLoginStatusSaga({ payload }) {
  const { data, params, history } = payload
  try {
    const { code } = yield updateLoginStatus({ data, params })
    if (code === 200) {
      yield put({
        type: SUCCESS(UPDATE_LOGIN_STATUS)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield history.push('/user-management/user')
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_LOGIN_STATUS),
      error
    })
  }
}

export function* loadUserLearnStatusSaga({ payload }) {
  try {
    const { code, data } = yield getUserLearnStatus(payload)
    const { result: userLearnStatus, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_USER_LEARN_STATUS),
        userLearnStatus,
        pagination,
        filter: payload?.params?.filter
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_USER_LEARN_STATUS),
      error
    })
  }
}

export function* loadUserTestResultSaga({ payload }) {
  try {
    const { code, data } = yield getUserTestResults(payload)
    const { result: userTestResult, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_USER_TEST_RESULT),
        userTestResult,
        pagination,
        filter: payload?.params?.filter
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_USER_TEST_RESULT),
      error
    })
  }
}

export function* loadUserLearnHistoriesSaga({ payload }) {
  try {
    const { code, data } = yield getUserLearnHistories(payload)
    const { result: userLearnHistory, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_USER_LEARN_HISTORY),
        userLearnHistory,
        pagination,
        filter: payload?.params?.filter
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_USER_LEARN_HISTORY),
      error
    })
  }
}

export function* batchRegisterUserSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield batchRegisterUser(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(BATCH_REGISTER_USER)
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(BATCH_REGISTER_USER),
      error
    })
    callback.fail(error)
  }
}

export function* downloadCSVTemplateSaga({ payload }) {
  try {
    yield downloadCSVTemplate(payload)
    yield put({
      type: SUCCESS(DOWNLOAD_CSV_TEMPLATE)
    })
  } catch (error) {
    yield put({
      type: FAILURE(DOWNLOAD_CSV_TEMPLATE),
      error
    })
  }
}

export function* loadImportUserResultSaga({ payload }) {
  const { callback } = payload
  try {
    const { code, data: importUserResult } = yield getImportUserResults(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_IMPORT_USER_RESULT),
        importUserResult
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_IMPORT_USER_RESULT),
      error
    })
    callback.fail(error)
  }
}

export default function* userManagementSaga() {
  yield takeLatest(REQUEST(LOAD_USERS), loadUsersSaga)
  yield takeLatest(REQUEST(CREATE_USER), createUserSaga)
  yield takeLatest(REQUEST(UPDATE_USER), updateUserSaga)
  yield takeLatest(REQUEST(LOAD_USER), loadUserSaga)
  yield takeLatest(REQUEST(DELETE_USERS), deleteUsersSaga)
  yield takeLatest(REQUEST(ASSIGN_REMOVE_GROUP), assignRemoveGroupSaga)
  yield takeLatest(REQUEST(ASSIGN_REMOVE_ATTRIBUTE), assignRemoveAttributeSaga)
  yield takeLatest(REQUEST(UPDATE_LOGIN_STATUS), updateLoginStatusSaga)
  yield takeLatest(REQUEST(LOAD_USER_LEARN_STATUS), loadUserLearnStatusSaga)
  yield takeLatest(REQUEST(LOAD_USER_TEST_RESULT), loadUserTestResultSaga)
  yield takeLatest(REQUEST(LOAD_USER_LEARN_HISTORY), loadUserLearnHistoriesSaga)

  yield takeLatest(REQUEST(BATCH_REGISTER_USER), batchRegisterUserSaga)
  yield takeLatest(REQUEST(DOWNLOAD_CSV_TEMPLATE), downloadCSVTemplateSaga)
  yield takeLatest(REQUEST(LOAD_IMPORT_USER_RESULT), loadImportUserResultSaga)
  yield takeLatest(REQUEST(LOAD_ALL_COMPANY), loadCompaniesSaga)
  yield takeLatest(REQUEST(CREATE_NISSOKEN_USER), createNissokenUserSaga)
  yield takeLatest(REQUEST(CHECK_EXIST_EMAIL), checkExistUsersSaga)
}
