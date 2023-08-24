/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Modal, FormInput, FormLabel, FormTreeSelect } from 'Components'
import { Right, Row } from './styled'
import EditGroupShema from './schema'

const EditGroupModal = ({
  onClose,
  visible,
  source,
  groupOptions,
  updateGroup,
  setIsReloading
}) => {
  const { t } = useTranslation(['user'])
  const form = useForm({
    resolver: yupResolver(EditGroupShema(t)),
    defaultValues: {
      name: source.name,
      parentGroup: {
        value: source.parentId || null
      }
    }
  })

  const { handleSubmit } = form
  const onSubmit = useCallback((formData) => {
    const { parentGroup, ...rest } = formData
    const data = {
      ...rest,
      'detail': 'string',
      departmentId: source.departmentId,
      parentId: parentGroup?.value || null
    }
    updateGroup({ data })
    onClose(false)
    setIsReloading(true)
  }, [])

  return (
    <FormProvider {...form}>
      <Modal
        visible={visible}
        onClose={() => onClose(false)}
        onSubmit={handleSubmit(onSubmit)}
        title={t('group.edit_title')}
        confirm
        cancel={false}
        onSubmitText={t('common:change')}
        onCancelText={t('common:cancel')}
        confirmTitle={t('group.confirm_change')}
        overflow="visible"
      >
        <Row>
          <FormLabel title={t('group.parent_group')} description="Optional" />
          <Right>
            <FormTreeSelect
              name="parentGroup"
              valueKey="departmentId"
              labelKey="name"
              parentKey="parentId"
              options={groupOptions}
              disabled={source.childList.length > 0}
              groupName={source.name}
            />
          </Right>
        </Row>
        <Row>
          <FormLabel
            title={t('group.group_name')}
            description="Required"
          />
          <Right>
            <FormInput name="name" maxLength={100} />
          </Right>
        </Row>
      </Modal>
    </FormProvider>
  )
}

export default EditGroupModal
