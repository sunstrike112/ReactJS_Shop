/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { PaperClipOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Image, List, Menu, Tooltip } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ICON_DELETE, ICON_DETAIL, ICON_EDIT_TALK_BOARD, ICON_PROFILE, ICON_READ_COMMENT, SHOWLESS_ICON, SHOWMORE_ICON } from '../../../../../assets'
import { Dislike, Like, ModalUsersActive, TextNormal, TextPrimary } from '../../../../../components'
import { DisplayHyperLink } from '../../../../../components/text'
import { FONT_SIZE_COMMENT_TALKBOARD, LINE_HEIGHT_TOPIC_TALKBOARD, TAB_KEYS, TYPE_IMG } from '../../../../../constants'
import { useCommentsList, useProfile } from '../../../../../hooks'
import { dateFormat, downloadS3File, getFileFromS3, htmlParseHyperLink } from '../../../../../utils'
import { BoxRead, CommentWrapper, ContentGroup } from './styled'

const renderMedia = (files, index) => {
  if (TYPE_IMG.includes(files.fileType)) {
    return (
      <Image src={getFileFromS3(files.link)} alt="img-cmt" key={index} />
    )
  }
  return (
    <Tooltip placement="left" title={files.fileName}>
      <div className="file-download" key={index} id={files.id}>
        <Button onClick={() => downloadS3File({ s3Path: getFileFromS3(files.link), fileName: files.fileName, id: files.id })}>
          <PaperClipOutlined />
          <TextNormal fontWeight="fw_500">{files.fileName}</TextNormal>
        </Button>
      </div>
    </Tooltip>
  )
}

const Comment = ({
  userDTO,
  totalLike,
  totalDislike,
  isLike,
  content,
  createdAt,
  files,
  t,
  isImage,
  isDislike,
  id,
  isRead,
  item,
  setCommentEdit,
  ownerDeleted
}) => {
  const {
    isLiking,
    likeCommentAction,
    disLikeCommentAction,
    loadUserLikeCommentAction,
    loadUserDisLikeCommentAction,
    readCommentAction,
    isLoadUsersReact,
    usersLike,
    usersDislike,
    usersActive,
    isLoadingUsersActive,
    deleteTalkBoardCommentAction,
    getCommentsListAction,
    loadUsersActiveCommentAction
  } = useCommentsList()

  const { talkBoardId } = useParams()
  const { profile } = useProfile()
  const isUserComment = userDTO?.id === profile.userId

  const [visibleUsersActive, setVisibleUsersActive] = useState(false)
  const [currentTab, setCurrentTab] = useState(TAB_KEYS.LIKE)
  const [isShowMore, setIsShowMore] = useState(true)
  const [isExpand, setIsExpand] = useState(false)

  const contentRef = useRef()

  useEffect(() => {
    const condition = Math.floor((contentRef.current?.scrollHeight / FONT_SIZE_COMMENT_TALKBOARD) / LINE_HEIGHT_TOPIC_TALKBOARD) >= 4
    setIsExpand(condition)
  }, [content])

  // Action like/dislike
  const handleLike = () => likeCommentAction({ commentId: id })
  const handleDisLike = () => disLikeCommentAction({ commentId: id })

  // Action hover
  const handleHoverLike = () => loadUserLikeCommentAction({ commentId: id })
  const handleHoverDisLike = () => loadUserDisLikeCommentAction({ commentId: id })

  // render list user active in tooltip
  const renderUsersLike = useMemo(() => usersLike.map((el) => <TextNormal fontSize="size_12" color="white">{el.name}</TextNormal>), [usersLike])
  const renderUsersDislike = useMemo(() => usersDislike.map((el) => <TextNormal fontSize="size_12" color="white">{el.name}</TextNormal>), [usersDislike])

  // handle show all user active
  const handleOpenUsersActive = ({ tabActive }) => {
    setVisibleUsersActive(true)
    loadUsersActiveCommentAction({ commentId: id })
    setCurrentTab(tabActive)
  }

  const handleDeleteTalkBoardComment = () => {
    deleteTalkBoardCommentAction({
      talkBoardId,
      commentId: id,
      callback: {
        done: () => {
          getCommentsListAction({
            talkBoardId,
            params: {
              page: 1,
              limit: 20
            }
          })
          setCommentEdit({})
        }
      }
    })
  }

  const handleEditComment = () => {
    setCommentEdit({})
    const element = document.getElementById('editComment')
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => setCommentEdit(item), 0)
  }

  const onExpand = () => {
    setIsShowMore(!isShowMore)
  }

  const menuRead = (
    <Menu
      style={{ borderRadius: 4 }}
      items={[
        isUserComment && {
          key: '2',
          label: (
            <BoxRead onClick={handleEditComment}>
              <ICON_EDIT_TALK_BOARD />
              <TextNormal className="text">{t('profile.home.edit')}</TextNormal>
            </BoxRead>
          )
        },
        item.ownerDeleted !== 1 && isUserComment
        && {
          key: '3',
          label: (
            <BoxRead onClick={handleDeleteTalkBoardComment}>
              <ICON_DELETE />
              <TextNormal className="text">{t('common.delete')}</TextNormal>
            </BoxRead>
          )
        }
      ]}
    />
  )

  return (
    <CommentWrapper
      className="comment"
      isRead={isRead}
      isUserComment={isUserComment}
    >
      <div className="info-group">
        <div className="user-info">
          <Avatar size={27} src={getFileFromS3(userDTO?.imagePath) || ICON_PROFILE} alt="img-avatar" />
          <TextNormal color="grey" fontWeight="500">{userDTO?.fullName}</TextNormal>
        </div>
        <div className="time-info">
          <TextNormal fontSize="size_12" color="grey">{dateFormat(createdAt) || ''}</TextNormal>
          {
            isUserComment && ownerDeleted !== 1 && (
              <Dropdown
                placement="bottomRight"
                overlay={menuRead}
                trigger={['click']}
                getPopupContainer={() => document.getElementById('comment-wrapper')}
              >
                <ICON_DETAIL className="button-read" />
              </Dropdown>
            )
          }
          {isImage && <Image alt="img-content" />}
        </div>
      </div>
      <ContentGroup lineHeight={LINE_HEIGHT_TOPIC_TALKBOARD} isShowMore={isShowMore}>
        <TextNormal
          ref={contentRef}
          className="content-group-des"
          color="grey"
          fontSize="size_20"
        >
          <DisplayHyperLink html={content} />
        </TextNormal>
        {/* Show more/less */}
        {isExpand
          && (
          <div className="content-group-expand" aria-hidden="true" onClick={onExpand}>
            <TextPrimary fontSize="size_14" color="green">
              {t(isShowMore ? 'course_detail.show_more' : 'course_detail.show_less')}
            </TextPrimary>
            <Image preview={false} src={isShowMore ? SHOWMORE_ICON : SHOWLESS_ICON} />
          </div>
          )}
        {/* Show files */}
        <div className="list-media">
          {files && files.length > 0 && files.map((file, index) => (renderMedia(file, index)))}
        </div>
      </ContentGroup>
      {!ownerDeleted
      && (
      <div className="action-group">
        <Like
          totalLike={totalLike}
          isLiking={isLiking}
          isLike={isLike}
          onClick={handleLike}
          onHover={handleHoverLike}
          renderUsersLike={renderUsersLike}
          onOpenUsersActive={handleOpenUsersActive}
        />
        <Dislike
          totalDislike={totalDislike}
          isDisliking={isLiking}
          isDislike={isDislike}
          onClick={handleDisLike}
          onHover={handleHoverDisLike}
          renderUsersDislike={renderUsersDislike}
          onOpenUsersActive={handleOpenUsersActive}
        />
      </div>
      )}
      {isRead === 0 && !isUserComment && <div className="icon-unread" />}
      {visibleUsersActive && (
      <ModalUsersActive
        isLoadingUsersActive={isLoadingUsersActive}
        usersActive={usersActive}
        isModalVisible
        setIsModalVisible={setVisibleUsersActive}
        currentActiveTab={currentTab}
      />
      )}
    </CommentWrapper>
  )
}

const CommentList = ({
  comments,
  setCommentEdit
}) => {
  const { t } = useTranslation()
  return (
    <List
      className="list-comment"
      id="comment-wrapper"
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={(item, index) => <Comment key={item.id} t={t} setCommentEdit={setCommentEdit} item={item} {...item} />}
    />
  )
}

export default CommentList
