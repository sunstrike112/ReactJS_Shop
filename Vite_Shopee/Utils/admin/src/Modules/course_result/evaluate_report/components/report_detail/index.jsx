/* eslint-disable react/prop-types */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { formatDate } from 'Utils'
import { Table, TBody, Tr, Th, Td, Block } from 'Themes/facit'
import { FORMAT_TIME } from 'Constants/formatTime'

const ReportDetail = ({
  report = null
}) => {
  const { t } = useTranslation(['courseResult'])

  return (
    <Block>
      <Table>
        <TBody>
          <Tr>
            <Th>{t('course')}</Th>
            <Td>{report?.courseName}</Td>
          </Tr>
          <Tr>
            <Th>{t('unit')}</Th>
            <Td>{report?.reportName}</Td>
          </Tr>
          <Tr>
            <Th>{t('common:loginId')}</Th>
            <Td>{report?.signinId}</Td>
          </Tr>
          <Tr>
            <Th>{t('email')}</Th>
            <Td>{report?.email}</Td>
          </Tr>
          <Tr>
            <Th>{t('name')}</Th>
            <Td>{report?.userName}</Td>
          </Tr>
          <Tr>
            <Th>{t('completeStatus')}</Th>
            <Td>{report?.completeStatus ? t(report?.completeStatus?.toLowerCase()) : t('not_participate')}</Td>
          </Tr>
          <Tr>
            <Th>{t('last_sumission_date')}</Th>
            <Td>{report?.submitTimeLatest ? formatDate(report?.submitTimeLatest, FORMAT_TIME.DATE_HOUR_MINUTES) : ''}</Td>
          </Tr>
          <Tr>
            <Th>{t('evaluation_date')}</Th>
            <Td>{report?.evaluationTimeLatest ? formatDate(report?.evaluationTimeLatest, FORMAT_TIME.DATE_HOUR_MINUTES) : ''}</Td>
          </Tr>
        </TBody>
      </Table>
    </Block>
  )
}

export default ReportDetail
