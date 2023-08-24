/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectTemplateManagement = (state) => state.templateManagement || initialState

const makeGetListTemplate = () => (
  createSelector(selectTemplateManagement, (state) => state)
)

const makeGetTemplateDetail = () => (
  createSelector(selectTemplateManagement, (state) => state)
)
export {
  makeGetListTemplate,
  makeGetTemplateDetail
}
