/* eslint-disable no-unused-vars */
import { LOCATION_CHANGE } from 'connected-react-router'

import { updateObject, createReducer, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  SET_VIDEO_DIMENSIONS,
  SET_VIDEO_DURATION,
  SET_VIDEO_PLAY,
  SET_CURRENT_TIME,
  ADD_ITEM_TO_TRACK,
  UPDATE_ITEM_POSITION,
  SET_INITIAL_TIME,
  SET_RATIO_SCALE,
  REMOVE_LAYER,
  GET_VIDEO_DETAIL,
  UPDATE_PROJECT_NAME,
  SET_TIMELINE_DIMENSIONS,
  SET_TIMELINES_INITIAL,
  EXPORT_VIDEO,
  ADD_TIMELINE_SPLIT,
  ADD_TIMELINE_PAUSE,
  EXPORT_VIDEO_SPLIT_PAUSE,
  SET_VIDEO_DURATION_PAUSE,
  SUBMIT_SAVE_SPLIT_PAUSE
} from './constants'

export const initialState = {
  video: null,
  projectDetail: null,
  videoData: {
    width: 0,
    height: 0,
    play: false,
    volume: 1,
    duration: 0,
    muted: false,
    videoRatio: 1,
    currentTime: 0
  },
  timeLines: [],
  timeLineDimension: {
    width: 0,
    height: 0,
    offsetWidth: 0,
    ratioTimeLine: 1
  },
  nameUpdating: false,
  ratioScale: 1,
  initialTime: 0,
  exportStatus: null, // exported, exporting, error
  isLoading: false,
  isShowLeavePopup: false,
  isAddItem: false,
  isShowTimeLineSplitVideo: false,
  isShowTimeLinePauseVideo: false
}

function setVideoDimensions(state, { payload }) {
  return updateObject(state, {
    videoData: {
      ...state.videoData,
      width: payload.width,
      height: payload.height,
      videoRatio: payload.videoRatio
    },
    isAddItem: false
  })
}

function setDuration(state, { duration }) {
  return updateObject(state, {
    videoData: {
      ...state.videoData,
      duration
    },
    isAddItem: false
  })
}

function setCurrentTime(state, { currentTime }) {
  return updateObject(state, {
    videoData: {
      ...state.videoData,
      currentTime
    },
    isAddItem: false
  })
}

export function setVideoPlay(state, { payload }) {
  return updateObject(state, {
    videoData: { ...state.videoData, play: payload }
  })
}

export function addItemToTrack(state, { payload }) {
  const timeLinesUpdate = [...state.timeLines].map((m) => ({
    ...m,
    isActiveItem: false
  }))
  return updateObject(state, {
    timeLines: [
      ...timeLinesUpdate,
      {
        ...payload,
        isActiveItem: true,
        zIndex: timeLinesUpdate.length
      }
    ],
    isShowLeavePopup: true,
    isAddItem: true
  })
}

const getIndexItem = (indexCompare, currentIndex, total, isChangePosition) => {
  if (!isChangePosition) {
    return indexCompare
  }
  if (isChangePosition && indexCompare === currentIndex && total > 0) {
    return total - 1
  }
  if (isChangePosition && indexCompare < currentIndex) {
    return indexCompare
  }
  if (isChangePosition && indexCompare > currentIndex) {
    return indexCompare - 1
  }
  return 0
}

export function updateItemPosition(state, { isChangePosition, dataItem }) {
  const timeLinesUpdate = [...state.timeLines].map((m) => {
    if (m.id === dataItem.id) {
      return {
        ...dataItem,
        isActiveItem: isChangePosition ? true : m.isActiveItem,
        zIndex: getIndexItem(
          m.zIndex,
          dataItem.zIndex,
          state.timeLines.length,
          isChangePosition
        )
      }
    }

    return {
      ...m,
      isActiveItem: isChangePosition ? false : m.isActiveItem,
      zIndex: getIndexItem(
        m.zIndex,
        dataItem.zIndex,
        state.timeLines.length,
        isChangePosition
      )
    }
  })

  return updateObject(state, {
    timeLines: timeLinesUpdate,
    isShowLeavePopup: state.isShowLeavePopup || isChangePosition,
    isAddItem: false
  })
}

export function setInitialTime(state, { time }) {
  return updateObject(state, {
    initialTime: time,
    isAddItem: false
  })
}

export function setRatioScale(state, { ratioScale }) {
  return updateObject(state, {
    ratioScale,
    isAddItem: false
  })
}

function setTimeLineDimension(state, { timeLineDimension }) {
  const { videoData, timeLines } = state
  const timeLinesUpdate = [...timeLines].map((item) => {
    const width =			((item.endTime - item.startTime) * timeLineDimension.offsetWidth)
			/ videoData.duration
    const xPosition =			(item.startTime * timeLineDimension.offsetWidth)
			/ videoData.duration
    return {
      ...item,
      width,
      xPosition
    }
  })

  return updateObject(state, {
    isLoading: false,
    timeLineDimension: {
      ...timeLineDimension,
      ratioTimeLine:
				state.timeLineDimension.width / timeLineDimension.width || 1
    },
    timeLines:
			timeLineDimension.offsetWidth > 0 ? timeLinesUpdate : timeLines,
    isAddItem: false
  })
}

export function removeLayer(state, { layerId }) {
  const foundItem = state.timeLines.find((f) => f.selector === layerId)
  const timeLinesUpdate = [...state.timeLines]
    .map((m) => ({
      ...m,
      zIndex: m?.zIndex < foundItem?.zIndex ? m?.zIndex : m?.zIndex - 1
    }))
    .filter((f) => f?.selector !== layerId)

  return updateObject(state, {
    timeLines: timeLinesUpdate,
    isShowLeavePopup: true,
    isAddItem: false
  })
}

function getVideoDetail(state) {
  return updateObject(state, {
    isLoading: true,
    isAddItem: false
  })
}

function getVideoDetailSuccess(state, { projectDetail }) {
  return updateObject(state, {
    isLoading: false,
    projectDetail
  })
}

function UpdateProjectName(state) {
  return updateObject(state, {
    nameUpdating: true,
    isLoading: true,
    isAddItem: false
  })
}

function UpdateProjectNameSuccess(state, { payload }) {
  return updateObject(state, {
    nameUpdating: false,
    isLoading: false,
    projectDetail: {
      ...state.projectDetail,
      projectName: payload.projectName
    }
  })
}

function UpdateProjectNameError(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    nameUpdating: false,
    error
  })
}

function exportVideo(state) {
  return updateObject(state, {
    exportStatus: 'exporting',
    isAddItem: false
  })
}

function exportVideoSuccess(state) {
  return updateObject(state, {
    exportStatus: 'exported'
  })
}

function exportVideoError(state) {
  return updateObject(state, {
    exportStatus: 'error'
  })
}

function exportVideoSplitPause(state) {
  return updateObject(state, {
    exportStatus: 'exporting',
    isAddItem: false
  })
}

function exportVideoSplitPauseSuccess(state) {
  return updateObject(state, {
    exportStatus: 'exported'
  })
}

function exportVideoSplitPauseError(state) {
  return updateObject(state, {
    exportStatus: 'error'
  })
}

function setTimeLines(state, { timeLines }) {
  return updateObject(state, {
    isLoading: false,
    timeLines,
    isAddItem: false,
    isShowLeavePopup: true
  })
}

function resetState(state) {
  return updateObject(state, {
    ...initialState
  })
}

export function repoLoadingError(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function addTimeLineSplitVideo(state, { payload }) {
  return updateObject(state, {
    isShowTimeLineSplitVideo: payload
  })
}

function addTimeLinePauseVideo(state, { payload }) {
  return updateObject(state, {
    isShowTimeLinePauseVideo: payload
  })
}

export default createReducer(initialState, {
  [REQUEST(SET_VIDEO_DIMENSIONS)]: setVideoDimensions,
  [REQUEST(SET_VIDEO_DURATION)]: setDuration,
  [REQUEST(SET_VIDEO_PLAY)]: setVideoPlay,
  [REQUEST(SET_CURRENT_TIME)]: setCurrentTime,
  [REQUEST(ADD_ITEM_TO_TRACK)]: addItemToTrack,
  [REQUEST(UPDATE_ITEM_POSITION)]: updateItemPosition,
  [REQUEST(SET_INITIAL_TIME)]: setInitialTime,
  [REQUEST(SET_RATIO_SCALE)]: setRatioScale,
  [REQUEST(REMOVE_LAYER)]: removeLayer,
  [REQUEST(SET_TIMELINE_DIMENSIONS)]: setTimeLineDimension,
  [REQUEST(SET_TIMELINES_INITIAL)]: setTimeLines,
  [REQUEST(ADD_TIMELINE_SPLIT)]: addTimeLineSplitVideo,
  [REQUEST(ADD_TIMELINE_PAUSE)]: addTimeLinePauseVideo,

  [REQUEST(GET_VIDEO_DETAIL)]: getVideoDetail,
  [SUCCESS(GET_VIDEO_DETAIL)]: getVideoDetailSuccess,
  [FAILURE(GET_VIDEO_DETAIL)]: repoLoadingError,

  [REQUEST(UPDATE_PROJECT_NAME)]: UpdateProjectName,
  [SUCCESS(UPDATE_PROJECT_NAME)]: UpdateProjectNameSuccess,
  [FAILURE(UPDATE_PROJECT_NAME)]: UpdateProjectNameError,

  [REQUEST(EXPORT_VIDEO)]: exportVideo,
  [SUCCESS(EXPORT_VIDEO)]: exportVideoSuccess,
  [FAILURE(EXPORT_VIDEO)]: exportVideoError,

  [REQUEST(EXPORT_VIDEO_SPLIT_PAUSE)]: exportVideoSplitPause,
  [SUCCESS(EXPORT_VIDEO_SPLIT_PAUSE)]: exportVideoSplitPauseSuccess,
  [FAILURE(EXPORT_VIDEO_SPLIT_PAUSE)]: exportVideoSplitPauseError,
  [LOCATION_CHANGE]: resetState
})
