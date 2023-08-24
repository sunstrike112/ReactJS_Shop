import AxiosClient from './api'
import END_POINT from './constants'

async function getListPlanPackage(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params }).toString()
  const uri = `${END_POINT.PLAN_PACKAGE.LIST}?${q}`
  return axiosClient.get(uri).then((res) => res.data)
}

async function checkOverSizeAPI({ totalSize }) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.PLAN_PACKAGE.CHECK_OVERSIZE({ totalSize })
  return axiosClient.put(uri).then((res) => res.data)
}

export { getListPlanPackage, checkOverSizeAPI }
