/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Row, Col } from 'antd'
import { FieldTimeOutlined } from '@ant-design/icons'
import { TextNormal } from '../../../../../components'
import { Wrapper } from './styled'
import { AVATAR_DEFAULT } from '../../../../../assets'
import LikeComment from '../../../components/LikeComment'
import { getFileFromS3 } from '../../../../../utils'

const CommentCard = ({ name, url, content, date, isLike, countLike }) => (
  <Wrapper>
    <Row className="user">
      <Col span={2} className="user__avatar">
        <img src={getFileFromS3(url) || AVATAR_DEFAULT} alt="avatar_user" />
      </Col>
      <Col span={22}>
        <Row className="user__name">
          <TextNormal color="talk_primary">
            {name || 'demo name'}
          </TextNormal>
          <Row align="middle">
            <FieldTimeOutlined />
            <TextNormal color="#d3d3d3">{date || '7/7/2022 14:30'}</TextNormal>
          </Row>
        </Row>
        <div className="content">
          <TextNormal>{content || 'demo content'}</TextNormal>
        </div>
        <LikeComment isLike={isLike} countLike={countLike} count className="like-comment" />
      </Col>
    </Row>
  </Wrapper>
)

export default CommentCard
