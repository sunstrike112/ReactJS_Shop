/* eslint-disable max-len */
import React from 'react'

import { USER_ROLE } from 'Constants/auth'
import { NormalButton, TooltipCustom } from 'Components'
import { Column, USER_URL } from 'Constants'
import styled from 'styled-components'
import { Popover, Tag } from 'antd'

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  > button {
    margin-bottom: 8px;
    display: flex;
    flex-wrap: wrap;
    width: 100px;
    padding: 3px;
    white-space: normal;
    > p {
      font-size: 12px;
    }
  }
`

export default ({ t, sortInfor, pagination, roles, queryWorkspaceID, language }) => {
  const column = [
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      width: 150,
      align: 'center',
      render: (text, record) => (record.unitTestStatus === 'COMPLETED' || record.unitTestStatus === 'UNCOMPLETED')
      && (
        <ActionWrapper>
          <NormalButton
            title={t('show_test_result')}
            backround="blueHight"
            color="white"
            fill="none"
            stroke="white"
            fontSize="size_14"
            onClick={() => window.open(`${USER_URL}/examination/test-result/${record.courseId}/${record.unitTestId}?redirectFrom=admin&userId=${record.userId}&fromUserRole=${roles[0]}${queryWorkspaceID.CONNECT}&language=${language || 'jp'}`, '_blank')}
          />
        </ActionWrapper>
      ),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('course'),
      dataIndex: 'courseName',
      key: 'courseName',
      width: 160,
      ellipsis: true,
      sorter: true,
      sortOrder: sortInfor?.columnKey === 'courseName' && sortInfor?.order,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('unit'),
      dataIndex: 'unitTestName',
      key: 'unitTestName',
      width: 160,
      ellipsis: true,
      sorter: true,
      sortOrder: sortInfor?.columnKey === 'unitTestName' && sortInfor?.order,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      width: 250,
      ellipsis: true,
      sorter: true,
      sortOrder: sortInfor?.columnKey === 'email' && sortInfor?.order,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      key: 'signinId',
      width: 250,
      ellipsis: true,
      sorter: true,
      sortOrder: sortInfor?.columnKey === 'signinId' && sortInfor?.order,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('common:employee_number'),
      dataIndex: 'employeeNumber',
      key: 'employeeNumber',
      width: 300,
      ellipsis: true,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('name'),
      dataIndex: 'userName',
      key: 'userName',
      width: 160,
      ellipsis: true,
      sorter: true,
      sortOrder: sortInfor?.columnKey === 'userName' && sortInfor?.order,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('group'),
      dataIndex: 'groupName',
      key: 'groupName',
      width: 200,
      ellipsis: true,
      render: (listGroup) => (
        <Popover
          overlayClassName="group-popover"
          content={listGroup.map((item, index) => (
            <Tag key={index}>{item}</Tag>
          ))}
        >
          {listGroup.map((item, index) => index < 3 && (
          <Tag className="truncate" key={index}>{item}</Tag>
          ))}
        </Popover>
      ),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('result'),
      dataIndex: 'unitTestResult',
      key: 'unitTestResult',
      width: 150,
      render: (text) => (<TooltipCustom text={(text !== null) ? (text === 'PASS' ? t('passed') : t('failed')) : ''} title={(text !== null) ? (text === 'PASS' ? t('passed') : t('failed')) : ''} />),
      ellipsis: true,
      sorter: true,
      sortOrder: sortInfor?.columnKey === 'unitTestResult' && sortInfor?.order,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('highest_score'),
      dataIndex: 'highestScore',
      key: 'highestScore',
      width: 160,
      ellipsis: true,
      sorter: true,
      sortOrder: sortInfor?.columnKey === 'highestScore' && sortInfor?.order,
      render: (text) => <TooltipCustom text={text && t('common:points', { point: text })} title={text && t('common:points', { point: text })} />,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('test_status'),
      dataIndex: 'unitTestStatus',
      key: 'unitTestStatus',
      width: 180,
      ellipsis: true,
      render: (text) => {
        switch (text) {
          case 'COMPLETED':
            return <TooltipCustom text={t('completed_test')} title={t('completed_test')} />
          case 'UNCOMPLETED':
            return <TooltipCustom text={t('uncompleted_test')} title={t('uncompleted_test')} />
          default:
            return <TooltipCustom text={t('not_taken')} title={t('not_taken')} />
        }
      },
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }
  ]

  return [
    ...Column.order({
      pagination,
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }),
    ...column
  ]
}
