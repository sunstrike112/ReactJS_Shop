/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import Modal from 'react-modal'
import { Popconfirm, Button } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'

import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const customStyles = {
  overlay: {
    backdropFilter: 'blur(0.5rem)',
    willChange: 'backdrop-filter',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999
  }
}

const ModalWrapper = styled(Modal)`
  box-sizing: border-box;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: 'tabular-nums';
  line-height: 1.5715,;
  list-style: 'none';
  font-feature-settings: 'tnum', 'tnum';
  pointer-events: none;
  position: relative;
  top: 100px;
  max-width: calc(100vw - 32px);
  margin: 0 auto;
  padding-bottom: 24px;
  width: ${(theme) => {
    switch (theme.size) {
      case 'large':
        return '100%'
      default:
        return '55%'
    }
  }};
  height: 100%;
  .ant-modal-content {
    border-radius: 1rem;
    max-height: 80vh;
    overflow: ${(theme) => theme.overflow || 'auto'};

    .ant-modal-header {
      height: 70px;
    }

    .ant-modal-body {
      overflow-x: hidden;
      max-height: calc(80vh - 125px);
    }

    .ant-modal-footer {
      display: flex;
      justify-content: center;
      height: 55px;
      .button__cancel {
        margin-right: 10px;
      }
    }
  }
`

const Error = styled.div`
  background-color: ${({ theme }) => theme.bg_error};
  border: 1px solid ${({ theme }) => theme.bd_error};
  padding: 8px 16px;
`

const Success = styled.div`
  background-color: ${({ theme }) => theme.bg_success_light};
  border: 1px solid ${({ theme }) => theme.bd_success};
  padding: 8px 16px;
`

const ModalComponent = ({
  title,
  visible,
  onCancel,
  children,
  onSubmit,
  form = '',
  disabledSubmit,
  onSubmitText,
  onCancelText,
  type,
  confirm = false,
  cancel = true,
  ok = true,
  isLoadingSubmit = false,
  confirmTitle = 'Are you sure to do this task?',
  isNotFooterButton = false,
  titleIcon = true,
  onClose,
  confirmWithClose = false,
  onConfirmWithClose,
  enterToSubmit = false,
  ...rest
}) => {
  const { t } = useTranslation()
  const renderModalBodyBaseOnType = () => {
    switch (type) {
      case 'error':
        return <Error>{children}</Error>
      case 'success':
        return <Success>{children}</Success>
      case 'error_modal':
        return <Error style={{ height: 220 }}>{children}</Error>
      default:
        return children
    }
  }

  const renderButtonSubmit = () => {
    if (confirm) {
      return (
        <Popconfirm title={confirmTitle} onConfirm={onSubmit} okText={onSubmitText} cancelText={t('common:cancel')}>
          <Button
            htmlType="submit"
            type="primary"
            disabled={disabledSubmit}
            loading={isLoadingSubmit}
          >
            {onSubmitText || t('ok')}
          </Button>
        </Popconfirm>
      )
    }
    if (form) {
      return (
        <Button
          type="primary"
          htmlType="submit"
          form={form}
          disabled={disabledSubmit}
          loading={isLoadingSubmit}
        >
          {onSubmitText || t('ok')}
        </Button>
      )
    }
    if (enterToSubmit) {
      return (
        <Button
          type="primary"
          htmlType="submit"
          disabled={disabledSubmit}
          onClick={onSubmit}
          loading={isLoadingSubmit}
        >
          {onSubmitText || t('ok')}
        </Button>
      )
    }
    return (
      <Button
        type="primary"
        htmlType="button"
        disabled={disabledSubmit}
        onClick={onSubmit}
        loading={isLoadingSubmit}
      >
        {onSubmitText || t('ok')}
      </Button>
    )
  }
  const renderClose = () => {
    if (confirmWithClose) {
      return (
        <Popconfirm
          onConfirm={onConfirmWithClose}
          cancelText={t('common:cancel')}
          title={t('recording:leave_confirm')}
        >
          <div className="ant-modal-close" type="button">
            <div className="ant-modal-close-x">
              <div className="anticon anticon-close ant-modal-close-icon">
                <CloseOutlined />
              </div>
            </div>
          </div>
        </Popconfirm>
      )
    }
    return (
      <button className="ant-modal-close" onClick={onClose || onCancel} type="button">
        <div className="ant-modal-close-x">
          <div className="anticon anticon-close ant-modal-close-icon">
            <CloseOutlined />
          </div>
        </div>
      </button>
    )
  }
  return (
    <ModalWrapper
      isOpen={visible}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}
      {...rest}
    >
      <form>
        <div className="ant-modal-content">
          <div className="ant-modal-header">
            {renderClose()}
            {title && (
              <div
                style={{
                  height: 36,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2,
                  padding: 0,
                  fontSize: 24
                }}
              >
                {typeof titleIcon !== 'boolean' ? titleIcon : <EditOutlined />}
                <span style={{ fontSize: 24, fontWeight: 700, padding: 0, lineHeight: 1.2 }}>
                  &nbsp;
                  {title}
                </span>
              </div>
            )}
          </div>
          <div className="ant-modal-body">{renderModalBodyBaseOnType()}</div>

          {!isNotFooterButton && (
            <div className="ant-modal-footer">
              {cancel && (
                <button type="button" onClick={onCancel || onClose} className="ant-btn button__cancel">
                  <span>{onCancelText || t('cancel')}</span>
                </button>
              )}
              {ok && renderButtonSubmit()}
            </div>
          )}
        </div>
      </form>
    </ModalWrapper>
  )
}

export default memo(ModalComponent)
