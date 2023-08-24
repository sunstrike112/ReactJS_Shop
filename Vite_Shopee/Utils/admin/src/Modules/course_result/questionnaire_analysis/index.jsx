/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { BarChartOutlined } from '@ant-design/icons'
import { Wrapper } from 'Themes/facit'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Select, Tabs, Typography } from 'antd'
import { maxBy } from 'lodash'

import { Title } from 'Components'
import { downloadAnalysisSurveyResultCSV, downloadAnalysisTestResultCSV } from 'APIs'
import { sortFullParams } from 'Utils'
import { useAuth, useQuestionnaire, useRoles, useLoadCompanyAll, useQuery, useHistories } from 'Hooks'

import tableColumnsTest from './column-test'
import tableColumnsSurvey from './column-survey'
import { AnswersReport, FilterBlock, PointDistribution } from './components'
import { TableSort } from '../component'

const { TabPane } = Tabs

const ExpendDetailStyled = styled.div`
  min-height: 200px;

  margin-bottom: 64px;

  .expand_title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    h1{
      font-size: 18px;
      font-weight: bold;
    }
    .expand_title_version{
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }

  .ant-table-thead {
    tr{
      .ant-table-cell{
        background-color: #FFFCD3;
      }
    }
  }

  .ant-select{
    display: flex;
    align-items: center;
  }

  .ant-select-selection-search {
    display: flex;
    align-items: center;
  }
`

const ContainerStyled = styled.div`
  .survey-content {
    background: #fff;
    width: 100%;
    margin-top: 1rem;
    padding: 4px 20px;
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.text_primary};
    border-radius: .75rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  }

  .tabs {
    margin-top: 16px;
  }

  .table-container, .filter-block {
    padding:  unset;
    background-color:  unset;
    height:  unset;
    border-radius:  unset;
    box-shadow:  unset;
    margin:  unset;
  }

  .ant-tabs-nav-list {
    width: 620px;
  }

  .ant-tabs-tab {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`

export const QUESTIONNAIRE_TABS = {
  TEST: 'test',
  SURVEY: 'survey'
}

const QuestionnaireAnalysis = () => {
  const { t } = useTranslation(['courseResult'])

  const histories = useHistories()
  const query = useQuery()
  const qTab = query.get('tab') || QUESTIONNAIRE_TABS.TEST

  const {
    analysisResult,
    pagination,
    filter,
    isLoading,
    chartAnswer,
    isLoadingVersionList,
    listVersion,

    // TEST
    loadAnalysisTestResultAction,
    loadAnalysisTestChartPointAction,
    loadAnalysisTestChartAnswerAction,
    loadVersionListTestAction,
    loadAnalysisVersionTestAction,
    // SURVEY
    loadAnalysisSurveyResultAction,
    loadAnalysisSurveyChartAnswerAction,
    loadVersionListSurveyAction,
    loadAnalysisVersionSurveyAction,

    loadSaveFilterAction,
    resetDataTableAction,
    resetAction
  } = useQuestionnaire()

  useEffect(() => {
    resetAction()
  }, [qTab])

  const isSurvey = qTab === QUESTIONNAIRE_TABS.SURVEY

  const actionResult = isSurvey ? loadAnalysisSurveyResultAction : loadAnalysisTestResultAction
  const actionChartPoint = isSurvey ? undefined : loadAnalysisTestChartPointAction
  const actionChartAnswer = isSurvey ? loadAnalysisSurveyChartAnswerAction : loadAnalysisTestChartAnswerAction
  const actionVersionList = isSurvey ? loadVersionListSurveyAction : loadVersionListTestAction
  const actionDetailVersionList = isSurvey ? loadAnalysisVersionSurveyAction : loadAnalysisVersionTestAction
  const actionDownloadCSV = isSurvey ? downloadAnalysisSurveyResultCSV : downloadAnalysisTestResultCSV

  const { metaData } = useAuth()
  const { isSuperAdmin } = useRoles()
  const { companyAll } = useLoadCompanyAll()
  const { companyOptions, idOfNissokenCompany } = companyAll

  const { total, limit: pageSize, page: currentPage } = pagination
  const { userId, roles } = metaData
  // const [sortInfo, setSortInfo] = useState(null)
  const [sortParams, setSortParams] = useState({})
  const [csvLoading, setCsvLoading] = useState(false)
  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const handleTableChange = (tablePaging, _, tableSorter) => {
    const { field, order } = tableSorter
    let params = {
      ...filter,
      userId,
      page: tablePaging?.current,
      limit: tablePaging?.pageSize,
      sortBy: null,
      sortType: null,
      companyId: isSuperAdmin && filter?.companyId
    }
    let fullParams = {
      userId,
      ...params
    }
    // setSortInfo(tableSorter)
    setSortParams(sortFullParams(field, order, params, fullParams))
    actionResult(sortFullParams(field, order, params, fullParams))
  }

  const getRowKey = (item) => `${item?.courseId}-${item?.unitTestId || item?.unitSurveyId}`

  const questionnaireAnalysis = useMemo(
    () => analysisResult.map((item, index) => ({ ...item, key: getRowKey(item), id: (pagination.page - 1) * pagination.limit + index + 1 })),
    [analysisResult]
  )

  const onDownloadCSV = useCallback((record) => {
    setCsvLoading(true)
    const params = {
      unitTestId: record.unitTestId,
      unitSurveyId: record.unitSurveyId,
      companyId: record.companyId,
      courseId: record.courseId,
      version: record.version,
      timezone: new Date().getTimezoneOffset(),
      name: record.unitTestName || record.unitSurveyName || ''
    }
    actionDownloadCSV({ params }).finally(() => setCsvLoading(false))
  }, [rowSelected.selectedRows, filter])

  const tableColumns = isSurvey ? tableColumnsSurvey : tableColumnsTest
  const companyObj = useMemo(() => companyOptions.reduce((acc, cur) => {
    acc[cur.value] = cur.label
    return acc
  }, {}), [companyOptions])
  const columns = useMemo(
    () => tableColumns({ t, pagination, onDownloadCSV, csvLoading, companyObj }).filter((col) => col.rules.includes(roles?.[0])),
    [t, pagination, roles, onDownloadCSV, csvLoading, tableColumns, companyObj]
  )

  const [currentChart, setCurrentChart] = useState()
  const [versionCurr, setVersionCurr] = useState(maxBy(listVersion))

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    const selectFinal = selectedRowKeys.length > 2 ? selectedRows : selectedRows.filter((f) => !rowSelected.selectedRowKeys.includes(f.id))
    setRowSelected({
      selectedRowKeys: selectedRowKeys.length > 2 ? selectedRowKeys : selectedRowKeys.filter((f) => !rowSelected.selectedRowKeys.includes(f)),
      selectedRows: selectFinal
    })

    // Need dispatch action to update data at here
    if (selectFinal[0]) {
      setVersionCurr('')
      actionVersionList({
        params: {
          companyId: selectFinal[0].companyId,
          courseId: selectFinal[0].courseId,
          unitTestId: selectFinal[0].unitTestId,
          unitSurveyId: selectFinal[0].unitSurveyId
        }
      })
      setCurrentChart(selectFinal[0])
    }
  }

  useEffect(() => {
    if (currentChart) {
      setVersionCurr(currentChart.version)
      if (actionChartPoint) {
        actionChartPoint({
          params: {
            companyId: currentChart.companyId,
            courseId: currentChart.courseId,
            version: currentChart.version,
            unitTestId: currentChart.unitTestId,
            unitSurveyId: currentChart.unitSurveyId
          }
        })
      }
      actionChartAnswer({
        params: {
          companyId: currentChart.companyId,
          courseId: currentChart.courseId,
          version: currentChart.version,
          unitTestId: currentChart.unitTestId,
          unitSurveyId: currentChart.unitSurveyId
        }
      })
    } else setVersionCurr(maxBy(listVersion))
  }, [listVersion])

  const handleChangeVersion = (version, record) => {
    setVersionCurr(version)
    if (+version !== +record.version) {
      actionDetailVersionList({
        params: {
          companyId: record.companyId,
          courseId: record.courseId,
          version: +version,
          unitTestId: record.unitTestId,
          unitSurveyId: record.unitSurveyId
        }
      })
    }
  }

  const onChangeTab = (keyTab) => { histories.pushParams({ tab: keyTab || QUESTIONNAIRE_TABS.TEST }) }

  return (
    <Wrapper>
      <ContainerStyled>
        <Title
          icon={BarChartOutlined}
          title={t('questionnaire_analysis_title')}
        />
        <div className="survey-content">
          <Tabs onChange={onChangeTab} className="tabs" activeKey={qTab}>
            <TabPane tab={t('questionnaire_test')} key={QUESTIONNAIRE_TABS.TEST} />
            <TabPane tab={t('questionnaire_survey')} key={QUESTIONNAIRE_TABS.SURVEY} />
          </Tabs>
          <FilterBlock
            isSurvey={isSurvey}
            pagination={pagination}
            saveFilter={loadSaveFilterAction}
            action={actionResult}
            // setSortInfo={setSortInfo}
            sortParams={sortParams}
            setRowSelected={setRowSelected}
            isSuperAdmin={isSuperAdmin}
            companyAll={companyAll}
            resetAction={resetAction}
            resetDataTableAction={resetDataTableAction}
          />
          <TableSort
            rowSelection={{
              selectedRowKeys: rowSelected.selectedRowKeys,
              onChange: onSelectChange,
              preserveSelectedRowKeys: true,
              hideSelectAll: true
            }}
            dataSource={questionnaireAnalysis}
            loading={isLoading || csvLoading}
            columns={columns}
            rowKey={(record) => record.id}
            selected={rowSelected.selectedRowKeys.length}
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            onChange={handleTableChange}
            expandable={{
              expandedRowRender: (record) => (
                <ExpendDetailStyled>
                  <div className="expand_title">
                    <h1>
                      {record.unitTestName || record.unitSurveyName || ''}
                    </h1>
                    {isSurvey && listVersion.length > 1 && (
                      <div className="expand_title_version">
                        <Typography.Text strong>{t('common:version')}:</Typography.Text>
                        <Select loading={isLoadingVersionList} value={versionCurr} style={{ width: 120 }} onChange={(version) => handleChangeVersion(version, record)}>
                          {listVersion.map((item, index) => (<Select.Option value={item}><span>{`${t('common:version')} ${index + 1}`}</span></Select.Option>))}
                        </Select>
                      </div>
                    )}
                  </div>
                  {!isSurvey && <PointDistribution pointData={record} />}
                  <AnswersReport answerData={record} chartAnswer={chartAnswer} chartAction={actionChartAnswer} />
                </ExpendDetailStyled>
              ),
              expandedRowKeys: rowSelected.selectedRowKeys,
              expandIcon: () => <></>,
              columnWidth: 0
            }}
          />
        </div>
      </ContainerStyled>
    </Wrapper>
  )
}

export default QuestionnaireAnalysis
