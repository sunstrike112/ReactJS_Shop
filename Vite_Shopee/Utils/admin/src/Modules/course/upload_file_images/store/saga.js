import { put, takeLatest, select } from 'redux-saga/effects'
import { notification } from 'antd'
import i18next from 'I18n'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  getFolderFilesImageAPI,
  getFolderFileAPI,
  deleteFolderFilesImageAPI,
  updateFolderFileAPI,
  uploadFileAPI,
  addNewFolderImageAPI,
  searchFileAPI,
  moveFile,
  getFolderTreeImageApi,
  uploadFilesAPI
} from 'APIs'

import { ERROR_MESSAGE, findDeepFolderTree } from 'Utils'
import {
  GET_FOLDER_TREE_IMAGE,
  GET_LIST_FOLDER_FILE_IMAGE,
  GET_DETAIL_FOLDER_FILE_IMAGE,
  DELETE_LIST_FOLDER_FILE_IMAGE,
  ADD_NEW_FOLDER_IMAGE,
  UPDATE_FOLDER_FILE_IMAGE,
  UPLOAD_FILE_IMAGE,
  SEARCH_FILE_IMAGE,
  MOVE_FILE_IMAGE,
  UPLOAD_FILES_IMAGE
} from './constants'
import { makeSelectUploadFile, makeSelectFolderTree } from './selectors'

i18next.loadNamespaces(['common'])

export function* getFolderTreeSaga({ payload }) {
  try {
    const { code, data: folderTree } = yield getFolderTreeImageApi(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_FOLDER_TREE_IMAGE),
        folderTree
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_FOLDER_TREE_IMAGE),
      error
    })
  }
}

export function* getFolderFilesSaga({ payload }) {
  try {
    const { params } = payload
    let { folderId } = params
    const { code, data: folderFiles } = yield getFolderFilesImageAPI({ folderId })
    if (code === 200) {
      const folderTree = yield select(makeSelectFolderTree())
      const selectedFolderFile = folderId ? findDeepFolderTree(folderTree, folderId) || {} : {}
      yield put({
        type: SUCCESS(GET_LIST_FOLDER_FILE_IMAGE),
        folderFiles,
        selectedFolderFile
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_LIST_FOLDER_FILE_IMAGE),
      error
    })
  }
}

export function* getFolderFileSaga({ payload }) {
  try {
    const { code, data: folderFile } = yield getFolderFileAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_DETAIL_FOLDER_FILE_IMAGE),
        folderFile
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_DETAIL_FOLDER_FILE_IMAGE),
      error
    })
  }
}

export function* deleteFolderFilesSaga({ payload }) {
  try {
    const { callback, data } = payload
    const { code } = yield deleteFolderFilesImageAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_LIST_FOLDER_FILE_IMAGE)
      })
      const { selectedFolderFile } = yield select(makeSelectUploadFile())
      yield put({
        type: REQUEST(GET_FOLDER_TREE_IMAGE),
        payload: {}
      })

      if (!data.ids.includes(selectedFolderFile.data ? selectedFolderFile.data.id : selectedFolderFile.id)) {
        yield put({
          type: REQUEST(GET_LIST_FOLDER_FILE_IMAGE),
          payload: { params: { folderId: selectedFolderFile.data ? selectedFolderFile.data.id : 0 } }
        })
      }
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_LIST_FOLDER_FILE_IMAGE),
      error
    })
  }
}

export function* addNewFolderSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield addNewFolderImageAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(ADD_NEW_FOLDER_IMAGE)
      })
      yield put({
        type: REQUEST(GET_FOLDER_TREE_IMAGE),
        payload: {}
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(ADD_NEW_FOLDER_IMAGE),
      error
    })
  }
}

export function* updateFolderFileSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield updateFolderFileAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(UPDATE_FOLDER_FILE_IMAGE)
      })
      const { selectedFolderFile } = yield select(makeSelectUploadFile())
      yield put({
        type: REQUEST(GET_FOLDER_TREE_IMAGE),
        payload: {}
      })
      yield put({
        type: REQUEST(GET_LIST_FOLDER_FILE_IMAGE),
        payload: { params: { folderId: selectedFolderFile.data ? selectedFolderFile.data.id : selectedFolderFile.id } }
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_FOLDER_FILE_IMAGE),
      error
    })
  }
}

export function* searchFileSaga({ payload }) {
  try {
    const { code, data } = yield searchFileAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(SEARCH_FILE_IMAGE),
        folderFiles: {
          childFiles: data.listFile,
          childFolders: []
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(SEARCH_FILE_IMAGE),
      error
    })
  }
}

export function* uploadFileSaga({ payload }) {
  try {
    const { callback } = payload
    const { code, error } = yield uploadFileAPI(payload)
    if (error === ERROR_MESSAGE.ERROR_NUMBER_DATA_OVER_PLAN_PACKAGE) {
      callback()
    }
    if (code === 200) {
      yield put({
        type: SUCCESS(UPLOAD_FILE_IMAGE)
      })
      const { selectedFolderFile } = yield select(makeSelectUploadFile())
      yield put({
        type: REQUEST(GET_FOLDER_TREE_IMAGE),
        payload: {}
      })
      yield put({
        type: REQUEST(GET_LIST_FOLDER_FILE_IMAGE),
        payload: { params: { folderId: selectedFolderFile.data?.id } }
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.upload_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPLOAD_FILE_IMAGE),
      error
    })
  }
}

export function* moveFileSaga({ payload }) {
  const { folderId, fileId, fileName, folderParent } = payload
  try {
    const { code } = yield moveFile({ folderId, fileId, fileName, folderParent })
    if (code === 200) {
      yield put({
        type: SUCCESS(MOVE_FILE_IMAGE)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.upload_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(MOVE_FILE_IMAGE),
      error
    })
  }
}

export function* uploadFilesSaga({ payload }) {
  try {
    const { callback } = payload
    const { code, data: filesUpload, error } = yield uploadFilesAPI(payload)
    if (error === ERROR_MESSAGE.ERROR_NUMBER_DATA_OVER_PLAN_PACKAGE) {
      callback()
    }
    if (code === 200) {
      yield put({
        type: SUCCESS(UPLOAD_FILES_IMAGE),
        filesUpload
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.upload_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPLOAD_FILES_IMAGE),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(GET_FOLDER_TREE_IMAGE), getFolderTreeSaga)
  yield takeLatest(REQUEST(GET_LIST_FOLDER_FILE_IMAGE), getFolderFilesSaga)
  yield takeLatest(REQUEST(GET_DETAIL_FOLDER_FILE_IMAGE), getFolderFileSaga)
  yield takeLatest(REQUEST(DELETE_LIST_FOLDER_FILE_IMAGE), deleteFolderFilesSaga)
  yield takeLatest(REQUEST(ADD_NEW_FOLDER_IMAGE), addNewFolderSaga)
  yield takeLatest(REQUEST(UPDATE_FOLDER_FILE_IMAGE), updateFolderFileSaga)
  yield takeLatest(REQUEST(SEARCH_FILE_IMAGE), searchFileSaga)
  yield takeLatest(REQUEST(UPLOAD_FILE_IMAGE), uploadFileSaga)
  yield takeLatest(REQUEST(MOVE_FILE_IMAGE), moveFileSaga)
  yield takeLatest(REQUEST(UPLOAD_FILES_IMAGE), uploadFilesSaga)
}
