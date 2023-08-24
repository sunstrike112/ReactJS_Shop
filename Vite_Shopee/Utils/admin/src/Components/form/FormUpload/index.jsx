/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { DeleteOutlined, EyeOutlined, LoadingOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons'
import { Col, Form, Modal, Row, Space, Spin, Upload } from 'antd'
import { getS3PresinedUrl } from 'APIs'
import { ICON_FILE } from 'Assets'
import axios from 'axios'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMyCompany } from 'Hooks'
import styled from 'styled-components'
import { getBase64V2 } from 'Utils/image'
import ModalComponent from 'Components/modal'
import { checkTypeOf } from 'Utils'

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

const WrapperContent = styled.div`
  height: 100%;
  min-width: fit-content;
  position: relative;

  .upload-spinner {
    height: 100%;
  }

  .upload-content {
    border: 1px solid ${({ status, theme }) => (status === 'error' ? theme.error_ant : '#d9d9d9')};
    padding: 8px;
    height: 100%;

    .upload-content-col {
      height: 100%;
      display: flex;
      align-items: center;

      img, video {
        width: 100%;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }
    }
  }

  .upload-action {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: transparent;
    opacity: 0;
    color: rgba(255, 255, 255, 0.85);
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 1;
    }
  }
`

const FILE_SIZE = 10 // 20mb
const FILE_IMG_FORMATS = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'png', 'jpg', 'jpeg', 'gif']
const FILE_AUDIO_FORMATS = ['audio/mpeg', 'audio/mp3', 'mp3', 'mpeg']
const FILE_VIDEO_FORMATS = ['video/mp4', 'mp4']
const FILE_FORMATS = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'video/mp4', 'audio/mpeg', 'audio/mp3', 'png']
const FILE_FORMATS_TEXT = [
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-powerpoint'
]
const ACCEPT_FORMAT = 'image/png, image/jpg, image/jpeg, image/gif, video/mp4, audio/mpeg, audio/mp3'

const FormUpload = ({ t, label, name, rules, defaultValue = '', wrapperProps, size = FILE_SIZE, acceptFormat = ACCEPT_FORMAT, ...rest }) => {
  const { control, setError, clearErrors } = useFormContext()
  const { field: { onChange, value }, fieldState: { error } } = useController({ name, control, rules, defaultValue })
  const [trans] = useTranslation(['common', 'error_message'])
  const { companyInfo } = useMyCompany()
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewResponse, setPreviewResponse] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [previewType, setPreviewType] = useState('')

  const [validationError, setValidationError] = useState(null)
  const [files, setFiles] = useState([])
  const [modalUpload, setModalUpload] = useState(false)

  const handleChange = useCallback(({ fileList }) => {
    setFiles(fileList)
  }, [])

  const handleCancel = useCallback(() => setPreviewVisible(false), [])

  const handlePreview = useCallback(async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64V2(file.originFileObj)
    }
    setPreviewResponse(file.response || file.url || file.preview)
    setPreviewType(file.type)
    setPreviewVisible(true)

    const previewFile = file.response || file.url || file.preview

    let fileName = previewFile.substr(0, previewFile.lastIndexOf('_'))
    fileName = fileName.substring(fileName.lastIndexOf('/') + 1)
    fileName = decodeURIComponent(fileName)

    setPreviewTitle(file.name || file.fileName)
  }, [])

  const isExceedPackage = useMemo(() => checkTypeOf(companyInfo.memory) === 'Number'
	&& checkTypeOf(companyInfo.memoryUsed) === 'Number'
	&& companyInfo.memoryUsed >= companyInfo.memory,
  [companyInfo.memory, companyInfo.memoryUsed])

  const uploadFile = useCallback(async (options) => {
    const { onSuccess, onError, file } = options
    const extention = (file.name.split('.'))[(file.name.split('.')).length - 1]
    const fileList = [{ fileName: file.name, fileType: FILE_AUDIO_FORMATS.includes(file.type) ? 'mp3' : FILE_VIDEO_FORMATS.includes(file.type) ? 'mp4' : extention }]
    const config = {
      headers: { 'content-type': file.type }
    }
    try {
      if (companyInfo) {
        if (isExceedPackage) {
          onError('Error')
          setModalUpload(true)
        }
      }
      if (acceptFormat !== '*' && !FILE_FORMATS.includes(file.type)) {
        onError('Error')
        setError(name, { type: 'manual', message: trans('error_message:validation.incorrect_file_type_upload', { fileName: file.name }) })
      } else if (file.size / 1024 > size * 1024) {
        onError('Error')
        setError(name, {
          type: 'manual',
          message: trans('error_message:validation.max_file_size',
            { fileName: file.name, size: file.size / 1024 })
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
  }, [files])

  useEffect(() => {
    if (value) {
      setFiles([{
        url: value.socialPath,
        thumbUrl: value.socialPath,
        type: value.type,
        fileName: value.fileName
      }])
    } else if (value === '') {
      setFiles([])
    }
  }, [value])

  const uploadButton = useMemo(() => (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8, fontSize: '.7rem' }}>{trans('upload_text')}</div>
    </div>
  ), [t])

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      help={error?.message}
      validateStatus={validationError || error ? 'error' : ''}
    >
      <Upload
        accept={acceptFormat}
        listType="picture-card"
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={uploadFile}
        fileList={files}
        itemRender={(a, b, c, d) => {
          return (
            <WrapperContent align="middle" justify="center" status={b.status}>
              {b.status === 'uploading' && (
                <Row align="middle" justify="center" className="upload-spinner">
                  <Col>
                    <Spin indicator={<LoadingOutlined />} />
                  </Col>
                </Row>
              )}
              {b.status !== 'uploading' && (
                <>
                  <Row className="upload-content" align="middle" justify="center">
                    <Col span={24} className="upload-content-col">
                      {FILE_AUDIO_FORMATS.includes(b.type) && (
                        <audio src={b.response || b.thumbUrl} controls controlsList="nofullscreen noremoteplayback noplaybackrate nocaptions nodownload" />
                      )}
                      {FILE_IMG_FORMATS.includes(b.type) && (
                        (b.response || b.thumbUrl) && <img alt="example" src={b.response || b.thumbUrl} />
                      )}
                      {FILE_VIDEO_FORMATS.includes(b.type) && (
                        <video src={b.response || b.thumbUrl} controls controlsList="noremoteplayback noplaybackrate nocaptions nodownload" disablePictureInPicture />
                      )}
                      {(!FILE_AUDIO_FORMATS.includes(b.type)
                        && !FILE_IMG_FORMATS.includes(b.type)
                        && !FILE_VIDEO_FORMATS.includes(b.type))
                        && (<ICON_FILE style={{ width: '100%', height: '100%' }} />)}
                    </Col>
                  </Row>
                  <Row align="middle" justify="center" className="upload-action">
                    <Col>
                      <Space>
                        {b.status !== 'error' && <EyeOutlined onClick={d.preview} />}
                        <DeleteOutlined
                          onClick={() => {
                            d.remove()
                            clearErrors([name])
                            onChange('')
                          }}
                        />
                      </Space>
                    </Col>
                  </Row>
                </>
              )}
            </WrapperContent>
          )
        }}
        {...rest}
      >
        {files.length > 0 ? null : uploadButton}
      </Upload>
      {previewVisible && (
        <Modal
          visible
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
          className="preview-modal"
        >
          {FILE_AUDIO_FORMATS.includes(previewType) && (
            <audio src={previewResponse} controls style={{ width: '100%' }} controlsList="nofullscreen noremoteplayback noplaybackrate nocaptions nodownload" />
          )}
          {((FILE_IMG_FORMATS.includes(previewType)) && !FILE_FORMATS_TEXT.includes(previewType)) && (
            <img alt="example" style={{ width: '100%', height: '100%' }} src={previewResponse} />
          )}
          {FILE_VIDEO_FORMATS.includes(previewType) && (
            <video src={previewResponse} controls style={{ width: '100%' }} controlsList="noremoteplayback noplaybackrate nocaptions nodownload" disablePictureInPicture />
          )}
          {FILE_FORMATS_TEXT.includes(previewType) && (
            <div>
              <a href onClick={() => window.open(`${files?.[0]?.url || files?.[0]?.response}`)}><DownloadOutlined />&nbsp;{previewTitle}</a>
            </div>
          )}
        </Modal>
      )}
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
