/* eslint-disable react/no-danger */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLoadNotifi } from 'Hooks/notification'
import { useTranslation } from 'react-i18next'
import { NotificationOutlined } from '@ant-design/icons'
import { Title, Table } from 'Components'
import { Tag, Popover } from 'antd'
import { Wrapper, TBody, Tr, Th, Td, Block } from 'Themes/facit'
import { TableHeader, ActionGroup } from './styled'

const ScreenEmailDetail = () => {
  const { t } = useTranslation(['notification'])
  const { id: emailId } = useParams()
  const { emailDetail, getEmailDetailAction, pagination, isLoading } = useLoadNotifi()
  const { total, limit: pageSize, page: currentPage } = pagination

  useEffect(() => {
    getEmailDetailAction({
      emailId,
      params: {
        page: 1,
        limit: 100
      }
    })
  }, [])
  const handleTableChange = (tablePaging) => {
    getEmailDetailAction({
      emailId,
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
      title: t('post.loginId'),
      dataIndex: 'signinId',
      key: 'signinId'
    },
    {
      title: t('issue_permission:select_user.name'),
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: t('issue_permission:common.group'),
      dataIndex: '',
      width: 200,
      render: (record) => (record.listGroup ? (
        <Popover
          overlayClassName="group-popover"
          content={record.listGroup.map((item) => (
            <Tag>{item}</Tag>
          ))}
        >
          {record.listGroup.map((item, index) => index < 3 && (
            <Tag className="truncate">{item}</Tag>
          ))}
        </Popover>
      ) : '')
    },
    {
      title: t('common:email'),
      dataIndex: 'emailAddress',
      key: 'emailAddress'
    },
    {
      title: t('management.sending_status'),
      dataIndex: '',
      key: '',
      render: (action) => (
        <ActionGroup>
          {t(`management.${action.sendStatus}`)}
        </ActionGroup>
      )
    }
  ]

  return (
    <Wrapper>
      <Title icon={NotificationOutlined} title={t('title_email_history')} />
      <Block>
        <TableHeader>
          <TBody>
            <Tr>
              <Th>{t('management.sender_name')}</Th>
              <Td style={{ width: '35%' }}>{emailDetail?.senderName}</Td>
              <Th>{t('management.email_address')}</Th>
              <Td>{emailDetail?.sendAddress}</Td>
            </Tr>
            <Tr>
              <Th>{t('management.sending_status')}</Th>
              <Td style={{ width: '35%' }}>{t(`management.${emailDetail.sendStatus}`)}</Td>
              <Th>{t('send_email.sending_address')}</Th>
              <Td>{total}</Td>
            </Tr>
          </TBody>
        </TableHeader>
        <TableHeader>
          <TBody>
            <Tr>
              <Th>{t('common:loginId')}</Th>
              <Td>{emailDetail?.senderSigninId}</Td>
            </Tr>
            <Tr>
              <Th>{t('management.subject')}</Th>
              <Td>{emailDetail?.subject}</Td>
            </Tr>
            <Tr>
              <Th>{t('send_email.body')}</Th>
              <Td>
                <div dangerouslySetInnerHTML={{ __html: emailDetail?.bodyText }} />
              </Td>
            </Tr>
          </TBody>
        </TableHeader>
      </Block>
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        dataSource={emailDetail?.pageInfoUserEmailSendHistories?.result}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handleTableChange}
        loading={isLoading}
        isHideDelete
      />
    </Wrapper>
  )
}

export default ScreenEmailDetail
