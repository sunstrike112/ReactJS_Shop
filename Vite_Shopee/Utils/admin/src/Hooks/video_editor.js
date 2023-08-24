/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/video_editor/project_editor/store/saga'
import reducer from 'Modules/video_editor/project_editor/store/reducers'

import { useInjectSaga, useInjectReducer } from 'Stores'
import {
  setVideoDimensions,
  setDuration,
  setVideoPlay,
  setCurrentTime,
  addItemToTrack,
  updateItemPosition,
  setInitialTime,
  setRatioScale,
  removeLayer,
  getVideoDetail,
  setTimeLineDimension,
  setTimeLines,
  exportVideo,
  exportVideoSplitPause,
  updateProjectName,
  addTimeLineSplitVideo,
  addTimeLinePauseVideo,
  submitSaveSplitPause
} from 'Modules/video_editor/project_editor/store/actions'
import {
  makeSelectVideoEditors
} from 'Modules/video_editor/project_editor/store/selectors'

export const useVideoEditor = () => {
  useInjectSaga({ key: 'videoEditorStore', saga })
  useInjectReducer({ key: 'videoEditorStore', reducer })

  const dispatch = useDispatch()

  const VideoEditorState = useSelector(makeSelectVideoEditors())

  const setVideoDimensionsAction = (payload) => dispatch(setVideoDimensions(payload))
  const setDurationAction = (payload) => dispatch(setDuration(payload))
  const setVideoPlayAction = (payload) => dispatch(setVideoPlay(payload))
  const setCurrentTimeAction = (payload) => dispatch(setCurrentTime(payload))
  const addItemToTrackAction = (payload) => dispatch(addItemToTrack(payload))
  const updateItemPositionAction = (payload) => dispatch(updateItemPosition(payload))
  const setInitialTimeAction = (payload) => dispatch(setInitialTime(payload))
  const setRatioScaleAction = (payload) => dispatch(setRatioScale(payload))
  const setTimeLineDimensionAction = (payload) => dispatch(setTimeLineDimension(payload))
  const removeLayerAction = (payload) => dispatch(removeLayer(payload))
  const getProjectDetailAction = (payload) => dispatch(getVideoDetail(payload))
  const setTimeLinesAction = (payload) => dispatch(setTimeLines(payload))
  const exportVideoAction = (payload) => dispatch(exportVideo(payload))
  const exportVideoSplitPauseAction = (payload) => dispatch(exportVideoSplitPause(payload))
  const updateProjectNameAction = (payload) => dispatch(updateProjectName(payload))
  const addTimeLineSplitVideoAction = (payload) => dispatch(addTimeLineSplitVideo(payload))
  const addTimeLinePauseVideoAction = (payload) => dispatch(addTimeLinePauseVideo(payload))
  const submitSaveSplitPauseAction = (payload) => dispatch(submitSaveSplitPause(payload))
  return {
    VideoEditorState,
    setVideoDimensionsAction,
    setDurationAction,
    setVideoPlayAction,
    setCurrentTimeAction,
    addItemToTrackAction,
    updateItemPositionAction,
    setInitialTimeAction,
    setRatioScaleAction,
    removeLayerAction,
    getProjectDetailAction,
    setTimeLineDimensionAction,
    setTimeLinesAction,
    exportVideoAction,
    exportVideoSplitPauseAction,
    updateProjectNameAction,
    addTimeLineSplitVideoAction,
    addTimeLinePauseVideoAction,
    submitSaveSplitPauseAction
  }
}
