import { put, takeLatest } from 'redux-saga/effects'
import { stringify } from 'qs'

import { push } from 'connected-react-router'
import { notification } from 'antd'
import i18next from 'i18next'
import {
  getUserProfile,
  uploadFile,
  changePassword,
  updateProfile,
  uploadAvatar,
  verifyCode,
  updateEmail,
  getPlan,
  getUserProfileWorkspaceAPI
} from '../../../apis'
import {
  loadProfileSuccess,
  changePasswordSuccess,
  updateProfileSuccess,
  loadProfile,
  uploadAvatarSuccess,
  repoLoadingError,
  verifyCodeSuccess,
  changeEmailSuccess,
  getPlanSuccess,
  getDataPlanSuccess
} from './actions'

import { loadInitDisplay } from '../../../routes/store/actions'

import {
  LOAD_PROFILE,
  UPLOAD_AVATAR,
  CHANGE_PASSWORD,
  UPDATE_PROFILE,
  VERIFY_CODE,
  UPDATE_EMAIL,
  GET_PLAN,
  GET_DATA_PLAN
} from './constants'
import { STORAGE, getLocalStorage, setLocalStorage, removeLocalStorage } from '../../../utils'
import { ADMIN_URL, initMenuRouteMapping, initTabTextMapping, QUERY, USER_ROLE, USER_WORKSPACE_ROLE } from '../../../constants'

const { NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, APPROVAL_MANAGEMENT } = USER_ROLE

export function* getProfileSaga({ payload }) {
  const { fromUserRole, callback, workspaceid, hasRequestRedirectHome } = payload
  try {
    const getMetaData = yield getLocalStorage(STORAGE.META_DATA)
    const language = yield getLocalStorage(STORAGE.LANGUAGE)
    const theme = yield JSON.parse(localStorage.getItem(STORAGE.THEME))
    const metaData = yield JSON.parse(getMetaData)
    const userRole = metaData.roles[0]

    // other user role is load profile normally
    const { data } = workspaceid ? yield getUserProfileWorkspaceAPI(payload) : yield getUserProfile(payload)

    yield put(loadInitDisplay(data.initialDisplay))

    const verifySuperAdmin = userRole === NISSHOKEN_SUPER_ADMIN && fromUserRole !== NISSHOKEN_SUPER_ADMIN
    const verifyAdminCompanyVirtual = data.isWorkSpace === USER_WORKSPACE_ROLE.VIRTUAL_COMPANY && userRole === COMPANY_ADMIN
    const verifyIsApprovalManagement = [APPROVAL_MANAGEMENT].includes(userRole)
    const rejectAccessUserPage = verifySuperAdmin || verifyAdminCompanyVirtual || verifyIsApprovalManagement

    if (rejectAccessUserPage) {
      // Waiting when verify and redirect to admin page
      yield put(push('/loading'))
    } else if (data.role !== metaData.roles[0]) {
      // Reset role for account when chose WS, because role workspace can different mainRole of account
      setLocalStorage(STORAGE.META_DATA, JSON.stringify({ ...metaData, roles: [data.role] }))
      yield put(loadProfileSuccess(data, data.role))
    } else {
      yield put(loadProfileSuccess(data, userRole))
    }

    if (hasRequestRedirectHome) {
      const { initialDisplay: { menu, tab } } = data
      yield put(push(`/${initMenuRouteMapping[menu]}?fromTab=${initTabTextMapping[tab]}&${QUERY.WORKSPACE_ID}=${workspaceid}`))
    }

    if (callback) {
      callback()
    }

    const queryParams = stringify({ ...metaData, language, theme })
    // If role is SUPER_ADMIN || APPROVAL_MANAGEMENT => redirect to admin page,
    // but allow access user page if have request from admin (use fromUerRole from query of URL)
    if (verifySuperAdmin || verifyIsApprovalManagement) {
      window.location.replace(`${ADMIN_URL}/auth/verify?${queryParams}`)
    }

    // If role is ADMIN_COMPANY_VIRTUAL => replace route to admin page
    if (verifyAdminCompanyVirtual) {
      // Reset infoUser before replace route to adminPage, need force logout when have request register from admin
      yield removeLocalStorage(STORAGE.META_DATA)
      yield removeLocalStorage(STORAGE.USER_TOKEN)
      window.location.replace(`${ADMIN_URL}/auth/verify?${queryParams}&${QUERY.WORKSPACE_ID}=${data.virtualCompanyId}`)
    }
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* updateAvatarSaga({ payload }) {
  try {
    const { userId, fileName, fileType, file, isDelete, type } = payload
    if (!isDelete) {
      const response = yield uploadFile({
        fileName,
        fileType,
        file,
        type
      })
      yield uploadAvatar({
        userId,
        isDelete,
        imageAvatar: response.urlImage
      })
    } else {
      yield uploadAvatar(payload)
    }
    yield put(loadProfile({ userId }))
    yield put(uploadAvatarSuccess({ isDeletedAvatar: isDelete }))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* changePasswordSaga({ payload }) {
  try {
    yield changePassword(payload)
    yield put(changePasswordSuccess())
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* updateProfileSaga({ payload }) {
  try {
    yield updateProfile(payload)
    yield put(updateProfileSuccess())
    const { data } = yield getUserProfile(payload)
    const getMetaData = yield getLocalStorage(STORAGE.META_DATA)
    const metaData = yield JSON.parse(getMetaData)
    yield put(loadProfileSuccess(data, metaData.roles[0]))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* verifyCodeSaga({ payload }) {
  try {
    yield verifyCode(payload)
    yield put(verifyCodeSuccess(payload.email))
    notification.success({
      message: i18next.t('profile.email.verify_code_success'),
      duration: 2
    })
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* changeEmailSaga({ payload }) {
  try {
    yield updateEmail(payload)
    yield put(changeEmailSuccess())
    yield put(loadProfile({ userId: payload.userId }))
    notification.success({
      message: i18next.t('profile.email.change_email_success'),
      duration: 2
    })
  } catch (error) {
    yield put(
      repoLoadingError({
        error
      })
    )
  }
}

export function* getPlanSaga({ planType }) {
  try {
    const { data } = yield getPlan(planType)
    yield put(getPlanSuccess({ data, planType }))
  } catch (error) {
    yield put(repoLoadingError(error, planType))
  }
}

export function* getDataPlanSaga({ planType }) {
  try {
    const { data } = yield getPlan(planType)
    yield put(getDataPlanSuccess({ data, planType }))
  } catch (error) {
    yield put(repoLoadingError(error, planType))
  }
}

export default function* reportSaga() {
  yield takeLatest(LOAD_PROFILE, getProfileSaga)
  yield takeLatest(UPLOAD_AVATAR, updateAvatarSaga)
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga)
  yield takeLatest(UPDATE_PROFILE, updateProfileSaga)
  yield takeLatest(VERIFY_CODE, verifyCodeSaga)
  yield takeLatest(UPDATE_EMAIL, changeEmailSaga)
  yield takeLatest(GET_PLAN, getPlanSaga)
  yield takeLatest(GET_DATA_PLAN, getDataPlanSaga)
}
