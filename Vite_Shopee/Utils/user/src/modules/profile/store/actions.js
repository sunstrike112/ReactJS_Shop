import {
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  LOAD_REPOS_ERROR,

  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,

  VERIFY_CODE,
  VERIFY_CODE_SUCCESS,
  UPDATE_EMAIL,
  UPDATE_EMAIL_SUCCESS,

  UPLOAD_AVATAR,
  UPLOAD_AVATAR_SUCCESS,
  RESET_PROFILE,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  LOAD_PROFILE_FAILURE,

  GET_PLAN,
  GET_PLAN_SUCCESS,
  GET_PLAN_ERROR,
  RESET_TRIAL_EXPIRED,
  GET_DATA_PLAN,
  GET_DATA_PLAN_SUCCESS,
  GET_DATA_PLAN_ERROR,
  REMOVE_ERROR_PASSWORD
} from './constants'

export function loadProfile(payload) {
  return {
    type: LOAD_PROFILE,
    payload
  }
}

export function loadProfileSuccess(data, userRole) {
  return {
    type: LOAD_PROFILE_SUCCESS,
    data,
    userRole
  }
}

export function loadProfileFailure(error) {
  return {
    type: LOAD_PROFILE_FAILURE,
    error
  }
}

export function uploadAvatar(payload) {
  return {
    type: UPLOAD_AVATAR,
    payload
  }
}

export function uploadAvatarSuccess({ isDeletedAvatar }) {
  return {
    type: UPLOAD_AVATAR_SUCCESS,
    isDeletedAvatar
  }
}

export function changePassword(payload) {
  return {
    type: CHANGE_PASSWORD,
    payload
  }
}

export function changePasswordSuccess() {
  return {
    type: CHANGE_PASSWORD_SUCCESS
  }
}

export function removeErrorPassword() {
  return {
    type: REMOVE_ERROR_PASSWORD
  }
}

export function updateProfile(payload) {
  return {
    type: UPDATE_PROFILE,
    payload
  }
}

export function updateProfileSuccess() {
  return {
    type: UPDATE_PROFILE_SUCCESS
  }
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error
  }
}

export function resetProfile() {
  return {
    type: RESET_PROFILE
  }
}

export function verifyCode(payload) {
  return {
    type: VERIFY_CODE,
    payload
  }
}

export function verifyCodeSuccess(email) {
  return {
    type: VERIFY_CODE_SUCCESS,
    email
  }
}

export function changeEmail(payload) {
  return {
    type: UPDATE_EMAIL,
    payload
  }
}

export function changeEmailSuccess() {
  return {
    type: UPDATE_EMAIL_SUCCESS
  }
}

export function getPlan() {
  return {
    type: GET_PLAN,
    planType: 'PLAN_USER'
  }
}

export function getPlanSuccess({ data, planType }) {
  return {
    type: GET_PLAN_SUCCESS,
    data,
    planType
  }
}

export function getPlanError(error) {
  return {
    type: GET_PLAN_ERROR,
    error
  }
}

export function getDataPlan() {
  return {
    type: GET_DATA_PLAN,
    planType: 'PLAN_DATA'
  }
}

export function getDataPlanSuccess({ data, planType }) {
  return {
    type: GET_DATA_PLAN_SUCCESS,
    data,
    planType
  }
}

export function getDataPlanError(error) {
  return {
    type: GET_DATA_PLAN_ERROR,
    error
  }
}

export function resetTrialExpired() {
  return {
    type: RESET_TRIAL_EXPIRED
  }
}
