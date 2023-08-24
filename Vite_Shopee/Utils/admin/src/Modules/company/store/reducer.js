import { LOCATION_CHANGE } from 'connected-react-router'
import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  LOAD_COMPANY_LIST,
  LOAD_CONTRACT_PLAN,
  LOAD_COMPANY_ALL,
  DELETE_COMPANY,
  GET_COMPANY_LIST_WAITING,
  GET_COMPANY_LIST_REFUSED,
  GET_COMPANY_WAITING_DETAIL,
  GET_ADMIN_PROFILE,
  UPDATE_ADMIN_PROFILE,
  UPDATE_STATUS_FOR_COMPANY_WAITING,
  MOVE_COMPANY_REFUSED_TO_WAITING,
  RESET_COMPANIES_MANAGEMENT,
  GET_AMOUNT_OF_COMPANY_UNAPPROVED,
  CLOSE_NOTICE_TO_SUPER_ADMIN
} from './constants'

const contractPlan = {
  isLoading: false,
  data: [],
  error: null
}

const companyAll = {
  isLoading: false,
  data: [],
  error: null
}

const companyListWaiting = {
  isLoading: false,
  data: [],
  amountOfCompanyUnapproved: 0,
  isNoticeToSuperAdmin: false,
  pagination: {},
  filter: {},
  error: null
}

const companyListRefused = {
  isLoading: false,
  isDeleting: false,
  data: [],
  pagination: {},
  filter: {},
  error: null
}

const companyWaitingDetail = {
  isLoading: false,
  isUpdating: false,
  updateStatusType: 0,
  data: {},
  error: null
}

const adminProfile = {
  isLoading: false,
  isUpdating: false,
  data: {},
  error: null
}

export const initialState = {
  isLoading: false,
  contractPlan: { ...contractPlan },
  companyAll: { ...companyAll },
  companyList: [],
  companyListWaiting: { ...companyListWaiting },
  companyWaitingDetail: { ...companyWaitingDetail },
  companyListRefused: { ...companyListRefused },
  adminProfile: { ...adminProfile },
  filter: {},
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    limit: 100
  },
  error: null
}

function loadContractPlan(state) {
  return updateObject(state, {
    contractPlan: {
      ...state.contractPlan,
      isLoading: true
    }
  })
}

function loadContractPlanSuccess(state, { data }) {
  return updateObject(state, {
    contractPlan: {
      ...state.contractPlan,
      isLoading: false,
      data
    }
  })
}

function loadContractPlanFailure(state, { error }) {
  return updateObject(state, {
    contractPlan: {
      ...state.contractPlan,
      error
    }
  })
}

function loadCompanyList(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadCompanyListSuccess(state, { payload }) {
  const { companyList, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    companyList,
    pagination,
    filter
  })
}

function loadCompanyListFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function loadAllCompany(state) {
  return updateObject(state, {
    companyAll: {
      ...state.companyAll,
      isLoading: true
    }
  })
}

function loadAllCompanySuccess(state, { data }) {
  return updateObject(state, {
    companyAll: {
      ...state.companyAll,
      isLoading: false,
      data
    }
  })
}

function loadAllCompanyFailure(state, { error }) {
  return updateObject(state, {
    companyAll: {
      ...state.companyAll,
      isLoading: false,
      error
    }
  })
}

function deleteCompany(state) {
  return updateObject(state, {
    error: null,
    isLoading: true
  })
}

function deleteCompanySuccess(state) {
  return updateObject(state, {
    isLoading: false
  })
}

function deleteCompanyFailure(state, { error }) {
  return updateObject(state, { error, isLoading: false })
}

function getCompanyListWaitingRequest(state) {
  return updateObject(state, {
    companyListWaiting: {
      ...state.companyListWaiting,
      isLoading: true
    }
  })
}

function getCompanyListWaitingSuccess(state, { payload }) {
  const { result, pagination, filter } = payload
  return updateObject(state, {
    companyListWaiting: {
      ...state.companyListWaiting,
      isLoading: false,
      data: result,
      pagination,
      filter
    }
  })
}

function getCompanyListWaitingFailure(state, { error }) {
  return updateObject(state, {
    companyListWaiting: {
      ...state.companyListWaiting,
      isLoading: false,
      error
    }
  })
}

function getAmountOfCompanyUnapprovedRequest(state) {
  return updateObject(state, {
    companyListWaiting: {
      ...state.companyListWaiting,
      isLoading: true
    }
  })
}

function getAmountOfCompanyUnapprovedSuccess(state, { data }) {
  const { amountOfCompanyUnapproved, isNoticeToSuperAdmin } = data
  return updateObject(state, {
    companyListWaiting: {
      ...state.companyListWaiting,
      isLoading: false,
      amountOfCompanyUnapproved,
      isNoticeToSuperAdmin
    }
  })
}

function getAmountOfCompanyUnapprovedFailure(state, { error }) {
  return updateObject(state, {
    companyListWaiting: {
      ...state.companyListWaiting,
      isLoading: false,
      error
    }
  })
}

function closeNoticeToSuperAdminRequest(state) {
  return updateObject(state, {
    companyListWaiting: {
      ...state.companyListWaiting,
      isNoticeToSuperAdmin: false
    }
  })
}

function getCompanyWaitingDetailRequest(state) {
  return updateObject(state, {
    companyWaitingDetail: {
      ...state.companyWaitingDetail,
      isLoading: true
    }
  })
}

function getCompanyWaitingDetailSuccess(state, { data }) {
  return updateObject(state, {
    companyWaitingDetail: {
      ...state.companyWaitingDetail,
      isLoading: false,
      data
    }
  })
}

function getCompanyWaitingDetailFailure(state, { error }) {
  return updateObject(state, {
    companyWaitingDetail: {
      ...state.companyWaitingDetail,
      isLoading: false,
      error
    }
  })
}

function getCompanyListRefusedRequest(state) {
  return updateObject(state, {
    companyListRefused: {
      ...state.companyListRefused,
      isLoading: true
    }
  })
}

function getCompanyListRefusedSuccess(state, { payload }) {
  const { result, pagination, filter } = payload
  return updateObject(state, {
    companyListRefused: {
      ...state.companyListRefused,
      isLoading: false,
      data: result,
      pagination,
      filter
    }
  })
}

function getCompanyListRefusedFailure(state, { error }) {
  return updateObject(state, {
    companyListRefused: {
      ...state.companyListRefused,
      isLoading: false,
      error
    }
  })
}

function getAdminProfileRequest(state) {
  return updateObject(state, {
    adminProfile: {
      ...state.adminProfile,
      isLoading: true
    }
  })
}

function getAdminProfileSuccess(state, { data }) {
  return updateObject(state, {
    adminProfile: {
      ...state.adminProfile,
      isLoading: false,
      data
    }
  })
}

function getAdminProfileFailure(state, { error }) {
  return updateObject(state, {
    adminProfile: {
      ...state.adminProfile,
      isLoading: false,
      error
    }
  })
}

function updateAdminProfileRequest(state) {
  return updateObject(state, {
    adminProfile: {
      ...state.adminProfile,
      isUpdating: true
    }
  })
}

function updateAdminProfileSuccess(state) {
  return updateObject(state, {
    adminProfile: {
      ...state.adminProfile,
      isUpdating: false
    }
  })
}

function updateAdminProfileFailure(state, { error }) {
  return updateObject(state, {
    adminProfile: {
      ...state.adminProfile,
      isUpdating: false,
      error
    }
  })
}

function updateStatusForCompanyWaitingRequest(state, { payload }) {
  const { data: { isApproved } } = payload
  return updateObject(state, {
    companyWaitingDetail: {
      ...state.companyWaitingDetail,
      isUpdating: true,
      updateStatusType: isApproved
    }
  })
}

function updateStatusForCompanyWaitingSuccess(state) {
  return updateObject(state, {
    companyWaitingDetail: {
      ...state.companyWaitingDetail,
      isUpdating: false
    }
  })
}

function updateStatusForCompanyWaitingFailure(state, { error }) {
  return updateObject(state, {
    companyWaitingDetail: {
      ...state.companyWaitingDetail,
      isUpdating: false,
      error
    }
  })
}

function moveCompanyRefusedToWaitingRequest(state) {
  return updateObject(state, {
    companyListRefused: {
      ...state.companyListRefused,
      isDeleting: true
    }
  })
}

function moveCompanyRefusedToWaitingSuccess(state) {
  return updateObject(state, {
    companyListRefused: {
      ...state.companyListRefused,
      isDeleting: false
    }
  })
}

function moveCompanyRefusedToWaitingFailure(state, { error }) {
  return updateObject(state, {
    companyListRefused: {
      ...state.companyListRefused,
      isDeleting: false,
      error
    }
  })
}

function resetCompaniesManagement(state) {
  return updateObject(state, {
    companyList: [...initialState.companyList],
    pagination: { ...initialState.pagination }
  })
}

// createLessonInitial
function resetState(state) {
  return updateObject(state, {
    filter: {},
    companyWaitingDetail: { ...initialState.companyWaitingDetail },
    companyList: [...initialState.companyList],
    pagination: { ...initialState.pagination }
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_CONTRACT_PLAN)]: loadContractPlan,
  [SUCCESS(LOAD_CONTRACT_PLAN)]: loadContractPlanSuccess,
  [FAILURE(LOAD_CONTRACT_PLAN)]: loadContractPlanFailure,

  [REQUEST(LOAD_COMPANY_LIST)]: loadCompanyList,
  [SUCCESS(LOAD_COMPANY_LIST)]: loadCompanyListSuccess,
  [FAILURE(LOAD_COMPANY_LIST)]: loadCompanyListFailure,

  [REQUEST(LOAD_COMPANY_ALL)]: loadAllCompany,
  [SUCCESS(LOAD_COMPANY_ALL)]: loadAllCompanySuccess,
  [FAILURE(LOAD_COMPANY_ALL)]: loadAllCompanyFailure,

  [REQUEST(DELETE_COMPANY)]: deleteCompany,
  [SUCCESS(DELETE_COMPANY)]: deleteCompanySuccess,
  [FAILURE(DELETE_COMPANY)]: deleteCompanyFailure,

  [REQUEST(GET_COMPANY_LIST_WAITING)]: getCompanyListWaitingRequest,
  [SUCCESS(GET_COMPANY_LIST_WAITING)]: getCompanyListWaitingSuccess,
  [FAILURE(GET_COMPANY_LIST_WAITING)]: getCompanyListWaitingFailure,

  [REQUEST(GET_AMOUNT_OF_COMPANY_UNAPPROVED)]: getAmountOfCompanyUnapprovedRequest,
  [SUCCESS(GET_AMOUNT_OF_COMPANY_UNAPPROVED)]: getAmountOfCompanyUnapprovedSuccess,
  [FAILURE(GET_AMOUNT_OF_COMPANY_UNAPPROVED)]: getAmountOfCompanyUnapprovedFailure,

  [REQUEST(CLOSE_NOTICE_TO_SUPER_ADMIN)]: closeNoticeToSuperAdminRequest,

  [REQUEST(GET_COMPANY_WAITING_DETAIL)]: getCompanyWaitingDetailRequest,
  [SUCCESS(GET_COMPANY_WAITING_DETAIL)]: getCompanyWaitingDetailSuccess,
  [FAILURE(GET_COMPANY_WAITING_DETAIL)]: getCompanyWaitingDetailFailure,

  [REQUEST(GET_COMPANY_LIST_REFUSED)]: getCompanyListRefusedRequest,
  [SUCCESS(GET_COMPANY_LIST_REFUSED)]: getCompanyListRefusedSuccess,
  [FAILURE(GET_COMPANY_LIST_REFUSED)]: getCompanyListRefusedFailure,

  [REQUEST(GET_ADMIN_PROFILE)]: getAdminProfileRequest,
  [SUCCESS(GET_ADMIN_PROFILE)]: getAdminProfileSuccess,
  [FAILURE(GET_ADMIN_PROFILE)]: getAdminProfileFailure,

  [REQUEST(UPDATE_ADMIN_PROFILE)]: updateAdminProfileRequest,
  [SUCCESS(UPDATE_ADMIN_PROFILE)]: updateAdminProfileSuccess,
  [FAILURE(UPDATE_ADMIN_PROFILE)]: updateAdminProfileFailure,

  [REQUEST(UPDATE_STATUS_FOR_COMPANY_WAITING)]: updateStatusForCompanyWaitingRequest,
  [SUCCESS(UPDATE_STATUS_FOR_COMPANY_WAITING)]: updateStatusForCompanyWaitingSuccess,
  [FAILURE(UPDATE_STATUS_FOR_COMPANY_WAITING)]: updateStatusForCompanyWaitingFailure,

  [REQUEST(MOVE_COMPANY_REFUSED_TO_WAITING)]: moveCompanyRefusedToWaitingRequest,
  [SUCCESS(MOVE_COMPANY_REFUSED_TO_WAITING)]: moveCompanyRefusedToWaitingSuccess,
  [FAILURE(MOVE_COMPANY_REFUSED_TO_WAITING)]: moveCompanyRefusedToWaitingFailure,

  [REQUEST(RESET_COMPANIES_MANAGEMENT)]: resetCompaniesManagement,

  [LOCATION_CHANGE]: resetState
})
