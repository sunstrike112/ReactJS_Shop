/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Rnd } from 'react-rnd'
import { useVideoEditor } from 'Hooks'
import { SplitCellsOutlined } from '@ant-design/icons'
import moment from 'moment/moment'
import { FORMAT_TIME } from 'Constants/formatTime'
import { Tooltip } from 'antd'

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
  background: rgb(255 5 94 / 52%);
  text-align: center;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  color: white;
  border : ${({ bordercolor }) => (`2px solid ${bordercolor}`)};
  user-select: none;
  display: flex !important;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-word;
  display: -webkit-box;
  margin-bottom: ${({ item }) => (`${item ? '2.3rem' : '0rem'}`)};
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
  right: true,
  bottom: false,
  left: true,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false
}

const TimeLineSplitVideo = ({
  item,
  timelineRef,
  videoLength,
  setCurrentTime,
  setCurrentTimeAction,
  pause,
  setIsplay
//   ...rest
}) => {
  const {
    VideoEditorState,
    updateItemPositionAction
  } = useVideoEditor()
  const { timeLineDimension } = VideoEditorState
  const handleDragStop = (e, d) => {
    if (timelineRef.current) {
      const startTime = (d.x * videoLength) / (timelineRef.current.offsetWidth)
      const endTime = ((item?.width * videoLength) / (timelineRef.current.offsetWidth)) + startTime
      updateItemPositionAction({
        dataItem: {
          ...item,
          startTime: startTime < 0 ? 0 : startTime,
          endTime,
          xPosition: d.x
        },
        isChangePosition: true
      })
    }
  }

  const handleResizeStop = (e, d, ref, delta, position) => {
    if (timelineRef.current) {
      const startTime = (position.x * videoLength) / (timelineRef.current.offsetWidth)
      const endTime = ((Number(ref.style.width.replace('px', '')) * videoLength) / (timelineRef.current.offsetWidth)) + startTime
      updateItemPositionAction({
        dataItem: {
          ...item,
          startTime: startTime < 0 ? 0 : startTime,
          endTime,
          xPosition: position.x,
          width: Number(ref.style.width.replace('px', ''))
        },
        isChangePosition: true
      })
    }
  }

  useEffect(() => {
    pause()
    setIsplay(false)
    setCurrentTime(0)
    setCurrentTimeAction(0)
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
    width: item?.width,
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

  if (!item) return null

  const startTime = moment.utc(item?.startTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND)
  const endTime = moment.utc(item?.endTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND)
  const duration = moment.duration(endTime) - moment.duration(startTime)

  return (
    <Container onClick={handleClick}>
      <Tooltip
        title={`${item.width < 180 ? `${moment.utc(item?.startTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND)}
        - ${moment.utc(item?.endTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND)}
        (${duration / 1000}s)` : ''}`}
        placement="left"
      >
        <StyledRnd
          bordercolor={borderColor}
          position={rndPosition}
          onDragStart={onDragStart}
          onResizeStop={handleResizeStop}
          onDragStop={handleDragStop}
          bounds="parent"
          dragAxis="x"
          size={rndSize}
          enableResizing={item.isActiveItem && enableResizing}
          marginBottom={item}
        >
          <Name>
            <SplitCellsOutlined style={{ cursor: 'pointer', marginRight: '0.5rem' }} />
            {`${startTime} - ${endTime}
          (${duration / 1000}s)`}
          </Name>
        </StyledRnd>
      </Tooltip>
    </Container>
  )
}

export default TimeLineSplitVideo
