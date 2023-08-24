import React, { useEffect, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'

import { useUserManagement } from 'Hooks/user'
import { Title, Table as TableComponent } from 'Components'
import {
  Wrapper,
  Table,
  TBody,
  Tr,
  Th,
  Td,
  Block
} from 'Themes/facit'
import FilterBlock from './components/FilterBlock'
import tableColumns from './column'

const UserLearnStatusScreen = () => {
  const { t } = useTranslation(['user'])
  const { userId } = useParams()

  const {
    user,
    userLearnStatus,
    pagination,
    filter,
    loadUserAction,
    loadUserLearnStatusAction
  } = useUserManagement()
  const { total, limit: pageSize, page: currentPage } = pagination

  const columns = useMemo(() => tableColumns({ t }), [t])

  const handleTableChange = useCallback((tablePaging) => {
    loadUserLearnStatusAction({
      userId,
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        filter
      }
    })
  }, [filter])

  useEffect(() => {
    loadUserAction({ params: { userId } })
    loadUserLearnStatusAction({ userId })
  }, [])

  return (
    user && (
      <Wrapper>
        <Title icon={UserOutlined} title={t('user_learn_status.title')} />
        <FilterBlock
          t={t}
          loadUserLearnStatusAction={loadUserLearnStatusAction}
        />
        <Block>
          <Table>
            <TBody>
              <Tr>
                <Th>{t('user_learn_status.login_id')}</Th>
                <Td>{user.email}</Td>
              </Tr>
              <Tr>
                <Th>{t('user_learn_status.name')}</Th>
                <Td>{user.fullName}</Td>
              </Tr>
            </TBody>
          </Table>
        </Block>

        <Block>
          <TableComponent
            locale={{ emptyText: t('common:empty_data') }}
            rowKey={(record) => record.courseId}
            dataSource={userLearnStatus}
            columns={columns}
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            onChange={handleTableChange}
          />
        </Block>
      </Wrapper>
    )
  )
}

export default UserLearnStatusScreen
