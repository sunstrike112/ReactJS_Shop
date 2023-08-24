/* eslint-disable react/prop-types */
import React from 'react'
import { Modal as ModalAntd } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { PrimaryButton, OutlineButton } from '../button'
import { TextNormal } from '../text'

const ModalWrapper = styled(ModalAntd)`
  .footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }
`

const ModalReport = ({
  children,
  isModalVisible,
  setIsModalVisible,
  onOk,
  description = '',
  title,
  okText = '',
  cancelText = '',
  handleCancelButton,
  handleCancelReport,
  isCancel = true,
  setIsCancel,
  borderRadiusButton,
  ...rest
}) => {
  const { t } = useTranslation()
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    if (setIsCancel) {
      setIsCancel(true)
    }
    if (onOk) {
      onOk()
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    if (setIsCancel) {
      setIsCancel(true)
    }
    if (handleCancelButton) {
      handleCancelButton()
    }
  }
  const footer = () => {
    if (isCancel) {
      return (
        <div className="footer">
          <OutlineButton
            onClick={handleCancel}
            title={cancelText || t('common.cancel')}
            key="cancel"
            borderRadius={borderRadiusButton}
          />
          <PrimaryButton
            onClick={handleOk}
            title={okText || t('common.submit')}
            key="ok"
            borderRadius={borderRadiusButton}
          />
        </div>
      )
    }
    return (
      <div className="footer">
        <PrimaryButton
          onClick={handleOk}
          title={okText || t('common.submit')}
          key="ok"
          borderRadius={borderRadiusButton}
        />
      </div>
    )
  }
  return (
    <ModalWrapper
      centered
      closable={false}
      showModal={showModal}
      visible={isModalVisible}
      handleCancelButton={isCancel ? handleCancel : null}
      footer={footer()}
      {...rest}
    >
      {title
        && (
          <TextNormal
            className="header"
            color="primary"
            fontWeight="fw_600"
            fontSize="size_18"
          >
            {t('examination.confirm_popup_title')}
          </TextNormal>
        )}
      <TextNormal color="black" fontSize="size_18">
        {description}
      </TextNormal>
      {children && children}
    </ModalWrapper>
  )
}
export default ModalReport
