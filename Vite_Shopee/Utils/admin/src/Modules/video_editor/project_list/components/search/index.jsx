import React from 'react'
import { Button, Form } from 'antd'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'

import { FormInput } from 'Components'
import { useLoadProjectList } from 'Hooks'
import { SearchOutlined } from '@ant-design/icons'

const WrapperSearch = styled(Form)`
  .search_form {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 6px;
    margin-bottom: 24px;
  }

  // style input and ant form  (input_search);
  .ant-form-item {
    margin-bottom: 0;

    .input_search {
      width: 100%;
      border: none;
      padding: 0;
      
      &.ant-input-affix-wrapper-focused {
        // border: none;
        box-shadow: none;
      }
      
      .ant-input {
        padding: 4px 16px;
        font-size: 16px;
        height: 40px;
      }
      .ant-input-clear-icon {
        font-size: 18px;
      }
    }
  }

  // custom style for button;
  .ant-btn.ant-btn-primary {
    background-color: ${({ theme }) => theme.bg_primary};
    border-color: ${({ theme }) => theme.bg_primary};
    height: 40px;
  }
  .ant-btn {
    border-radius: 16px;
  }
`

const SearchBar = () => {
  const { t } = useTranslation('project')

  const {
    isLoading,
    loadListProjectsAction
  } = useLoadProjectList()

  const form = useForm({
    defaultValues: {
      projectName: ''
    }
  })

  const submitProjectName = (values) => {
    const { projectName } = values
    loadListProjectsAction({
      params: {
        projectName: projectName.trim() || '',
        limit: 100,
        page: 1
      }
    })
    form.setValue('projectName', projectName.trim() || '')
  }

  return (
    <WrapperSearch>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitProjectName)} className="search_form">
          <FormInput
            name="projectName"
            className="input_search"
            label=""
            placeholder={t('project_search_placeholder')}
            autoFocus
            allowClear
            wrapperProps={{
              labelCol: { span: 0 },
              wrapperCol: { span: 24 }
            }}
          />
          <Button
            loading={isLoading}
            htmlType="submit"
            onClick={form.handleSubmit(submitProjectName)}
            icon={<SearchOutlined />}
            type="primary"
          >
            {t('common:search')}
          </Button>
        </form>
      </FormProvider>
    </WrapperSearch>
  )
}

export default SearchBar
