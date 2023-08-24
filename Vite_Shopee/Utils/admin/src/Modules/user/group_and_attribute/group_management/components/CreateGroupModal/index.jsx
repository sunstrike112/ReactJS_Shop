/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { sortBy } from 'lodash'

import { Modal, FormInput, FormLabel, FormTreeSelect } from 'Components'
import { Right, Row } from './styled'
import CreateGroupShema from './schema'

const CreateGroupModal = ({ onClose, visible, groupOptions, addNewGroup, setIsReloading }) => {
  const { t } = useTranslation(['user'])
  const form = useForm({
    resolver: yupResolver(CreateGroupShema(t)),
    defaultValues: {
      name: '',
      parentGroup: ''
    }
  })
  const { handleSubmit } = form
  const onSubmit = useCallback((formData) => {
    const { parentGroup, ...rest } = formData
    const data = {
      ...rest,
      'detail': 'string',
      parentId: parentGroup?.value || null
    }
    addNewGroup({ data })
    onClose(false)
    setIsReloading(true)
  }, [])
  return (
    <FormProvider {...form}>
      <Modal
        visible={visible}
        onClose={() => onClose(false)}
        onSubmit={handleSubmit(onSubmit)}
        title={t('group.create_title')}
        confirm
        cancel={false}
        overflow="visible"
        onSubmitText={t('common:register')}
        onCancelText={t('common:cancel')}
        confirmTitle={t('group.confirm_register')}
      >
        <Row>
          <FormLabel title={t('group.parent_group')} description="Optional" />
          <Right>
            <FormTreeSelect
              name="parentGroup"
              valueKey="departmentId"
              labelKey="name"
              parentKey="parentId"
              options={sortBy(groupOptions, ['departmentId'])}
            />
          </Right>
        </Row>
        <Row>
          <FormLabel title={t('group.group_name')} description="Required" />
          <Right>
            <FormInput name="name" maxLength={100} />
          </Right>
        </Row>
      </Modal>
    </FormProvider>
  )
}

export default CreateGroupModal
