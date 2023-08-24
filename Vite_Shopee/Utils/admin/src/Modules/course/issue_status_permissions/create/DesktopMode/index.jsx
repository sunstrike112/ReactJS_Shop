import { EditOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, Space, Spin, Tree } from 'antd'
import { FormDatePicker, FormLabel, FormRadio, Table, Title, Text, PopupButton } from 'Components'
import { COMPANY_NAME, OPTIONAL_OR_REQUIRED_ANSWER_COURSE } from 'Constants/course'
import { FORMAT_TIME } from 'Constants/formatTime'
import { useAuth, useGetSelect, useValidateRangeDate, useHistories, useRoles } from 'Hooks'
import { useIssuePermission } from 'Hooks/issue_permission'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Divider, Right, Wrapper, Block, Row } from 'Themes/facit'
import { getLocalStorage, STORAGE } from 'Utils'
import { ModalSelectRecipient } from '../../components'
import tableColumns from '../column'
import Schema from './schema'
import { SelectBadge, TitleTree, TreeWrapper } from '../styled'

const DesktopMode = () => {
  // Use hooks
  const { t } = useTranslation(['issue_permission'])
  const history = useHistories()
  const { isHideJobNare } = useRoles()
  const { metaData } = useAuth()
  const { roles } = metaData

  const {
    isSuccessListCategory,
    listCategoryCompany,
    listCategoryNissoken,
    loadListCategoryAction
  } = useGetSelect()
  const {
    createIssuePermissionAction,
    loadListUserSelectedAction,
    listUserSelected,
    pagination,
    isLoadingCreate,
    isLoadingListUserSelected,
    isLoadingCategory,
    clearListUserSelectedAction
  } = useIssuePermission()

  const { total, limit: pageSize, page: currentPage } = pagination
  // End use hooks

  // Use states
  const [isOpenModalSelectRecipients, setIsOpenModalSelectRecipients] = useState(false)
  const [dataList, setDataList] = useState({
    company: [],
    nisooken: []
  })
  const [treeState, setTreeState] = useState({
    companyKeys: [],
    nisookenKeys: [],
    autoExpandParent: true
  })
  const [searchValue, setSearchValue] = useState('')
  const [listUserIds, setListUserIds] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  // End use states

  const form = useForm({
    resolver: yupResolver(Schema(t)),
    defaultValues: {
      listCourseCompanyId: [],
      listCourseNisookenId: [],
      optional_required: OPTIONAL_OR_REQUIRED_ANSWER_COURSE[0].value

    }
  })
  const { handleSubmit, watch, setValue, clearErrors, reset, register, formState: { errors } } = form

  const [
    listCourseCompanyIdWatch,
    listCourseNisookenIdWatch,
    courseStartDateWatch,
    courseEndDateWatch] = watch([
    'listCourseCompanyId',
    'listCourseNisookenId',
    'course_start_date',
    'course_end_date'])

  const listCourseIds = useMemo(() => [...listCourseCompanyIdWatch, ...listCourseNisookenIdWatch],
    [listCourseCompanyIdWatch, listCourseNisookenIdWatch])
  const cleanListCourseIdsWatch = useMemo(() => listCourseIds.filter((item) => typeof item === 'number'), [listCourseIds])

  const { isShowError } = useValidateRangeDate(
    courseStartDateWatch ? new Date(courseStartDateWatch).valueOf() : '',
    courseEndDateWatch ? new Date(courseEndDateWatch).valueOf() : ''
  )

  const handleSelectRecipient = useCallback((selected) => {
    setListUserIds((prevListUserIds) => {
      selected.selectedRows.forEach((userSelected, index, self) => {
        prevListUserIds.selectedRows.forEach((userPrev, indexPrev, selfPrev) => {
          if (userSelected.userId === userPrev.userId) {
            self[index] = selfPrev[indexPrev]
          }
        })
      })
      return selected
    })
  }, [])

  const handleSetRequestPassword = useCallback((e, userId) => {
    const { checked } = e.target
    setListUserIds((prevListUserIds) => {
      const newSelectedRows = [...prevListUserIds.selectedRows]
      const index = newSelectedRows.findIndex((user) => user.userId === userId)
      newSelectedRows[index].isCheckPassword = checked
      return {
        ...prevListUserIds,
        selectedRows: newSelectedRows
      }
    })
  }, [])

  const columns = useMemo(
    () => tableColumns({ t, history, pagination, handleSetRequestPassword }).filter((col) => col.rules.includes(roles?.[0])),
    [t, history, pagination, roles, handleSetRequestPassword]
  )

  const handleCloseModalSelectRecipient = useCallback(() => {
    setIsOpenModalSelectRecipients(false)
  }, [])

  const handleOpenModalSelectRecipient = useCallback(() => {
    setIsOpenModalSelectRecipients(true)
  }, [])

  const handleTableChange = (tablePaging) => {
    loadListUserSelectedAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize
      },
      data: listUserIds.selectedRows.map(({ userId, companyId }) => ({ userId, companyId }))
    })
  }

  const onSubmit = (formData) => {
    const data = {
      required: formData.optional_required
    }
    if (formData.course_start_date) {
      data.startTime = moment(formData.course_start_date, FORMAT_TIME.DATE_HOUR_MINUTES).valueOf()
    }
    if (formData.course_end_date) {
      data.endTime = moment(formData.course_end_date, FORMAT_TIME.DATE_HOUR_MINUTES).valueOf()
    }
    data.listCourseIds = cleanListCourseIdsWatch
    data.listUserIds = listUserIds.selectedRows.map((user) => ({ userId: user.userId, isCheckPassword: Boolean(user.isCheckPassword) }))

    createIssuePermissionAction({ data, history, langCode: getLocalStorage(STORAGE.LANGUAGE) })
  }

  const onCheckCourse = (checkedKeys, type) => {
    if (type === 'NISSOKEN') {
      setValue('listCourseNisookenId', checkedKeys)
    } else {
      setValue('listCourseCompanyId', checkedKeys)
    }
    clearErrors('listCourseIds')
  }

  useEffect(() => {
    const newListCourseIds = [...listCourseNisookenIdWatch, ...listCourseCompanyIdWatch].filter((item) => item !== '-null')
    setValue('listCourseIds', [...listCourseNisookenIdWatch, ...listCourseCompanyIdWatch])
    if (newListCourseIds?.length <= 0) setValue('listCourseIds', [])
  }, [listCourseNisookenIdWatch, listCourseCompanyIdWatch])

  const onExpand = (expandedKeys, type) => {
    if (type === 'NISSOKEN') {
      setTreeState({
        ...treeState,
        nisookenKeys: expandedKeys,
        autoExpandParent: false
      })
    } else {
      setTreeState({
        ...treeState,
        companyKeys: expandedKeys,
        autoExpandParent: false
      })
    }
  }

  const getParentKey = useCallback((key, tree) => {
    let parentKey
    for (let i = 0; i < tree.length; i += 1) {
      const node = tree[i]
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children)
        }
      }
    }
    return parentKey
  }, [])

  const onChange = (e) => {
    const { value } = e.target
    const formatValue = value.trim().toLowerCase()
    if (formatValue) {
      const expandedKeysCompany = dataList.company.map((item) => {
        if (item.title.trim().toLowerCase().indexOf(formatValue) > -1) {
          return getParentKey(item.key, listCategoryCompany)
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i)
      const expandedKeysNissoken = dataList.nisooken.map((item) => {
        if (item.title.trim().toLowerCase().indexOf(formatValue) > -1) {
          return getParentKey(item.key, listCategoryNissoken)
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i)
      setSearchValue(value)
      setTreeState({
        companyKeys: [...expandedKeysCompany],
        nisookenKeys: [...expandedKeysNissoken],
        autoExpandParent: true
      })
    } else {
      setSearchValue('')
      setTreeState({
        companyKeys: [],
        nisookenKeys: [],
        autoExpandParent: false
      })
    }
  }

  const countingNodeData = (children) => children.reduce((acc, cur) => {
    const isChecked = listCourseIds.includes(cur.key)
    if (cur.children) {
      const { totalSelected, totalChildren } = countingNodeData(cur.children)
      acc.totalChildren += totalChildren - 1
      acc.totalSelected += totalSelected - isChecked ? 1 : 0
    }
    if (isChecked) {
      acc.totalSelected += 1
    }
    return acc
  }, { totalSelected: 0, totalChildren: children.length })

  const loop = (data) => data.map((item) => {
    const realTitle = item.title === 'NO_CATEGORY' || item.title === 'No category' ? t('common.no_category') : item.title
    const formatValue = searchValue.trim().toLowerCase()
    const formatRealTitle = realTitle.trim().toLowerCase()
    const index = formatRealTitle.indexOf(formatValue)
    const beforeStr = realTitle.substr(0, index)
    const hitStr = realTitle.substr(index, formatValue.length)
    const afterStr = realTitle.substr(index + formatValue.length)
    const title = (
      index > -1 && formatValue ? (
        <span>
          {beforeStr}
          <span className="site-tree-search-value">{hitStr}</span>
          {afterStr}
        </span>
      ) : (
        <span>{realTitle}</span>
      )
    )
    if (item.children) {
      const { totalSelected, totalChildren } = countingNodeData(item.children)
      return {
        ...item,
        title,
        key: item.key,
        children: loop(item.children),
        totalSelected,
        totalChildren
      }
    }

    return {
      ...item,
      title,
      key: item.key
    }
  })

  const handleClearData = () => {
    reset({
      listCourseCompanyId: [],
      listCourseNisookenId: [],
      optional_required: OPTIONAL_OR_REQUIRED_ANSWER_COURSE[0].value
    })
    setSearchValue('')
    setTreeState({
      companyKeys: [],
      nisookenKeys: [],
      autoExpandParent: true
    })
    setListUserIds({
      selectedRowKeys: [],
      selectedRows: []
    })
    clearListUserSelectedAction({
      data: [],
      pagination: {
        page: 1,
        limit: 100
      },
      filter: {}
    })
  }

  const makeDataList = useCallback((data, array) => {
    for (let i = 0; i < data.length; i += 1) {
      const node = data[i]
      const { key, title } = node
      array.push({ key, title })
      if (node.children) {
        makeDataList(node.children, array)
      }
    }
  }, [])

  useEffect(() => {
    if (!searchValue) {
      setTreeState({
        companyKeys: [],
        nisookenKeys: [],
        autoExpandParent: false
      })
    }
    if (!treeState.companyKeys.length) {
      setTreeState({
        ...treeState,
        companyKeys: [],
        autoExpandParent: false
      })
    }
    if (!treeState.nisookenKeys.length) {
      setTreeState({
        ...treeState,
        nisookenKeys: [],
        autoExpandParent: false
      })
    }
  }, [searchValue])

  useEffect(() => {
    loadListCategoryAction()
    register('listCourseCompanyId', [])
    register('listCourseNisookenId', [])
  }, [])

  useEffect(() => {
    if (isSuccessListCategory) {
      const arrayCompany = []
      const arrayNissoken = []
      makeDataList(listCategoryCompany, arrayCompany)
      makeDataList(listCategoryNissoken, arrayNissoken)
      setDataList({
        company: [...arrayCompany],
        nisooken: [...arrayNissoken]
      })
    }
  }, [isSuccessListCategory])

  useEffect(() => {
    if (!isEmpty(listUserIds.selectedRowKeys)) {
      loadListUserSelectedAction({
        params: {
          page: currentPage || 1,
          limit: pageSize || 100
        },
        data: listUserIds.selectedRows.map(({ userId, companyId }) => ({ userId, companyId }))
      })
    }
  }, [listUserIds.selectedRowKeys, currentPage, pageSize])

  return (
    <>
      <Spin
        spinning={isLoadingCreate}
        size="large"
        wrapperClassName="form-wrapper"
        style={{ width: '100%', height: '100%', marginTop: '25%', display: 'flex' }}
      >
        <Wrapper>
          <Title
            icon={EditOutlined}
            title={t('create.title')}
          />
          <div className="form-wrapper">
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <FormLabel title={t('common.course_start_date')} description="Required" />
                  <Right>
                    <FormDatePicker
                      name="course_start_date"
                      showTime={{ format: FORMAT_TIME.HOUR_MINUTES_LOWER }}
                      format={FORMAT_TIME.FULL_DATE}
                      value={(courseStartDateWatch ? moment(courseStartDateWatch, FORMAT_TIME.FULL_DATE) : null)}
                      placeholder={FORMAT_TIME.FULL_DATE}
                    />
                  </Right>
                </Row>

                <Divider />

                <Row>
                  <FormLabel title={t('common.course_end_date')} description="Optional" />
                  <Right>
                    <FormDatePicker
                      name="course_end_date"
                      showTime={{ format: FORMAT_TIME.HOUR_MINUTES_LOWER }}
                      format={FORMAT_TIME.FULL_DATE}
                      placeholder={FORMAT_TIME.FULL_DATE}
                      forceError={isShowError}
                      value={(courseEndDateWatch ? moment(courseEndDateWatch, FORMAT_TIME.FULL_DATE) : null)}
                      hideError
                    />
                    {
                    isShowError && (
                      <Text.primary color="error_ant" fontSize="size_14">
                        {t('validation.range_date')}
                      </Text.primary>
                    )
                  }
                  </Right>
                </Row>

                <Divider />

                <Row>
                  <FormLabel title={t('common.optional_required')} description="Required" />
                  <Right>
                    <FormRadio
                      t={t}
                      name="optional_required"
                      options={OPTIONAL_OR_REQUIRED_ANSWER_COURSE}
                    />
                  </Right>
                </Row>

                <Divider />

                {/* Select course */}
                <Row>
                  <FormLabel title={t('common.course')} description="Required" />
                  <Right>
                    <Input.Search
                      type="text"
                      onChange={(e) => onChange(e)}
                      value={searchValue}
                      style={{ marginBottom: 16 }}
                    />
                    {
                    isLoadingCategory
                      ? <Spin spinning />
                      : (
                        <>
                          <TreeWrapper>
                            <Text.primary fontWeight="fw_500" color="blue">
                              {COMPANY_NAME.COMPANY}
                            </Text.primary>
                            {listCategoryCompany.length > 0 && (
                            <Tree
                              className="course-selecte-tree"
                              checkable
                              checkedKeys={listCourseCompanyIdWatch}
                              selectable={false}
                              blockNode
                              height={250}
                              virtual={false}
                              onCheck={(checkedKeys) => onCheckCourse(checkedKeys, 'COMPANY')}
                              onExpand={(expandedKeys) => onExpand(expandedKeys, 'COMPANY')}
                              expandedKeys={treeState.companyKeys}
                              autoExpandParent={treeState.autoExpandParent}
                              titleRender={(nodeData) => (
                                <TitleTree>
                                  <div className="course-title">
                                    {nodeData.title}
                                  </div>
                                  {nodeData.totalChildren > 0 && (
                                  <SelectBadge>
                                    {t('common.select_number_total', { number: nodeData.totalSelected, total: nodeData.totalChildren })}
                                  </SelectBadge>
                                  )}
                                </TitleTree>
                              )}
                              treeData={loop(listCategoryCompany)}
                            />
                            )}
                          </TreeWrapper>
                          {!isHideJobNare && (
                          <TreeWrapper>
                            <Text.primary fontWeight="fw_500" color="blue">
                              {COMPANY_NAME.NISSOKEN}
                            </Text.primary>
                            {listCategoryNissoken.length > 0 && (
                            <Tree
                              className="course-selecte-tree"
                              checkable
                              checkedKeys={listCourseNisookenIdWatch}
                              selectable={false}
                              blockNode
                              height={250}
                              virtual={false}
                              onCheck={(checkedKeys) => onCheckCourse(checkedKeys, 'NISSOKEN')}
                              onExpand={(expandedKeys) => onExpand(expandedKeys, 'NISSOKEN')}
                              expandedKeys={treeState.nisookenKeys}
                              autoExpandParent={treeState.autoExpandParent}
                              titleRender={(nodeData) => (
                                <TitleTree>
                                  <div className="course-title">
                                    {nodeData.title}
                                  </div>
                                  {nodeData.totalChildren > 0 && (
                                  <SelectBadge>
                                    {t('common.select_number_total', { number: nodeData.totalSelected, total: nodeData.totalChildren })}
                                  </SelectBadge>
                                  )}
                                </TitleTree>
                              )}
                              treeData={loop(listCategoryNissoken)}
                            />
                            )}
                          </TreeWrapper>
                          )}

                          <SelectBadge>
                            {t('common.items_select_number', { number: cleanListCourseIdsWatch.length })}
                          </SelectBadge>
                        </>
                      )
                  }
                    {(errors?.listCourseIds?.message)
                  && (
                    <Text.primary color="error_ant" fontSize="size_14">
                        {errors?.listCourseIds?.message}
                    </Text.primary>
                  )}
                  </Right>
                </Row>
                <Divider />
                <div className="form-action-group">
                  <Space>
                    <Button htmlType="button" onClick={handleClearData}>{t('common:clear')}</Button>
                    <PopupButton
                      icon={EditOutlined}
                      titlePopup={t('create.confirm')}
                      textButton={t('common.issue')}
                      disabled={isLoadingCreate || listUserIds.selectedRowKeys.length <= 0 || isShowError}
                      okText={t('common.issue')}
                      cancelText={t('common:cancel')}
                      onConfirm={handleSubmit(onSubmit)}
                    />
                  </Space>
                </div>
              </form>
            </FormProvider>
          </div>

          <Block>
            <div className="block-head">
              <div className="left">
                <h2>{t('common.recipient_list')}</h2>
              </div>
              <div className="right">
                <Button
                  type="primary"
                  size="large"
                  onClick={handleOpenModalSelectRecipient}
                >
                  {isEmpty(listUserIds.selectedRowKeys) ? t('common.select_recipients') : t('common.reselect_recipients')}
                </Button>
              </div>
            </div>
            <Table
              locale={{ emptyText: t('common:empty_data') }}
              rowKey={(record) => record.userId}
              dataSource={listUserSelected}
              columns={columns}
              total={total}
              currentPage={currentPage}
              pageSize={pageSize}
              onChange={handleTableChange}
              loading={isLoadingListUserSelected}
              pagination={Boolean(listUserIds.selectedRows.length)}
              isHideDelete
            />
          </Block>

          <ModalSelectRecipient
            visible={isOpenModalSelectRecipients}
            onClose={handleCloseModalSelectRecipient}
            handleSelectRecipient={handleSelectRecipient}
            listUserIds={listUserIds}
          />
        </Wrapper>
      </Spin>
    </>

  )
}

export default DesktopMode
