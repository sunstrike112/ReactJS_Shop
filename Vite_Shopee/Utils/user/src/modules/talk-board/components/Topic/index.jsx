/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar, Dropdown, Menu, Row, Space } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CLOCK, ICON_DELETE, ICON_DETAIL, ICON_EDIT_TALK_BOARD, ICON_PROFILE, ICON_READ_COMMENT, SHOWLESS_ICON, SHOWMORE_ICON } from '../../../../assets'
import { ClickAble, Dislike, Comment, Image, Like, Complete, Modal, ModalUsersActive, TextNormal, TextPrimary } from '../../../../components'
import { DisplayHyperLink } from '../../../../components/text'
import { FONT_SIZE_CONTENT_TALKBOARD, LINE_HEIGHT_TOPIC_TALKBOARD, TAB_KEYS } from '../../../../constants'
import { useHistories, useProfile, useTalkBoard } from '../../../../hooks'
import { getFileFromS3 } from '../../../../utils'
import { SLASH_DATE_FORMAT } from '../../../../utils/date'
import { formatTime } from '../../../../utils/utils'
import { BoxRead, Wrapper } from './styled'

const Topic = ({
  topic,
  topicId,
  item,
  isLiking,
  voteLikeTopic,
  onNavigate,
  name,
  talkBoard,
  ...rest
}) => {
  const { t } = useTranslation()
  const { profile } = useProfile()
  const history = useHistories()
  const {
    listTalkBoard,
    loadTalkBoardAction,
    loadTagAction,
    deleteTalkBoarddAction,
    likeTalkBoardAction,
    disLikeTalkBoardAction,
    checkCompleteTalkBoardAction,
    loadUserLikeTalkBoardAction,
    loadUserDisLikeTalkBoardAction,
    loadUserCheckCompleteTalkBoardAction,
    isLikingTalkBoard,
    usersLike,
    usersDislike,
    usersCheckComplete,
    readTalkBoardAction,
    loadTalkBoardUpdateAction,
    loadUnreadTalkBoardAction,
    loadUsersActiveTalkBoardAction,
    isLoadingUsersActive,
    usersActive,
    filter
  } = useTalkBoard()
  const { page, limit } = listTalkBoard
  const [isDeleteVisible, setIsDeleteVisible] = useState(false)
  const [isShowMore, setIsShowMore] = useState(true)
  const [visibleUsersActive, setVisibleUsersActive] = useState(false)
  const [currentTab, setCurrentTab] = useState(TAB_KEYS.LIKE)
  const [isExpand, setIsExpand] = useState(false)

  const contentRef = useRef()

  const handleNavigateTalkBoardDetail = () => {
    history.push(`/talk-board/${talkBoard.id}`)
  }

  const handleDeleteTalkBoard = () => {
    deleteTalkBoarddAction({
      talkBoardId: talkBoard.id,
      callback: {
        done: () => {
          loadTalkBoardAction({ params: { page, limit, filter } })
          loadTagAction({ hasTalkBoard: true })
          if (!talkBoard.isRead) loadUnreadTalkBoardAction()
        }
      }
    })
  }

  const redirectToEdit = () => {
    history.push(`/edit-talk-board/${talkBoard.id}`)
  }

  const handleMarkReadTalkBoard = () => {
    readTalkBoardAction({ talkBoardId: talkBoard.id,
      callback: {
        done: () => loadUnreadTalkBoardAction()
      }
    })
  }

  const menuRead = (
    <Menu
      style={{ borderRadius: 4 }}
      items={[
        profile.userId !== talkBoard.author.id
        && {
          key: '1',
          label: (
            <BoxRead onClick={handleMarkReadTalkBoard}>
              <ICON_READ_COMMENT />
              <TextNormal className="text">{t(talkBoard.isRead ? 'talk_board.mark_as_unread' : 'talk_board.mark_as_read')}</TextNormal>
            </BoxRead>
          )
        },
        profile.userId === talkBoard.author.id && {
          key: '2',
          label: (
            <BoxRead onClick={redirectToEdit}>
              <ICON_EDIT_TALK_BOARD />
              <TextNormal className="text">{t('profile.home.edit')}</TextNormal>
            </BoxRead>
          )
        },
        profile.userId === talkBoard.author.id && {
          key: '3',
          label: (
            <BoxRead onClick={() => setIsDeleteVisible(true)}>
              <ICON_DELETE />
              <TextNormal className="text">{t('common.delete')}</TextNormal>
            </BoxRead>
          )
        }
      ]}
    />
  )

  // Action like/dislike/checkComplete
  const handleLike = () => likeTalkBoardAction({ talkBoardId: talkBoard.id })
  const handleDisLike = () => disLikeTalkBoardAction({ talkBoardId: talkBoard.id })
  const handleCheckComplete = () => checkCompleteTalkBoardAction({ talkBoardId: talkBoard.id })

  // // Action hover
  const handleHoverLike = () => loadUserLikeTalkBoardAction({ talkBoardId: talkBoard.id })
  const handleHoverDisLike = () => loadUserDisLikeTalkBoardAction({ talkBoardId: talkBoard.id })
  const handleHoverCheckComplete = () => loadUserCheckCompleteTalkBoardAction({ talkBoardId: talkBoard.id })

  // render list user active in tooltip
  const renderUsersLike = useMemo(() => usersLike.map((el) => <TextNormal fontSize="size_12" color="white">{el.name}</TextNormal>), [usersLike])
  const renderUsersDislike = useMemo(() => usersDislike.map((el) => <TextNormal fontSize="size_12" color="white">{el.name}</TextNormal>), [usersDislike])
  const renderUsersCheckComplete = useMemo(() => usersCheckComplete.map((el) => <TextNormal fontSize="size_12" color="white">{el.name}</TextNormal>), [usersCheckComplete])

  // handle show all user active
  const handleOpenUsersActive = ({ tabActive }) => {
    setVisibleUsersActive(true)
    loadUsersActiveTalkBoardAction({ talkBoardId: talkBoard.id })
    setCurrentTab(tabActive)
  }

  useEffect(() => {
    const condition = Math.ceil((contentRef.current?.scrollHeight) / FONT_SIZE_CONTENT_TALKBOARD) / LINE_HEIGHT_TOPIC_TALKBOARD >= 4
    setIsExpand(condition)
  }, [talkBoard.description])

  return (
    <Wrapper
      isRead={talkBoard.isRead}
      isShowMore={isShowMore}
      lineHeight={LINE_HEIGHT_TOPIC_TALKBOARD}
      id="my-topic"
      {...rest}
    >
      <ClickAble className="title-wrapper">
        <Row
          justify="space-between"
          align="middle"
        >
          <Space
            align="center"
            className="topic__description"
            onClick={handleNavigateTalkBoardDetail}
          >
            <Avatar
              size={27}
              src={getFileFromS3(talkBoard.author.imagePath) || ICON_PROFILE}
              alt="avatar"
            />
            <TextNormal
              color="text_secondary"
              fontWeight="fw_500"
            >
              {talkBoard.author.fullName}
            </TextNormal>
          </Space>
          <Space
            align="middle"
            className="date__group"
          >
            <Image src={CLOCK} />
            <TextNormal
              color="text_secondary"
            >
              {formatTime(talkBoard.createdAt, SLASH_DATE_FORMAT)}
            </TextNormal>
            <Dropdown
              getPopupContainer={() => document.getElementById('my-topic')}
              placement="bottomRight"
              overlay={menuRead}
              trigger={['click']}
            >
              <ICON_DETAIL className="button-read" />
            </Dropdown>
          </Space>
        </Row>
      </ClickAble>
      <div className="content">
        <div className="content__title">
          <TextNormal
            fontWeight="fw_600"
            fontSize="size_28"
            onClick={handleNavigateTalkBoardDetail}
          >
            {talkBoard.title}
          </TextNormal>
        </div>
        <TextNormal
          ref={contentRef}
          className="content__des"
          color="text_primary"
          fontSize="size_20"
          onClick={handleNavigateTalkBoardDetail}
        >
          <DisplayHyperLink html={talkBoard.description} />
        </TextNormal>
        {isExpand
          && (
          <div
            aria-hidden
            className="show__more"
            onClick={() => setIsShowMore(!isShowMore)}
          >
            {isShowMore ? (
              <>
                <TextPrimary fontSize="size_14" color="green">
                  {t('talk_board.show_more')}
                </TextPrimary>
                <Image src={SHOWMORE_ICON} />
              </>
            )
              : (
                <>
                  <TextPrimary fontSize="size_14" color="green">
                    {t('talk_board.show_less')}
                  </TextPrimary>
                  <Image src={SHOWLESS_ICON} />
                </>
              )}
          </div>
          )}
        <div className="content__social">
          <Like
            isLike={talkBoard.isLike}
            totalLike={talkBoard.totalLike}
            isLiking={isLikingTalkBoard}
            onClick={handleLike}
            onHover={handleHoverLike}
            renderUsersLike={renderUsersLike}
            onOpenUsersActive={handleOpenUsersActive}
          />
          <Dislike
            isDislike={talkBoard.isDislike}
            totalDislike={talkBoard.totalDislike}
            isDisliking={isLikingTalkBoard}
            onClick={handleDisLike}
            onHover={handleHoverDisLike}
            renderUsersDislike={renderUsersDislike}
            onOpenUsersActive={handleOpenUsersActive}
          />
          <Complete
            isComplete={talkBoard.complete}
            totalComplete={talkBoard.totalComplete}
            isLiking={isLikingTalkBoard}
            onClick={handleCheckComplete}
            onHover={handleHoverCheckComplete}
            renderUsersCheckComplete={renderUsersCheckComplete}
            onOpenUsersActive={handleOpenUsersActive}
          />
          <Comment
            hasCommentUnread={talkBoard.hasCommentUnread}
            countComment={talkBoard.totalComment}
          />
        </div>
      </div>
      {talkBoard.isRead ? null : <div className="icon-unread" />}
      <Modal
        isModalVisible={isDeleteVisible}
        setIsModalVisible={setIsDeleteVisible}
        description={t('talk_board.delete_talkboard_confirm')}
        okText={t('common.yes')}
        onOk={handleDeleteTalkBoard}
        cancelText={t('common.cancel')}
        borderRadiusButton={6}
      />
      {visibleUsersActive && (
      <ModalUsersActive
        isLoadingUsersActive={isLoadingUsersActive}
        usersActive={usersActive}
        isModalVisible
        setIsModalVisible={setVisibleUsersActive}
        currentActiveTab={currentTab}
      />
      )}
    </Wrapper>
  )
}

export default Topic
