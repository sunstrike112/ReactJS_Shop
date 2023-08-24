/* eslint-disable react/prop-types */
import React from 'react'
import Modal from 'react-modal'
import { Popconfirm } from 'antd'

import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999
  },
  content: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%'
  }
}

const ModalWrapper = styled(Modal)`
  .ant-modal {
    width: ${(theme) => {
    switch (theme.size) {
      case 'large':
        return '100%'
      default:
        return '55%'
    }
  }};
    .ant-modal-content {
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
      }
    }
  }
`
const InputWrapper = styled.input`
  color: ${({ theme }) => theme.white};
  background: ${({ disabled, theme }) => (disabled ? theme.grey : theme.blueHight)};
  border-color: ${({ theme }) => theme.blue};
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  outline: 0;
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  text-transform: none;
  margin-left: 10px;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.7;
  }

  &:focus {
    opacity: 1;
    outline: none;
  }
`

const Error = styled.div`
  background-color: ${({ theme }) => theme.bg_error};
  border: 1px solid ${({ theme }) => theme.bd_error};
  padding: 8px 16px;
`

const ModalNonFormComponent = ({
  title,
  visible,
  onCancel,
  children,
  onSubmit,
  disabledSubmit,
  onSubmitText,
  onCancelText,
  type,
  confirm = false,
  cancel = true,
  confirmTitle = 'Are you sure to do this task?',
  isNotFooterButton = false,
  onClose,
  ...rest
}) => {
  const { t } = useTranslation()
  const renderModalBodyBaseOnType = () => {
    switch (type) {
      case 'error':
        return <Error>{children}</Error>
      default:
        return children
    }
  }

  return (
    <ModalWrapper
      isOpen={visible}
      onRequestClose={onCancel}
      style={customStyles}
      ariaHideApp={false}
      {...rest}
    >
      <div className="ant-modal">
        <div className="ant-modal-content">
          <div className="ant-modal-header">
            <button className="ant-modal-close" onClick={onClose || onCancel} type="button">
              <div className="ant-modal-close-x">
                <div className="anticon anticon-close ant-modal-close-icon">
                  <CloseOutlined />
                </div>
              </div>
            </button>
            {title && (
              <div
                style={{
                  height: 36,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 0,
                  fontSize: 24
                }}
              >
                <EditOutlined />
                <span style={{ fontSize: 24, fontWeight: 700, padding: 0, lineHeight: 1.2, marginTop: 5 }}>
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
              <button type="button" onClick={onCancel} className="ant-btn">
                <span>{onCancelText || t('cancel')}</span>
              </button>
              )}
              {confirm ? (
                <Popconfirm title={confirmTitle} onConfirm={onSubmit} okText={onSubmitText} cancelText={t('cancel')}>
                  <InputWrapper type="submit" value={onSubmitText || t('ok')} disabled={disabledSubmit} />
                </Popconfirm>
              ) : (
                <InputWrapper type="button" value={onSubmitText || t('ok')} disabled={disabledSubmit} onClick={onSubmit} />
              )}
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ModalNonFormComponent
