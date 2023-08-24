/* eslint-disable react/prop-types */
import React, { useMemo, useState } from 'react'
import { ModalNonForm, Table } from 'Components'
import { useLoadCourseAssignment } from 'Hooks'
import { COURSE_TYPE } from 'Constants'
import { DEFAULT_PAG } from 'Utils'
import { FilterBlockSelectCourse } from '..'

const SelectCourse = ({
  setVisible,
  visible,
  t,
  addExceptCourseAction,
  isAdding,
  coursesExceptAll,
  loadExceptCourseAction,
  loadExceptAllCourseAction
}) => {
  const {
    loadCourseAssignmentAction,
    courseAssignment,
    pagination,
    filter,
    isLoading
  } = useLoadCourseAssignment()

  const dataSourceCourse = useMemo(() => courseAssignment, [courseAssignment])

  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const columns = useMemo(
    () => [
      {
        title: 'No.',
        align: 'right',
        width: 60,
        render: (text, record, index) => (
          <div>{(pagination.page - 1) * pagination.limit + index + 1}</div>
        )
      },
      {
        title: t('common:course'),
        dataIndex: 'courseName',
        key: 'courseName',
        width: 200,
        ellipsis: true
      },
      {
        title: t(
          'course:registration_course.management.course_category_name'
        ),
        dataIndex: 'categoryName',
        key: 'categoryName',
        ellipsis: true
      },
      {
        title: t('course_type'),
        dataIndex: 'courseType',
        key: 'courseType',
        width: 150,
        ellipsis: true
      }
    ],
    [t, pagination]
  )

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setRowSelected({
      selectedRowKeys,
      selectedRows
    })
  }

  const handleOnChange = (tablePaging) => {
    loadCourseAssignmentAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        isJobnare: true,
        filter
      }
    })
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleAddCourseExcept = () => {
    addExceptCourseAction({
      ids: coursesExceptAll.map(({ courseId }) => courseId).concat(rowSelected.selectedRowKeys),
      callback: { done: () => {
        handleCancel()
        loadExceptCourseAction({ params: DEFAULT_PAG })
        loadCourseAssignmentAction({ params: { ...DEFAULT_PAG, isJobnare: true, filter: { courseType: COURSE_TYPE.NISSOKEN } } })
        loadExceptAllCourseAction({ params: { ...DEFAULT_PAG, limit: null } })
      } }
    })
  }

  return (
    <ModalNonForm
      visible={visible}
      onCancel={handleCancel}
      title={t('title')}
      isNotFooterButton
    >
      <FilterBlockSelectCourse
        t={t}
        setRowSelected={setRowSelected}
      />
      <Table
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true
        }}
        rowKey={({ courseId }) => courseId}
        locale={{ emptyText: t('common:empty_data') }}
        dataSource={dataSourceCourse}
        columns={columns}
        total={pagination.total}
        pageSize={pagination.limit}
        currentPage={pagination.page}
        onChange={handleOnChange}
        selected={rowSelected.selectedRowKeys.length}
        createText={t('common:select')}
        onCreate={handleAddCourseExcept}
        loadingOnCreate={isAdding}
        loading={isLoading}
        width="100%"
        isHideDelete
      />
    </ModalNonForm>
  )
}

export default SelectCourse
