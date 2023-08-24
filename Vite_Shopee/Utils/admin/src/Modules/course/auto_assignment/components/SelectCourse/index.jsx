/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { ModalNonForm, Table } from 'Components'
import { useLoadCourseCategory, useLoadCourseAssignment } from 'Hooks'
import { FilterBlockSelectCourse } from '..'

const SelectCourse = ({ setVisible, visible, t, setCourse, course }) => {
  const { loadCourseCategoryAction } = useLoadCourseCategory()
  const {
    loadCourseAssignmentAction,
    courseAssignment,
    pagination,
    filter,
    isLoading
  } = useLoadCourseAssignment()

  const dataSourceCourse = useMemo(() => courseAssignment, [courseAssignment])

  const [rowSelected, setRowSelected] = useState(JSON.parse(JSON.stringify(course)))

  useEffect(() => {
    loadCourseCategoryAction({
      params: {
        courseType: 'COMPANY'
      }
    })
  }, [])

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
        title: t('select_course.course_type'),
        dataIndex: 'courseType',
        key: 'courseType',
        width: 150,
        ellipsis: true
      }
    ],
    [t, pagination]
  )

  const onSelectChange = useCallback((selectedRowKeys, selectedRows) => {
    for (let i = 0; i < selectedRowKeys.length; i += 1) {
      for (let j = 0; j < course.selectedRowKeys.length; j += 1) {
        if (selectedRowKeys[i] === course.selectedRowKeys[j]) {
          selectedRows[i] = course.selectedRows[j]
        }
      }
    }
    setRowSelected({
      selectedRowKeys,
      selectedRows
    })
  }, [rowSelected])

  const handleOnChange = (tablePaging) => {
    loadCourseAssignmentAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        filter
      }
    })
  }

  const handleCancel = () => {
    setVisible(false)
    loadCourseAssignmentAction({ params: { limit: 100, page: 1, filter: { courseType: 'COMPANY' } } })
  }

  const handleSelectCourse = () => {
    setCourse(JSON.parse(JSON.stringify(rowSelected)))
    setVisible(false)
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
    loadCourseAssignmentAction({ params: { limit: 100, page: 1, filter: { courseType: 'COMPANY' } } })
  }

  return (
    <>
      <ModalNonForm
        visible={visible}
        onCancel={() => handleCancel()}
        title={t('select_course.title')}
        isNotFooterButton
      >
        <FilterBlockSelectCourse t={t} setRowSelected={setRowSelected} />
        <Table
          rowSelection={{
            selectedRowKeys: rowSelected.selectedRowKeys,
            onChange: onSelectChange,
            preserveSelectedRowKeys: true
          }}
          rowKey={(record) => record.courseId}
          locale={{ emptyText: t('common:empty_data') }}
          dataSource={dataSourceCourse}
          columns={columns}
          total={pagination.total}
          pageSize={pagination.limit}
          currentPage={pagination.page}
          onChange={handleOnChange}
          selected={rowSelected.selectedRowKeys.length}
          createText={t('common:select')}
          onCreate={() => handleSelectCourse()}
          loading={isLoading}
          width="100%"
          isHideDelete
        />
      </ModalNonForm>
    </>
  )
}

export default SelectCourse
