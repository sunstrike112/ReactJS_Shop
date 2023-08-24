import { parseParamsToQueryString } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function loadDomainsAPI({ params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.SETTING_DOMAIN.LOAD_DOMAINS}?${q}`)
    .then(({ data }) => data)
}

function addDomainAPI({ data }) {
  return AxiosClient.put(END_POINT.SETTING_DOMAIN.ADD_DOMAIN, data)
    .then((res) => res.data)
}

function deleteDomainAPI({ data }) {
  return AxiosClient.put(END_POINT.SETTING_DOMAIN.DELETE_DOMAIN, data)
    .then((res) => res.data)
}

export {
  loadDomainsAPI,
  addDomainAPI,
  deleteDomainAPI
}
