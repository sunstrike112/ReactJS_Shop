import React, { useEffect, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Popconfirm } from 'antd'
import { TagOutlined } from '@ant-design/icons'

import { useGroupAttribute, useUserManagement } from 'Hooks/user'
import { Title, Table as TableComponent, FormTreeSelect, FormLabel, FormRadio } from 'Components'
import { getLocalStorage, removeLocalStorage } from 'Utils'
import { ASSIGN_REMOVE_OPTION } from 'Constants/user'
import { useHistories } from 'Hooks'
import { Block, Divider, Right, Wrapper, Row } from 'Themes/facit'
import tableColumns from './column'
import AttributeOfUserSchema from './schema'

const AttributeOfUserScreen = () => {
  const { t, i18n: { language } } = useTranslation(['user'])
  const history = useHistories()

  const rowSelected = JSON.parse(getLocalStorage('userSelected'))

  const {
    attributes,
    loadAttributesAction
  } = useGroupAttribute()
  const {
    assignRemoveAttributeAction
  } = useUserManagement()

  const form = useForm({
    resolver: yupResolver(AttributeOfUserSchema(t)),
    defaultValues: {
      status: 'ACTIVE',
      attribute: []
    }
  })
  const { handleSubmit, watch, clearErrors } = form
  const { status, attribute } = watch()

  const columns = useMemo(
    () => tableColumns({ t }),
    [t]
  )

  const onSubmit = useCallback((formData) => {
    const attributeIds = formData.attribute.map((item) => item.value)
    assignRemoveAttributeAction({
      params: {
        status: formData.status
      },
      data: {
        attributeIdList: attributeIds,
        userIdList: rowSelected.selectedRows.map(({ userId }) => userId) || []
      },
      history
    })
  }, [rowSelected])

  useEffect(() => {
    window.scrollTo(0, 0)
    loadAttributesAction({
      params: {}
    })
    return function () {
      removeLocalStorage('rowSelected')
    }
  }, [])

  useEffect(() => {
    clearErrors()
  }, [language])

  return (
    <Wrapper>
      <Title icon={TagOutlined} title={t('attribute_of_user.title')} />
      <Block>
        <div className="form-wrapper">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <FormLabel title={t('attribute_of_user.assignment_or_removal')} description="Required" />
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
                <FormLabel title={t('attribute_of_user.attribute')} description="Required" />
                <Right>
                  <FormTreeSelect
                    t={t}
                    name="attribute"
                    valueKey="attributeId"
                    labelKey="attributeName"
                    options={attributes}
                    multiple
                  />
                </Right>
              </Row>
              <Divider />

              <div className="form-action-group">
                <Popconfirm
                  title={status === 'ACTIVE' ? (
                    <>
                      <span>{t('group_of_user.warning_assign_message_3', { groupAmount: attribute.length, userAmount: rowSelected?.selectedRows.length })}</span><br />
                      <span>{t('attribute_of_user.warning_assign_message_2')}</span>
                    </>
                  ) : t('attribute_of_user.warning_remove_message', { groupAmount: attribute.length, userAmount: rowSelected?.selectedRows.length })}
                  onConfirm={handleSubmit(onSubmit)}
                >
                  <Button type="primary" htmlType="submit">
                    {status === 'ACTIVE' ? t('attribute_of_user.assign_button') : t('attribute_of_user.remove_button')}
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

export default AttributeOfUserScreen
