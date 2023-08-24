import { REQUEST } from 'Stores'
import {
  SET_VIDEO_DIMENSIONS,
  SET_VIDEO_DURATION,
  SET_VIDEO_PLAY,
  ADD_ITEM_TO_TRACK,
  UPDATE_ITEM_POSITION,
  SET_INITIAL_TIME,
  SET_CURRENT_TIME,
  SET_RATIO_SCALE,
  REMOVE_LAYER,
  GET_VIDEO_DETAIL,
  UPDATE_PROJECT_NAME,
  SET_TIMELINE_DIMENSIONS,
  SET_TIMELINES_INITIAL,
  EXPORT_VIDEO,
  ADD_TIMELINE_SPLIT,
  ADD_TIMELINE_PAUSE,
  SET_VIDEO_DURATION_PAUSE,
  EXPORT_VIDEO_SPLIT_PAUSE,
  SUBMIT_SAVE_SPLIT_PAUSE
} from './constants'

export function setVideoDimensions(payload) {
  return {
    type: REQUEST(SET_VIDEO_DIMENSIONS),
    payload
  }
}

export function setDuration(duration) {
  return {
    type: REQUEST(SET_VIDEO_DURATION),
    duration
  }
}

export function setDurationAddPause(payload) {
  return {
    type: REQUEST(SET_VIDEO_DURATION_PAUSE),
    payload
  }
}

export function setCurrentTime(currentTime) {
  return {
    type: REQUEST(SET_CURRENT_TIME),
    currentTime
  }
}

export function setVideoPlay(payload) {
  return {
    type: REQUEST(SET_VIDEO_PLAY),
    payload
  }
}

export function addItemToTrack(payload) {
  return {
    type: REQUEST(ADD_ITEM_TO_TRACK),
    payload
  }
}

export function updateItemPosition({ dataItem, isChangePosition }) {
  return {
    type: REQUEST(UPDATE_ITEM_POSITION),
    dataItem,
    isChangePosition
  }
}

export function setInitialTime(time) {
  return {
    type: REQUEST(SET_INITIAL_TIME),
    time
  }
}

export function setRatioScale(ratioScale) {
  return {
    type: REQUEST(SET_RATIO_SCALE),
    ratioScale
  }
}

export function removeLayer(layerId) {
  return {
    type: REQUEST(REMOVE_LAYER),
    layerId
  }
}

export function getVideoDetail(payload) {
  return {
    type: REQUEST(GET_VIDEO_DETAIL),
    payload
  }
}

export function updateProjectName(payload) {
  return {
    type: REQUEST(UPDATE_PROJECT_NAME),
    payload
  }
}

export function setTimeLineDimension(timeLineDimension) {
  return {
    type: REQUEST(SET_TIMELINE_DIMENSIONS),
    timeLineDimension
  }
}

export function setTimeLines(timeLines) {
  return {
    type: REQUEST(SET_TIMELINES_INITIAL),
    timeLines
  }
}

export function exportVideo(payload) {
  return {
    type: REQUEST(EXPORT_VIDEO),
    payload
  }
}

export function exportVideoSplitPause(payload) {
  return {
    type: REQUEST(EXPORT_VIDEO_SPLIT_PAUSE),
    payload
  }
}

export function addTimeLineSplitVideo(payload) {
  return {
    type: REQUEST(ADD_TIMELINE_SPLIT),
    payload
  }
}

export function addTimeLinePauseVideo(payload) {
  return {
    type: REQUEST(ADD_TIMELINE_PAUSE),
    payload
  }
}

export function submitSaveSplitPause(payload) {
  return {
    type: REQUEST(SUBMIT_SAVE_SPLIT_PAUSE),
    payload
  }
}
