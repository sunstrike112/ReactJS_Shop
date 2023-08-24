/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Form, Upload, notification } from 'antd'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { InboxOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { TYPE_IMG, mapMimeToExt } from 'Constants/upload_file'
import { useMyCompany } from 'Hooks'
import { checkTypeOf, getFileFromS3, handleUploadFileByChunk } from 'Utils'
import axios from 'axios'
import { getS3PresinedUrl } from 'APIs'
import { getBase64V2 } from 'Utils/image'
import Modal from 'Components/modal'

const FILE_SIZE = 10

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
`

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`

const FormUploadDD = ({ label, name, rules, defaultValue = '', size = FILE_SIZE, checkExist, accept, wrapperProps, onUpload, setIsLeave, isImage, sizeRequired = '10240 KB', ...rest }) => {
  const [trans] = useTranslation('common', 'error_message')
  const { control, setValue, setError, clearErrors } = useFormContext()
  const { field: { onChange, value }, fieldState: { error } } = useController({ name, control, rules, defaultValue })
  const [modalUpload, setModalUpload] = useState(false)
  const { companyInfo } = useMyCompany()
  const [files, setFiles] = useState([])
  const [fileValue, setFileValue] = useState(null)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false)

  const acceptType = accept || TYPE_IMG

  const isExceedPackage = useMemo(() => checkTypeOf(companyInfo.memory) === 'Number'
	&& checkTypeOf(companyInfo.memoryUsed) === 'Number'
	&& companyInfo.memoryUsed >= companyInfo.memory,
  [companyInfo.memory, companyInfo.memoryUsed])

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
      if (!TYPE_IMG.includes(file.type)) {
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
        onChange([...value, { url: data[0].url, fileType: file.type, size: file.size / 1024, fileName: file.name, folderParent: '' }])
        onSuccess('Ok')
      }
    } catch (err) {
      onError({ err })
    }
  }, [files])

  const handleChange = (options) => {
    const { fileList } = options
    setFiles(fileList)
  }

  const handleRemove = (file) => {
    const index = files.map((obj) => obj.uid).indexOf(file.uid)
    const fileRemoved = value.filter((item, i) => i !== index)
    onChange(fileRemoved)
  }

  const renderList = useMemo(() => (files.length
    ? files.filter((item) => item.status !== 'removed')
    : value.length
      ? value.map((file) => ({
        name: file.fileName,
        size: +file.fileSize,
        type: file.fileType,
        uid: file.id,
        urlS3: file.link
      }))
      : []
  ), [files, value])

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

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      help={error?.message}
      validateStatus={error ? 'error' : ''}
    >
      <Upload.Dragger
        accept={acceptType.join()}
        customRequest={onUpload || uploadImage}
        onChange={handleChange}
        onPreview={handlePreview}
        onRemove={(file) => handleRemove(file)}
        listType="picture"
        fileList={renderList}
        {...rest}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-hint">
          {trans('drag_upload_hint')}
        </p>
      </Upload.Dragger>
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%', marginTop: '20px', objectFit: 'cover' }} src={previewImage} />
      </Modal>
    </WrapperFormItem>
  )
}

export default FormUploadDD
