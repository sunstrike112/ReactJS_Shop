/* eslint-disable react/prop-types */
import { EditOutlined, MenuOutlined } from '@ant-design/icons'
import {
  Modal,
  Table
} from 'Components'
import { useSortUnitLesson } from 'Hooks/unit_settings'
import { Button, Col, InputNumber, Row } from 'antd'
import { arrayMoveImmutable } from 'array-move'
import { isEmpty } from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
import './index.css'
import { WrapperRightAlign } from './styled'

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />)

const SortableItem = sortableElement((props) => <tr {...props} />)
const SortableContainer = sortableContainer((props) => <tbody {...props} />)

const SortModal = ({ onClose, visible, errors, pageSize, currentPage }) => {
  const { t } = useTranslation(['unit_setting', 'course'])
  const {
    isLoadingOrder,
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
      const newIndex = oldDataSource.findIndex((item) => item.index === Math.min(Math.max(+e.target.value - 1, 0), oldDataSource.length - 1))
      return newIndex > -1 ? arrayMoveImmutable([].concat(oldDataSource), oldIndex, newIndex).map((item, index) => ({ ...item, index })) : oldDataSource.map((item, index) => ({ ...item, index }))
    })
  }, [])

  const columns = useMemo(() => [
    {
      title: t('common:sort_order'),
      dataIndex: 'index',
      width: 125,
      render: (text, record) => (
        <WrapperRightAlign>
          <InputNumber
            min={0}
            defaultValue={text + 1}
            onBlur={(e) => handleSortBlur(e, record)}
            type="number"
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === '+' || e.key === '.' || e.key === ',' || e.key === 'e' || e.key === 'E') {
                e.preventDefault()
              }
              if (e.key === 'Enter') {
                handleSortBlur(e, record)
              }
            }}
          />
        </WrapperRightAlign>
      )
    },
    {
      title: '',
      dataIndex: 'sort',
      width: 48,
      className: 'drag-visible',
      render: () => <DragHandle />
    },
    {
      title: t('unit_setting:unit'),
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
    updateOrderUnitLessonAction({ data: dataSource.map((v) => ({ ...v, order: v.index })), pageSize, currentPage })
    onClose(false)
  }, [dataSource])

  return (
    <Modal
      visible={visible}
      onCancel={() => onClose(false)}
      onSubmit={handleSubmit}
      title={t('unit_setting:registration_unit_setting.sort.title')}
      disabledSubmit={!isEmpty(errors)}
      isNotFooterButton
    >
      <div>
        <Row justify="center" align="middle" gutter={[4, 4]}>
          <Col>
            <Button
              htmlType="button"
              onClick={() => onClose(false)}
              size="medium"
            >
              <span>{t('common:cancel')}</span>
            </Button>
          </Col>
          <Col>
            <Button
              htmlType="button"
              type="primary"
              icon={<EditOutlined />}
              onClick={handleSubmit}
              size="large"
            >
              <span>{t('common:change')}</span>
            </Button>
          </Col>
        </Row>
        <Table
          locale={{ emptyText: t('common:empty_data') }}
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
          total={dataSource.length}
          isHideDelete
          loading={isLoadingOrder}
        />
      </div>
    </Modal>
  )
}

export default SortModal
