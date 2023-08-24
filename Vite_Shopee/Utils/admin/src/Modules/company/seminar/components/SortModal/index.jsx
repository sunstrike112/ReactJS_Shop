/* eslint-disable react/prop-types */
import React, { useCallback, useMemo, useState } from 'react'
import { EditOutlined, MenuOutlined } from '@ant-design/icons'
import { Button, Col, InputNumber, Row, Table } from 'antd'
import { arrayMoveImmutable } from 'array-move'
import { Modal, RecordCounting } from 'Components'
import { useQuestionSetting } from 'Hooks/unit_settings'
import { isEmpty } from 'lodash'
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />)
const SortableItem = sortableElement((props) => <tr {...props} />)
const SortableContainer = sortableContainer((props) => <tbody {...props} />)

const SortModal = ({ setVisible, visible, errors, t, unitId }) => {
  const { orderQuestions, updateSortQuestionAction } = useQuestionSetting()

  const [dataSource, setDataSource] = useState(orderQuestions)

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
        <InputNumber
          min={0}
          defaultValue={text + 1}
          onBlur={(e) => handleSortBlur(e, record)}
          type="number"
          onKeyDown={(e) => {
            if (e.key === '-') {
              e.preventDefault()
            }
            if (e.key === 'Enter') {
              handleSortBlur(e, record)
            }
          }}
        />
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
      title: t('question_setting.question_type'),
      dataIndex: 'questionType',
      ellipsis: true
    },
    {
      title: t('question_setting.question_text'),
      dataIndex: 'questionText'
    },
    {
      title: t('question_setting.point_allocation'),
      dataIndex: 'pointAllocation',
      width: 125
    }
  ], [t, orderQuestions])

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
    updateSortQuestionAction({
      unitId,
      data: dataSource.map((item) => ({ offsetId: item.offset, questionId: item.questionId }))
    })
    setVisible(false)
  }, [dataSource])

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
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
              onClick={() => setVisible(false)}
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
        <RecordCounting showSelectedRecord={false} totalRecord={dataSource?.length} />
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
        />
      </div>
    </Modal>
  )
}

export default SortModal
