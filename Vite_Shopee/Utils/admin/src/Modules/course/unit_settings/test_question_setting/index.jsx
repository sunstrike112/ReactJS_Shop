import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useTestDetail, useQuestionSetting, useRoles, useHistories, useGetQuery } from 'Hooks'
import { RoutesName } from 'Modules/course/routes'

import { QUERY } from 'Constants'
import { EditOutlined } from '@ant-design/icons'
import { Title, Table } from 'Components'
import { Wrapper } from 'Themes/facit'
import { ConfirmDelete, FilterBlock, SortModal, UpdatePassScore } from './components'
import tableColumns from './column'

const QuestionSettingScreen = () => {
  const { t } = useTranslation(['unit_setting'])
  const { courseId, unitId } = useParams()
  const { queryWorkspaceID } = useGetQuery()
  const { getDetailTestAction, detailTest } = useTestDetail()
  const history = useHistories()
  const { createBy, isViewing } = useRoles()

  const {
    getQuestionListAction,
    deleteQuestionAction,
    loadOrderQuestionAction,
    questionSetting
  } = useQuestionSetting()
  const { questions, pagination, filter, isLoading } = questionSetting
  const { page, limit, total } = pagination

  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false)
  const [visibleSortModal, setVisibleSortModal] = useState(false)
  const [isClearData, setIsClearData] = useState(false)

  const renderQuestionType = useCallback((type) => {
    switch (type) {
      case 'CHOOSE_MANY': return t('question_setting.multiple_choice')
      case 'DESCRIPTION': return t('question_setting.description_choice')
      default:
        return t('question_setting.single_choice')
    }
  }, [questionSetting])

  const dataSourceQuestion = useMemo(
    () => questions?.map((item, index) => ({
      ...item,
      index: index + 1,
      pointAllocation: t('common:points', { point: item.pointAllocation }),
      questionType: renderQuestionType(item.questionType)
    })),
    [t, questionSetting]
  )

  useEffect(() => {
    getDetailTestAction({ courseId, unitId })
    loadOrderQuestionAction({ unitId })
  }, [courseId, unitId])

  useEffect(() => {
    getQuestionListAction({
      unitId,
      params:
      { page: 1, limit: limit || 100, filter }
    })
  }, [unitId])

  const columns = useMemo(
    () => tableColumns({ t, pagination, courseId, unitId, history, createBy, isViewing }),
    [t, pagination, unitId, courseId, createBy, isViewing]
  )
  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const handleOnChange = (tablePaging) => {
    getQuestionListAction({
      unitId,
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        filter
      }
    })
  }

  const handleDeleteQuestion = () => {
    deleteQuestionAction({
      courseId,
      unitId,
      data: {
        ids: rowSelected.selectedRowKeys
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
        title={t('question_setting.title')}
        backRoute={`${RoutesName.TEST_DETAIL}/${courseId}/${unitId}?${QUERY.CREATE_BY}=${createBy}${queryWorkspaceID.CONNECT}`}
        backRouteText="unit_setting:back_test_details"
      />
      <UpdatePassScore
        isClearData={isClearData}
        detailTest={detailTest}
        t={t}
        isViewing={isViewing}
      />
      <FilterBlock
        isClearData={isClearData}
        setIsClearData={setIsClearData}
        t={t}
        setRowSelected={setRowSelected}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true,
          getCheckboxProps: () => ({
            disabled: isViewing
          })
        }}
        rowKey={(record) => record.questionId}
        columns={columns}
        dataSource={dataSourceQuestion}
        total={total}
        pageSize={limit}
        currentPage={page}
        onChange={handleOnChange}
        selected={rowSelected.selectedRowKeys.length}
        orderText={!isViewing && t('common:update_sort_order')}
        createText={!isViewing && t('question_setting.create_question')}
        onCreate={() => history.push(`${RoutesName.CREATE_QUESTION}/${courseId}/${unitId}?createBy=${createBy}`)}
        onOrder={() => setVisibleSortModal(true)}
        onDelete={() => setVisibleDeleteModal(true)}
        loading={isLoading}
        width="100%"
        isHideDelete={isViewing}
      />
      {
        visibleSortModal && (
          <SortModal
            t={t}
            unitId={unitId}
            visible={visibleSortModal}
            setVisible={setVisibleSortModal}
          />
        )
      }
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

export default QuestionSettingScreen
