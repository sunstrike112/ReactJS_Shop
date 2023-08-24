/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import { UploadOutlined } from '@ant-design/icons'
import { Form, Upload, Button } from 'antd'
import { getS3PresinedUrl } from 'APIs'
import axios from 'axios'
import { mapMimeToExt } from 'Constants/upload_file'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ModalComponent from 'Components/modal'
import { useMyCompany } from 'Hooks'
import styled from 'styled-components'
import { checkTypeOf, getFileFromS3 } from 'Utils'

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
`

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`

const FILE_SIZE = 10 // 10mb

const FormUpload = ({
  t,
  label,
  name,
  rules,
  defaultValue = '',
  wrapperProps,
  size = FILE_SIZE,
  ...rest
}) => {
  const { control, setError, clearErrors } = useFormContext()
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({ name, control, rules, defaultValue })
  const [trans] = useTranslation(['common', 'error_message'])
  const { companyInfo } = useMyCompany()
  const [files, setFiles] = useState([])
  const [fileValue, setFileValue] = useState(null)
  const [modalUpload, setModalUpload] = useState(false)

  const handleChange = useCallback(({ fileList }) => {
    setFiles(fileList)
    clearErrors([name])
  }, [])

  const isExceedPackage = useMemo(() => checkTypeOf(companyInfo.memory) === 'Number'
	&& checkTypeOf(companyInfo.memoryUsed) === 'Number'
	&& companyInfo.memoryUsed >= companyInfo.memory,
  [companyInfo.memory, companyInfo.memoryUsed])

  const uploadImage = useCallback(
    async (options) => {
      const { onSuccess, onError, file } = options
      setFileValue(file)
      const fileList = [{
        fileName: file.name,
        fileType: mapMimeToExt[file.type]
      }]
      const config = {
        headers: { 'content-type': file.type }
      }

      try {
        if (isExceedPackage) {
          onError('Error')
          setModalUpload(true)
          setFiles([])
        } else if (file.size / 1024 > size * 1024) {
          onError('Error')
          setError(name, {
            type: 'manual',
            message: trans('error_message:validation.max_file_size', {
              fileName: file.name,
              size: file.size / 1024
            })
          })
        } else {
          const { data } = await getS3PresinedUrl({ fileList })
          await axios.put(data[0].preSignedURL, file, config)
          onChange({
            fileName: file.name,
            socialPath: data[0].url,
            type: file.type
          })
          onSuccess(data[0].url)
          clearErrors([name])
        }
      } catch (err) {
        onError({ err })
      }
    }, [files]
  )

  useEffect(() => {
    if (value) {
      setFiles([{
        url: getFileFromS3(value.socialPath),
        name: value.fileName
      }])
    } else if (value === '') {
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

  const onRemoveFile = () => {
    onChange('')
  }

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      help={error?.message}
      validateStatus={error ? 'error' : ''}
    >
      <Upload
        onChange={handleChange}
        customRequest={uploadImage}
        fileList={files}
        onRemove={onRemoveFile}
        {...rest}
      >
        <Button icon={<UploadOutlined />}>{trans('upload_text')}</Button>
      </Upload>
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

export default FormUpload
