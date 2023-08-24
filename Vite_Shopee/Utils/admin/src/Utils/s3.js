import axios from 'axios'
import { S3_BUCKET_NAME, S3_BUCKET_PDF_NAME, VIDEO_TYPE, mapMimeToExt } from 'Constants'
import { completeUpLoadFileApi, getS3PresinedUrl, getUploadIdFromS3Api } from 'APIs'
import { getFileFromS3 } from './utils'

const cancelTokenSourceList = []

export const getFileInfoS3 = (s3url) => {
  let fileName = s3url.substr(0, s3url.lastIndexOf('_'))
  fileName = fileName.substring(fileName.lastIndexOf('/') + 1)
  fileName = decodeURIComponent(fileName)
  return fileName
}

export const downloadS3File = (item, cb = () => { }) => {
  const index = cancelTokenSourceList.findIndex((t) => t.key === item.id)
  if (index > -1) {
    cancelTokenSourceList[index].cancelTokenSource.cancel()
    cancelTokenSourceList.splice(index, 1)
  }
  const cancelTokenSource = axios.CancelToken.source()
  cancelTokenSourceList.push({ key: item.id, cancelTokenSource })
  axios.get(getFileFromS3(item.s3Path), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
    responseType: 'blob',
    cancelToken: cancelTokenSource.token,
    onDownloadProgress: (progressEvent) => {
      if (progressEvent.lengthComputable) {
        let percentComplete = +((progressEvent.loaded / progressEvent.total) * 100).toFixed(1)
        const progressElm = document.getElementById(item.id)
        progressElm.style.display = 'block'
        const progressBg = progressElm.querySelector('.ant-progress-bg')
        const progressText = progressElm.querySelector('.ant-progress-text')
        progressBg.style.width = `${percentComplete}%`
        progressText.innerText = `${percentComplete}%`
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
      const progressElm = document.getElementById(item.id)
      progressElm.style.display = 'none'
      cb()
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
}

export const downloadOctetFile = (item) => {
  axios.get(`${item.baseUrl}${item.fileName}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Cache-Control': 'max-age=604800'
    },
    responseType: 'blob'
  })
    .then((response) => {
      const url = window.URL.createObjectURL(response.data)
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.href = url
      a.download = item.fileName
      a.click()
      window.URL.revokeObjectURL(url)
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
}

const chunkFile = (file, chunkSize) => {
  const chunks = []
  let start = 0
  let end = chunkSize

  while (start < file.size) {
    const chunk = file.slice(start, end)
    chunks.push(chunk)
    start = end
    end = start + chunkSize
  }

  return chunks
}

export const handleUploadFileByChunk = async (file) => {
  const fileExtension = mapMimeToExt[file.type]
  const fileList = [{ fileName: file.name, fileType: fileExtension }]
  const { data } = await getS3PresinedUrl({ fileList })
  let bucketName = S3_BUCKET_NAME

  const config = {
    headers: { 'content-type': file.type }
  }

  const isVideoFile = VIDEO_TYPE.includes(file.type)
  const isMp4File5GB = ['video/mp4'].includes(file.type) && (file.size > (4.9 * 1024 * 1024 * 1024)) // file is mp4 and > 4,9GB
  const isPdfFile = data[0].url.includes(S3_BUCKET_PDF_NAME)

  if (isPdfFile) {
    bucketName = S3_BUCKET_PDF_NAME
  }

  const splitUrl = data[0].url.split('/')
  const lastPathOfUrl = splitUrl[splitUrl.length - 1]
  const objectKey = isMp4File5GB ? `mediaconvert/${lastPathOfUrl}` : lastPathOfUrl
  const chunkSize = 100 * 1024 * 1024 // 100 MB
  const chunks = chunkFile(file, chunkSize)

  const partETags = []

  const { data: { uploadId, parts } } = await getUploadIdFromS3Api({ bucketName, keyName: objectKey, parts: chunks.length })

  for (let i = 0; i < parts.length; i += 1) {
    const partNumber = i + 1
    // eslint-disable-next-line no-await-in-loop
    const result = await axios.put(parts[i].url, chunks[i], config)
    const etag = result.headers.etag.replaceAll('"', '')
    partETags.push({ partNumber, etag })
  }

  const { data: { location } } = await completeUpLoadFileApi({ data: { bucketName, key: objectKey, partETags, uploadId } })

  const splitLocationBySLash = location.split('/')
  const lastPathOfLocation = splitLocationBySLash[splitLocationBySLash.length - 1]
  const slashEndCode = '%2F'
  let result

  switch (true) {
    case isMp4File5GB: {
      const lastPathWithoutMediaconvertAndSlashEndCode = lastPathOfLocation.split(slashEndCode).pop()
      const newSplitLocationBySLash = [...splitLocationBySLash]
      newSplitLocationBySLash.splice(splitLocationBySLash.length - 1, 1, 'mediaconvert', lastPathWithoutMediaconvertAndSlashEndCode)
      result = newSplitLocationBySLash.join('/')
      break
    }
    case isVideoFile: {
      const newSplitLocationBySLash = [...splitLocationBySLash]
      newSplitLocationBySLash.splice(splitLocationBySLash.length - 1, 1, 'mediaconvert', lastPathOfLocation)
      result = newSplitLocationBySLash.join('/')
      break
    }
    default: {
      result = location
    }
  }

  return result
}
