import React, { useEffect, useMemo } from 'react'
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

const UserLearnHistoryScreen = () => {
  const { t } = useTranslation(['user'])
  const { userId } = useParams()

  const {
    user,
    userLearnHistory,
    pagination,
    filter,
    loadUserAction,
    loadUserLearnHistoryAction
  } = useUserManagement()
  const { total, limit: pageSize, page: currentPage } = pagination

  const columns = useMemo(() => tableColumns({ t }), [t])

  const handleTableChange = (tablePaging) => {
    loadUserLearnHistoryAction({
      userId,
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        filter
      }
    })
  }

  useEffect(() => {
    loadUserAction({ params: { userId } })
    loadUserLearnHistoryAction({ userId })
  }, [])

  return (
    user && (
      <Wrapper>
        <Title icon={UserOutlined} title={t('user_learn_history.title')} />
        <FilterBlock
          t={t}
          loadUserLearnStatusAction={loadUserLearnHistoryAction}
        />
        <Block>
          <Table>
            <TBody>
              <Tr>
                <Th>{t('user_learn_history.login_id')}</Th>
                <Td>{user.email}</Td>
              </Tr>
              <Tr>
                <Th>{t('user_learn_history.name')}</Th>
                <Td>{user.fullName}</Td>
              </Tr>
            </TBody>
          </Table>
        </Block>

        <Block>
          <TableComponent
            locale={{ emptyText: t('common:empty_data') }}
            rowKey={(record) => record.courseId}
            dataSource={userLearnHistory}
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

export default UserLearnHistoryScreen
