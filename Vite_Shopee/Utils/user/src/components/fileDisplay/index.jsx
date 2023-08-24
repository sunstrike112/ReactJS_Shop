/* eslint-disable react/prop-types */
import { PaperClipOutlined } from '@ant-design/icons'
import { Button, Image, Tooltip } from 'antd'
import React, { memo } from 'react'
import styled from 'styled-components'
import { IMG_DEFAULT } from '../../assets'
import { TYPE_IMG } from '../../constants'
import { downloadS3File, getFileFromS3 } from '../../utils'
import { TextNormal } from '../text'

const StyledFile = styled.div`
  .ant-btn {
    border: none;
    background: none;
    padding: 0;
    box-shadow: none;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .ant-image {
    margin-bottom: 16px;
    max-width: 458px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }
  p {
    color: #1480ff;
    margin-bottom: 0;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    white-space: normal;
  }
`

const FileDisplay = ({ file }) => {
  if (TYPE_IMG.includes(file.fileType)) {
    return <Image src={getFileFromS3(file.link)} fallback={IMG_DEFAULT} alt="file image" />
  }

  return (
    <Tooltip placement="left" title={file.fileName}>
      <StyledFile>
        <Button
          onClick={() => downloadS3File({ s3Path: getFileFromS3(file.link), fileName: file.fileName, id: file.id })}
        >
          <PaperClipOutlined />
          <TextNormal>{file.fileName}</TextNormal>
        </Button>
      </StyledFile>
    </Tooltip>
  )
}

export default memo(FileDisplay)
