import {
  LOAD_SEMINAR_LIST,
  LOAD_SEMINAR_LIST_SUCCESS,
  LOAD_REPOS_ERROR,
  LOAD_SEMINAR_DETAIL,
  LOAD_SEMINAR_DETAIL_SUCCESS,
  REMOVE_SEMINAR_DETAIL,
  IS_HAVE_DATA
} from './constants'

export function loadSeminars() {
  return {
    type: LOAD_SEMINAR_LIST
  }
}

export function loadSeminarsSuccess(data) {
  return {
    type: LOAD_SEMINAR_LIST_SUCCESS,
    data
  }
}

export function loadSeminarDetail(seminarId) {
  return {
    type: LOAD_SEMINAR_DETAIL,
    seminarId
  }
}

export function loadSeminarDetailSuccess(data) {
  return {
    type: LOAD_SEMINAR_DETAIL_SUCCESS,
    data
  }
}

export function removeSeminarDetail() {
  return {
    type: REMOVE_SEMINAR_DETAIL
  }
}

export function setIsHaveData(isHaveData) {
  return {
    type: IS_HAVE_DATA,
    isHaveData
  }
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error
  }
}
