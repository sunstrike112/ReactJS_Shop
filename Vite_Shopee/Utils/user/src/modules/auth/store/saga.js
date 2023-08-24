import { delay, put, takeLatest } from 'redux-saga/effects'
import {
  submitLogin,
  getEmailReset,
  verifyPassword,
  settingPassword,
  getEmailFromToken,
  loadWorkspacesAPI,
  logOut
} from '../../../apis'
import { setLocalStorage, removeLocalStorage, STORAGE, getLocalStorage } from '../../../utils'
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  getEmailResetSuccess,
  getEmailResetError,
  verifyTokenFailure,
  verifyTokenSuccess,
  settingPasswordSuccess,
  settingPasswordFailure,
  getEmailFromTokenSuccess,
  getEmailFromTokenFailure,
  loadWorkspacesSuccess,
  loadWorkspacesFailure,
  resetStateRequest
} from './actions'
import { changeFilterTalkboard } from '../../talk-board/store/actions'
import {
  GET_EMAIL_FROM_TOKEN_REQUEST,
  GET_EMAIL_RESET_REQUEST,
  LOAD_WORKSPACES_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SETTING_PASSWORD_REQUEST,
  VERIFY_TOKEN_REQUEST,
  RESET_STATE_REQUEST
} from './constants'
import AxiosClient from '../../../apis/api'

import { loadProfile, resetProfile } from '../../profile/store/actions'
import { USER_ROLE } from '../../../constants'
import { resetFilterDailyReport } from '../../dailyReport/store/actions'

export function* loginRequestSaga({ payload }) {
  try {
    const { data } = yield submitLogin(payload)

    yield setLocalStorage(STORAGE.USER_TOKEN, data.accessToken)
    yield setLocalStorage(STORAGE.META_DATA, JSON.stringify(data))

    let hasOnlyOneWorkspace
    let workspaceId
    if (![USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.APPROVAL_MANAGEMENT].includes(data.roles[0])) {
      try {
        const { code, data: workspaces } = yield loadWorkspacesAPI()
        if (code === 200) {
          yield put(loadWorkspacesSuccess(workspaces))
          hasOnlyOneWorkspace = workspaces.length === 1 && workspaces[0].isWorkspace
          workspaceId = hasOnlyOneWorkspace && workspaces[0].companyId
        }
      } catch (error) {
        yield put(loadWorkspacesFailure(error))
      }
    }

    yield put(loadProfile({ userId: data.userId, workspaceid: workspaceId }))
    yield put(loginSuccess(data))
  } catch (error) {
    yield put(loginFailure(error))
  }
}

export function* logoutRequestSaga() {
  try {
    // Have many 'LOGOUT_REQUEST' action when unauthenticated,
    // So that avoid call this saga many time
    // We must delay this saga for keep running. takeLatest effect will cancel previous task saga if it's still running
    yield delay(0)
    // ----------------

    const metaData = yield JSON.parse(getLocalStorage(STORAGE.META_DATA))
    if (metaData && metaData.userId) {
      yield logOut(metaData.userId)
    }
    yield removeLocalStorage(STORAGE.USER_TOKEN)
    yield removeLocalStorage(STORAGE.META_DATA)
    yield removeLocalStorage(STORAGE.LESSONS_VIEWED_WITHOUT_COMPLETED)
    yield put(logoutSuccess())
    yield put(resetProfile())
    yield put(resetStateRequest())

    yield (new AxiosClient()).axiosClient.defaults.headers.Authorization = null
  } catch (error) {
    throw Error(error)
  }
}

export function* resetStateSaga() {
  yield put(changeFilterTalkboard())
  yield put(resetFilterDailyReport())
}

export function* getEmailRequestSaga({ payload }) {
  try {
    const { code } = yield getEmailReset(payload)
    if (code === 200) {
      yield put(getEmailResetSuccess({ isSent: true }))
    }
    if (code === 401) {
      yield put(getEmailResetSuccess({ isSent: false }))
    }
  } catch (error) {
    yield put(getEmailResetError(error))
  }
}

export function* getVerifyTokenSaga({ payload }) {
  try {
    const dataAPI = yield verifyPassword(payload)
    const { data, code } = dataAPI
    if (code === 200) {
      yield put(verifyTokenSuccess(data))
    }
    if (code === 401) {
      yield put(verifyTokenFailure({
        type: dataAPI.message
      }))
    }
  } catch (error) {
    yield put(verifyTokenFailure(error))
  }
}

export function* settingPasswordSaga({ payload }) {
  try {
    const dataAPI = yield settingPassword(payload)
    const { data, code } = dataAPI
    if (code === 200) {
      yield put(settingPasswordSuccess(data))
    }
    if (code === 401) {
      yield put(verifyTokenFailure({
        type: dataAPI.message
      }))
    }
  } catch (error) {
    yield put(settingPasswordFailure(error))
  }
}

export function* getEmailFromTokenSaga({ payload }) {
  try {
    const { data } = yield getEmailFromToken(payload)
    yield put(getEmailFromTokenSuccess(data))
  } catch (error) {
    yield put(getEmailFromTokenFailure(error))
  }
}

export function* loadWorkspacesSaga() {
  try {
    const { data } = yield loadWorkspacesAPI()
    yield put(loadWorkspacesSuccess(data))
  } catch (error) {
    yield put(loadWorkspacesFailure(error))
  }
}

export default function* authSaga() {
  yield takeLatest(LOGOUT_REQUEST, logoutRequestSaga)
  yield takeLatest(RESET_STATE_REQUEST, resetStateSaga)
  yield takeLatest(LOGIN_REQUEST, loginRequestSaga)
  yield takeLatest(GET_EMAIL_RESET_REQUEST, getEmailRequestSaga)
  yield takeLatest(VERIFY_TOKEN_REQUEST, getVerifyTokenSaga)
  yield takeLatest(SETTING_PASSWORD_REQUEST, settingPasswordSaga)
  yield takeLatest(GET_EMAIL_FROM_TOKEN_REQUEST, getEmailFromTokenSaga)
  yield takeLatest(LOAD_WORKSPACES_REQUEST, loadWorkspacesSaga)
}
