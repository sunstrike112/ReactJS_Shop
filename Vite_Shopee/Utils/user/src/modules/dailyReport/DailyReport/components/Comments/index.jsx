/* eslint-disable react/prop-types */
import { Empty, List } from 'antd'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import Comment from '../Comment'

const Comments = ({
  pagination,
  comments,
  handleChangePag
}) => {
  // Use hooks
  const { t } = useTranslation()
  // End use hooks

  const { page, limit, total } = pagination

  return (
    <List
      className="comments"
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={(comment) => <Comment key={comment.id} comment={comment} />}
      rowKey={(comment) => comment.id}
      locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('talk_board.no_option')} /> }}
      pagination={total ? { current: page, pageSize: limit, total, onChange: handleChangePag, pageSizeOptions: [5, 10, 20, 50], showSizeChanger: true } : false}
    />
  )
}

export default memo(Comments)
