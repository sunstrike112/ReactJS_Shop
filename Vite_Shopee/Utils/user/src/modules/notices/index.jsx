/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Spin } from 'antd'
import { dateFormat } from '../../utils'

import { TextPrimary, NotifyButton, Image } from '../../components'
import { useHistories, useNotification, useProfile } from '../../hooks'

import { CLOCK, EMPTY_NOTIFY } from '../../assets'
import { Wrapper, NotifyLink, EmptyBox, NotifyList, LoadingBox } from './styled'
import { DEFAULT_PAG, ROUTES_NAME } from '../../constants'

const NoticeBox = ({ setIsNotice }) => {
  const { profile } = useProfile()
  const { notices, isLoadingNotices, getNotices, getNotification, getNotificationDetail, handleRedirectToNotification } = useNotification({ userId: profile.userId })
  const { t } = useTranslation()
  const history = useHistories()
  const location = useLocation()

  useEffect(() => {
    getNotices()
  }, [])

  const handleNotice = (notification) => {
    const notifyDetailURL = `${ROUTES_NAME.NOTIFICATION}/${notification.newsId}`
    if (notifyDetailURL === location.pathname) {
      getNotificationDetail(notification.newsId)
    } else {
      handleRedirectToNotification({ notification })
    }
    setIsNotice(false)
  }
  const handleShowAll = () => {
    if (location.pathname.includes(ROUTES_NAME.NOTIFICATIONS)) {
      getNotification({ page: DEFAULT_PAG.page, limit: DEFAULT_PAG.limit, keySearch: '' })
    } else {
      history.push(ROUTES_NAME.NOTIFICATIONS)
    }
    setIsNotice(false)
  }
  const renderItem = (notice) => (
    <NotifyLink
      className={notice.isRead ? '' : 'unread'}
      key={notice.newsId}
      status={notice.isRead}
      onClick={() => handleNotice(notice)}
    >
      <TextPrimary className="notify__title" style={{ marginBottom: 8 }} fontWeight="fw_600">
        {notice.newsTitle}
      </TextPrimary>
      <div className="date">
        <Image width={16} src={CLOCK} alt="img_clock" />
        <TextPrimary fontSize="size_12">{`${dateFormat(notice?.publicationStart)}`}</TextPrimary>
        &nbsp;
        {notice.publicationEnd && (
          <TextPrimary fontSize="size_12">{`~ ${dateFormat(notice.publicationEnd)}`}</TextPrimary>
        )}
      </div>
    </NotifyLink>
  )

  const renderNotices = () => {
    if (notices && notices.length > 0) {
      return notices.map(renderItem)
    }
    return (
      <EmptyBox>
        <Image width={122} src={EMPTY_NOTIFY} alt="empty" />
        <TextPrimary color="grey">{t('common.header.empty_notice')}</TextPrimary>
      </EmptyBox>
    )
  }

  return (
    <Wrapper>
      <div className="notice-ctn">
        <NotifyList>
          {isLoadingNotices
            ? <LoadingBox><Spin /></LoadingBox>
            : renderNotices()}
        </NotifyList>
        <div className="action-bottom">
          <NotifyButton
            backgroundcolor="green_light"
            color="green"
            title={t('home_screen.show_all')}
            onClick={handleShowAll}
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default NoticeBox
