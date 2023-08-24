/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useTranslation } from 'react-i18next'
// import { Editor } from '@tinymce/tinymce-react'
import Text from '../text'

export default function EditorComponent({ onChange }) {
  const { t } = useTranslation()
  return (
    <>
      {/* <Editor
        apiKey="akk91gzazneazoogeizwrzyjj9x4khm25xr2k8ayxmq59qvl"
        onEditorChange={onChange}
        init={{
          height: 300,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | '
            + 'bold italic underline backcolor | alignleft aligncenter '
            + 'alignright alignjustify | bullist numlist outdent indent | '
            + 'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      /> */}
      <Text.primary fontSize="size_14">
        {t('notification.post.text_required_length')}
      </Text.primary>
      <Text.primary fontSize="size_14">
        {t('notification.post.text_required_note')}
      </Text.primary>
    </>
  )
}
