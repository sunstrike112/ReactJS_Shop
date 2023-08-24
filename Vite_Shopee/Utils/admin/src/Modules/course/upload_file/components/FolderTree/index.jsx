/* eslint-disable no-unused-vars */

import React, { useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Tree } from 'antd'

import { UPLOAD_FILE_TYPE } from 'Constants/upload_file'
import { Wrapper } from './styled'

const FolderTree = ({
  treeData,
  selectedKey,
  onSelectFolder,
  setFolderSelected
}) => {
  const [expandedKeys, setExpandedKeys] = useState([])
  const [autoExpandParent, setAutoExpandParent] = useState(false)
  useEffect(() => {
    if (selectedKey) {
      setExpandedKeys([selectedKey])
    } else {
      setExpandedKeys([])
    }
    setAutoExpandParent(true)
  }, [selectedKey])

  const handleSelectFolder = useCallback((key, info) => {
    let keyStr = key[0]
    if (keyStr.includes('-')) {
      setFolderSelected([+(keyStr.substr(keyStr.lastIndexOf('-') + 1, keyStr.length - 1))])
    } else {
      setFolderSelected([+keyStr])
    }
    if (key[0] === expandedKeys[0]) {
      keyStr = keyStr.substr(0, keyStr.lastIndexOf('-'))
    }
    setExpandedKeys([keyStr])
    onSelectFolder(info?.selectedNodes[0], UPLOAD_FILE_TYPE.FOLDER)
    setAutoExpandParent(true)
  }, [selectedKey, expandedKeys])

  const handleExpandFolder = useCallback((key) => {
    setExpandedKeys(key)
    setAutoExpandParent(false)
  }, [selectedKey, expandedKeys])

  return (
    <Wrapper>
      <Tree.DirectoryTree
        selectedKeys={[selectedKey]}
        autoExpandParent={autoExpandParent}
        expandedKeys={expandedKeys}
        onSelect={handleSelectFolder}
        onExpand={handleExpandFolder}
        treeData={treeData}
      />
    </Wrapper>
  )
}

FolderTree.propTypes = {
  treeData: PropTypes.array,
  onSelectFolder: PropTypes.func,
  selectedKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setFolderSelected: PropTypes.func
}

export default FolderTree
