import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Wrapper } from 'Themes/facit'
import { Table, Title } from 'Components'
import { UngroupOutlined } from '@ant-design/icons'
import { useExternalApiManager } from 'Hooks'
import tableColumns from './column'
import { AddNew } from './components'

const ApiManagerScreen = () => {
  const { t, i18n } = useTranslation(['external'])
  const { isAdding, isLoading, apisManager, externalApi, pagination, getExternalApisManagerAction, deleteExternalApiManagerAction, addExternalApiManagerAction } = useExternalApiManager()
  const { page: currentPage, limit: pageSize, total } = pagination

  const handleDelete = useCallback((record) => {
    const data = {
      apiId: record.externalApi.id,
      listIp: record.listIp
    }
    deleteExternalApiManagerAction({ data, pagination })
  }, [pagination])

  const columns = useMemo(
    () => tableColumns({ t, handleDelete, pagination }),
    [t, handleDelete, pagination]
  )

  const handleOnChange = useCallback((tablePaging) => {
    getExternalApisManagerAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize
      } })
  }, [])

  return (
    <Wrapper>
      <Title
        icon={UngroupOutlined}
        title={t('apiManager.title')}
      />
      <AddNew
        t={t}
        isAdding={isAdding}
        externalApi={externalApi}
        apisManager={apisManager}
        addExternalApiManagerAction={addExternalApiManagerAction}
        language={i18n.language}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        columns={columns}
        dataSource={apisManager}
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
        onChange={handleOnChange}
        loading={isLoading}
        isHideDelete
        rowKey={({ id }) => id}
      />
    </Wrapper>
  )
}

export default ApiManagerScreen
