import { createSelector } from 'reselect'
import { initialState } from './reducers'

const selectProject = (state) => state.projectManager || initialState

const makeSelectProjects = () => createSelector(
  selectProject,
  (state) => state
)
export {
  makeSelectProjects,
  selectProject
}
