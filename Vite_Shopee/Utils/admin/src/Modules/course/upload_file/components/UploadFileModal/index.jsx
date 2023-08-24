/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Modal, FormUploadDD } from 'Components'
import Text from 'Components/text'
import { checkExistFile } from 'APIs/common.api'
import CreateTestShema from './schema'

const UploadFileModal = ({ onClose, visible, selectedFolderFile, uploadFile, setModalUploadFalse, setIsLeave, isShowLeave }) => {
  const { t } = useTranslation(['upload_file'])
  const form = useForm({
    resolver: yupResolver(CreateTestShema(t)),
    defaultValues: {
      url: ''
    }
  })

  const { watch } = form
  const { url, filename, size, fileType } = watch()

  const handleCheckExistFile = useCallback(async (fileName) => {
    const params = { filename: fileName }
    return checkExistFile({ folderId: selectedFolderFile?.id, params })
  }, [])

  useEffect(() => {
    if (url && filename && size && fileType) {
      const params = {
        url,
        filename,
        size,
        fileType,
        folderParent: selectedFolderFile?.folderParent || ''
      }
      uploadFile({
        folderId: selectedFolderFile?.id,
        params,
        callback: () => setModalUploadFalse(true)
      })
      onClose(false)
      setIsLeave(false)
    }
  }, [url, filename, size, fileType])

  return (
    <>
      <FormProvider {...form}>
        <Modal
          visible={visible}
          onClose={null}
          onCancel={() => onClose(false)}
          onConfirmWithClose={() => onClose(false)}
          title={t('upload_file.title')}
          isNotFooterButton
          confirmWithClose={isShowLeave}
        >
          <p>
            {t('common:upload_file_note')}
            <br />
            <Text.primary fontWeight="fw_400" color="red">
              {t('common:upload_file_warn')}
            </Text.primary>
          </p>
          <h4>{t('upload_file.file')}</h4>
          <FormUploadDD
            name="url"
            checkExist={handleCheckExistFile}
            setIsLeave={setIsLeave}
          />
        </Modal>
      </FormProvider>
    </>
  )
}

export default UploadFileModal
