/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DEFAULT_PAG } from 'Utils'
import { Modal, FormInput, FormLabel } from 'Components'
import { Right, Row } from './styled'
import CreateTagSchema from './schema'

const CreateTagModal = ({ onClose, visible, createTagApi, getListTagApi, pageSize }) => {
  const { t } = useTranslation(['tagManagement'])
  const form = useForm({
    resolver: yupResolver(CreateTagSchema(t)),
    defaultValues: {
      name: ''
    }
  })
  const { handleSubmit } = form
  const onSubmit = useCallback((formData) => {
    createTagApi({
      data: formData,
      pageSize,
      callback: () => getListTagApi(DEFAULT_PAG)
    })
    onClose(false)
  }, [])

  return (
    <FormProvider {...form}>
      <Modal
        visible={visible}
        onClose={() => onClose(false)}
        onSubmit={handleSubmit(onSubmit)}
        title={t('create_title')}
        confirm
        cancel={false}
        onSubmitText={t('common:register')}
        onCancelText={t('common:cancel')}
        confirmTitle={t('create_confirm')}
      >
        <Row>
          <FormLabel
            title={t('tag_name')}
            description="Required"
          />
          <Right>
            <FormInput
              name="name"
              maxLength={50}
            />
          </Right>
        </Row>
      </Modal>
    </FormProvider>
  )
}

export default CreateTagModal
