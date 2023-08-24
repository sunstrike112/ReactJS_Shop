import AxiosClient from './api'
import END_POINT from './constants'

function deleteByCsv(data) {
  return AxiosClient.post(END_POINT.USER.DELETE_BY_CSV, data)
    .then((res) => res.data.data)
}

function formatCSVDeleteToUTF8(file) {
  const formData = new FormData()
  formData.append(
    'file',
    file,
    file.name
  )
  return AxiosClient.post(END_POINT.USER.FORMAT_CSV_DELETE_TO_UTF8, formData)
    .then((res) => res.data.data)
}

export {
  deleteByCsv,
  formatCSVDeleteToUTF8
}
