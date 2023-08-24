import React, { useMemo } from 'react'
import { Table, Button, Space } from 'antd'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { PlusOutlined, OrderedListOutlined, DownloadOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background-color: ${({ theme }) => theme.white};
  height: ${({ height }) => height};
  border-radius: 1.75rem;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 5%);
  margin: 1rem 0;

  .ant-pagination {
    .ant-pagination-item {
      margin-right: 0;
      background-color: #e9ecef;;
      border-color: #e9ecef;
      border-radius: 0;
      font-size: .75rem;
      &>a:hover {
        color: #564aa9;
        background-color: #e5e9ed;
      }
    }
    .ant-pagination-prev {
      margin-right: 0;
      background-color: #e9ecef;
      border-color: #e9ecef;
      border-top-left-radius: 1rem;
      border-top-right-radius: 0;
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 0;
      &:hover {
        background-color: #e9ecef;
      }
      button {
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: none;
        border-radius: 0;
        & svg {
          width: 8px;
          height: 8px;
        }
        &:not(:disabled):hover {
          svg {
            fill: #564aa9;
          }
        }
      }
    }
    .ant-pagination-next {
      margin-right: 0;
      background-color: #e9ecef;
      border-color: #e9ecef;
      border-top-left-radius: 0;
      border-top-right-radius: 1rem;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 1rem;
      &:hover {
        background-color: #e9ecef;
      }
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: none;
        border-radius: 0;
        & svg {
          width: 8px;
          height: 8px;
        }
        &:not(:disabled):hover {
          svg {
            fill: #564aa9;
          }
        }
      }
    }
    .ant-pagination-item-active {
      background-color: #6c5dd3;
      border-color: #6c5dd3;
      z-index: 3;
      &>a {
        color: #fff;
        &:hover {
          background-color: #6c5dd3;
          border-color: #6c5dd3;
          color: #fff;
        }
      }
    }
  }
  /* .table-empty {
    height: 80vh
  } */
  .table-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: ${({ total }) => !total && '8px'};

    .table-head-left {
      display: flex;
      align-items: center;

      .content {
        display: flex;
        align-items: center;
        svg.svg-icon--material {
          stroke: #4e68f9;
        }
        .title {
          font-size: 1rem;
        }
        .record-counting {
          font-weight: 500;
          margin-left: .5rem;
          font-size: .6rem;
          opacity: .5;
        }
      }
    }
    .table-head-right {
      .create {
        color: #46bcaa;
        background-color: #edf8f7;
        border: 1px solid #edf8f7;
        font-weight: 500;
        font-size: 1rem;
        border-radius: .75rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        &:hover {
          color: #fff;
          background-color: #46bcaa;
          border-color: #46bcaa;
        }
      }
      .order {
        color: #4d69fa;
        background-color: #edf0ff;
        border: 1px solid #edf0ff;
        font-weight: 500;
        font-size: 1rem;
        border-radius: .75rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        &:hover {
          color: #fff;
          background-color: #4d69fa;
          border-color: #4d69fa;
        }
      }
      .more {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e7eef8;
        border-color: #e7eef8;
        border-radius: .75rem;
        &:hover {
          color: #1f2128;
          background-color: #ebf1f9;
          border-color: #e9f0f9;
        }
        svg {
          width: 15px;
          height: 15px;
        }
      }
    }
  }

  .table-foot-left {
    width: 500px;
    z-index: 10;
    position: relative;
    bottom: 2rem;
    position: relative;
    .info {
      font-size: .75rem;
      font-weight: 300;
    }
  }

  .table-header-left {
    width: 500px;
    z-index: 10;
    position: relative;
    top: 2rem;
    .info {
      font-size: .75rem;
      font-weight: 300;
    }
  }

  .ant-table-pagination.ant-pagination {
    margin: 8px 0;
  }
`

export const TableStyle = styled(Table)`
  height: 100%;

  .ant-table {
    border-radius: .75rem;

    .ant-table-content {
      border-radius: .75rem;
    }
  }
	.pagination-jp {
		.ant-pagination-options-quick-jumper{
			display:flex;
			flex-flow: row-reverse;
		}
	}

	.ant-select-single.ant-select-sm:not(.ant-select-customize-input) .ant-select-selector{
		padding: 0 15px;
	}
`

const TableSort = ({
  dataSource,
  columns,
  currentPage = 1,
  total = 0,
  selected,
  pageSizeOptions,
  pageSize = 100,
  pagination = true,
  onChangePage,
  onChangePageSize,
  breadcrumb,
  createText,
  orderText,
  onChange,
  onCreate,
  onOrder,
  onDelete,
  csv,
  height = 'auto',
  heightTable = 600,
  subTextBesideTotal,
  ...rest
}) => {
  const { t } = useTranslation(['common'])

  const rangeInfo = useMemo(() => {
    const start = currentPage * pageSize - pageSize + 1
    const end = start + pageSize - 1
    return t('range_info', { start, end, total })
  }, [t, total, pageSize, currentPage])

  return (
    <Wrapper height={height} total={total} className="table-container">
      <div className="table-head">
        <div className="table-head-left">
          <div className="content">
            <strong className="title">
              <span>&nbsp;{t('list')}</span>
              <small className="record-counting"><b>{t('item')}: {selected > 0 && `${selected} /`} {total}</b></small>
              <small className="record-counting"><b>{subTextBesideTotal}</b></small>
            </strong>
          </div>
        </div>
        <div className="table-head-right">
          <Space>
            {createText && <Button icon={<PlusOutlined />} className="create" onClick={onCreate}>{createText}</Button>}
            {orderText && <Button icon={<OrderedListOutlined />} className="order" onClick={onOrder}>{orderText}</Button>}
            {csv && <Button icon={<DownloadOutlined />} loading={csv?.loading} className="order" onClick={() => csv?.onDownload?.()}>{csv?.text}</Button>}
          </Space>
        </div>
      </div>
      {breadcrumb}
      {total > 0
        && (
          <div className="table-header-left">
            <div className="info">{rangeInfo}</div>
          </div>
        )}
      <TableStyle
        className={dataSource.length === 0 ? 'table-empty' : ''}
        locale={{
          emptyText: t('common:empty_data'),
          triggerDesc: t('common:sort_desc'),
          triggerAsc: t('common:sort_asc'),
          cancelSort: t('common:sort_cancel')
        }}
        scroll={{ y: heightTable, scrollToFirstRowOnChange: true }}
        dataSource={dataSource}
        columns={columns}
        position="bottomRight"
        pagination={pagination && {
          position: ['bottomRight', 'topRight'],
          hideOnSinglePage: false,
          defaultCurrent: 1,
          current: currentPage || 1,
          pageSize,
          total,
          pageSizeOptions,
          onChange: onChangePage,
          onShowSizeChange: onChangePageSize,
          showSizeChanger: true,
          locale: { items_per_page: `/ ${t('page')}` },
          ...pagination
        }}
        onChange={onChange}
        {...rest}
      />
      {total > 0
        && (
          <div className="table-foot-left">
            <div className="info">{rangeInfo}</div>
          </div>
        )}
    </Wrapper>
  )
}

TableSort.propTypes = {
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
  createText: PropTypes.string,
  createTextDropdown: PropTypes.string,
  orderText: PropTypes.string,
  onChange: PropTypes.func,
  onCreate: PropTypes.func,
  onOrder: PropTypes.func,
  disabledUpload: PropTypes.bool,
  uploadText: PropTypes.string,
  onUpload: PropTypes.func,
  onDelete: PropTypes.func,
  height: PropTypes.string,
  heightTable: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangePageSize: PropTypes.func,
  csv: PropTypes.shape({
    text: PropTypes.string,
    loading: PropTypes.bool,
    onDownload: PropTypes.func
  }),
  subTextBesideTotal: PropTypes.string
}

export default TableSort
