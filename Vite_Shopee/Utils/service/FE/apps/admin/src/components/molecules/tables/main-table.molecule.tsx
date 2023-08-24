import React, { useState, useEffect } from 'react'
// Import from antd
import { Table } from 'antd';

/* eslint-disable-next-line */
export interface MCMainTableProps {
  dataSource: any[];
  columns: any[];
  rowKey?: string;
  pagination?: any;
  onChange?: any;
  isDisplayPagination?: boolean;
}

export function MCMainTable(props: MCMainTableProps) {
  const [isDisplayPagination, setIsDisplayPagination] = useState(false)

  useEffect(() => {
    if (props.isDisplayPagination || (props.pagination.total / props.pagination.pageSize > 1)) setIsDisplayPagination(true)
    else setIsDisplayPagination(false)
  }, [props.pagination])
  console.log(`datasource : ${props.dataSource}`)
  return (
    <>
      <Table
        pagination={{
          showSizeChanger: true,
          total: props.pagination.total,
          pageSizeOptions: ['10', '15', '30']
        }}
        loading={!props.dataSource}
        dataSource={props.dataSource}
        columns={props.columns}
        rowKey={props.rowKey ?? 'id'}
        onChange={props.onChange}
        scroll={{ x: 400 }}
      />
    </>
  )
}

export default MCMainTable
