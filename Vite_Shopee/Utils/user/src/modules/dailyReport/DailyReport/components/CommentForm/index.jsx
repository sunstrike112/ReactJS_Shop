/* eslint-disable react/prop-types */
import { yupResolver } from '@hookform/resolvers/yup'
import { Col, Row } from 'antd'
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { checkOverSizeAPI } from '../../../../../apis'
import { FormTextArea, FormUploadFile, SubmitButton, TextPrimary } from '../../../../../components'
import Modal from '../../../../../components/modal'
import { useDailyReports } from '../../../../../hooks'
import { hasValuesInObject } from '../../../../../utils'
import { getLocalLanguage } from '../../../../../utils/storage'
import Schema from './schema'
import { StyledWrapper } from './styled'

const DEFAULT_VALUE = { content: '', reportCommentFiles: [] }

const CommentForm = ({ dailyReportId }) => {
  // Use hooks
  const { t } = useTranslation()
  const { comments: { isSubmitting, commentForEdit, filter }, createDailyReportCommentAction, editDailyReportCommentAction } = useDailyReports()
  const form = useForm({
    defaultValues: DEFAULT_VALUE,
    resolver: yupResolver(Schema(t))
  })
  const { handleSubmit, formState: { errors }, reset, clearErrors, setValue, getValues } = form
  const formValues = getValues()
  const commentRef = useRef()
  // End use hooks

  // Use states
  const [visibleErrorSize, setVisibleErrorSize] = useState(false)
  // End use states

  const hasRequestEditComment = useMemo(() => Object.keys(commentForEdit).length > 0, [commentForEdit])

  const onSubmit = async (formData) => {
    const { content, reportCommentFiles } = formData
    let isOverSize = false
    if (hasRequestEditComment) {
      const filesInit = commentForEdit.reportCommentFiles
      const filesUpload = reportCommentFiles.filter((file) => filesInit.findIndex((fileInit) => fileInit.id === file.id) === -1)

      if (filesUpload.length > 0) {
        const totalSize = filesUpload.reduce((total, file) => total + file.size, 0)
        const response = await checkOverSizeAPI({ totalSize })
        isOverSize = response.data
      }

      if (isOverSize) {
        setVisibleErrorSize(true)
      } else {
        const data = {
          langCode: getLocalLanguage(),
          content,
          reportCommentFiles: reportCommentFiles.map((file) => ({ fileName: file.name, fileSize: file.size, fileType: file.type, link: file.urlS3 })),
          reportId: dailyReportId
        }
        editDailyReportCommentAction({ data, commentId: commentForEdit.id, filter })
      }
    } else {
      if (reportCommentFiles.length > 0) {
        const totalSize = reportCommentFiles.reduce((total, file) => total + file.size, 0)
        const response = await checkOverSizeAPI({ totalSize })
        isOverSize = response.data
      }
      if (isOverSize) {
        setVisibleErrorSize(true)
      } else {
        const data = {
          langCode: getLocalLanguage(),
          content,
          reportCommentFiles: reportCommentFiles.map((file) => ({ fileName: file.name, fileSize: file.size, fileType: file.type, link: file.urlS3 })),
          reportId: dailyReportId
        }
        createDailyReportCommentAction({ data, dailyReportId })
      }
    }
  }

  const setInitComment = useCallback(() => {
    setValue('content', commentForEdit.content)
    if (commentForEdit.reportCommentFiles.length) {
      setValue('reportCommentFiles', [])
      setTimeout(() => {
        setValue('reportCommentFiles', commentForEdit.reportCommentFiles.map((item) => ({
          ...item,
          id: item.id,
          name: item.fileName,
          size: +item.fileSize,
          type: item.fileType,
          uid: item.id,
          urlS3: item.link
        })))
      }, 0)
    } else {
      setValue('reportCommentFiles', [])
    }
  }, [commentForEdit])

  useEffect(() => {
    if (!isSubmitting && hasValuesInObject(formValues)) {
      reset(DEFAULT_VALUE)
    }
  }, [isSubmitting])

  useEffect(() => {
    if (hasRequestEditComment) {
      commentRef.current.focus()
      setInitComment()
      if (errors) {
        clearErrors()
      }
    }
  }, [hasRequestEditComment, setInitComment])

  return (
    <StyledWrapper>
      <FormProvider {...form}>
        <TextPrimary fontWeight="fw_500">{t('dailyReports.enter_comment')}</TextPrimary>
        <FormTextArea
          ref={commentRef}
          t={t}
          name="content"
          rows={6}
          total={4000}
          id="formEditComment"
        />
        <Row style={{ marginTop: '35px' }}>
          <Col span={16}>
            <FormUploadFile name="reportCommentFiles" />
          </Col>
          <Col span={8}>
            <div className="button__box">
              <SubmitButton
                title={<span>{t(hasRequestEditComment ? 'common.save' : 'talk_board.post')}</span>}
                borderRadius={6}
                onClick={handleSubmit(onSubmit)}
                disabled={Object.keys(errors).length}
                loading={isSubmitting}
              />
            </div>
          </Col>
        </Row>
      </FormProvider>
      <Modal
        isModalVisible={visibleErrorSize}
        setIsModalVisible={setVisibleErrorSize}
        isCancel={false}
        description={t('talk_board.upload_exceed_limit')}
        okText={t('common.yes')}
        borderRadiusButton={6}
      />
    </StyledWrapper>

  )
}

export default memo(CommentForm)
