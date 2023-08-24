/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Form } from 'antd'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic/packages/ckeditor5-build-classic'

import { Text } from 'Components'
import { useTranslation } from 'react-i18next'

const WrapperFormItem = styled(Form.Item)`
	height: max-content;
	width: 100%;
	margin-bottom: 10px;

	.ant-input {
		min-height: 38px;
		border-radius: 4px;
	}

	.ant-form-item-label {
		font-size: 14px;
		overflow: unset;
		white-space: unset;
    .ant-form-item-no-colon {
      height: 100%;
    }
	}

	.ant-form-item-children-icon {
      display: none;
    }

  .description-note {
    word-break: break-word;
  }
`

const WrapperLabel = styled.div`
	width: 100%;
	font-size: 13px;
`

const FormEditor = ({
  label,
  name,
  rules,
  defaultValue = '',
  wrapperProps,
  total = 4000,
  ...rest
}) => {
  const { control } = useFormContext()
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({ name, control, rules, defaultValue })
  const [trans] = useTranslation(['common'])

  const [count, setCount] = useState(0)
  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      help={error?.message}
      validateStatus={error ? 'error' : ''}
    >
      <CKEditor
        {...rest}
        editor={ClassicEditor}
        data={value}
        config={{
          toolbar: {
            items: [
              'heading',
              '|',
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              '|',
              'fontFamily',
              'fontSize',
              'fontColor',
              'fontBackgroundColor',
              '|',
              '|',
              'blockQuote',
              'undo',
              'redo'
              // 'uploadImage',
              // 'outdent',
              // 'indent',
              // 'insertTable',
              // 'mediaEmbed'
            ]
          },
          link: {
            defaultProtocol: 'http://',
            addTargetToExternalLinks: true
          }
        }}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          if (editor) {
            editor.editing.view.change((writer) => {
              writer.setStyle(
                'height', '200px', editor.editing.view.document.getRoot()
              )
            })
            // editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new CKUploadAdapter(loader)
          }
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          const dom = new DOMParser().parseFromString(editor.getData(), 'text/html')
          setCount(dom.body.textContent.length)
          onChange(data)
        }}
      />
      <Text.primary fontSize="size_12" color={count > total ? 'red' : null}>
        {trans('common:editor_count_message', {
          count,
          total
        })}
      </Text.primary>
      <p className="description-note">{trans('common:editor_note')}</p>
    </WrapperFormItem>
  )
}

export default FormEditor
