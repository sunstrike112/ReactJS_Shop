import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Title } from 'Components'
import { EditOutlined } from '@ant-design/icons'
import { useAuth, useSurveyAnswer, useRoles, useLoadCompanyAll } from 'Hooks'
import { sortFullParams } from 'Utils'
import { Wrapper } from 'Themes/facit'
import { downloadSurveyResultCSV } from 'APIs'
import styled from 'styled-components'
import tableColumns from './column'
import FilterBlock from './components/FilterBlock'
import QuestionListModal from './components/QuestionListModal'
import { TableSort } from '../component'

const WrapperStyle = styled(Wrapper)`
  .ant-dropdown-menu {
    width: 300px;
    max-width: unset;
    position: absolute;
  }
`

const SurveyAnswerScreen = () => {
  const { t } = useTranslation(['courseResult'])
  const {
    surveyAnswer,
    pagination,
    filter,
    isLoading,
    surveyDetail,
    loadSurveyAnswerAction,
    loadSurveyAnswerDetailAction,
    resetSurveyAnswerDetailAction
  } = useSurveyAnswer()
  const { metaData } = useAuth()
  const { total, limit: pageSize, page: currentPage } = pagination
  const { userId, roles } = metaData
  const { isSuperAdmin } = useRoles()
  const { companyAll } = useLoadCompanyAll()

  const [isShowModal, setIsShowModal] = useState(false)
  const [recordSelected, setRecordSelected] = useState(null)
  const [sortInfor, setSortInfo] = useState(null)
  const [sortParams, setSortParams] = useState({})
  const [csvLoading, setCsvLoading] = useState(false)
  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const handleTableChange = (tablePaging, tableFilter, tableSorter) => {
    const { field, order } = tableSorter
    const defaultParams = {
      params: {
        ...filter,
        page: tablePaging.current || currentPage,
        limit: tablePaging.pageSize || pageSize
      }
    }

    let params = {
      ...filter,
      userId,
      page: tablePaging.current || currentPage,
      limit: tablePaging.pageSize || pageSize,
      sortBy: '',
      isAscending: ''
    }
    let fullParams = {
      userId,
      ...params
    }

    setSortInfo(tableSorter)
    setSortParams(sortFullParams(field, order, params, fullParams))
    if (order) {
      loadSurveyAnswerAction(sortFullParams(field, order, params, fullParams))
    } else {
      loadSurveyAnswerAction(defaultParams)
    }
  }

  const openModal = (record) => {
    setRecordSelected(record)
    const { courseId, unitSurveyId: surveyId } = record
    setIsShowModal(true)
    loadSurveyAnswerDetailAction({
      userId: record.userId,
      courseId,
      surveyId,
      params: {
        page: 1,
        limit: 100
      }
    })
  }
  const handleCloseModal = (value) => {
    setIsShowModal(value)
    setRecordSelected(null)
    resetSurveyAnswerDetailAction()
  }

  const columns = useMemo(
    () => tableColumns({ t, sortInfor, pagination, action: { openModal } }).filter((col) => col.rules.includes(roles?.[0])),
    [t, pagination, roles]
  )

  const surveyAnswerData = useMemo(
    () => surveyAnswer.map((item, index) => ({
      ...item,
      key: (pagination.page - 1) * pagination.limit + index + 1,
      emailSurvey: item.email,
      action: item.unitSurveyStatus === 'ANSWERED' ? 1 : 0
    })),
    [surveyAnswer, pagination]
  )

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const onDownloadCSV = useCallback(() => {
    let data = rowSelected.selectedRows.length
      ? rowSelected.selectedRows.map((item) => ({ id: item.unitSurveyId, userId: item.userId }))
      : []
    setCsvLoading(true)
    downloadSurveyResultCSV({
      params: {
        ...filter,
        page: null,
        limit: null,
        timezone: new Date().getTimezoneOffset()
      },
      data
    }).finally(() => setCsvLoading(false))
  }, [rowSelected.selectedRows, filter])

  return (
    <WrapperStyle>
      <Title
        icon={EditOutlined}
        title={t('survey_answer')}
      />
      <FilterBlock
        setSortInfo={setSortInfo}
        sortParams={sortParams}
        isSuperAdmin={isSuperAdmin}
        companyAll={companyAll}
        setRowSelected={setRowSelected}
      />
      <TableSort
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true
        }}
        dataSource={surveyAnswerData}
        loading={isLoading}
        columns={columns}
        selected={rowSelected.selectedRowKeys.length}
        rowKey={(item) => item.key}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handleTableChange}
        csv={{
          text: t('common:download_csv'),
          onDownload: onDownloadCSV,
          loading: csvLoading || isLoading
        }}
      />
      <QuestionListModal
        visible={isShowModal}
        onClose={handleCloseModal}
        surveyDetail={surveyDetail}
        recordSelected={recordSelected}
        loadSurveyAnswerDetailAction={loadSurveyAnswerDetailAction}
      />
    </WrapperStyle>
  )
}

export default SurveyAnswerScreen
