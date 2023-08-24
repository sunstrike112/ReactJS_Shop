/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Rnd } from 'react-rnd'
import { useVideoEditor } from 'Hooks'
import { PauseCircleOutlined } from '@ant-design/icons'
import { FORMAT_TIME } from 'Constants/formatTime'
import moment from 'moment/moment'
import { Tooltip } from 'antd'
import { Modal, Text } from 'Components'
import { useTranslation } from 'react-i18next'

const Container = styled.div`
  width: calc(100% - 10px);
  height: 34px;
  background-color: ${({ theme }) => theme.white};
  background: white;
  margin: 4px 0px;
  border-radius: 8px;
  user-select: none;
  position: relative;
  align-self: center;
`
const StyledRnd = styled(Rnd)`
  position: absolute;
  background: rgb(118 118 118 / 44%);
  text-align: center;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  color: #ffffff;
  border : ${({ bordercolor }) => (`2px solid ${bordercolor}`)};
  user-select: none;
  display: flex !important;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-word;
  display: -webkit-box;
`
const Name = styled.p`
  padding: 0;
  margin: 0;
  font-weight: 400;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-word;
  display: -webkit-box;
`
const enableResizing = {
  top: false,
  right: false,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false
}

const TimeLinePauseVideo = ({
  item,
  timelineRef,
  videoLength,
  // setCurrentTime,
  // setCurrentTimeAction,
  pause,
  setIsplay
}) => {
  const { t } = useTranslation('project')
  const {
    VideoEditorState,
    updateItemPositionAction
  } = useVideoEditor()
  const { timeLineDimension, timeLines } = VideoEditorState
  const [durationPause, setDurationPause] = React.useState(0)
  const [showPopupError, setShowPopupError] = React.useState(false)
  const listPause = timeLines.filter((i) => i.type === 'pause' && i.isActiveItem === false)

  useEffect(() => {
    setDurationPause(item.endTime - item.startTime)
  }, [item])

  const handleDragStop = (e, d) => {
    if (timelineRef.current) {
      const startTime = (d?.x * videoLength) / (timelineRef.current.offsetWidth)
      const result = listPause.some((i) => startTime.toFixed(2).slice(0, -1) === i.startTime.toFixed(2).slice(0, -1))

      if (result) {
        setShowPopupError(true)
      } else {
        setShowPopupError(false)
        updateItemPositionAction({
          dataItem: {
            ...item,
            startTime,
            endTime: startTime + durationPause,
            xPosition: d.x
          },
          isChangePosition: true
        })
      }
    }
  }

  useEffect(() => {
    pause()
    setIsplay(false)
    // setCurrentTime(0)
    // setCurrentTimeAction(0)
  }, [item.startTime, item.endTime])

  useEffect(() => {
    if (timelineRef && timelineRef.current) {
      updateItemPositionAction({
        dataItem: {
          ...item,
          startTime: item?.startTime,
          endTime: item?.endTime,
          xPosition: (item?.startTime * (timelineRef.current.offsetWidth)) / videoLength,
          width: ((item?.endTime - item?.startTime) * (timelineRef.current.offsetWidth)) / videoLength
        },
        isChangePosition: false
      })
    }
  }, [timelineRef, timeLineDimension, videoLength, item?.startTime, item?.endTime])

  const rndSize = {
    width: 17,
    height: 34
  }

  const rndPosition = React.useMemo(() => ({
    x: item?.xPosition,
    y: 0
  }), [item?.xPosition])

  const handleClick = (event) => {
    event.stopPropagation()
  }

  const onDragStart = () => {
    updateItemPositionAction({
      dataItem: {
        ...item
      },
      isChangePosition: true
    })
  }
  const borderColor = React.useMemo(() => (item?.isActiveItem ? '#7673cb' : 'rgb(255 5 94 / 52%)'), [item?.isActiveItem])
  const startTime = moment.utc(item?.startTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND)
  const endTime = moment.utc(item?.endTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND)
  const duration = moment.duration(endTime) - moment.duration(startTime)

  return (
    <Container onClick={handleClick}>
      <Modal
        visible={showPopupError}
        onSubmit={() => setShowPopupError(false)}
        title={t('error')}
        onCancelText={t('common:cancel')}
        ok={false}
        onClose={() => setShowPopupError(false)}
      >
        <Text.primary style={{ textAlign: 'center' }} className="title" fontSize="size_16"> {t('error_pause')}</Text.primary>
      </Modal>
      <Tooltip
        title={`${`${moment.utc(item?.startTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND)} 
        - ${moment.utc(item?.endTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND)} 
        (${duration / 1000}s)`}`}
        placement="left"
      >
        <StyledRnd
          bordercolor={borderColor}
          position={rndPosition}
          onDragStart={onDragStart}
          onDragStop={handleDragStop}
          bounds="parent"
          dragAxis="x"
          size={rndSize}
          enableResizing={item.isActiveItem && enableResizing}
        >
          <Name>
            <PauseCircleOutlined style={{ cursor: 'pointer', justifyContent: 'center', alignItems: 'center' }} />
            {`${startTime} - ${endTime} 
          (${duration / 1000}s)`}
          </Name>
        </StyledRnd>
      </Tooltip>
    </Container>
  )
}

export default TimeLinePauseVideo
