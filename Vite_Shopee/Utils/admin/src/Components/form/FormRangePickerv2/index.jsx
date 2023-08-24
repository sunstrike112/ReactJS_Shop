/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { FORMAT_TIME } from 'Constants/formatTime'

import { Row, Col } from 'antd'
import FormDatePicker from '../FormDatePicker'
import {
  DateRangerWrapper,
  Space,
  DateGroup,
  DateLabel
} from './styled'

const FormRangePickerV2 = ({
  label,
  startTimeName,
  endTimeName,
  setValue,
  startTime,
  endTime
}) => {
  useEffect(() => {
    if (startTime && endTime && endTime.valueOf() < startTime.valueOf()) {
      setValue(endTimeName, startTime)
    }
  }, [startTime])

  useEffect(() => {
    if (startTime && endTime && endTime.valueOf() < startTime.valueOf()) {
      setValue(startTimeName, endTime)
    }
  }, [endTime])
  return (
    <DateRangerWrapper>
      <Row>
        <Col span={10}>
          <DateLabel>
            {label}
          </DateLabel>
        </Col>
        <Col span={14}>
          <DateGroup>
            <FormDatePicker
              className="start-date"
              name={startTimeName}
              format={FORMAT_TIME.YEAR_MONTH_DATE}
              useDate
              placeholder={null}
              suffixIcon={null}
            />
            <Space>
              ~
            </Space>
            <FormDatePicker
              className="end-date"
              name={endTimeName}
              format={FORMAT_TIME.YEAR_MONTH_DATE}
              useDate
              placeholder={null}
              suffixIcon={null}
            />
          </DateGroup>
        </Col>
      </Row>
    </DateRangerWrapper>
  )
}

export default FormRangePickerV2
