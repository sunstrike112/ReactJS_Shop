import AxiosClient from './api'
import END_POINT from './constants'

function getS3PresignedUrl({ fileList }) {
  const axiosClient = new AxiosClient()
  const url = `${END_POINT.PRE_SIGN}`
  return axiosClient.post(url, fileList)
    .then(({ data }) => data)
}

export { getS3PresignedUrl }
