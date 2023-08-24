import moment from 'moment'
import { FORMAT_TIME } from 'Constants/formatTime'
import { bytesToSize } from 'Utils'
import { Column } from 'Constants'

export default ({ t, pagination, history, handleDelete }) => {
  const column = [
    {
      title: t('company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      width: 300
    },
    {
      title: t('common:company_code_v2'),
      dataIndex: 'companyCode',
      key: 'companyCode',
      width: 200
    },
    {
      title: t('myCompany:company_code_seraku'),
      dataIndex: 'companyCodeSeraku',
      key: 'companyCodeSeraku',
      render: (text, record) => (record.isWorkingspace !== 2 ? text : ''),
      width: 200
    },
    {
      title: t('common:email'),
      dataIndex: 'email',
      key: 'email',
      width: 300
    },
    {
      title: t('registration_date'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => (text ? moment(text).format(FORMAT_TIME.YEAR_MONTH_DATE) : null),
      width: 150
    },
    {
      title: t('last_login_date'),
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (text) => (text ? moment(text).format(FORMAT_TIME.DATE_HOUR_MINUTES) : null),
      width: 200
    },
    {
      title: t('contract_plan'),
      dataIndex: 'planName',
      key: 'planName',
      width: 150
    },
    {
      title: t('number_of_user'),
      dataIndex: 'userUsing',
      key: 'userUsing',
      render: (_text, record) => t('user_using', {
        userIsUsing: record?.userIsUsing,
        totalUser: record?.maximumUser
      }),
      width: 200
    },
    {
      title: t('data_capacity'),
      dataIndex: 'dataUsed',
      key: 'dataUsed',
      render: (_text, record) => t('data_using', {
        dataUsing: bytesToSize(record?.amountOfDataUsed || 0),
        totalData: bytesToSize(record?.maximumData || 0)
      }),
      width: 200
    },
    {
      title: t('company_status'),
      dataIndex: 'companyStatus',
      key: 'companyStatus',
      render: (text) => t(text),
      width: 200
    }
  ]

  const onView = (record) => history.push(`/company-management/company-detail?companyId=${record.companyId}`)

  const onDelete = (record) => handleDelete(record)

  return [
    ...Column.orderAction({
      t,
      pagination,
      onView,
      onDelete,
      confirmDeleteText: 'company:warning_delete_message',
      verifyDisabledDelete: (record) => !record.isDelete
    }),
    ...column
  ]
}
