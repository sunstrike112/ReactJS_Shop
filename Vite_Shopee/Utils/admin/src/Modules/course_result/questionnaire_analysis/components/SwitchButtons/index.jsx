/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { Row, Col, Tabs, Button } from 'antd'
import { pickBy, identity } from 'lodash'
import moment from 'moment'

import { useCourseStatus, useMyCompany, useGroupAttribute } from 'Hooks'
import { handleSearchSelectTree } from 'Utils'
import {
  FormInput,
  FormTreeSelect,
  FormRangePickerV2,
  HeaderSearch,
  FormSelect
} from 'Components'
import styled from 'styled-components'

const SwitchButtonsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  .ant-btn {
    border-radius: 0px !important;
    width: 100%;

    &.active{
      color: #40a9ff;
      border-color: #40a9ff;
    }

    &:first-child {
      border-radius: 8px 0px 0px 8px !important;
    }
    &:last-child {
      border-radius: 0px 8px 8px 0px !important;
    }
  } 
`
const SwitchButtons = ({ buttons, activeKey }) => {
  const { t } = useTranslation(['courseResult'])
  const [current, setCurrent] = useState(activeKey || buttons[0].key)

  useEffect(() => {
    setCurrent(activeKey)
  }, [activeKey])

  const handleChange = useCallback(
    (key) => {
      setCurrent(key)
    },
    []
  )

  return (
    <SwitchButtonsStyled>
      {buttons.map(({ name, key, onClick, ...restButton }) => (
        <Button
          {...restButton}
          className={current === key ? 'active' : ''}
          key={key}
          onClick={() => {
            onClick(key)
            handleChange(key)
          }}
        >
          {name}
        </Button>
      ))}
    </SwitchButtonsStyled>
  )
}

export default SwitchButtons
