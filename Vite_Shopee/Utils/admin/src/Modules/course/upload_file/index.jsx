/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import {
  EditOutlined,
  VideoCameraAddOutlined
} from '@ant-design/icons'
import { message, notification } from 'antd'
import { Prompt } from 'react-router-dom'
import { isEmpty } from 'lodash'

import { Table, Title, Breadcrumb } from 'Components'
import { useUploadFile, useMyCompany, useQuery, useHistories, useRoles } from 'Hooks'
import ModalComponent from 'Components/modal'
import { UPLOAD_FILE_TYPE } from 'Constants/upload_file'
import { checkTypeOf, downloadS3File } from 'Utils'
import i18next from 'i18next'
import { Wrapper } from './styled'
import FolderTree from './components/FolderTree'
import tableColumns from './column'
import FilterBlock from './components/FilterBlock'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'
import CreateFolderModal from './components/CreateFolderModal'
import EditFileOrFolderModal from './components/EditFileOrFolderModal'
import LinkProjectModal from './components/LinkProjectModal'

import UploadFileModal from './components/UploadFileModal'
import FolderTreeModal from './components/FolderTreeModal'

const UploadFileScreen = () => {
  const { t } = useTranslation('upload_file')
  const history = useHistories()
  const query = useQuery()
  const folderId = query.get('folderId')
  const {
    folderTree,
    folderFiles,
    selectedFolderFile,
    getFolderTreeAction,
    getFolderFilesAction,
    deleteFolderFilesAction,
    addNewFolderAction,
    updateFolderFileAction,
    searchFileAction,
    uploadFileAction,
    isMoveFile,
    resetStateAction
  } = useUploadFile()

  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false)
  const [visibleCreateFolder, setVisibleCreateFolder] = useState(false)
  const [currentFileOrFolder, setCurrentFileOrFolder] = useState(null)
  const [currentFolderId, setCurrentFolderId] = useState(null)
  const [isShowLeave, setIsLeave] = useState(false)
  const [linkProjectVisible, setLinkProjectVisible] = useState(false)
  const [linkProjectId, setLinkProjectId] = useState(false)

  const [visibleUploadFile, setVisibleUploadFile] = useState(false)
  const [modalUpload, setModalUpload] = useState(false)
  const { companyInfo } = useMyCompany()
  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const [projectName, setProjectName] = useState('')
  const [filePath, setFilePath] = useState('')
  const [showModalFileMove, setShowModalFileMove] = useState(false)
  const [infoFileCurrent, setInfoFileCurrent] = useState()

  const [folderSelected, setFolderSelected] = useState([])

  const { isWorkspaceAdmin } = useRoles()

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })
  const handleConfirmDelete = () => {
    deleteFolderFilesAction({
      data: {
        ids: rowSelected.selectedRowKeys.length ? rowSelected.selectedRowKeys : folderSelected
      },
      callback: {
        done: () => {
          setCurrentFolderId(null)
          setFolderSelected([])
          resetStateAction()
        }
      }
    })
    setVisibleConfirmDelete(false)
  }

  const handleSelectFolderFile = useCallback((params, type) => {
    switch (type) {
      case UPLOAD_FILE_TYPE.FOLDER:
        if (currentFolderId === +params?.data?.id) {
          setCurrentFolderId(null)
          setFolderSelected([])
          resetStateAction()
        } else {
          getFolderFilesAction({ params: { folderId: params.id || params?.data?.id } })
          setCurrentFolderId(params.id || params?.data?.id)
        }
        break
      case UPLOAD_FILE_TYPE.FILE:
        break
      default:
        getFolderFilesAction({ params: {} })
        break
    }
  }, [currentFolderId])

  const onDownload = (params) => {
    downloadS3File({ s3Path: params.filePath, fileName: params.fileName, id: params.id })
  }

  const copyFileOrFolderPath = async (data) => {
    try {
      await navigator.clipboard.writeText(decodeURIComponent(data))
      message.success(t('common:copied'))
    } catch (err) {
      message.error(t('common:failed_to_copy'))
    }
  }

  const onLinkProjectList = (record) => {
    if (record.fileSize.includes('GB') && record.fileSize.replace('GB', '').trim() > 5) {
      notification.error({
        message: i18next.t('common:error'),
        description: t('link_editor_GB'),
        duration: 2
      })
    } else {
      setLinkProjectId(record.id)
      setProjectName(record.fileName)
      setFilePath(record.filePath)
      setLinkProjectVisible(true)
    }
  }

  const onShowFolderTree = (record) => {
    setInfoFileCurrent(record)
    setShowModalFileMove(!showModalFileMove)
  }

  const columns = useMemo(
    () => tableColumns({
      t,
      action: {
        setCurrentFileOrFolder,
        copyFileOrFolderPath,
        handleSelectFolderFile,
        onLinkProjectList,
        onShowFolderTree,
        onDownload
      },
      data: { folderId: currentFolderId },
      isWorkspaceAdmin
    }),
    [t, setCurrentFileOrFolder, currentFolderId, isWorkspaceAdmin]
  )

  const action = useMemo(() => ([
    {
      text: t('create_recording'),
      icon: <VideoCameraAddOutlined />,
      click: () => history.push('/course-management/upload-file/recording')
    }
  ]), [t])

  const isExceedPackage = useMemo(() => checkTypeOf(companyInfo.memory) === 'Number'
	&& checkTypeOf(companyInfo.memoryUsed) === 'Number'
	&& companyInfo.memoryUsed >= companyInfo.memory,
  [companyInfo.memory, companyInfo.memoryUsed])

  useEffect(() => {
    if (folderId) {
      getFolderTreeAction({ params: {} })
    } else if (isMoveFile) {
      getFolderFilesAction({ params: { folderId: currentFolderId } })
      setRowSelected({
        selectedRowKeys: [],
        selectedRows: []
      })
    } else {
      getFolderTreeAction({ params: {} })
    }
  }, [folderId, isMoveFile])

  const onCloseLinkProjectModal = () => {
    setFilePath('')
    setProjectName('')
    setLinkProjectVisible(false)
  }

  return (
    <Wrapper style={{ zIndex: 1 }}>
      <Title
        icon={EditOutlined}
        title={t('title')}
      />
      <FilterBlock
        t={t}
        setRowSelected={setRowSelected}
        selectedFolderFile={selectedFolderFile.data}
        searchFile={searchFileAction}
        getFolderFiles={getFolderFilesAction}
        getFolderTreeAction={getFolderTreeAction}
        setFolderSelected={setFolderSelected}
        resetAction={resetStateAction}
        setCurrentFolderId={setCurrentFolderId}
      />
      <div className="content">
        <div className="left">
          <div className="folder-tree">
            <FolderTree
              treeData={folderTree}
              selectedKey={selectedFolderFile.key}
              onSelectFolder={handleSelectFolderFile}
              setFolderSelected={setFolderSelected}
            />
          </div>
          <div className="storage-info" />
        </div>
        <div className="right">
          <Table
            locale={{ emptyText: t('common:empty_data') }}
            rowSelection={{
              selectedRowKeys: rowSelected.selectedRowKeys,
              onChange: onSelectChange,
              preserveSelectedRowKeys: true
            }}
            rowKey={(record) => record.id}
            dataSource={folderFiles}
            columns={columns}
            pagination={false}
            total={folderFiles.length}
            breadcrumb={<Breadcrumb t={t} data={selectedFolderFile.data?.breadcrumb} onSelectItem={(data) => handleSelectFolderFile(data, data && UPLOAD_FILE_TYPE.FOLDER)} />}
            selected={rowSelected.selectedRowKeys.length}
            disabledDelete={!folderSelected.length}
            action={action}
            createText={t('create_button')}
            uploadText={t('upload_button')}
            onUpload={isExceedPackage ? () => setModalUpload(true) : () => setVisibleUploadFile(true)}
            disabledUpload={isEmpty(selectedFolderFile)}
            onCreate={() => setVisibleCreateFolder(true)}
            onDelete={() => setVisibleConfirmDelete(true)}
          />

          <ConfirmDeleteModal
            t={t}
            isVisible={visibleConfirmDelete}
            onSubmit={handleConfirmDelete}
            setIsVisble={setVisibleConfirmDelete}
            numberOfSelectedRecord={rowSelected.selectedRows.length}
            disabledSubmit={false}
          />

          {visibleCreateFolder && (
            <CreateFolderModal
              visible={visibleCreateFolder}
              onClose={setVisibleCreateFolder}
              selectedFolderFile={selectedFolderFile.data}
              addNewFolder={addNewFolderAction}
            />
          )}

          {currentFileOrFolder && (
            <EditFileOrFolderModal
              visible={currentFileOrFolder}
              onClose={setCurrentFileOrFolder}
              data={currentFileOrFolder}
              selectedFolderFile={selectedFolderFile.data}
              updateFolderFile={updateFolderFileAction}
              getFolderFilesAction={getFolderFilesAction}
            />
          )}
          {visibleUploadFile && (
            <UploadFileModal
              visible={visibleUploadFile}
              onClose={setVisibleUploadFile}
              selectedFolderFile={selectedFolderFile.data}
              uploadFile={uploadFileAction}
              setModalUploadFalse={setModalUpload}
              isShowLeave={isShowLeave}
              setIsLeave={setIsLeave}
            />
          )}
          {modalUpload && (
            <ModalComponent
              visible={modalUpload}
              onCancel={() => setModalUpload(false)}
              onSubmit={() => setModalUpload(false)}
              title={t('error_message:validation.tile_upgrade')}
              onSubmitText={t('common:offModal')}
              type="error"
              cancel={false}
            >
              <b>{t('error_message:validation.max_file_upload_line1')}</b>
              <br />
              <b>{t('error_message:validation.max_file_upload_line2')}</b>
            </ModalComponent>
          )}
          <LinkProjectModal
            title={t('recording:link_video_title_modal')}
            visible={linkProjectVisible}
            onClose={onCloseLinkProjectModal}
            projectName={projectName}
            filePath={filePath}
            linkProjectId={linkProjectId}
          />
          <FolderTreeModal
            title={t('recording:directory_list')}
            visible={showModalFileMove}
            onClose={() => setShowModalFileMove(!showModalFileMove)}
            infoFileCurrent={infoFileCurrent}
            setShowModalFileMove={setShowModalFileMove}
          />
        </div>
      </div>
      <Prompt
        when={isShowLeave}
        message={t('recording:leave_confirm')}
      />
    </Wrapper>
  )
}

export default UploadFileScreen
