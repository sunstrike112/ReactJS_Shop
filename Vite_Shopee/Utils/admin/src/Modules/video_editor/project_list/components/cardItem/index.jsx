/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { Button, Popconfirm, Tag, Typography, Progress } from 'antd'
import { CloudUploadOutlined, DeleteOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons'

import { useLoadProjectList } from 'Hooks/project_management'
import { TooltipCustom } from 'Components'
import { useRoles } from 'Hooks'

import { getFileFromS3 } from 'Utils'
import { VIDEO_EDITOR_THUMBNAIL } from 'Assets'
import { STATUS_COLORS, VIDEO_STATUS } from '../../../constants'

const CardContent = styled.div`
	display: flex;
	align-items: center;
  border-radius: 16px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
  position: relative;
  max-height: 175px;

  &:hover {
    box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }
`

const CardDescription = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 16px 16px 16px 0;
  min-height: 180px;

  .card_bottom {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .info {
      .status {
        margin-bottom: 0;
        .tag {
          margin-left: 5px;
        }
      }
    }

    .actions {
      display: flex;
      gap: 10px;
    }
  }

`

const CardThumb = styled.img`
	width: 260px;
  min-width: 260px;
  object-fit: cover;
  margin-right: 16px;
  height: 100%;
`

const ButtonStyled = styled(Button)`
  max-height: 36px;

  &.btn_edit {
    background: ${({ theme }) => theme.bg_primary};
    color: ${({ theme }) => theme.white};
  }

  &.ant-btn[disabled], .ant-btn[disabled]:hover, .ant-btn[disabled]:focus, .ant-btn[disabled]:active {
    background: #f5f5f5;
    color: rgba(0, 0, 0, 0.25);
  }

`

const CardTitle = styled.div`
  display: flex;
  flex-direction: column;

  .cart_title {
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    min-height: 50px;
    // overflow-wrap: anywhere;
  }
`

const CardItem = ({
  srcThumb = '',
  titleCard = 'Title',
  lastDateEdit = '---',
  onRemoveProjectItem,
  onEdit,
  status,
  isLinked,
  fileEditPath,
  fileId,
  className,
  filePath
}) => {
  const { t } = useTranslation('project')
  const {
    publishState,
    publishProjectAction
  } = useLoadProjectList()
  const { roleWorkspace } = useRoles()

  const [isDownloading, setIsDownloading] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [percent, setPercent] = useState(0)
  const onDownload = () => {
    setIsDownloading(true)
    axios.get(fileEditPath === null ? getFileFromS3(filePath) : getFileFromS3(fileEditPath), {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        const total = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setPercent(total)
      }
    })
      .then((response) => {
        const url = window.URL.createObjectURL(response.data)
        const a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = `${Date.now()}.mp4`
        a.click()
        window.URL.revokeObjectURL(url)
      })
      .catch((err) => {
        throw Error(err)
      }).finally(() => {
        setIsDownloading(false)
      })
  }

  const onPublish = (isOverride) => {
    setIsPublishing(true)
    publishProjectAction({
      fileId,
      isOverride
    })
  }

  useEffect(() => {
    switch (publishState) {
      case 'publishing':
        return setIsPublishing(true)
      default:
        return setIsPublishing(false)
    }
  }, [publishState])

  const disableDownloadOrPublish = useMemo(() => status === VIDEO_STATUS.EXPORTING || status === VIDEO_STATUS.PROCESSING, [status])
  return (
    <CardContent className={className}>
      <CardThumb src={getFileFromS3(srcThumb) || VIDEO_EDITOR_THUMBNAIL} />
      <CardDescription>
        <CardTitle>
          <TooltipCustom
            title={titleCard}
            text={(
              <Typography.Paragraph className="cart_title" ellipsis={{ rows: 2 }}>
                {titleCard}
              </Typography.Paragraph>
            )}
          />
        </CardTitle>
        <div className="card_bottom">
          <div className="info">
            <Typography.Text type="secondary">{t('last_edit')}: {lastDateEdit}</Typography.Text>
            <Typography.Paragraph type="secondary" className="status">
              {t('common:status')}:
              <Tag type="secondary" color={STATUS_COLORS[status]} className="tag"> {t(`${status}`)}</Tag>
            </Typography.Paragraph>
          </div>
          <div className="actions">
            <ButtonStyled
              onClick={onEdit}
              icon={<EditOutlined />}
              className="btn_edit"
              disabled={status === VIDEO_STATUS.EXPORTING || status === VIDEO_STATUS.PROCESSING}
            >
              {t('edit')}
            </ButtonStyled>
            <Popconfirm
              title={t('title_confirm_delete')}
              onConfirm={onRemoveProjectItem}
              placement="top"
              okText={t('delete')}
              cancelText={t('common:cancel')}
            >
              <ButtonStyled danger icon={<DeleteOutlined />}>
                {t('delete')}
              </ButtonStyled>
            </Popconfirm>
            {
              isLinked && (
                <Popconfirm
                  title={t('tooltip_unlink_project')}
                  onConfirm={() => onPublish(true)}
                  onCancel={() => onPublish(false)}
                  placement="top"
                  okText={t('common:yes')}
                  cancelText={t('common:cancel')}
                >
                  <ButtonStyled
                    icon={<CloudUploadOutlined />}
                    loading={isPublishing}
                    disabled={disableDownloadOrPublish}
                  >
                    {t('common:publish')}
                  </ButtonStyled>
                </Popconfirm>
              )
            }
            {!roleWorkspace && (
              <ButtonStyled
                loading={isDownloading}
                onClick={onDownload}
                icon={<DownloadOutlined />}
                disabled={disableDownloadOrPublish}
              >
                {t('common:download')}
              </ButtonStyled>
            )}
            <Progress
              percent={percent}
              style={{ display: isDownloading ? 'block' : 'none' }}
            />
          </div>
        </div>

      </CardDescription>
    </CardContent>
  )
}

export default CardItem
CardItem.prototype = {
  srcThumb: PropTypes.string,
  titleCard: PropTypes.string,
  lastDateEdit: PropTypes.string
}
