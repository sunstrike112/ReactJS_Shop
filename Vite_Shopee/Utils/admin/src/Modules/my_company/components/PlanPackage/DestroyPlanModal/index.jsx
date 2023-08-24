/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useMyCompany } from 'Hooks'
import { Modal } from 'Components'
import { Checkbox, notification, Typography } from 'antd'
import { formatDateShort } from 'Utils'
import { FORMAT_TIME } from 'Constants/formatTime'
import { WarningTwoTone } from '@ant-design/icons'
import moment from 'moment'

const DestroyModalStyled = styled(Modal)`
  width: 768px;

  .content_policy {
    padding: 16px 16px 16px 32px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .ill_cancel {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .ant-typography {
      margin-bottom: 0;
    }

    .icon_close {
      font-size: 42px;
      margin-right: 8px;
    }
  }

	.agree_terms {
		display: flex;
		justify-content: center;
	}
`

const DestroyPlanModal = ({
  companyId,
  plan,
  onClose,
  visible,
  localDatetimeSystem = new Date().getTime()
}) => {
  // Use hooks
  const { t } = useTranslation(['myCompany', 'common'])
  const { isLoadingCancel, dataCancel, cancelPlanAction } = useMyCompany()
  // End use hooks

  // Use states
  const [isAgree, setIsAgree] = useState(false)
  // End use states

  const handleClose = () => {
    onClose(false)
  }

  const onAgree = () => {
    if (isAgree) {
      cancelPlanAction({ params: { companyId, planName: plan?.name } })
    } else {
      notification.error({
        message: t('common:error'),
        description: t('waringMissingAgree'),
        duration: 2
      })
    }
  }

  const onCheck = (e) => {
    setIsAgree(e.target.checked)
  }

  useEffect(() => {
    if (dataCancel) {
      onClose(false)
    }
  }, [dataCancel])

  return (
    <DestroyModalStyled
      visible={visible}
      onCancel={handleClose}
      title={t('destroy_plan_title')}
      destroyOnClose
      forceRender
      titleIcon={null}
      className="preview-modal"
      onSubmit={onAgree}
      onSubmitText={t('confirmCancelContract')}
      onCancelText={t('closeCancelContract')}
      isLoadingSubmit={isLoadingCancel}
    >
      <div className="ill_cancel">
        <WarningTwoTone twoToneColor="#ff4d4f" className="icon_close" />
        <Typography.Paragraph strong>{t('destroy_plan_text')}</Typography.Paragraph>
      </div>
      <ul className="content_policy">
        <li>{t('destroy_plan_text_description_1', { date: formatDateShort(moment(localDatetimeSystem).endOf('month'), FORMAT_TIME.YEAR_MONTH_DATE) })}</li>
      </ul>
      <div className="agree_terms">
        <Checkbox onChange={onCheck}>{t('agreeCancelContract')}</Checkbox>
      </div>

    </DestroyModalStyled>
  )
}

export default DestroyPlanModal
