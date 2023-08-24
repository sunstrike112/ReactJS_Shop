/* eslint-disable react/prop-types */
import React from 'react'
import { HeaderSearch } from 'Components'
import { Row, Checkbox, Spin } from 'antd'
import { useSettingCourseJobnare } from 'Hooks'
import styled from 'styled-components'

const Wrapper = styled.div`
  .ant-form.ant-form-horizontal {
    justify-content: flex-start;
    align-items: flex-start;
    margin: 15px 10px 5px;
    font-size: 18px;
  }
`

const CheckboxGuide = styled.span`
  margin-right: 20px;
`

const AutoAssignWrapper = ({ t }) => {
  const {
    updateAutoStatusAction,
    assignAuto,
    pagination,
    isAutoAssigning
  } = useSettingCourseJobnare()

  const { page, limit } = pagination

  const handleChangeAutoAssignStatus = () => {
    updateAutoStatusAction({ page, limit })
  }

  return (
    <Wrapper>
      <HeaderSearch>
        <Row>
          <CheckboxGuide>{t('auto_assignment')}</CheckboxGuide>
          <Spin spinning={isAutoAssigning}>
            <Checkbox
              checked={assignAuto}
              onClick={handleChangeAutoAssignStatus}
            />
          </Spin>
        </Row>
      </HeaderSearch>
    </Wrapper>
  )
}
export default AutoAssignWrapper
