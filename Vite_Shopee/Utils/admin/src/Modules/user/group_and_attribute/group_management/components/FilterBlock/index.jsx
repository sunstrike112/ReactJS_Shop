/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Row, Col } from 'antd'

import { FormInput, HeaderSearch } from 'Components'

const FilterBlock = ({
  t,
  groupsTree = [],
  setTreeState,
  resetCheckWhenFilter,
  isReloading,
  loadGroupsAction
}) => {
  const form = useForm()
  const { handleSubmit, reset } = form

  const onSubmit = useCallback(({ name }) => {
    const resolved = (data) => {
      resetCheckWhenFilter()
      const filterData = data.filter((item) => {
        if (item.title.toLowerCase().includes(name.toLowerCase().trim())) {
          return true
        }

        if (item.children && item.children.length > 0) {
          const filterChildren = item.children.filter((child) => {
            if (child.title.toLowerCase().includes(name.toLowerCase().trim())) {
              return true
            }
            return false
          })
          if (filterChildren.length > 0) return true
        }

        return false
      }).map((m) => {
        if (m.children && m.children.length > 0 && !m.title.toLowerCase().includes(name.toLowerCase().trim())) {
          const filterChildren = m.children.filter((child) => {
            if (child.title.toLowerCase().includes(name.toLowerCase().trim())) {
              return true
            }
            return false
          })
          if (filterChildren.length > 0) {
            return {
              ...m,
              children: filterChildren
            }
          }
        }
        return m
      })

      setTreeState(filterData)
    }

    if (!groupsTree.length) {
      loadGroupsAction({ params: {}, resolved })
    } else {
      resolved(groupsTree)
    }
  }, [groupsTree, loadGroupsAction])

  const handleCancel = useCallback(() => {
    reset({
      name: ''
    })
    setTreeState(groupsTree)
    resetCheckWhenFilter()
  }, [groupsTree])

  useEffect(() => {
    if (isReloading) {
      reset({
        name: ''
      })
    }
  }, [isReloading])

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
        <Row justify="center" gutter={24} style={{ minWidth: 900 }}>
          <Col span={16}>
            <FormInput
              name="name"
              label={t('group.group_id')}
              wrapperProps={{
                colon: false
              }}
            />
          </Col>
        </Row>
      </HeaderSearch>
    </FormProvider>
  )
}

export default FilterBlock
