import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectUploadSubtitle = (state) => state.uploadSubTitle || initialState

const makeSelectUploadSubtitle = () => createSelector(selectUploadSubtitle, (state) => state)

export {
  selectUploadSubtitle,
  makeSelectUploadSubtitle
}
