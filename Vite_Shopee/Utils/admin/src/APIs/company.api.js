import { STORAGE, getLocalStorage, openDownloadLink, parseFilter, parseFilterArrayToStringV2, parseParamsToQueryString, parseParamsToQueryStringV2 } from 'Utils'
import { stringify } from 'qs'
import { PLAN_TYPE } from 'Constants'
import AxiosClient from './api'
import END_POINT from './constants'

function loadContractPlanAPI({ params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COMPANY_MANAGEMENT.LOAD_CONTRACT_PLAN}?${q}`)
    .then(({ data }) => data)
}

function loadCompanyListAPI({ params }) {
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COMPANY_MANAGEMENT.LOAD_COMPANY_LIST}?${q}`)
    .then(({ data }) => data)
}

function getCompanyDetailAPI({ companyId }) {
  return AxiosClient.get(`${END_POINT.COMPANY_MANAGEMENT.GET_COMPANY_DETAIL(companyId)}`)
    .then(({ data }) => data)
}

function deleteCompany({ companyId }) {
  return AxiosClient.delete(`${END_POINT.COMPANY_MANAGEMENT.DELETE_COMPANY(companyId)}`)
    .then(({ data }) => data)
}

function getCompanyAllAPI(payload) {
  let q = ''
  if (payload && payload.params) {
    q = parseParamsToQueryStringV2(payload.params)
  }
  return AxiosClient.get(`${END_POINT.COMPANY_MANAGEMENT.GET_ALL_COMPANY}?${q}`)
    .then(({ data }) => data)
}

function getCompanyInfo() {
  return AxiosClient.get(END_POINT.COMPANY_MANAGEMENT.GET_COMPANY_INFO)
    .then(({ data }) => data)
}

function uploadAvatar({ imagePath }) {
  return AxiosClient.put(`${END_POINT.COMPANY_MANAGEMENT.UPLOAD_AVATAR}`, {
    imagePath
  }).then(({ data }) => data)
}

function getPaymentHistories({ companyId, month, page, limit = 100 }) {
  let uri = `${END_POINT.COMPANY_MANAGEMENT.GET_PAYMENT_HISTORIES}/${companyId}?month=${month}`

  if (page) {
    uri += `&page=${page}&limit=${limit}`
  }
  return AxiosClient.get(uri)
    .then(({ data }) => data)
}

function getPlans({ planType = PLAN_TYPE.PLAN_USER }) {
  return AxiosClient.get(`${END_POINT.COMPANY_MANAGEMENT.GET_PLANS}?type=${planType}`)
    .then(({ data }) => data)
}

async function generateToken({ params }) {
  const { planId, dataId, changeCard, isSolveDebtForAccountCancelled } = params
  const listId = []
  if (planId) {
    listId.push(planId)
  }
  if (dataId) {
    listId.push(dataId)
  }

  const acceptLanguage = getLocalStorage(STORAGE.LANGUAGE)

  const q = parseParamsToQueryString({ planId: [...listId], changeCard, isSolveDebtForAccountCancelled, acceptLanguage })
  return AxiosClient.post(`${END_POINT.COMPANY_MANAGEMENT.GENERATE_PAYMENT_TOKEN}?${q}`)
    .then((res) => res.data)
}

function noticePaymentSuccessAPI({ params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.put(`${END_POINT.COMPANY_MANAGEMENT.NOTICE_PAYMENT_SUCCESS}?${q}`)
    .then((res) => res.data)
}

function robotPaymentVerifyAPI({ params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COMPANY_MANAGEMENT.ROBOT_PAYMENT_VERIFY}?${q}`)
    .then(({ data }) => data)
}

function logBeforeChangeCardAPI({ params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.post(`${END_POINT.COMPANY_MANAGEMENT.LOG_BEFORE_CHANGE_CARD}?${q}`)
    .then(({ data }) => data)
}

async function changePlan(planIds) {
  let query = ''
  planIds.forEach((id) => {
    if (!query) {
      query += `?planId=${id}`
    } else {
      query += `&planId=${id}`
    }
  })
  const uri = `${END_POINT.COMPANY_MANAGEMENT.CHANGE_PLAN}${query}`
  return AxiosClient.put(uri)
    .then((res) => res.data)
}

async function updateCompanyInfoAPI({ data }) {
  const uri = `${END_POINT.COMPANY_MANAGEMENT.UPDATE_COMPANY_INFO}`
  return AxiosClient.put(uri, data)
    .then((res) => res.data)
}

async function blockCompanyAPI({ data, params }) {
  return AxiosClient.put(END_POINT.COMPANY_MANAGEMENT.BLOCK_COMPANY, data, { params })
    .then((res) => res.data)
}

function getCompanyTypesAPI({ params }) {
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COMPANY_MANAGEMENT.GET_COMPANY_TYPES}?${q}`)
    .then(({ data }) => data)
}

function getCompanySelectedAPI({ data, params }) {
  return AxiosClient.post(END_POINT.COMPANY_MANAGEMENT.GET_COMPANY_SELECTED, data, { params })
    .then((res) => res.data)
}

function updateTrialTimeAPI({ params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.put(`${END_POINT.COMPANY_MANAGEMENT.UPDATE_TRIAL_TIME}?${q}`)
    .then(({ data }) => data)
}

function downloadCompanyCSV(filter) {
  const q = parseFilterArrayToStringV2(filter)
  return AxiosClient.download(`${END_POINT.COMPANY_MANAGEMENT.DOWNLOAD_CSV}?${q}`)
    .then(async (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      openDownloadLink({
        url, filename: 'company-info.csv'
      })
    })
}

function cancelPlanAPI({ data, params }) {
  return AxiosClient.post(END_POINT.COMPANY_MANAGEMENT.CANCEL_PLAN(params.companyId), data)
    .then((res) => res.data)
}

function updateCompanyPushNotificationAPI({ params, headers }) {
  const q = stringify(params)
  const url = `${END_POINT.COMPANY_MANAGEMENT.UPDATE_PUSH_NOTIFICATION}?${q}`
  return AxiosClient.post(url, {}, { headers })
    .then((res) => res.data)
}

function getCompanyListWaitingAPI({ params }) {
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COMPANY_MANAGEMENT.GET_COMPANY_LIST_WAITING}?${q}`)
    .then(({ data }) => data)
}

function getAmountOfCompanyUnapprovedApi() {
  return AxiosClient.get(END_POINT.COMPANY_MANAGEMENT.GET_AMOUNT_OF_COMPANY_UNAPPROVED)
    .then(({ data }) => data)
}

function getCompanyWaitingDetailAPI({ companyId }) {
  return AxiosClient.get(END_POINT.COMPANY_MANAGEMENT.GET_COMPANY_WAITING_DETAIL(companyId))
    .then(({ data }) => data)
}

function getCompanyListRefusedAPI({ params }) {
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COMPANY_MANAGEMENT.GET_COMPANY_LIST_REFUSED}?${q}`)
    .then(({ data }) => data)
}

function getAdminProfileAPI() {
  return AxiosClient.get(END_POINT.COMPANY_MANAGEMENT.GET_ADMIN_PROFILE)
    .then(({ data }) => data)
}

function updateAdminProfileAPI({ params, data }) {
  const q = stringify(params)
  const url = `${END_POINT.COMPANY_MANAGEMENT.UPDATE_ADMIN_PROFILE}?${q}`
  return AxiosClient.put(url, data).then((res) => res.data)
}

function updateStatusForCompanyWaitingAPI({ data }) {
  const url = END_POINT.COMPANY_MANAGEMENT.UPDATE_STATUS_FOR_COMPANY_WAITING
  return AxiosClient.post(url, data).then((res) => res.data)
}

function moveCompanyRefusedToWaitingAPI({ companyId }) {
  const url = END_POINT.COMPANY_MANAGEMENT.MOVE_COMPANY_REFUSED_TO_WAITING(companyId)
  return AxiosClient.post(url).then(({ data }) => data)
}

export {
  loadContractPlanAPI,
  loadCompanyListAPI,
  getCompanyInfo,
  uploadAvatar,
  getPaymentHistories,
  getPlans,
  generateToken,
  noticePaymentSuccessAPI,
  changePlan,
  updateCompanyInfoAPI,
  getCompanyAllAPI,
  robotPaymentVerifyAPI,
  logBeforeChangeCardAPI,
  getCompanyDetailAPI,
  blockCompanyAPI,
  getCompanyTypesAPI,
  getCompanySelectedAPI,
  updateTrialTimeAPI,
  downloadCompanyCSV,
  cancelPlanAPI,
  deleteCompany,
  updateCompanyPushNotificationAPI,
  getCompanyListWaitingAPI,
  getAmountOfCompanyUnapprovedApi,
  getCompanyWaitingDetailAPI,
  getCompanyListRefusedAPI,
  getAdminProfileAPI,
  updateAdminProfileAPI,
  updateStatusForCompanyWaitingAPI,
  moveCompanyRefusedToWaitingAPI
}
