/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { useLoadProjectList } from 'Hooks/project_management'
import { yupResolver } from '@hookform/resolvers/yup'
import { Text } from 'Components'
import { checkExistProjectName } from 'APIs'
import { Spin } from 'antd'
import { ButtonStyled } from '../../styled'
import uploadFileSchema from './schema'
import {
  IconUpload,
  UploadVideo as Upload,
  Container,
  ModalUpload as Modal,
  Row,
  Label,
  Col
} from './styled'
import FormInput from '../formInput'

const acceptType = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/avi',
  'video/x-ms-wmv'
]

const FormLabel = ({
  title,
  color
}) => (
  <Label>
    <Text.primary
      fontWeight="fw_400"
      fontSize="size_14"
      color={color}
    >
      {title}
    </Text.primary>
  </Label>
)

const UploadProject = ({ visible, onCancel }) => {
  const { t } = useTranslation(['project'])
  const form = useForm({
    defaultValues: {
      projectName: '',
      file: null
    },
    resolver: yupResolver(uploadFileSchema(t))

  })
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset,
    clearErrors,
    setError
  } = form
  const [fileList, setFileList] = useState([])
  const { projectName, file: fileWatch } = watch()
  const {
    createProjectAction,
    isUploaded,
    isLoading
  } = useLoadProjectList()

  const propsUpload = {
    maxCount: 1,
    accept: acceptType.join()
  }
  useEffect(() => {
    if (register) {
      register('file')
    }
  }, [register])

  const handleUpload = async (file) => {
    const isOnlyVideo = acceptType.includes(file.type)
    setFileList([{
      name: file.name,
      status: !isOnlyVideo ? 'error' : 'success'
    }])
    await setValue(
      'file',
      isOnlyVideo ? file : null,
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      }
    )

    return !isOnlyVideo
  }

  const isValid = useMemo(() => !!(projectName && fileWatch), [projectName, fileWatch])
  const handleRemove = () => {
    setValue('file', null)
    clearErrors('file')
    setFileList([])
  }

  const onSubmit = (data) => createProjectAction(data)

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    setFileList([])
    reset()
  }

  useEffect(() => {
    if (projectName) {
      try {
        checkExistProjectName({
          projectName: projectName.trim()
        }).then(({ data }) => {
          if (data) {
            setError('projectName', { type: 'exist_project_name', message: t('project_name_existed') })
          } else {
            clearErrors('projectName')
          }
        })
      } catch (err) {
        setError('projectName', { type: 'project_name_invalid', message: t('project_name_invalid') })
      }
    } else {
      clearErrors('projectName')
    }
  }, [projectName])

  useEffect(() => {
    if (isUploaded) {
      handleCancel()
    }
  }, [isUploaded])

  const handleOnChange = (e) => {
    if (e.target.value.length <= 30) {
      setValue('projectName', e.target.value)
    }
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      closeIcon={null}
    >
      <FormProvider {...form}>
        <Spin spinning={isLoading}>
          <Container>
            <Row>
              <FormLabel title={t('project_name')} />
              <FormInput
                name="projectName"
                maxLength={30}
                onChange={handleOnChange}
              />
            </Row>
            <Col>
              <FormLabel
                title={t('upload_to_edit')}
              />
              <Upload
                beforeUpload={handleUpload}
                customRequest={null}
                onRemove={handleRemove}
                fileList={fileList}
                {...propsUpload}
              >
                <IconUpload />
                <p className="ant-upload-text">{t('upload_file')}</p>
                <p className="ant-upload-hint">
                  {t('common:drag_upload_hint')}
                </p>
              </Upload>
              {errors.file && (
                <FormLabel
                  title={t(errors.file.message)}
                  color="error_ant"
                />
              )}

            </Col>
            <ButtonStyled
              style={{ marginTop: 20 }}
              className="btn_upload"
              key="done"
              htmlType="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid || !isDirty}
            >
              {t('done')}
            </ButtonStyled>
          </Container>
        </Spin>
      </FormProvider>
    </Modal>
  )
}

export default UploadProject
