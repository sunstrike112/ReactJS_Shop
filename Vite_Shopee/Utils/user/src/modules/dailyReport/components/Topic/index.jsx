/* eslint-disable react/prop-types */
import { Avatar, Col, Dropdown, Menu, Row, Space } from 'antd'
import React, { useState, memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import {
  CLOCK,
  ICON_DELETE,
  ICON_DETAIL,
  ICON_EDIT_TALK_BOARD,
  ICON_PROFILE,
  ICON_READ_COMMENT,
  IMG_FILE_EXCEL,
  IMG_FILE_PDF,
  IMG_FILE_POWERPOINT,
  IMG_FILE_TEXT,
  IMG_FILE_WORD
} from '../../../../assets'
import { Dislike, Comment, Image, Like, Modal, TextNormal, ModalUsersActive, Complete } from '../../../../components'
import { ACTIONS_INTERACTIVE, DEFAULT_PAG, LINE_HEIGHT_TOPIC_TALKBOARD, ROUTES_NAME, TAB_KEYS } from '../../../../constants'
import { useDailyReports, useHistories, useProfile } from '../../../../hooks'
import { getFileFromS3 } from '../../../../utils'
import { SLASH_DATE_FORMAT } from '../../../../utils/date'
import { formatTime } from '../../../../utils/utils'
import { StyledMenu, StyledWrapper } from './styled'

const getFileIconDisplay = ({ fileType, link }) => {
  const fileTypesImage = ['image/png', 'image/jpeg', 'image/bmp', 'image/gif', 'image/jpg']
  const fileTypesWord = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  const fileTypesExcel = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
  const fileTypesPdf = ['application/pdf']
  const fileTypesPowerpoint = ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']
  const fileTypesText = ['text/plain']

  switch (true) {
    case fileTypesImage.includes(fileType):
      return <Image className="heading__img" src={getFileFromS3(link)} alt="card_image" />
    case fileTypesWord.includes(fileType):
      return <Image className="heading__file" src={IMG_FILE_WORD} alt="card_image" />
    case fileTypesExcel.includes(fileType):
      return <Image className="heading__file" src={IMG_FILE_EXCEL} alt="card_image" />
    case fileTypesPdf.includes(fileType):
      return <Image className="heading__file" src={IMG_FILE_PDF} alt="card_image" />
    case fileTypesPowerpoint.includes(fileType):
      return <Image className="heading__file" src={IMG_FILE_POWERPOINT} alt="card_image" />
    case fileTypesText.includes(fileType):
      return <Image className="heading__file" src={IMG_FILE_TEXT} alt="card_image" />
    default: return null
  }
}

const Topic = ({ dailyReport }) => {
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
    markReadDailyReportAction,
    loadUsersInteractedDailyReportAction
  } = useDailyReports()
  const { filter, isDeleting, isLiking, isDisliking, isSettingComplete } = dailyReports
  // End use hooks

  // Use states
  const [isDeleteVisible, setIsDeleteVisible] = useState(false)
  const [visibleUsersActive, setVisibleUsersActive] = useState(false)
  const [currentTab, setCurrentTab] = useState(TAB_KEYS.LIKE)
  // End use states

  const isLocatedAtDetailScreen = location.pathname.includes(ROUTES_NAME.DAILY_REPORT_DETAIL) || null

  const handleMarkRead = () => {
    markReadDailyReportAction({ dailyReportId: dailyReport.id })
  }

  const navigateToDetail = (event) => {
    if (isLocatedAtDetailScreen) return

    // Cant use stopPropagation because when click on cancel modal, on content of modal, close dropdown => theses still make parent element be clicked
    const isAllowRedirect = (typeof event.target.className === 'string' && event.target.className.includes('allowRedirect'))
      || (typeof event.target.parentNode.className === 'string' && event.target.parentNode.className.includes('allowRedirect'))
    if (isAllowRedirect) {
      history.push(`${ROUTES_NAME.DAILY_REPORT_DETAIL}/${dailyReport.id}`)
    }
  }

  const redirectToEdit = () => {
    history.push(`${ROUTES_NAME.DAILY_REPORT_EDIT}/${dailyReport.id}`)
  }

  const handleDelete = () => {
    deleteDailyReportAction({
      dailyReportId: dailyReport.id,
      filter: { ...filter, page: DEFAULT_PAG.page },
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
          <StyledMenu onClick={handleMarkRead}>
            <ICON_READ_COMMENT />
            <TextNormal className="text">{t(dailyReport.isRead ? 'talk_board.mark_as_unread' : 'talk_board.mark_as_read')}</TextNormal>
          </StyledMenu>
        ),
        isShow: (profile.userId !== dailyReport.author?.id) && !isLocatedAtDetailScreen
      },
      {
        key: '2',
        label: (
          <StyledMenu onClick={redirectToEdit}>
            <ICON_EDIT_TALK_BOARD />
            <TextNormal className="text">{t('profile.home.edit')}</TextNormal>
          </StyledMenu>
        ),
        isShow: profile.userId === dailyReport.author?.id
      },
      {
        key: '3',
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
  }, [profile, dailyReport, isLocatedAtDetailScreen, t])

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

  const renderFirstFileDisplay = useMemo(() => {
    const { fileList } = dailyReport
    if (fileList.length) {
      const { fileType, link } = fileList[0]
      return getFileIconDisplay({ fileType, link })
    }
    return null
  }, [dailyReport.fileList])

  return (
    <StyledWrapper
      lineHeight={LINE_HEIGHT_TOPIC_TALKBOARD}
      id="my-topic"
      isRead={isLocatedAtDetailScreen ?? dailyReport.isRead}
      isLocatedAtDetailScreen={isLocatedAtDetailScreen}
      onClick={navigateToDetail}
      className="allowRedirect"
      role="button"
      tabIndex="0"
    >
      <Row justify="space-between allowRedirect">
        <Col span={5} className="allowRedirect">
          <Space align="center" className="heading allowRedirect">
            <div className="allowRedirect">
              <Space align="center" className="allowRedirect">
                <Avatar
                  size={27}
                  src={getFileFromS3(dailyReport.author?.imagePath) || ICON_PROFILE}
                  alt="avatar"
                  className="allowRedirect"
                />
                <TextNormal
                  color="text_secondary"
                  fontWeight="fw_500"
                  className="fullName allowRedirect"
                >
                  {dailyReport.author?.fullName}
                </TextNormal>
              </Space>
              <TextNormal
                color="text_primary"
                fontWeight="fw_700"
                className="title"
              >
                {dailyReport.title}
              </TextNormal>
            </div>
            {renderFirstFileDisplay}
          </Space>
        </Col>
        <Col span={14} className="allowRedirect">
          <Space align="center" className="content allowRedirect">
            <TextNormal color="text_secondary" className="content__text allowRedirect">
              {dailyReport.content}
            </TextNormal>
          </Space>
        </Col>
        <Col span={5} className="allowRedirect">
          <Space
            align="middle"
            className="date__group allowRedirect"
          >
            <Image src={CLOCK} className="allowRedirect" />
            <TextNormal color="text_secondary" className="allowRedirect">
              {formatTime(dailyReport.createdAt, SLASH_DATE_FORMAT)}
            </TextNormal>
            {menu.items.length > 0 && (
            <Dropdown
              getPopupContainer={() => document.getElementById('my-topic')}
              placement="bottomRight"
              overlay={menu.content}
              trigger={['click']}
            >
              <ICON_DETAIL className="detail" />
            </Dropdown>
            )}
          </Space>
          <div className="social allowRedirect">
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
              className="allowRedirect"
            />
          </div>
        </Col>
      </Row>

      {(!dailyReport.isRead && !isLocatedAtDetailScreen) && <div className="icon-unread" />}
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
