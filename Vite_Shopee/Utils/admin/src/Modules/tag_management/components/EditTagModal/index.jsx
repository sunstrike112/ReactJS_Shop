/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup'
import { FormInput, FormLabel, Modal } from 'Components'
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import EditTagSchema from './schema'
import { Right, Row } from './styled'

const EditTagModal = ({ onClose, visible, source, updateTagApi }) => {
  const { t } = useTranslation(['tagManagement'])
  const form = useForm({
    resolver: yupResolver(EditTagSchema(t)),
    defaultValues: {
      name: source.name
    }
  })
  const { handleSubmit } = form
  const onSubmit = useCallback((formData) => {
    updateTagApi({ tagId: source.id, data: formData })
    onClose(false)
  }, [])

  return (
    <FormProvider {...form}>
      <Modal
        visible={visible}
        onClose={() => onClose(false)}
        onSubmit={handleSubmit(onSubmit)}
        title={t('edit_title')}
        confirm
        cancel={false}
        onSubmitText={t('common:change')}
        onCancelText={t('common:cancel')}
        confirmTitle={t('edit_confirm')}
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

export default EditTagModal
