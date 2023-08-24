/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useVideoEditor } from 'Hooks'
import { getRandomId } from 'Utils'

import { PauseCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import _ from 'lodash'
import { Modal, Text } from 'Components'
import { ALIGN, FONTS, getNewTrack } from '../../../constants'

const PauseVideo = ({ isPlay, setIsplay, play, pause, setCurrentTime }) => {
  const { t } = useTranslation('project')
  const { VideoEditorState, addItemToTrackAction } = useVideoEditor()
  const { timeLineDimension, videoData, timeLines } = VideoEditorState
  const [loading, setLoading] = useState(false)
  const [showPopupError, setShowPopupError] = useState(false)
  const listPause = timeLines.filter((i) => i.type === 'pause')

  const xPosition =	(videoData.currentTime * timeLineDimension.offsetWidth) / videoData.duration
  const onSubmit = async () => {
    const playing = isPlay
    if (playing) {
      await setIsplay(false)
      await pause()
    }
    setLoading(true)
    const id = getRandomId()
    const width = timeLineDimension.width / 8
    const startTime = xPosition < (width * 7) ? videoData.currentTime : (videoData.duration * 7) / 8
    const newTrack = getNewTrack({
      id,
      initialEndTime: VideoEditorState.initialEndTime,
      imageName: null,
      imageSrc: null,
      name: 'pause',
      type: 'pause',
      textStyle: {
        fontSize: 24,
        isBold: false,
        fontFamily: FONTS[0].value,
        content: 'pause',
        color: '#000000',
        isItalic: false,
        textAlign: ALIGN.LEFT
      }
    })

    const result = listPause.find((i) => i.startTime === startTime)
    if (result) {
      setShowPopupError(true)
    } else {
      addItemToTrackAction({
        ...newTrack,
        width,
        xPosition,
        startTime,
        endTime: startTime + 5
      })

      if (playing) {
        setTimeout(() => {
          setIsplay(true)
          play()
        }, 2000)
      }
    }
  }

  React.useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(false), 500)
    }
  }, [loading])

  return (
    <div>
      <Modal
        visible={showPopupError}
        onSubmit={() => setShowPopupError(false)}
        title={t('error')}
        onCancelText={t('common:cancel')}
        ok={false}
        onClose={() => setShowPopupError(false)}
      >
        <Text.primary style={{ textAlign: 'center' }} className="title" fontSize="size_16">  {t('error_pause')}</Text.primary>
      </Modal>
      <Button
        onClick={onSubmit}
        htmlType="submit"
        style={{
          marginRight: '20px',
          border: 'none',
          boxShadow: '0px 0px 0px'
        }}
        icon={<PauseCircleOutlined style={{ cursor: 'pointer' }} />}
        size="middle"
        loading={loading}
      >
        {t('pause')}
      </Button>
    </div>
  )
}

export default PauseVideo
