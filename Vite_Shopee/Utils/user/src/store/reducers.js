/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import globalStore from '../routes/store/reducer'
import courseStore from '../modules/course/store/reducer'
import myPageStore from '../modules/mypage/store/reducer'
import authStore from '../modules/auth/store/reducer'

export const history = createBrowserHistory()

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    globalStore,
    courseStore,
    myPageStore,
    authStore,
    ...injectedReducers
  })

  return rootReducer
}
