import React from 'react'
import {
  FolderOutlined,
  FileOutlined,
  LinkOutlined,
  FolderOpenOutlined,
  DownloadOutlined
} from '@ant-design/icons'
import { Progress } from 'antd'

import { USER_ROLE } from 'Constants/auth'
import { UPLOAD_FILE_TYPE } from 'Constants/upload_file'
import { formatDate, translateFolderName } from 'Utils'
import { Column, STATUS_UPLOAD } from 'Constants'
import { Text } from 'Components'

export default ({
  t,
  action: {
    setCurrentFileOrFolder,
    handleSelectFolderFile,
    onLinkProjectList,
    onShowFolderTree,
    onDownload
  },
  isWorkspaceAdmin
}) => {
  const column = [
    {
      title: t('name'),
      dataIndex: 'fileName',
      key: 'fileName',
      width: 400,
      render: (text, record) => (record.type === UPLOAD_FILE_TYPE.FOLDER ? (
        <div className="cell-flex">
          <p onClick={() => handleSelectFolderFile(record, UPLOAD_FILE_TYPE.FOLDER)} className="folder-file"><FolderOutlined />&nbsp;{text}</p>
          <small>
            <b>
              {translateFolderName(
                record.folderParent,
                record.keyFile,
                t('LECTURES_FILES'),
                t('VIDEO_RECORDING'),
                t('FILE_FOR_SMARTPHONE'),
                t('RECORDING')
              )}
            </b>
          </small>
        </div>
      ) : (
        <div className="cell-flex">
          {
          record.status === 'PROCESSING'
            ? <span className="folder-file"><FileOutlined />&nbsp;{text}</span>
            : isWorkspaceAdmin
              ? <span className="folder-file">{text}</span>
              : (
                <p onClick={() => handleSelectFolderFile(record, UPLOAD_FILE_TYPE.FILE)} className="folder-file">
                  <FileOutlined />&nbsp;{text}
                </p>
              )
            }
          <small>
            <b>
              {translateFolderName(
                record.folderParent,
                record.keyFile,
                t('LECTURES_FILES'),
                t('VIDEO_RECORDING'),
                t('FILE_FOR_SMARTPHONE'),
                t('RECORDING')
              )}
            </b>
          </small>
          <Progress id={record.id} percent={0} style={{ display: 'none' }} />
        </div>
      )),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('size'),
      dataIndex: 'fileSize',
      key: 'fileSize',
      width: 100,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('date'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      render: (text) => formatDate(text),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('common:status'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (text) => (
        <Text.primary fontSize="size_14" color={text === STATUS_UPLOAD.FAIL ? 'red' : 'black'}>
          {text ? t(`common:${text}`) : ''}
        </Text.primary>
      )
    }
  ]

  const onEdit = (record) => setCurrentFileOrFolder(record)

  const moreAction = [
    {
      title: 'common:download',
      icon: DownloadOutlined,
      onClick: (record) => onDownload(record),
      verifyDisable: (record) => record.status === 'PROCESSING'
    },
    {
      title: 'common:tooltip:link_project',
      icon: LinkOutlined,
      onClick: (record) => onLinkProjectList(record),
      verifyShow: (record) => ['mp4', 'avi', 'flv', 'wmv', 'webm', 'oga', 'mov', 'video'].includes(record.fileType?.toLowerCase()),
      verifyDisable: (record) => record.status === 'PROCESSING'
    },
    {
      title: 'common:tooltip:file_move',
      icon: FolderOpenOutlined,
      onClick: (record) => {
        onShowFolderTree(record)
      },
      verifyDisable: (record) => record.type === 'folder'
    }
  ]

  return [
    ...Column.orderAction({
      t,
      getOrderByPag: false,
      moreAction,
      onEdit,
      verifyDisabledEdit: (record) => record.status === 'PROCESSING',
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
      rulesAction: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }),
    ...column
  ]
}
