import React, { useEffect, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Popconfirm } from 'antd'
import { HistoryOutlined } from '@ant-design/icons'

import { useUserManagement, useRoles, useHistories } from 'Hooks'
import { Title, Table as TableComponent, FormLabel, FormRadio } from 'Components'
import { getLocalStorage, removeLocalStorage } from 'Utils'
import { LOGIN_STATUS_OPTION } from 'Constants/user'
import { Block, Divider, Right, Wrapper, Row } from 'Themes/facit'
import tableColumns from './column'
import LoginStatusSchema from './schema'

const LoginStatusScreen = () => {
  const { t } = useTranslation(['user'])
  const userSelected = JSON.parse(getLocalStorage('userSelected'))
  const history = useHistories()

  const {
    updateLoginStatusAction
  } = useUserManagement()

  const form = useForm({
    defaultValues: {
      status: LOGIN_STATUS_OPTION[0].value
    },
    resolver: yupResolver(LoginStatusSchema(t))
  })
  const { handleSubmit } = form
  const { isSuperAdmin } = useRoles()

  const columns = useMemo(
    () => tableColumns({ t, isSuperAdmin }).filter((item) => !!item),
    [t]
  )

  const onSubmit = useCallback((formData) => {
    const { status } = formData
    if (status) {
      updateLoginStatusAction({
        params: {
          status: formData.status
        },
        data: userSelected?.selectedRowKeys || [],
        history
      })
    }
  }, [])

  useEffect(() => function () {
    removeLocalStorage('userSelected')
  }, [])

  return (
    <Wrapper>
      <Title icon={HistoryOutlined} title={t('login_status.title')} />
      <Block>
        <div className="form-wrapper">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <FormLabel title={t('login_status.status')} description="Required" />
                <Right>
                  <FormRadio
                    t={t}
                    name="status"
                    options={LOGIN_STATUS_OPTION}
                  />
                </Right>
              </Row>
              <Divider />

              <div className="form-action-group">
                <Popconfirm
                  title={t('login_status.warning_change_message', { userAmount: 1 })}
                  onConfirm={handleSubmit(onSubmit)}
                >
                  <Button type="primary" htmlType="submit">
                    {t('login_status.change_button')}
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
          dataSource={userSelected?.selectedRows || []}
          columns={columns}
          pagination={false}
          total={userSelected?.selectedRows.length}
          isHideDelete
        />
      </Block>
    </Wrapper>
  )
}

export default LoginStatusScreen
