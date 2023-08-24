/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import { Status } from '../../styled'
import { TextNormal } from '../../../../components'
import { REPORT_STATUS } from '../../constants'

const ReportStatus = ({ status, isLoading }) => {
  const { t } = useTranslation()

  const getContent = (value) => {
    switch (value) {
      case REPORT_STATUS.EVALUATION_COMPLETED: {
        return {
          background: 'green_light',
          color: 'green',
          text: t('report.evaluaion_completed'),
          border: '1px solid #07CF84'
        }
      }
      case REPORT_STATUS.RESUBMITTED: {
        return {
          background: 'error_light',
          color: 'error',
          text: t('report.resubmit'),
          border: '1px solid #F33A27'
        }
      }
      case REPORT_STATUS.SUBMITTED:
      case REPORT_STATUS.WAITING_FOR_RELEASE: {
        return {
          background: 'submitted',
          color: 'pending_color',
          text: t('report.submitted'),
          border: '1px solid #FFA928'
        }
      }
      case REPORT_STATUS.EXPIRED: {
        return {
          background: 'white_disable',
          color: 'white',
          text: t('report.expired'),
          border: '1px solid #f5f5f5'
        }
      }
      default: {
        return {
          background: 'grey_disable',
          color: 'green',
          text: t('report.pending_public'),
          border: '1px solid #cccccc'
        }
      }
    }
  }

  const data = getContent(status)

  return (
    <Status background={data.background} border={data.border}>
      <Spin spinning={isLoading}>
        <TextNormal fontSize="size_24" color={data.color} fontWeight="bold">
          {data.text}
        </TextNormal>
      </Spin>
    </Status>

  )
}

export default ReportStatus
