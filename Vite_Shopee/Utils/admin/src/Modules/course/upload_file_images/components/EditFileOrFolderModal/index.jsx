/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Modal, FormInput, FormAutocomplete, FormLabel } from 'Components'
import { UPLOAD_FILE_TYPE } from 'Constants/upload_file'
import { Right, Row, Wrapper } from './styled'
import EditFileOrFolderSchema from './schema'
import { getCourseOptions } from './suggestion'

const EditFileOrFolderModal = ({ onClose, visible, data, selectedFolderFile, updateFolderFile, getFolderFilesAction }) => {
  const isFolder = useMemo(() => data?.type === UPLOAD_FILE_TYPE.FOLDER, [data])
  const { t, i18n } = useTranslation(['upload_file'])
  const form = useForm({
    resolver: yupResolver(EditFileOrFolderSchema(t, isFolder, data.fileType)),
    defaultValues: {
      folderName: data.fileName
    }
  })
  const { handleSubmit } = form
  const courseOptions = useCallback((inputValue) => getCourseOptions(inputValue, t), [t])

  const onSubmit = useCallback((formData) => {
    const params = {
      ...formData,
      folderParent: selectedFolderFile?.folderParent || ''
    }
    updateFolderFile({
      folderId: data.id,
      params,
      callback: {
        done: () => onClose(false)
      }
    })
  }, [])

  return (
    <FormProvider {...form}>
      <Modal
        visible={visible}
        onClose={() => onClose(false)}
        onSubmit={handleSubmit(onSubmit)}
        title={isFolder ? t('edit.title_edit_folder') : t('edit.title_edit_file')}
        confirm
        cancel={false}
        onSubmitText={t('common:change')}
        onCancelText={t('common:cancel')}
        confirmTitle={t('edit.confirm_change')}
        overflow="visible"
      >
        <Wrapper>
          <Row>
            <FormLabel title={isFolder ? t('edit.folder_name') : t('edit.file_name')} description="Required" />
            <Right>
              <FormInput name="folderName" />
            </Right>
          </Row>
          {false && (
          <Row>
            <FormLabel title={t('edit.course')} description="Optional" />
            <Right>
              <FormAutocomplete
                key={i18n.language}
                t={t}
                name="course"
                handleSuggestion={courseOptions}
                isMulti
              />
            </Right>
          </Row>
          )}
        </Wrapper>
      </Modal>
    </FormProvider>
  )
}

export default EditFileOrFolderModal
