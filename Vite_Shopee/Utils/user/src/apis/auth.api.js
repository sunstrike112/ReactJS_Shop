import { getLocalStorage, parseParamsToQueryString, STORAGE } from '../utils'
import { getLocalLanguage } from '../utils/storage'
import AxiosClient from './api'
import END_POINT from './constants'

const getHeaderLanguage = () => {
  const localLanguage = getLocalStorage(STORAGE.LANGUAGE) || 'jp'
  return { 'Accept-Language': localLanguage }
}

async function submitLogin({ data }) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.AUTH.LOGIN}`
  return axiosClient.post(uri, data, {
    headers: {
      ...getHeaderLanguage(),
      Authorization: ''
    }
  }).then((res) => res.data)
}

async function getEmailReset(account) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.AUTH.EMAIL_RESET}`
  return axiosClient.post(uri, account, {
    headers: { ...getHeaderLanguage() }
  }).then((res) => res.data)
}

async function registerEmail(body) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.REGISTER.EMAIL
  return axiosClient.post(uri, body, {
    headers: { ...getHeaderLanguage() }
  }).then((res) => res.data)
}

async function registerCompanyInfo(body) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.REGISTER.REGISTER_COMPANY
  return axiosClient.post(uri, body, {
    headers: { ...getHeaderLanguage() }
  }).then((res) => res.data)
}

async function verifyPassword(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params }).toString()
  const uri = `${END_POINT.REGISTER.VERIFY_PASSWORD}?${q}`
  return axiosClient.get(uri).then((res) => res.data)
}

async function settingPassword(body) {
  const axiosClient = new AxiosClient()
  const { resetToken, email, ...restBody } = body
  const uri = `${END_POINT.REGISTER.SETTING_PASSWORD}?resetToken=${resetToken}`
  return axiosClient.put(uri, restBody, {
    headers: { ...getHeaderLanguage() }
  }).then((res) => res.data)
}

async function verifyCompany(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params }).toString()
  const uri = `${END_POINT.REGISTER.VERIFY_COMPANY}?${q}`
  return axiosClient.get(uri).then((res) => res.data)
}

async function getEmailFromToken(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params }).toString()
  const uri = `${END_POINT.REGISTER.GET_EMAIL}?${q}`
  return axiosClient.get(uri).then((res) => res.data)
}

async function checkEmailCompanyExist(body) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.REGISTER.CHECK_EMAIL_EXIST}`
  return axiosClient.post(uri, body, {
    headers: { ...getHeaderLanguage() }
  }).then((res) => res.data)
}

async function registerCompany(body) {
  const axiosClient = new AxiosClient()
  const { resetToken, email, ...restBody } = body
  const uri = `${END_POINT.REGISTER.VERIFY_COMPANY}?resetToken=${resetToken}`
  return axiosClient.put(uri, restBody, {
    headers: { ...getHeaderLanguage() }
  }).then((res) => res.data)
}

async function verifyEmployee(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params }).toString()
  const uri = `${END_POINT.REGISTER.VERIFY_EMPLOYEE}?${q}`
  return axiosClient.get(uri).then((res) => res.data)
}

async function registerEmployee(body) {
  const axiosClient = new AxiosClient()
  const { token, email, ...restBody } = body
  const q = new URLSearchParams({ resetToken: token, langCode: getLocalLanguage() }).toString()
  const uri = `${END_POINT.REGISTER.VERIFY_EMPLOYEE}?${q}`
  return axiosClient.put(uri, restBody, {
    headers: { ...getHeaderLanguage() }
  }).then((res) => res.data)
}

async function resendEmail(body) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.REGISTER.RESEND_EMAIL}`
  return axiosClient.put(uri, body, {
    headers: { ...getHeaderLanguage() }
  }).then((res) => res.data)
}

async function getMaintainNoticeAPI() {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.AUTH.MAINTAIN_NOTICE}`
  return axiosClient.get(uri).then(({ data }) => data)
}

async function logOut(userId) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.AUTH.LOG_OUT}`
  return axiosClient.post(uri, { userId }).then(({ res }) => res)
}

async function getThemeAPI({ params }) {
  const q = parseParamsToQueryString(params)
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.AUTH.GET_THEME}?${q}`
  return axiosClient.get(uri)
    .then(({ data }) => data)
}

export {
  verifyPassword,
  registerEmail,
  submitLogin,
  settingPassword,
  getEmailReset,
  verifyEmployee,
  registerEmployee,
  verifyCompany,
  registerCompany,
  resendEmail,
  getEmailFromToken,
  registerCompanyInfo,
  checkEmailCompanyExist,
  getMaintainNoticeAPI,
  getHeaderLanguage,
  logOut,
  getThemeAPI
}
