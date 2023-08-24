/* eslint-disable react/prop-types */
import { Card, Spin, Tooltip } from 'antd'
import React, { useState } from 'react'
import { AVATAR_DEFAULT } from '../../../../../assets'
import { useGetQuery } from '../../../../../hooks'
import { getFileFromS3 } from '../../../../../utils'
import { WorkSpaceItem } from './styled'

const CardWorkspace = ({ item, handleRedirect, query, ...rest }) => {
  const { workspaceid } = useGetQuery()
  const [isRedirecting, setIsRedirecting] = useState(false)
  return (
    <WorkSpaceItem {...rest}>
      <Spin spinning={isRedirecting}>
        <Tooltip title={item.description} placement="right" color="cyan">
          <Card
            onClick={() => handleRedirect(item.companyId, setIsRedirecting)}
            hoverable
            className={`card_item ${item.companyId === +workspaceid && 'active'}`}
          >
            <img className="card_item_img" alt="workspace" src={getFileFromS3(item.imagePath) || AVATAR_DEFAULT} />
          </Card>
        </Tooltip>
        <Tooltip title={item.companyName} placement="bottom">
          <p className="workspace_name">{item.companyName}</p>
        </Tooltip>
      </Spin>
    </WorkSpaceItem>
  )
}

export default CardWorkspace
