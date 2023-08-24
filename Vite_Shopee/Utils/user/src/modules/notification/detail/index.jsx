/* eslint-disable no-useless-catch */
/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react'
import { Spin } from 'antd'
import ReactHtmlParser from 'react-html-parser'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { CLOCK, ICON_PROFILE } from '../../../assets'
import { Image, TextNormal, TextPrimary } from '../../../components'
import { useGetQuery, useHistories, useNotification, useProfile } from '../../../hooks'
import { dateFormat, getFileFromS3 } from '../../../utils'
import HomeLayout from '../../layouts/home'
import { DetailWrapper } from './styled'

const NotificationDetail = () => {
  const { profile } = useProfile()
  const { newsId } = useParams()
  const history = useHistories()
  const flagCount = history.location?.state?.flagCount
  const { notificationDetail, getNotificationDetail, noticeDetailLoading, handleViewDetailNotification } = useNotification({ userId: profile.userId })
  const { t } = useTranslation()

  const { queryWorkspaceID } = useGetQuery()
  useEffect(() => {
    getNotificationDetail(newsId)
  }, [newsId, history.location.pathname])

  const handleViewDetail = () => {
    handleViewDetailNotification({ notification: notificationDetail, flagCount })
  }

  return (
    <HomeLayout>
      <Spin spinning={noticeDetailLoading}>
        <DetailWrapper>
          <div className="detail-box">
            <div className="header">
              <div className="title">
                <TextPrimary fontSize="size_24" fontWeight="fw_600">
                  {notificationDetail?.title}
                </TextPrimary>
              </div>
              <div className="date-publish">
                <Image src={CLOCK} />
                <TextPrimary color="grey" fontSize="size_12">
                  {t('notification.publish_time')}
                  {dateFormat(notificationDetail.publicationStart)}
                  {notificationDetail.publicationEnd !== 0
                    ? ` ~ ${dateFormat(notificationDetail.publicationEnd)}`
                    : ''}
                </TextPrimary>
              </div>
            </div>
            <div className="avatar">
              <Image src={notificationDetail.imgCreator === null ? ICON_PROFILE : getFileFromS3(notificationDetail.imgCreator)} />
              <TextPrimary color="grey">
                {notificationDetail.creatorName === null ? t('notification.creator_name') : notificationDetail.creatorName}
              </TextPrimary>
            </div>
            <div className="content">
              {ReactHtmlParser(notificationDetail?.textHtml, {
                decodeEntities: true
              })}
            </div>
            <div className="footer">
              <Link to={`/notifications${queryWorkspaceID.ONLY}`} className="button">
                <TextNormal color="white">{t('notification.backbutton')}</TextNormal>
              </Link>
              {(notificationDetail.courseId || notificationDetail.talkBoardId || notificationDetail.reportId) && (
              <TextNormal
                className="view_details"
                color="green"
                onClick={handleViewDetail}
              >
                  {t('notification.view_details')}
              </TextNormal>
              )}
            </div>
          </div>
        </DetailWrapper>
      </Spin>
    </HomeLayout>
  )
}
export default NotificationDetail
