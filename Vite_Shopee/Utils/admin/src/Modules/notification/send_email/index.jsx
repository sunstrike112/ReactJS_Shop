/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Space } from 'antd'
import { useReceiverEmail, useSendEmail, useAuth, useRoles, useLoadCompanyAll, useGroupAttribute, useHistories } from 'Hooks'
import { EditOutlined, SendOutlined } from '@ant-design/icons'
import { isEmpty } from 'lodash'
import {
  Title,
  FormLabel,
  PopupButton,
  FormInput,
  FormEditor,
  Text,
  Table
} from 'Components'
import { Divider, Wrapper, Row, Right, Block } from 'Themes/facit'

import { DEFAULT_PAG } from 'Utils'
import Schema from './schema'
import tableColumns from './column'
import { SelectReceiverModal } from './components'

const DEFAULT_VALUE = {
  subject: '',
  text: ''
}

const SendEmailScreen = () => {
  const { t } = useTranslation(['notification'])
  const history = useHistories()
  const { loadReceiverEmailAction } = useReceiverEmail()
  const { loadAttributesAction, loadGroupsAction } = useGroupAttribute()
  const {
    loadReceiverEmailSelectedAction,
    pagination,
    isLoadingReceiverEmailSelected,
    listReceiverEmailSelected,
    isLoading,
    sendEmailAction
  } = useSendEmail()
  const { page: currentPage, limit: pageSize, total } = pagination
  const { profile, metaData } = useAuth()
  const { fullName, email } = profile
  const { isSuperAdmin } = useRoles()
  const { companyAll } = useLoadCompanyAll()
  const { idOfNissokenCompany } = companyAll
  const { roles } = metaData

  // useState
  const [visibleSelectUserModal, setVisibleSelectUserModal] = useState(false)
  const [listUserIds, setListUserIds] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const columns = useMemo(() => tableColumns({ t, pagination }).filter((col) => col.rules?.includes(roles?.[0])),
    [t, pagination, roles])

  // form
  const form = useForm({
    defaultValues: DEFAULT_VALUE,
    resolver: yupResolver(Schema(t))
  })

  const { handleSubmit, formState: { errors }, reset, setValue, clearErrors } = form

  const onSubmit = useCallback((formData) => {
    const data = { ...formData, listReceiver: listUserIds.selectedRows.map(({ userId }) => userId) }
    sendEmailAction({ data, history })
  }, [listUserIds])

  // useEffect
  useEffect(() => {
    setValue('senderName', fullName)
    setValue('senderEmailAddress', email)
  }, [profile])

  useEffect(() => {
    loadGroupsAction({ params: { companyId: isSuperAdmin && idOfNissokenCompany } })
    loadAttributesAction({ params: { companyId: isSuperAdmin && idOfNissokenCompany } })
    loadReceiverEmailAction({
      params: {
        page: DEFAULT_PAG.page,
        limit: DEFAULT_PAG.limit,
        filter: {
          companyId: isSuperAdmin && idOfNissokenCompany
        }
      },
      loadAll: isSuperAdmin
    })
  }, [isSuperAdmin])

  useEffect(() => {
    if (!isEmpty(listUserIds.selectedRows)) {
      loadReceiverEmailSelectedAction({
        data: listUserIds.selectedRows.map(({ userId, companyId }) => ({ userId, companyId })),
        params: {
          page: currentPage || DEFAULT_PAG.page,
          limit: pageSize || 20
        },
        callback: {
          done: () => {
            loadReceiverEmailAction({
              params: { page: DEFAULT_PAG.page, limit: DEFAULT_PAG.limit, filter: { companyId: isSuperAdmin && idOfNissokenCompany } },
              loadAll: isSuperAdmin
            })
            setVisibleSelectUserModal(false)
          }
        }
      })
    }
  }, [listUserIds])

  // handleAction
  const handleSelectRecipient = (selected) => {
    setListUserIds(selected)
  }

  const handleTableChange = (tablePaging) => {
    loadReceiverEmailSelectedAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize
      },
      data: listUserIds.selectedRows.map(({ userId, companyId }) => ({ userId, companyId }))
    })
  }

  const handleReset = () => {
    reset(DEFAULT_VALUE)
    setValue('senderName', fullName)
    setValue('senderEmailAddress', email)
    loadReceiverEmailSelectedAction({
      params: { page: DEFAULT_PAG.page, limit: DEFAULT_PAG.limit },
      data: []
    })
    setListUserIds({
      selectedRowKeys: [],
      selectedRows: []
    })
  }

  useEffect(() => {
    clearErrors()
  }, [t])

  return (
    <Wrapper>
      <Title
        icon={SendOutlined}
        title={t('send_email.title')}
      />
      <div className="form-wrapper">
        <form>
          <FormProvider {...form}>
            <Row>
              <FormLabel title={t('send_email.sender_name')} description="Required" />
              <Right>
                <FormInput name="senderName" />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('send_email.sender_email_address')} description="Required" />
              <Right>
                <FormInput name="senderEmailAddress" />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('send_email.subject')} description="Required" />
              <Right>
                <FormInput name="subject" />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('send_email.body')} description="Required" />
              <Right>
                <FormEditor
                  t={t}
                  name="text"
                  total={4000}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('send_email.sending_address')} description="Required" />
              <Right>
                <Text.primary fontSize="size_14">
                  {t('send_email.people_selected', { number: listUserIds.selectedRows.length })}
                </Text.primary>
                <Text.primary fontSize="size_14">
                  {t('send_email.people_selected_warning')}
                </Text.primary>
                <Button
                  size="large"
                  onClick={() => setVisibleSelectUserModal(true)}
                  style={{ width: 'max-content' }}
                >
                  {t('send_email.reselect_target')}
                </Button>
              </Right>
            </Row>
            <Divider />
            <div className="form-action-group">
              <Space>
                <Button
                  htmlType="button"
                  onClick={handleReset}
                >
                  {t('common:clear')}
                </Button>
                <PopupButton
                  icon={EditOutlined}
                  titlePopup={t('send_email.popup_confirm')}
                  onConfirm={handleSubmit(onSubmit)}
                  textButton={t('common:send')}
                  okText="common:send"
                  disabled={!isEmpty(errors) || isEmpty(listReceiverEmailSelected) || isLoading}
                  isLoading={isLoading}
                />
              </Space>
            </div>
          </FormProvider>
        </form>
      </div>
      {visibleSelectUserModal && (
        <SelectReceiverModal
          t={t}
          visible={visibleSelectUserModal}
          setVisible={setVisibleSelectUserModal}
          handleSelectRecipient={handleSelectRecipient}
          listUserIds={listUserIds}
          isSuperAdmin={isSuperAdmin}
          companyAll={companyAll}
        />
      )}
      <Block>
        <div className="block-head">
          <div className="left">
            <h2>{t('send_email.target_person_list')}</h2>
          </div>
        </div>
        <Table
          locale={{ emptyText: t('common:empty_data') }}
          rowKey={(record) => record.userId}
          columns={columns}
          dataSource={listReceiverEmailSelected}
          total={total}
          pageSize={pageSize}
          pagination={total > 20}
          currentPage={currentPage}
          onChange={handleTableChange}
          loading={isLoadingReceiverEmailSelected}
          width="100%"
          isHideDelete
        />
      </Block>
    </Wrapper>
  )
}

export default SendEmailScreen
