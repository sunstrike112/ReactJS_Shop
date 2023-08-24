/* eslint-disable react/prop-types */
import React, { useCallback, useState, useMemo } from 'react'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Table, InputNumber } from 'antd'
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
import { MenuOutlined } from '@ant-design/icons'
import { arrayMoveImmutable } from 'array-move'

import './index.css'
import {
  Modal
} from 'Components'
import { useSortCourses } from 'Hooks'
import { KEY_TYPE } from 'Constants'
import { RecordCounting, TotalRecord } from './styled'

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />)

const SortableItem = sortableElement((props) => <tr {...props} />)
const SortableContainer = sortableContainer((props) => <tbody {...props} />)

const SortModal = ({ onClose, visible, errors }) => {
  const { t } = useTranslation(['course'])
  const {
    order,
    updateOrderCourseAction
  } = useSortCourses()
  const [dataSource, setDataSource] = useState(order)

  const handleSortEnd = useCallback(({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      setDataSource((oldDataSource) => arrayMoveImmutable([].concat(oldDataSource), oldIndex, newIndex).map((item, index) => ({ ...item, index })))
    }
  }, [])

  const handleSort = useCallback((e, { index: oldIndex }) => {
    setDataSource((oldDataSource) => {
      const newIndex = e.target.value >= oldDataSource.length ? oldDataSource.length - 1 : oldDataSource.findIndex((item) => item.index === +e.target.value) - 1
      return newIndex > -1 ? arrayMoveImmutable([].concat(oldDataSource), oldIndex, newIndex).map((item, index) => ({ ...item, index })) : oldDataSource.map((item, index) => ({ ...item, index }))
    })
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode === 8)) {
      e.preventDefault()
    }
  }, [])

  const columns = useMemo(() => [
    {
      title: t('registration_course.sort.index'),
      dataIndex: 'index',
      width: 125,
      render: (text, record) => (
        <InputNumber
          min={1}
          defaultValue={text + 1}
          onBlur={(e) => handleSort(e, record)}
          onKeyDown={handleKeyDown}
          onKeyPress={(e) => e.key === KEY_TYPE.ENTER && handleSort(e, record)}
        />
      )
    },
    {
    // title: t('registration_course.sort.sort'),
      dataIndex: 'sort',
      width: 100,
      className: 'drag-visible',
      render: () => <DragHandle />
    },
    {
      title: t('registration_course.sort.courseName'),
      dataIndex: 'courseName',
      ellipsis: true
    }
  ], [])

  const draggableContainer = useCallback((props) => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={handleSortEnd}
      {...props}
    />
  ), [])

  const draggableBodyRow = useCallback(({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex((x) => x.index === restProps['data-row-key'])
    return <SortableItem index={index} {...restProps} />
  }, [dataSource])

  const handleSubmit = useCallback(() => {
    updateOrderCourseAction({ data: dataSource })
    onClose(false)
  }, [dataSource])

  return (
    <Modal
      visible={visible}
      onCancel={() => onClose(false)}
      onSubmit={handleSubmit}
      title={t('registration_course.sort.title')}
      disabledSubmit={!isEmpty(errors)}
    >
      <RecordCounting style={{ marginTop: 16 }}>
        <div>{}</div>
        <TotalRecord>
          <span>{t('common:total_record', { amount: dataSource.length })}</span>
        </TotalRecord>
      </RecordCounting>

      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowKey="index"
        components={{
          body: {
            wrapper: draggableContainer,
            row: draggableBodyRow
          }
        }}
      />
    </Modal>
  )
}

export default SortModal
