/* eslint-disable react/prop-types */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider } from 'react-hook-form'

import { useUploadFile } from 'Hooks'
import { Modal } from 'Components'
import { UPLOAD_FILE_TYPE } from 'Constants'
import { downloadS3File } from 'Utils'
import _ from 'lodash'
import FolderTree from '../FolderTree'

const FolderTreeModal = ({ onClose, visible, title, infoFileCurrent, setShowModalFileMove }) => {
  const {
    folderTree,
    selectedFolderFile,
    getFolderFilesAction,
    moveFileToProjectAction
  } = useUploadFile()
  const { t } = useTranslation(['upload_file'])

  // eslint-disable-next-line no-unused-vars
  const [folderSelected, setFolderSelected] = React.useState([])
  const [currentFolderId, setCurrentFolderId] = React.useState()
  const [folderParent, setFolderParent] = React.useState()
  React.useEffect(() => {
    setCurrentFolderId(String(selectedFolderFile.key))
  }, [visible, selectedFolderFile.key])

  const onSubmit = () => {
    const folderId = _.last(currentFolderId.split('-'))
    const { fileName, id } = infoFileCurrent
    const data = {
      folderId,
      fileName,
      fileId: id,
      folderParent
    }
    moveFileToProjectAction(data)
    setShowModalFileMove(false)
  }

  const handleSelectFolderFile = React.useCallback((params, type) => {
    setFolderParent(params?.data?.folderParent)
    switch (type) {
      case UPLOAD_FILE_TYPE.FOLDER:
        setCurrentFolderId(String(params.key || params?.data?.key))
        break
      case UPLOAD_FILE_TYPE.FILE:
        downloadS3File({
          s3Path: params.filePath,
          fileName: params.fileName,
          id: params.id
        })
        break
      default:
        getFolderFilesAction({ params: {} })
        break
    }
  }, [])

  return (
    <FormProvider>
      <Modal
        visible={visible}
        onClose={onClose}
        title={title}
        onSubmit={onSubmit}
        confirm
        cancel={false}
        onSubmitText={t('common:save')}
        onCancelText={t('common:cancel')}
        confirmTitle={t('edit.move_file')}
        overflow="visible"
      >
        <FolderTree
          treeData={folderTree}
          selectedKey={currentFolderId}
          onSelectFolder={handleSelectFolderFile}
          setFolderSelected={setFolderSelected}
        />
      </Modal>
    </FormProvider>
  )
}

export default FolderTreeModal
