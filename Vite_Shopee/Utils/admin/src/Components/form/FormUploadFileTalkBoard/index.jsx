/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { ClearOutlined, DeleteOutlined, PaperClipOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Popover, Upload } from 'antd'
import { getS3PresinedUrl } from 'APIs'
import { ICON_WARNING } from 'Assets'
import axios from 'axios'
import { ModalNonForm, Text } from 'Components'
import { ACCEPT_FILE_EXTENSION_TB, ACCEPT_TYPE_FILE_TB, MAX_FILES_TB } from 'Constants'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { File, WrapperFormItem, WrapperLabel } from './styled'

const propsUpload = {
  maxCount: 5,
  multiple: false,
  accept: ACCEPT_TYPE_FILE_TB.join()
}

const SIZE_ICON_WARNING = 20

const INFO_UPLOAD = 'upload_file:talk_board.suggest_upload'

const ERROR = {
  INVALID_FILE: 'Invalid file',
  EXCEED_LIMIT: 'Exceed limit'
}

const checkFileExtension = (fileName) => {
  const splitFiles = fileName.split('.')
  if (!ACCEPT_FILE_EXTENSION_TB.includes(splitFiles[splitFiles.length - 1])) return false
  return true
}

const FormUploadFileTalkBoard = ({ label, name, rules, defaultValue = '', wrapperProps, size = 20, infoUpload = INFO_UPLOAD, handleSetValue, ...rest }) => {
  const [t] = useTranslation()
  const { control, setValue, clearErrors, setError } = useFormContext()
  const { field: { value }, fieldState: { error } } = useController({ name, control, rules, defaultValue })

  const [fileList, setFileList] = useState([])
  const [visibleModalRemove, setVisibleModalRemove] = useState(false)
  const [visibleModalMaxFile, setVisibleModalMaxFile] = useState(false)
  const [removePromise, setRemovePromise] = useState()

  const refButton = useRef()

  const positionLeftIcon = refButton.current?.offsetWidth + 15 // 15 is margin

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
        message: t('upload_file:talk_board.upload_wrong_type', { fileName: filesError[filesError.length - 1].name })
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

    const extention = (file.name.split('.'))[(file.name.split('.')).length - 1]
    const isValidExtension = checkFileExtension(file.name)

    const files = [{ fileName: file.name, fileType: extention }]
    const config = {
      headers: { 'content-type': file.type }
    }

    if (!ACCEPT_TYPE_FILE_TB.includes(file.type) || !isValidExtension) {
      onError(ERROR.INVALID_FILE)
      setError(name, {
        type: ERROR.INVALID_FILE,
        message: t('upload_file:talk_board.upload_wrong_type', { fileName: file.name })
      })
    } else if (file.size / 1024 > size * 1024) {
      onError(ERROR.EXCEED_LIMIT)
      setError(name, {
        type: ERROR.EXCEED_LIMIT,
        message: error?.message || '' // Get message error of file invalid file, because file exceed-limit not show error in form
      })
    } else {
      const response = await getS3PresinedUrl({ fileList: files })
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
            message: t('upload_file:talk_board.upload_wrong_type', { fileName: filesInvalidType[filesInvalidType.length - 1].name })
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
      setVisibleModalRemove(false)
    }
  }, [removePromise, value])

  const handleCancelModalRemove = useCallback(() => {
    if (removePromise && removePromise.resolve) {
      removePromise.resolve(false)
      setVisibleModalRemove(false)
    }
  }, [removePromise])

  const handleBeforeUpload = () => {
    const isMaxSize = fileList.length === MAX_FILES_TB || value.length === MAX_FILES_TB
    if (isMaxSize) {
      setVisibleModalMaxFile(true)
      return Upload.LIST_IGNORE
    }
    return true
  }

  const handleCancelWarning = () => setVisibleModalMaxFile(false)

  return (
    <>
      <WrapperFormItem
        {...wrapperProps}
        label={label && <WrapperLabel>{label}</WrapperLabel>}
        validateStatus={error ? 'error' : ''}
        positionLeftIcon={positionLeftIcon}
        positionTopIcon={positionTopIcon}
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
                <div className="content__file">
                  <PaperClipOutlined />
                  <Text.primary
                    className="content__file--text"
                    color={file.error ? 'error_ant' : 'text_thirsdary'}
                    fontSize="size_14"
                  >
                    {file.name}
                  </Text.primary>
                </div>
                <DeleteOutlined onClick={remove} />
              </div>
              {file.error && file.error !== 'Invalid file' && (
                <Text.primary fontSize="size_14" color="error_ant">
                  {t('upload_file:talk_board.upload_failed')}
                </Text.primary>
              )}
            </File>
          )}
          {...propsUpload}
          {...rest}
        >
          <Button ref={refButton} icon={<UploadOutlined />}>{t('upload_file:talk_board.add_file')}</Button>
          {error && error.message && (
          <Text.primary
            fontSize="size_14"
            onClick={(e) => e.stopPropagation()}
            className="upload__error"
            color="error_ant"
          >
            {error.message}
          </Text.primary>
          )}
        </Upload>
        {infoUpload && (
          <Popover content={t(infoUpload)} className="upload__info">
            <ICON_WARNING />
          </Popover>
        )}
      </WrapperFormItem>

      {/* Modal confirm remove */}
      <ModalNonForm
        size="small"
        title={t('common:delete_file')}
        titleIcon
        visible={visibleModalRemove}
        onSubmit={handleOkModalRemove}
        onCancel={handleCancelModalRemove}
        onSubmitText={t('common:agree')}
        onCancelText={t('common:cancel')}
      >
        <Text.primary
          fontSize="size_16"
          style={{ textAlign: 'center' }}
        >
          {t('upload_file:talk_board.confirm_delete_file')}
        </Text.primary>
      </ModalNonForm>

      {/* Modal warning maxFile */}
      <ModalNonForm
        size="small"
        visible={visibleModalMaxFile}
        cancel={false}
        onSubmit={handleCancelWarning}
        onCancel={handleCancelWarning}
        onSubmitText={t('common:agree')}
      >
        <Text.primary
          fontSize="size_16"
          style={{ textAlign: 'center' }}
        >
          {t('upload_file:talk_board.warning_file_size')}
        </Text.primary>
      </ModalNonForm>
    </>

  )
}

export default FormUploadFileTalkBoard
