/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import { EDIT_SQUARE_ICON } from 'Assets'
import { FormInput, Section, TooltipCustom } from 'Components'
import { useHistories, useVideoEditor } from 'Hooks'
import { validateSpecialWord } from 'Utils'

export const TitleWrapper = styled.div`
  --padding-title-box: 4px;
  
  width: 100%;
  display: flex;
  align-items: center;

  .btn_arrow {
    margin-right: 8px;
    flex: 1;

    &.ant-btn-icon-only {
      * {
        font-size: 20px;
      }
    }
  }

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 38px;
    gap: 12px;
    
    form {
      width: 100%;
    }

    .title {
      padding-left: var(--padding-title-box);;
      margin: 0;
      font-weight: 600;
      font-size: 18px;
      color: #1A1A1A;
      width: 95%;
    }

    // style input and ant form  (input_title);
    .ant-form-item {
      margin-bottom: 0;

      .ant-form-item-explain {
        padding-left: var(--padding-title-box);
      }

      .input_title {
        width: 100%;
        border: none;
        padding: 0;

        &.ant-input-affix-wrapper-focused {
          border: none;
          box-shadow: none;
        }
        
        .ant-input {
          box-shadow: none;
          background-color: transparent;
          font-size: 18px;
          padding: 0 8px 0 var(--padding-title-box);;
        }
        .ant-input-clear-icon {
          font-size: 18px;
        }
      }
    }
  }

  // custom style for button;
  .ant-btn.ant-btn-primary {
    background-color: ${({ theme }) => theme.bg_primary};
    border-color: ${({ theme }) => theme.bg_primary};
  }
  .ant-btn {
    border-radius: 16px;
  }

  p {
    margin: 0;
  }
`

export const projectNameSchema = (t) => yup.object().shape({
  projectName: yup.string()
    .required(t('video_required_name'))
    .max(100, t('error_message:validation.max_length', { key: t('project_name'), max: 100 }))
    .trim()
    .test('isValidateSpecialWord', t('error_message:validation.special_word'), validateSpecialWord)
})

const Title = ({
  title,
  backRoute,
  isPlay,
  onPaused,
  ...rest }) => {
  const { t } = useTranslation('project')
  const history = useHistories()

  const {
    VideoEditorState,
    updateProjectNameAction
  } = useVideoEditor()
  const { projectDetail, nameUpdating } = VideoEditorState

  const [isEditing, setIsEditing] = useState(false)

  const form = useForm({
    defaultValues: {
      projectName: title
    },
    resolver: yupResolver(projectNameSchema(t))
  })

  const { setValue } = form

  const submitProjectName = (values) => {
    const { projectName } = values
    updateProjectNameAction({
      projectId: projectDetail?.id,
      projectName
    })
  }

  const submitError = (errors) => {
    const { projectName } = errors
    if (projectName.type === 'checkExistName' && form.getValues()?.projectName === title) {
      setIsEditing(false)
      form.reset({ projectName: title })
    }
  }

  useEffect(() => {
    if (!nameUpdating) {
      setIsEditing(false)
      if (isPlay && onPaused) {
        onPaused()
      }
    }
  }, [nameUpdating, title])

  const handleEdit = () => {
    setIsEditing(true)
    form.reset({ projectName: title })
  }

  const handleKeyEsc = (e) => {
    if (e.keyCode === 27) {
      form.reset({ projectName: title })
      setIsEditing(false)
    }
  }
  const onChangeTitle = (e) => {
    if (e.target.value.length <= 30) {
      setValue('projectName', e.target.value)
    }
  }

  return (
    <Section style={{ padding: '12px 20px' }} {...rest}>
      <TitleWrapper>
        <Button className="btn_arrow" type="text" icon={<ArrowLeftOutlined />} onClick={() => (backRoute ? history.push(backRoute) : history.goBack())} />
        <div className="content">
          {!isEditing ? (
            <>
              <TooltipCustom className="title" text={title} />
              <Button onClick={handleEdit} type="text" icon={<EDIT_SQUARE_ICON />} />
            </>
          ) : (
            <>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(submitProjectName, submitError)}>
                  <FormInput
                    onKeyDown={handleKeyEsc}
                    name="projectName"
                    maxLength={30}
                    className="input_title"
                    label=""
                    placeholder={t('project_name_placeholder')}
                    autoFocus
                    allowClear
                    wrapperProps={{
                      labelCol: { span: 0 },
                      wrapperCol: { span: 24 }
                    }}
                    onChange={onChangeTitle}
                  />
                </form>
              </FormProvider>
              <Button onClick={() => setIsEditing(false)}>{t('common:cancel')}</Button>
              <Button loading={nameUpdating} onClick={form.handleSubmit(submitProjectName, submitError)} type="primary">{t('common:save')}</Button>
            </>
          )}
        </div>
      </TitleWrapper>
    </Section>
  )
}

export default Title
