/* eslint-disable react/prop-types */
import React from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { formatDate } from 'Utils'
import { Tr, Td, Th } from 'Themes/facit'
import { FORMAT_TIME } from 'Constants/formatTime'

const WorkspaceAdminForm = ({ company }) => {
  const { t } = useTranslation(['myCompany'])
  return (
    <>
      <Tr>
        <Th>{t('title')}</Th>
        <Td>
          {company?.companyName}
        </Td>
      </Tr>
      <Tr>
        <Th>{t('register_date')}</Th>
        <Td>{formatDate(moment.unix(company?.registerDate / 1000), FORMAT_TIME.YEAR_MONTH_DATE)}</Td>
      </Tr>
      <Tr>
        <Th>{t('common:company_code')}</Th>
        <Td>
          {company?.companyCode}
        </Td>
      </Tr>
      <Tr>
        <Th>{t('company_name')}</Th>
        <Td>
          {company?.companyName}
        </Td>
      </Tr>
    </>
  )
}

export default React.memo(WorkspaceAdminForm)
