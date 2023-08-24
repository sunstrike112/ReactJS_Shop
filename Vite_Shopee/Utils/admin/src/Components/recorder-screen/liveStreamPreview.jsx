/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

const Content = styled.div`
  width: 100%;
  height: 75%;
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export default ({ webcamStream, t }) => {
  const webCamPreviewRef = useRef()
  const [isShowPip, setIsShowPip] = useState(false)
  useEffect(async () => {
    if (webCamPreviewRef && webCamPreviewRef.current && webcamStream) {
      webCamPreviewRef.current.srcObject = webcamStream
    }
    if (document.pictureInPictureElement && !webcamStream) {
      await document.exitPictureInPicture()
      setIsShowPip(false)
    }
  }, [webcamStream, webCamPreviewRef.current])

  const handleEnterPip = () => {
    setIsShowPip(true)

    if (webCamPreviewRef && webCamPreviewRef.current && webCamPreviewRef.current.paused && webcamStream) {
      webCamPreviewRef.current.play()
    }
  }
  const handleLeavePip = () => {
    if (webCamPreviewRef && webCamPreviewRef.current && !webCamPreviewRef.current.paused && webcamStream) {
      setIsShowPip(false)
      setTimeout(() => {
        webCamPreviewRef.current.play()
      }, 0)
    }
  }
  useEffect(async () => {
    if (webCamPreviewRef && webCamPreviewRef.current && webcamStream) {
      webCamPreviewRef.current.addEventListener('enterpictureinpicture', handleEnterPip)
      webCamPreviewRef.current.addEventListener('leavepictureinpicture', handleLeavePip)
    }

    return () => {
      if (webCamPreviewRef && webCamPreviewRef.current && webcamStream) {
        webCamPreviewRef.current.removeEventListener('leavepictureinpicture', handleLeavePip)
        webCamPreviewRef.current.removeEventListener('enterpictureinpicture', handleEnterPip)
      }
    }
  }, [webCamPreviewRef.current, webcamStream])

  const handleClick = () => {
    if (
      document.pictureInPictureEnabled
      && !webCamPreviewRef.current.disablePictureInPicture) {
      try {
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture()
        }
        webCamPreviewRef.current.requestPictureInPicture()
      } catch (err) {
        console.error(err)
      }
    }
  }

  if (!webcamStream) {
    return null
  }

  return (
    <div style={{
      position: 'absolute',
      bottom: 40,
      right: 0,
      display: 'flex',
      alignItems: 'flex-end'
    }}
    >
      <Button
        type="primary"
        onClick={handleClick}
        style={{
          display: isShowPip ? 'none' : 'flex'
        }}
      >
        <span>
          {t('user_webcam')}
        </span>
      </Button>
      <video
        ref={webCamPreviewRef}
        style={{
          display: isShowPip ? 'none' : 'flex'
        }}
        width={360}
        height={240}
        autoPlay
        controls={false}
        preload="metadata"
      />
    </div>
  )
}
