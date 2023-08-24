/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/media-has-caption */
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Popover, notification } from 'antd'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import videojs from 'video.js'
import { LESSON_DETAIL_TYPE, VIDEO_COMPLETE_TIME, VIDEO_WATCH_TIME } from '../../constants'

import 'video.js/dist/video-js.css'
import { saveLastViewedVideoAPI } from '../../apis'
import { confirmRequestPasswordAPI } from '../../apis/unit-test.api'
import { useHistories, usePrevious } from '../../hooks'
import useQuery from '../../hooks/useQuery'
import { STORAGE, getFileFromS3, getLocalStorage, roundNumber, setLocalStorage } from '../../utils'
import { FormInput } from '../form'
import Modal from '../modal'
import Schema from './schema'
import { FormRequestPassword } from './styled'

const VideoStyled = styled.div`
  position: relative;
  .overlay__request-password {
    position: absolute;
    inset: 0;
    cursor: pointer;
  }
`

const DEFAULT_OPTION = 'Default'

export const getLessonsViewedWithoutCompleted = () => JSON.parse(getLocalStorage(STORAGE.LESSONS_VIEWED_WITHOUT_COMPLETED)) || []

export const checkWatchingHalfVideo = (childNumber, parentNumber) => {
  // Case 1: childNumber = 2 & parentNumber = 4 || childNumber = 1.5 & parentNumber = 3
  const result1 = parentNumber / childNumber === 2
  // Case 2: childNumber = 4 & parentNumber = 7 ==> still allow is half
  const result2 = parentNumber === ((childNumber * 2) - 1)

  return result1 || result2
}

export const VideoJS = (props) => {
  const videoRef = useRef(null)
  const playerRef = useRef(null)
  const {
    options,
    onReady,
    tracks = [],
    isSubmitPrev,
    SetIsSubmitPrev,
    courseId,
    lessonId,
    historyId,
    countViewUnit,
    typeUnit,
    onChangeResolution,
    lessonDetail,
    resolutionDiv,
    isIpadOrIphone,
    setIsShowResolutionSelect,
    setIsDefaultResolution,
    submitLesson,
    units = [],
    isRequestPasswordVideo,
    requestPasswordVideoAction,
    ...rest } = props

  // Hooks
  const { t } = useTranslation()
  const history = useHistories()
  const params = useParams()
  const query = useQuery()
  // End hooks

  // Use states
  const [isPlayed, setIsPlayed] = useState(false)
  const [isViewed, setIsViewed] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isShowResolution, setIsShowResolution] = useState(false)
  const [visibleModalRequestPassword, setVisibleModalRequestPassword] = useState(false)
  const [statusRequestPassword, setStatusRequestPassword] = useState(
    { lessonConfirmPassword: lessonDetail?.lessonConfirmPassword,
      time: 0
    }
  )
  const [currentVideoPlayTime, setCurrentVideoPlayTime] = useState(0)
  const [isSeekedForwardVideoCompleted, setIsSeekedForwardVideoCompleted] = useState(false)
  const [resolutionInfo, setResolutionInfo] = useState(DEFAULT_OPTION)
  // End use states

  const currentVideoPlayTimePrev = usePrevious(currentVideoPlayTime)

  // React hook form
  const form = useForm({
    resolver: yupResolver(Schema())
  })
  const { handleSubmit, reset, setValue } = form
  const onSubmit = useCallback(async () => {
    // Skip condition, because Schema handle it
    setVisibleModalRequestPassword(false)

    try {
      const result = await confirmRequestPasswordAPI({ courseId, lessonId, data: { isCheckPassword: true } })
      if (result.code === 200) {
        setStatusRequestPassword((prev) => ({ ...prev, lessonConfirmPassword: true }))
        requestPasswordVideoAction({ isRequestPasswordVideo: false })
        videoRef.current.play()
      }
    } catch (error) {
      notification.error({
        message: error.message,
        duration: 2
      })
    }
  }, [])
  // End react hook form

  const optionResolution = (lessonDetail?.resolutions?.map((item) => Number(item?.type)).sort((a, b) => b - a)).concat(DEFAULT_OPTION)

  const autoPlay = useMemo(() => query.get('autoPlay') === 'true', [query])
  const unitsVideo = useMemo(() => units && units.filter((unit) => unit.typeLesson === LESSON_DETAIL_TYPE.VIDEO), [units])
  const lessonsViewedWithoutCompleted = getLessonsViewedWithoutCompleted()
  const isLessonViewedWithoutCompleted = lessonsViewedWithoutCompleted.findIndex((lesson) => lesson.lessonId === lessonId) !== -1
  const newHistoryId = useMemo(() => {
    const lessonViewedWithoutCompleted = [...getLessonsViewedWithoutCompleted()].find((lesson) => lesson.lessonId === lessonId)
    return lessonViewedWithoutCompleted ? lessonViewedWithoutCompleted.historyId : historyId
  }, [historyId])

  useEffect(() => {
    if (lessonDetail?.resolutions?.length === 0) {
      setIsShowResolutionSelect(false)
    }
  }, [lessonDetail?.resolutions?.length])

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

  const handleChangeResolution = (event) => {
    const { value } = event?.target
    if (value === resolutionInfo) {
      setIsShowResolution(true)
    } else {
      setIsShowResolution(false)
    }
    setResolutionInfo(value)

    if (value === DEFAULT_OPTION) setIsDefaultResolution(true)
    else setIsDefaultResolution(false)

    const currentTime = Math.floor(playerRef.current.currentTime())
    const duration = Math.floor(playerRef.current.duration())

    const isCurrentTimeLargerOrEqual80Percent = (currentTime / duration) >= VIDEO_WATCH_TIME
    const isCurrentTimeLargerOrEqualCompleteTime = currentTime >= (duration - VIDEO_COMPLETE_TIME)
    const isDurationSmallerOrEqualCompleteTime = duration <= VIDEO_COMPLETE_TIME

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
          done: (data) => {
            if (!isCompleted) {
              const newLessonsViewedWithoutCompleted = [...lessonsViewedWithoutCompleted]
              newLessonsViewedWithoutCompleted.push({ lessonId, historyId: data })
              setLocalStorage(STORAGE.LESSONS_VIEWED_WITHOUT_COMPLETED, JSON.stringify(newLessonsViewedWithoutCompleted))
            }
          }
        }
      })
    }
    // For submit lesson
    const isAbleToComplete = !isSeekedForwardVideoCompleted && !isCompleted
    if (isAbleToComplete) {
      if (isDurationSmallerOrEqualCompleteTime && currentTime === duration) {
        onSubmitLesson()
      } else if (isCurrentTimeLargerOrEqualCompleteTime && isViewed) {
        onSubmitLesson()
      }
    }

    const player = playerRef.current
    const path = value === DEFAULT_OPTION ? lessonDetail?.path : lessonDetail?.resolutions?.find((item) => item?.type === value.toString())?.path
    const lastPlaybackRate = player?.cache_?.lastPlaybackRate || 1
    player.src([
      {
        src: !isIpadOrIphone ? getFileFromS3(path) : `${getFileFromS3(path)}#t=0.1`,
        type: 'video/mp4'
      },
      {
        src: !isIpadOrIphone ? getFileFromS3(path) : `${getFileFromS3(path)}#t=0.1`,
        type: 'video/webm'
      },
      {
        src: !isIpadOrIphone ? getFileFromS3(path) : `${getFileFromS3(path)}#t=0.1`,
        type: 'video/3gp'
      }])

    player.currentTime(currentTime)
    player.defaultPlaybackRate(lastPlaybackRate)
    player.play()
  }

  const handleOnPlay = () => {
    setIsPlayed(true)
    if (!isShowResolution) setIsShowResolution(true)
  }

  const handleOnPause = () => {
    // FOR save last viewed
    const currentTime = roundNumber(playerRef.current.currentTime())
    const duration = roundNumber(playerRef.current.duration())
    const isEnded = currentTime === duration
    const isSeekingForward = currentTime > (currentVideoPlayTimePrev + 1) // because currentTime updated immediately after seeked, so must use currentVideoPlayTimePrev

    if (!isSeekingForward) {
    // Set last viewed to zero if the user finishes watching the video.
      saveLastViewedVideoAPI({
        courseId,
        lessonId,
        queryParams: { historyId: newHistoryId },
        data: { lastViewedAt: (isSeekedForwardVideoCompleted || isEnded) ? 0 : currentTime }
      })
    }
  }

  const handleNextVideo = (id) => history.push({
    pathname: `/course/${params.courseId}/lesson/${id}`,
    search: `?fromTab=${query.get('fromTab')}&autoPlay=true`
  })

  const handleOnEnded = async () => {
    playerRef.current.controlBar.progressControl.enable()
    setIsViewed(true)

    const indexNextVideo = unitsVideo.findIndex(({ unitId }) => unitId === +lessonId) + 1
    if (unitsVideo[indexNextVideo]) {
      setTimeout(() => handleNextVideo(unitsVideo[indexNextVideo].unitId), 300)
    }
  }

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current
      if (!videoElement) return

      playerRef.current = videojs(videoElement, options, () => {
        onReady?.(playerRef.current, videoElement)
      })
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef])

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  useEffect(() => {
    if (playerRef && playerRef.current && isSubmitPrev) {
      if (playerRef.current.currentTime() > 10) {
        playerRef.current.currentTime(playerRef.current.currentTime() - 10)
      } else {
        playerRef.current.currentTime(0)
      }
    }
    SetIsSubmitPrev(false)
  }, [playerRef, playerRef.current, isSubmitPrev])

  const handleHideVisibleRequestPassword = useCallback(() => {
    setVisibleModalRequestPassword(false)
    reset({ confirmPassword: '' })
  }, [])

  // Time updating
  const handleTimeUpdate = () => {
    if (playerRef && playerRef.current) {
      const isPaused = playerRef.current.paused()

      if (isLessonViewedWithoutCompleted && !isViewed) {
        setIsViewed(true)
      }

      if (!isPaused) {
        const currentTime = roundNumber(playerRef.current.currentTime())
        const duration = roundNumber(playerRef.current.duration())

        setCurrentVideoPlayTime(currentTime)

        const isCurrentTimeLargerOrEqual80Percent = (currentTime / duration) >= VIDEO_WATCH_TIME
        const isCurrentTimeLargerOrEqualCompleteTime = currentTime >= (duration - VIDEO_COMPLETE_TIME)
        const isDurationSmallerOrEqualCompleteTime = duration <= VIDEO_COMPLETE_TIME

        // For count view
        const isAbleToView = isCurrentTimeLargerOrEqual80Percent && !isViewed
        if (isAbleToView) {
          countViewUnit({
            courseId,
            lessonId,
            typeUnit,
            isVideo: true,
            callback: {
              done: (data) => {
                if (!isCompleted) {
                  const newLessonsViewedWithoutCompleted = [...lessonsViewedWithoutCompleted]
                  newLessonsViewedWithoutCompleted.push({ lessonId, historyId: data })
                  setLocalStorage(STORAGE.LESSONS_VIEWED_WITHOUT_COMPLETED, JSON.stringify(newLessonsViewedWithoutCompleted))
                }
              }
            }
          })
          setIsViewed(true)
        }
        // For submit lesson
        const isAbleToComplete = !isSeekedForwardVideoCompleted && !isCompleted
        if (isAbleToComplete) {
          if (isDurationSmallerOrEqualCompleteTime && currentTime === duration) {
            onSubmitLesson()
          } else if (isCurrentTimeLargerOrEqualCompleteTime && isViewed) {
            onSubmitLesson()
          }
        }

        // If progress watching video at 50% + not confirm password yet + have check password ==> Show popup input password
        const conditionRequiredPassword = checkWatchingHalfVideo(currentTime, duration)
          // If the course have request password, field "isCheckPassword" will be true.
          && lessonDetail?.isCheckPassword
          // Because this func run at fast loop (milliseconds), so have compare two number to avoid duplicate.
          && currentTime !== statusRequestPassword.time
          && !statusRequestPassword.lessonConfirmPassword
          // In case currentTime auto set when have data from API => must check video has onClick behavior
          && playerRef.current.hasStarted_
        if (conditionRequiredPassword) {
          if (document.fullscreenElement) {
            document.exitFullscreen()
          }
          videoRef.current.pause()
          setStatusRequestPassword((prev) => ({ ...prev, time: currentTime }))
          setValue('password', lessonDetail.passwordRandom)
          setVisibleModalRequestPassword(true)
          requestPasswordVideoAction({ isRequestPasswordVideo: true })
        }
      }
    }
  }

  // Time seeking
  const handleOnSeeking = () => {
    if (isPlayed && playerRef?.current) {
      const currentTime = roundNumber(playerRef.current.currentTime())
      const isForwarding = currentTime > currentVideoPlayTimePrev // because currentTime updated immediately after seeked, so must use currentVideoPlayTimePrev
      if (isForwarding && !isSeekedForwardVideoCompleted && !isCompleted) {
        setIsSeekedForwardVideoCompleted(true)
      }
    }
  }

  // FOR resolution
  useEffect(() => {
    resolutionDiv?.insertAdjacentHTML('afterend', '<div class="resolution-div"></div>')
  }, [resolutionDiv])

  // FOR set current time of video (by previous watch video: action pause video)
  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement && Boolean(lessonDetail.lastViewedAt)) {
      videoElement.currentTime = lessonDetail.lastViewedAt
    }
  }, [videoRef, lessonDetail])

  const renderResolutionInfo = (item) => (item === DEFAULT_OPTION ? t('common.default') : `${item}p`)

  return (
    <VideoStyled>
      <div data-vjs-player>
        <video
          id="my-video"
          {...rest}
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          onTimeUpdate={handleTimeUpdate}
          onPlay={handleOnPlay}
          onPause={handleOnPause}
          onEnded={handleOnEnded}
          onSeeking={handleOnSeeking}
          data-setup='{ "inactivityTimeout": 0 }'
          autoPlay={autoPlay}
        >
          {tracks.map((trackInfo) => (
            <track {...trackInfo} />
          ))}
        </video>
        {isShowResolution ? (
          <Popover
            getPopupContainer={() => document.getElementById('my-video')}
            content={(
              <div className="popup-content">{optionResolution?.map((item, index) => (
                <button
                  key={index}
                  value={item}
                  className={resolutionInfo.toString() === item.toString() ? 'option-select active' : 'option-select'}
                  onClick={handleChangeResolution}
                >
                  {renderResolutionInfo(item)}
                </button>
              ))}
              </div>
            )}
            trigger={['hover', 'click']}
            mouseEnterDelay={0}
          >
            <Button
              type="text"
              className="resolution-btn"
              disabled={isRequestPasswordVideo}
            >
              {renderResolutionInfo(resolutionInfo)}
            </Button>
          </Popover>
        ) : <></>}
      </div>
      {/* TODO: 6137 */}
      {/* OverLay to disabled click video when request password */}
      {isRequestPasswordVideo
        && (
        <div
          className="overlay__request-password"
          aria-hidden
          onClick={() => setVisibleModalRequestPassword(true)}
        />
        )}
      {/* Modal request type password */}
      <Modal
        isModalVisible={visibleModalRequestPassword}
        onOk={handleSubmit(onSubmit)}
        onCancel={handleHideVisibleRequestPassword}
        hideModalWhenSubmit={false}
        setIsModalVisible={setVisibleModalRequestPassword}
        description={t('lesson.required_type_pass_to_watching')}
        okText={t('common.yes')}
        cancelText={t('common.cancel')}
        borderRadiusButton={6}
      >
        <FormRequestPassword>
          <FormProvider {...form}>
            <FormInput t={t} name="password" readOnly />
            <FormInput t={t} name="confirmPassword" />
          </FormProvider>
        </FormRequestPassword>
      </Modal>
      {/* END TODO: 6137 */}
    </VideoStyled>
  )
}
