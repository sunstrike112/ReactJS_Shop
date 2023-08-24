/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
import { BookOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { downloadCommentTalkBoardCSV } from 'APIs'
import { Table, Title } from 'Components'
import { useHistories, useCommentManagement, useRoles, useAuth, useLoadCompanyAll } from 'Hooks'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Wrapper } from 'Themes/facit'
import { DEFAULT_PAG } from 'Utils'

import tableColumns from './column'
import FilterBlock from './filterBlock'

export const WrapperTable = styled.div`
  .ant-table-tbody {
    .ant-table-cell-ellipsis {
      max-width: 300px;
    }
  }
`

const CommentManagementScreen = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [csvLoading, setCsvLoading] = useState(false)

  const { t } = useTranslation(['communityManagement'])
  const history = useHistories()
  const { isSuperAdmin } = useRoles()
  const { metaData } = useAuth()
  const { roles } = metaData
  const { companyAll } = useLoadCompanyAll()
  const { idOfNissokenCompany } = companyAll

  const isShowHide = selectedRowKeys.length > 0

  const { getListCommentAction, hideCommentAction, data, pagination, filter, isLoadingComment } =	useCommentManagement()

  const { page, limit, total } = pagination

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    preserveSelectedRowKeys: true
  }

  const columns = useMemo(
    () => tableColumns({ t, pagination, history, isSuperAdmin })
      .filter((col) => col.rules.includes(roles?.[0])),
    [t, pagination, roles]
  )

  const handleOnChange = (tablePaging) => {
    getListCommentAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        ...filter
      },
      filter
    })
  }

  const onDownloadCSV = useCallback(() => {
    const commentIds = selectedRowKeys.length
      ? selectedRowKeys.map((id) => id)
      : []
    setCsvLoading(true)
    downloadCommentTalkBoardCSV({
      params: {
        timeZone: new Date().getTimezoneOffset(),
        commentIds,
        ...filter
      }
    }).finally(() => setCsvLoading(false))
  }, [selectedRowKeys, filter, pagination])

  const showComment = () => {
    hideCommentAction({
      data: {
        commentIds: selectedRowKeys,
        hide: 0
      },
      params: { page, limit, ...filter },
      filter,
      callback: {
        done: () => {
          setSelectedRowKeys([])
        }
      }
    })
  }

  const hideComment = () => {
    hideCommentAction({
      data: {
        commentIds: selectedRowKeys,
        hide: 1
      },
      params: { page, limit, ...filter },
      filter,
      callback: {
        done: () => {
          setSelectedRowKeys([])
        }
      }
    })
  }

  const action = useMemo(() => ([
    {
      text: t('show'),
      icon: <EyeOutlined />,
      disabled: !isShowHide,
      click: () => showComment()
    },
    {
      text: t('hide'),
      icon: <EyeInvisibleOutlined />,
      disabled: !isShowHide,
      click: () => hideComment()
    }
  ]), [t, selectedRowKeys])

  return (
    <Wrapper>
      <Title icon={BookOutlined} title={t('comment_title')} />
      <FilterBlock
        t={t}
        limit={limit}
        isSuperAdmin={isSuperAdmin}
        setSelectedRowKeys={setSelectedRowKeys}
        companyAll={companyAll}
      />
      <WrapperTable>
        <Table
          locale={{ emptyText: t('common:empty_data') }}
          columns={columns}
          dataSource={data.result}
          total={total}
          pageSize={limit}
          currentPage={page}
          onChange={handleOnChange}
          loading={isLoadingComment}
          rowKey={(record) => record.id}
          rowSelection={rowSelection}
          selected={selectedRowKeys.length}
          csv={{
            text: t('common:download_csv'),
            onDownload: onDownloadCSV,
            loading: csvLoading || isLoadingComment
          }}
          action={!isSuperAdmin ? action : []}
          isHideDelete
        />
      </WrapperTable>
    </Wrapper>
  )
}

export default CommentManagementScreen
