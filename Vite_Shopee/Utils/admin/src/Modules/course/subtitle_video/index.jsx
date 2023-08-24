/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useParams, Prompt } from 'react-router-dom'
import { Title, VideoJS } from 'Components'
import { useSubTitle, useQuery, useHistories } from 'Hooks'

import { useTranslation } from 'react-i18next'
import { Button, Spin, Tooltip } from 'antd'
import { convertTimeToNumber, convertNumberToTime, getFileFromS3 } from 'Utils'
import { Wrapper } from 'Themes/facit'
import { DeleteOutlined, EditOutlined, InfoCircleOutlined, PlusOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons'
import { RoutesName } from '../routes'

import Item from './components/subTitleItem'
import {
  SubTitleWrapper,
  Left,
  Right,
  Loading
} from './styled'

const SubtitleVideoScreen = () => {
  const playerRef = useRef(null)
  const history = useHistories()
  const { t } = useTranslation(['subtitle'])
  const [subtitles, setSubtitles] = useState([])
  const [isShowLeave, setIsShowLeave] = useState(false)
  const [duration, setDuration] = useState(0)
  const [isSubmit, setIsSubmit] = useState(false)
  const { uploadSubTitleAction, videoDetail, isLoading, loadVideoDetailAction } = useSubTitle()
  const { id } = useParams()
  const query = useQuery()
  const folderId = query.get('folderId')
  const { push } = useHistories()
  const onChangeStartTime = (timeString, index) => {
    const updateSubtitle = subtitles.map((item, i) => (index === i ? {
      ...item,
      startTimeString: timeString,
      startTime: convertTimeToNumber(timeString)
    } : item))
    setSubtitles(updateSubtitle)
    setIsShowLeave(true)
  }
  const onChangeEndTime = (timeString, index) => {
    const updateSubtitle = subtitles.map((item, i) => (index === i ? {
      ...item,
      endTimeString: timeString,
      endTime: convertTimeToNumber(timeString)
    } : item))
    setSubtitles(updateSubtitle)
    setIsShowLeave(true)
  }
  const onChangeChecked = (checked, index) => {
    const updateSubtitle = subtitles.map((item, i) => (index === i ? {
      ...item,
      checked
    } : item))
    setSubtitles(updateSubtitle)
    setIsShowLeave(true)
  }
  const onChangeText = (value, index) => {
    const updateSubtitle = subtitles.map((item, i) => (index === i ? {
      ...item,
      content: value
    } : item))
    setSubtitles(updateSubtitle)
    setIsShowLeave(true)
  }

  const saveSubtitle = async (isSave = false) => {
    await setIsShowLeave(false)
    await setIsSubmit(true)
    uploadSubTitleAction({
      subtitles: subtitles.map((item) => ({
        content: item.content,
        startTime: item.startTime,
        endTime: item.endTime
      })).filter((item) => item.content),
      videoId: id,
      isSave,
      RouteName: RoutesName.UPLOAD_FILE,
      folderId,
      history
    })
  }
  const onSave = async () => {
    await setIsShowLeave(false)

    saveSubtitle(true)
  }
  const deleteSubtitleItem = () => {
    const updateSubtitle = subtitles.filter((item) => !item.checked)
    setSubtitles(updateSubtitle)
    setIsShowLeave(true)
  }

  const disabled = useMemo(() => {
    if (subtitles.length > 0) {
      const mapData = subtitles.map((item, index) => {
        if (index > 0 && index < subtitles.length) {
          return (item.startTime > item.endTime) || (item.startTime < subtitles[index - 1].endTime) || (item.startTime > Math.floor(duration + 1)) || (item.endTime > Math.floor(duration + 1))
        }
        return item.startTime > item.endTime || (item.startTime > Math.floor(duration + 1)) || (item.endTime > Math.floor(duration + 1))
      })
      const filterErros = mapData.filter((item) => item === true)
      return filterErros.length > 0
    }
    return false
  }, [subtitles, duration])

  const errors = useMemo(() => {
    if (subtitles.length > 0 && duration) {
      const mapData = subtitles.map((item, index) => {
        if (index > 0 && index < subtitles.length) {
          return (item.startTime >= item.endTime) || (item.startTime < subtitles[index - 1].endTime) || (item.startTime > Math.floor(duration + 1)) || (item.endTime > Math.floor(duration + 1))
        }
        return item.startTime >= item.endTime || (item.startTime > Math.floor(duration + 1)) || (item.endTime > Math.floor(duration + 1))
      })
      return mapData
    }
    return []
  }, [subtitles, duration])

  const disabledDelete = useMemo(() => {
    if (subtitles.length > 0) {
      const updateSubtitle = subtitles.filter((item) => item.checked)
      return updateSubtitle <= 0
    }
    return true
  }, [subtitles])

  const onAddNew = useCallback(
    (index = subtitles.length) => {
      setIsShowLeave(true)
      setSubtitles(
        [
          ...subtitles.slice(0, index),
          {
            key: `sub-title${Date.now()}`,
            startTime: 0,
            endTime: 0,
            subtitle: '',
            checked: false,
            startTimeString: '00:00:00',
            endTimeString: '00:00:00'
          },
          ...subtitles.slice(index)
        ]
      )
    }, [subtitles]

  )

  const renderListSubtitle = () => {
    if (subtitles && subtitles.length > 0) {
      return subtitles.map((item, index) => (
        <Item
          onAddNew={onAddNew}
          onStartTime={onChangeStartTime}
          onEndTime={onChangeEndTime}
          onTextChange={onChangeText}
          onChecked={onChangeChecked}
          data={item}
          index={index}
          key={item.key}
          isError={errors[index]}
        />
      ))
    }
    return <></>
  }
  const onLoadedData = (e) => {
    const { duration: dur } = e.target.player.cache_
    if (dur) {
      setDuration(dur)
    }
  }

  const videoJsOptions = useMemo(() => ({ // lookup the options in the docs for more options
    autoplay: false,
    controls: true,
    // responsive: true,
    fluid: true,
    crossorigin: 'anonymous',
    playbackRates: [0.5, 1, 1.5, 2],
    sources: [{
      src: getFileFromS3(videoDetail?.filePath),
      type: 'video/mp4'
    }, {
      src: getFileFromS3(videoDetail?.filePath),
      type: 'video/webm'
    }, {
      src: getFileFromS3(videoDetail?.filePath),
      type: 'video/3gp'
    }],
    html5: {
      nativeTextTracks: false
    },
    textTrackSettings: false,
    controlBar: {
      pictureInPictureToggle: false
    }
  }), [videoDetail])

  const tracks = useMemo(() => ([{ src: videoDetail.pathSub, kind: 'captions', srcLang: 'auto', label: 'Auto', default: 'showing' }]), [videoDetail])

  const handlePlayerReady = (player) => {
    playerRef.current = player
    player.on('loadeddata', (e) => {
      onLoadedData(e)
    })
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <Loading>
          <Spin
            size="large"
            tip={isSubmit ? 'Saving...' : 'Loading...'}
          />
        </Loading>
      )
    }
    return (
      <SubTitleWrapper>
        <Left>
          {renderListSubtitle()}
        </Left>
        <Right>
          <VideoJS
            options={videoJsOptions}
            onReady={handlePlayerReady}
            tracks={tracks}
          />
          <div className="bottom-actions">
            <Button
              icon={<RollbackOutlined />}
              onClick={() => push(RoutesName.UPLOAD_FILE)}
              size="large"
            >
              {t('back')}
            </Button>
            <Button
              type="primary"
              onClick={onSave}
              icon={<SaveOutlined />}
              disabled={disabled || !isShowLeave || errors.some((item) => item)}
              size="large"
            >
              {t('save')}
            </Button>
          </div>
        </Right>
      </SubTitleWrapper>
    )
  }

  useEffect(() => {
    loadVideoDetailAction(id)
  }, [id])

  useEffect(() => {
    if (videoDetail && videoDetail.subtitles) {
      const initSubtitles = videoDetail.subtitles.map((item, index) => ({
        ...item,
        key: `sub-title${index}`,
        checked: false,
        startTimeString: convertNumberToTime(item.startTime),
        endTimeString: convertNumberToTime(item.endTime)
      }))
      setSubtitles(initSubtitles || [])
    }
  }, [videoDetail])

  useEffect(() => {
    if (!(disabled || !isShowLeave)) {
      const unloadCallback = (e) => {
        e.preventDefault()
        e.returnValue = ''
        return ''
      }
      window.addEventListener('beforeunload', unloadCallback, {})
      return () => {
        window.removeEventListener('beforeunload', unloadCallback, {})
      }
    }
  }, [disabled, isShowLeave])

  return (
    <Wrapper>
      <Title icon={EditOutlined} title={t('title')} />
      <div className="title">
        <span className="title__main">{t('video_name')}</span>
        <span>{videoDetail?.fileName}</span>
      </div>
      <div className="top-actions">
        <Button
          icon={<PlusOutlined />}
          onClick={() => onAddNew()}
        >
          {t('add_subtitle')}
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={deleteSubtitleItem}
          disabled={disabledDelete}
        >
          {t('delete_subtitle')}
        </Button>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={() => saveSubtitle(false)}
          disabled={disabled || !isShowLeave || errors.some((item) => item)}
        >
          {t('save_preview')}
        </Button>
        <Tooltip title={t('tip_guideline')} placement="right">
          <InfoCircleOutlined style={{ fontSize: 20 }} />
        </Tooltip>
      </div>
      {renderContent()}

      <Prompt
        when={isShowLeave}
        message={t('leave_confirm')}
      />
    </Wrapper>
  )
}

export default SubtitleVideoScreen
