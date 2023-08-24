import AxiosClient from './api'
import END_POINT from './constants'

function getProfile({ userId }) {
  return AxiosClient.get(`${END_POINT.PROFILE_USER}?userId=${userId}`)
    .then((res) => res)
}

function logOut(userId) {
  return AxiosClient.post(`${END_POINT.USER.LOG_OUT}`, { userId })
    .then((res) => res)
}

export {
  getProfile,
  logOut
}
