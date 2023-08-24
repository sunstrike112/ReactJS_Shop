import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CloudUploadOutlined } from '@ant-design/icons'

import { Table, Title } from 'Components'
import { useUserManagement } from 'Hooks/user'
import { Space, Button } from 'antd'
import { useHistories } from 'Hooks'
import { Wrapper } from 'Themes/facit'
import { RoutesName } from 'Modules/user/routes'
import tableColumns from './column'

const BatchUserRegisterResultScreen = () => {
  const { t } = useTranslation(['user'])
  const history = useHistories()
  const {
    importUserResult,
    pagination,
    filter,
    loadImportUserResultAction
  } = useUserManagement()
  const { total, limit: pageSize, page: currentPage } = pagination

  const handleTableChange = (tablePaging) => {
    loadImportUserResultAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        filter
      }
    })
  }

  const columns = useMemo(
    () => tableColumns({ t }),
    [t]
  )

  useEffect(() => {
    loadImportUserResultAction({
      params: {
        page: 1,
        limit: 100
      }
    })
  }, [])

  return (
    <Wrapper>
      <Title
        icon={CloudUploadOutlined}
        title={t('batch_register_user.result.title')}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        rowKey={(record) => record.userId}
        dataSource={importUserResult}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handleTableChange}
      />

      <div className="action-button">
        <Space>
          <Button onClick={() => history.goBack()}>{t('batch_register_user.result.batch_register_button')}</Button>
          <Button onClick={() => history.push(RoutesName.USER_MANAGEMENT)}>{t('batch_register_user.result.user_management_button')}</Button>
        </Space>
      </div>
    </Wrapper>
  )
}

export default BatchUserRegisterResultScreen
