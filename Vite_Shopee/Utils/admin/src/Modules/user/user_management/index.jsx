import { LoginOutlined, TagOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { downloadUserCSV } from 'APIs'
import { Table, Title } from 'Components'
import { USER_WORKSPACE_ROLE } from 'Constants/auth'
import { USER_ROLE } from 'Constants'
import { useAuth, useGetQuery, useGetWorkSpaceAll, useHistories, useLoadCompanyAll, useMyCompany, useRoles } from 'Hooks'
import { useGroupAttribute, useUserManagement } from 'Hooks/user'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Wrapper } from 'Themes/facit'
import { setLocalStorage } from 'Utils'
import { RoutesName } from '../routes'
import tableColumns from './column'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'
import FilterBlock from './components/FilterBlock'

const UserManagementScreen = () => {
  const { t } = useTranslation(['user'])
  const history = useHistories()
  const { profile } = useAuth()

  const [csvLoading, setCsvLoading] = useState(false)
  const [isChooseNissoken, setIsChooseNissoken] = useState(true)

  const {
    users,
    pagination,
    sort,
    filter,
    isLoading,
    loadUsersAction,
    deleteUsersAction,
    isSubmitting,
    resetUsersAction
  } = useUserManagement()
  const {
    deleteUserWorkSpaceAction
  } = useGetWorkSpaceAll()
  const { companyAll } = useLoadCompanyAll({ params: { flagRegister: false } })
  const { workspaceid } = useGetQuery()
  const { isTrial, isSuperAdmin, isCompany, isWorkspaceAdmin, isWorkspaceVirtual } = useRoles()

  const {
    attributes,
    groups,
    loadAttributesAction,
    loadGroupsAction
  } = useGroupAttribute()
  const { total, limit: pageSize, page: currentPage } = pagination
  const { companyInfo } = useMyCompany()

  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false)

  useEffect(() => {
    if (!isSuperAdmin) {
      loadAttributesAction({ params: {} })
      loadGroupsAction({ params: {} })
    }
  }, [isSuperAdmin])

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setLocalStorage('userSelected', JSON.stringify({
      // Just get userId in selectedRowKeys
      selectedRowKeys: selectedRowKeys.map((item) => Number(item.split('-')[0])),
      selectedRows
    }))
    setRowSelected({
      selectedRowKeys,
      selectedRows
    })
  }

  const handleTableChange = (tablePaging, _, tableSort) => {
    loadUsersAction({
      params: {
        page: tablePaging.current || currentPage,
        limit: tablePaging.pageSize || pageSize,
        sort: tableSort || sort,
        filter
      }
    })
  }

  const handleConfirmDelete = (user) => {
    const indexOfAdmin = user?.userId === profile.userId
      || rowSelected.selectedRows.findIndex(({ userId }) => userId === profile.userId)

    if (profile?.isWorkSpace === USER_WORKSPACE_ROLE.WORKSPACE_ADMIN) {
      deleteUserWorkSpaceAction({
        workspaceId: workspaceid,
        data: {
          ids: rowSelected.selectedRows.map(({ userId }) => userId)
        },
        callback: {
          done: () => {
            setRowSelected({ selectedRowKeys: [], selectedRows: [] })
            setVisibleConfirmDelete(false)
          }
        },
        pagination,
        sort,
        filter
      })
    } else {
      deleteUsersAction({
        data: user?.userId ? [user.userId] : rowSelected.selectedRows.map(({ userId }) => userId),
        indexOfAdmin,
        history,
        callback: {
          done: () => {
            setRowSelected({ selectedRowKeys: [], selectedRows: [] })
            setVisibleConfirmDelete(false)
          }
        },
        pagination,
        sort,
        filter
      })
    }
  }

  const columns = useMemo(
    () => tableColumns({ t, history, pagination, isSuperAdmin, isCompany, profile, handleConfirmDelete, isWorkspaceAdmin, isWorkspaceVirtual }).filter((item) => !!item),
    [t, history, pagination]
  )

  const action = [
    (isSuperAdmin || isWorkspaceVirtual) ? null : {
      text: t('management.assign_or_remove_group'),
      icon: <TeamOutlined />,
      click: () => history.push(RoutesName.ASSIGN_OR_REMOVE_GROUPS),
      disabled: rowSelected.selectedRows.length <= 0
    },
    (isSuperAdmin || isWorkspaceVirtual) ? null : {
      text: t('management.assign_or_remove_attribute'),
      icon: <TagOutlined />,
      click: () => history.push(RoutesName.ASSIGN_OR_REMOVE_ATTRIBUTES),
      disabled: rowSelected.selectedRows.length <= 0
    },
    (!isWorkspaceAdmin && isChooseNissoken)
    && {
      text: t('management.update_login_status'),
      icon: <LoginOutlined />,
      click: () => history.push(RoutesName.LOGIN_STATUS),
      disabled: rowSelected.selectedRows.length <= 0
    }
  ]

  const isTrialAndLimitUser = useMemo(() => {
    if (isTrial) {
      return total >= companyInfo?.userUse
    }
    return false
  }, [isTrial, companyInfo, total])

  const onDownloadCSV = useCallback(
    () => {
      const data = rowSelected.selectedRows.length
        ? rowSelected.selectedRows.map(({ userId }) => userId)
        : []
      setCsvLoading(true)
      downloadUserCSV({
        params: {
          ...filter,
          ...sort,
          timezone: new Date().getTimezoneOffset()
        },
        data
      }).finally(() => setCsvLoading(false))
    },
    [filter, sort, rowSelected]
  )

  return (
    <Wrapper>
      <Title
        icon={UserOutlined}
        title={t('management.title')}
      />
      <FilterBlock
        t={t}
        loadUsersAction={loadUsersAction}
        loadAttributesAction={loadAttributesAction}
        loadGroupsAction={loadGroupsAction}
        groupsOption={groups}
        attributesOption={attributes}
        setRowSelected={setRowSelected}
        pageSize={pageSize}
        companyAll={companyAll}
        isSuperAdmin={isSuperAdmin}
        setIsChooseNissoken={setIsChooseNissoken}
        isWorkspaceAdmin={isWorkspaceAdmin}
        resetUsersAction={resetUsersAction}
      />
      <Table
        locale={{
          emptyText: t('common:empty_data'),
          triggerDesc: t('common:sort_desc'),
          triggerAsc: t('common:sort_asc'),
          cancelSort: t('common:sort_cancel')
        }}
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true,
          getCheckboxProps: (record) => ({
            disabled: record.userId === profile.userId
              || !record.isDelete
              || (isWorkspaceAdmin && record.roles === USER_ROLE.COMPANY_ADMIN)
          })
        }}
        rowKey={(record, index) => `${record.userId}-${index}`}
        dataSource={users}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        selected={rowSelected.selectedRows.length}
        action={action.filter((item) => !!item)}
        loading={isLoading}
        createText={((!isTrialAndLimitUser && !isLoading) || isSuperAdmin) && t('management.create_button')}
        onChange={handleTableChange}
        onDelete={() => setVisibleConfirmDelete(true)}
        onCreate={() => history.push(RoutesName.USER_REGISTER)}
        isHideDelete={isSuperAdmin}
        pagination={users.length > 0}
        csv={{
          text: t('common:download_csv'),
          onDownload: onDownloadCSV,
          loading: csvLoading || isLoading
        }}
      />
      <ConfirmDeleteModal
        t={t}
        isVisible={visibleConfirmDelete}
        onSubmit={handleConfirmDelete}
        setIsVisble={setVisibleConfirmDelete}
        numberOfSelectedRecord={rowSelected.selectedRows.length}
        disabledSubmit={false}
        isSubmitting={isSubmitting}
      />
    </Wrapper>
  )
}

export default UserManagementScreen
