import { FAILURE, REQUEST, SUCCESS, updateObject, createReducer } from 'Stores'
import { LOCATION_CHANGE } from 'connected-react-router'
import {
  LOAD_COMPANY_INFO,
  LOAD_COMPANY_PAYMENT_HISTORIES,
  LOAD_DATA_PLAN,
  LOAD_PLAN,
  LOAD_COMPANY_DETAIL,
  BLOCK_COMPANY,
  CANCEL_PLAN,
  UPDATE_TRIAL_TIME,
  UPDATE_PUSH_NOTIFICATION
} from './constants'

export const initialState = {
  companyInfo: {},
  companyDetail: {},
  isLoading: false,
  error: '',
  plan: null,
  billStatus: 'BILL_SENT',
  isCardError: false,
  isBlocking: false,
  isUpdateTrialTime: false,
  paymentHistories: {
    data: [],
    isLoading: false,
    pagination: {
      total: 0,
      pages: 1,
      page: 1,
      limit: 10
    },
    error: ''
  },
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
  cancelData: {
    data: undefined,
    isLoading: false,
    error: ''
  },
  updatePushNotification: {
    isLoading: false,
    error: ''
  }
}

function loadCompanyInfo(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadCompanyInfoSuccess(state, { companyInfo }) {
  return updateObject(state, {
    companyInfo,
    isLoading: false
  })
}

function loadCompanyInfoError(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function loadCompanyDetail(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadCompanyDetailSuccess(state, { companyDetail }) {
  return updateObject(state, {
    companyDetail,
    cancelData: initialState.cancelData,
    isLoading: false
  })
}

function loadCompanyDetailError(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function loadPaymentHistories(state) {
  return updateObject(state, {
    paymentHistories: {
      ...state.paymentHistories,
      isLoading: true
    }
  })
}

function loadPaymentHistoriesSuccess(state, { data, pagination, billStatus, isCardError }) {
  return updateObject(state, {
    paymentHistories: {
      isLoading: false,
      data,
      pagination
    },
    billStatus,
    isCardError
  })
}

function loadPaymentHistoriesError(state, { error }) {
  return updateObject(state, {
    paymentHistories: {
      isLoading: false,
      error
    }
  })
}

function loadPlans(state) {
  return updateObject(state, {
    plans: {
      isLoading: true
    }
  })
}

function loadPlansSuccess(state, { data }) {
  return updateObject(state, {
    plans: {
      isLoading: false,
      data
    }
  })
}

function loadPlansError(state, { error }) {
  return updateObject(state, {
    plans: {
      isLoading: false,
      error
    }
  })
}

function loadDataPlans(state) {
  return updateObject(state, {
    dataPlans: {
      isLoading: true
    }
  })
}

function loadDataPlansSuccess(state, { data }) {
  return updateObject(state, {
    dataPlans: {
      isLoading: false,
      data
    }
  })
}

function loadDataPlansError(state, { error }) {
  return updateObject(state, {
    dataPlans: {
      isLoading: false,
      error
    }
  })
}

function blockCompany(state) {
  return updateObject(state, {
    isBlocking: true
  })
}

function blockCompanySuccess(state) {
  return updateObject(state, {
    isBlocking: false
  })
}

function blockCompanyError(state, { error }) {
  return updateObject(state, {
    isBlocking: false,
    error
  })
}

function updateTrialTime(state) {
  return updateObject(state, {
    isUpdateTrialTime: true
  })
}

function updateTrialTimeSuccess(state) {
  return updateObject(state, {
    isUpdateTrialTime: false
  })
}

function updateTrialTimeError(state, { error }) {
  return updateObject(state, {
    isUpdateTrialTime: false,
    error
  })
}

function cancelPlan(state) {
  return updateObject(state, {
    cancelData: {
      isLoading: true
    }
  })
}

function cancelPlanSuccess(state) {
  return updateObject(state, {
    cancelData: {
      data: 'done', // text for check cancel plan is done
      isLoading: false
    }
  })
}

function cancelPlanError(state, { error }) {
  return updateObject(state, {
    cancelData: {
      isLoading: false,
      error
    }
  })
}

function updatePushNotification(state) {
  return updateObject(state, {
    updatePushNotification: {
      isLoading: true
    }
  })
}

function updatePushNotificationSuccess(state) {
  return updateObject(state, {
    updatePushNotification: {
      isLoading: false
    }
  })
}

function updatePushNotificationFailure(state, { error }) {
  return updateObject(state, {
    updatePushNotification: {
      isLoading: false,
      error
    }
  })
}

function resetErrorApi(state) {
  return updateObject(state, {
    error: initialState.error
  })
}

export default createReducer(initialState, {
  [REQUEST(LOAD_COMPANY_INFO)]: loadCompanyInfo,
  [SUCCESS(LOAD_COMPANY_INFO)]: loadCompanyInfoSuccess,
  [FAILURE(LOAD_COMPANY_INFO)]: loadCompanyInfoError,

  [REQUEST(LOAD_COMPANY_PAYMENT_HISTORIES)]: loadPaymentHistories,
  [SUCCESS(LOAD_COMPANY_PAYMENT_HISTORIES)]: loadPaymentHistoriesSuccess,
  [FAILURE(LOAD_COMPANY_PAYMENT_HISTORIES)]: loadPaymentHistoriesError,

  [REQUEST(LOAD_PLAN)]: loadPlans,
  [SUCCESS(LOAD_PLAN)]: loadPlansSuccess,
  [FAILURE(LOAD_PLAN)]: loadPlansError,

  [REQUEST(LOAD_DATA_PLAN)]: loadDataPlans,
  [SUCCESS(LOAD_DATA_PLAN)]: loadDataPlansSuccess,
  [FAILURE(LOAD_DATA_PLAN)]: loadDataPlansError,

  [REQUEST(LOAD_COMPANY_DETAIL)]: loadCompanyDetail,
  [SUCCESS(LOAD_COMPANY_DETAIL)]: loadCompanyDetailSuccess,
  [FAILURE(LOAD_COMPANY_DETAIL)]: loadCompanyDetailError,

  [REQUEST(BLOCK_COMPANY)]: blockCompany,
  [SUCCESS(BLOCK_COMPANY)]: blockCompanySuccess,
  [FAILURE(BLOCK_COMPANY)]: blockCompanyError,

  [REQUEST(CANCEL_PLAN)]: cancelPlan,
  [SUCCESS(CANCEL_PLAN)]: cancelPlanSuccess,
  [FAILURE(CANCEL_PLAN)]: cancelPlanError,

  [REQUEST(UPDATE_TRIAL_TIME)]: updateTrialTime,
  [SUCCESS(UPDATE_TRIAL_TIME)]: updateTrialTimeSuccess,
  [FAILURE(UPDATE_TRIAL_TIME)]: updateTrialTimeError,

  [REQUEST(UPDATE_PUSH_NOTIFICATION)]: updatePushNotification,
  [SUCCESS(UPDATE_PUSH_NOTIFICATION)]: updatePushNotificationSuccess,
  [FAILURE(UPDATE_PUSH_NOTIFICATION)]: updatePushNotificationFailure,

  [LOCATION_CHANGE]: resetErrorApi
})
