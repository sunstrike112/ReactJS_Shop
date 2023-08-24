import { parseParamsToQueryString } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function getAutocompleteCourse(params) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.AUTOCOMPLETE.SEARCH_COURSE}?${q}`)
    .then((res) => res)
}

export {
  getAutocompleteCourse
}
