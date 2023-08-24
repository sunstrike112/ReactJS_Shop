import moment from 'moment'
import { FORMAT_TIME } from 'Constants/formatTime'
import { APPROVED_RESULT, Column } from 'Constants'
import RoutesName from 'Routes/constant'
import { TooltipCustom } from 'Components'
import React from 'react'

export default ({ t, pagination, history }) => {
  const column = [
    {
      title: t('registration_date'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => (text ? moment(text).format(FORMAT_TIME.YEAR_MONTH_DATE) : null),
      width: 150
    },
    {
      title: t('myCompany:manager_name'),
      dataIndex: 'managerFirstName',
      key: 'managerFirstName',
      width: 150,
      render: (managerFirstName) => (<TooltipCustom isEllipsis text={managerFirstName} title={managerFirstName} />)
    },
    {
      title: t('myCompany:career_name'),
      dataIndex: 'careerName',
      key: 'careerName',
      width: 150,
      render: (careerName) => (<TooltipCustom isEllipsis text={careerName} title={careerName} />)
    },
    {
      title: t('company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      width: 200,
      render: (companyName) => (<TooltipCustom isEllipsis text={companyName} title={companyName} />)
    },
    {
      title: t('myCompany:address'),
      dataIndex: 'address',
      key: 'address',
      width: 200,
      render: (address) => (<TooltipCustom isEllipsis text={address} title={address} />)
    },
    {
      title: t('waiting.duplication'),
      dataIndex: '',
      key: '',
      width: 150,
      align: 'center',
      render: (record) => ({
        props: {
          style: {
            background: record.existWaitingActive && '#D85B46',
            color: 'white',
            textAlign: 'center'
          }
        },
        children: record.existWaitingActive && t('waiting.canBeDuplicated')
      })
    },
    {
      title: t('waiting.refusedList'),
      dataIndex: '',
      key: '',
      width: 180,
      align: 'center',
      render: (record) => ({
        props: {
          style: {
            background: record.existRefuse && '#D85B46',
            color: 'white',
            textAlign: 'center'
          }
        },
        children: record.existRefuse && t('waiting.canBeRefused')
      })
    },
    {
      title: t('waiting.reserve'),
      dataIndex: '',
      key: '',
      width: 100,
      align: 'center',
      render: (record) => ({
        props: {
          style: {
            background: record.status === APPROVED_RESULT.RESERVE && '#D85B46',
            color: 'white',
            textAlign: 'center'
          }
        },
        children: record.status === APPROVED_RESULT.RESERVE && t('waiting.reserve')
      })
    }
  ]

  const onView = (record) => history.push(`${RoutesName.COMPANY_WAITING_DETAIL}/${record.companyId}`)

  return [
    ...Column.orderAction({
      t,
      pagination,
      onView
    }),
    ...column
  ]
}
