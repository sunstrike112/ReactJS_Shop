/* eslint-disable react/prop-types */
import { PlusOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Popconfirm, Space } from 'antd'
import { FormLabel, FormRadio, FormTreeSelect } from 'Components'
import { useAddUserWorkSpace, useGroupAttribute, useHistories, useWorkspaceDetail } from 'Hooks'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Divider, Right, Row } from 'Themes/facit'
import { MEMBER_TYPES, MEMBER_TYPES_WORKSPACE } from 'Utils'
import SelectUserWorkSpace from '../../../select_user_workspace'
import { companyAdminUser } from '../../schema'
import TableUsersSelected from './TableUsersSelected'

const WorkspaceForm = ({ visibleUserWorkSpace, setVisibleUserWorkSpace, companies, loadCompaniesAction, workspaceid }) => {
  const { t } = useTranslation(['user'])
  const history = useHistories()
  const { attributes, groups, loadAttributesAction, loadGroupsAction } = useGroupAttribute()
  const { addUserWorkSpaceAction, isSubmitting } = useAddUserWorkSpace()
  const [dataAddUserWorkspace, setDataAddUserWorkspace] = useState([])
  const [dataAddUser, setDataAddUser] = useState({ selectedRowKeys: [], selectedRows: [] })

  const { data: listWorkspace, getWorkspaceDetailAction } = useWorkspaceDetail()
  const { listEmployees } = listWorkspace

  useEffect(() => {
    loadAttributesAction({ params: {} })
    loadGroupsAction({ params: {} })
  }, [])

  const form = useForm({
    resolver: yupResolver(companyAdminUser(t)),
    defaultValues: {
      attributeIdList: [],
      departmentIdList: [],
      memberType: MEMBER_TYPES[0].value
    }
  })

  const { handleSubmit, getValues } = form

  const onSubmit = () => {
    const data = dataAddUserWorkspace.map((user) => ({
      ...user,
      attributeIdList: getValues('attributeIdList').map((item) => item.value),
      departmentIdList: getValues('departmentIdList').map((item) => item.value),
      memberType: getValues('memberType')
    }))
    return addUserWorkSpaceAction({ data, history })
  }

  const handleDeleteWorkspaceUser = (user) => {
    setDataAddUserWorkspace(dataAddUserWorkspace.filter((item) => item.recordId !== user.recordId))
    setDataAddUser({
      selectedRowKeys: dataAddUser.selectedRowKeys.filter((item) => item !== user.recordId),
      selectedRows: dataAddUser.selectedRows.filter((item) => item.userId !== user.recordId)
    })
  }

  useEffect(() => {
    loadCompaniesAction({ params: { flagRegister: true } })
    getWorkspaceDetailAction({ workspaceId: workspaceid })
  }, [])
  const listUserWorkspace = listEmployees?.map((employee) => ({ ...employee, userId: employee.id }))

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Divider />
        <Row>
          <FormLabel
            title={t('register_user.group')}
            description="Optional"
          />
          <Right>
            <FormTreeSelect
              t={t}
              name="departmentIdList"
              valueKey="departmentId"
              labelKey="name"
              options={groups}
              wrapperProps={{
                colon: false
              }}
              multiple
              getParentValue
            />
          </Right>
        </Row>
        <Divider />
        <Row>
          <FormLabel
            title={t('register_user.attribute')}
            description="Optional"
          />
          <Right>
            <FormTreeSelect
              t={t}
              name="attributeIdList"
              valueKey="attributeId"
              labelKey="attributeName"
              options={attributes}
              wrapperProps={{
                colon: false
              }}
              multiple
            />
          </Right>
        </Row>
        <Divider />
        <Row>
          <FormLabel
            title={t('member_type')}
            description="Required"
          />
          <Right>
            <FormRadio
              t={t}
              name="memberType"
              options={MEMBER_TYPES_WORKSPACE}
            />
          </Right>
        </Row>
        <Divider />
        <Row>
          <FormLabel
            title={t('user:block_user_title')}
          />
          <Right>
            <TableUsersSelected data={dataAddUserWorkspace} t={t} action={handleDeleteWorkspaceUser} />
            <Space style={{ justifyContent: 'flex-end' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => setVisibleUserWorkSpace(true)}
              >
                <span>{t('common:add')}</span>
              </Button>
            </Space>
          </Right>
        </Row>
        <div className="form-action-group">
          <Popconfirm
            title={t('register_user.warning_submit_message')}
            onConfirm={onSubmit}
            disabled={isSubmitting || dataAddUserWorkspace.length === 0}
          >
            <Button
              type="primary"
              htmlType="submit"
              disabled={isSubmitting || dataAddUserWorkspace.length === 0}
              loading={isSubmitting}
            >
              {t('common:register')}
            </Button>
          </Popconfirm>
        </div>
      </form>
      {visibleUserWorkSpace && (
      <SelectUserWorkSpace
        t={t}
        visible={visibleUserWorkSpace}
        setVisible={setVisibleUserWorkSpace}
        dataAddUserWorkspace={dataAddUserWorkspace}
        setDataAddUserWorkspace={setDataAddUserWorkspace}
        companies={companies}
        dataAddUser={dataAddUser}
        setDataAddUser={setDataAddUser}
        listUserWorkspace={listUserWorkspace}
      />
      )}
    </FormProvider>
  )
}
export default WorkspaceForm
