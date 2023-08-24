/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useVideoEditor } from 'Hooks'
import { Rnd } from 'react-rnd'
import {
  PLAY_ELEMENT,
  PAUSE_ELEMENT
} from 'Assets'
import {
  Timer,
  TimeList,
  TimeLineContainer,
  Container,
  PlayButton,
  Play,
  Wrapper,
  TimeSpace
} from './styled'
import VideoFrame from '../videoFrame'

import Track from '../track'
import TimeLineSplitVideo from '../timeLineSplit'
import TimeLinePauseVideo from '../timeLinePause'

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

const TimeLine = ({ onPlay, isPlay, setCurrentTime, pause, setIsplay }) => {
  const {
    VideoEditorState,
    setInitialTimeAction,
    setCurrentTimeAction,
    setTimeLineDimensionAction
  } = useVideoEditor()

  const timelineRef = useRef(null)
  const timeListRef = useRef(null)
  const [xPosition, setXPosition] = useState(0)
  const [dx, setDx] = useState(0)

  const { videoData, timeLines, isAddItem } = VideoEditorState
  const [listPause, setListPause] = useState([])
  const [listSplit, setListSplit] = useState([])
  const timeLineElment = timeLines.filter((item) => item.name !== 'split' && item.name !== 'pause')

  useEffect(() => {
    const timeLineSplit = timeLines.filter((item) => item.name === 'split')
    const timeLinePause = timeLines.filter((item) => item.name === 'pause')
    setListPause([...timeLinePause])
    setListSplit([...timeLineSplit])
  }, [timeLines])

  const setTimeLineDimension = () => {
    if (timelineRef && timelineRef.current) {
      setTimeLineDimensionAction({
        width: timelineRef.current.clientWidth,
        height: timelineRef.current.clientHeight,
        offsetWidth: timelineRef.current.offsetWidth
      })
      if (videoData.currentTime >= 0 && (videoData.duration) && videoData.currentTime <= (videoData.duration)) {
        const calc = ((videoData.currentTime / (videoData.duration)) * (timelineRef.current.offsetWidth))
        setXPosition(calc)
      }
    }
  }

  useEffect(() => {
    setTimeLineDimension()
  }, [timelineRef, videoData.currentTime, videoData.duration])

  useEffect(() => {
    window.addEventListener('resize', setTimeLineDimension)

    return () => window.removeEventListener('resize', setTimeLineDimension)
  }, [timelineRef, videoData.currentTime, videoData.duration])

  useEffect(() => {
    if (videoData.duration) {
      const initialEndTime = (videoData.duration) / 8
      setInitialTimeAction(initialEndTime)
    }
  }, [timelineRef, videoData.duration])

  useEffect(() => {
    const progress = (dx * (videoData.duration)) / (timelineRef.current.offsetWidth)
    setCurrentTime(progress)
    setCurrentTimeAction(progress)
  }, [dx, videoData.duration])

  useEffect(() => {
    if (timeListRef && timeListRef.current && isAddItem) {
      timeListRef.current.scrollTop = timeListRef.current.scrollHeight
    }
  }, [timeListRef, isAddItem])

  const duration = useMemo(() => {
    if (videoData.duration) {
      const dayInDuration = Math.floor((videoData.duration % 31536000) / 86400)
      const timeInDay = new Date(videoData.duration * 1000).toISOString().substr(11, 8)
      let arrTime = timeInDay.split(':')
      arrTime[0] = new Intl.NumberFormat(
        undefined,
        { minimumIntegerDigits: 2, maximumSignificantDigits: 3 }
      ).format((+dayInDuration * 24 + +arrTime[0])).toString()
      return arrTime.join(':')
    }
    return '00:00:00'
  }, [videoData.duration])

  const currentTime = useMemo(() => {
    if (videoData.currentTime) {
      const dayInDuration = Math.floor((videoData.currentTime % 31536000) / 86400)
      const timeInDay = new Date(videoData.currentTime * 1000).toISOString().substr(11, 8)
      let arrTime = timeInDay.split(':')
      arrTime[0] = new Intl.NumberFormat(
        undefined,
        { minimumIntegerDigits: 2, maximumSignificantDigits: 3 }
      ).format((+dayInDuration * 24 + +arrTime[0])).toString()
      return arrTime.join(':')
    }
    return '00:00:00'
  }, [videoData.currentTime])

  const handleClick = (event) => {
    event.stopPropagation()
  }

  const handlePosition = (e, d) => {
    setDx(d.x)
  }

  return (
    <Container onClick={handleClick}>
      <VideoFrame />
      <Wrapper>
        <Play>
          <div>{currentTime}</div>
          <PlayButton onClick={onPlay}>
            <img src={isPlay ? PAUSE_ELEMENT : PLAY_ELEMENT} alt="" />
          </PlayButton>
          <div>{duration}</div>
        </Play>
        <TimeLineContainer>
          <TimeList ref={timeListRef}>
            <TimeSpace ref={timelineRef} />
            {listSplit.length > 0 && listSplit.map((item) => (
              <TimeLineSplitVideo
                videoLength={videoData.duration}
                item={item}
                key={item.id}
                name={item.name}
                selector={item.selector}
                startTime={item.startTime}
                endTime={item.endTime}
                timelineRef={timelineRef}
                width={item.width}
                xPosition={item.xPosition}
                setCurrentTime={setCurrentTime}
                setCurrentTimeAction={setCurrentTimeAction}
                pause={pause}
                setIsplay={setIsplay}
              />
            ))}
            {listPause.length > 0 && listPause.map((item) => (
              <TimeLinePauseVideo
                videoLength={videoData.duration}
                item={item}
                key={item.id}
                name={item.name}
                selector={item.selector}
                startTime={item.startTime}
                endTime={item.endTime}
                timelineRef={timelineRef}
                width={item.width}
                xPosition={item.xPosition}
                setCurrentTime={setCurrentTime}
                setCurrentTimeAction={setCurrentTimeAction}
                pause={pause}
                setIsplay={setIsplay}
              />
            ))}
            {
                timeLineElment.map((item) => (
                  <Track
                    videoLength={videoData.duration}
                    item={item}
                    key={item.id}
                    name={item.name}
                    selector={item.selector}
                    startTime={item.startTime}
                    endTime={item.endTime}
                    timelineRef={timelineRef}
                    width={item.width}
                    xPosition={item.xPosition}
                  />
                ))
              }
          </TimeList>
          <Rnd
            position={{
              x: xPosition,
              y: -25
            }}
            style={{
              display: 'block'
            }}
            bounds="parent"
            dragAxis="x"
            size={{
              width: 0,
              height: 165
            }}
            onDrag={handlePosition}
            enableResizing={enableResizing}
          >
            <Timer />
          </Rnd>
        </TimeLineContainer>
      </Wrapper>
    </Container>
  )
}

export default TimeLine
