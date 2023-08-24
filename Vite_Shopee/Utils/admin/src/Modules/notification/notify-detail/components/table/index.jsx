/* eslint-disable react/no-danger */
import React, { useEffect } from 'react'
import { Table, NormalButton } from 'Components'
import { useParams } from 'react-router-dom'
import { useCreateNotify } from 'Hooks/notification'
import { FORMAT_TIME } from 'Constants/formatTime'
import { RoutesName } from 'Modules/notification/routes'
import { useHistories, useRoles } from 'Hooks'
import { USER_ROLE } from 'Constants/auth'
import moment from 'moment'
import { CheckOutlined } from '@ant-design/icons'
import { sanitize } from 'dompurify'
import { TBody, Tr, Th, Td } from 'Themes/facit'
import { Popover, Tag } from 'antd'
import { TableHeader, ListButton } from './styled'

const TablePostDetail = ({ t }) => {
  const { id: newId } = useParams()
  const { notifi, getNotifiAction, pagination, isLoading } = useCreateNotify()
  const { total, limit: pageSize, page: currentPage } = pagination
  const history = useHistories()
  const { isSuperAdmin, isAdmin } = useRoles()

  useEffect(() => {
    getNotifiAction({
      newId,
      params: {
        page: 1,
        limit: 100
      }
    })
  }, [])

  const handleTableChange = (tablePaging) => {
    getNotifiAction({
      newId,
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize
      }
    })
  }

  const columns = [
    {
      title: 'No.',
      dataIndex: 'number',
      key: 'number',
      width: 60,
      align: 'right',
      render: (text, record, index) => (
        <div>{(pagination.page - 1) * pagination.limit + index + 1}</div>
      )
    },
    {
      title: t('post.create.email'),
      dataIndex: 'loginName',
      key: 'loginName'
    },
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      key: 'signinId'
    },
    {
      title: t('post.name'),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: t('post.group'),
      dataIndex: 'departmentName',
      key: 'departmentName',
      render: (groups) => (groups ? (
        <Popover
          overlayClassName="group-popover"
          content={groups?.map((group) => (
            <Tag>{group}</Tag>
          ))}
        >
          {groups.map((group, index) => index < 3 && (
            <Tag className="truncate">{group}</Tag>
          ))}
        </Popover>
      ) : '')
    }
  ]

  return (
    <>
      {(isSuperAdmin || isAdmin)
        ? !([USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(notifi?.created)) && (
          <ListButton>
            <NormalButton
              onClick={() => history.push(`${RoutesName.EDIT_NOTIFI}/${newId}`)}
              backround="white"
              color="secondary"
              fill="none"
              stroke="blueHight"
              disabled={notifi?.editable === 0 || (notifi?.editable === 1 && notifi?.sent === true)}
            >
              <span>{t('post.edit_the_new')}</span>
            </NormalButton>
          </ListButton>
        )
        : (
          <ListButton>
            <NormalButton
              onClick={() => history.push(`${RoutesName.EDIT_NOTIFI}/${newId}`)}
              backround="white"
              color="secondary"
              fill="none"
              stroke="blueHight"
              disabled={notifi?.editable === 0}
            >
              <span>{t('post.edit_the_new')}</span>
            </NormalButton>
          </ListButton>
        )}
      <TableHeader>
        <TBody>
          <Tr>
            <Th>{t('post.create.createTime')}</Th>
            <Td>{notifi?.createTime ? moment(new Date(notifi?.createTime)).format(FORMAT_TIME.DATE_HOUR_MINUTES_SECOND) : ''}</Td>
          </Tr>
          <Tr>
            <Th>{t('post.create.title')}</Th>
            <Td>{notifi?.newsTitle}</Td>
          </Tr>
          <Tr>
            <Th>{t('post.text')}</Th>
            <Td>
              <div dangerouslySetInnerHTML={{ __html: sanitize(notifi?.newsTextHtml) }} />
            </Td>
          </Tr>
          <Tr>
            <Th>{t('post.create.startTime')}</Th>
            <Td>{notifi?.publicationStart ? moment(new Date(notifi?.publicationStart)).format(FORMAT_TIME.DATE_HOUR_MINUTES_SECOND) : ''}</Td>

          </Tr>
          <Tr>
            <Th>{t('post.create.endTime')}</Th>
            <Td>{notifi?.publicationEnd ? moment(new Date(notifi?.publicationEnd)).format(FORMAT_TIME.DATE_HOUR_MINUTES_SECOND) : ''}</Td>
          </Tr>
          <Tr>
            <Th>{t('post.create.radio')}</Th>
            <Td>{+notifi?.forAllUser === 1 ? t('post.all') : t('post.choice')}</Td>
          </Tr>
          <Tr>
            <Th>{t('post.create.push')}</Th>
            <Td>{notifi?.sendNotification === 1 ? <CheckOutlined /> : <>-</>}</Td>
          </Tr>
        </TBody>
      </TableHeader>
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        dataSource={notifi?.userList?.result}
        columns={columns}
        total={total}
        loading={isLoading}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handleTableChange}
        isHideDelete
      />
    </>
  )
}

export default TablePostDetail
