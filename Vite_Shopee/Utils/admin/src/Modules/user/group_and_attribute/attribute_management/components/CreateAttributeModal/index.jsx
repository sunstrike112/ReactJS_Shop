/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Modal, FormInput, FormLabel, FormTextArea } from 'Components'
import { Right, Row } from './styled'
import CreateAttributeSchema from './schema'

const CreateAttributeModal = ({ onClose, visible, addNewAttribute, pageSize, setIsReloading }) => {
  const { t } = useTranslation(['user'])
  const form = useForm({
    resolver: yupResolver(CreateAttributeSchema(t)),
    defaultValues: {
      attributeName: ''
    }
  })
  const { handleSubmit } = form
  const onSubmit = useCallback((formData) => {
    addNewAttribute({ data: formData, pageSize })
    onClose(false)
    setIsReloading(true)
  }, [])

  return (
    <FormProvider {...form}>
      <Modal
        visible={visible}
        onClose={() => onClose(false)}
        onSubmit={handleSubmit(onSubmit)}
        title={t('attribute.create_title')}
        confirm
        cancel={false}
        onSubmitText={t('common:register')}
        onCancelText={t('common:cancel')}
        confirmTitle={t('attribute.create_confirm')}
      >
        <Row>
          <FormLabel title={t('attribute.attribute_name')} description="Required" />
          <Right>
            <FormInput name="attributeName" maxLength={100} />
          </Right>
        </Row>
        <Row>
          <FormLabel title={t('attribute.explanation')} description="Optional" />
          <Right>
            <FormTextArea name="explanation" maxLength={200} total={200} />
          </Right>
        </Row>
      </Modal>
    </FormProvider>
  )
}

export default CreateAttributeModal
