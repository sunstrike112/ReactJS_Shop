import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLoadTestQuestions, useDeleteTestQuestions, useRoles, useLoadCompanyAll, useHistories } from 'Hooks'
import { renderQuestionType, stripHTML } from 'Utils/string'

import { EditOutlined } from '@ant-design/icons'
import { Title, Table } from 'Components'
import { Wrapper } from 'Themes/facit'
import { USER_ROLE } from 'Constants/auth'
import tableColumns from './column'
import { FilterBlock, ConfirmDelete } from './components'

const TestQuestionManagement = () => {
  const { t } = useTranslation(['test_question_management'])
  const { courseId, unitId } = useParams()
  const history = useHistories()
  const { testQuestions, pagination, filter, loadTestQuestionsAction, isLoading } = useLoadTestQuestions()
  const { deleteTestQuestionsAction } = useDeleteTestQuestions()
  const { isSuperAdmin } = useRoles()
  const { companyAll } = useLoadCompanyAll()
  const { limit, page, total } = pagination

  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false)

  const dataSourceQuestion = useMemo(
    () => testQuestions?.map((item, index) => ({
      ...item,
      index: index + 1,
      questionType: renderQuestionType(t, item.questionType),
      questionText: stripHTML(item.questionText)
    })),
    [t, testQuestions]
  )

  const columns = useMemo(
    () => tableColumns({ t, courseId, unitId, history, pagination, isSuperAdmin }),
    [t, unitId, courseId, pagination, isSuperAdmin]
  )
  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const handleOnChange = (tablePaging) => {
    loadTestQuestionsAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        filter
      }
    })
  }

  const handleDeleteQuestion = () => {
    deleteTestQuestionsAction({
      data: {
        ids: rowSelected.selectedRowKeys
      },
      params: {
        page,
        limit: pagination.limit,
        filter
      }
    })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
    setVisibleDeleteModal(false)
  }

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('title')}
      />
      <FilterBlock
        setRowSelected={setRowSelected}
        isSuperAdmin={isSuperAdmin}
        companyAll={companyAll}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true,
          getCheckboxProps: (record) => ({
            disabled: isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(record.created)
          })
        }}
        rowKey={(record) => record.questionId}
        columns={columns}
        dataSource={dataSourceQuestion}
        total={total}
        pageSize={limit}
        currentPage={page}
        selected={rowSelected.selectedRowKeys.length}
        onChange={handleOnChange}
        onDelete={() => setVisibleDeleteModal(true)}
        loading={isLoading}
        width="100%"
        pagination={dataSourceQuestion.length > 0}
      />
      <ConfirmDelete
        t={t}
        isVisible={visibleDeleteModal}
        setVisible={setVisibleDeleteModal}
        onSubmit={handleDeleteQuestion}
        numberOfSelectedRecord={rowSelected.selectedRows?.length}
      />
    </Wrapper>
  )
}

export default TestQuestionManagement
