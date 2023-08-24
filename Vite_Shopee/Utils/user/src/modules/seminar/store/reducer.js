/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 * @param  {state} login state
 * @param  {action} login action
 */
import { createReducer, updateObject } from '../../../store'
import {
  LOAD_SEMINAR_LIST,
  LOAD_SEMINAR_LIST_SUCCESS,
  LOAD_REPOS_ERROR,
  LOAD_SEMINAR_DETAIL,
  LOAD_SEMINAR_DETAIL_SUCCESS,
  REMOVE_SEMINAR_DETAIL,
  IS_HAVE_DATA
} from './constants'

export const initialState = {
  seminars: {
    isLoading: false,
    data: [],
    error: null
  },
  seminar: {
    isLoading: false,
    data: null,
    error: null
  },
  error: null,
  isHaveData: false
}

function loadSeminars(state) {
  return updateObject(state, {
    seminars: {
      ...state.seminars,
      isLoading: true
    }
  })
}

function loadSeminarsSuccess(state, { data }) {
  return updateObject(state, {
    seminars: {
      ...state.seminars,
      data: data || [],
      isLoading: false
    }
  })
}

function loadSeminarDetail(state) {
  return updateObject(state, {
    seminar: {
      ...state.seminar,
      isLoading: true
    }
  })
}

function loadSeminarDetailSuccess(state, { data }) {
  return updateObject(state, {
    seminar: {
      ...state.seminar,
      data: data || null,
      isLoading: false
    }
  })
}

function removeSeminarDetail(state) {
  return updateObject(state, {
    seminar: {
      data: null
    }
  })
}

function setIsHaveData(state, { isHaveData }) {
  return updateObject(state, {
    isHaveData
  })
}

function repoLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

export default createReducer(initialState, {
  [LOAD_SEMINAR_LIST]: loadSeminars,
  [LOAD_SEMINAR_LIST_SUCCESS]: loadSeminarsSuccess,
  [LOAD_SEMINAR_DETAIL]: loadSeminarDetail,
  [LOAD_SEMINAR_DETAIL_SUCCESS]: loadSeminarDetailSuccess,
  [REMOVE_SEMINAR_DETAIL]: removeSeminarDetail,
  [IS_HAVE_DATA]: setIsHaveData,

  [LOAD_REPOS_ERROR]: repoLoadingError
})
