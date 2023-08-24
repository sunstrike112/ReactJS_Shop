import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UseSurveyResult, useRoles, useAuth, useLoadCompanyAll, useHistories } from 'Hooks'
import { EditOutlined } from '@ant-design/icons'
import { Wrapper } from 'Themes/facit'
import styled from 'styled-components'
import { Title } from 'Components'
import FilterBlock from './components/FilterBlock'
import tableColumns from './column'
import QuestionListModal from './components/QuestionListModal'
import { TableSort } from '../component'

const WrapperStyle = styled(Wrapper)`
  .ant-dropdown-menu {
    width: 300px;
    max-width: unset;
    position: absolute;
  }
`

const StatisticalResultsOfSurvey = () => {
  const { t } = useTranslation(['courseResult'])
  const history = useHistories()
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [isShowModal, setIsShowModal] = useState(false)
  const {
    results,
    pagination,
    isLoading,
    questions,
    filter,
    loadSurveyResultAction,
    loadSurveyQuestionAction,
    resetSurveyQuestionAction
  } = UseSurveyResult()

  const { isSuperAdmin } = useRoles()
  const { companyAll } = useLoadCompanyAll()
  const { metaData } = useAuth()
  const { total, limit: pageSize, page: currentPage } = pagination
  const { roles } = metaData

  const openModal = (record) => {
    setIsShowModal(true)
    setSelectedRecord(record)
    loadSurveyQuestionAction({ courseId: record.courseId, surveyId: record.surveyId, limit: 100, page: 1 })
  }

  const columns = useMemo(
    () => tableColumns({ t, history, pagination, action: { openModal } }).filter((col) => col.rules.includes(roles?.[0])),
    [t, history, pagination, roles]
  )

  const dataSource = useMemo(
    () => results.map((item, index) => ({
      ...item,
      key: (pagination.page - 1) * pagination.limit + index + 1
    })),
    [results, pagination]
  )

  const handleTableChange = (tablePaging) => {
    loadSurveyResultAction({
      params: {
        page: tablePaging?.current,
        limit: tablePaging?.pageSize,
        filter
      }
    })
  }

  const handleCloseModal = (value) => {
    setIsShowModal(value)
    resetSurveyQuestionAction()
  }

  return (
    <WrapperStyle>
      <Title
        icon={EditOutlined}
        title={t('statistic_results_of_survey')}
      />
      <FilterBlock
        pageSize={pageSize}
        isSuperAdmin={isSuperAdmin}
        companyAll={companyAll}
      />
      <TableSort
        locale={{ emptyText: t('common:empty_data') }}
        rowKey={(record) => record.key}
        dataSource={dataSource}
        loading={isLoading}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handleTableChange}
      />
      <QuestionListModal
        visible={isShowModal}
        onClose={handleCloseModal}
        dataSource={questions}
        survey={selectedRecord}
      />
    </WrapperStyle>
  )
}

export default StatisticalResultsOfSurvey
