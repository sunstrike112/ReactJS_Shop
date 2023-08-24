/* eslint-disable no-unused-vars */
import React, { memo, useMemo, useRef, useState } from 'react'
import {
  ClearOutlined, CloudUploadOutlined,
  CopyOutlined,
  DownloadOutlined, DownOutlined, OrderedListOutlined, PlusOutlined
} from '@ant-design/icons'
import { Button, ConfigProvider, Dropdown, Pagination } from 'antd'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'
import { useWebview, useWindowDimensions } from 'Hooks'
import { TableStyle, Wrapper } from './style'

const TableComponent = ({
  dataSource,
  columns,
  currentPage = 1,
  total = 0,
  selected,
  pageSizeOptions,
  pageSize = 100,
  pagination = true,
  breadcrumb,
  action = [],
  createText,
  noteText,
  createTextDropdown,
  orderText,
  onChange,
  onCreate,
  loadingOnCreate = false,
  onOrder,
  disabledUpload,
  uploadText,
  onUpload,
  onDelete,
  height = 'auto',
  heightTable = 600,
  width = 'max-content',
  overlayDropdown,
  isHideDelete = false,
  disabledDelete = true,
  disabledCreate = false,
  csv,
  loading,
  showButtonCreate = true,
  isPreviewingResultOfWebview = false,
  copyText,
  onCopy,
  disabledCopy = false,
  ...rest
}) => {
  const { t } = useTranslation(['common'])
  // Use states
  const [positionScroll, setPositionScroll] = useState(0)
  const { isWebviewMode } = useWebview()
  // End use state

  // TODO: This func make scrolling not smooth
  // useEffect(() => {
  //   const onScrollEvent = () => setPositionScroll(window.pageYOffset)
  //   window.addEventListener('scroll', onScrollEvent)

  //   return () => window.removeEventListener('scroll', onScrollEvent)
  // }, [])

  const rangeInfo = useMemo(() => {
    const start = currentPage * pageSize - pageSize + 1
    const end = start + pageSize - 1
    return t('range_info', { start: start || 0, end: end || 0, total })
  }, [t, total, pageSize, currentPage])

  const moreMenuButton = () => (
    <>
      {action.map(({ text, icon, click, disabled = false, buttonProps }, index) => (
        <Button key={index} disabled={disabled} onClick={click} {...buttonProps}>
          {icon}
          <span style={{ marginRight: '.5rem' }}>&nbsp;{text}</span>
        </Button>
      ))}
      {!isHideDelete && (
        <Button onClick={onDelete} disabled={selected === 0 && disabledDelete} danger>
          <ClearOutlined />
          <span style={{ marginRight: '.5rem' }}>&nbsp;{t('delete_all')}</span>
        </Button>
      )}
    </>
  )
  return (
    <Wrapper height={height}>
      {noteText && (<div>{noteText}</div>)}
      {!isWebviewMode && (
        <div className="table-head">
          <div className="table-head-left">
            <div className="content">
              <strong className="title">
                <span>&nbsp;{t('list')}</span>
                <small className="record-counting"><b>{t('item')}: {selected > 0 && `${selected} /`} {total}</b></small>
              </strong>
            </div>
          </div>
          <div className="table-head-right">
            {createTextDropdown && (
            <div id="popup-container">
              <ConfigProvider getPopupContainer={() => document.getElementById('popup-container')}>
                <Dropdown overlay={overlayDropdown} trigger={['click']}>
                  <Button icon={<PlusOutlined />} className="create">
                    {createTextDropdown} <DownOutlined />
                  </Button>
                </Dropdown>
              </ConfigProvider>
            </div>
            )}
            {copyText && (
            <Button
              disabled={disabledCopy}
              icon={<CopyOutlined />}
              className={`${!disabledCopy && 'copy'}`}
              onClick={onCopy}
            >{copyText}
            </Button>
            )}
            {createText && (
            <Button
              disabled={disabledCreate}
              icon={<PlusOutlined />}
              className={`${!disabledCreate && 'create'}`}
              onClick={onCreate}
              loading={loadingOnCreate}
            >{createText}
            </Button>
            )}
            {orderText && <Button icon={<OrderedListOutlined />} className="order" onClick={onOrder}>{orderText}</Button>}
            {uploadText && <Button disabled={disabledUpload} icon={<CloudUploadOutlined />} className="order" onClick={onUpload}>{uploadText}</Button>}
            {csv && <Button icon={<DownloadOutlined />} loading={csv?.loading} className="order" onClick={() => csv?.onDownload?.()}>{csv?.text}</Button>}
            {moreMenuButton()}
          </div>
        </div>
      )}

      {breadcrumb}
      {pagination && (
        <div className="table-foot" style={{ justifyContent: `${isWebviewMode ? 'center' : 'space-between'}` }}>
          {!isWebviewMode && (
          <div className="table-foot-left">
            {total > 0 && (
            <div className="info">{rangeInfo}</div>
            )}
          </div>
          )}
          <div className="table-foot-right">
            <Pagination
              disabled={loading}
              hideOnSinglePage={false}
              defaultCurrent={1}
              current={currentPage}
              pageSize={pageSize}
              total={total}
              pageSizeOptions={pageSizeOptions}
              onChange={(current, size) => onChange({ current, pageSize: size })}
              showSizeChanger
              locale={{ items_per_page: `/ ${t('page')}` }}
              {...pagination}
            />
          </div>
        </div>
      )}
      <TableStyle
        scroll={{
          y: heightTable,
          scrollToFirstRowOnChange: true
        }}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        onChange={onChange}
        loading={loading}
        positionScroll={positionScroll}
        {...rest}
      />
      {pagination && !isWebviewMode && (
        <div className="table-foot" style={{ justifyContent: `${isWebviewMode ? 'center' : 'space-between'}` }}>
          {!isWebviewMode && (
          <div className="table-foot-left">
            {total > 0 && (
            <div className="info">{rangeInfo}</div>
            )}
          </div>
          )}
          <div className="table-foot-right">
            <Pagination
              disabled={loading}
              hideOnSinglePage={false}
              defaultCurrent={1}
              current={currentPage}
              pageSize={pageSize}
              total={total}
              pageSizeOptions={pageSizeOptions}
              onChange={(current, size) => onChange({ current, pageSize: size })}
              showSizeChanger
              locale={{ items_per_page: `/ ${t('page')}` }}
              {...pagination}
            />
          </div>
        </div>
      )}

      {showButtonCreate && isWebviewMode && !isPreviewingResultOfWebview && (
      <Button
        disabled={disabledCreate}
        icon={<PlusOutlined />}
        className={`${!disabledCreate && 'create'}`}
        onClick={onCreate}
        loading={loadingOnCreate}
      >{createText}
      </Button>
      )}

    </Wrapper>
  )
}

TableComponent.propTypes = {
  dataSource: PropTypes.any,
  loading: PropTypes.bool,
  columns: PropTypes.any,
  currentPage: PropTypes.number,
  total: PropTypes.number,
  selected: PropTypes.any,
  pageSizeOptions: PropTypes.any,
  pageSize: PropTypes.number,
  pagination: PropTypes.bool,
  breadcrumb: PropTypes.any,
  action: PropTypes.array,
  createText: PropTypes.any,
  noteText: PropTypes.string,
  createTextDropdown: PropTypes.string,
  orderText: PropTypes.string,
  onChange: PropTypes.func,
  onCreate: PropTypes.func,
  loadingOnCreate: PropTypes.bool,
  onOrder: PropTypes.func,
  disabledUpload: PropTypes.bool,
  uploadText: PropTypes.string,
  onUpload: PropTypes.func,
  onDelete: PropTypes.func,
  height: PropTypes.string,
  heightTable: PropTypes.number,
  width: PropTypes.string,
  overlayDropdown: PropTypes.any,
  isHideDelete: PropTypes.bool,
  disabledDelete: PropTypes.bool,
  disabledCreate: PropTypes.bool,
  csv: PropTypes.shape({
    text: PropTypes.string,
    loading: PropTypes.bool,
    onDownload: PropTypes.func
  }),
  showButtonCreate: PropTypes.bool,
  isPreviewingResultOfWebview: PropTypes.bool,
  copyText: PropTypes.string,
  onCopy: PropTypes.func,
  disabledCopy: PropTypes.bool
}

export default memo(TableComponent)
