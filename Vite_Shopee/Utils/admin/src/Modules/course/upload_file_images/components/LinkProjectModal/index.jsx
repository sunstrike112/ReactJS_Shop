/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLoadProjectList } from 'Hooks/project_management'

import { useHistories } from 'Hooks'
import { Modal, FormInput, FormLabel } from 'Components'
import { Right, Row, Wrapper } from './styled'
import uploadFileSchema from './schema'

const LinkProjectModal = ({
  onClose,
  visible,
  title,
  projectName,
  filePath,
  linkProjectId
}) => {
  const { t } = useTranslation(['upload_file'])
  const history = useHistories()
  const {
    linkFileToProjectAction,
    isLoading,
    isUploaded
  } = useLoadProjectList()

  const form = useForm({
    resolver: yupResolver(uploadFileSchema(t, linkProjectId)),
    defaultValues: {
      projectName: ''
    }
  })
  const { handleSubmit, reset, setValue } = form

  useEffect(() => {
    if (projectName) {
      setValue('projectName', projectName)
    }
  }, [projectName])

  const onCloseModal = () => {
    reset()
    onClose()
  }

  const onSubmit = (data) => {
    linkFileToProjectAction({
      projectName: data.projectName,
      filePath,
      fileId: linkProjectId
    })
  }
  useEffect(() => {
    if (isUploaded) {
      onCloseModal()
      history.push('/project-list')
    }
  }, [isUploaded])

  // useEffect(() => {
  //   if (error?.error === 'ERROR_PROJECT_ALREADY_EXISTS') {
  //     history.push('/project-list')
  //   }
  // }, [error])

  return (
    <FormProvider {...form}>
      <Modal
        visible={visible}
        onClose={onCloseModal}
        onSubmit={handleSubmit(onSubmit)}
        title={title}
        confirm
        cancel={false}
        onSubmitText={t('common:link')}
        onCancelText={t('common:cancel')}
        confirmTitle={t('edit.confirm_change')}
        overflow="visible"
        isLoadingSubmit={isLoading}
      >
        <Wrapper>
          <Row>
            <FormLabel
              title={t('project:project_name')}
              description="Required"
            />
            <Right>
              <FormInput name="projectName" />
            </Right>
          </Row>
        </Wrapper>
      </Modal>
    </FormProvider>
  )
}

export default LinkProjectModal
