/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { isEmpty } from 'lodash'
import { createSelector } from 'reselect'
import { normailizeListCategoryTree } from 'Utils'
import { initialState } from './reducer'

const selectIssuePermission = state => state.issuePermission || initialState

const makeSelectIssuePermission = () =>
  createSelector(
    selectIssuePermission,
    state => state
  )

const makeListCategoryCompany = () =>
  createSelector(selectIssuePermission, (state) => {
    const { listCategory: { data } } = state
    if (!isEmpty(data)) {
      return normailizeListCategoryTree(data.categoryCompany)
    }
    return []
  })

const makeListCategoryNissoken = () =>
  createSelector(selectIssuePermission, (state) => {
    const { listCategory: { data } } = state
    if (!isEmpty(data)) {
      return normailizeListCategoryTree(data.categoryNissoken)
    }
    return []
  })

export {
  selectIssuePermission,
  makeSelectIssuePermission,
  makeListCategoryCompany,
  makeListCategoryNissoken
}
