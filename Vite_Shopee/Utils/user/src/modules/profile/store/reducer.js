import { LOCATION_CHANGE } from 'connected-react-router'
import { createReducer, updateObject } from '../../../store'
import {
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  LOAD_REPOS_ERROR,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPLOAD_AVATAR,
  UPLOAD_AVATAR_SUCCESS,
  VERIFY_CODE,
  VERIFY_CODE_SUCCESS,
  UPDATE_EMAIL,
  UPDATE_EMAIL_SUCCESS,
  RESET_PROFILE,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  LOAD_PROFILE_FAILURE,
  GET_PLAN,
  GET_PLAN_SUCCESS,
  GET_PLAN_ERROR,
  TRIAL_EXPIRED,
  ERROR_COMPANY_HAS_CANCELLATION,
  RESET_TRIAL_EXPIRED,
  GET_DATA_PLAN,
  GET_DATA_PLAN_SUCCESS,
  GET_DATA_PLAN_ERROR,
  PAYMENT_EXPIRED,
  REMOVE_ERROR_PASSWORD
} from './constants'

const ProfileInitial = {
  userId: 0,
  fullName: '',
  firstName: null,
  lastName: null,
  nameKatakana: '',
  lastNameKatakana: '',
  fileAttachOverviewThree: '',
  gender: 0,
  email: '',
  companyName: '',
  avatar: '',
  telePhone: null,
  cellPhone: null,
  address: null,
  provinceName: null,
  post: null,
  dayOfBirth: null,
  overviewYourSelf: null,
  dateOfEnteringtheCompany: 0
}

export const initialState = {
  errors: {
    verifyCode: null,
    uploadAvatar: null,
    changePassword: null,
    changeEmail: null,
    updateProfile: null
  },
  profile: {
    isLoading: false,
    data: ProfileInitial,
    error: null
  },
  authenticated: false,
  userRole: null,
  uploadAvatar: {
    isLoading: false,
    isUpdatedAvatar: false,
    isDeletedAvatar: false,
    error: null
  },
  isChangePassword: false,
  isUpdatedProfile: false,
  isUpdatingProfile: false,
  isUploadAvatar: false,
  isChangeEmail: false,
  verifyCode: {
    isSuccess: false,
    email: ''
  },
  isLoading: false,
  plans: {
    data: [],
    isLoading: false,
    error: ''
  },
  dataPlans: {
    data: [],
    isLoading: false,
    error: ''
  },
  isTrialExpired: false,
  isCompanyCancellation: false,
  isChangePlanSuccess: false,
  isPaymentExpired: false
}

function loadProfile(state) {
  return updateObject(state, {
    profile: {
      ...state.profile,
      isLoading: true
    },
    errors: initialState.errors,
    authenticated: state.authenticated,
    uploadAvatar: {
      isLoading: false,
      isUpdatedAvatar: false,
      isDeletedAvatar: false
    }
  })
}

function loadProfileSuccess(state, { data, userRole }) {
  return updateObject(state, {
    profile: {
      isLoading: false,
      error: null,
      data: data || state.data
    },
    userRole,
    authenticated: true
  })
}

function loadProfileFailure(state, { error }) {
  return updateObject(state, {
    profile: {
      isLoading: false,
      error
    },
    authenticated: false
  })
}

function uploadAvatar(state) {
  return updateObject(state, {
    uploadAvatar: {
      isLoading: true,
      isUpdatedAvatar: false,
      isDeletedAvatar: false
    },
    errors: initialState.errors,
    isUpdatedProfile: false
  })
}

function uploadAvatarSuccess(state, { isDeletedAvatar }) {
  return updateObject(state, {
    uploadAvatar: {
      isLoading: false,
      isUpdatedAvatar: !isDeletedAvatar,
      isDeletedAvatar
    }
  })
}

function updateProfile(state) {
  return updateObject(state, {
    isUpdatedProfile: false,
    isUpdatingProfile: true,
    errors: initialState.errors
  })
}

function updateProfileSuccess(state) {
  return updateObject(state, {
    isUpdatedProfile: true,
    isUpdatingProfile: false
  })
}

function changePassword(state) {
  return updateObject(state, {
    isUpdatedProfile: false,
    isChangePassword: false,
    isLoading: true,
    errors: initialState.errors
  })
}

function changePasswordSuccess(state) {
  return updateObject(state, {
    isChangePassword: true,
    isLoading: false
  })
}

function removeErrorPassword(state) {
  return updateObject(state, {
    errors: { ...initialState.errors }
  })
}

function verifyCode(state) {
  return updateObject(state, {
    isUpdatedProfile: false,
    verifyCode: {
      isSuccess: false,
      email: ''
    },
    isLoading: true,
    errors: initialState.errors
  })
}

function verifyCodeSuccess(state, { email }) {
  return updateObject(state, {
    verifyCode: {
      isSuccess: true,
      email
    },
    isLoading: false
  })
}

function changeEmail(state) {
  return updateObject(state, {
    isChangeEmail: false,
    isLoading: true,
    errors: initialState.errors
  })
}

function changeEmailSuccess(state) {
  return updateObject(state, {
    isChangeEmail: true,
    isLoading: false,
    verifyCode: {
      isSuccess: false,
      email: ''
    }
  })
}

function getPlan(state) {
  return updateObject(state, {
    plans: {
      isLoading: true
    }
  })
}

function getPlanSuccess(state, { data }) {
  return updateObject(state, {
    plans: {
      isLoading: false,
      data
    }
  })
}

function getPlanError(state, { error }) {
  return updateObject(state, {
    plans: {
      isLoading: false,
      error
    }
  })
}

function getDataPlan(state) {
  return updateObject(state, {
    dataPlans: {
      isLoading: true
    }
  })
}

function getDataPlanSuccess(state, { data }) {
  return updateObject(state, {
    dataPlans: {
      isLoading: false,
      data
    }
  })
}

function getDataPlanError(state, { error }) {
  return updateObject(state, {
    dataPlans: {
      isLoading: false,
      error
    }
  })
}

function repoLoadingError(state, { error }) {
  return updateObject(state, {
    errors: {
      ...state.errors,
      ...error
    },
    isLoading: false,
    isUpdatingProfile: false
  })
}

function resetProfile() {
  return updateObject(initialState, {})
}

function trialExpired(state) {
  return updateObject(state, {
    isTrialExpired: true
  })
}

function companyHasCancellation(state) {
  return updateObject(state, {
    isCompanyCancellation: true
  })
}

function paymentExpired(state) {
  return updateObject(state, {
    isPaymentExpired: true
  })
}

function resetTrialExpired(state) {
  return updateObject(state, {
    isTrialExpired: false
  })
}

function resetState(state) {
  return updateObject(state, {
    ...state,
    errors: { ...initialState.errors },
    uploadAvatar: {
      isLoading: false,
      isUpdatedAvatar: false,
      isDeletedAvatar: false
    },
    isUpdatedProfile: false
  })
}

export default createReducer(initialState, {
  [LOAD_PROFILE]: loadProfile,
  [LOAD_PROFILE_SUCCESS]: loadProfileSuccess,
  [LOAD_PROFILE_FAILURE]: loadProfileFailure,

  [UPLOAD_AVATAR]: uploadAvatar,
  [UPLOAD_AVATAR_SUCCESS]: uploadAvatarSuccess,

  [UPDATE_PROFILE]: updateProfile,
  [UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,

  [CHANGE_PASSWORD]: changePassword,
  [CHANGE_PASSWORD_SUCCESS]: changePasswordSuccess,
  [REMOVE_ERROR_PASSWORD]: removeErrorPassword,

  [VERIFY_CODE]: verifyCode,
  [VERIFY_CODE_SUCCESS]: verifyCodeSuccess,

  [UPDATE_EMAIL]: changeEmail,
  [UPDATE_EMAIL_SUCCESS]: changeEmailSuccess,

  [LOAD_REPOS_ERROR]: repoLoadingError,

  [RESET_PROFILE]: resetProfile,

  [LOCATION_CHANGE]: resetState,
  [GET_PLAN]: getPlan,
  [GET_PLAN_SUCCESS]: getPlanSuccess,
  [GET_PLAN_ERROR]: getPlanError,
  [GET_DATA_PLAN]: getDataPlan,
  [GET_DATA_PLAN_SUCCESS]: getDataPlanSuccess,
  [GET_DATA_PLAN_ERROR]: getDataPlanError,
  [TRIAL_EXPIRED]: trialExpired,
  [ERROR_COMPANY_HAS_CANCELLATION]: companyHasCancellation,
  [PAYMENT_EXPIRED]: paymentExpired,
  [RESET_TRIAL_EXPIRED]: resetTrialExpired
})
