import AxiosClient from './api'
import END_POINT from './constants'

function getEmailServerAPI({ companyId }) {
  return AxiosClient.get(END_POINT.SETTING_MAIL_SERVER.GET_EMAIL_SERVER({ companyId }))
    .then(({ data }) => data)
}

function updateEmailServerAPI({ data }) {
  return AxiosClient.put(END_POINT.SETTING_MAIL_SERVER.UPDATE_EMAIL_SERVER, data)
    .then((res) => res.data)
}

export {
  getEmailServerAPI,
  updateEmailServerAPI
}
