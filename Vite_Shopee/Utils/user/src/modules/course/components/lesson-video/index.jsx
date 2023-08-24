/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react'
import { VideoJS, Youtube } from '../../../../components'
import { LESSON_TYPE, TYPE_PATH_LESSON } from '../../../../constants'
import { usePlatform } from '../../../../hooks'
import { getFileFromS3, STORAGE } from '../../../../utils'
import LessonLayout from '../lesson-layout'
import { Wrapper } from './styled'

const LessonVideo = ({
  courseDetail,
  lessonDetail,
  submitLesson,
  courseId,
  lessonId,
  historyId,
  countViewUnit,
  isLoading,
  isRequestPasswordVideo,
  requestPasswordVideoAction
}) => {
  const [isToggle, setIsToggle] = useState(true)
  const [isVideoOverFlow, setIsVideoOverFlow] = useState(false)
  const [isSubmitPrev, SetIsSubmitPrev] = useState(false)
  const [isShowResolutionSelect, setIsShowResolutionSelect] = useState(true)
  const [isDefaultResolution, setIsDefaultResolution] = useState(true)

  const typeDefault = lessonDetail?.resolutions?.map((item) => Number(item?.type)).sort((a, b) => b - a)[0]
  const pathDefault = lessonDetail?.resolutions?.find((item) => item?.type === typeDefault.toString())?.path
  const languageStatus = localStorage.getItem(STORAGE.LANGUAGE) || 'jp'

  const { isIpadOrIphone } = usePlatform()

  const playerRef = React.useRef(null)
  const videoRef = React.useRef(null)

  const videoJsOptions = useMemo(() => ({ // lookup the options in the docs for more options
    autoplay: false,
    controls: true,
    fluid: true,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    sources: [{
      src: !isIpadOrIphone ? getFileFromS3(lessonDetail.path) : `${getFileFromS3(lessonDetail.path)}#t=0.1`,
      type: 'video/mp4'
    },
    {
      src: !isIpadOrIphone ? getFileFromS3(lessonDetail.path) : `${getFileFromS3(lessonDetail.path)}#t=0.1`,
      type: 'video/webm'
    },
    {
      src: !isIpadOrIphone ? getFileFromS3(lessonDetail.path) : `${getFileFromS3(lessonDetail.path)}#t=0.1`,
      type: 'video/3gp'
    }],
    html5: {
      nativeTextTracks: false
    },
    textTrackSettings: false,
    controlBar: {
      pictureInPictureToggle: false
    }
  }), [lessonDetail])

  const tracks = useMemo(() => ([{ src: lessonDetail.pathSub, kind: 'captions', srcLang: 'en', label: 'Auto', default: 'showing' }]),
    [lessonDetail])

  const handlePlayerReady = (player, video) => {
    if (!lessonDetail?.isSpeedUp) {
      player.controlBar.progressControl.disable()
    }

    playerRef.current = player
    videoRef.current = video

    // you can handle player events here
    player.on('ended', () => {
      // submitLesson()
    })

    player.on('loadedmetadata', (e) => {
      setIsVideoOverFlow((window.innerHeight - 100) - e.target.clientHeight < 0)
    })
  }

  useEffect(() => {
    if (!isToggle) {
      setIsVideoOverFlow((window.innerHeight - 100) - videoRef.current?.clientHeight < 0)
    } else {
      setIsVideoOverFlow(false)
    }
  }, [isToggle])

  useEffect(() => {
    document.getElementById('video').addEventListener('contextmenu', (e) => e.preventDefault())
  }, [])

  const onPrevVideo = () => {
    SetIsSubmitPrev(true)
  }
  const resolutionDiv = document.querySelector('div.vjs-remaining-time.vjs-time-control.vjs-control')

  const renderLesson = (typePath) => {
    switch (typePath) {
      case TYPE_PATH_LESSON.YOUTUBE:
        return (
          <Youtube
            src={lessonDetail.path}
            submitLesson={submitLesson}
            countViewUnit={countViewUnit}
            courseId={courseId}
            lessonId={lessonId}
            historyId={historyId}
            lessonDetail={lessonDetail}
            typeUnit={LESSON_TYPE.LESSON}
            units={courseDetail?.unit}
          />
        )
      default:
        return (
          <VideoJS
            options={videoJsOptions}
            onReady={handlePlayerReady}
            tracks={tracks}
            isSubmitPrev={isSubmitPrev}
            SetIsSubmitPrev={SetIsSubmitPrev}
            countViewUnit={countViewUnit}
            courseId={courseId}
            lessonId={lessonId}
            historyId={historyId}
            typeUnit={LESSON_TYPE.LESSON}
            lessonDetail={lessonDetail}
            resolutionDiv={resolutionDiv}
            isIpadOrIphone={isIpadOrIphone}
            setIsShowResolutionSelect={setIsShowResolutionSelect}
            setIsDefaultResolution={setIsDefaultResolution}
            submitLesson={submitLesson}
            units={courseDetail?.unit}
            isRequestPasswordVideo={isRequestPasswordVideo}
            requestPasswordVideoAction={requestPasswordVideoAction}
          />
        )
    }
  }

  return (
    <LessonLayout
      courseDetail={courseDetail}
      lessonDetail={lessonDetail}
      submitLesson={submitLesson}
      isToggle={isToggle}
      setIsToggle={setIsToggle}
      isLoading={isLoading}
      videojs
      onPrevVideo={onPrevVideo}
      isRequestPasswordVideo={isRequestPasswordVideo}
    >
      <Wrapper
        id="video"
        sidebarToggle={isToggle}
        videoOverFlow={isVideoOverFlow}
        isShowResolutionSelect={isShowResolutionSelect}
        languageStatus={languageStatus}
        isDefaultResolution={isDefaultResolution}
      >
        {renderLesson(lessonDetail.typePath)}
      </Wrapper>
    </LessonLayout>
  )
}

export default LessonVideo
