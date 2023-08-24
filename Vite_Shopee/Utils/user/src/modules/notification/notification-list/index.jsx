/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Spin, Checkbox, Pagination } from 'antd'
import { TextPrimary, Image, Input } from '../../../components'
import { isMappable, dateFormat } from '../../../utils'
import HomeLayout from '../../layouts/home'
import { AllDisplayed, NotificationWrapper, NotifyBox } from './styled'
import { CLOCK, SEARCH, EMPTYLIST } from '../../../assets'
import { deleteNotification, loadNotifications } from '../store/actions'
import { useProfile, useNotification } from '../../../hooks'
import Modal from '../../../components/modal'
import { DEFAULT_PAG } from '../../../constants'
import { OutlineDeleteButton, OutlineSecondaryButton } from '../../../components/button'

const Notification = () => {
  const { t } = useTranslation()
  const { profile } = useProfile()
  const dispatch = useDispatch()

  const { notifications, handleRedirectToNotification, isLoadingNotifications, getNotificationUnread, isLoadingNotices } = useNotification({ userId: profile.userId })
  const [keySearch, setKeySearch] = useState('')
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkedList, setCheckedList] = useState([])
  const [checkAll, setCheckAll] = useState(false)
  const [hasDeleteNotification, setHasDeleteNotifications] = useState(false)

  const ref = useRef([])

  const handleSearch = (e) => {
    setKeySearch(e.target.value.trim())
  }

  const Unchecked = () => {
    for (let i = 0; i < ref.current.length; i++) {
      if (ref.current[i] === null) return
      ref.current[i].checked = false
    }
  }

  const onChangePage = (page, pageSize) => {
    dispatch(
      loadNotifications({
        loginId: profile.userId,
        page,
        limit: pageSize,
        searchText: keySearch
      })
    )
    setCheckedList([])
    Unchecked()
    setCheckAll(false)
  }
  const onSearch = () => {
    dispatch(
      loadNotifications({
        loginId: profile.userId,
        searchText: keySearch,
        page: DEFAULT_PAG.page,
        limit: notifications.limit || DEFAULT_PAG.limit
      })
    )
  }

  const Checked = () => {
    for (let i = 0; i < ref.current.length; i++) {
      if (ref.current[i] === null) return
      ref.current[i].checked = true
    }
  }

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? notifications.result.map((item) => item.newsId) : [])
    setCheckAll(e.target.checked)
    // eslint-disable-next-line no-unused-expressions
    e.target.checked ? Checked() : Unchecked()
  }

  const handleDeleteNotify = () => {
    dispatch(
      deleteNotification({
        ids: checkedList,
        loginId: profile.userId,
        searchText: keySearch,
        page: notifications.page,
        callback: {
          done: () => {
            setCheckedList([])
            Unchecked()
            setCheckAll(false)
            getNotificationUnread()
          }
        }
      })
    )
  }

  const onShowModal = useCallback(() => {
    setHasDeleteNotifications((prev) => !prev)
  }, [])

  useEffect(() => {
    onSearch()
  }, [keySearch])

  const handleCheck = (event) => {
    let updatedList = [...checkedList]
    if (event.target.checked) {
      updatedList = [...checkedList, event.target.value]
    } else {
      updatedList.splice(checkedList.indexOf(event.target.value), 1)
    }
    setCheckedList(updatedList)
  }

  useEffect(() => {
    if (checkedList && notifications.result) {
      setIndeterminate(checkedList.length && checkedList.length !== notifications.result.length)
      if (notifications.result.length > 0 && checkedList.length > 0) {
        setCheckAll(checkedList.length === notifications.result.length)
      }
    }
  }, [checkedList, notifications.result])

  useEffect(() => {
    if (isLoadingNotices) {
      setCheckedList([])
      Unchecked()
      setCheckAll(false)
    }
  }, [isLoadingNotices])

  const renderItem = (notify, index) => (
    <NotifyBox key={index} className="notifybox-container" status={notify?.isRead.toString()}>
      <input ref={(element) => { ref.current[index] = element }} className="checkbox" type="checkbox" value={notify?.newsId} onChange={handleCheck} />
      <div
        className="notifybox"
        role="button"
        tabIndex="0"
        onClick={() => handleRedirectToNotification({ notification: notify })}
      >
        <div style={{ borderBottom: index + 1 === notifications.result.length ? '1px solid #f1f1f1' : '' }}>
          <div className="notifybox-content">
            <div>
              <div className="notifybox-header">
                <TextPrimary className="title" fontSize="size_16" fontWeight="fw_600">
                  {notify?.newsTitle}
                </TextPrimary>
              </div>
              <div className="date">
                <Image src={CLOCK} />
                <TextPrimary fontSize="size_12">{`${dateFormat(notify?.publicationStart)}`}</TextPrimary>
                &nbsp;
                {notify?.publicationEnd && (
                  <TextPrimary fontSize="size_12">{`~ ${dateFormat(notify?.publicationEnd)}`}</TextPrimary>
                )}
              </div>
            </div>
            {!notify?.isRead && <div className="unread-circle" />}
          </div>
        </div>
      </div>
    </NotifyBox>
  )

  return (
    <HomeLayout>
      <NotificationWrapper>
        <Spin spinning={isLoadingNotifications}>
          <div className="content">
            <div className="header">
              <div className="header__left">
                <TextPrimary fontSize="size_24" fontWeight="fw_600">
                  {t('notification.notify_list')}
                </TextPrimary>
                <div className="total-notify">
                  <TextPrimary fontSize="size_15" fontWeight="fw_600">
                    {t('notification.notify-numbers', { numbers: notifications.total || 0 })}
                  </TextPrimary>
                </div>
              </div>
              <div className="group-action">
                {notifications.result.length > 0 && (
                <OutlineDeleteButton
                  title={t('notification.delete')}
                  fontWeight="fw_600"
                  color={checkedList.length === 0 ? 'black' : 'error'}
                  disabled={checkedList.length === 0}
                  onClick={onShowModal}
                >{t('common.delete')}
                </OutlineDeleteButton>
                )}
                <Input
                  onChange={handleSearch}
                  placeholder={t('notification.search_placeholder')}
                  icon={SEARCH}
                  background="grey_blur"
                  onSearch={onSearch}
                />
              </div>
            </div>
            <div className="list-container">
              {notifications.result.length > 0 ? <Checkbox indeterminate={indeterminate} checked={checkAll} onChange={onCheckAllChange}>{t('talk_board.select_all')} {(checkedList.length > 0 ? t('talk_board.select_length', { selected: checkedList.length }) : '')}</Checkbox> : null}
              {isMappable(notifications.result) && checkedList
                ? (
                  <Checkbox.Group
                    value={checkedList}
                    onChange={(checkedValues) => {
                      setCheckedList(checkedValues)
                    }}
                  >
                    {notifications.result.map(renderItem)}
                  </Checkbox.Group>
                )
                : (
                  <div className="list-empty">
                    <Image src={EMPTYLIST} />
                    <TextPrimary color="grey" fontSize="size_16">
                      {t('notification.empty')}
                    </TextPrimary>
                  </div>
                )}
            </div>
          </div>
          {notifications.result && notifications.result.length > 0 ? (
            notifications.pages > 1 ? (
              <Pagination
                current={notifications.page}
                total={notifications.total}
                onChange={onChangePage}
                pageSize={notifications.limit}
                style={{ textAlign: 'center' }}
              />
            ) : (
              <AllDisplayed>{t('notification.all_displayed')}</AllDisplayed>
            )
          ) : (
            ''
          )}
        </Spin>
        <Modal
          isModalVisible={hasDeleteNotification}
          onOk={handleDeleteNotify}
          setIsModalVisible={setHasDeleteNotifications}
          description={t('notification.confirm_delete_notification', { selected: checkedList.length || 0 })}
          okText={t('common.yes')}
          onCancel={setHasDeleteNotifications}
          borderRadiusButton={6}
        />
      </NotificationWrapper>
    </HomeLayout>
  )
}
export default Notification
