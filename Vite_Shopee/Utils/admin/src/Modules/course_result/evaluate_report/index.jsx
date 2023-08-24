import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'

import { Title } from 'Components'
import { Wrapper } from 'Themes/facit'
import { useReportResult, useRoles } from 'Hooks'
import ReportDetail from './components/report_detail'
import EvaluateReportForm from './components/evaluate_report_form'
import Questions from './components/questions'

function useQuery() {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

const EvaluateReport = () => {
  const { t } = useTranslation(['courseResult'])
  const { report, loadReportDetailAction } = useReportResult()
  const { isSuperAdmin } = useRoles()

  const query = useQuery()
  const created = query.get('created')

  useEffect(() => {
    loadReportDetailAction({
      courseId: query.get('courseId') || 0,
      userId: query.get('userId') || 0,
      reportId: query.get('reportId') || 0
    })
  }, [query])

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('evaluate_report')}
      />
      <ReportDetail
        report={report}
      />
      {(report?.submitStatus && report?.submitStatus !== 'NEW') && (
        <EvaluateReportForm
          report={report}
          isSuperAdmin={isSuperAdmin}
          created={created}
        />
      )}
      <Questions
        report={report}
      />
    </Wrapper>
  )
}

export default EvaluateReport
