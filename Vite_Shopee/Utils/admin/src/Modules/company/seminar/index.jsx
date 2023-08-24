/* eslint-disable no-unused-vars */
import { EditOutlined } from '@ant-design/icons'
import { Table, Title } from 'Components'
import { useCompanySeminar, useDeleteCompanySeminar, useRoles, useLoadCompanyAll, useHistories } from 'Hooks'
import { RoutesName } from 'Modules/company/routes'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { USER_ROLE } from 'Constants/auth'
import { COMPANY_NAME } from 'Constants/course'
import tableColumns from './column'
import { ConfirmDelete, FilterBlock } from './components'
import { Wrapper } from './styled'

const SeminarManagementScreen = () => {
  const {
    list,
    pagination,
    filter,
    loadListSeminarAction,
    isLoading
  } = useCompanySeminar()

  const { t } = useTranslation(['company_seminar'])
  const history = useHistories()
  const { isTrial, isSuperAdmin, isAdmin } = useRoles()
  const { deleteSeminarAction } = useDeleteCompanySeminar()
  const { total, limit: pageSize, page: currentPage } = pagination
  const { companyAll } = useLoadCompanyAll()
  const { idOfNissokenCompany, companyOptions } = companyAll

  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false)
  const listData = list?.map((seminar) => ({
    ...seminar,
    createdCompany:
      ((seminar?.created === USER_ROLE.NISSHOKEN_SUPER_ADMIN)
        || (seminar?.created === USER_ROLE.NISSHOKEN_ADMIN))
        ? COMPANY_NAME.NISSOKEN : seminar?.companyName
  }))

  const columns = useMemo(
    () => tableColumns({ t, history, pagination, isSuperAdmin, isAdmin, listData }).filter((item) => !!item),
    [t, history, pagination]
  )

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const handleTableChange = (tablePaging) => {
    loadListSeminarAction({
      params: {
        ...filter,
        page: tablePaging.current,
        limit: tablePaging.pageSize
      }
    })
  }

  const handleConfirmDelete = () => {
    deleteSeminarAction({
      data: rowSelected.selectedRowKeys,
      callback: {
        done: () => {
          setRowSelected({
            selectedRowKeys: [],
            selectedRows: []
          })
        }
      }
    })
    setVisibleConfirmDelete(false)
  }

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('management.title')}
      />
      <FilterBlock
        t={t}
        loadListIssuePermission={loadListSeminarAction}
        setRowSelected={setRowSelected}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        // rowSelection={
        //   ((isSuperAdmin || isAdmin))
        //     ? !([USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(listData[0]?.created)) && {
        //       selectedRowKeys: rowSelected.selectedRowKeys,
        //       onChange: onSelectChange,
        //       preserveSelectedRowKeys: true
        //     }
        //     : {
        //       selectedRowKeys: rowSelected.selectedRowKeys,
        //       onChange: onSelectChange,
        //       preserveSelectedRowKeys: true
        //     }
        // }
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true,
          getCheckboxProps: (record) => ({
            disabled: isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(record.created)
          })
        }}
        rowKey={(record) => record.seminarId}
        dataSource={listData}
        columns={columns}
        total={total}
        selected={rowSelected.selectedRowKeys.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handleTableChange}
        onDelete={() => setVisibleConfirmDelete(true)}
        createText={t('management.create_seminar')}
        onCreate={() => history.push(RoutesName.SEMINAR_CREATE)}
        loading={isLoading}
      />
      <ConfirmDelete
        t={t}
        isVisible={visibleConfirmDelete}
        onSubmit={handleConfirmDelete}
        setIsVisble={setVisibleConfirmDelete}
        numberOfSelectedRecord={rowSelected.selectedRows.length}
        disabledSubmit={false}
      />
    </Wrapper>
  )
}

export default SeminarManagementScreen
