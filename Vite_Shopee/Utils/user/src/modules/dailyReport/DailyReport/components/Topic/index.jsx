/* eslint-disable react/prop-types */
import { Avatar, Dropdown, Menu, Row, Space } from 'antd'
import React, { useEffect, useRef, useState, memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { CLOCK, ICON_DELETE, ICON_DETAIL, ICON_EDIT_TALK_BOARD, ICON_PROFILE, SHOWLESS_ICON, SHOWMORE_ICON } from '../../../../../assets'
import { ClickAble, Dislike, Comment, Image, Like, Modal, TextNormal, TextPrimary, ModalUsersActive, Complete } from '../../../../../components'
import FileDisplay from '../../../../../components/fileDisplay'
import { DisplayHyperLink } from '../../../../../components/text'
import { ACTIONS_INTERACTIVE, FONT_SIZE_CONTENT_TALKBOARD, LINE_HEIGHT_TOPIC_TALKBOARD, ROUTES_NAME, TAB_KEYS } from '../../../../../constants'
import { useDailyReports, useHistories, useProfile } from '../../../../../hooks'
import { getFileFromS3 } from '../../../../../utils'
import { SLASH_DATE_FORMAT } from '../../../../../utils/date'
import { formatTime } from '../../../../../utils/utils'
import { StyledMenu, StyledWrapper } from './styled'

const Topic = ({ dailyReport }) => {
  const contentRef = useRef()

  // Use hooks
  const { t } = useTranslation()
  const { profile } = useProfile()
  const history = useHistories()
  const location = useLocation()
  const {
    dailyReports,
    usersInteracted,
    deleteDailyReportAction,
    likeDailyReportAction,
    dislikeDailyReportAction,
    setCompleteDailyReportAction,
    loadUsersInteractedDailyReportAction
  } = useDailyReports()
  const { filter, isDeleting, isLiking, isDisliking, isSettingComplete } = dailyReports
  // End use hooks

  // Use states
  const [isDeleteVisible, setIsDeleteVisible] = useState(false)
  const [isDisplayContentWithoutExpand, setIsDisplayContentWithoutExpand] = useState(true)
  const [isExpandContent, setIsExpandContent] = useState(false)
  const [visibleUsersActive, setVisibleUsersActive] = useState(false)
  const [currentTab, setCurrentTab] = useState(TAB_KEYS.LIKE)
  // End use states

  const isLocatedAtDetailScreen = location.pathname.includes(ROUTES_NAME.DAILY_REPORT_DETAIL) || null
  const files = useMemo(() => {
    if (dailyReport.reportFiles?.length) {
      return isDisplayContentWithoutExpand ? [dailyReport.reportFiles[0]] : dailyReport.reportFiles
    }
    return []
  }, [isDisplayContentWithoutExpand, dailyReport.reportFiles])

  const redirectToEdit = () => {
    history.push(`${ROUTES_NAME.DAILY_REPORT_EDIT}/${dailyReport.id}`)
  }

  const handleDelete = () => {
    deleteDailyReportAction({
      dailyReportId: dailyReport.id,
      filter,
      isLocatedAtDetailScreen,
      callback: {
        done: () => setIsDeleteVisible(false),
        redirectToDailyReports: () => history.push(ROUTES_NAME.DAILY_REPORTS)
      }
    })
  }

  const menu = useMemo(() => {
    const items = [
      {
        key: '1',
        label: (
          <StyledMenu onClick={redirectToEdit}>
            <ICON_EDIT_TALK_BOARD />
            <TextNormal className="text">{t('profile.home.edit')}</TextNormal>
          </StyledMenu>
        ),
        isShow: profile.userId === dailyReport.author?.id
      },
      {
        key: '2',
        label: (
          <StyledMenu onClick={() => setIsDeleteVisible(true)}>
            <ICON_DELETE />
            <TextNormal className="text">{t('common.delete')}</TextNormal>
          </StyledMenu>
        ),
        isShow: profile.userId === dailyReport.author?.id
      }
    ].filter((m) => m.isShow)

    return {
      items,
      content: <Menu
        style={{ borderRadius: 4 }}
        items={items}
      /> }
  }, [profile, dailyReport, t])

  // Action like/dislike
  const handleLike = useCallback(() => likeDailyReportAction({ dailyReportId: dailyReport.id }), [dailyReport.id])
  const handleDisLike = useCallback(() => dislikeDailyReportAction({ dailyReportId: dailyReport.id }), [dailyReport.id])
  const handleSetComplete = useCallback(() => setCompleteDailyReportAction({ dailyReportId: dailyReport.id }), [dailyReport.id])

  // Action hover
  const handleHoverLike = useCallback(() => loadUsersInteractedDailyReportAction({ action: ACTIONS_INTERACTIVE.LIKE, dailyReportId: dailyReport.id }),
    [dailyReport.id])

  const handleHoverDislike = useCallback(() => loadUsersInteractedDailyReportAction({ action: ACTIONS_INTERACTIVE.DISLIKE, dailyReportId: dailyReport.id }),
    [dailyReport.id])

  const handleHoverComplete = useCallback(() => loadUsersInteractedDailyReportAction({ action: ACTIONS_INTERACTIVE.COMPLETE, dailyReportId: dailyReport.id }),
    [dailyReport.id])

  // render list user active in tooltip
  const renderUsersLike = useMemo(() => usersInteracted.like.map((el) => <TextNormal fontSize="size_12" color="white">{el.fullName}</TextNormal>),
    [usersInteracted.like])
  const renderUsersDislike = useMemo(() => usersInteracted.dislike.map((el) => <TextNormal fontSize="size_12" color="white">{el.fullName}</TextNormal>),
    [usersInteracted.dislike])

  const renderUsersCheckComplete = useMemo(() => usersInteracted.complete.map((el) => <TextNormal fontSize="size_12" color="white">{el.fullName}</TextNormal>),
    [usersInteracted.complete])

  // handle show all user active
  const handleOpenUsersActive = useCallback(({ tabActive }) => {
    setVisibleUsersActive(true)
    loadUsersInteractedDailyReportAction({ isLoadAll: true, dailyReportId: dailyReport.id })
    setCurrentTab(tabActive)
  }, [dailyReport.id])

  useEffect(() => {
    const condition = Math.ceil((contentRef.current?.scrollHeight) / FONT_SIZE_CONTENT_TALKBOARD) / LINE_HEIGHT_TOPIC_TALKBOARD >= 4
    const isManyFiles = dailyReport.reportFiles?.length > 1
    setIsExpandContent(condition || isManyFiles)
  }, [dailyReport.content, dailyReport.reportFiles?.length])

  return (
    <StyledWrapper
      isDisplayContentWithoutExpand={isDisplayContentWithoutExpand}
      lineHeight={LINE_HEIGHT_TOPIC_TALKBOARD}
      id="my-topic"
    >
      <ClickAble className="title-wrapper">
        <Row
          justify="space-between"
          align="middle"
        >
          <Space
            align="center"
          >
            <Avatar
              size={27}
              src={getFileFromS3(dailyReport.author?.imagePath) || ICON_PROFILE}
              alt="avatar"
            />
            <TextNormal
              color="text_secondary"
              fontWeight="fw_500"
            >
              {dailyReport.author?.fullName}
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
              {formatTime(dailyReport.createdAt, SLASH_DATE_FORMAT)}
            </TextNormal>
            {menu.items.length > 0 && (
            <Dropdown
              getPopupContainer={() => document.getElementById('my-topic')}
              placement="bottomRight"
              overlay={menu.content}
              trigger={['click']}
            >
              <ICON_DETAIL className="button-read" />
            </Dropdown>
            )}
          </Space>
        </Row>
      </ClickAble>
      <div className="content">
        <div className="content__title">
          <TextNormal
            fontWeight="fw_600"
            fontSize="size_28"
          >
            {dailyReport.title}
          </TextNormal>
        </div>
        <TextNormal
          ref={contentRef}
          className="content__des"
          color="text_primary"
          fontSize="size_20"
        >
          <DisplayHyperLink html={dailyReport.content || ''} />
        </TextNormal>
        <div className={`topic__media ${!isDisplayContentWithoutExpand ? 'show-more-media' : ''}`}>
          {files.map((file) => <FileDisplay key={file.id} file={file} />)}
        </div>
        {isExpandContent
          && (
          <div
            aria-hidden
            className="show__more"
            onClick={() => setIsDisplayContentWithoutExpand((prev) => !prev)}
          >
            {isDisplayContentWithoutExpand
              ? (
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
            isLike={dailyReport.isLike}
            totalLike={dailyReport.totalLike}
            isLiking={isLiking}
            renderUsersLike={renderUsersLike}
            onClick={handleLike}
            onHover={handleHoverLike}
            onOpenUsersActive={handleOpenUsersActive}
          />
          <Dislike
            isDislike={dailyReport.isDislike}
            totalDislike={dailyReport.totalDislike}
            isDisliking={isDisliking}
            renderUsersDislike={renderUsersDislike}
            onClick={handleDisLike}
            onHover={handleHoverDislike}
            onOpenUsersActive={handleOpenUsersActive}
          />
          <Complete
            isComplete={dailyReport.isComplete}
            totalComplete={dailyReport.totalComplete}
            isLiking={isSettingComplete}
            onClick={handleSetComplete}
            onHover={handleHoverComplete}
            renderUsersCheckComplete={renderUsersCheckComplete}
            onOpenUsersActive={handleOpenUsersActive}
          />
          <Comment
            hasCommentUnread={dailyReport.hasCommentUnRead}
            countComment={dailyReport.totalComment}
          />
        </div>
      </div>
      <Modal
        isModalVisible={isDeleteVisible}
        setIsModalVisible={setIsDeleteVisible}
        description={t('dailyReports.confirmDelete')}
        okText={t('common.yes')}
        onOk={handleDelete}
        cancelText={t('common.cancel')}
        borderRadiusButton={6}
        hideModalWhenSubmit={false}
        loading={isDeleting}
      />
      {visibleUsersActive && (
      <ModalUsersActive
        isLoadingUsersActive={usersInteracted.isLoadingAll}
        usersActive={{ usersLike: usersInteracted.like, userDisLike: usersInteracted.dislike, usersCheckComplete: usersInteracted.complete }}
        isModalVisible
        setIsModalVisible={setVisibleUsersActive}
        currentActiveTab={currentTab}
      />
      )}
    </StyledWrapper>
  )
}

export default memo(Topic)
