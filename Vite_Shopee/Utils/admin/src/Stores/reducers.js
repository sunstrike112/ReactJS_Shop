/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import globalReducer from 'Modules/store/reducer'

export const history = createBrowserHistory()

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    global: globalReducer,
    ...injectedReducers
  })

  return rootReducer
}
