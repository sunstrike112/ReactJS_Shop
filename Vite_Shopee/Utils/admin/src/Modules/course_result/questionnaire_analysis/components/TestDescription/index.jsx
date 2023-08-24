import PropTypes from 'prop-types'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { sortFullParams } from 'Utils'
import { useAuth, useQuery, useQuestionnaire, useRoles } from 'Hooks'
import TableSort from 'Modules/course_result/component/TableSort'

import tableColumns from './column'
import { QUESTIONNAIRE_TABS } from '../..'

const TestDescriptionStyled = styled.div`
.table-container{
  margin-top: 0px;
}
`

const TestDescription = ({ detail, answerData }) => {
  const { t } = useTranslation(['courseResult'])

  const query = useQuery()
  const qTab = query.get('tab') || QUESTIONNAIRE_TABS.TEST

  const {
    testDescription: { data, isLoading, pagination },
    loadAnalysisTestDescriptionAction,
    loadAnalysisSurveyDescriptionAction
  } = useQuestionnaire()

  const actionDescription = qTab === QUESTIONNAIRE_TABS.SURVEY ? loadAnalysisSurveyDescriptionAction : loadAnalysisTestDescriptionAction

  const { metaData } = useAuth()
  const { isSuperAdmin } = useRoles()

  const { total, limit: pageSize, page: currentPage } = pagination || { total: 0, limit: 0, page: 0 }
  const { userId, roles } = metaData

  const handleTableChange = (tablePaging, _, tableSorter) => {
    const { field, order } = tableSorter
    let params = {
      userId,
      page: tablePaging?.current,
      limit: tablePaging?.pageSize,
      sortBy: null,
      sortType: null,
      companyId: answerData.companyId,
      version: answerData.version,
      courseId: answerData?.courseId,
      unitTestId: answerData?.unitTestId,
      unitSurveyId: answerData?.unitSurveyId,
      questionId: detail?.questionId
    }
    let fullParams = {
      userId,
      ...params
    }
    actionDescription(sortFullParams(field, order, params, fullParams))
  }

  const columns = useMemo(
    () => tableColumns({ t, pagination }).filter((col) => col.rules.includes(roles?.[0])),
    [t, pagination, roles]
  )

  useEffect(() => {
    actionDescription({
      params: {
        page: 1,
        limit: 100,
        companyId: answerData.companyId,
        version: answerData.version,
        courseId: answerData?.courseId,
        unitTestId: answerData?.unitTestId,
        unitSurveyId: answerData?.unitSurveyId,
        questionId: detail?.questionId
      }
    })
  }, [isSuperAdmin])

  return (
    <TestDescriptionStyled>
      <TableSort
        className="table-styled"
        isHideDelete
        dataSource={data || []}
        loading={isLoading}
        columns={columns}
        rowKey="userId"
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handleTableChange}
      />
    </TestDescriptionStyled>
  )
}

TestDescription.propTypes = {
  detail: PropTypes.any,
  answerData: PropTypes.any
}

export default TestDescription
