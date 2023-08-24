/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Modal, FormInput, FormInputNumber, FormLabel, FormRadio } from 'Components'
import { Divider, Right, Row } from 'Themes/facit'
import CreateNewPassword from './schema'

const METHOD_VALUE = {
  AUTOMATIC: 'create_password.auto',
  HAND: 'create_password.hand'
}

const METHOD_OPTIONS = [
  { value: false, label: METHOD_VALUE.HAND },
  { value: true, label: METHOD_VALUE.AUTOMATIC }
]

const DEFAULT_VALUE = {
  isAuto: false,
  password: ''
}

const CreatePasswordModal = ({ t, onClose, visible, addPasswordAction, getInitData, isAdding }) => {
  const form = useForm({
    resolver: yupResolver(CreateNewPassword(t)),
    defaultValues: DEFAULT_VALUE
  })
  const { handleSubmit, clearErrors, reset, watch } = form
  const { isAuto } = watch()

  const onSubmit = (data) => {
    addPasswordAction({
      data,
      callback: {
        done: () => {
          onClose()
          getInitData()
        }
      }
    })
  }

  const handleCancel = () => {
    onClose()
    reset()
    clearErrors()
  }

  const handleOnChangeMethod = (e) => {
    const { value } = e.target
    reset({
      ...DEFAULT_VALUE,
      isAuto: value
    })
    clearErrors()
  }

  return (
    <FormProvider {...form}>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        onSubmit={handleSubmit(onSubmit)}
        title={t('create_new_password')}
        onSubmitText={t('common:register')}
        onCancelText={t('common:cancel')}
        isLoadingSubmit={isAdding}
      >
        <Row>
          <FormLabel title={t('create_password.method_create')} description="Required" />
          <Right>
            <FormRadio t={t} name="isAuto" options={METHOD_OPTIONS} onChange={handleOnChangeMethod} />
          </Right>
        </Row>
        <Divider />
        {isAuto
          ? (
            <Row>
              <FormLabel title={t('create_password.numbers')} description="Required" />
              <Right>
                <FormInputNumber
                  name="numberOfPassword"
                  min={0}
                  prefix={false}
                  maxLength={2}
                  isTypingDot={false}
                  autoFocus
                />
              </Right>
            </Row>
          )
          : (
            <Row>
              <FormLabel title={t('common:password')} description="Required" />
              <Right>
                <FormInput
                  name="password"
                  autoFocus
                />
              </Right>
            </Row>
          )}
      </Modal>
    </FormProvider>
  )
}

export default CreatePasswordModal
