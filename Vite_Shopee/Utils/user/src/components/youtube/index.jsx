/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import QueryString from 'qs'
import { YouTubeGetID } from '../../utils/utils'
import { saveLastViewedVideoAPI } from '../../apis'
import { VIDEO_WATCH_TIME, VIDEO_COMPLETE_TIME, LESSON_DETAIL_TYPE, YOUTUBE_STATE_CHANGE, LESSON_STATUS_COMPLETE } from '../../constants'
import { useHistories } from '../../hooks'
import { STORAGE, floorNumber, roundNumber, setLocalStorage } from '../../utils'
import Modal from '../modal'
import { getLessonsViewedWithoutCompleted } from '../video'

const Wrapper = styled.div`
  position: relative;
  height: max-content;
  iframe {
    display: block;
    width: 100%;
    height: calc(100vh - 170px);
  }
  .overlay__progress__bar {
    position: absolute;
    bottom: 30px;
    width: 100%;
    height: 30px;
  }
`

const Youtube = ({ src, courseId, lessonId, historyId, lessonDetail, countViewUnit, submitLesson, typeUnit, units }) => {
  // Use hooks
  const { t } = useTranslation()
  const history = useHistories()
  const params = useParams()
  const location = useLocation()
  const queryParams = QueryString.parse(location.search.substring(1))
  const videoId = YouTubeGetID(src)
  // End use hooks

  // Use state
  const [isViewed, setIsViewed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentVideoPlayTime, setCurrentVideoPlayTime] = useState({
    previous: 0,
    current: 0
  })
  const [durationVideoPlayTime, setDurationVideoPlayTime] = useState(0)
  const [hasWarningBuffering, setHasWarningBuffering] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isBufferedForwardVideoCompleted, setIsBufferedForwardVideoCompleted] = useState(false)
  // End use state

  const youtubeRef = useRef()

  const autoPlay = queryParams.autoPlay === 'true'
  const unitsVideo = useMemo(() => units && units.filter((unit) => unit.typeLesson === LESSON_DETAIL_TYPE.VIDEO), [units])
  const isCompletedInDatabase = useMemo(() => units && units.filter((unit) => unit.unitId.toString() === lessonId.toString())[0].complete === LESSON_STATUS_COMPLETE.COMPLETED, [units, lessonId])
  const lessonsViewedWithoutCompleted = getLessonsViewedWithoutCompleted()
  const isLessonViewedWithoutCompleted = lessonsViewedWithoutCompleted.findIndex((lesson) => lesson.lessonId === lessonId) !== -1
  const newHistoryId = useMemo(() => {
    const lessonViewedWithoutCompleted = [...getLessonsViewedWithoutCompleted()].find((lesson) => lesson.lessonId === lessonId)
    return lessonViewedWithoutCompleted ? lessonViewedWithoutCompleted.historyId : historyId
  }, [historyId])

  const handleNextVideo = (id) => {
    const queryPramsToPush = {
      fromTab: queryParams.fromTab,
      autoPlay: true
    }
    history.push({
      pathname: `/course/${params.courseId}/lesson/${id}`,
      search: QueryString.stringify(queryPramsToPush)
    })
  }

  const onSaveLastViewedVideoAPI = (time) => {
    saveLastViewedVideoAPI({
      courseId,
      lessonId,
      queryParams: { historyId: newHistoryId },
      data: { lastViewedAt: time }
    })
  }

  const onEnd = async () => {
    // Set last viewed to zero if the user finishes watching the video.
    await onSaveLastViewedVideoAPI(0)

    const indexNextVideo = unitsVideo.findIndex(({ unitId }) => unitId === Number(lessonId)) + 1
    if (unitsVideo[indexNextVideo]) {
      setTimeout(() => handleNextVideo(unitsVideo[indexNextVideo].unitId), 300)
    }
  }

  const handleOnStateChange = (event) => {
    const { target, data } = event
    const currentTime = target.getCurrentTime()
    const isBuffering = floorNumber(currentTime) > floorNumber(currentVideoPlayTime.current + 1)

    if ((data === YOUTUBE_STATE_CHANGE.PLAYING || data === YOUTUBE_STATE_CHANGE.BUFFERING) && isBuffering) {
      if (!isCompletedInDatabase) {
        target.pauseVideo()
        setHasWarningBuffering(true)
      } else if (!isCompleted) {
        setIsBufferedForwardVideoCompleted(true)
      }
    }

    if (data === YOUTUBE_STATE_CHANGE.PLAYING) {
      setIsPlaying(true)
      if (currentTime < currentVideoPlayTime.current) {
        setCurrentVideoPlayTime((prev) => ({ ...prev, previous: currentTime }))
      }
    }

    if (data === YOUTUBE_STATE_CHANGE.PAUSED) {
      setIsPlaying(false)
      onSaveLastViewedVideoAPI(((isBuffering && isCompletedInDatabase) || isBufferedForwardVideoCompleted) ? 0 : currentTime)
    }
  }

  const handleOnReady = (event) => {
    const { target } = event
    const durationTime = target.getDuration()
    setDurationVideoPlayTime(durationTime)
    if (lessonDetail.lastViewedAt) {
      setCurrentVideoPlayTime({
        previous: lessonDetail.lastViewedAt,
        current: lessonDetail.lastViewedAt
      })
    }
  }

  const handleSeekToCurrentTime = useCallback(() => {
    const isOutdateCurrentTime = roundNumber(currentVideoPlayTime.current) > roundNumber(currentVideoPlayTime.previous)
    if (isOutdateCurrentTime) {
      youtubeRef.current.internalPlayer.seekTo(currentVideoPlayTime.previous)
      onSaveLastViewedVideoAPI(currentVideoPlayTime.previous)
    } else {
      youtubeRef.current.internalPlayer.seekTo(currentVideoPlayTime.current)
      onSaveLastViewedVideoAPI(currentVideoPlayTime.current)
    }
    youtubeRef.current.internalPlayer.playVideo()
  }, [currentVideoPlayTime])

  useEffect(() => {
    let timerId = null
    if (isPlaying) {
      timerId = setInterval(async () => {
        const currentTimeYoutube = await youtubeRef.current.internalPlayer.getCurrentTime() // This method return a promise
        setCurrentVideoPlayTime((prev) => {
          if (roundNumber(prev.previous) === roundNumber(prev.current)) {
            return { previous: currentTimeYoutube, current: currentTimeYoutube }
          }
          return { ...prev, previous: currentTimeYoutube }
        })
      }, 500)
    } else {
      clearInterval(timerId)
    }
    return () => clearInterval(timerId)
  }, [isPlaying])

  const onSubmitLesson = () => {
    setTimeout(() => {
      submitLesson({ queryParams: { historyId: newHistoryId } })
      setIsCompleted(true)
      const indexOfLessonViewedWithoutCompleted = [...getLessonsViewedWithoutCompleted()].findIndex((lesson) => lesson.lessonId === lessonId)
      if (indexOfLessonViewedWithoutCompleted !== -1) {
        const newLessonsViewedWithoutCompleted = [...lessonsViewedWithoutCompleted].toSpliced(indexOfLessonViewedWithoutCompleted, 1)
        setLocalStorage(STORAGE.LESSONS_VIEWED_WITHOUT_COMPLETED, JSON.stringify(newLessonsViewedWithoutCompleted))
      }
    }, 0)
  }

  useEffect(() => {
    if (isPlaying) {
      const isCurrentTimeLargerOrEqual80Percent = (currentVideoPlayTime.current / durationVideoPlayTime) >= VIDEO_WATCH_TIME
      const isCurrentTimeLargerOrEqualCompleteTime = currentVideoPlayTime.current >= (durationVideoPlayTime - VIDEO_COMPLETE_TIME)
      const isDurationSmallerOrEqualCompleteTime = durationVideoPlayTime <= VIDEO_COMPLETE_TIME

      if (isLessonViewedWithoutCompleted && !isViewed) {
        setIsViewed(true)
      }

      // For count view
      const isAbleToView = isCurrentTimeLargerOrEqual80Percent && !isViewed
      if (isAbleToView) {
        setIsViewed(true)
        countViewUnit({
          courseId,
          lessonId,
          typeUnit,
          isVideo: true,
          callback: {
            done: (historyIdFromResponse) => {
              const newLessonsViewedWithoutCompleted = [...lessonsViewedWithoutCompleted]
              newLessonsViewedWithoutCompleted.push({ lessonId, historyId: historyIdFromResponse })
              setLocalStorage(STORAGE.LESSONS_VIEWED_WITHOUT_COMPLETED, JSON.stringify(newLessonsViewedWithoutCompleted))
            }
          }
        })
      }

      // For submit lesson
      const isAbleToComplete = !isBufferedForwardVideoCompleted && !isCompleted && durationVideoPlayTime > 0
      if (isAbleToComplete) {
        if (isDurationSmallerOrEqualCompleteTime && currentVideoPlayTime.current === durationVideoPlayTime) {
          onSubmitLesson()
        } else if (isCurrentTimeLargerOrEqualCompleteTime && isViewed) {
          onSubmitLesson()
        }
      }
    }
  }, [currentVideoPlayTime.current, currentVideoPlayTime.previous, durationVideoPlayTime, isCompleted, isBufferedForwardVideoCompleted])

  return (
    <Wrapper className="wrapper">
      <YouTube
        ref={youtubeRef}
        videoId={videoId}
        onEnd={onEnd}
        onStateChange={handleOnStateChange}
        onReady={handleOnReady}
        opts={{
          // https://developers.google.com/youtube/player_parameters
          playerVars: {
            start: lessonDetail.lastViewedAt || 0,
            autoplay: autoPlay ? 1 : 0,
            fs: 0, // Hide button fullscreen
            modestbranding: 1, // Remove youtube logo at right bottom
            cc_load_policy: 1, // Force Closed Captions
            iv_load_policy: 3, // Turn off Annotations
            rel: 1, // Turn on Related Videos
            disablekb: 1 // Disabled keyboard
          }
        }}
      />
      <Modal
        isModalVisible={hasWarningBuffering}
        onOk={handleSeekToCurrentTime}
        isCancel={false}
        setIsModalVisible={setHasWarningBuffering}
        description={t('lesson.not_allow_buffering')}
        okText={t('common.yes')}
        borderRadiusButton={6}
      />
    </Wrapper>

  )
}

Youtube.propTypes = {
  src: PropTypes.string,
  submitLesson: PropTypes.func
}

export default Youtube
