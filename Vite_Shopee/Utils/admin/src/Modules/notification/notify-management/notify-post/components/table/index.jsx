import React, { useState } from 'react'
import { Table } from 'Components'

const TablePost = ({ t }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const onChangePage = (page) => {
    setCurrentPage(page)
  }
  const dataSource = [
    // {
    //   number: 1,
    //   loginId: '0001',
    //   name: 'This is name',
    //   userType: 'This is userType',
    //   group: 'This is group'
    // }
  ]
  const columns = [
    {
      title: 'No.',
      dataIndex: 'number',
      key: 'number',
      width: 60,
      align: 'right'
    },
    {
      title: t('post.loginId'),
      dataIndex: 'loginId',
      key: 'loginId'
    },
    {
      title: t('post.name'),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: t('post.userType'),
      dataIndex: 'userType',
      key: 'userType'
    },
    {
      title: t('post.group'),
      dataIndex: 'group',
      key: 'group'
    }
  ]
  return (
    <Table
      locale={{ emptyText: t('common:empty_data') }}
      dataSource={dataSource}
      columns={columns}
      total={20}
      currentPage={currentPage}
      onChangePage={onChangePage}
    />
  )
}

export default TablePost
