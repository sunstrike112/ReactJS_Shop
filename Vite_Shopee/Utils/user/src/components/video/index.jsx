/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/prop-types */
import { Spin } from 'antd'
import { isFunction } from 'lodash'
import React, { useRef, useState, useEffect } from 'react'
import { ClickAble } from '..'
import { PAUSE_ICON, PLAY_ICON, REPLAY_ICON } from '../../assets'
import { isSafari } from '../../utils'
import { BtnControlWrapper, VideoLoader, VideoWrapper } from './styled'

const Video = ({ src, subtitleSrc, ...rest }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isEnded, setIsEnded] = useState(false)
  const [isPause, setIsPause] = useState(true)
  const [isHover, setIsHover] = useState(false)
  const [isUserNotPlay, setIsUserNotPlay] = useState(true)

  const videoRef = useRef()
  const trackRef = useRef()
  const timeoutHoverRef = useRef()

  const onReplay = () => {
    videoRef.current.currentTime = 0
    videoRef.current.play()
    setIsEnded(false)
  }
  const onPause = () => {
    videoRef.current.pause()
  }
  const onContinue = () => {
    videoRef.current.play()
  }
  const onHover = () => {
    setIsHover(true)

    if (timeoutHoverRef.current) clearTimeout(timeoutHoverRef.current)

    timeoutHoverRef.current = setTimeout(() => {
      setIsHover(false)
    }, 2600)
  }

  useEffect(() => {
    const handleMouseOver = () => {
      if (!videoRef.current.paused) {
        videoRef.current.controls = true
        videoRef.current.style.display = 'flex'
      }
    }

    const handleMouseOut = () => {
      if (!videoRef.current.paused) {
        videoRef.current.controls = false
        videoRef.current.style.display = 'block'
      }
    }

    if (videoRef && videoRef.current) {
      videoRef.current.addEventListener('mouseover', handleMouseOver)
      videoRef.current.addEventListener('mouseout', handleMouseOut)
    }
    return () => {
      if (videoRef && videoRef.current) {
        videoRef.current.removeEventListener('mouseover', handleMouseOver)
        videoRef.current.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [videoRef?.current])

  return (
    <VideoWrapper
      isLoaded={isLoaded}
      isEnded={isEnded}
      isPause={isPause}
      isHover={isUserNotPlay ? isSafari ? false : isHover : isHover}
      onMouseMove={onHover}
    >
      <div className="video-box">
        {!isLoaded && (
          <VideoLoader justify="center" align="middle">
            <Spin size="large" />
          </VideoLoader>
        )}

        {isLoaded && (
          <>
            <BtnControlWrapper
              className={`${!isEnded ? 'wrapper-btn continue-btn' : 'replay-btn play-btn'
              }`}
            >
              <ClickAble
                className="clickAble"
                onClick={() => {
                  if (isEnded) onReplay()
                  else onContinue()
                }}
              >
                {isEnded && <REPLAY_ICON width={48} height={48} />}
                {!isEnded && <PLAY_ICON width={48} height={48} />}
              </ClickAble>
            </BtnControlWrapper>

            <BtnControlWrapper className="wrapper-btn pause-btn">
              <ClickAble
                className="clickAble"
                onClick={() => {
                  onPause()
                }}
              >
                <PAUSE_ICON width={48} height={48} />
              </ClickAble>
            </BtnControlWrapper>
          </>
        )}

        <video
          ref={videoRef}
          preload="auto"
          crossOrigin="anonymous"
          disablePictureInPicture
          controlsList="noremoteplayback"
          controls={!isEnded}
          onPause={() => setIsPause(true)}
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          onCanPlay={() => setIsEnded(false)}
          onPlay={() => {
            setIsPause(false)
            setIsUserNotPlay(false)
          }}
          {...rest}
          onEnded={() => {
            if (isFunction(rest.onEnded)) {
              rest.onEnded()
              setIsEnded(true)
            }
          }}
        >
          <source
            src={src}
            type="video/mp4"
          />
          <source
            src={src}
            type="video/webm"
          />
          <source
            src={src}
            type="video/3gp"
          />
          {
              !!subtitleSrc
              && (
                <track
                  default
                  srcLang="auto"
                  kind="subtitles"
                  label="On"
                  src={subtitleSrc}
                  ref={trackRef}
                />
              )
            }
        </video>
      </div>
    </VideoWrapper>
  )
}

export default Video

export * from './videojs'
