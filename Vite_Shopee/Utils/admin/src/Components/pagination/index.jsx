/* eslint-disable react/prop-types */
import { Pagination } from 'antd'
import React from 'react'
import { PaginationStyle } from './styled'

const PaginationComponent = ({ current, total, onChange }) => (
  <PaginationStyle>
    <Pagination current={current} total={total} onChange={onChange} showSizeChanger={false} />
  </PaginationStyle>
)

export default PaginationComponent
