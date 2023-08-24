import { createSelector } from 'reselect'
import { initialState } from './reducers'

const selectVideoEditor = (state) => state.videoEditorStore || initialState

const makeSelectVideoEditors = () => createSelector(
  selectVideoEditor,
  (state) => state
)
export {
  makeSelectVideoEditors,
  selectVideoEditor
}
