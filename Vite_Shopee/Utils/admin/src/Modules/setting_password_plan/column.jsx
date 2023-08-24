/* eslint-disable no-unused-vars */
import moment from 'moment'
import React from 'react'
import { FORMAT_TIME } from 'Constants/formatTime'
import { Column } from 'Constants'

export default ({ t, pagination }) => {
  const column = [
    {
      title: t('common:password'),
      dataIndex: 'password',
      key: 'password'
    },
    {
      title: t('common:status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => t(`common:${status}`)
    },
    {
      title: t('myCompany:paymentDate'),
      dataIndex: 'usedDate',
      key: 'usedDate',
      render: (useDate) => (useDate ? moment(useDate).format(FORMAT_TIME.YEAR_MONTH_DATE) : null)
    },
    {
      title: t('name_company_used'),
      dataIndex: 'companyName',
      key: 'companyName'
    }
  ]
  return [
    ...Column.order({
      pagination
    }),
    ...column
  ]
}
