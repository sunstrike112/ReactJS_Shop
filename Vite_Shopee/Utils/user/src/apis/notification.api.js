import AxiosClient from './api'
import END_POINT from './constants'

async function getListNotification(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params }).toString()
  const uri = `${END_POINT.NOTIFICATION.LIST}?${q}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getNotificationDetail(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params }).toString()
  const uri = `${END_POINT.NOTIFICATION.DETAIL}?${q}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getNotificationUnread(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params }).toString()
  const uri = `${END_POINT.NOTIFICATION.UNREAD}?${q}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function deleteNotification(ids) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.NOTIFICATION.DELETE}?ids=${ids}`
  return axiosClient.delete(uri)
    .then((res) => res.data)
}

export {
  getListNotification,
  getNotificationDetail,
  getNotificationUnread,
  deleteNotification
}
