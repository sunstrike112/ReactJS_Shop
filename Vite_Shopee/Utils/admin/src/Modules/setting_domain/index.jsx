import React, { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Wrapper } from 'Themes/facit'
import { Table, Title } from 'Components'
import { CloudOutlined } from '@ant-design/icons'
import { useSettingDomain } from 'Hooks'
import { AddDomain } from './components'
import tableColumns from './column'

const SettingDomainScreen = () => {
  const { t } = useTranslation(['settingDomain'])

  const {
    isLoading,
    domains,
    pagination,
    loadDomainsAction,
    isAdding,
    addDomainAction,
    deleteDomainAction } = useSettingDomain()
  const { page: currentPage, limit: pageSize, total } = pagination

  const handleLoadData = useCallback(() => {
    loadDomainsAction({ params: { page: 1, limit: 100 } })
  }, [])

  const handleDelete = useCallback((company) => {
    const data = { domain: company }
    deleteDomainAction({ data, pagination })
  }, [pagination])

  const columns = useMemo(
    () => tableColumns({ t, handleDelete, pagination }),
    [t, handleDelete, pagination]
  )

  useEffect(() => {
    handleLoadData()
  }, [])

  const handleOnChange = useCallback((tablePaging) => {
    loadDomainsAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize
      } })
  }, [])

  return (
    <Wrapper>
      <form>
        <Title
          icon={CloudOutlined}
          title={t('title')}
        />
        <AddDomain
          t={t}
          isAdding={isAdding}
          addDomainAction={addDomainAction}
          handleLoadData={handleLoadData}
        />
        <Table
          locale={{ emptyText: t('common:empty_data') }}
          columns={columns}
          dataSource={domains}
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
          onChange={handleOnChange}
          loading={isLoading}
          isHideDelete
        />
      </form>
    </Wrapper>
  )
}

export default SettingDomainScreen
