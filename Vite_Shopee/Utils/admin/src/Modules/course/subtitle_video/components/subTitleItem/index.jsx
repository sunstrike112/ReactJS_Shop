/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import TimeField from 'react-advanced-timefield'
import { Button, Checkbox, Input, Tooltip } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { convertNumberToTime, convertTimeToNumber } from 'Utils'

import {
  Wrapper,
  Timer
} from './styled'

const { TextArea } = Input

const ItemSubtitle = ({
  onStartTime,
  onEndTime,
  onChecked,
  onAddNew,
  onTextChange,
  data,
  index,
  isError = false
}) => {
  const { t } = useTranslation(['subtitle'])
  const onChangeStartTime = useCallback((_event, value) => {
    const newTime = value.replace(/-/g, ':')
    const timeSeconds = newTime.padEnd(8, data.startTimeString.substr(5, 3))

    onStartTime(timeSeconds, index)
  }, [onStartTime, data, index])

  const onChangeEndTime = useCallback((_event, value) => {
    const newTime = value.replace(/-/g, ':')
    const timeSeconds = newTime.padEnd(8, data.startTimeString.substr(5, 3))

    onEndTime(timeSeconds, index)
  }, [onEndTime, data, index])

  const onWheelTime = useCallback(
    (type, event) => {
      const newTime = convertTimeToNumber(event.target.value)
      switch (type) {
        case 'startTime':
          if (event.deltaY > 0) {
            if (newTime - 1 >= 0) onChangeStartTime(null, convertNumberToTime(newTime - 1))
          } else onChangeStartTime(null, convertNumberToTime(newTime + 1))
          break
        case 'endTime':
          if (event.deltaY > 0) {
            if (newTime - 1 >= 0) onChangeEndTime(null, convertNumberToTime(newTime - 1))
          } else onChangeEndTime(null, convertNumberToTime(newTime + 1))
          break
        default:
          break
      }
    },
    [onChangeStartTime, onChangeEndTime]
  )

  const onChangeChecked = (e) => {
    onChecked(e.target.checked, index)
  }
  const onChangeText = (e) => {
    onTextChange(e.target.value, index)
  }
  return (
    <Wrapper>
      <Checkbox
        className="mr-12" // do not use gap property cause => error
        onChange={onChangeChecked}
        checked={data.checked}
        tabIndex="-1"
      />
      <TextArea
        className="mr-12"
        onChange={onChangeText}
        value={data.content}
        rows={3}
        maxLength={200}
      />
      <Timer isError={isError} className="mr-12">
        <TimeField
          showSeconds
          onWheel={(e) => onWheelTime('startTime', e)}
          value={data.startTimeString || '00:00:00'}
          onChange={onChangeStartTime}
          className="field-item"
        />
        <TimeField
          showSeconds
          onWheel={(e) => onWheelTime('endTime', e)}
          value={data.endTimeString || '00:00:00'}
          onChange={onChangeEndTime}
          className="field-item"
        />
      </Timer>
      <Tooltip title={t('insert_row_above')}>
        <Button
          tabIndex="-1"
          type="text"
          icon={<PlusCircleTwoTone style={{ fontSize: 20 }} />}
          className="btn-add"
          onClick={() => onAddNew(index)}
        />
      </Tooltip>
    </Wrapper>
  )
}

export default ItemSubtitle
