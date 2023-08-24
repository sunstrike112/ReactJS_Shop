import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { notification } from 'antd'
import {
  AVATAR_DEFAULT,
  PENCIL_ICON,
  REMOVE_ICON
} from '../../../../assets'
import {
  Image,
  TextPrimary,
  TextSecondary,
  TextNormal,
  Uploader,
  ClickAble,
  Modal
} from '../../../../components'
import { useProfile } from '../../../../hooks'
import ProfileForm from '../profileForm'
import {
  ContentImage,
  ContentInfo,
  EditBody,
  EditHeader,
  EditWrapper,
  Avatar
} from './styled'

import { checkUploadSize, getFileFromS3, MAX_IMAGE_UPLOAD_SIZE } from '../../../../utils'

const FILE_FORMATS = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']

const ProfileEdit = () => {
  const { t } = useTranslation()

  const {
    updateAvatar,
    profile,
    isDeletedAvatar,
    isUpdatedAvatar
  } = useProfile()

  const [avatar, setAvatar] = useState(null)
  const [fileUpload, setFileUpload] = useState(null)
  const [isFileValid, setIsFileValid] = useState(true)
  const [isCorrectType, setIsCorrectType] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const uploadFile = async (file) => {
    setFileUpload(file)

    if (checkUploadSize(file) && FILE_FORMATS.includes(file.type)) {
      setIsFileValid(true)
      const reader = new FileReader()
      reader.readAsDataURL(file)
    } else if (!(FILE_FORMATS.includes(file.type))) {
      setIsCorrectType(false)
    } else {
      setIsFileValid(false)
    }
  }

  const handleOk = () => {
    updateAvatar({
      imageAvatar: getFileFromS3(profile.avatar),
      userId: profile.userId,
      isDelete: true
    })
    setFileUpload(null)
    setIsFileValid(true)
  }

  useEffect(() => {
    if (fileUpload && isFileValid && isCorrectType) {
      const fileName = fileUpload.name.split('.')
      updateAvatar({
        userId: profile.userId,
        fileName: fileName[0],
        fileType: fileName[fileName.length - 1],
        file: fileUpload,
        type: fileUpload.type,
        isDelete: false
      })
      setFileUpload(null)
      setIsFileValid(true)
    }
  }, [fileUpload, isFileValid, isCorrectType])

  useEffect(() => {
    setAvatar(profile.avatar)
  }, [profile])

  useEffect(() => {
    if (isUpdatedAvatar) {
      notification.success({
        description: t('profile.edit.upload_image_success'),
        duration: 3
      })
    }
    if (isDeletedAvatar) {
      notification.success({
        description: t('profile.edit.remove_image_success'),
        duration: 3
      })
    }
  }, [isDeletedAvatar, isUpdatedAvatar])

  return (
    <EditWrapper>
      <EditHeader>
        <TextPrimary fontSize="size_24" fontWeight="fw_600">
          {t('profile.home.profile')}
        </TextPrimary>
      </EditHeader>
      <EditBody>
        <TextPrimary fontSize="size_14" fontWeight="fw_600">
          {t('profile.edit.image')}
        </TextPrimary>
        <ContentImage>
          <Avatar isEmpty={!!profile.avatar}>
            <Uploader
              onSelectFile={uploadFile}
            >
              <Image
                className="avatar"
                src={getFileFromS3(avatar)}
                alt="avatar"
                srcDefault={AVATAR_DEFAULT}
              />
              <div className="upload-avatar">
                {avatar
                  ? (
                    <Image
                      src={PENCIL_ICON}
                      alt="avatar"
                    />
                  ) : (
                    <TextNormal fontSize="size_24" fontWeight="bold" color="green">
                      +
                    </TextNormal>
                  )}
              </div>
            </Uploader>
            <ClickAble
              className="remove"
              onClick={() => setIsOpenModal(!!profile.avatar)}
            >
              <Image
                src={REMOVE_ICON}
                alt="avatar"
              />
            </ClickAble>
          </Avatar>
          <div>
            <TextSecondary
              className="require"
              fontSize="size_12"
              fontWeight="fw_400"
            >
              {t('profile.edit.require_image')}
            </TextSecondary>

          </div>
        </ContentImage>
        {(!isFileValid && !!fileUpload)
        && (
        <TextNormal color="error">
          {t(
            'profile.edit.avatar_validation',
            {
              fileName: fileUpload.name,
              fileSize: fileUpload.size,
              maxSize: MAX_IMAGE_UPLOAD_SIZE
            }
          )}
        </TextNormal>
        )}
        {(!isCorrectType && !!fileUpload) && (
        <TextNormal color="error">
          {t(
            'profile.edit.avatar_incorrect',
            {
              fileName: fileUpload?.name
            }
          )}
        </TextNormal>
        )}
        <ContentInfo>
          <ProfileForm />
        </ContentInfo>
        <Modal
          isModalVisible={isOpenModal}
          setIsModalVisible={setIsOpenModal}
          onOk={handleOk}
          description={t('profile.edit.confirm_remove_avatar')}
          cancelText={t('common.no')}
          okText={t('common.yes')}
        />
      </EditBody>
    </EditWrapper>
  )
}

export default ProfileEdit
