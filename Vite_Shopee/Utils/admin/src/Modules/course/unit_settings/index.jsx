import {
  EditOutlined,
  FormOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import { Table, Title } from 'Components'
import { UNIT_TYPE } from 'Constants/course'
import { downloadUnitSettingsCSV } from 'APIs'
import { useLoadUnitSetting, useRoles, useLoadCompanyAll, useAuth, useHistories, useGetQuery, useWebview } from 'Hooks'
import { RoutesName } from 'Modules/course/routes'
import { QUERY } from 'Constants'
import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Wrapper } from 'Themes/facit'
import tableColumns from './column'
import {
  ConfirmDeleteModal,
  CreateReportModal,
  CreateTestModal,
  FilterBlock,
  SortModal
} from './components'
import { Text } from './styled'
import { RoutesName as RoutesNameSideBar } from '../../../Components/sideBarWebview/constant'

const UnitSettingsScreen = () => {
  // Use hooks
  const { t } = useTranslation(['unit_setting'])
  const history = useHistories()
  const { queryWorkspaceID } = useGetQuery()
  const {
    unitLessons,
    pagination,
    filter,
    courseId,
    selectedCourse,
    isLoading,
    loadListUnitLessonAction,
    loadListOrderUnitLessonAction,
    deleteListUnitLessonAction,
    selectCourseIdAction
  } = useLoadUnitSetting()
  const { isSuperAdmin } = useRoles()
  const { metaData } = useAuth()
  const { roles } = metaData
  const { companyAll } = useLoadCompanyAll()
  const { isWebviewMode } = useWebview()
  const { idOfNissokenCompany } = companyAll
  const { total, limit: pageSize, page: currentPage } = pagination
  // End use hooks

  // Use states
  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false)
  const [visibleCreateTestModal, setVisibleCreateTestModal] = useState(false)
  const [visibleCreateReportModal, setVisibleCreateReportModal] = useState(false)
  const [visibleSortModal, setVisibleSortModal] = useState(false)
  const [csvLoading, setCsvLoading] = useState(false)
  const [filterDownloadCSV, setFilterDownloadCSV] = useState()
  // End use state

  const handleRedirectDetail = (record) => {
    const { created } = record
    switch (record.unitTypeName) {
      case UNIT_TYPE.LESSON.toUpperCase():
        history.push(`${RoutesName.EDIT_LECTURE_UNIT_SETTINGS}/${courseId}/${record.id}?${QUERY.CREATE_BY}=${created}`)
        break
      case UNIT_TYPE.TEST.toUpperCase():
        history.push(`${RoutesName.TEST_DETAIL}/${courseId}/${record.unitId}?${QUERY.CREATE_BY}=${created}`)
        break
      case UNIT_TYPE.SURVEY.toUpperCase():
        history.push(`${RoutesName.EDIT_UNIT_SURVEY}/${courseId}/${record.unitId}?${QUERY.CREATE_BY}=${created}`)
        break
      case UNIT_TYPE.REPORT.toUpperCase():
        history.push(`${RoutesName.REPORT_DETAIL}/${record.unitId}?${QUERY.CREATE_BY}=${created}`)
        break
      default:
        break
    }
  }

  const columns = useMemo(
    () => tableColumns({ t, pagination, handleRedirectDetail, isSuperAdmin })
      .filter((col) => col.rules.includes(roles?.[0])),
    [t, pagination, roles, isSuperAdmin]
  )

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({ selectedRowKeys, selectedRows })

  const handleTableChange = (tablePaging) => {
    if (courseId) {
      loadListUnitLessonAction({
        courseId,
        params: {
          page: tablePaging.current,
          limit: tablePaging.pageSize,
          filter
        }
      })
    }
  }

  const handleConfirmDelete = () => {
    deleteListUnitLessonAction({
      courseId,
      pageSize,
      currentPage,
      data: {
        ids: rowSelected.selectedRowKeys
      }
    })
    setVisibleConfirmDelete(false)
    setRowSelected({ selectedRowKeys: [], selectedRows: [] })
  }

  const actionMenu = useMemo(
    () => (
      <Menu>
        <Menu.Item key="0">
          <Link
            to={`${RoutesName.CREATE_LECTURE_UNIT_SETTINGS}/${courseId}${queryWorkspaceID.ONLY}`}
          >
            <Text icon={<FormOutlined />} onClick={(e) => e.preventDefault()}>
              {t('common:lesson')}
            </Text>
          </Link>
        </Menu.Item>
        <Menu.Item key="1" onClick={() => setVisibleCreateTestModal(true)}>
          <Text icon={<FormOutlined />}>
            {t('common:test')}
          </Text>
        </Menu.Item>
        <Menu.Item key="2">
          <Link
            to={`${RoutesName.CREATE_UNIT_SURVEY}/${courseId}${queryWorkspaceID.ONLY}`}
          >
            <Text icon={<FormOutlined />} onClick={(e) => e.preventDefault()}>
              {t('common:survey')}
            </Text>
          </Link>
        </Menu.Item>
        <Menu.Item key="3" onClick={() => setVisibleCreateReportModal(true)}>
          <Text icon={<FormOutlined />}>
            {t('common:report')}
          </Text>
        </Menu.Item>
      </Menu>
    ),
    [courseId, t]
  )

  useEffect(() => {
    if (courseId) {
      loadListUnitLessonAction({
        params: {
          page: 1,
          limit: pageSize || 100
        }
      })
      if (!isSuperAdmin || (isSuperAdmin && selectedCourse?.companyId?.value === 1)) {
        loadListOrderUnitLessonAction()
      }
    }
  }, [courseId, isSuperAdmin, selectedCourse])

  const showActions = useMemo(() => !isSuperAdmin
    || (isSuperAdmin && selectedCourse.companyId?.value === idOfNissokenCompany)
    || (isSuperAdmin && selectedCourse.data?.companyId === idOfNissokenCompany),
  [isSuperAdmin, selectedCourse, unitLessons])

  const onDownloadCSV = useCallback(() => {
    let data = rowSelected.selectedRows.length
      ? rowSelected.selectedRows.map((item) => (item.id))
      : []
    setCsvLoading(true)
    downloadUnitSettingsCSV({ courseId, data }).finally(() => setCsvLoading(false))
  },
  [filterDownloadCSV, rowSelected.selectedRows])

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('unit_setting:title')}
        backRoute={isWebviewMode && `${RoutesNameSideBar.HOME}${queryWorkspaceID.ONLY}`}
        backRouteText=""
        active={isWebviewMode}
      />
      <FilterBlock
        selectedCourse={selectedCourse}
        handleSelectCourseId={(option, companyId) => {
          const selected = { ...option, data: JSON.parse(option.data), companyId }
          setRowSelected({ selectedRowKeys: [], selectedRows: [] })
          selectCourseIdAction(selected)
        }}
        isSuperAdmin={isSuperAdmin}
        companyAll={companyAll}
        selectCourseIdAction={selectCourseIdAction}
        setFilterDownloadCSV={setFilterDownloadCSV}
      />
      {courseId && (
        <>
          <Table
            locale={{ emptyText: t('common:empty_data') }}
            rowSelection={{
              selectedRowKeys: rowSelected.selectedRowKeys,
              onChange: onSelectChange,
              preserveSelectedRowKeys: true
            }}
            rowKey={(record) => record.id}
            dataSource={unitLessons}
            columns={columns}
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            onChange={handleTableChange}
            loading={isLoading}
            selected={rowSelected.selectedRowKeys.length}
            onCreate={() => history.push(RoutesName.CREATE_COURSE)}
            onOrder={() => setVisibleSortModal(true)}
            onDelete={() => setVisibleConfirmDelete(true)}
            isHideDelete={!showActions}
            createTextDropdown={showActions && t('register_unit')}
            orderText={showActions && t('update_order')}
            overlayDropdown={actionMenu}
            csv={{
              text: t('common:download_csv'),
              onDownload: onDownloadCSV,
              loading: csvLoading || isLoading
            }}
            width="100%"
          />
          <ConfirmDeleteModal
            t={t}
            isVisible={visibleConfirmDelete}
            onSubmit={handleConfirmDelete}
            setIsVisble={setVisibleConfirmDelete}
            numberOfSelectedRecord={rowSelected.selectedRows.length}
            disabledSubmit={false}
          />
          <CreateTestModal
            visible={visibleCreateTestModal}
            onClose={setVisibleCreateTestModal}
            courseId={courseId}
          />
          {visibleCreateReportModal && (
            <CreateReportModal
              visible={visibleCreateReportModal}
              onClose={setVisibleCreateReportModal}
              courseId={courseId}
            />
          )}
          {visibleSortModal && (
            <SortModal
              visible={visibleSortModal}
              onClose={setVisibleSortModal}
              pageSize={pageSize}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </Wrapper>
  )
}

export default UnitSettingsScreen
