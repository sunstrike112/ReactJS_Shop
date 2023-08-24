/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useMemo, useEffect } from 'react'
import { Form, Upload, Modal, ConfigProvider } from 'antd'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { LOCALES } from 'Constants'
import { useMyCompany } from 'Hooks'

import { getBase64V2 } from 'Utils/image'
import { getS3PresinedUrl } from 'APIs'
import ModalComponent from 'Components/modal'
import { getFileFromS3 } from 'Utils'

const FILE_SIZE = 10 // 10mb
const FILE_FORMATS = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']

const WrapperFormItem = styled(Form.Item)`
  height: max-content;
  width: 100%;
  margin-bottom: 10px;

  .ant-input {
    min-height: 38px;
    border-radius: 4px;
  }

  .ant-form-item-label {
    font-size: 14px;
    overflow: unset;
    white-space: unset;
  }

  .ant-form-item-children-icon {
	  display: none;
  }

  .ant-upload-list-item-info {
    font-size: .5rem;
  }
`

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`

const FormUploadImage = ({
  t,
  label,
  name,
  rules,
  defaultValue = '',
  size = FILE_SIZE,
  sizeRequired = '10240 KB',
  ...rest
}) => {
  const { control, setError, setValue, clearErrors, formState: { errors } } = useFormContext()
  const { field: { onChange, value }, fieldState: { error } } = useController({ name, control, rules, defaultValue })
  const { t: trans, i18n: { language } } = useTranslation(['common', 'error_message'])
  const { companyInfo } = useMyCompany()
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [files, setFiles] = useState([])
  const [fileValue, setFileValue] = useState(null)
  const [modalUpload, setModalUpload] = useState(false)

  const handleChange = useCallback(({ fileList }) => {
    setFiles(fileList)
  }, [])

  const handleCancel = useCallback(() => setPreviewVisible(false), [])

  const handlePreview = useCallback(async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64V2(file.originFileObj)
    }

    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)

    const previewFile = file.url || file.preview

    let fileName = previewFile.substr(0, previewFile.lastIndexOf('_'))
    fileName = fileName.substring(fileName.lastIndexOf('/') + 1)
    fileName = decodeURIComponent(fileName)
    setPreviewTitle(file.name || fileName)
  }, [files])

  const uploadImage = useCallback(async (options) => {
    const { onSuccess, onError, file } = options
    setFileValue(file)
    setValue('file', file)
    const fileList = [{ fileName: file.name, fileType: file.type }]
    const config = {
      headers: { 'content-type': file.type }
    }
    try {
      if (!FILE_FORMATS.includes(file.type)) {
        onError('Error')
        setError(name, {
          type: 'manual',
          message: trans('error_message:validation.incorrect_file_type', {
            fileName: file.name
          })
        })
      } else if (file.size / 1024 > size * 1024) {
        onError('Error')
        setError(name, {
          type: 'manual',
          message: trans('error_message:validation.max_file_size', {
            fileName: file.name,
            size: file.size / 1024,
            sizeRequired
          })
        })
      } else {
        const { data } = await getS3PresinedUrl({ fileList })
        await axios.put(data[0].preSignedURL, file, config)
        onChange(data[0].url)
        onSuccess('Ok')
      }
    } catch (err) {
      onError({ err })
    }
  }, [files])

  useEffect(() => {
    if (value) {
      setFiles([{
        url: getFileFromS3(value)
      }])
    } else {
      setFiles([])
    }
  }, [value])

  useEffect(() => {
    if (error) {
      setError(name, {
        type: 'manual',
        message: trans('error_message:validation.max_file_size', {
          fileName: fileValue.name,
          size: fileValue.size / 1024
        })
      })
    }
  }, [trans])

  const uploadButton = useMemo(() => (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8, fontSize: '.7rem' }}>{trans('upload_text')}</div>
    </div>
  ), [t])

  return (
    <WrapperFormItem
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      help={error?.message || errors.file?.message}
      validateStatus={error || errors.file ? 'error' : ''}
    >
      <ConfigProvider locale={LOCALES[language]}>
        <Upload
          accept="image/png,image/jpg,image/jpeg,image/gif"
          onPreview={handlePreview}
          onChange={handleChange}
          customRequest={uploadImage}
          onRemove={() => {
            onChange('')
            setValue('file', null)
            clearErrors([name, 'file'])
          }}
          listType="picture-card"
          fileList={files}
          {...rest}
        >
          {files.length > 0 ? null : uploadButton}
        </Upload>
      </ConfigProvider>
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%', marginTop: '20px', objectFit: 'cover' }} src={previewImage} />
      </Modal>
      {modalUpload && (
        <ModalComponent
          visible={modalUpload}
          onCancel={() => setModalUpload(false)}
          onSubmit={() => setModalUpload(false)}
          title={trans('error_message:validation.tile_upgrade')}
          onSubmitText={trans('common:offModal')}
          type="error"
          cancel={false}
        >
          <b>{trans('error_message:validation.max_file_upload_line1')}</b>
          <br />
          <b>{trans('error_message:validation.max_file_upload_line2')}</b>
        </ModalComponent>
      )}
    </WrapperFormItem>
  )
}

export default FormUploadImage
