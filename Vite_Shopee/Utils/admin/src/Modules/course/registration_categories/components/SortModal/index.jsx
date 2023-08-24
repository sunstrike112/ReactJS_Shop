/* eslint-disable react/prop-types */
import React, { useCallback, useState, useMemo } from 'react'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Table, InputNumber, Row, Col, Button } from 'antd'
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
import { EditOutlined, MenuOutlined } from '@ant-design/icons'
import { arrayMoveImmutable } from 'array-move'

import './index.css'
import {
  Modal
} from 'Components'
import { useSortUnitLesson } from 'Hooks/unit_settings'
import { RecordCounting, TotalRecord } from '../../styled'

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />)

const SortableItem = sortableElement((props) => <tr {...props} />)
const SortableContainer = sortableContainer((props) => <tbody {...props} />)

const SortModal = ({ onClose, visible, errors }) => {
  const { t } = useTranslation(['unit_setting'])
  const {
    order,
    updateOrderUnitLessonAction
  } = useSortUnitLesson()
  const [dataSource, setDataSource] = useState(order)

  const handleSortEnd = useCallback(({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      setDataSource((oldDataSource) => arrayMoveImmutable([].concat(oldDataSource), oldIndex, newIndex).map((item, index) => ({ ...item, index })))
    }
  }, [])

  const handleSortBlur = useCallback((e, { index: oldIndex }) => {
    setDataSource((oldDataSource) => {
      const newIndex = oldDataSource.findIndex((item) => item.index === Math.min(+e.target.value, oldDataSource.length - 1))
      return newIndex > -1 ? arrayMoveImmutable([].concat(oldDataSource), oldIndex, newIndex).map((item, index) => ({ ...item, index })) : oldDataSource.map((item, index) => ({ ...item, index }))
    })
  }, [])

  const columns = useMemo(() => [
    {
      title: t('common:sort_order'),
      dataIndex: 'index',
      width: 125,
      render: (text, record) => <InputNumber defaultValue={text} onBlur={(e) => handleSortBlur(e, record)} />
    },
    {
      title: '',
      dataIndex: 'sort',
      width: 48,
      className: 'drag-visible',
      render: () => <DragHandle />
    },
    {
      title: t('unitSetting:unit'),
      dataIndex: 'lessonName',
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
    updateOrderUnitLessonAction({ data: dataSource.map((v) => ({ ...v, order: v.index })) })
    onClose(false)
  }, [dataSource])

  return (
    <Modal
      visible={visible}
      onCancel={() => onClose(false)}
      onSubmit={handleSubmit}
      title={t('unitSetting:update_the_sort_order')}
      disabledSubmit={!isEmpty(errors)}
      onSubmitText={t('common:change')}
      onCancelText={t('common:cancel')}
    >
      <div>
        <Row justify="center" align="middle" gutter={[4, 4]}>
          <Col>
            <Button
              onClick={() => onClose(false)}
              size="medium"
            >
              <span>{t('common:cancel')}</span>
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleSubmit}
              size="large"
            >
              <span>{t('common:change')}</span>
            </Button>
          </Col>
        </Row>

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
      </div>
    </Modal>
  )
}

export default SortModal
