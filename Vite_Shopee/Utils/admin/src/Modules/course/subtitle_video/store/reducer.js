import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  UPLOAD_SUBTITLE, GET_VIDEO_DETAIL
} from './constants'

export const initialState = {
  isLoading: false,
  error: null,
  videoDetail: {
    createdAt: 0,
    fileName: '',
    filePath: '',
    fileSize: '',
    fileType: '',
    folderParent: '',
    id: 0,
    pathSub: '',
    subtitles: null
  },
  isSubmited: false
}

function uploadSubtitle(state) {
  return updateObject(state, {
    ...state,
    isLoading: true,
    isSubmited: false
  })
}

function uploadSubtitleSuccess(state, { videoDetail }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    isSubmited: true,
    videoDetail
  })
}

function uploadSubtitleFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    error
  })
}

function getVideoDetail(state) {
  return updateObject(state, {
    ...state,
    isLoading: true
  })
}

function getVideoDetailSuccess(state, { videoDetail }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    videoDetail
  })
}

function getVideoDetailFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    error
  })
}
function resetState(state) {
  return updateObject(state, initialState)
}
// Slice reducer
export default createReducer(initialState, {
  [REQUEST(UPLOAD_SUBTITLE)]: uploadSubtitle,
  [SUCCESS(UPLOAD_SUBTITLE)]: uploadSubtitleSuccess,
  [FAILURE(UPLOAD_SUBTITLE)]: uploadSubtitleFailure,

  [REQUEST(GET_VIDEO_DETAIL)]: getVideoDetail,
  [SUCCESS(GET_VIDEO_DETAIL)]: getVideoDetailSuccess,
  [FAILURE(GET_VIDEO_DETAIL)]: getVideoDetailFailure,

  [LOCATION_CHANGE]: resetState
})
