/* eslint-disable react/prop-types */
import React, { useCallback, useMemo, useState } from 'react'
import { Form, Upload, notification } from 'antd'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { InboxOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { TYPE_IMG, mapMimeToExt } from 'Constants/upload_file'
import ModalComponent from 'Components/modal'
import { useMyCompany } from 'Hooks'
import { checkTypeOf, handleUploadFileByChunk } from 'Utils'

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

const FormUploadDD = ({ label, name, rules, defaultValue = '', checkExist, accept, wrapperProps, onUpload, setIsLeave, isImage, ...rest }) => {
  const [trans] = useTranslation('common', 'error_message')
  const { control, setValue, setError, clearErrors } = useFormContext()
  const { field: { onChange }, fieldState: { error } } = useController({ name, control, rules, defaultValue })
  const [modalUpload, setModalUpload] = useState(false)
  const { companyInfo } = useMyCompany()

  const acceptType = accept || isImage
    ? TYPE_IMG
    : [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-powerpoint',
      'video/mp4',
      'video/webm',
      'video/quicktime',
      'video/avi',
      'video/x-ms-wmv'
    ]

  const isExceedPackage = useMemo(() => checkTypeOf(companyInfo.memory) === 'Number'
	&& checkTypeOf(companyInfo.memoryUsed) === 'Number'
	&& companyInfo.memoryUsed >= companyInfo.memory,
  [companyInfo.memory, companyInfo.memoryUsed])

  const uploadFile = useCallback(async (options) => {
    clearErrors(name)
    const { onSuccess, onError, file } = options
    const fileType = mapMimeToExt[file.type]
    try {
      // check fileType
      if (isExceedPackage) {
        onError('Error')
        setModalUpload(true)
        setIsLeave(false)
      }
      if (!acceptType.includes(file.type)) {
        setError(name, {
          type: 'manual',
          message: trans('error_message:validation.incorrect_file_type_upload_2', { fileName: file.name })
        })
        setIsLeave(false)
        throw new Error(trans('error_message:validation.incorrect_file_type_upload_2'))
      } else {
        setIsLeave(true)
        // check file exist
        const { data: isExist } = await checkExist(file.name)
        if (isExist) {
          notification.error({
            message: trans('error'),
            description: trans('error_message:FILE_NAME_EXIST'),
            duration: 2
          })
          throw new Error(trans('error_message:FILE_NAME_EXIST'))
        } else {
          // const maxFileUpload = 2147483648
          // if (file.size > maxFileUpload) {
          //   notification.error({
          //     message: trans('error'),
          //     description: trans('error_message:ERROR_LIMIT_FILE_UPLOAD_SIZE'),
          //     duration: 2
          //   })
          //   throw new Error(trans('error_message:ERROR_LIMIT_FILE_UPLOAD_SIZE'))
          // }
          const result = await handleUploadFileByChunk(file)
          onChange(result)
          setValue('filename', file.name)
          setValue('size', file.size)
          setValue('fileType', fileType)
          onSuccess('Ok')
        }
      }
    } catch (err) {
      setIsLeave(false)
      onError({ err })
    }
  }, [])

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      help={error?.message}
      validateStatus={error ? 'error' : ''}
    >
      <Upload.Dragger
        accept={acceptType.join()}
        customRequest={onUpload || uploadFile}
        onRemove={() => {
          onChange('')
          setValue('filename', '')
          setValue('size', '')
          setValue('fileType', '')
          clearErrors(name)
        }}
        {...rest}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-hint">
          {trans('drag_upload_hint')}
        </p>
      </Upload.Dragger>
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

export default FormUploadDD
