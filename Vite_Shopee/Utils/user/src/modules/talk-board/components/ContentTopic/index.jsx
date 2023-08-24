/* eslint-disable react/prop-types */
import { PaperClipOutlined } from '@ant-design/icons'
import { Avatar, Button, Image, Tooltip, Tree } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ICON_TALK_BOARD_CMT, ICON_DELETE, ICON_EDIT_TALK_BOARD, ICON_PROFILE, IC_CARET } from '../../../../assets'
import { Dislike, Like, Complete, Modal, ModalUsersActive, TextNormal } from '../../../../components'
import { DisplayHyperLink } from '../../../../components/text'
import { LINE_HEIGHT_TOPIC_TALKBOARD, TYPE_IMG, FONT_SIZE_CONTENT_TALKBOARD, TAB_KEYS } from '../../../../constants'
import { useHistories, useProfile, useTalkBoard } from '../../../../hooks'
import { dateFormat, downloadS3File, getFileFromS3, normalizeAttributesTree, normalizeGroupsTree } from '../../../../utils'
import { Wrapper, WrapperContent } from './styled'

const LIMIT_ITEM_GR_AND_ATT = 3

const renderMedia = (files, index) => {
  if (TYPE_IMG.includes(files.fileType)) {
    return (
      <Image src={getFileFromS3(files.link)} alt="img-cmt" key={index} />
    )
  }
  return (
    <Tooltip placement="left" title={files.fileName} key={index}>
      <div className="file-download" id={files.id}>
        <Button onClick={() => downloadS3File({ s3Path: getFileFromS3(files.link), fileName: files.fileName, id: files.id })}>
          <PaperClipOutlined />
          <TextNormal>{files.fileName}</TextNormal>
        </Button>
      </div>
    </Tooltip>
  )
}

const ContentTopic = ({
  dataSource,
  isLiking,
  handleLike,
  handleDislike,
  handleCheckComplete,
  userLike,
  userDisLike,
  usersCheckComplete,
  renderUsersLike,
  renderUsersDislike,
  renderUsersCheckComplete,
  handleHoverLike,
  handleHoverDisLike,
  handleHoverCheckComplete,
  totalComment,
  talkBoardId,
  ...rest
}) => {
  const { t } = useTranslation()
  const history = useHistories()
  const {
    usersActive,
    isLoadingUsersActive,
    loadUsersActiveTalkBoardAction,
    deleteTalkBoarddAction
  } = useTalkBoard()

  const { profile } = useProfile()

  const [showMoreDes, setShowMoreDes] = useState(false)
  const [showMore, setShowMore] = useState(true)
  const [isShowFullGrAndAtt, setIsShowFullGrAndAtt] = useState(false)
  const [visibleUsersActive, setVisibleUsersActive] = useState(false)
  const [currentTab, setCurrentTab] = useState(TAB_KEYS.LIKE)
  const [isDeleteVisible, setIsDeleteVisible] = useState(false)

  const contentRef = useRef()

  useEffect(() => {
    const condition = Math.ceil((contentRef.current?.scrollHeight / FONT_SIZE_CONTENT_TALKBOARD) / LINE_HEIGHT_TOPIC_TALKBOARD) > 16
    setShowMoreDes(condition)
  }, [dataSource.description])

  // handle show all user active
  const handleOpenUsersActive = ({ tabActive }) => {
    setVisibleUsersActive(true)
    loadUsersActiveTalkBoardAction({ talkBoardId })
    setCurrentTab(tabActive)
  }

  const handleDeleteTalkBoard = () => {
    deleteTalkBoarddAction({
      talkBoardId,
      callback: {
        done: () => history.push('/talk-board')
      }
    })
  }

  const redirectToEdit = () => {
    history.push(`/edit-talk-board/${talkBoardId}`)
  }

  const isExpand = useMemo(() => (
    showMoreDes || (dataSource.lstFile?.length > 1)
  ), [showMoreDes, dataSource.lstFile?.length])

  const isExpandGroupAndAttribute = useMemo(() => (dataSource.lstDepartments?.length > LIMIT_ITEM_GR_AND_ATT
    || dataSource.listAttributes?.length > LIMIT_ITEM_GR_AND_ATT), [dataSource.listAttributes, dataSource.lstDepartments])

  const groupsTree = useMemo(() => {
    const result = normalizeGroupsTree(dataSource.lstDepartments || [])
    if (!isShowFullGrAndAtt && result.length > 0) {
      result.length = LIMIT_ITEM_GR_AND_ATT
    }
    return result
  })

  const attributesTree = useMemo(() => {
    const result = normalizeAttributesTree(dataSource.listAttributes || [])
    if (!isShowFullGrAndAtt && result.length > 0) {
      result.length = LIMIT_ITEM_GR_AND_ATT
    }
    return result
  })

  const hasGroupOrAttribute = groupsTree.length > 0 || attributesTree.length > 0

  const newFile = useMemo(() => {
    if (dataSource.lstFile) {
      return showMore ? [dataSource.lstFile[0]] : dataSource.lstFile
    }
    return []
  }, [showMore, dataSource.lstFile])

  return (
    <Wrapper {...rest}>
      <div className="info">
        <div className="user">
          <Avatar size={27} src={getFileFromS3(dataSource.author?.imagePath) || ICON_PROFILE} alt="avatar" />
          <TextNormal color="text_secondary">{dataSource.author?.fullName}</TextNormal>
        </div>
        <div className="date">
          <TextNormal color="text_secondary" fontSize="size_12">{dateFormat(dataSource.createdAt)}</TextNormal>
          {dataSource.author?.id === profile.userId && (
            <>
              <ICON_EDIT_TALK_BOARD onClick={redirectToEdit} className="date__icon" />
              <ICON_DELETE className="date__icon" onClick={() => setIsDeleteVisible(true)} />
            </>
          )}
        </div>
      </div>
      <div className="topic__header">
        <div className="topic__header__left">
          <div className="topic__header__left--title">
            <TextNormal
              fontSize="size_28"
              fontWeight="fw_700"
              color="text_primary"
            >
              {dataSource.title}

            </TextNormal>
            {!hasGroupOrAttribute && (
            <TextNormal
              fontSize="size_16"
              fontWeight="fw_500"
              color="text_primary"
            >
              {t('talk_board.everyone')}
            </TextNormal>
            )}

          </div>
          <WrapperContent lineHeight={LINE_HEIGHT_TOPIC_TALKBOARD} isShowMore={showMore}>
            <TextNormal ref={contentRef} color="text_primary" fontSize="size_20">
              <DisplayHyperLink html={dataSource.description || ''} />
            </TextNormal>
          </WrapperContent>
        </div>
        {hasGroupOrAttribute && (
        <div className="topic__header__right">
          <div className="topic__header__right--content">
            {groupsTree.length > 0 && (
            <div className="item">
              <TextNormal
                fontSize="size_16"
                fontWeight="fw_500"
                color="text_primary"
              >
                {t('talk_board.group')}
              </TextNormal>
              <Tree treeData={groupsTree} selectable={false} />
            </div>
            )}
            {attributesTree.length > 0 && (
            <div className="item">
              <TextNormal
                fontSize="size_16"
                fontWeight="fw_500"
                color="text_primary"
              >
                {t('talk_board.attribute')}
              </TextNormal>
              <Tree treeData={attributesTree} selectable={false} />
            </div>
            )}
          </div>
          {isExpandGroupAndAttribute && (
          <Button className="show-more" onClick={() => setIsShowFullGrAndAtt((prev) => !prev)}>
            <TextNormal>{isShowFullGrAndAtt ? t('talk_board.show_less') : t('talk_board.show_more')}</TextNormal>
            <Image
              preview={false}
              style={{ transform: isShowFullGrAndAtt ? 'rotate(180deg)' : '' }}
              src={IC_CARET}
              alt="CARETUP"
            />
          </Button>
          )}
        </div>
        )}
      </div>
      <div className={`topic__media ${!showMore ? 'show-more-media' : ''}`}>
        {dataSource.lstFile && dataSource.lstFile.length > 0 && newFile.map((file, index) => (renderMedia(file, index)))}
        <div className="list-tag">
          {dataSource.lstTag && dataSource.lstTag.length > 0 && dataSource.lstTag.map((tag) => (
            <TextNormal key={tag?.tagId}>{tag?.tagName}</TextNormal>
          ))}
        </div>
        {isExpand && (
        <Button className="show-more" onClick={() => setShowMore(!showMore)}>
          <TextNormal>{!showMore ? t('talk_board.show_less') : t('talk_board.show_more')}</TextNormal>
          <Image preview={false} style={{ transform: !showMore ? 'rotate(180deg)' : '' }} src={IC_CARET} alt="CARETUP" />
        </Button>
        )}
      </div>
      <div className="action-group">
        <Like
          totalLike={dataSource.totalLike}
          isLiking={isLiking}
          isLike={dataSource.isLike}
          onClick={handleLike}
          onHover={handleHoverLike}
          renderUsersLike={renderUsersLike}
          onOpenUsersActive={handleOpenUsersActive}
        />
        <Dislike
          totalDislike={dataSource.totalDislike}
          isDisliking={isLiking}
          isDislike={dataSource.isDislike}
          onClick={handleDislike}
          onHover={handleHoverDisLike}
          renderUsersDislike={renderUsersDislike}
          onOpenUsersActive={handleOpenUsersActive}
        />
        <Complete
          isComplete={dataSource.complete}
          totalComplete={dataSource.totalComplete}
          isLiking={isLiking}
          onClick={handleCheckComplete}
          onHover={handleHoverCheckComplete}
          renderUsersCheckComplete={renderUsersCheckComplete}
          onOpenUsersActive={handleOpenUsersActive}
        />
        <div className="total-comment">
          <ICON_TALK_BOARD_CMT />
          <TextNormal color="text_secondary">{totalComment}</TextNormal>
        </div>
      </div>
      {visibleUsersActive && (
      <ModalUsersActive
        isLoadingUsersActive={isLoadingUsersActive}
        usersActive={usersActive}
        isModalVisible
        setIsModalVisible={setVisibleUsersActive}
        currentActiveTab={currentTab}
      />
      )}
      <Modal
        isModalVisible={isDeleteVisible}
        setIsModalVisible={setIsDeleteVisible}
        description={t('talk_board.delete_talkboard_confirm')}
        okText={t('common.yes')}
        onOk={handleDeleteTalkBoard}
        cancelText={t('common.cancel')}
        borderRadiusButton={6}
      />
    </Wrapper>
  )
}

export default ContentTopic
