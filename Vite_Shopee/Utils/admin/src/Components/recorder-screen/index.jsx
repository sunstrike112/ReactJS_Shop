/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react'
import { VideoCameraAddOutlined, GatewayOutlined, SaveOutlined, ClearOutlined } from '@ant-design/icons'
import { Prompt, Link } from 'react-router-dom'
import { Button, Spin } from 'antd'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ModalComponent from 'Components/modal'
import { useGetQuery, useMyCompany } from 'Hooks'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { checkTypeOf } from 'Utils'
import Input from '../input'
import { recordingSchema } from './schema'
import { useMediaRecorder, useRecording } from '../../Hooks/recording'
import LiveStreamPreview from './liveStreamPreview'
import Player from './player'

const Content = styled.div`
  width: 100%;
  height: 75%;
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const RecorderScreen = () => {
  const { t } = useTranslation(['recording'])
  const { queryWorkspaceID } = useGetQuery()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: {
      videoName: ''
    },
    resolver: yupResolver(recordingSchema)
  })

  const [existCamera, setExistCamera] = useState(false)
  const [modalUpload, setModalUpload] = useState(false)
  const { companyInfo } = useMyCompany()

  const {
    uploadRecord,
    isUploadSuccess,
    getFolderId,
    parentFolderId,
    isLoading,
    checkExistFileName,
    isExistFileName
  } = useRecording()

  const {
    status,
    webcam,
    stopRecording,
    startRecording,
    clearMediaStream,
    checkExistCamera,
    currentTime,
    isStartRecording,
    mediaFile,
    onClear
  } = useMediaRecorder({
    mediaStreamConstraints: { video: true }
  })

  const [videoName] = watch(['videoName'])

  useEffect(() => clearMediaStream, [])

  const handleCancel = () => {
    onClear()
    setValue('videoName', '')
  }

  useEffect(() => {
    if (isUploadSuccess) {
      handleCancel()
    }
  }, [isUploadSuccess])

  useEffect(() => {
    if (videoName) {
      checkExistFileName({
        folderId: parentFolderId,
        filename: `${videoName.trim()}.mp4`.trim()
      })
    }
  }, [videoName, parentFolderId])

  useEffect(() => {
    getFolderId()
  }, [])

  useEffect(() => {
    if (checkExistCamera) {
      checkExistCamera().then((isCamera) => setExistCamera(isCamera))
    }
  }, [checkExistCamera])

  const isExceedPackage = useMemo(() => checkTypeOf(companyInfo.memory) === 'Number'
	&& checkTypeOf(companyInfo.memoryUsed) === 'Number'
	&& companyInfo.memoryUsed >= companyInfo.memory,
  [companyInfo.memory, companyInfo.memoryUsed])

  const onSubmit = (data) => {
    if (isExceedPackage) {
      setModalUpload(true)
    } else {
      uploadRecord({
        mediaBlob: mediaFile,
        parentFolderId,
        fileName: data.videoName.trim()
      })
    }
  }

  const isShowLeave = useMemo(() => status !== 'idle' || isLoading,
    [status, isLoading])

  const disabledSubmit = useMemo(() => !!errors.videoName || isExistFileName || !videoName,
    [errors.videoName, isExistFileName, videoName])

  if (isLoading) {
    return (
      <div style={{ width: '100%', height: 'calc(100vh - 130px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin
          size="large"
          tip="Uploading..."
        />
        <Prompt
          when={isShowLeave}
          message={t('leave_confirm')}
        />
      </div>
    )
  }
  return (
    <>
      {existCamera && !isStartRecording && status !== 'idle' && (
        <LiveStreamPreview
          webcamStream={webcam}
          t={t}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Content>
          {isUploadSuccess
            && (
              <div>
                <span style={{ fontSize: 18 }}>
                  {t('upload_success1')}
                </span>
                <Link to={`/course-management/upload-file?folderId=${parentFolderId}${queryWorkspaceID.CONNECT}`}>
                  <span style={{ fontSize: 18, textDecoration: 'underline' }}>
                    {t('upload_success2')}
                  </span>
                </Link>
              </div>
            )}
          {status !== 'recording' && !isStartRecording && <p style={{ fontSize: 18, marginTop: 56 }}>{t('start_msg')}</p>}
          {status === 'recording' && <p style={{ fontSize: 48, marginTop: 56 }}>{t('title')}</p>}
          {isStartRecording && currentTime > 0 && <p style={{ fontSize: 48, fontWeight: 'bold', marginTop: 56 }}>{currentTime}</p>}
          {!!mediaFile && (
            <Player
              style={{
                display: 'flex', width: 'calc((100vw - 120px)/2)'
              }}
              srcBlob={mediaFile}
              controls
            />
          )}

          {!isStartRecording && !!mediaFile && (
            <div style={{ width: 'calc((100vw - 120px)/2)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', width: '100%', marginTop: 32 }}>
                <p style={{ margin: 0, fontSize: 18, marginRight: 16, marginTop: 8 }}>{t('video_name')}</p>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Input
                    {...register('videoName')}
                    maxLength={100}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: 8 }}>
                    {!!errors.videoName && <p style={{ color: 'red' }}>{t(errors.videoName.message)}</p>}
                    {(!!videoName && isExistFileName) && <p style={{ color: 'red' }}>{t('exist_file_name')}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Content>
        <div style={{ width: '100%', justifyContent: 'center', display: 'flex', marginTop: 32 }}>
          {status === 'idle' && (
            <Button
              type="primary"
              onClick={startRecording}
              disabled={isStartRecording}
              icon={<VideoCameraAddOutlined />}
            >
              <span>
                {t('start')}
              </span>
            </Button>
          )}
          {status === 'stopped' && (
            <Button
              type="primary"
              onClick={handleCancel}
              icon={<ClearOutlined />}
            >
              <span>
                {t('cancel')}
              </span>
            </Button>
          )}
          {status === 'recording' && (
            <Button
              type="primary"
              onClick={stopRecording}
              icon={<GatewayOutlined />}
            >
              <span>
                {t('stop')}
              </span>
            </Button>
          )}
          {!isStartRecording && status === 'stopped' && (
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: 32 }}
              disabled={disabledSubmit}
              icon={<SaveOutlined />}
            >
              <span>{t('save')}</span>
            </Button>
          )}
          {modalUpload && (
            <ModalComponent
              visible={modalUpload}
              onCancel={() => setModalUpload(false)}
              onSubmit={() => setModalUpload(false)}
              title={t('error_message:validation.tile_upgrade')}
              onSubmitText={t('common:offModal')}
              type="error"
              cancel={false}
            >
              <b>{t('error_message:validation.max_file_upload_line1')}</b>
              <br />
              <b>{t('error_message:validation.max_file_upload_line2')}</b>
            </ModalComponent>
          )}
        </div>
      </form>
      <Prompt
        when={isShowLeave}
        message={t('leave_confirm')}
      />
    </>
  )
}

export default RecorderScreen
