import AxiosClient from './api'
import END_POINT from './constants'

function getSettingMobileDetailApi() {
  const url = END_POINT.SETTING_MOBILE.GET_DETAIL
  return AxiosClient.get(url).then((res) => res.data)
}

function updateSettingMobileApi(data) {
  const url = END_POINT.SETTING_MOBILE.UPDATE
  return AxiosClient.post(url, data)
    .then((res) => res.data)
}

export {
  getSettingMobileDetailApi,
  updateSettingMobileApi
}
