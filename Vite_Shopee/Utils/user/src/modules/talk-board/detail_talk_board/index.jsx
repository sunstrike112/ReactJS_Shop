/* eslint-disable no-unused-vars */
import { Button, Pagination } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { ARROW_LEFT } from '../../../assets'
import { Image, TextNormal } from '../../../components'
import { useCommentsList, useTalkBoard } from '../../../hooks'
import HomeLayout from '../../layouts/home'
import ContentTopic from '../components/ContentTopic'
import CommentEditor from './components/CommentEditor'
import { Container, Wrapper } from './styled'

const ContainerScreen = () => {
  const { t } = useTranslation()
  const { data, isLoading, pagination, getCommentsListAction, filter } = useCommentsList()
  const [showMore, setShowMore] = useState(false)
  const {
    loadTalkBoardDetailAction,
    dataTalkBoardDetail,
    isLiking,
    likeTalkBoardAction,
    disLikeTalkBoardAction,
    checkCompleteTalkBoardAction,
    usersLike,
    usersDislike,
    usersCheckComplete,
    loadUserLikeTalkBoardAction,
    loadUserDisLikeTalkBoardAction,
    loadUserCheckCompleteTalkBoardAction,
    readTalkBoardAction,
    loadUnreadTalkBoardAction
  } = useTalkBoard()
  const { talkBoardId } = useParams()
  const history = useHistory()

  const handleLike = () => { likeTalkBoardAction({ talkBoardId }) }
  const handleDislike = () => { disLikeTalkBoardAction({ talkBoardId }) }
  const handleCheckComplete = () => checkCompleteTalkBoardAction({ talkBoardId })

  // // Action hover
  const handleHoverLike = () => loadUserLikeTalkBoardAction({ talkBoardId })
  const handleHoverDisLike = () => loadUserDisLikeTalkBoardAction({ talkBoardId })
  const handleHoverCheckComplete = () => loadUserCheckCompleteTalkBoardAction({ talkBoardId })

  // Action show user
  const renderUsersLike = useMemo(() => usersLike.map((el, index) => <TextNormal key={index} fontSize="size_12" color="white">{el.name}</TextNormal>), [usersLike])
  const renderUsersDislike = useMemo(() => usersDislike.map((el) => <TextNormal fontSize="size_12" color="white">{el.name}</TextNormal>), [usersDislike])
  const renderUsersCheckComplete = useMemo(() => usersCheckComplete.map((el) => <TextNormal fontSize="size_12" color="white">{el.name}</TextNormal>), [usersCheckComplete])

  useEffect(() => {
    getCommentsListAction({
      talkBoardId,
      params: {
        page: 1,
        limit: 20
      }
    })

    loadTalkBoardDetailAction({ talkBoardId })
  }, [])

  useEffect(() => {
    if (dataTalkBoardDetail?.isRead === false) {
      readTalkBoardAction({
        talkBoardId,
        callback: {
          done: () => loadUnreadTalkBoardAction()
        }
      })
    }
  }, [dataTalkBoardDetail])

  const handleOnChangePage = (page, pageSize) => {
    getCommentsListAction({
      talkBoardId,
      params: {
        page,
        limit: pageSize,
        filter
      }
    })
  }

  return (
    <HomeLayout>
      <Container>
        <Wrapper>
          <Button className="back-btn" onClick={history.goBack}>
            <Image src={ARROW_LEFT} alt="arr-left" />
          </Button>
          <ContentTopic
            dataSource={dataTalkBoardDetail}
            userLike={usersLike}
            userDisLike={usersDislike}
            usersCheckComplete={usersCheckComplete}
            handleLike={handleLike}
            handleDislike={handleDislike}
            handleCheckComplete={handleCheckComplete}
            isLiking={isLiking}
            handleHoverLike={handleHoverLike}
            handleHoverDisLike={handleHoverDisLike}
            handleHoverCheckComplete={handleHoverCheckComplete}
            renderUsersLike={renderUsersLike}
            renderUsersDislike={renderUsersDislike}
            renderUsersCheckComplete={renderUsersCheckComplete}
            talkBoardId={talkBoardId}
            totalComment={pagination?.total}
          />
          <CommentEditor listComments={data} talkBoardId={talkBoardId} />
          {data && data.length > 0 && (
            <Pagination
              className="pagination-container"
              total={pagination?.total}
              current={pagination?.page}
              pageSize={pagination?.limit}
              pageSizeOptions={[20]}
              showSizeChanger
              onChange={handleOnChangePage}
              locale={{ items_per_page: `/ ${t('talk_board.page')}` }}
            />
          )}
        </Wrapper>
      </Container>
    </HomeLayout>
  )
}

export default ContainerScreen
