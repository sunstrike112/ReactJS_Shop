/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, Dropdown, Image, Menu } from 'antd'
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ICON_DELETE, ICON_DETAIL, ICON_EDIT_TALK_BOARD, ICON_PROFILE, SHOWLESS_ICON, SHOWMORE_ICON } from '../../../../../assets'
import { Dislike, Like, ModalUsersActive, TextNormal, TextPrimary } from '../../../../../components'
import FileDisplay from '../../../../../components/fileDisplay'
import { DisplayHyperLink } from '../../../../../components/text'
import { ACTIONS_INTERACTIVE, FONT_SIZE_COMMENT_TALKBOARD, LINE_HEIGHT_TOPIC_TALKBOARD, TAB_KEYS } from '../../../../../constants'
import { useDailyReports, useProfile } from '../../../../../hooks'
import { dateFormat, getFileFromS3 } from '../../../../../utils'
import { StyledContent, StyledMenu, StyledWrapper } from './styled'

const Comment = ({ comment }) => {
  // Props
  const { user, content, id, createdAt, totalLike, totalDislike, isLike, isDislike, isRead, ownerDeleted, reportCommentFiles } = comment
  // End props

  // Use hooks
  const { t } = useTranslation()
  const { profile } = useProfile()
  const {
    comments: { filter, isLiking, isDisliking, usersInteracted },
    setCommentForEditAction,
    deleteDailyReportCommentAction,
    likeDailyReportCommentAction,
    dislikeDailyReportCommentAction,
    loadUsersInteractedDailyReportCommentAction
  } = useDailyReports()
  // End use hooks

  // Use states
  const [isDisplayContentWithoutExpand, setIsDisplayContentWithoutExpand] = useState(true)
  const [isExpand, setIsExpand] = useState(false)
  const [visibleUsersActive, setVisibleUsersActive] = useState(false)
  const [currentTab, setCurrentTab] = useState(TAB_KEYS.LIKE)
  // End use states
  const isSelfComment = user?.id === profile.userId

  const contentRef = useRef()

  useEffect(() => {
    const condition = Math.floor((contentRef.current?.scrollHeight / FONT_SIZE_COMMENT_TALKBOARD) / LINE_HEIGHT_TOPIC_TALKBOARD) >= 4
    setIsExpand(condition)
  }, [content])

  // Action like/dislike
  const handleLike = () => likeDailyReportCommentAction({ commentId: id })
  const handleDisLike = () => dislikeDailyReportCommentAction({ commentId: id })

  // Action hover
  const handleHoverLike = useCallback(() => loadUsersInteractedDailyReportCommentAction({ action: ACTIONS_INTERACTIVE.LIKE, commentId: id }),
    [id])

  const handleHoverDislike = useCallback(() => loadUsersInteractedDailyReportCommentAction({ action: ACTIONS_INTERACTIVE.DISLIKE, commentId: id }),
    [id])

  // render list user active in tooltip
  const renderUsersLike = useMemo(() => usersInteracted.like.map((el) => <TextNormal fontSize="size_12" color="white">{el.fullName}</TextNormal>),
    [usersInteracted.like])
  const renderUsersDislike = useMemo(() => usersInteracted.dislike.map((el) => <TextNormal fontSize="size_12" color="white">{el.fullName}</TextNormal>),
    [usersInteracted.dislike])

  // handle show all user active
  const handleOpenUsersActive = useCallback(({ tabActive }) => {
    setVisibleUsersActive(true)
    loadUsersInteractedDailyReportCommentAction({ isLoadAll: true, commentId: id })
    setCurrentTab(tabActive)
  }, [id])

  const handleDeleteComment = () => {
    deleteDailyReportCommentAction({ commentId: id, filter })
  }

  const onExpand = () => {
    setIsDisplayContentWithoutExpand((prev) => !prev)
  }

  const handleEditComment = useCallback(() => {
    const element = document.getElementById('formEditComment')
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setCommentForEditAction({ ...comment })
  }, [comment])

  const menu = useMemo(() => {
    const items = [
      {
        key: '1',
        label: (
          <StyledMenu onClick={handleEditComment}>
            <ICON_EDIT_TALK_BOARD />
            <TextNormal className="text">{t('profile.home.edit')}</TextNormal>
          </StyledMenu>
        ),
        isShow: ownerDeleted !== 1 && isSelfComment
      },
      {
        key: '2',
        label: (
          <StyledMenu onClick={handleDeleteComment}>
            <ICON_DELETE />
            <TextNormal className="text">{t('common.delete')}</TextNormal>
          </StyledMenu>
        ),
        isShow: ownerDeleted !== 1 && isSelfComment
      }
    ].filter((m) => m.isShow)

    return {
      items,
      content: <Menu
        style={{ borderRadius: 4 }}
        items={items}
      /> }
  }, [ownerDeleted, isSelfComment, t, handleEditComment])

  return (
    <StyledWrapper
      className="comment"
      isRead={isRead}
      isSelfComment={isSelfComment}
    >
      <div className="info-group">
        <div className="user-info">
          <Avatar size={27} src={getFileFromS3(user?.imagePath) || ICON_PROFILE} alt="img-avatar" />
          <TextNormal color="grey" fontWeight="500">{user?.fullName}</TextNormal>
        </div>
        <div className="time-info">
          <TextNormal fontSize="size_12" color="grey">{dateFormat(createdAt) || ''}</TextNormal>
          {menu.items.length > 0 && (
          <Dropdown
            placement="bottomRight"
            overlay={menu.content}
            trigger={['click']}
          >
            <ICON_DETAIL className="button-read" />
          </Dropdown>
          )}
        </div>
      </div>
      <StyledContent lineHeight={LINE_HEIGHT_TOPIC_TALKBOARD} isDisplayContentWithoutExpand={isDisplayContentWithoutExpand}>
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
              {t(isDisplayContentWithoutExpand ? 'course_detail.show_more' : 'course_detail.show_less')}
            </TextPrimary>
            <Image preview={false} src={isDisplayContentWithoutExpand ? SHOWMORE_ICON : SHOWLESS_ICON} />
          </div>
          )}
        {/* Show files */}
        <div className="list-media">
          {reportCommentFiles.map((file) => <FileDisplay key={file.id} file={file} />)}
        </div>
      </StyledContent>
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
          isDisliking={isDisliking}
          isDislike={isDislike}
          onClick={handleDisLike}
          onHover={handleHoverDislike}
          renderUsersDislike={renderUsersDislike}
          onOpenUsersActive={handleOpenUsersActive}
        />
      </div>
      )}
      {isRead === 0 && <div className="icon-unread" />}
      {visibleUsersActive && (
      <ModalUsersActive
        isLoadingUsersActive={usersInteracted.isLoadingAll}
        usersActive={{ usersLike: usersInteracted.like, userDisLike: usersInteracted.dislike }}
        isModalVisible
        setIsModalVisible={setVisibleUsersActive}
        currentActiveTab={currentTab}
      />
      )}
    </StyledWrapper>
  )
}

export default memo(Comment)
