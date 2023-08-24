/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Form, Upload } from 'antd'
import styled from 'styled-components'
import { InboxOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const FormUploadDD = ({
  label,
  accept,
  onImport,
  ...rest
}) => {
  const [trans] = useTranslation('common', 'error_message')

  return (
    <Upload.Dragger
      accept={accept}
      beforeUpload={onImport}
      {...rest}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-hint">
        {trans('drag_upload_hint')}
      </p>
    </Upload.Dragger>
  )
}

export default FormUploadDD
