/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import { Button, ConfigProvider, Dropdown, Popconfirm } from 'antd'
import { useTranslation } from 'react-i18next'
import { CloseOutlined, ClearOutlined, FilterOutlined } from '@ant-design/icons'
import { camel2Text } from 'Utils'
import { ModalWrapper, Error } from './styled'

const customStyles = {
  overlay: {
    backdropFilter: 'blur(0.5rem)',
    willChange: 'backdrop-filter',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999
  }
}

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
  ok = true,
  confirmTitle = 'Are you sure to do this task?',
  isNotFooterButton = false,
  titleIcon = true,
  onClose,
  filter,
  currentFilter = {},
  isLoadingSubmit = false,
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
  const renderCurrentFilterTag = useMemo(() => Object.keys(currentFilter).reduce((result, key) => {
    if (currentFilter[key]) {
      result.push(
        <small className="filter-tag">
          <strong>{camel2Text(key)}:</strong><span>&nbsp;{currentFilter[key]}</span>
        </small>
      )
    }
    return result
  }, []), [currentFilter])

  const renderButtonSubmit = () => {
    if (confirm) {
      return (
        <Popconfirm
          title={confirmTitle}
          onConfirm={() => onSubmit()}
          okText={onSubmitText}
          cancelText={t('cancel')}
          getPopupContainer={(trigger) => trigger?.parentElement}
        >
          <Button
            type="primary"
            htmlType="button"
            disabled={disabledSubmit}
          >
            {onSubmitText || t('ok')}
          </Button>
        </Popconfirm>
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

  return (
    <ModalWrapper
      isOpen={visible}
      onRequestClose={onCancel}
      style={customStyles}
      ariaHideApp={false}
      {...rest}
    >
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
            className="title__wrapper"
          >
            <div className="left">
              {titleIcon && <ClearOutlined />}
              <span>&nbsp;{title}</span>
            </div>
            <div className="right">
              {filter && (
              <>
                {renderCurrentFilterTag}
                <div className="separator" />
                <div id="filter-popup-container" style={{ position: 'relative' }}>
                  <ConfigProvider getPopupContainer={() => document.getElementById('filter-popup-container')}>
                    <Dropdown overlay={filter} trigger={['click']}>
                      <a href className="ant-dropdown-link filter" onClick={(e) => e.preventDefault()}>
                        <FilterOutlined />
                        <span>&nbsp;{t('common:filter')}</span>
                      </a>
                    </Dropdown>
                  </ConfigProvider>
                </div>
              </>
              )}
            </div>
          </div>
          )}
        </div>
        <div className="ant-modal-body">{renderModalBodyBaseOnType()}</div>

        {!isNotFooterButton && (
        <div className="ant-modal-footer">
          {cancel && (
          <button type="button" onClick={onCancel} className="ant-btn button__cancel">
            <span>{onCancelText || t('cancel')}</span>
          </button>
          )}
          {ok && renderButtonSubmit()}
        </div>
        )}
      </div>
    </ModalWrapper>
  )
}

export default ModalNonFormComponent
