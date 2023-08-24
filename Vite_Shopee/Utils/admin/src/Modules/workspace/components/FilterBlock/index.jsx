/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput, HeaderSearch } from 'Components'
import { useGetWorkSpaceAll } from 'Hooks'
import { Row, Col } from 'antd'
import { DEFAULT_PAG } from 'Utils'

const FilterBlock = ({ t, limit, resetWorkspacesAction }) => {
  const { getWorkspaceAllAction } = useGetWorkSpaceAll()

  const form = useForm()
  const { handleSubmit, reset } = form

  const onSubmit = useCallback((formData) => {
    const { workSpaceName, ...data } = formData
    data.workSpaceName = workSpaceName?.trim() || null
    getWorkspaceAllAction({ params: { page: DEFAULT_PAG.page, limit, workSpaceName: data.workSpaceName } })
  }, [limit])

  const handleReset = useCallback(() => {
    reset({
      workSpaceName: null
    })
    resetWorkspacesAction()
  }, [])

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleReset} onSubmit={handleSubmit(onSubmit)}>
        <Row className="form-group" gutter={24} justify="center" style={{ minWidth: 900 }}>
          <Col span={16}>
            <FormInput
              name="workSpaceName"
              label={t('workspace:workspace_name')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'right'
              }}
            />
          </Col>
        </Row>
      </HeaderSearch>
    </FormProvider>
  )
}

export default FilterBlock
