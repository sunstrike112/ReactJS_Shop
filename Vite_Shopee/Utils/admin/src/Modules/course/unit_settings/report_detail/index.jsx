import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import moment from 'moment'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useHistories, useLoadReportDetail, useRoles, useGetQuery } from 'Hooks'

import { Title } from 'Components'
import { useParams } from 'react-router-dom'
import { RoutesName } from 'Modules/course/routes'
import { FORMAT_TIME } from 'Constants/formatTime'
import { QUERY } from 'Constants'
import { Wrapper, Block, Table, TBody, Tr, Th, Td } from 'Themes/facit'

const ReportDetailScreen = () => {
  const { t } = useTranslation(['unit_setting'])
  const { reportId } = useParams()
  const history = useHistories()
  const { workspaceid } = useGetQuery()
  const { isViewing, createBy } = useRoles()

  const { detailReport, loadReportDetailAction } = useLoadReportDetail()
  const { data } = detailReport

  useEffect(() => {
    loadReportDetailAction({ reportId })
  }, [reportId])

  return (
    detailReport && (
      <Wrapper>
        <Title
          title={t('report_setting:detail.title')}
          backRoute={workspaceid ? `${RoutesName.UNIT_SETTINGS}?${QUERY.WORKSPACE_ID}=${workspaceid}` : RoutesName.UNIT_SETTINGS}
          backRouteText={t('back_to_unit_setting')}
        />
        <Block>
          <div className="block-head">
            <div className="left">
              <h2>{t('basic_info')}</h2>
            </div>
            <div className="right">
              <Button
                type="primary"
                icon={<EditOutlined />}
                size="large"
                disabled={isViewing}
                onClick={() => history.push(`${RoutesName.REPORT_BASIC_SETTING}/${data?.courseId}/${reportId}?${QUERY.CREATE_BY}=${createBy}`)}
              >
                {t('common:button_setup')}
              </Button>
            </div>
          </div>
          <Table>
            <TBody>
              <Tr>
                <Th>{t('course')}</Th>
                <Td>{data?.courseName}</Td>
              </Tr>
              <Tr>
                <Th>{t('unit')}</Th>
                <Td>{data?.reportName}</Td>
              </Tr>
              <Tr>
                <Th>{t('unit_detail')}</Th>
                <Td>{data?.detail || '-'}</Td>
              </Tr>
              <Tr>
                <Th>{t('limit_start_date')}</Th>
                <Td>
                  {data?.startTime
                    ? t('detail.release_since_value', {
                      time: moment(data?.startTime).format(
                        FORMAT_TIME.DATE_HOUR_MINUTES
                      )
                    })
                    : t('detail.label_limit_start_date')}
                </Td>
              </Tr>
              <Tr>
                <Th>{t('limit_end_date')}</Th>
                <Td>
                  {data?.endTime
                    ? t('detail.release_until_value', {
                      time: moment(data?.endTime).format(
                        FORMAT_TIME.DATE_HOUR_MINUTES
                      )
                    })
                    : t('detail.label_limit_end_date')}
                </Td>
              </Tr>
              <Tr>
                <Th>{t('detail.submit_deadline')}</Th>
                <Td>
                  {data?.submissionDeadline
                    ? t('detail.submitted_until_value', {
                      time: moment(data?.submissionDeadline).format(
                        FORMAT_TIME.DATE_HOUR_MINUTES
                      )
                    })
                    : t('detail.do_not_set_deadline')}
                </Td>
              </Tr>
              <Tr>
                <Th>{t('message_complete')}</Th>
                <Td>{data?.completeMessage || '-'}</Td>
              </Tr>
              <Tr>
                <Th>{t('estimate_study')}</Th>
                <Td>{data?.estimatedStudyTime
                  ? t('minutes', { number: data?.estimatedStudyTime })
                  : t('common:none')}
                </Td>
              </Tr>
            </TBody>
          </Table>
        </Block>

        <Block>
          <div className="block-head">
            <div className="left">
              <h2>{t('detail.question_settings')}</h2>
            </div>
            <div className="right">
              <Button
                type="primary"
                icon={isViewing ? <EyeOutlined /> : <EditOutlined />}
                size="large"
                onClick={() => history.push(`${RoutesName.REPORT_QUESTION_SETTING}/${reportId}?${QUERY.CREATE_BY}=${createBy}`)}
              >
                {t(isViewing ? 'common:tooltip.view' : 'common:button_setup')}
              </Button>
            </div>
          </div>
          <Table>
            <TBody>
              <Tr>
                <Th>{t('report_setting:detail.report_overview')}</Th>
                <Td>
                  {data?.overView || '-'}
                </Td>
              </Tr>
            </TBody>
          </Table>
        </Block>
      </Wrapper>
    )
  )
}

export default ReportDetailScreen
