import AxiosClient from './api'
import END_POINT from './constants'

const { parseParamsToQueryString, openDownloadLink } = require('Utils')

function downloadUnitLearnCourseResultCSV({ data, params }) {
  const q = parseParamsToQueryString(params)

  return AxiosClient.download(`${END_POINT.COURSE_RESULT.DOWNLOAD_UNIT_LEARN_COURSE_RESULT_CSV}?${q}`, {
    method: 'POST'
  }, data).then(async (response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]))
    openDownloadLink({
      url, filename: 'unit-result.csv'
    })
  })
}

export {
  downloadUnitLearnCourseResultCSV
}
