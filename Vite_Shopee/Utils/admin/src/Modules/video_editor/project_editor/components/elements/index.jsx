/* eslint-disable react/prop-types */

import React from 'react'
import { useTranslation } from 'react-i18next'

import { useVideoEditor } from 'Hooks'
import { getRandomId } from 'Utils'
import { getNumberOfTrack } from 'Modules/video_editor/utils'

import {
  Container,
  IconButton
} from './styled'
import { imagesData, getNewTrack, ALIGN } from '../../../constants'

const Elements = ({
  pause,
  isPlay,
  setIsplay,
  play
}) => {
  const { t } = useTranslation('project')

  const {
    VideoEditorState,
    addItemToTrackAction
  } = useVideoEditor()

  const {
    timeLines,
    timeLineDimension,
    videoData
  } = VideoEditorState

  const handleAddNewTrack = async (item, event = null) => {
    const playing = isPlay
    if (event) {
      event.stopPropagation()
    }
    if (playing) {
      await setIsplay(false)
      await pause()
    }
    const id = getRandomId()
    const width = timeLineDimension.width / 8
    const xPosition = (videoData.currentTime * timeLineDimension.offsetWidth) / videoData.duration
    const startTime = xPosition < (width * 7) ? videoData.currentTime : (videoData.duration * 7) / 8

    const getEndTime = () => {
      if (xPosition < (width * 7)) {
        return ((width * videoData.duration) / (timeLineDimension.offsetWidth)) + videoData.currentTime
      }
      return videoData.duration
    }

    const newTrack = getNewTrack({
      id,
      initialEndTime: VideoEditorState.initialTime,
      imageName: item.label,
      imageSrc: item.value,
      name: `${t(item.label)} ${getNumberOfTrack(timeLines, item.label, id)}`,
      type: 'image',
      textStyle: {
        fontSize: 24,
        isBold: false,
        fontFamily: 'Arial',
        content: '',
        color: 'black',
        isItalic: false,
        textStyle: ALIGN.LEFT
      }
    })

    addItemToTrackAction({
      ...newTrack,
      width,
      xPosition,
      startTime,
      endTime: getEndTime()
    })

    if (playing) {
      setTimeout(() => {
        setIsplay(true)
        play()
      }, 500)
    }
  }

  return (
    <Container>
      {
        imagesData.map((item) => (
          <IconButton
            key={item.label}
            style={{ margin: 10 }}
            onClick={(event) => handleAddNewTrack(item, event)}
            onDragEnd={(event) => handleAddNewTrack(item, event)}
          >
            <img src={item.src} alt="" />
          </IconButton>

        ))
      }
    </Container>
  )
}

export default Elements
