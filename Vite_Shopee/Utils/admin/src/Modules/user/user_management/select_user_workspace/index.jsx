/* eslint-disable react/prop-types */
import { Popover, Tag } from 'antd'
import { ModalNonForm, Table } from 'Components'
import { USER_CLASSIFICATIONS } from 'Constants'
import { useGroupAttribute, useUserManagement } from 'Hooks'
import React, { useEffect, useMemo, useState } from 'react'
import { MEMBER_TYPE_CONVERT } from 'Utils'
import FilterBlock from '../components/FilterBlockPopup'

const SelectUserWorkSpace = ({ setVisible, visible, t, companies, setDataAddUserWorkspace, dataAddUser, setDataAddUser, listUserWorkspace }) => {
  const {
    pagination,
    filter,
    isLoading,
    users: userOfCompany,
    loadUsersAction
  } = useUserManagement()

  const {
    attributes,
    groups,
    loadAttributesAction,
    loadGroupsAction
  } = useGroupAttribute()

  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: dataAddUser.selectedRowKeys,
    selectedRows: dataAddUser.selectedRows
  })

  const [companyIdChange, setCompanyIdChange] = useState(companies[0]?.companyId)
  const { limit: pageSize } = pagination
  useEffect(() => {
    loadUsersAction({
      params: {
        page: 1,
        limit: 100,
        flagRegister: true,
        companyId: companies[0]?.companyId
      }
    })
  }, [])

  const columns = useMemo(
    () => [
      {
        title: 'No.',
        align: 'right',
        width: 60,
        render: (text, record, index) => (
          <div>{(pagination.page - 1) * pagination.limit + index + 1}</div>
        )
      },
      {
        title: t('user:detail.email'),
        dataIndex: 'loginId',
        key: 'loginId',
        width: 350,
        ellipsis: true
      },
      {
        title: t('common:loginId'),
        dataIndex: 'signinId',
        key: 'signinId',
        width: 350,
        ellipsis: true
      },
      {
        title: t('user:detail.name'),
        dataIndex: 'fullname',
        key: 'fullname',
        width: 200,
        ellipsis: true
      },
      {
        title: t('user:member_type'),
        dataIndex: 'roles',
        key: 'roles',
        render: (role) => t(MEMBER_TYPE_CONVERT[role]),
        width: 200,
        ellipsis: true
      },
      {
        title: t('management.attribute'),
        dataIndex: 'departmentName',
        key: 'departmentName',
        width: 250,
        render: (text, record) => (record.attributeDto ? (
          <Popover
            overlayClassName="attribute-popover"
            content={record.attributeDto.map((item) => (
              <Tag>{item.attributeName}</Tag>
            ))}
          >
            {record.attributeDto.map((item, index) => index < 3 && (
            <Tag className="truncate">{item.attributeName}</Tag>
            ))}
          </Popover>
        ) : '')
      },
      {
        title: t('user:management.group'),
        dataIndex: 'departmentName',
        key: 'attributeDto',
        width: 250,
        render: (text, record) => (record.departmentDto ? (
          <Popover
            overlayClassName="group-popover"
            content={record.departmentDto.map((item) => (
              <Tag>{item.departmentName}</Tag>
            ))}
          >
            {record.departmentDto.map((item, index) => index < 3 && (
              <Tag className="truncate">{item.departmentName}</Tag>
            ))}
          </Popover>
        ) : '')
      },
      {
        title: t('user:user_classification'),
        dataIndex: 'classification',
        key: 'classification',
        width: 250,
        render: (classification) => {
          const itemClassification = USER_CLASSIFICATIONS.find(({ value }) => value === classification)
          return <>{itemClassification?.label}</>
        }
      }
    ],
    [t, pagination]
  )

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    for (let i = 0; i < selectedRowKeys.length; i += 1) {
      for (let j = 0; j < dataAddUser.selectedRowKeys.length; j += 1) {
        if (selectedRowKeys[i] === dataAddUser.selectedRowKeys[j]) {
          selectedRows[i] = dataAddUser.selectedRows[j]
        }
      }
    }
    setRowSelected({ selectedRowKeys, selectedRows })
  }

  const handleOnChange = (tablePaging) => {
    loadUsersAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        flagRegister: true,
        companyId: companyIdChange,
        filter
      }
    })
  }

  const handleCancel = () => {
    setVisible(false)
    loadAttributesAction({ params: {} })
    loadGroupsAction({ params: {} })
  }

  const handleSelectUserForWorkSpace = () => {
    setDataAddUserWorkspace(rowSelected.selectedRows.map((item) => ({
      classification: item.classification,
      email: item.loginId,
      fullName: item.fullname,
      fullNameKatakana: item.fullNameKatakana,
      recordId: item.userId,
      userRole: item.roles,
      signinId: item.signinId,
      companyCode: item.companyCode
    })))
    setDataAddUser(rowSelected)
    setVisible(false)
    loadAttributesAction({ params: {} })
    loadGroupsAction({ params: {} })
  }

  return (
    <>
      <ModalNonForm
        visible={visible}
        onCancel={() => handleCancel()}
        title={t('user:register')}
        isNotFooterButton
      >
        <FilterBlock
          t={t}
          loadUsersAction={loadUsersAction}
          loadAttributesAction={loadAttributesAction}
          loadGroupsAction={loadGroupsAction}
          groupsOption={groups}
          attributesOption={attributes}
          pageSize={pageSize}
          companies={companies}
          companyIdChange={companyIdChange}
          setCompanyIdChange={setCompanyIdChange}
        />
        <Table
          rowSelection={{
            selectedRowKeys: rowSelected.selectedRowKeys,
            onChange: onSelectChange,
            preserveSelectedRowKeys: true,
            getCheckboxProps: (record) => ({
              disabled: listUserWorkspace.map((user) => user.userId).includes(record.userId)
            })
          }}
          rowKey={(record) => record.userId}
          locale={{ emptyText: t('common:empty_data') }}
          dataSource={userOfCompany}
          columns={columns}
          total={pagination.total}
          pageSize={pagination.limit}
          currentPage={pagination.page}
          onChange={handleOnChange}
          selected={rowSelected.selectedRowKeys.length}
          createText={t('common:select')}
          onCreate={handleSelectUserForWorkSpace}
          loading={isLoading}
          width="100%"
          isHideDelete
        />
      </ModalNonForm>
    </>
  )
}

export default SelectUserWorkSpace
