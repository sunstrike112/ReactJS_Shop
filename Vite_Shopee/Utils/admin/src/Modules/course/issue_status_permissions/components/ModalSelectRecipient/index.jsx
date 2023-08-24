/* eslint-disable react/prop-types */
import { Col, Row } from 'antd'
import { FormInput, FormTreeSelect, HeaderSearch, Table, ModalNonForm } from 'Components'
import { useAuth, useSelectRecipient } from 'Hooks'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import tableColumns from './column'

const ModalSelectRecipient = ({ onClose, visible, handleSelectRecipient, listUserIds }) => {
  const { t } = useTranslation(['issue_permission'])
  const { metaData } = useAuth()
  const { roles } = metaData

  const form = useForm({
    defaultValues: {
      userName: '',
      email: '',
      listDepartmentIds: [],
      listAttributeIds: [],
      signinId: ''
    }
  })

  const [rowSelected, setRowSelected] = useState(JSON.parse(JSON.stringify(listUserIds)))

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const { handleSubmit, reset } = form

  const {
    loadListAttributeAction,
    loadListGroupAction,
    loadListUserAction,
    listAttribute,
    listGroup,
    listUser,
    paginationListUser,
    filterListUser,
    isLoadingListUser
  } = useSelectRecipient()

  const { total, limit: pageSize, page: currentPage } = paginationListUser
  const columns = useMemo(
    () => tableColumns({ t, pagination: paginationListUser }).filter((col) => col.rules.includes(roles?.[0])),
    [t, paginationListUser, roles]
  )

  const handleTableChange = (tablePaging) => {
    loadListUserAction({
      params: {
        ...filterListUser,
        page: tablePaging.current,
        limit: tablePaging.pageSize
      }
    })
  }
  const onSubmit = (data) => {
    loadListUserAction({
      params: {
        ...data,
        page: currentPage,
        limit: pageSize,
        listDepartmentIds: data.listDepartmentIds.map((v) => v.value),
        listAttributeIds: data.listAttributeIds.map((v) => v.value),
        signinId: data.signinId.trim()
      }
    })
  }

  const handleCancel = async () => {
    await reset({
      userName: '',
      email: '',
      listDepartmentIds: [],
      listAttributeIds: [],
      signinId: ''
    })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
    handleSubmit(onSubmit)()
  }

  const handleResetDataAfterClose = () => {
    reset({
      userName: '',
      email: '',
      listDepartmentIds: [],
      listAttributeIds: [],
      signinId: ''
    })
    loadListUserAction({
      params: {
        page: 1,
        limit: 100
      }
    })
    setRowSelected(JSON.parse(JSON.stringify(listUserIds)))
  }

  useEffect(() => {
    loadListAttributeAction({})
    loadListGroupAction({})
    loadListUserAction({
      params: {
        page: 1,
        limit: 100
      }
    })
  }, [])

  useEffect(() => {
    setRowSelected(JSON.parse(JSON.stringify(listUserIds)))
  }, [listUserIds])

  return (
    <FormProvider {...form}>
      <ModalNonForm
        visible={visible}
        onClose={() => {
          onClose()
          handleResetDataAfterClose()
        }}
        onCancel={() => {
          onClose()
          handleResetDataAfterClose()
        }}
        title={t('select_user.title')}
        onSubmit={() => {
          handleSelectRecipient(rowSelected)
          reset({
            userName: '',
            email: '',
            listDepartmentIds: [],
            listAttributeIds: []
          })
          loadListUserAction({
            params: {
              page: 1,
              limit: 100
            }
          })
          onClose()
        }}
        onSubmitText={t('select_user.select_number', { number: rowSelected.selectedRowKeys.length })}
        onCancelText={t('common:create.close')}
        disabledSubmit={rowSelected.selectedRowKeys.length <= 0}
      >
        <HeaderSearch
          onCancel={handleCancel}
          onSubmit={handleSubmit(onSubmit)}
          popup
        >
          <Row>
            <Col span={12}>
              <FormInput
                name="userName"
                label={t('select_user.name')}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 8 },
                  wrapperCol: { span: 16 },
                  labelAlign: 'right'
                }}
              />
            </Col>
            <Col span={12}>
              <FormInput
                name="email"
                label={t('select_user.email')}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 8 },
                  wrapperCol: { span: 16 },
                  labelAlign: 'right'
                }}
              />
            </Col>
            <Col span={12}>
              <FormTreeSelect
                t={t}
                name="listDepartmentIds"
                valueKey="departmentId"
                labelKey="name"
                options={listGroup}
                label={t('select_user.group')}
                dropdownClassName="dropdown-tree-select"
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 8 },
                  wrapperCol: { span: 16 },
                  labelAlign: 'right'
                }}
                multiple
              />
            </Col>
            <Col span={12}>
              <FormTreeSelect
                t={t}
                name="listAttributeIds"
                valueKey="attributeId"
                labelKey="attributeName"
                label={t('select_user.attribute')}
                options={listAttribute}
                dropdownClassName="dropdown-tree-select"
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 8 },
                  wrapperCol: { span: 16 },
                  labelAlign: 'right'
                }}
                multiple
              />
            </Col>
            <Col span={12}>
              <FormInput
                name="signinId"
                label={t('common:loginId')}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 8 },
                  wrapperCol: { span: 16 },
                  labelAlign: 'right'
                }}
              />
            </Col>
          </Row>
        </HeaderSearch>
        <Table
          rowSelection={{
            selectedRowKeys: rowSelected.selectedRowKeys,
            onChange: onSelectChange,
            preserveSelectedRowKeys: true
          }}
          locale={{ emptyText: t('common:empty_data') }}
          rowKey={(record) => record.userId}
          dataSource={listUser}
          columns={columns}
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
          onChange={handleTableChange}
          loading={isLoadingListUser}
          selected={rowSelected.selectedRows.length}
          isHideDelete
        />
      </ModalNonForm>
    </FormProvider>
  )
}

export default memo(ModalSelectRecipient)
