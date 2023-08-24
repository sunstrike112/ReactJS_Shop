/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Tree, Space, Spin } from 'antd'
import {
  PlusOutlined,
  ClearOutlined,
  TeamOutlined
} from '@ant-design/icons'

import { Title } from 'Components'
import { useGroupAttribute } from 'Hooks/user'
import { mapDeepGroupKey, mapDeepGroupTree } from 'Utils'
import { sortBy } from 'lodash'
import { Wrapper } from 'Themes/facit'
import { getGroups } from 'APIs'
import {
  TreeWrapper
} from './styled'
import FilterBlock from './components/FilterBlock'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'
import CreateGroupModal from './components/CreateGroupModal'
import EditGroupModal from './components/EditGroupModal'

const GroupManagementScreen = () => {
  const { t } = useTranslation(['user'])
  const {
    groups,
    groupsTree,
    loadGroupsAction,
    createGroupAction,
    updateGroupAction,
    deleteGroupsAction,
    isLoading
  } = useGroupAttribute()

  const [visibleCreateGroup, setVisibleCreateGroup] = useState(false)
  const [currentGroup, setCurrentGroup] = useState(null)
  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false)
  const [checkedKeys, setCheckedKeys] = useState([])
  const [departmentId, setDepartmentId] = useState([])
  const [treeState, setTreeState] = useState([])
  const [isReloading, setIsReloading] = useState(false)
  const [groupsData, setGroups] = useState(null)

  const [isCheckAll, setIsCheckAll] = useState(false)
  // All department ids
  const ids = useMemo(() => mapDeepGroupTree(treeState), [treeState])

  const handleConfirmDelete = useCallback(() => {
    deleteGroupsAction({
      data: {
        departmentId
      }
    })
    setVisibleConfirmDelete(false)
    setDepartmentId([])
    setIsReloading(true)
  }, [departmentId])

  // eslint-disable-next-line no-unused-vars
  const onCheck = useCallback((checkedKeysValue, { checkedNodes, node }) => {
    const { checked, key, children, data } = node
    const newCheckedKeys = [...checkedKeys]
    const newDepartmentId = [...departmentId]
    if (!checked) {
      newCheckedKeys.push(key)
      newDepartmentId.push(data.departmentId)
      if (children.length) {
        children.map(({ key: keyChildren, data: dataChildren }) => {
          const indexItem = newCheckedKeys.findIndex((item) => item === keyChildren)
          if (indexItem === -1) {
            newCheckedKeys.push(keyChildren)
            newDepartmentId.push(dataChildren.departmentId)
          }
          return null
        })
      }
    } else {
      newCheckedKeys.splice(newCheckedKeys.findIndex((item) => item === key), 1)
      newDepartmentId.splice(newDepartmentId.findIndex((item) => item === data.departmentId), 1)
      if (children.length) {
        children.map(({ key: keyChildren, data: dataChildren }) => {
          const indexItem = newCheckedKeys.findIndex((item) => item === keyChildren)
          const indexIds = newDepartmentId.findIndex((item) => item === dataChildren.departmentId)
          if (indexItem !== -1) {
            newCheckedKeys.splice(indexItem, 1)
          }
          if (indexIds !== -1) {
            newDepartmentId.splice(indexIds, 1)
          }
          return null
        })
      }
    }
    setCheckedKeys([...newCheckedKeys])
    setDepartmentId([...newDepartmentId])
  }, [departmentId, checkedKeys])

  const onCheckAll = useCallback(() => {
    if (isCheckAll) {
      setCheckedKeys([])
      setDepartmentId([])
    } else {
      const keys = mapDeepGroupKey(groupsTree)
      setCheckedKeys([...keys])
      setDepartmentId([...ids])
    }
    setIsCheckAll(!isCheckAll)
  }, [isCheckAll, setIsCheckAll, ids])
  const resetCheckWhenFilter = () => {
    setCheckedKeys([])
    setDepartmentId([])
    setIsCheckAll(false)
  }

  const handleVisibleCreateModal = async () => {
    const { data: groupData } = await getGroups({ params: {} })
    if (groupData) {
      setGroups(groupData)
      setVisibleCreateGroup(true)
      setIsReloading(false)
    }
  }

  const moreMenuButton = () => (
    <Button
      onClick={() => {
        setVisibleConfirmDelete(true)
        setIsReloading(false)
      }}
      disabled={departmentId.length === 0}
    >
      <ClearOutlined />
      <span style={{ marginRight: '.5rem' }}>&nbsp;{t('common:delete_all')}</span>
    </Button>
  )

  useEffect(() => {
    if (groupsTree) {
      setTreeState(groupsTree)
    }
  }, [groups])

  return (
    <Wrapper>
      <Title
        icon={TeamOutlined}
        title={t('group.title')}
      />
      <FilterBlock
        t={t}
        setTreeState={setTreeState}
        groupsTree={groupsTree}
        resetCheckWhenFilter={resetCheckWhenFilter}
        isReloading={isReloading}
        loadGroupsAction={loadGroupsAction}
      />
      <Spin spinning={isLoading}>
        <TreeWrapper>
          <div className="table-head">
            <div className="table-head-left">
              <div className="content">
                <strong className="title">
                  <span>&nbsp;{t('common:list')}</span>
                  <small className="record-counting"><b>{t('common:item')}: {departmentId.length > 0 && `${departmentId.length} /`} {ids.length}</b></small>
                </strong>
              </div>
            </div>
            <div className="table-head-right">
              <Space>
                <Button icon={<PlusOutlined />} className="create" onClick={handleVisibleCreateModal}>{t('group.create_button')}</Button>
                <Button
                  disabled={treeState?.length === 0}
                  className={treeState?.length === 0 ? 'disabled' : 'order'}
                  onClick={onCheckAll}
                >
                  {t('group.select_button')}
                </Button>
                {moreMenuButton()}
              </Space>
            </div>
          </div>
          {treeState?.length === 0 && (
            <div style={{ textAlign: 'center', color: 'silver' }}>
              {t('common:noOption')}
            </div>
          )}
          <Tree
            className="tree-body"
            checkable
            selectable={false}
            autoExpandParent
            blockNode
            checkStrictly
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={sortBy(treeState, ['key'])}
            titleRender={({ title, data }) => (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <div>{title}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={(e) => {
                    e.stopPropagation()
                    setCurrentGroup(data)
                    setIsReloading(false)
                  }}
                  >
                    {t('group.edit_button')}
                  </Button>
                </div>
              </div>
            )}
          />
        </TreeWrapper>
      </Spin>
      {visibleCreateGroup && (
        <CreateGroupModal
          groupOptions={groupsData || groups}
          visible={visibleCreateGroup}
          onClose={setVisibleCreateGroup}
          addNewGroup={createGroupAction}
          setIsReloading={setIsReloading}
        />
      )}

      {!!currentGroup && (
        <EditGroupModal
          source={currentGroup}
          groupOptions={groups}
          visible={!!currentGroup}
          onClose={setCurrentGroup}
          updateGroup={updateGroupAction}
          setIsReloading={setIsReloading}
        />
      )}

      <ConfirmDeleteModal
        t={t}
        isVisible={visibleConfirmDelete}
        onSubmit={handleConfirmDelete}
        setIsVisble={setVisibleConfirmDelete}
        numberOfSelectedRecord={departmentId.length}
        disabledSubmit={false}
        setIsReloading={setIsReloading}
      />
    </Wrapper>
  )
}

export default GroupManagementScreen
