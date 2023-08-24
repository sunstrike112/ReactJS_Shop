/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Modal, FormInput, FormLabel, FormTextArea } from 'Components'
import { Right, Row } from './styled'
import EditAttributeSchema from './schema'

const EditAttributeModal = ({ onClose, visible, source, updateAttribute, setIsReloading }) => {
  const { t } = useTranslation(['user'])
  const form = useForm({
    resolver: yupResolver(EditAttributeSchema(t)),
    defaultValues: {
      attributeName: source.attributeName,
      explanation: source.explanation
    }
  })
  const { handleSubmit } = form
  const onSubmit = useCallback((formData) => {
    updateAttribute({ attributeId: source.attributeId, data: formData })
    onClose(false)
    setIsReloading(true)
  }, [])

  return (
    <FormProvider {...form}>
      <Modal
        visible={visible}
        onClose={() => onClose(false)}
        onSubmit={handleSubmit(onSubmit)}
        title={t('attribute.edit_title')}
        confirm
        cancel={false}
        onSubmitText={t('common:change')}
        onCancelText={t('common:cancel')}
        confirmTitle={t('attribute.edit_confirm')}
      >
        <Row>
          <FormLabel
            title={t('attribute.attribute_name')}
            description="Required"
          />
          <Right>
            <FormInput
              name="attributeName"
              maxLength={100}
            />
          </Right>
        </Row>
        <Row>
          <FormLabel
            title={t('attribute.explanation')}
            description="Optional"
          />
          <Right>
            <FormTextArea
              name="explanation"
              maxLength={200}
              total={200}
            />
          </Right>
        </Row>
      </Modal>
    </FormProvider>
  )
}

export default EditAttributeModal
