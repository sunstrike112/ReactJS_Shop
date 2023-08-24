import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import {
  EditOutlined
} from '@ant-design/icons'
import { message } from 'antd'
import { Prompt } from 'react-router-dom'
import { isEmpty } from 'lodash'

import { Table, Title, Breadcrumb } from 'Components'
import { useUploadFileImage, useMyCompany, useQuery, useRoles } from 'Hooks'
import ModalComponent from 'Components/modal'
import { TYPE_FILE, UPLOAD_FILE_TYPE } from 'Constants/upload_file'
import { STORAGE, checkTypeOf, downloadS3File, setLocalStorage } from 'Utils'
import { Wrapper } from './styled'
import FolderTree from './components/FolderTree'
import tableColumns from './column'
import FilterBlock from './components/FilterBlock'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'
import CreateFolderModal from './components/CreateFolderModal'
import EditFileOrFolderModal from './components/EditFileOrFolderModal'

import UploadFileModal from './components/UploadFileModal'
import FolderTreeModal from './components/FolderTreeModal'

const UploadFileImagesScreen = () => {
  const { t } = useTranslation('upload_file')
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
  } = useUploadFileImage()

  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false)
  const [visibleCreateFolder, setVisibleCreateFolder] = useState(false)
  const [currentFileOrFolder, setCurrentFileOrFolder] = useState(null)
  const [currentFolderId, setCurrentFolderId] = useState(null)
  const [isShowLeave, setIsLeave] = useState(false)

  const [visibleUploadFile, setVisibleUploadFile] = useState(false)
  const [modalUpload, setModalUpload] = useState(false)
  const { companyInfo } = useMyCompany()
  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
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
          if (rowSelected.selectedRowKeys.length) {
            setRowSelected({ selectedRowKeys: [], selectedRows: [] })
          } else {
            setFolderSelected([])
          }
        }
      }
    }, TYPE_FILE.IMAGE)
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

  const copyFileOrFolderPath = async (data, fileIds, folId) => {
    const dataUploadFile = { folderId: folId, fileIds: fileIds.map((item) => item.id) }
    try {
      await navigator.clipboard.writeText(decodeURIComponent(data))
      setLocalStorage(STORAGE.UPLOAD_FILE_IMAGE, JSON.stringify(dataUploadFile))
      message.success(t('common:copied'))
    } catch (err) {
      message.error(t('common:failed_to_copy'))
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
        onShowFolderTree,
        onDownload
      },
      data: { folderId: currentFolderId },
      isWorkspaceAdmin
    }),
    [t, setCurrentFileOrFolder, currentFolderId, isWorkspaceAdmin]
  )

  const isExceedPackage = useMemo(() => checkTypeOf(companyInfo.memory) === 'Number'
	&& checkTypeOf(companyInfo.memoryUsed) === 'Number'
	&& companyInfo.memoryUsed >= companyInfo.memory,
  [companyInfo.memory, companyInfo.memoryUsed])

  useEffect(() => {
    if (folderId) {
      getFolderTreeAction({ params: {} })
    } else if (isMoveFile) {
      getFolderFilesAction({ params: { folderId: currentFolderId } })
    } else {
      getFolderTreeAction({ params: {} })
    }
  }, [folderId, isMoveFile])

  return (
    <Wrapper>
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
            createText={t('create_button')}
            uploadText={t('upload_button')}
            onUpload={isExceedPackage ? () => setModalUpload(true) : () => setVisibleUploadFile(true)}
            disabledUpload={isEmpty(selectedFolderFile)}
            onCreate={() => setVisibleCreateFolder(true)}
            onDelete={() => setVisibleConfirmDelete(true)}
            onCopy={() => copyFileOrFolderPath(selectedFolderFile.data?.folderParent, folderFiles, selectedFolderFile.data?.id)}
            disabledCopy={isEmpty(selectedFolderFile.data?.folderParent)}
            copyText={t('copy_button')}
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

export default UploadFileImagesScreen
