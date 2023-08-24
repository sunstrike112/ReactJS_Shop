/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { InputNumber, TimePicker } from 'antd'
import { Text } from 'Components'
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useVideoEditor } from 'Hooks'

import { FORMAT_TIME } from 'Constants/formatTime'
import moment from 'moment/moment'
import { convertTimeToNumber } from 'Utils'
import _ from 'lodash'
import { Container, EditButton, Row } from './styled'

const EditPause = ({
  data,
  visible,
  onClosePopup,
  pause,
  isPlay,
  setIsplay,
  videoRef }) => {
  const {
    VideoEditorState,
    setCurrentTimeAction
  } = useVideoEditor()

  const {
    videoData,
    timeLines
  } = VideoEditorState

  const { t } = useTranslation('project')
  const { updateItemPositionAction } = useVideoEditor()

  const [startTime, setStartTime] = React.useState(data?.startTime)
  const [endTime, setEndTime] = React.useState(data?.endTime)
  const [duration, setDuration] = React.useState(videoData?.duration)
  const [milisecondStart, setMilisecondStart] = React.useState('')
  const [milisecondEnd, setMilisecondEnd] = React.useState('')
  const [disable, setDisable] = React.useState(false)
  const [durationPause, setDurationPause] = React.useState(0)

  useEffect(async () => {
    if (isPlay && visible) {
      setIsplay(false)
      await pause()
    } else {
      setDisable(false)
    }
  }, [visible])

  useEffect(() => {
    setStartTime(moment.utc(data.startTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND))
    setEndTime(moment.utc(data.endTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND))
    setDuration(moment.utc(videoData.duration * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND))
    setMilisecondStart(moment.utc(data.startTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND).substr(9, 1))
    setMilisecondEnd(moment.utc(data.endTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND).substr(9, 1))
    updateItemPositionAction({
      dataItem: {
        ...data,
        isActiveItem: true
      },
      isChangePosition: true
    })
  }, [data?.startTime, data?.endTime, visible, videoData.duration])

  const checkDisaleButton = () => {
    if (startTime >= endTime || (data.type === 'split' && endTime > duration) || startTime > duration) {
      return true
    }
    return false
  }

  const onChangeMilisecondStart = (number) => {
    setMilisecondStart(number)
    const milisecondStartTimeConvert = startTime.substr(0, 9).concat(number)
    setStartTime(milisecondStartTimeConvert)
  }

  const onChangeMilisecondEnd = (number) => {
    setMilisecondEnd(number)
    const milisecondEndTimeConvert = endTime.substr(0, 9).concat(number)
    setEndTime(milisecondEndTimeConvert)
  }

  const onChangeStartTime = (time, timeString) => {
    const startTimeConvert = timeString.concat('.').concat(milisecondStart)
    setStartTime(startTimeConvert)
  }

  const onChangeEndTime = (time, timeString) => {
    const endTimeConvert = timeString.concat('.').concat(milisecondEnd)
    setEndTime(endTimeConvert)
  }

  useEffect(() => {
    if (endTime < startTime) {
      setDisable(true)
    } else {
      setDisable(false)
    }
    if (typeof startTime === 'string') {
      const listPause = timeLines.filter((i) => i.type === 'pause' && i.isActiveItem === false)
      const splitStartTime = startTime.substr(0, 8)
      const convertNumber = convertTimeToNumber(splitStartTime) + milisecondStart / 10
      const checkStartTimeExists = listPause.some((i) => {
        const start = i.startTime.toFixed(2).slice(0, -1)
        const check = convertNumber % 1 === 0
        return start === (check ? String(convertNumber).concat('.').concat('0') : String(convertNumber))
      })

      if (checkStartTimeExists) {
        setDisable(true)
      } else {
        setDisable(false)
      }
    }
  }, [startTime, endTime, milisecondStart, milisecondEnd])

  useEffect(() => {
    setDurationPause(moment.duration(endTime) - moment.duration(startTime))
  }, [milisecondStart, milisecondEnd, startTime, endTime])

  const onSubmit = () => {
    const dataItem = {
      ...data,
      startTime: convertTimeToNumber(startTime) + (milisecondStart / 10),
      endTime: convertTimeToNumber(endTime) + (milisecondEnd / 10)
    }

    updateItemPositionAction({
      dataItem,
      isChangePosition: true
    })
    setCurrentTimeAction(0)
    videoRef.current.setCurrentTime(0)
    onClosePopup(false)
  }

  const validateRange = (start, end) => {
    const arr = []
    let i = start
    while (i < end) {
      arr.push(i)
      // eslint-disable-next-line no-plusplus
      i++
    }
    return arr
  }

  const hourEnd = moment(duration, 'HH:mm:ss').hour()
  const minutesEnd = moment(duration, 'HH:mm:ss').minutes()
  const hourStart = moment(endTime, 'HH:mm:ss').hour()
  const minutesStart = moment(endTime, 'HH:mm:ss').minutes()

  return (
    <Container>
      <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '50%', marginRight: '1rem' }}>
            <Text.primary fontWeight="fw_600" fontSize="size_14">
              {t('start_time')}
            </Text.primary>
            <TimePicker
              inputReadOnly
              needsConfirmation={false}
              value={moment(startTime, 'HH:mm:ss')}
              style={{ marginTop: '5px', borderRadius: '5px', color: 'black' }}
              onChange={onChangeStartTime}
              showNow={false}
              clearIcon={false}
              disabledHours={() => (data.type === 'split' ? validateRange(hourStart + 1, 24) : validateRange(hourEnd + 1, 24))}
              disabledMinutes={() => (data.type === 'split' ? validateRange(minutesStart + 1, 60) : validateRange(minutesEnd + 1, 60))}
            />
          </div>
          <div style={{ width: '40%', lineHeight: '28px' }}>
            <Text.primary fontWeight="fw_600" fontSize="size_14">
              {t('milisecond')}
            </Text.primary>
            <InputNumber
              style={{ backgroundColor: 'white', borderRadius: '4px' }}
              value={milisecondStart}
              onChange={onChangeMilisecondStart}
              min={0}
              max={9}
              maxLength={1}
            />
          </div>

        </div>
      </Row>
      <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '50%', marginRight: '1rem' }}>
            <Text.primary fontWeight="fw_600" fontSize="size_14">
              {t('end_time')}
            </Text.primary>
            <TimePicker
              inputReadOnly
              needsConfirmation={false}
              value={moment(endTime, 'HH:mm:ss')}
              style={{ marginTop: '5px', borderRadius: '5px', color: 'black' }}
              onChange={onChangeEndTime}
              showNow={false}
              clearIcon={false}
              disabledHours={() => data.type === 'split' && validateRange(hourEnd + 1, 24)}
              disabledMinutes={() => data.type === 'split' && validateRange(minutesEnd + 1, 60)}
            />
          </div>
          <div style={{ width: '40%', lineHeight: '28px' }}>
            <Text.primary fontWeight="fw_600" fontSize="size_14">
              {t('milisecond')}
            </Text.primary>
            <InputNumber
              style={{ backgroundColor: 'white', borderRadius: '4px' }}
              value={milisecondEnd}
              onChange={onChangeMilisecondEnd}
              min={0}
              max={9}
              maxLength={1}
            />
          </div>
        </div>
      </Row>
      <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        {(checkDisaleButton() || disable) && (
        <Text.primary fontWeight="fw_600" fontSize="size_14" style={{ textAlign: 'center', color: 'red' }}>
          {t('overlapping_time')}
        </Text.primary>
        )}
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        {endTime > startTime && (
        <Text.primary fontWeight="fw_600" fontSize="size_14">
          {t('duration')}: {(durationPause / 1000).toFixed(1)}s
        </Text.primary>
        )}

      </div>

      <Row style={{ justifyContent: 'flex-end' }}>
        <EditButton onClick={onSubmit} disabled={checkDisaleButton() || disable}>
          {t('save')}
        </EditButton>
      </Row>
    </Container>
  )
}

export default EditPause
