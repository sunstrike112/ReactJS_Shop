/* eslint-disable symbol-description */
import axios from 'axios'
import JSONBig from 'json-bigint'
import { notification } from 'antd'
import i18next from 'i18next'

import { isEmpty, assign } from 'lodash'
import { BASE_API_URL, ERROR_MESSAGE_API, QUERY } from '../constants'
import { STORAGE, getLocalStorage } from '../utils'
import { store } from '../index'

export const MAINTENANCE = 'Maintainance'
export const ERROR_MESSAGE_SERAKU_REGEX = /^E.*:.*/g

class AxiosClient {
  constructor() {
    const userToken = getLocalStorage(STORAGE.USER_TOKEN)
    const headers = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'mobile': '?0'
    }
    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`
    }

    this.axiosClient = axios.create({
      baseURL: BASE_API_URL,
      headers,
      timeout: 30000
    })

    this.getExistTokenOnLocalStorage()

    this.axiosClient.defaults.transformResponse = (data) => JSONBig.parse(data)

    this.axiosClient.interceptors.request.use(
      (configure) => configure,
      (error) => Promise.reject(error)
    )

    this.axiosClient.interceptors.response.use(
      (response) => {
        const { status, data, config } = response
        if (data.message === MAINTENANCE) {
          store.dispatch({
            type: '@APP/SHOW_MAINTAIN_NOTICE',
            isMaintainNotice: true
          })
        }
        if (config.url.includes('authentication/external/login')) {
          this.setHeader(data.data.accessToken)
        }
        return {
          status,
          data
        }
      },
      (error) => {
        if (error.response) {
          const { data, status } = error.response
          const transformError = {
            type: data.error,
            status: data.code,
            message: data.message
          }
          if (ERROR_MESSAGE_API.includes(data.error)) {
            notification.error({
              message: i18next.t('common.error'),
              description: i18next.t(`errors.${data.error}`),
              duration: 2
            })
          }
          if (data.error.match(ERROR_MESSAGE_SERAKU_REGEX)) {
            notification.error({
              message: i18next.t('common.error'),
              description: data.error,
              duration: 2
            })
          }
          if (data.error === 'ERROR_USER_EXPIRED_TRIAL') {
            store.dispatch({ type: '@PROFILE/TRIAL_EXPIRED' })
          }
          if (data.error === 'ERROR_COMPANY_HAS_CANCELLATION') {
            store.dispatch({ type: '@PROFILE/ERROR_COMPANY_HAS_CANCELLATION' })
          }
          if (data.error === 'ERROR_USER_EXPIRED_PAYMENT') {
            store.dispatch({ type: '@PROFILE/PAYMENT_EXPIRED' })
          }
          if (data.message === MAINTENANCE) {
            store.dispatch({
              type: '@APP/SHOW_MAINTAIN_NOTICE',
              isMaintainNotice: true
            })
          }
          if (status === 401) {
            store.dispatch({ type: '@AUTH/LOGOUT_REQUEST' })
          }
          throw transformError
        } else {
          throw error
        }
      }
    )
  }

  static get instance() {
    if (!this.axiosClientInstance) {
      this.axiosClientInstance = new AxiosClient()
    }

    return this.axiosClientInstance
  }

  async getExistTokenOnLocalStorage() {
    const userToken = await getLocalStorage(STORAGE.USER_TOKEN)
    if (userToken) {
      this.setHeader(userToken)
    }
  }

  setHeader = async (userToken = null) => {
    this.axiosClient.defaults.headers.Authorization = `Bearer ${userToken}`
  }

  setWorkspaceId = () => {
    const params = (new URL(window.document.location)).searchParams
    return params.get(QUERY.WORKSPACE_ID) || ''
  }

  get = async (resource, slug = '', config = {}) => {
    const requestURL = isEmpty(slug) ? `${resource}` : `${resource}/${slug}`

    let { headers } = config
    if (!headers) {
      headers = this.axiosClient.defaults.headers
    } else {
      headers = { ...this.axiosClient.defaults.headers, ...headers }
    }

    const workspaceid = this.setWorkspaceId()
    const headerConfig = workspaceid ? { ...headers, workspaceid } : headers
    return this.axiosClient.get(requestURL, {
      ...assign({ headers: headerConfig }, config)
    })
  }

  post = async (resource, data, config = {}) => {
    let { headers } = config
    if (!headers) {
      headers = this.axiosClient.defaults.headers
    } else {
      headers = { ...this.axiosClient.defaults.headers, ...headers }
    }
    const workspaceid = this.setWorkspaceId()
    const headerConfig = workspaceid ? { ...headers, workspaceid } : headers
    return this.axiosClient.post(`${resource}`, data, assign(config, { headers: headerConfig }))
  }

  update = async (resource, data, config = {}) => {
    let { headers } = config
    if (!headers) {
      headers = this.axiosClient.defaults.headers
    } else {
      headers = { ...this.axiosClient.defaults.headers, ...headers }
    }
    const workspaceid = this.setWorkspaceId()
    const headerConfig = workspaceid ? { ...headers, workspaceid } : headers
    return this.axiosClient.put(`${resource}`, data, assign(config, { headers: headerConfig }))
  }

  put = async (resource, data, config = {}) => {
    let { headers } = config
    if (!headers) {
      headers = this.axiosClient.defaults.headers
    } else {
      headers = { ...this.axiosClient.defaults.headers, ...headers }
    }
    const workspaceid = this.setWorkspaceId()
    const headerConfig = workspaceid ? { ...headers, workspaceid } : headers
    return this.axiosClient.put(`${resource}`, data, assign(config, { headers: headerConfig }))
  }

  patch = async (resource, data, config = {}) => {
    let { headers } = config
    if (!headers) {
      headers = this.axiosClient.defaults.headers
    } else {
      headers = { ...this.axiosClient.defaults.headers, ...headers }
    }
    const workspaceid = this.setWorkspaceId()
    const headerConfig = workspaceid ? { ...headers, workspaceid } : headers
    return this.axiosClient.patch(`${resource}`, data, assign(config, { headers: headerConfig }))
  }

  delete = async (resource, data, config = {}) => {
    let { headers } = config
    if (!headers) {
      headers = this.axiosClient.defaults.headers
    } else {
      headers = { ...this.axiosClient.defaults.headers, ...headers }
    }
    const workspaceid = this.setWorkspaceId()
    const headerConfig = workspaceid ? { ...headers, workspaceid } : headers
    return this.axiosClient.delete(`${resource}`, { data, ...assign({ headers: headerConfig }, config) })
  }
}

export default AxiosClient
