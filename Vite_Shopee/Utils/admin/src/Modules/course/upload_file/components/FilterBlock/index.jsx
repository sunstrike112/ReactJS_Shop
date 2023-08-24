/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Row, Col } from 'antd'

import { FormInput, HeaderSearch } from 'Components'

const FilterBlock = ({
  t,
  setRowSelected,
  selectedFolderFile,
  searchFile,
  getFolderTreeAction,
  setFolderSelected,
  resetAction,
  setCurrentFolderId
}) => {
  const form = useForm()
  const { handleSubmit, reset } = form

  const onSubmit = useCallback((formData) => {
    const params = {
      fileName: formData.fileName.trim(),
      folderId: selectedFolderFile?.id || 0
    }
    searchFile({ params })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }, [selectedFolderFile])

  const handleCancel = useCallback(() => {
    reset({
      fileName: ''
    })
    getFolderTreeAction({
      params: {}
    })
    setFolderSelected([])
    setCurrentFolderId(null)
    resetAction()
  }, [])

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
        <Row className="form-group" gutter={24} justify="center">
          <Col span={16}>
            <FormInput
              name="fileName"
              label={t('file_name')}
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
