import React, { useEffect, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Popconfirm } from 'antd'
import { TeamOutlined } from '@ant-design/icons'

import { useGroupAttribute, useUserManagement } from 'Hooks/user'
import { useHistories } from 'Hooks'
import { Title, Table as TableComponent, FormTreeSelect, FormLabel, FormRadio } from 'Components'
import { ASSIGN_REMOVE_OPTION } from 'Constants/user'
import { getLocalStorage } from 'Utils'
import { Block, Divider, Right, Wrapper } from 'Themes/facit'
import { Row } from './styled'
import tableColumns from './column'
import GroupOfUserSchema from './schema'

const GroupOfUserScreen = () => {
  const { t, i18n: { language } } = useTranslation(['user'])
  const history = useHistories()
  const rowSelected = JSON.parse(getLocalStorage('userSelected'))
  const {
    groups,
    loadGroupsAction
  } = useGroupAttribute()
  const {
    assignRemoveGroupAction
  } = useUserManagement()

  const form = useForm({
    resolver: yupResolver(GroupOfUserSchema(t)),
    defaultValues: {
      status: 'ACTIVE',
      group: []
    }
  })
  const { handleSubmit, watch, clearErrors } = form
  const { status, group } = watch()

  const columns = useMemo(
    () => tableColumns({ t }),
    [t]
  )

  const onSubmit = useCallback((formData) => {
    const departmentIds = formData.group.map((item) => item.value)
    assignRemoveGroupAction({
      params: {
        status: formData.status
      },
      data: {
        departmentIdList: departmentIds,
        userIdList: rowSelected.selectedRows.map(({ userId }) => userId) || []
      },
      history
    })
  }, [rowSelected])

  useEffect(() => {
    window.scrollTo(0, 0)
    loadGroupsAction({
      params: {}
    })
  }, [])

  useEffect(() => {
    clearErrors()
  }, [language])

  return (
    <Wrapper>
      <Title icon={TeamOutlined} title={t('group_of_user.title')} />
      <Block>
        <div className="form-wrapper">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <FormLabel title={t('group_of_user.assignment_or_removal')} description="Required" />
                <Right>
                  <FormRadio
                    t={t}
                    name="status"
                    options={ASSIGN_REMOVE_OPTION}
                  />
                </Right>
              </Row>
              <Divider />
              <Row>
                <FormLabel title={t('group_of_user.group')} description="Required" />
                <Right>
                  <FormTreeSelect
                    t={t}
                    name="group"
                    valueKey="departmentId"
                    labelKey="name"
                    options={groups}
                    multiple
                    getParentValue
                  />
                </Right>
              </Row>
              <Divider />

              <div className="form-action-group">
                <Popconfirm
                  title={status === 'ACTIVE' ? (
                    <>
                      <span>{t('group_of_user.warning_assign_message_1', { groupAmount: group.length, userAmount: rowSelected?.selectedRows.length })}</span><br />
                      <span>{t('group_of_user.warning_assign_message_2')}</span>
                    </>
                  ) : t('group_of_user.warning_remove_message', { groupAmount: group.length, userAmount: rowSelected?.selectedRows.length })}
                  onConfirm={handleSubmit(onSubmit)}
                >
                  <Button type="primary" htmlType="submit">
                    {status === 'ACTIVE' ? t('group_of_user.assign_button') : t('group_of_user.remove_button')}
                  </Button>
                </Popconfirm>
              </div>
            </form>
          </FormProvider>
        </div>
      </Block>

      <Block>
        <TableComponent
          locale={{ emptyText: t('common:empty_data') }}
          rowKey={(record) => record.courseId}
          dataSource={rowSelected?.selectedRows || []}
          columns={columns}
          pagination={false}
          total={rowSelected?.selectedRows.length}
          isHideDelete
        />
      </Block>
    </Wrapper>
  )
}

export default GroupOfUserScreen
