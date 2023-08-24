import axios from 'axios'
import AxiosClient from './api'
import END_POINT from './constants'

function uploadRecording(params, parentFolderId) {
  const q = new URLSearchParams({ ...params }).toString()
  return AxiosClient.post(`${END_POINT.RECORDING.UPLOAD}${parentFolderId}?${q}`)
    .then((res) => res)
}

async function uploadS3(url) {
  const config = {
    method: 'post',
    url: 'https://ox2nc9rty7.execute-api.ap-northeast-1.amazonaws.com/default/ConvertFileV2',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      url
    }
  }

  const response = await axios({
    ...config,
    timeout: 60000
  })
  return response.data
}

function getFolderRecording() {
  return AxiosClient.get(`${END_POINT.RECORDING.GET_FOLDER_RECORDING}`)
    .then((res) => res)
}

function checkExistFileName({ folderId, filename }) {
  const q = new URLSearchParams({ filename }).toString()

  return AxiosClient.get(`${END_POINT.RECORDING.CHECK_EXIST_FILE_NAME}/${folderId}?${q}`)
    .then((res) => res)
}

export {
  uploadRecording,
  getFolderRecording,
  checkExistFileName,
  uploadS3
}
