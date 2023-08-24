/* eslint-disable no-undef */
import {
  CopyOutlined
} from '@ant-design/icons'
import { Table, Title } from 'Components'
import { useAuth, useHistories, useRoles } from 'Hooks'
import { useTemplateManagement } from 'Hooks/template_management'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Wrapper } from './styled'
import tableColumns from './column'
import { RoutesName } from './routes'
import { FilterBlock } from './components'

const TemplateManagementScreen = () => {
  const { t } = useTranslation(['reportTemplateManagement'])
  const {
    getListTemplateAction,
    listTemplate,
    filter
  } = useTemplateManagement()

  const history = useHistories()
  const { isSuperAdmin } = useRoles()
  const { metaData } = useAuth()
  const { roles } = metaData
  const { pagination, isLoading } = listTemplate
  const { total, limit: pageSize, page: currentPage } = pagination
  const [rowSelected, setRowSelected] = React.useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const handleTableChange = (tablePaging) => {
    getListTemplateAction({
      ...filter,
      page: tablePaging.current,
      limit: tablePaging.pageSize
    })
  }

  const columns = React.useMemo(
    () => tableColumns({ t, pagination, history, isSuperAdmin, RoutesName }).filter((item) => item.rules.includes(roles?.[0])),
    [t, pagination, roles]
  )

  const dataTemplate = React.useMemo(() => listTemplate.result
    .map((template) => ({
      ...template
    })), [listTemplate])

  return (
    <Wrapper>
      <Title
        icon={CopyOutlined}
        title={t('template_title')}
      />
      <FilterBlock
        t={t}
        isSuperAdmin={isSuperAdmin}
        setRowSelected={setRowSelected}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true
        }}
        rowKey={(record) => record.id}
        dataSource={dataTemplate}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        selected={rowSelected.selectedRowKeys.length}
        onChange={handleTableChange}
        loading={isLoading}
        onDelete={() => setVisibleConfirmDelete(true)}
        isHideDelete
      />
    </Wrapper>
  )
}

export default TemplateManagementScreen
