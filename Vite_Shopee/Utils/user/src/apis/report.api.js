import { parseParamsToQueryString } from '../utils'
import AxiosClient from './api'
import END_POINT from './constants'

async function getReport({ courseId, reportId }) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.REPORT.DETAIL({ courseId, reportId })
  return axiosClient.get(uri).then((res) => res.data)
}

async function countReport({ courseId, reportId }) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.REPORT.COUNT({ courseId, reportId })
  return axiosClient.get(uri).then((res) => res.data)
}

async function submitReport({ courseId, reportId, submitTestRequest, queryParams = {} }) {
  const axiosClient = new AxiosClient()
  const q = parseParamsToQueryString(queryParams)
  const uri = `${END_POINT.REPORT.SUBMIT({ courseId, reportId })}?${q}`
  return axiosClient.post(uri, submitTestRequest).then((res) => res.data)
}

export { getReport, submitReport, countReport }
