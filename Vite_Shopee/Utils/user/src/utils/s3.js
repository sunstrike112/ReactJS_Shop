import axios from 'axios'
import { PDF_DEV, PDF_PROD, PDF_STG, S3_DOMAIN, S3_PDF_DOMAIN } from '../constants'

const cancelTokenSourceList = []

export const downloadS3File = (item, cb = () => { }) => {
  const index = cancelTokenSourceList.findIndex((t) => t.key === item.id)
  if (index > -1) {
    cancelTokenSourceList[index].cancelTokenSource.cancel()
    cancelTokenSourceList.splice(index, 1)
  }
  const cancelTokenSource = axios.CancelToken.source()
  cancelTokenSourceList.push({ key: item.id, cancelTokenSource })
  axios.get(item.s3Path, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
    responseType: 'blob',
    cancelToken: cancelTokenSource.token,
    onDownloadProgress: (progressEvent) => {
      if (progressEvent.lengthComputable) {
        let percentComplete = +((progressEvent.loaded / progressEvent.total) * 100).toFixed(1)
        if (cb) {
          cb(percentComplete)
        }
      }
    }
  })
    .then((response) => {
      const url = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', item.fileName)
      document.body.appendChild(link)
      link.click()

      cb()
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
}

export const getFileFromS3 = (path) => {
  switch (true) {
    case !path:
      return null
    case (path.includes(S3_PDF_DOMAIN) || path.includes(PDF_DEV) || path.includes(PDF_STG) || path.includes(PDF_PROD) || path.includes(S3_DOMAIN)):
      return path
    default:
      return `${S3_DOMAIN}${path}`
  }
}
