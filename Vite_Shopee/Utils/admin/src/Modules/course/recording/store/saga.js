/* eslint-disable no-unused-vars */
import axios from 'axios'
import {
  put, takeLatest
} from 'redux-saga/effects'
import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import { getS3PresinedUrl, uploadRecording, getFolderRecording, checkExistFileName, uploadS3 } from 'APIs'
import {
  UPLOAD_RECORDING,
  FOLDER_RECORDING,
  CHECK_EXIST_FILENAME,
  UPLOAD_S3
} from './constants'

export function* uploadRecordingSaga({ payload }) {
  try {
    const { mediaBlob, parentFolderId, fileName } = payload
    const fileList = [{ fileName: 'recording_Video', fileType: 'mp4' }]

    const { data } = yield getS3PresinedUrl({ fileList })
    yield uploadRecording({
      filename: `${fileName}.mp4`,
      url: data[0].url,
      size: mediaBlob.size,
      folderParent: 'recording',
      fileType: 'mp4'
    }, parentFolderId)
    yield axios.put(data[0].preSignedURL, mediaBlob, {
      headers: { 'content-type': mediaBlob.type }
    })
    yield put({
      type: SUCCESS(UPLOAD_RECORDING)
    })
  } catch (error) {
    yield put({
      type: FAILURE(UPLOAD_RECORDING),
      error
    })
  }
}

export function* uploadS3Saga({ payload }) {
  try {
    const { mediaBlob } = payload
    const fileList = [{ fileName: 'recording_Video', fileType: 'mp4' }]

    const { data } = yield getS3PresinedUrl({ fileList })
    yield axios.put(data[0].preSignedURL, mediaBlob, {
      headers: { 'content-type': mediaBlob.type }
    })
    const dataUpload = yield uploadS3(data[0].url)
    yield put({
      type: SUCCESS(UPLOAD_S3),
      urlS3: dataUpload.url
    })
  } catch (error) {
    yield put({
      type: FAILURE(UPLOAD_S3),
      error
    })
  }
}

export function* getFolderRecordingSaga() {
  try {
    const { data } = yield getFolderRecording()
    yield put({
      type: SUCCESS(FOLDER_RECORDING),
      parentFolderId: data.data[0].fileId
    })
  } catch (error) {
    yield put({
      type: FAILURE(FOLDER_RECORDING),
      error
    })
  }
}

export function* checkExistFileNameSaga({ payload }) {
  try {
    const { data } = yield checkExistFileName(payload)
    yield put({ type: SUCCESS(CHECK_EXIST_FILENAME), isExistFileName: data.data })
  } catch (error) {
    yield put({
      type: FAILURE(CHECK_EXIST_FILENAME),
      error
    })
  }
}

export default function* recordingSaga() {
  yield takeLatest(REQUEST(UPLOAD_RECORDING), uploadRecordingSaga)
  yield takeLatest(REQUEST(FOLDER_RECORDING), getFolderRecordingSaga)
  yield takeLatest(REQUEST(CHECK_EXIST_FILENAME), checkExistFileNameSaga)
  yield takeLatest(REQUEST(UPLOAD_S3), uploadS3Saga)
}
