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

const UserTestResultScreen = () => {
  const { t } = useTranslation(['user'])
  const { userId } = useParams()

  const {
    user,
    userTestResult,
    pagination,
    filter,
    loadUserAction,
    loadUserTestResultAction
  } = useUserManagement()
  const { total, limit: pageSize, page: currentPage } = pagination

  const columns = useMemo(
    () => tableColumns({ t }),
    [t]
  )

  const handleTableChange = useCallback((tablePaging) => {
    loadUserTestResultAction({
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
    loadUserTestResultAction({ userId, params: { page: 1, limit: 100 } })
  }, [])

  return (
    user && (
      <Wrapper>
        <Title icon={UserOutlined} title={t('user_test_result.title')} />
        <FilterBlock
          t={t}
          loadUserLearnStatusAction={loadUserTestResultAction}
        />
        <Block>
          <Table>
            <TBody>
              <Tr>
                <Th>{t('user_test_result.login_id')}</Th>
                <Td>{user.email}</Td>
              </Tr>
              <Tr>
                <Th>{t('user_test_result.name')}</Th>
                <Td>{user.fullName}</Td>
              </Tr>
            </TBody>
          </Table>
        </Block>

        <Block>
          <TableComponent
            locale={{ emptyText: t('common:empty_data') }}
            rowKey={(record) => record.courseId}
            dataSource={userTestResult}
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

export default UserTestResultScreen
