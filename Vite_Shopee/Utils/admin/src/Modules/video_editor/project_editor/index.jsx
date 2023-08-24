/* eslint-disable no-unused-vars */
import {
  Spin
} from 'antd'
import { useVideoEditor } from 'Hooks'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Prompt, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { imagesData } from '../constants'
import { Scene, SplitVideo, TimeLine, Title, Video } from './components'
import PauseVideo from './components/pauseVideo'
import { Container, DivEditVideo, Wrapper } from './styled'

const VideoEditor = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const ProjectEditorScreen = () => {
  const { t } = useTranslation('project')

  const videoRef = useRef()
  const [isPlay, setIsplay] = useState(false)
  const [isInitial, setIsInitial] = useState(true)
  // const { sidebarCompact } = useSelector(makeSelectGlobal())
  const { projectId } = useParams()
  const {
    VideoEditorState,
    getProjectDetailAction,
    setTimeLinesAction
  } = useVideoEditor()
  const {
    projectDetail,
    timeLineDimension,
    videoData,
    ratioScale,
    isLoading,
    exportStatus,
    isShowLeavePopup,
    timeLines
  } = VideoEditorState
  const [visibleForm, setVisibleForm] = useState(false)
  const listPause = timeLines?.filter((dataPause) => dataPause.type === 'pause')

  const handlePlay = () => {
    if (videoRef && videoRef.current) {
      setIsplay((state) => !state)

      if (!isPlay) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }
  const setCurrentTime = (time) => {
    videoRef.current.setCurrentTime(time)
  }

  useEffect(() => {
    if (projectDetail && projectDetail.layerJson && videoData.duration && timeLineDimension.offsetWidth && ratioScale !== 1 && isInitial) {
      setIsInitial(false)

      const parseDataJson = JSON.parse(projectDetail.layerJson)
      const transformData = parseDataJson.map((m, index) => {
        const imageSrc = imagesData.find((f) => f.label === m.imageName)
        const xPosition = (m.startTimeNumber * (timeLineDimension.offsetWidth)) / videoData.duration
        const width = ((m.endTimeNumber - m.startTimeNumber) * (timeLineDimension.offsetWidth)) / videoData.duration
        return {
          color: m.color,
          name: m.name,
          endTime: m.endTimeNumber,
          imageName: m.imageName,
          imageSrc: m.type === 'image' ? imageSrc.value : null,
          type: m.type,
          width,
          xPosition,
          trackTimePosition: 0,
          selector: m.id,
          startTime: m.startTimeNumber,
          position: {
            x: m.position.x * ratioScale,
            y: m.position.y * ratioScale,
            rotate: m.position.rotation,
            width: m.position.width * ratioScale,
            height: m.position.height * ratioScale,
            widthBound: m.position.widthBound * ratioScale,
            heightBound: m.position.heightBound * ratioScale,
            posX: m.position.posX * ratioScale,
            posY: m.position.posY * ratioScale,
            scale: 1
          },
          keepRatio: true,
          id: m.id,
          zIndex: index,
          isActiveItem: false,
          textStyle: {
            fontSize: m.textStyle.fontSize,
            isBold: m.textStyle.fontWeight === 'bold',
            fontFamily: m.textStyle.fontFamily,
            content: m.textStyle.content,
            color: m.textStyle.color,
            isItalic: m.textStyle.isItalic,
            textAlign: m.textStyle.textAlign
          },
          isCreateNewItem: false
        }
      })
      setTimeLinesAction(transformData || [])
    }
  }, [
    projectDetail,
    videoData.duration,
    timeLineDimension.offsetWidth,
    ratioScale,
    isInitial
  ])

  useEffect(() => {
    if (projectId) {
      getProjectDetailAction(projectId)
    }
  }, [projectId])

  const isShowPopupLeavePage = useMemo(() => isShowLeavePopup && exportStatus !== 'exported', [exportStatus, isShowLeavePopup])
  const checkVisibleFormEdit = (data) => {
    setVisibleForm(data)
  }

  return (
    <Spin spinning={exportStatus === 'exporting' || isLoading} size="large" tip={exportStatus === 'exporting' ? t('video_exporting') : t('common:loading')}>
      <Container>
        <Title
          title={projectDetail?.projectName}
          backRoute="/project-list"
          isPlay={isPlay}
          onPaused={handlePlay}
        />
        <Wrapper>
          <VideoEditor>
            <Video
              ref={videoRef}
              setIsplay={setIsplay}
              isPlay={isPlay}
            />
            <Scene
              projectId={projectId}
              isPlay={isPlay}
              pause={videoRef.current?.pause}
              play={videoRef.current?.play}
              setCurrentTime={videoRef.current?.setCurrentTime}
              setIsplay={setIsplay}
              status={projectDetail?.status}
              videoRef={videoRef}
              checkVisibleFormEdit={checkVisibleFormEdit}
            />
          </VideoEditor>
          <DivEditVideo>
            <SplitVideo
              pause={videoRef.current?.pause}
              play={videoRef.current?.play}
              isPlay={isPlay}
              setIsplay={setIsplay}
              setCurrentTime={videoRef.current?.setCurrentTime}
              projectId={projectId}
              status={projectDetail?.status}
            />
            <PauseVideo
              pause={videoRef.current?.pause}
              play={videoRef.current?.play}
              isPlay={isPlay}
              setIsplay={setIsplay}
              setCurrentTime={videoRef.current?.setCurrentTime}
              projectId={projectId}
              status={projectDetail?.status}
            />
          </DivEditVideo>
          <TimeLine
            setCurrentTime={setCurrentTime}
            pause={videoRef.current?.pause}
            play={videoRef.current?.play}
            onPlay={handlePlay}
            isPlay={isPlay}
            setIsplay={setIsplay}
          />
        </Wrapper>
        <Prompt
          when={isShowPopupLeavePage}
          message={t('recording:leave_confirm')}
        />
      </Container>
    </Spin>
  )
}

export default ProjectEditorScreen
