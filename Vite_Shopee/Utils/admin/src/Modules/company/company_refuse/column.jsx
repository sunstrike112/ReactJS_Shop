import moment from 'moment'
import { FORMAT_TIME } from 'Constants/formatTime'
import { Column } from 'Constants'
import { TooltipCustom } from 'Components'
import React from 'react'

export default ({ t, pagination, moveCompanyRefusedToWaitingAction }) => {
  const column = [
    {
      title: t('registration_date'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => (text ? moment(text).format(FORMAT_TIME.YEAR_MONTH_DATE) : null),
      width: 120
    },
    {
      title: t('myCompany:manager_name'),
      dataIndex: 'managerFirstName',
      key: 'managerFirstName',
      width: 150,
      render: (managerFirstName) => (<TooltipCustom isEllipsis text={managerFirstName} title={managerFirstName} />)
    },
    {
      title: t('myCompany:fugigana_manager_name'),
      dataIndex: 'managerFuriganaFirstName',
      key: 'managerFuriganaFirstName',
      width: 200,
      render: (managerFuriganaFirstName) => (<TooltipCustom isEllipsis text={managerFuriganaFirstName} title={managerFuriganaFirstName} />)
    },
    {
      title: t('common:email'),
      dataIndex: 'email',
      key: 'email',
      width: 280,
      render: (email) => (<TooltipCustom isEllipsis text={email} title={email} />)
    },
    {
      title: t('myCompany:career_name'),
      dataIndex: 'careerName',
      key: 'careerName',
      width: 120,
      render: (careerName) => (<TooltipCustom isEllipsis text={careerName} title={careerName} />)
    },
    {
      title: t('company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      width: 150,
      render: (companyName) => (<TooltipCustom isEllipsis text={companyName} title={companyName} />)
    },
    {
      title: t('myCompany:address'),
      dataIndex: 'address',
      key: 'address',
      width: 100,
      render: (address) => (<TooltipCustom isEllipsis text={address} title={address} />)
    },
    {
      title: t('myCompany:tel_phone'),
      dataIndex: 'cellPhoneNumber',
      key: 'cellPhoneNumber',
      width: 120
    },
    {
      title: t('user:register_user.note'),
      dataIndex: 'memo',
      key: 'memo',
      width: 150,
      ellipsis: true,
      render: (memo) => (<TooltipCustom isEllipsis text={memo} title={memo} />)
    }
  ]

  const onDelete = ({ companyId }) => {
    moveCompanyRefusedToWaitingAction({ companyId, pagination })
  }

  return [
    ...Column.orderAction({
      t,
      pagination,
      onDelete,
      confirmDeleteText: 'company:warning_refused_message',
      width: {
        no: 60,
        action: 80
      },
      textDelete: t('company:delete_btn')
    }),
    ...column
  ]
}
