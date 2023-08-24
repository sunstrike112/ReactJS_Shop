/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Pagination, Button } from 'antd'
import styled from 'styled-components'
import {
  FIRST,
  LAST,
  NEXT,
  PREV,
  FIRST_DISABLED,
  LAST_DISABLED,
  NEXT_DISABLED,
  PREV_DISABLED
} from '../../assets'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  .ant-pagination {
    .ant-pagination-item {
      &:hover {
        border-color: ${({ theme }) => theme.primary_btn};
        background: ${({ theme }) => theme.primary_btn};
      }
    }
    .ant-pagination-item a{
      &:hover {
        color: white;
      }
    }
    .ant-pagination-item-active {
      border-color: ${({ theme }) => theme.primary_btn};
      background: ${({ theme }) => theme.primary_btn};
    }
    .ant-pagination-item-active a { 
      color: white;
    }
    .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link {
      &:hover {
        border-color: ${({ theme }) => theme.primary_btn};
        color: ${({ theme }) => theme.primary_btn};
      }
    }
  }
  .ant-btn {
    &:hover {
      border-color: ${({ theme }) => theme.primary_btn};
      color: ${({ theme }) => theme.primary_btn};
    }
  }
`

const PaginationComponent = ({ onChange, total, lastItem, pageCurrent, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    if (pageCurrent) {
      setCurrentPage(pageCurrent)
    }
  }, [pageCurrent])
  const renderItem = (current, type, originalElement) => {
    if (type === 'prev') {
      return (
        <li className="ant-pagination-next" style={{ marginRight: 24 }}>
          <Button className="ant-pagination-item-link">
            {currentPage <= 1 ? <img src={PREV_DISABLED} alt="" /> : <img src={PREV} alt="" />}
          </Button>
        </li>
      )
    }
    if (type === 'next') {
      return (
        <li className="ant-pagination-next" style={{ marginLeft: 24 }}>
          <Button className="ant-pagination-item-link">
            {currentPage >= lastItem ? <img src={NEXT_DISABLED} alt="" /> : <img src={NEXT} alt="" />}
          </Button>
        </li>
      )
    }
    return originalElement
  }
  const onChangePage = (page) => {
    setCurrentPage(page)
    if (onChange) {
      onChange(page)
    }
  }
  const onFirst = () => {
    setCurrentPage(1)
    if (onChange) {
      onChange(1)
    }
  }

  const onLast = () => {
    setCurrentPage(lastItem)
    if (onChange) {
      onChange(lastItem)
    }
  }

  return (
    <Wrapper>
      <li className="ant-pagination-next" style={{ marginTop: 2, marginRight: 8 }}>
        <Button
          className="ant-pagination-item-link"
          disabled={currentPage <= 1}
          onClick={onFirst}
        >
          {currentPage <= 1 ? <img src={FIRST_DISABLED} alt="" /> : <img src={FIRST} alt="first" />}
        </Button>
      </li>
      <Pagination
        {...rest}
        current={currentPage}
        total={total}
        onChange={onChangePage}
        itemRender={renderItem}
        pageSize={10}
        showLessItems
        hideOnSinglePage
      />
      <li className="ant-pagination-next" style={{ marginTop: 2, marginLeft: 8 }}>
        <Button
          onClick={onLast}
          className="ant-pagination-item-link"
          disabled={currentPage >= lastItem}
        >
          {currentPage >= lastItem ? <img src={LAST_DISABLED} alt="" /> : <img src={LAST} alt="last" />}
        </Button>
      </li>
    </Wrapper>
  )
}
export default PaginationComponent
