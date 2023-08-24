/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useVideoEditor } from 'Hooks'
import { getRandomId } from 'Utils'

import { SplitCellsOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import _ from 'lodash'
import { ALIGN, FONTS, getNewTrack } from '../../../constants'

const SplitVideo = ({
  pause,
  isPlay,
  setIsplay,
  play
}) => {
  const { t } = useTranslation('project')

  const {
    VideoEditorState,
    addItemToTrackAction,
    addTimeLineSplitVideoAction
  } = useVideoEditor()

  const {
    timeLineDimension,
    videoData, timeLines
  } = VideoEditorState

  const [loading, setLoading] = useState(false)
  const listTrackSplitVideo = timeLines.filter((data) => data.name === 'split')
  const itemLasted = _.last(listTrackSplitVideo)

  const onSubmit = async () => {
    setLoading(true)
    const playing = isPlay
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
      initialEndTime: VideoEditorState.initialEndTime,
      imageName: null,
      imageSrc: null,
      name: 'split',
      type: 'split',
      textStyle: {
        fontSize: 24,
        isBold: false,
        fontFamily: FONTS[0].value,
        content: 'split',
        color: '#000000',
        isItalic: false,
        textAlign: ALIGN.LEFT
      }
    })
    // eslint-disable-next-line no-unused-expressions

    if (listTrackSplitVideo.length === 0) {
      addItemToTrackAction({
        ...newTrack,
        width: (timeLineDimension.width - xPosition),
        xPosition,
        startTime,
        endTime: videoData.duration
      })
    } else if (Math.floor(itemLasted?.xPosition + itemLasted?.width) < timeLineDimension.width) {
      addItemToTrackAction({
        ...newTrack,
        width,
        xPosition: itemLasted.width + itemLasted.xPosition,
        startTime: itemLasted.endTime,
        endTime: itemLasted.endTime + getEndTime() > videoData?.duration ? videoData?.duration : itemLasted.endTime + getEndTime()
      })
    } else {
      return
    }
    if (playing) {
      setTimeout(() => {
        setIsplay(true)
        play()
      }, 500)
    }
  }

  React.useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(false), 500)
    }
  }, [loading])

  return (
    <div>
      <Button
        onClick={onSubmit}
        htmlType="submit"
        style={{
          marginRight: '20px',
          border: 'none',
          boxShadow: '0px 0px 0px'
        }}
        icon={<SplitCellsOutlined style={{ cursor: 'pointer' }} />}
        loading={loading}
        disabled={listTrackSplitVideo.length > 0}
      >
        {t('split')}
      </Button>
    </div>
  )
}

export default SplitVideo
