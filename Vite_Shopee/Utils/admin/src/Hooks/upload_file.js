/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/course/upload_file/store/saga'
import reducer from 'Modules/course/upload_file/store/reducer'

import { useInjectSaga, useInjectReducer } from 'Stores'
import {
  getFolderTree,
  getFolderFiles,
  getDetailFolderFile,
  deleteFolderFiles,
  addNewFolder,
  updateFolderFile,
  searchFile,
  uploadFile,
  moveFile,
  resetState
} from 'Modules/course/upload_file/store/actions'
import {
  makeSelectUploadFile,
  makeSelectFolderTree,
  makeSelectFolderFiles
} from 'Modules/course/upload_file/store/selectors'

export const useUploadFile = () => {
  useInjectSaga({ key: 'uploadFile', saga })
  useInjectReducer({ key: 'uploadFile', reducer })

  const dispatch = useDispatch()

  const { folderFile, selectedFolderFile, isLoading, isSubmitting, error, isMoveFile } = useSelector(makeSelectUploadFile())
  const folderTree = useSelector(makeSelectFolderTree())
  const folderFiles = useSelector(makeSelectFolderFiles())

  const getFolderTreeAction = (payload) => dispatch(getFolderTree(payload))
  const getFolderFilesAction = (payload) => dispatch(getFolderFiles(payload))
  const getDetailFolderFileAction = (payload) => dispatch(getDetailFolderFile(payload))
  const deleteFolderFilesAction = (payload) => dispatch(deleteFolderFiles(payload))
  const addNewFolderAction = (payload) => dispatch(addNewFolder(payload))
  const updateFolderFileAction = (payload) => dispatch(updateFolderFile(payload))
  const searchFileAction = (payload) => dispatch(searchFile(payload))
  const uploadFileAction = (payload) => dispatch(uploadFile(payload))
  const moveFileToProjectAction = (payload) => dispatch(moveFile(payload))
  const resetStateAction = () => dispatch(resetState())

  return {
    folderTree,
    folderFiles,
    folderFile,
    selectedFolderFile,
    isLoading,
    isSubmitting,
    error,
    isMoveFile,
    getFolderTreeAction,
    getFolderFilesAction,
    getDetailFolderFileAction,
    deleteFolderFilesAction,
    addNewFolderAction,
    updateFolderFileAction,
    searchFileAction,
    uploadFileAction,
    moveFileToProjectAction,
    resetStateAction
  }
}
