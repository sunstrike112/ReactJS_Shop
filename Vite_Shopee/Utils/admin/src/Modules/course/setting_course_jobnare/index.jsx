import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth, useLoadCourseAssignment, useLoadCourseCategory, useSettingCourseJobnare } from 'Hooks'

import { EditOutlined } from '@ant-design/icons'
import { Title, Table } from 'Components'
import { Wrapper } from 'Themes/facit'
import { COURSE_TYPE } from 'Constants'
import { DEFAULT_PAG } from 'Utils'
import { AutoAssignWrapper, SelectCourse, ConfirmDeleteModal, FilterBlock } from './component'
import tableColumns from './column'

const SettingCourseJobnare = () => {
  const { t } = useTranslation(['settingCourseJobnare'])

  const {
    isLoading,
    isAdding,
    isDeleting,
    pagination,
    loadExceptCourseAction,
    loadExceptAllCourseAction,
    addExceptCourseAction,
    deleteExceptCourseAction,
    coursesExcept,
    coursesExceptAll
  } = useSettingCourseJobnare()
  const { loadCourseCategoryAction } = useLoadCourseCategory()
  const { loadCourseAssignmentAction } = useLoadCourseAssignment()
  const { metaData } = useAuth()
  const { roles } = metaData
  const { page, limit, total } = pagination

  const [visibleSelectCourse, setVisibleSelectCourse] = useState(false)
  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false)
  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const columns = useMemo(
    () => tableColumns({ t, pagination }).filter((col) => col.rules?.includes(roles?.[0])),
    [t, pagination, roles]
  )

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const handleConfirmDelete = () => {
    deleteExceptCourseAction({
      data: {
        ids: rowSelected.selectedRowKeys
      },
      callback: {
        done: () => {
          setRowSelected({
            selectedRowKeys: [],
            selectedRows: []
          })
          setVisibleConfirmDelete(false)
          loadExceptCourseAction({ params: { page, limit } })
          loadExceptAllCourseAction({ params: { ...DEFAULT_PAG, limit: null } })
          loadCourseAssignmentAction({ params: { ...DEFAULT_PAG, isJobnare: true, filter: { courseType: COURSE_TYPE.NISSOKEN } } })
        }
      }
    })
  }

  const handleOnChange = (tablePaging) => {
    loadExceptCourseAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize
      }
    })
  }

  useEffect(() => {
    loadExceptCourseAction({ params: DEFAULT_PAG })
    loadExceptAllCourseAction({ params: { ...DEFAULT_PAG, limit: null } })
    loadCourseAssignmentAction({ params: { ...DEFAULT_PAG, isJobnare: true, filter: { courseType: COURSE_TYPE.NISSOKEN } } })
    loadCourseCategoryAction({ params: { courseType: COURSE_TYPE.NISSOKEN } })
  }, [])

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('menu:setting_course_jobnare')}
      />
      <AutoAssignWrapper t={t} />
      <FilterBlock t={t} limit={limit} setRowSelected={setRowSelected} loadExceptCourseAction={loadExceptCourseAction} />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        rowKey={(record) => record.courseId}
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true
        }}
        columns={columns}
        dataSource={coursesExcept}
        total={total}
        pageSize={limit}
        currentPage={page}
        onChange={handleOnChange}
        noteText={t('except_course')}
        createText={t('common:add')}
        onCreate={() => setVisibleSelectCourse(true)}
        selected={rowSelected.selectedRowKeys.length}
        onDelete={() => setVisibleConfirmDelete(true)}
        loading={isLoading}
      />
      {visibleConfirmDelete && (
      <ConfirmDeleteModal
        t={t}
        isVisible={visibleConfirmDelete}
        onSubmit={handleConfirmDelete}
        setIsVisible={setVisibleConfirmDelete}
        numberOfSelectedRecord={rowSelected.selectedRows.length}
        disabledSubmit={false}
        isDeleting={isDeleting}
      />
      )}
      {visibleSelectCourse && (
      <SelectCourse
        t={t}
        visible={visibleSelectCourse}
        setVisible={setVisibleSelectCourse}
        addExceptCourseAction={addExceptCourseAction}
        loadExceptCourseAction={loadExceptCourseAction}
        loadExceptAllCourseAction={loadExceptAllCourseAction}
        isAdding={isAdding}
        coursesExceptAll={coursesExceptAll}
      />
      )}
    </Wrapper>
  )
}

export default SettingCourseJobnare
