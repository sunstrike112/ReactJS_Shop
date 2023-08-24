/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useMemo, useState } from 'react'
import { Table, Text, Title } from 'Components'
import { Block, Wrapper } from 'Themes/facit'
import { useSelectRecipient } from 'Hooks'
import { Button, Col, Row, Tree } from 'antd'
import { normailizeGroupTree, normailizeAttributeTree } from 'Utils'
import { RowBetWeen } from './styled'
import tableColumns from './columnUsers'
import FilterBlock from './FilterBlock'

const TYPES = {
  GROUPS: 'GROUPS',
  ATTRIBUTE: 'ATTRIBUTE'
}

const SelectUsers = (props) => {
  // Props
  const { t, setIsSelectRecipientOnMobile, roles, handleSelectRecipient, listUserIds } = props

  // Use hooks
  const {
    loadListAttributeAction,
    loadListGroupAction,
    loadListUserAction,
    listAttribute,
    listGroup,
    listUser,
    paginationListUser,
    filterListUser,
    isLoadingListUser
  } = useSelectRecipient()
  const { total, limit: pageSize, page: currentPage } = paginationListUser

  // Use states
  const [rowSelected, setRowSelected] = useState(JSON.parse(JSON.stringify(listUserIds)))
  const [usersLoaded, setUsersLoaded] = useState(false)
  const [titleGrOrAtt, setTitleGrOrAtt] = useState('')
  // End use states

  const columns = useMemo(
    () => tableColumns({ t, pagination: paginationListUser }).filter((col) => col.rules.includes(roles?.[0])),
    [t, paginationListUser, roles]
  )

  useEffect(() => {
    loadListAttributeAction({})
    loadListGroupAction({})
  }, [])

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    // Issue the same here: https://github.com/ant-design/ant-design/issues/7942#issuecomment-637214656
    const tmpSelectedRows = rowSelected.selectedRows.concat(selectedRows).filter((item) => item !== undefined)
    const totalSelectedRows = selectedRowKeys.map((key) => tmpSelectedRows.filter((item) => item.userId === key)[0])
    setRowSelected({
      selectedRowKeys,
      selectedRows: totalSelectedRows
    })
  }

  const handleTableChange = (tablePaging) => {
    loadListUserAction({
      params: {
        ...filterListUser,
        page: tablePaging.current,
        limit: tablePaging.pageSize
      }
    })
  }

  const renderTitle = () => {
    if (titleGrOrAtt) return titleGrOrAtt
    return 'common.select_recipients'
  }

  const goBack = () => {
    if (usersLoaded) {
      setUsersLoaded(false)
      setTitleGrOrAtt()
      setRowSelected(JSON.parse(JSON.stringify(listUserIds)))
    } else {
      setIsSelectRecipientOnMobile(false)
    }
  }

  const onSelectedRecipients = () => {
    handleSelectRecipient(rowSelected)
    setUsersLoaded(false)
    setTitleGrOrAtt()
  }

  const loadUserByGrOrAtt = (id, name, type) => {
    const result = [id]
    if (type === TYPES.GROUPS) {
      loadListUserAction({
        params: {
          page: 1,
          limit: 20,
          listDepartmentIds: result
        }
      })
    } else {
      loadListUserAction({
        params: {
          page: 1,
          limit: 20,
          listAttributeIds: result
        }
      })
    }
    setUsersLoaded(true)
    setTitleGrOrAtt(name)
  }

  return (
    <Wrapper>
      <Title
        title={t(renderTitle())}
        onBackWithoutRoute={goBack}
      />
      <Block>
        {usersLoaded ? (
          <>
            <Table
              rowSelection={{
                selectedRowKeys: rowSelected.selectedRowKeys,
                onChange: onSelectChange,
                preserveSelectedRowKeys: true
              }}
              locale={{ emptyText: t('common:empty_data') }}
              rowKey={(record) => record.userId}
              dataSource={listUser}
              columns={columns}
              total={total}
              currentPage={currentPage}
              pageSize={pageSize}
              onChange={handleTableChange}
              loading={isLoadingListUser}
              isHideDelete
              showButtonCreate={false}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={onSelectedRecipients}>
                {t('common:select')}
              </Button>
            </div>

          </>
        ) : (
          <>
            <FilterBlock
              t={t}
              listGroup={listGroup}
              listAttribute={listAttribute}
              loadListUserAction={loadListUserAction}
              setRowSelected={setRowSelected}
              setUsersLoaded={setUsersLoaded}
            />
            <Text.primary fontSize="size_18" fontWeight="fw_500">{t('select_user.group')}</Text.primary>
            <Tree
              className="tree-body"
              blockNode
              selectable={false}
              treeData={normailizeGroupTree(listGroup)}
              titleRender={(group) => (
                <RowBetWeen onClick={(e) => {
                  e.stopPropagation()
                  loadUserByGrOrAtt(group.data.departmentId, group.data.name, TYPES.GROUPS)
                }}
                >
                  <Text.primary className="name" fontSize="size_14">{group.title}</Text.primary>
                </RowBetWeen>
              )}
            />
            <Text.primary fontSize="size_18" fontWeight="fw_500">{t('select_user.attribute')}</Text.primary>
            <Tree
              className="tree-body"
              blockNode
              selectable={false}
              treeData={normailizeAttributeTree(listAttribute)}
              titleRender={(attribute) => (
                <RowBetWeen onClick={(e) => {
                  e.stopPropagation()
                  loadUserByGrOrAtt(attribute.data.attributeId, attribute.data.attributeName, TYPES.ATTRIBUTE)
                }}
                >
                  <Text.primary className="name" fontSize="size_14">{attribute.title}</Text.primary>
                </RowBetWeen>
              )}
            />
          </>
        )}
      </Block>
    </Wrapper>
  )
}

export default memo(SelectUsers)
