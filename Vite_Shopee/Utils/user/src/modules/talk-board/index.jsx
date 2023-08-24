/* eslint-disable no-unused-vars */
import { Col, Pagination, Row, Spin } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTalkBoard } from '../../hooks'
import HomeLayout from '../layouts/home'
import FilterBlock from './components/FilterBlock'
import SearchBlock from './components/SearchBlock'
import Topic from './components/Topic'
import { EMPTYLIST } from '../../assets'
import { Image, TextPrimary } from '../../components'
import { Wrapper } from './styled'

const TalkBoardScreen = () => {
  const { t } = useTranslation()
  const {
    isLoading,
    listTalkBoard,
    loadTalkBoardAction,
    filter
  } = useTalkBoard()

  const { result: listTalkboardData, page: currentPage, limit, total } = listTalkBoard

  const handleOnChangePage = (page, pageSize) => {
    loadTalkBoardAction({ params: {
      page,
      limit: pageSize,
      filter
    } })
  }

  return (
    <HomeLayout>
      <Wrapper className="wrapper">
        <Row gutter={[32]}>
          <Col span={24}>
            <FilterBlock
              listTalkBoardTotal={total}
            />
          </Col>
          <Col span={24} xl={8}>
            <SearchBlock
              filter={filter}
              listTalkBoard={listTalkBoard}
              loadTalkBoardAction={loadTalkBoardAction}
            />
          </Col>
          <Col span={24} xl={16} className="list-talkboard-wrapper">
            <Spin spinning={isLoading}>
              {listTalkboardData.map((talkBoard) => <Topic key={talkBoard.id} talkBoard={talkBoard} />)}
              {listTalkboardData.length === 0 && (
              <Col span={24} className="list-empty">
                <Image src={EMPTYLIST} />
                <TextPrimary color="grey" fontSize="size_16">
                  {t('talk_board.empty')}
                </TextPrimary>
              </Col>
              )}
            </Spin>
            {total > 0
            && (
            <Pagination
              total={total}
              current={currentPage}
              pageSize={limit}
              showSizeChanger
              onChange={handleOnChangePage}
              pageSizeOptions={[20, 50, 100]}
              locale={{ items_per_page: `/ ${t('talk_board.page')}` }}
            />
            )}
          </Col>
        </Row>
      </Wrapper>
    </HomeLayout>
  )
}

export default TalkBoardScreen
