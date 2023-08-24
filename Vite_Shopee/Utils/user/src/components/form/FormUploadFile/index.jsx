/* eslint-disable react/prop-types */
import { DeleteOutlined, PaperClipOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Popover, Upload } from 'antd'
import axios from 'axios'
import React, { useCallback, useEffect, useState, useRef, useMemo, memo } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { getS3PresignedUrl } from '../../../apis'
import { ICON_WARNING } from '../../../assets'
import { ACCEPT_FILE_EXTENSION_TB, ACCEPT_TYPE_FILE_TB, MAX_FILES_TB } from '../../../constants'
import Modal from '../../modal'
import { TextNormal } from '../../text'
import { File, WrapperFormItem, WrapperLabel } from './styled'

const propsUpload = {
  maxCount: 5,
  multiple: false,
  accept: ACCEPT_TYPE_FILE_TB.join()
}

const SIZE_ICON_WARNING = 20

const INFO_UPLOAD = 'talk_board.suggest_upload'

const ERROR = {
  INVALID_FILE: 'Invalid file',
  EXCEED_LIMIT: 'Exceed limit'
}

const checkFileExtension = (fileName) => {
  const splitFiles = fileName.split('.')
  if (!ACCEPT_FILE_EXTENSION_TB.includes(splitFiles[splitFiles.length - 1])) return false
  return true
}

const FormUploadFile = ({ label, name, rules, defaultValue = '', wrapperProps, size = 20, infoUpload = INFO_UPLOAD, handleSetValue, ...rest }) => {
  const { t } = useTranslation()
  const { control, setValue, clearErrors, setError } = useFormContext()
  const { field: { value }, fieldState: { error } } = useController({ name, control, rules, defaultValue })

  const [fileList, setFileList] = useState([])
  const [visibleModalRemove, setVisibleModalRemove] = useState(false)
  const [visibleModalMaxFile, setVisibleModalMaxFile] = useState(false)
  const [removePromise, setRemovePromise] = useState()

  const refButton = useRef()

  const positionLeftIcon = (refButton.current?.offsetWidth || 0) + 15 // 15 is margin

  const positionTopIcon = useMemo(() => (refButton.current
    ? refButton.current.offsetHeight / 2 - SIZE_ICON_WARNING / 2
    : 0), [refButton.current])

  const filesError = useMemo(() => fileList.filter((file) => file.error), [fileList])

  useEffect(() => {
    if (handleSetValue) {
      handleSetValue()
    }
  }, [])

  useEffect(() => {
    // Reset fileList by value
    if (!value.length) {
      setFileList([])
    }
  }, [value])

  // Reset error for match language when change language
  useEffect(() => {
    if (filesError.length && filesError[filesError.length - 1].error === ERROR.INVALID_FILE) {
      setError(name, {
        type: 'invalidFile',
        message: t('talk_board.upload_wrong_type', { fileName: filesError[filesError.length - 1].name })
      })
    }
  }, [t])

  const renderList = useMemo(() => (fileList.length
    ? fileList
    : value.length
      ? value.map((file) => ({
        name: file.fileName,
        size: +file.fileSize,
        type: file.fileType,
        uid: file.id,
        urlS3: file.link
      }))
      : []
  ), [fileList, value])

  const setValueFile = (values) => setValue(name, values)

  const handleChange = (options) => {
    const { fileList: files } = options
    setFileList(files)
  }

  const handleUpload = async (options) => {
    const { file, onSuccess, onError } = options

    const isValidExtension = checkFileExtension(file.name)
    const extention = (file.name.split('.'))[(file.name.split('.')).length - 1]
    const files = [{ fileName: file.name, fileType: extention }]
    const config = {
      headers: { 'content-type': file.type }
    }

    if (!ACCEPT_TYPE_FILE_TB.includes(file.type) || !isValidExtension) {
      onError(ERROR.INVALID_FILE)
      setError(name, {
        type: ERROR.INVALID_FILE,
        message: t('talk_board.upload_wrong_type', { fileName: file.name })
      })
    } else if (file.size / 1024 > size * 1024) {
      onError(ERROR.EXCEED_LIMIT)
      setError(name, {
        type: ERROR.EXCEED_LIMIT,
        message: error?.message || '' // Get message error of file invalid file, because file exceed-limit not show error in form
      })
    } else {
      const response = await getS3PresignedUrl({ fileList: files })
      const { data, code } = response
      axios.put(data[0].preSignedURL, file, config)
      if (code === 200) {
        onSuccess()
        setValueFile((value || []).concat([{
          urlS3: data[0].url,
          uid: file.uid,
          name: file.name,
          size: file.size,
          type: file.type }]))
      } else {
        onError()
      }
    }
  }

  const handleRemove = useCallback((file) => {
    if (file.error) {
      clearErrors(name)
      const newFilesError = filesError.filter((f) => f.uid !== file.uid)
      if (newFilesError.length) {
        const filesInvalidType = newFilesError.filter((f) => f.error === ERROR.INVALID_FILE)
        // Continue setError if files still have file error, because list error not have type is []
        if (filesInvalidType.length) {
          setError(name, {
            type: ERROR.INVALID_FILE,
            message: t('talk_board.upload_wrong_type', { fileName: filesInvalidType[filesInvalidType.length - 1].name })
          })
        } else {
          setError(name, {
            type: ERROR.EXCEED_LIMIT
          })
        }
      }
      return true // Skip confirm remove with file error
    }

    const { uid } = file
    setVisibleModalRemove(true)
    return new Promise((resolve, reject) => {
      setRemovePromise({ resolve, reject, uid })
    })
  }, [filesError])

  // Handle for modal
  const handleOkModalRemove = useCallback(() => {
    if (removePromise && removePromise.resolve) {
      const newListS3 = [...value]
      const index = newListS3.findIndex((item) => item.uid === removePromise.uid)
      if (index !== -1) {
        newListS3.splice(index, 1)
        setValueFile(newListS3)
      }
      removePromise.resolve(true)
    }
  }, [removePromise, value])

  const handleCancelModalRemove = useCallback(() => {
    if (removePromise && removePromise.resolve) {
      removePromise.resolve(false)
    }
  }, [removePromise])

  const handleBeforeUpload = () => {
    if (fileList.length === MAX_FILES_TB || value.length === MAX_FILES_TB) {
      setVisibleModalMaxFile(true)
      return Upload.LIST_IGNORE
    }
    return true
  }

  return (
    <>
      <WrapperFormItem
        {...wrapperProps}
        label={label && <WrapperLabel>{label}</WrapperLabel>}
        validateStatus={error ? 'error' : ''}
        positionlefticon={positionLeftIcon}
        positiontopicon={positionTopIcon}
      >
        <Upload
          className="upload__form"
          fileList={renderList}
          onChange={handleChange}
          customRequest={handleUpload}
          onRemove={handleRemove}
          beforeUpload={handleBeforeUpload}
          showUploadList={{ showRemoveIcon: true }}
          itemRender={(_, file, files, { remove }) => (
            <File error={file.error}>
              <div className="content">
                <PaperClipOutlined />
                <TextNormal
                  className="content__name"
                  color={file.error ? 'text_error' : 'text_thirsdary'}
                  fontWeight="fw_500"
                >
                  {file.name}
                </TextNormal>
                <DeleteOutlined onClick={remove} />
              </div>
              {file.error && file.error !== 'Invalid file' && (
                <TextNormal color="text_error">{t('talk_board.upload_failed')}</TextNormal>
              )}
            </File>
          )}
          {...propsUpload}
          {...rest}
        >
          <Button ref={refButton} icon={<UploadOutlined />}>{t('talk_board.add_file')}</Button>
          {error && error.message && <TextNormal onClick={(e) => e.stopPropagation()} className="upload__error" color="text_error">{error.message}</TextNormal>}
        </Upload>
        {infoUpload && (
          <Popover content={t(infoUpload)} className="upload__info">
            <ICON_WARNING />
          </Popover>
        )}
      </WrapperFormItem>

      {/* Modal confirm remove */}
      <Modal
        isModalVisible={visibleModalRemove}
        onOk={handleOkModalRemove}
        onCancel={handleCancelModalRemove}
        setIsModalVisible={setVisibleModalRemove}
        description={t('talk_board.confirm_delete_file')}
        okText={t('common.yes')}
        cancelText={t('common.cancel')}
        borderRadiusButton={6}
      />

      {/* Modal warning maxFile */}
      <Modal
        isModalVisible={visibleModalMaxFile}
        setIsModalVisible={setVisibleModalMaxFile}
        isCancel={false}
        description={t('talk_board.warning_file_size')}
        okText={t('common.yes')}
        borderRadiusButton={6}
      />
    </>

  )
}

export default memo(FormUploadFile)
