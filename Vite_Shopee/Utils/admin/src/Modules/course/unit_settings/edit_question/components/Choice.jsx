/* eslint-disable react/prop-types */
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Row, Space } from 'antd'
import { FormLabel, FormTextArea, FormUploadImage } from 'Components'
import React from 'react'
import { Divider, Right } from 'Themes/facit'

const Choice = ({ t, fields, remove, append, index }) => (
  <>
    <Divider />
    <Row>
      <FormLabel title={t('create.choice_number', { number: index + 1 })} description="Required" />
      <Right>
        <FormTextArea name={`listChoice.${index}.contentAnswer`} total={2000} />

        <FormUploadImage t={t} name={`listChoice.${index}.path`} size={4} sizeRequired="4096 KB" />
        <p>
          {t('common:require_image_size_and_type', {
            imgSize: '4MB',
            imgType: '(jpg, gif, png)'
          })}
        </p>

        {index === fields.length - 1 && (
          <Row justify="end">
            <Space>
              {fields.length > 2 && (
                <Button
                  htmlType="button"
                  type="primary"
                  onClick={() => remove(fields.length - 1)}
                >
                  <MinusOutlined />
                </Button>
              )}
              {fields.length < 20 && (
                <Button
                  htmlType="button"
                  type="primary"
                  onClick={() => append({ contentAnswer: '', path: '', isCorrect: 'UNCHECKED' })}
                >
                  <PlusOutlined />
                </Button>
              )}
            </Space>
          </Row>
        )}
      </Right>
    </Row>
  </>
)

export default Choice
