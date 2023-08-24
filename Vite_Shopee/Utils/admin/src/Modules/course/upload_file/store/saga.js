import { put, takeLatest, select } from 'redux-saga/effects'
import { notification } from 'antd'
import i18next from 'I18n'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  getFolderTreeAPI,
  getFolderFilesAPI,
  getFolderFileAPI,
  deleteFolderFilesAPI,
  updateFolderFileAPI,
  uploadFileAPI,
  addNewFolderAPI,
  searchFileAPI,
  moveFile
} from 'APIs'

import { ERROR_MESSAGE, findDeepFolderTree } from 'Utils'
import {
  GET_FOLDER_TREE,
  GET_LIST_FOLDER_FILE,
  GET_DETAIL_FOLDER_FILE,
  DELETE_LIST_FOLDER_FILE,
  ADD_NEW_FOLDER,
  UPDATE_FOLDER_FILE,
  UPLOAD_FILE,
  SEARCH_FILE,
  MOVE_FILE
} from './constants'
import { makeSelectUploadFile, makeSelectFolderTree } from './selectors'

i18next.loadNamespaces(['common'])

export function* getFolderTreeSaga({ payload }) {
  try {
    const { code, data: folderTree } = yield getFolderTreeAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_FOLDER_TREE),
        folderTree
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_FOLDER_TREE),
      error
    })
  }
}

export function* getFolderFilesSaga({ payload }) {
  try {
    const { params } = payload
    let { folderId } = params
    const { code, data: folderFiles } = yield getFolderFilesAPI({ folderId })
    if (code === 200) {
      const folderTree = yield select(makeSelectFolderTree())
      const selectedFolderFile = folderId ? findDeepFolderTree(folderTree, folderId) || {} : {}
      yield put({
        type: SUCCESS(GET_LIST_FOLDER_FILE),
        folderFiles,
        selectedFolderFile
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_LIST_FOLDER_FILE),
      error
    })
  }
}

export function* getFolderFileSaga({ payload }) {
  try {
    const { code, data: folderFile } = yield getFolderFileAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_DETAIL_FOLDER_FILE),
        folderFile
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_DETAIL_FOLDER_FILE),
      error
    })
  }
}

export function* deleteFolderFilesSaga({ payload }) {
  try {
    const { callback } = payload
    const { code } = yield deleteFolderFilesAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_LIST_FOLDER_FILE)
      })
      const { selectedFolderFile } = yield select(makeSelectUploadFile())
      yield put({
        type: REQUEST(GET_FOLDER_TREE),
        payload: {}
      })
      yield put({
        type: REQUEST(GET_LIST_FOLDER_FILE),
        payload: { params: { folderId: selectedFolderFile.id } }
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_LIST_FOLDER_FILE),
      error
    })
  }
}

export function* addNewFolderSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield addNewFolderAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(ADD_NEW_FOLDER)
      })

      const { selectedFolderFile } = yield select(makeSelectUploadFile())
      yield put({
        type: REQUEST(GET_FOLDER_TREE),
        payload: {}
      })
      yield put({
        type: REQUEST(GET_LIST_FOLDER_FILE),
        payload: { params: { folderId: selectedFolderFile?.data?.id } }
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
      type: FAILURE(ADD_NEW_FOLDER),
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
        type: SUCCESS(UPDATE_FOLDER_FILE)
      })
      const { selectedFolderFile } = yield select(makeSelectUploadFile())
      yield put({
        type: REQUEST(GET_FOLDER_TREE),
        payload: {}
      })
      yield put({
        type: REQUEST(GET_LIST_FOLDER_FILE),
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
      type: FAILURE(UPDATE_FOLDER_FILE),
      error
    })
  }
}

export function* searchFileSaga({ payload }) {
  try {
    const { code, data } = yield searchFileAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(SEARCH_FILE),
        folderFiles: {
          childFiles: data.listFile,
          childFolders: []
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(SEARCH_FILE),
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
        type: SUCCESS(UPLOAD_FILE)
      })
      const { selectedFolderFile } = yield select(makeSelectUploadFile())
      yield put({
        type: REQUEST(GET_FOLDER_TREE),
        payload: {}
      })
      yield put({
        type: REQUEST(GET_LIST_FOLDER_FILE),
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
      type: FAILURE(UPLOAD_FILE),
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
        type: SUCCESS(MOVE_FILE)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.upload_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(MOVE_FILE),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(GET_FOLDER_TREE), getFolderTreeSaga)
  yield takeLatest(REQUEST(GET_LIST_FOLDER_FILE), getFolderFilesSaga)
  yield takeLatest(REQUEST(GET_DETAIL_FOLDER_FILE), getFolderFileSaga)
  yield takeLatest(REQUEST(DELETE_LIST_FOLDER_FILE), deleteFolderFilesSaga)
  yield takeLatest(REQUEST(ADD_NEW_FOLDER), addNewFolderSaga)
  yield takeLatest(REQUEST(UPDATE_FOLDER_FILE), updateFolderFileSaga)
  yield takeLatest(REQUEST(SEARCH_FILE), searchFileSaga)
  yield takeLatest(REQUEST(UPLOAD_FILE), uploadFileSaga)
  yield takeLatest(REQUEST(MOVE_FILE), moveFileSaga)
}
