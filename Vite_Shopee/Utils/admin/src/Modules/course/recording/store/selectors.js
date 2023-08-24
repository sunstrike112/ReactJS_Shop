/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectRecording = state => state.recording || initialState

const makeSelectError = () =>
  createSelector(
    selectRecording,
    state => state.error
  )

const makeSelectUploadSuccess = () =>
  createSelector(
    selectRecording,
    state => state.isUploadSuccess
  )

const makeParentFolderId = () =>
  createSelector(
    selectRecording,
    state => state.parentFolderId
  )

const makeSelectLoading = () =>
  createSelector(
    selectRecording,
    state => state.isLoading
  )

const makeSelectIsExistFileName = () =>
  createSelector(
    selectRecording,
    state => state.isExistFileName
  )

const makeSelectUrlS3 = () =>
  createSelector(
    selectRecording,
    state => state.urlS3
  )
export {
  selectRecording,
  makeSelectError,
  makeSelectUploadSuccess,
  makeSelectLoading,
  makeParentFolderId,
  makeSelectIsExistFileName,
  makeSelectUrlS3
}
