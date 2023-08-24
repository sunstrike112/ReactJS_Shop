/* eslint-disable react/prop-types */
import { SearchOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Col, Comment, Row, Select, Spin } from 'antd'
import React, { useEffect, useMemo, useState, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { checkOverSizeAPI, deleteTalkBoardCommentFileAPI } from '../../../../../apis'
import { EMPTY_TALK, SHOW_MORE_ICON_V2, SHOW_LESS_ICON_V2 } from '../../../../../assets'
import { FormInput, FormTextArea, FormUploadFile, Image, Modal, SubmitButton, TextNormal } from '../../../../../components'
import { TALK_BOARD_SORT } from '../../../../../constants'
import { useCommentsList, useLoadingPortal } from '../../../../../hooks'
import CommentList from '../CommentList'
import { HeaderCommentWrapper } from '../CommentList/styled'
import Schema from './schema'
import { EditorWrapper, EmptyCommentWrapper, WrapperSpin } from './styled'

const { Option } = Select

const DEFAULT_VALUE = {
  content: '',
  files: []
}

const Editor = ({ t, talkBoardId, commentEdit, setCommentEdit }) => {
  const [visibleErrorSize, setVisibleErrorSize] = useState(false)
  const { createCommentAction, updateCommentAction, getCommentsListAction, filter } = useCommentsList()
  const { loadingPortalRequestAction, loadingPortalStopAction } = useLoadingPortal()

  const commentRef = useRef()

  const form = useForm({
    defaultValues: DEFAULT_VALUE,
    resolver: yupResolver(Schema(t))
  })
  const { handleSubmit, reset, setValue, formState: { errors }, clearErrors } = form

  const onSubmit = async (formData) => {
    loadingPortalRequestAction()
    const { files } = formData

    // Handle for case edit comment
    if (Object.keys(commentEdit).length) {
      const filesInit = commentEdit.files
      const filesDelete = filesInit.filter((fileInit) => files.findIndex((file) => fileInit.id === file.id) === -1)
      const filesUpload = files.filter((file) => filesInit.findIndex((fileInit) => fileInit.id === file.id) === -1)

      const totalSize = filesUpload.reduce((total, file) => total + file.size, 0)
      const response = await checkOverSizeAPI({ totalSize })
      const isOverSize = response.data
      if (isOverSize) {
        setVisibleErrorSize(true)
      } else {
        if (filesDelete.length) {
          await deleteTalkBoardCommentFileAPI({ data: { ids: filesDelete.map((file) => file.id) } })
        }
        updateCommentAction({
          talkBoardId,
          commentId: commentEdit.id,
          data: { content: formData.content },
          files: filesUpload,
          callback: () => {
            reset(DEFAULT_VALUE)
            loadingPortalStopAction()
            setCommentEdit({})
            getCommentsListAction({
              talkBoardId,
              params: {
                page: 1,
                limit: 20,
                filter
              }
            })
          }
        })
      }
    } else {
      // Handle for case create comment
      const totalSize = files.reduce((total, file) => total + file.size, 0)
      const response = await checkOverSizeAPI({ totalSize })
      const isOverSize = response.data
      if (isOverSize) {
        setVisibleErrorSize(true)
      } else {
        createCommentAction({
          talkBoardId,
          data: { content: formData.content },
          files,
          callback: () => {
            reset(DEFAULT_VALUE)
            loadingPortalStopAction()
            getCommentsListAction({
              talkBoardId,
              params: {
                page: 1,
                limit: 20
              }
            })
          }
        })
      }
    }
  }

  const setInitComment = () => {
    setValue('content', commentEdit.content || '')
    setValue('files', commentEdit.files
      ? commentEdit.files.map((item) => ({
        ...item,
        id: item.id,
        name: item.fileName,
        size: +item.fileSize,
        type: item.fileType,
        uid: item.id,
        urlS3: item.link
      }))
      : [])
  }

  const isEditComment = useMemo(() => Object.keys(commentEdit).length > 0, [commentEdit])

  useEffect(() => {
    setInitComment()
    commentRef.current.focus()

    clearErrors()
  }, [commentEdit])

  return (
    <EditorWrapper>
      <FormProvider {...form}>
        <FormTextArea
          ref={commentRef}
          t={t}
          name="content"
          className="area-text"
          rows={4}
          isRequired
          total={4000}
        />
        <Row style={{ marginTop: '35px' }}>
          <Col span={16}>
            <FormUploadFile name="files" />
          </Col>
          <Col span={8}>
            <div className="button__box">
              <SubmitButton
                title={<span>{t(isEditComment ? 'common.save' : 'talk_board.post')}</span>}
                borderRadius={6}
                onClick={handleSubmit(onSubmit)}
                disabled={Object.keys(errors).length}
              />
            </div>
          </Col>
        </Row>
      </FormProvider>
      <Modal
        isModalVisible={visibleErrorSize}
        setIsModalVisible={setVisibleErrorSize}
        isCancel={false}
        description="Files are oversize"
        okText={t('common.ok')}
        borderRadiusButton={6}
      />
    </EditorWrapper>
  )
}

const CommentEditor = ({ listComments, talkBoardId }) => {
  const { t } = useTranslation()
  const { getCommentsListAction, filter, isLoading } = useCommentsList()
  const form = useForm()
  const { handleSubmit } = form
  const [isFocus, setIsFocus] = useState(false)
  const [commentEdit, setCommentEdit] = useState({})

  const onSearch = (formData) => {
    const { content } = formData
    getCommentsListAction({
      talkBoardId,
      params: {
        page: 1,
        limit: 20,
        filter: {
          ...filter,
          content: content.trim()
        }
      }
    })
  }

  const handleSelectSortComment = (sortType) => {
    getCommentsListAction({
      talkBoardId,
      params: {
        page: 1,
        limit: 20,
        filter: {
          ...filter,
          sortType
        }
      }
    })
  }

  const EmptyComment = () => (
    <EmptyCommentWrapper>
      <Image src={EMPTY_TALK} alt="empty-talk" />
      <TextNormal>{t('talk_board.no_option')}</TextNormal>
    </EmptyCommentWrapper>
  )

  const HeaderCommentList = () => (
    <HeaderCommentWrapper>
      <div className="form-search">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSearch)}>
            <FormInput
              t={t}
              prefix={<SearchOutlined onClick={handleSubmit(onSearch)} />}
              name="content"
              placeholder={t('talk_board.search_comment_placeholder')}
            />
          </form>
        </FormProvider>
      </div>
    </HeaderCommentWrapper>
  )

  return (
    <>
      <Comment
        content={(
          <Editor
            onSubmit={handleSubmit}
            t={t}
            commentEdit={commentEdit}
            setCommentEdit={setCommentEdit}
            talkBoardId={talkBoardId}
          />
        )}
      />
      <div id="header-wrapper">
        <Select
          suffixIcon={<Image src={isFocus ? SHOW_LESS_ICON_V2 : SHOW_MORE_ICON_V2} />}
          defaultValue={TALK_BOARD_SORT[0].value}
          onClick={() => setIsFocus(!isFocus)}
          onBlur={() => setIsFocus(false)}
          onSelect={handleSelectSortComment}
          id="editComment"
          getPopupContainer={() => document.getElementById('header-wrapper')}
        >
          {TALK_BOARD_SORT.map((option) => (
            <Option
              key={option.key}
              value={option.value}
            >
              {t(`talk_board.${option.label}`)}
            </Option>
          ))}
        </Select>
        <HeaderCommentList />
      </div>
      { isLoading ? (
        <WrapperSpin>
          <Spin />
        </WrapperSpin>
      ) : (listComments && listComments.length > 0
        ? <CommentList comments={listComments} setCommentEdit={setCommentEdit} />
        : <EmptyComment />
      )}
    </>
  )
}

export default CommentEditor
