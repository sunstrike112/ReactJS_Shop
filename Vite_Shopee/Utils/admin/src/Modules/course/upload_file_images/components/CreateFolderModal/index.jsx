/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Modal, FormInput, FormLabel } from 'Components'
import { Right, Row } from './styled'
import CreateFolderShema from './schema'

const CreateFolderModal = ({ onClose, visible, selectedFolderFile, addNewFolder }) => {
  const { t } = useTranslation(['upload_file'])
  const form = useForm({
    resolver: yupResolver(CreateFolderShema(t)),
    defaultValues: {
      folderName: ''
    }
  })
  const { handleSubmit } = form
  const onSubmit = (formData) => {
    const params = {
      ...formData,
      folderParent: selectedFolderFile?.folderParent || ''
    }
    addNewFolder({
      folderId: selectedFolderFile?.id || 0,
      params,
      callback: {
        done: () => onClose(false)
      }
    })
  }

  return (
    <FormProvider {...form}>
      <Modal
        visible={visible}
        onClose={() => onClose(false)}
        onSubmit={handleSubmit(onSubmit)}
        title={t('create.title')}
        confirm
        cancel={false}
        onSubmitText={t('common:create_button')}
        onCancelText={t('common:cancel')}
        confirmTitle={t('create.confirm_register')}
      >
        <Row>
          <FormLabel title={t('create.folder_name')} description="Required" />
          <Right>
            <FormInput name="folderName" />
          </Right>
        </Row>
      </Modal>
    </FormProvider>
  )
}

export default CreateFolderModal
