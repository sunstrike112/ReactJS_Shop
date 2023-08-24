/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useMemo, useImperativeHandle, forwardRef, useCallback } from 'react'
import styled from 'styled-components'
import { useVideoEditor } from 'Hooks'
import { getSizesWithoutPadding } from 'Utils/getSizesWithoutPadding'
import { getFileFromS3 } from 'Utils'
import VideoItems from '../videoItem'

const Container = styled.div`
  display: flex;
  position: relative;
  height: ${({ height }) => `${height}px`};
  justify-content: center;
  align-items: center;
  width: ${({ isVideoMobile }) => (isVideoMobile ? '260px' : '100%')};
  flex: 0 0 70%;

  @media only screen and (max-height: 900px) {
    width: ${({ isVideoMobile }) => (isVideoMobile ? '200px' : '560px')};
  }

  @media screen and (max-height: 800px) {
    width: ${({ isVideoMobile }) => (isVideoMobile ? '200px' : '420px')};
  }

  @media screen and (max-height: 700px) {
    width: ${({ isVideoMobile }) => (isVideoMobile ? '200px' : '360px')};
  }
`

const StyledVideo = styled.video`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const ItemWrapper = styled.div`
  position: relative;
  z-index: 99;
  width: 100%;
  height: 100%;
`

const VideoCore = ({ setIsplay, isPlay }, ref) => {
  const {
    VideoEditorState,
    setVideoDimensionsAction,
    setDurationAction,
    setCurrentTimeAction,
    removeLayerAction,
    setRatioScaleAction,
    setTimeLinesAction
  } = useVideoEditor()
  const containerRef = useRef(document.createElement('div'))
  const { videoData, timeLines, projectDetail } = VideoEditorState

  const dataVideoItem = timeLines.filter((item) => item.type !== 'split' || item.type !== 'pause')
  const [bounds, setBounds] = useState()

  const [dimensionContainer, setDimensionContainer] = useState({
    preWidth: 0,
    preHeight: 0,
    width: 0,
    height: 0
  })
  const videoRef = useRef(null)
  const [isLoadMetadata, setIsLoadMetadata] = useState(false)
  const setDimension = (width, videoRatio) => setDimensionContainer((state) => ({
    width,
    height: width * (1 / videoRatio),
    preWidth: state.width,
    preHeight: state.height
  }))

  useEffect(() => {
    if (containerRef && containerRef.current && isLoadMetadata && videoData.height) {
      setDimension(containerRef.current.clientWidth, videoData.videoRatio)
    }
  }, [containerRef, isLoadMetadata, videoData.height, videoData.videoRatio])

  const onResizeContainer = () => {
    if (containerRef && containerRef.current) {
      setDimension(containerRef.current.clientWidth, videoData.videoRatio)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', onResizeContainer)

    return () => {
      window.removeEventListener('resize', onResizeContainer)
    }
  }, [videoData.videoRatio])

  useEffect(() => {
    const onLoadMetadata = (e) => {
      const element = e.target
      if (!isLoadMetadata) {
        const dimension = getSizesWithoutPadding(element, true)
        setVideoDimensionsAction({
          width: dimension.videoWidth,
          height: dimension.videoHeight,
          videoRatio: dimension.videoWidth / dimension.videoHeight
        })
        if (!isNaN(element.duration)) {
          setDurationAction(element.duration)
          setIsLoadMetadata(true)
        }
      }
    }
    if (projectDetail && projectDetail.filePath !== null) {
      videoRef.current.src = getFileFromS3(projectDetail.filePath)
      videoRef.current.addEventListener('loadeddata', onLoadMetadata)
    }
    return () => {
      videoRef.current?.removeEventListener('loadeddata', onLoadMetadata)
    }
  }, [videoRef, isLoadMetadata, projectDetail])

  const ratioScale = useMemo(() => {
    if (!dimensionContainer || !dimensionContainer.width || !videoData.width) {
      return 1
    }
    return dimensionContainer.width / videoData.width || 1
  }, [dimensionContainer, videoData.widt])

  useEffect(() => {
    setRatioScaleAction(ratioScale)
  }, [ratioScale])

  useEffect(() => {
    if (dimensionContainer.preWidth && dataVideoItem.length > 0) {
      const { width, preWidth } = dimensionContainer
      const timeLinesUpdate = dataVideoItem.map((item) => ({
        ...item,
        position: {
          height: item.position.height * (width / preWidth),
          width: item.position.width * (width / preWidth),
          heightBound: item.position.heightBound * (width / preWidth),
          widthBound: item.position.widthBound * (width / preWidth),
          x: item.position.x * (width / preWidth),
          y: item.position.y * (width / preWidth),
          posX: item.position.posX * (width / preWidth),
          posY: item.position.posY * (width / preWidth),
          rotate: item.position.rotate,
          scale: item.position.scale * (width / preWidth)
        },
        textStyle: {
          fontSize: item.textStyle.fontSize,
          isBold: item.textStyle.isBold,
          fontFamily: item.textStyle.fontFamily,
          content: item.textStyle.content,
          color: item.textStyle.color,
          isItalic: item.textStyle.isItalic,
          textAlign: item.textStyle.textAlign
        },
        isCreateNewItem: false
      }))
      setTimeLinesAction(timeLinesUpdate)
    }
  }, [dimensionContainer])

  useEffect(() => {
    if (dimensionContainer) {
      setBounds({
        left: 0,
        top: 0,
        right: dimensionContainer.width,
        bottom: dimensionContainer.height
      })
    }
  }, [dimensionContainer])

  useImperativeHandle(ref, () => ({
    play: () => {
      if (projectDetail?.filePath !== null) {
        videoRef.current.play()
      }
    },
    pause: () => {
      if (projectDetail?.filePath !== null) {
        videoRef.current.pause()
      }
    },
    setCurrentTime: (time) => {
      if (projectDetail?.filePath !== null) {
        videoRef.current.currentTime = time
      }
    }
  }))

  const handleDeleteItem = useCallback((e) => {
    if (e.key === 'Delete') {
      const curLayer = dataVideoItem.find((layer) => layer.isActiveItem)
      if (curLayer) {
        removeLayerAction(curLayer.id)
      }
    }
  }, [dataVideoItem])

  useEffect(() => {
    window.addEventListener('keydown', handleDeleteItem)
    return () => {
      window.removeEventListener('keydown', handleDeleteItem)
    }
  }, [handleDeleteItem])

  return (
    <Container
      ref={containerRef}
      height={dimensionContainer.height}
      isVideoMobile={videoData.videoRatio < 1}
      className="video-core"
    >
      <StyledVideo
        ref={videoRef}
        onEnded={() => {
          setIsplay(false)
          videoRef.current.currentTime = 0
        }}
        onTimeUpdate={(e) => setCurrentTimeAction(e.target.currentTime)}
        style={{ border: '2px solid green' }}
      />
      <ItemWrapper>
        {(dataVideoItem.length > 0) && dataVideoItem.map((item) => (
          <VideoItems
            key={item.selector}
            isPlay={isPlay}
            bounds={bounds}
            boundingClientRect={containerRef.current?.getBoundingClientRect()}
            dataSource={item}
          />
        ))}
      </ItemWrapper>
    </Container>
  )
}

export default forwardRef(VideoCore)
