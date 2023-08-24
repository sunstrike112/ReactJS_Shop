/* eslint-disable react/prop-types */
import { Avatar, Tabs } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  AVATAR_DEFAULT, COMPLETE_ACTIVE_ICON, COMPLETE_EMPTY_ICON, COMPLETE_ICON, DISLIKE_EMPTY, ICON_CLOSE, ICON_TALK_BOARD_ACTIVE_UNLIKE,
  ICON_TALK_BOARD_UNLIKE, LIKE_ACTIVE_ICON, LIKE_EMPTY, LIKE_ICON
} from '../../assets'
import { tabKeysMapping, tabKeysTextMapping, TAB_KEYS } from '../../constants'
import { getFileFromS3 } from '../../utils'
import Image from '../image'
import Modal from '../modal'
import SpinCustom from '../spinCustom'
import { TextNormal } from '../text'
import { Wrapper } from './styled'

const { TabPane } = Tabs

const ModalUserActive = ({
  isModalVisible,
  setIsModalVisible,
  isLoadingUsersActive,
  usersActive,
  currentActiveTab,
  ...rest }) => {
  const { t } = useTranslation()

  const { usersLike, userDisLike, usersCheckComplete } = usersActive
  const [currentTab, setCurrentTab] = useState(tabKeysMapping[currentActiveTab])

  const onChange = (key) => {
    setCurrentTab(key)
  }

  return (
    <Modal
      wrapClassName="modal__users__active"
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      footer={null}
      {...rest}
    >
      <Wrapper>
        <div className="header">
          <TextNormal fontSize="size_24" fontWeight="fw_600">
            {t(tabKeysTextMapping[currentTab])}
          </TextNormal>
          <ICON_CLOSE className="header__close" onClick={() => setIsModalVisible(false)} />
        </div>
        <Tabs
          activeKey={currentTab}
          onChange={onChange}
          tabBarGutter={18}
          tabBarStyle={{ color: '#838383' }}
        >
          <TabPane
            tab={(
              <div className="tab__like">
                {currentTab === TAB_KEYS.LIKE
                  ? <LIKE_ACTIVE_ICON className="tab__like__icon" />
                  : <LIKE_ICON className="tab__like__icon" />}

                {usersLike.length}
              </div>
            )}
            key={TAB_KEYS.LIKE}
          >
            <div className="users">
              {isLoadingUsersActive
                ? <SpinCustom fontSize={45} color="#838383" className="users__search__empty" />
                : usersLike.length
                  ? usersLike.map((user, index) => (
                    <div className="user" key={index}>
                      <Avatar className="user__avatar" size={32} src={getFileFromS3(user.image || user.imagePath) || AVATAR_DEFAULT} />
                      <TextNormal color="text_secondary" fontWeight="fw_500">{user.name || user.fullName}</TextNormal>
                    </div>
                  ))
                  : (
                    <div className="users__search__empty">
                      <Image src={LIKE_EMPTY} />
                      <TextNormal className="users__search__empty--text" color="text_secondary" fontWeight="fw_500">
                        {t('talk_board.like_empty')}
                      </TextNormal>
                    </div>
                  )}
            </div>
          </TabPane>
          <TabPane
            tab={(
              <div className="tab__like">
                {currentTab === TAB_KEYS.DIS_LIKE
                  ? <ICON_TALK_BOARD_ACTIVE_UNLIKE className="tab__like__icon" />
                  : <ICON_TALK_BOARD_UNLIKE className="tab__like__icon" />}
                {userDisLike.length}
              </div>
            )}
            key={TAB_KEYS.DIS_LIKE}
          >
            <div className="users">
              {isLoadingUsersActive
                ? <SpinCustom fontSize={45} color="#838383" className="users__search__empty" />
                : userDisLike.length
                  ? userDisLike.map((user, index) => (
                    <div className="user" key={index}>
                      <Avatar className="user__avatar" size={32} src={getFileFromS3(user.image || user.imagePath) || AVATAR_DEFAULT} />
                      <TextNormal color="text_secondary" fontWeight="fw_500">{user.name || user.fullName}</TextNormal>
                    </div>
                  ))
                  : (
                    <div className="users__search__empty">
                      <Image src={DISLIKE_EMPTY} />
                      <TextNormal className="users__search__empty--text" color="text_secondary" fontWeight="fw_500">
                        {t('talk_board.dislike_empty')}
                      </TextNormal>
                    </div>
                  )}
            </div>
          </TabPane>
          {usersCheckComplete && (
          <TabPane
            tab={(
              <div className="tab__like">
                {currentTab === TAB_KEYS.CHECK_COMPLETE
                  ? <COMPLETE_ICON className="tab__like__icon" />
                  : <COMPLETE_ACTIVE_ICON className="tab__like__icon" />}
                {usersCheckComplete.length}
              </div>
            )}
            key={TAB_KEYS.CHECK_COMPLETE}
          >
            <div className="users">
              {isLoadingUsersActive
                ? <SpinCustom fontSize={45} color="#838383" className="users__search__empty" />
                : usersCheckComplete.length
                  ? usersCheckComplete.map((user, index) => (
                    <div className="user" key={index}>
                      <Avatar className="user__avatar" size={32} src={getFileFromS3(user.image || user.imagePath) || AVATAR_DEFAULT} />
                      <TextNormal color="text_secondary" fontWeight="fw_500">{user.name || user.fullName}</TextNormal>
                    </div>
                  ))
                  : (
                    <div className="users__search__empty">
                      <COMPLETE_EMPTY_ICON />
                      <TextNormal className="users__search__empty--text" color="text_secondary" fontWeight="fw_500">
                        {t('talk_board.check_complete_empty')}
                      </TextNormal>
                    </div>
                  )}
            </div>
          </TabPane>
          )}

        </Tabs>
      </Wrapper>
    </Modal>
  )
}

export default ModalUserActive
