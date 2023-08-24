/* eslint-disable no-unused-vars */
import { put, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'
import i18next from 'I18n'
import axios from 'axios'
import { mapMimeToExt } from 'Constants/upload_file'
import {
  getListProject,
  deleteProject,
  createProject,
  getS3PresinedUrl,
  publishProject,
  checkExistProjectName
} from 'APIs'
import { FAILURE, REQUEST, SUCCESS } from 'Stores'
import { repoLoadingError } from 'Modules/video_editor/project_list/store/reducers'
import {
  DELETE_PROJECT,
  LOAD_LIST_PROJECT,
  CREATE_PROJECT,
  LINK_FILE_TO_PROJECT,
  PUBLISH_PROJECT
} from './constants'

i18next.loadNamespaces(['common'])

export function* loadListProjectSaga({ payload }) {
  try {
    const { data } = yield getListProject(payload)
    const { result: listProject, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_LIST_PROJECT),
      payload: {
        listProject,
        pagination,
        filter: payload?.params?.filter
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_LIST_PROJECT),
      error
    })
  }
}

export function* deleteProjectSaga({ payload }) {
  try {
    const { code } = yield deleteProject(payload)
    if (code === 200) {
      yield put({
        type: REQUEST(LOAD_LIST_PROJECT),
        payload: {
          params: {
            limit: 100,
            page: 1
          }
        }
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* createProjectSaga({ payload }) {
  const { file, projectName } = payload
  try {
    const fileType = mapMimeToExt[file.type]
    const fileList = [{ fileName: file.name, fileType }]
    const config = {
      headers: { 'content-type': file.type }
    }
    const { data } = yield getS3PresinedUrl({ fileList })
    yield axios.put(data[0].preSignedURL, file, config)

    const { code } = yield createProject({ projectName, filePath: data[0].url, fileType })
    if (code === 200) {
      yield put({
        type: REQUEST(LOAD_LIST_PROJECT),
        payload: {
          params: {
            limit: 100,
            page: 1
          }
        }
      })
      yield put({
        type: SUCCESS(CREATE_PROJECT)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_PROJECT),
      error
    })
  }
}

export function* linkFileToProjectSaga({ payload }) {
  const { filePath, projectName, fileId } = payload
  try {
    yield checkExistProjectName({ projectName, fileId })
    const { code } = yield createProject({ projectName, filePath, fileId })
    if (code === 200) {
      yield put({
        type: SUCCESS(LINK_FILE_TO_PROJECT)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
      yield put({
        type: REQUEST(LOAD_LIST_PROJECT),
        payload: {
          params: {
            limit: 100,
            page: 1
          }
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LINK_FILE_TO_PROJECT),
      error
    })
  }
}

export function* publishProjectSaga({ payload }) {
  try {
    const { code } = yield publishProject(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(PUBLISH_PROJECT)
      })

      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(PUBLISH_PROJECT),
      error
    })
  }
}

export default function* listProjectSaga() {
  yield takeLatest(REQUEST(LOAD_LIST_PROJECT), loadListProjectSaga)
  yield takeLatest(REQUEST(DELETE_PROJECT), deleteProjectSaga)
  yield takeLatest(REQUEST(CREATE_PROJECT), createProjectSaga)
  yield takeLatest(REQUEST(LINK_FILE_TO_PROJECT), linkFileToProjectSaga)
  yield takeLatest(REQUEST(PUBLISH_PROJECT), publishProjectSaga)
}
