import AxiosClient from './api'
import END_POINT from './constants'

async function getSeminarList() {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.SEMINAR}/list`
  return axiosClient.get(uri).then((res) => res.data)
}

async function getSeminarDetail(seminarId) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.SEMINAR}/${seminarId}/detail`
  return axiosClient.get(uri).then((res) => res.data)
}
export {
  getSeminarList,
  getSeminarDetail
}
