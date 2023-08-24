/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { MenuOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { arrayMoveImmutable } from 'array-move'
import { Modal, Table, TooltipButton } from 'Components'
import { useLoadQuestionReport, useSettingQuestionReport } from 'Hooks'
import { isEmpty } from 'lodash'
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
import { Action } from 'Themes/facit'
import { CreateQuestionModal, EditQuestionModal, ConfirmDelete } from '..'

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />)
const SortableItem = sortableElement((props) => <tr {...props} />)
const SortableContainer = sortableContainer((props) => <tbody {...props} />)

const SortModal = ({
  setVisible,
  visible,
  errors,
  t,
  reportId,
  isViewing
}) => {
  const { orderQuestionsReport, loadQuestionReportAction } = useLoadQuestionReport()
  const {
    deleteQuestionReportAction,
    loadDetailQuestionReportAction,
    sortQuestionReportAction
  } = useSettingQuestionReport()

  const [dataSource, setDataSource] = useState(orderQuestionsReport)

  useEffect(() => {
    setDataSource(orderQuestionsReport)
  }, [orderQuestionsReport])

  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [visibleEditModal, setVisibleEditModal] = useState(false)
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false)

  const handleSortEnd = useCallback(({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const reportQuestions = arrayMoveImmutable([].concat(dataSource), oldIndex, newIndex).map((item, index) => ({ ...item, index: index + 1 }))
      setDataSource(reportQuestions)
      sortQuestionReportAction({
        data: reportQuestions.map(({ questionId }) => ({ offsetId: 0, questionId }))
      })
    }
  }, [dataSource])

  const handleDeleteQuestion = () => {
    deleteQuestionReportAction({
      reportId,
      data: {
        ids: rowSelected.selectedRowKeys
      },
      t,
      callback: {
        done: () => {
          setRowSelected({
            selectedRowKeys: [],
            selectedRows: []
          })
        }
      }
    })
    setVisibleDeleteModal(false)
  }

  const handleLoadDetailQuestionReport = (questionId) => {
    loadDetailQuestionReportAction({ questionId, reportId })
    setVisibleEditModal(true)
  }

  const columns = useMemo(() => [
    {
      title: '',
      dataIndex: 'sort',
      width: isViewing ? 0 : 48,
      className: 'drag-visible',
      render: () => !isViewing && <DragHandle />
    },
    {
      title: 'No.',
      dataIndex: 'index',
      align: 'right',
      width: 60
    },
    {
      title: t('test_question:create.question_text'),
      dataIndex: 'contentQuestion',
      ellipsis: true
    },
    {
      title: t('common:action'),
      key: '',
      dataIndex: '',
      width: 100,
      align: 'center',
      render: (record) => (
        <Action>
          <TooltipButton
            title={t(isViewing ? 'common:tooltip:view' : 'common:tooltip:edit')}
            onClick={() => handleLoadDetailQuestionReport(record.questionId)}
            icon={isViewing ? EyeOutlined : EditOutlined}
          />
        </Action>
      )
    }
  ], [t, orderQuestionsReport])

  const draggableContainer = useCallback((props) => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={handleSortEnd}
      {...props}
    />
  ), [dataSource])

  const draggableBodyRow = useCallback(({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex((x) => x.questionId === restProps['data-row-key'])
    return <SortableItem index={index} {...restProps} />
  }, [dataSource])

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const handleCancel = () => {
    loadQuestionReportAction({ reportId })
    setVisible(false)
  }

  return (
    <>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        isNotFooterButton
        title={t('unit_setting:report_question_list')}
        disabledSubmit={!isEmpty(errors)}
      >
        <div>
          <Table
            rowSelection={{
              selectedRowKeys: rowSelected.selectedRowKeys,
              onChange: onSelectChange,
              getCheckboxProps: () => ({
                disabled: isViewing
              })
            }}
            pagination={false}
            locale={{ emptyText: t('common:empty_data') }}
            dataSource={dataSource}
            columns={columns}
            rowKey={(record) => record.questionId}
            total={dataSource?.length}
            components={{
              body: {
                wrapper: !isViewing && draggableContainer,
                row: !isViewing && draggableBodyRow
              }
            }}
            selected={rowSelected.selectedRowKeys.length}
            onCreate={() => setVisibleCreateModal(true)}
            createText={!isViewing && t('unit_setting:question_setting.create_question')}
            onDelete={() => setVisibleDeleteModal(true)}
            width="100%"
            isHideDelete={isViewing}
          />
        </div>
      </Modal>
      {visibleCreateModal && (
        <CreateQuestionModal
          visible={visibleCreateModal}
          setVisible={setVisibleCreateModal}
        />
      )}
      {visibleEditModal && (
        <EditQuestionModal
          visible={visibleEditModal}
          setVisible={setVisibleEditModal}
          isViewing={isViewing}
        />
      )}
      {visibleDeleteModal && (
        <ConfirmDelete
          t={t}
          isVisible={visibleDeleteModal}
          setVisible={setVisibleDeleteModal}
          onSubmit={handleDeleteQuestion}
          numberOfSelectedRecord={rowSelected.selectedRowKeys.length}
        />
      )}
    </>
  )
}

export default SortModal
