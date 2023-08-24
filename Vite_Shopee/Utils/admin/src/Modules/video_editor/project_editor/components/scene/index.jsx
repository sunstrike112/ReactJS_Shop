/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { useHistories, useVideoEditor } from 'Hooks'
import { convertNumberToTime, editorconvertNumberToTime, editorconvertNumberToTimeV2 } from 'Utils'
import _ from 'lodash'
import moment from 'moment'
import { FORMAT_TIME } from 'Constants/formatTime'
import { Layers, Elements, AddText } from '../index'

import {
  Container,
  PublishButton,
  TabsStyled as Tabs
} from './styled'
import { VIDEO_STATUS, TABSKEY } from '../../../constants'
import ConfirmConbineVideo from '../confirmCombineVideo'

const { TabPane } = Tabs
const Scene = ({
  projectId,
  setCurrentTime,
  pause,
  isPlay,
  status,
  setIsplay,
  play,
  videoRef,
  checkVisibleFormEdit
}) => {
  const {
    VideoEditorState,
    exportVideoSplitPauseAction
  } = useVideoEditor()

  const { t } = useTranslation('project')
  const history = useHistories()

  const {
    timeLines,
    ratioScale,
    projectDetail,
    isLoading,
    exportStatus,
    isShowLeavePopup,
    videoData
  } = VideoEditorState
  const [activeKey, setActiveKey] = useState(TABSKEY.LAYER)
  const [showPopupConfirm, setShowPopupConfirm] = useState(false)
  const [disablePublish, setDisablePublish] = useState(false)
  const [listElementAddSplit, setListElementAddSplit] = useState([])
  const listSplitAction = timeLines.filter((item) => item.type === 'split')
  const listElement = timeLines.filter((item) => item.type !== 'split')
  const resultSplit = listSplitAction.map((data) => ({ actionName: 'SPLIT',
    duration: String(data.endTime - data.startTime),
    startTime: moment.utc(data?.startTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND) }))
  const filterSplitPause = timeLines.filter((i) => i.type === 'pause' || i.type === 'split')

  useEffect(() => {
    if (listElement?.length > 0) {
      const filterElenment = listElement?.map((item) => {
        if (item?.startTime < listSplitAction[0]?.startTime && item?.endTime >= listSplitAction[0]?.startTime && item?.endTime <= listSplitAction[0]?.endTime) {
          return ({
            ...item,
            startTime: listSplitAction[0]?.startTime ? listSplitAction[0]?.startTime - listSplitAction[0]?.startTime : 0,
            endTime: listSplitAction[0]?.startTime ? item?.endTime - listSplitAction[0]?.startTime : item?.endTime
          })
        }

        if (item?.endTime > listSplitAction[0]?.endTime && item?.startTime <= listSplitAction[0]?.endTime && item?.startTime >= listSplitAction[0]?.startTime) {
          return ({
            ...item,
            startTime: listSplitAction[0]?.startTime ? item?.startTime - listSplitAction[0]?.startTime : item?.startTime,
            endTime: listSplitAction[0]?.startTime ? item?.endTime - listSplitAction[0]?.startTime : item?.endTime
          })
        }

        if ((item?.startTime < listSplitAction[0]?.startTime && item?.endTime < listSplitAction[0]?.startTime)
        || (item?.startTime > listSplitAction[0]?.endTime && item?.endTime > listSplitAction[0]?.endTime)) {
          return null
        }

        return ({
          ...item,
          startTime: listSplitAction[0]?.startTime ? item?.startTime - listSplitAction[0]?.startTime : item?.startTime,
          endTime: listSplitAction[0]?.startTime ? item?.endTime - listSplitAction[0]?.startTime : item?.endTime
        })
      })

      const result = filterElenment?.filter((item) => item !== null)
      setListElementAddSplit(result)
    } else {
      setListElementAddSplit(listElement)
    }
  }, [timeLines])

  const handlePublish = async () => {
    if (isPlay) {
      setIsplay(false)
      await pause()
    }
    setCurrentTime(0)
    const result = listElementAddSplit.filter((item) => item.type !== 'pause')
    const filterPlistPause = listElementAddSplit.filter((data) => data.type === 'pause')
    const resultListPause = filterPlistPause.map((data) => ({ actionName: 'PAUSE',
      duration: String(data.endTime - data.startTime),
      startTime: moment.utc(data?.startTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND) }))
    const videoProperties = result.map((item) => {
      const pauseOut = filterPlistPause.filter((i) => i.startTime < item.startTime && i.startTime < item.endTime)
      const pauseOn = filterPlistPause.filter((i) => item.startTime <= i.startTime && item.endTime >= i.startTime)
      const sumTimePauseOn = pauseOn.map((e) => e.endTime - e.startTime)
      const sumTimePauseOut = pauseOut.map((i) => i.endTime - i.startTime)
      return ({
        type: item.type,
        image: `${item.id}.png`,
        startTimeNumber: sumTimePauseOut.length > 0 ? item.startTime + _.sum(sumTimePauseOut) : item.startTime,
        endTimeNumber: sumTimePauseOn.length > 0 || sumTimePauseOut.length > 0 ? item.endTime + _.sum(sumTimePauseOut) + _.sum(sumTimePauseOn)
          : item.endTime,
        startTime: sumTimePauseOut.length > 0 ? editorconvertNumberToTimeV2(item.startTime + _.sum(sumTimePauseOut)) : editorconvertNumberToTimeV2(item.startTime),
        endTime: sumTimePauseOn.length > 0 || sumTimePauseOut.length > 0 ? editorconvertNumberToTimeV2(item.endTime + _.sum(sumTimePauseOut) + _.sum(sumTimePauseOn))
          : editorconvertNumberToTimeV2(item.endTime),
        duration: (item.endTime - item.startTime) * 1000,
        imageName: item.imageName,
        position: {
          x: item.position.x / ratioScale,
          y: item.position.y / ratioScale,
          width: item.position.width / ratioScale,
          height: item.position.height / ratioScale,
          rotation: item.position.rotate,
          widthBound: item.position.widthBound / ratioScale,
          heightBound: item.position.heightBound / ratioScale,
          posX: item.position.posX / ratioScale,
          posY: item.position.posY / ratioScale,
          scale: 1
        },
        id: item.id,
        name: item.name,
        index: item.zIndex + 1,
        color: item.color,
        textStyle: {
          fontSize: item.textStyle.fontSize,
          fontWeight: item.textStyle.isBold ? 'bold' : 'normal', // Normal or bold,
          fontFamily: item.textStyle.fontFamily,
          content: item.textStyle.content,
          color: item.textStyle.color,
          isItalic: item.textStyle.isItalic,
          textEncode: item.textStyle.textEncode,
          textAlign: item.textStyle.textAlign
        }
      })
    })
    const dataJson = {
      id: projectId,
      url: projectDetail.filePath,
      videoProperties,
      actions: resultSplit.concat(resultListPause)
    }

    if (listSplitAction.length > 0) {
      if (videoData.duration - (listSplitAction[0].endTime - listSplitAction[0].startTime) < 1 || listSplitAction[0].endTime - listSplitAction[0].endTime === videoData.duration) {
        // eslint-disable-next-line no-alert
        alert(t('error_combine_video'))
        return
      }
    }
    exportVideoSplitPauseAction(dataJson)
  }

  useEffect(() => {
    if (exportStatus === 'exported') history.push('/project-list')
  }, [exportStatus])

  const disabledExport = React.useMemo(() => {
    if (!projectDetail) {
      return true
    }
    if (projectDetail && timeLines && timeLines.length === 0 && status === VIDEO_STATUS.ACTIVE) {
      return true
    }
    return status === VIDEO_STATUS.EXPORTING || exportStatus === 'exporting' || isLoading || !isShowLeavePopup
  }, [status, exportStatus, isLoading, isShowLeavePopup, projectDetail, timeLines])

  const checkVisible = (data) => {
    setDisablePublish(data)
    checkVisibleFormEdit(data)
  }

  return (
    <Container>
      <div className="scene_actions">
        <ConfirmConbineVideo
          visible={showPopupConfirm}
          onClosePopup={() => setShowPopupConfirm(false)}
          onSubmit={handlePublish}
        />
        <PublishButton
          onClick={() => {
            if (filterSplitPause.length > 0) {
              setShowPopupConfirm(true)
            } else {
              handlePublish()
            }
          }}
          icon={<UploadOutlined />}
          disabled={disabledExport || !isShowLeavePopup || disablePublish}
        >
          {t('export')}
        </PublishButton>
      </div>
      <Tabs
        defaultActiveKey="1"
        size="small"
        hideAdd
        moreIcon={() => null}
        centered
        activeKey={activeKey}
        onTabClick={(key) => setActiveKey(key)}
      >
        <TabPane tab={t('layers')} key={TABSKEY.LAYER}>
          <Layers
            pause={pause}
            isPlay={isPlay}
            setIsplay={setIsplay}
            videoRef={videoRef}
            checkVisible={checkVisible}
          />
        </TabPane>
        <TabPane tab={t('elements')} key={TABSKEY.ELEMENTS}>
          <Elements
            pause={pause}
            isPlay={isPlay}
            setIsplay={setIsplay}
            play={play}
          />
        </TabPane>
        <TabPane tab={t('text')} key={TABSKEY.TEXT}>
          <AddText
            pause={pause}
            isPlay={isPlay}
            setIsplay={setIsplay}
            play={play}
            setActiveKey={setActiveKey}
            activeKey={activeKey}
          />
        </TabPane>

      </Tabs>
    </Container>
  )
}

export default Scene
