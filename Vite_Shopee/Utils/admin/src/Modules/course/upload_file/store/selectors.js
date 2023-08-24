/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */
import { UPLOAD_FILE_TYPE } from 'Constants/upload_file'
import { isEmpty } from 'lodash'
import i18next from 'i18next'

import { createSelector } from 'reselect'
import { normailizeFolderTree } from 'Utils'
import { initialState } from './reducer'

i18next.setDefaultNamespace('upload_file')

const selectUploadFile = (state) => state.uploadFile || initialState

const makeSelectUploadFile = () => createSelector(selectUploadFile, (state) => state)

const makeSelectFolderTree = () =>
  createSelector(selectUploadFile, (state) => {
    const { folderTree } = state
    if (!isEmpty(folderTree)) {
      return normailizeFolderTree(folderTree.childFolders)
    }
    return []
  })

const makeSelectFolderFiles = () =>
  createSelector(selectUploadFile, (state) => {
    const { folderFiles } = state
    if (!isEmpty(folderFiles)) {
      let { childFolders, childFiles } = folderFiles
      childFolders = childFolders.map((item) => ({
        ...item,
        fileName: item.keyFile ? i18next.t(`upload_file:${item.keyFile}`) : item.fileName,
        type: UPLOAD_FILE_TYPE.FOLDER
      }))
      childFiles = childFiles.map((item) => ({
        ...item,
        type: UPLOAD_FILE_TYPE.FILE,
        keyFile: folderFiles.keyFile
      }))
      return [...childFolders, ...childFiles]
    }
    return []
  })

export {
  selectUploadFile,
  makeSelectUploadFile,
  makeSelectFolderTree,
  makeSelectFolderFiles
}
