/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react'
import { BoldOutlined, ItalicOutlined, AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined } from '@ant-design/icons'
import { Input, Select } from 'antd'
import { Text } from 'Components'
import { useTranslation } from 'react-i18next'

import { useVideoEditor } from 'Hooks'

import { STORAGE, getLocalStorage } from 'Utils'
import { FONTS, ALIGN, FONT_SIZE, FONTS_JP } from '../../../constants'

import {
  Container,
  Row,
  ColorPicker,
  FontStyle,
  Divide,
  BoldItalic,
  EditButton
} from './styled'

const EditText = ({ data, visible, onClosePopup }) => {
  const language = getLocalStorage(STORAGE.LANGUAGE)
  const fontLang = language === 'jp' ? FONTS_JP : FONTS
  const [content, setContent] = React.useState(data.textStyle.content)
  const [fontSize, setFontSize] = React.useState(data.textStyle.fontSize.toString() || '24')

  const { t } = useTranslation('project')

  React.useEffect(() => {
    setFontSize(data.textStyle.fontSize.toString())
  }, [data.textStyle.fontSize])

  const {
    updateItemPositionAction
  } = useVideoEditor()

  React.useEffect(() => {
    setContent(data.textStyle.content)
  }, [data.textStyle.content, visible])

  const onChangeText = (e) => {
    const { value } = e.target
    setContent(value)
  }

  const setBoldText = () => {
    updateItemPositionAction({
      dataItem: {
        ...data,
        textStyle: {
          ...data.textStyle,
          isBold: !data.textStyle.isBold
        }
      },
      isChangePosition: false
    })
  }
  const setItalicText = () => {
    updateItemPositionAction({
      dataItem: {
        ...data,
        textStyle: {
          ...data.textStyle,
          isItalic: !data.textStyle.isItalic
        }
      },
      isChangePosition: false
    })
  }
  const setTextAlign = (value) => {
    updateItemPositionAction({
      dataItem: {
        ...data,
        textStyle: {
          ...data.textStyle,
          textAlign: value
        }
      },
      isChangePosition: false
    })
  }
  const handleChange = (value) => {
    updateItemPositionAction({
      dataItem: {
        ...data,
        textStyle: {
          ...data.textStyle,
          fontFamily: value
        }
      },
      isChangePosition: false
    })
  }

  const handleChangeComplete = (color) => updateItemPositionAction({
    dataItem: {
      ...data,
      textStyle: {
        ...data.textStyle,
        color: color.hex
      }
    },
    isChangePosition: false
  })

  const changeFontSize = (value) => {
    updateItemPositionAction({
      dataItem: {
        ...data,
        textStyle: {
          ...data.textStyle,
          fontSize: value
        }
      },
      isChangePosition: false
    })
  }

  const onSubmit = () => {
    const dataItem = {
      ...data,
      textStyle: {
        ...data.textStyle,
        content
      }
    }

    updateItemPositionAction({
      dataItem,
      isChangePosition: false
    })
    onClosePopup(false)
  }

  return (
    <Container>
      <Text.primary
        fontWeight="fw_600"
        fontSize="size_14"
      >
        {t('text')}:
      </Text.primary>
      <Row>
        <Input.TextArea
          value={content}
          maxLength={100}
          onChange={onChangeText}
        />
      </Row>
      <Text.primary
        fontWeight="fw_600"
        fontSize="size_14"
      >
        {t('text_style')}:
      </Text.primary>
      <Row>
        <Select
          value={data.textStyle.fontFamily}
          defaultValue={fontLang[0].value}
          style={{ display: 'flex', flex: 1 }}
          onChange={handleChange}
        >
          {fontLang.map((m) => (
            <Select.Option key={m.value} value={m.value}>
              {m.label}
            </Select.Option>
          ))}
        </Select>
        <Divide />
      </Row>

      <Text.primary
        fontWeight="fw_600"
        fontSize="size_14"
      >
        {t('font_size')}:
      </Text.primary>
      <Row>
        <Select
          value={fontSize}
          // defaultValue={FONT_SIZE[0].value}
          style={{ display: 'flex', flex: 1 }}
          onChange={changeFontSize}
        >
          {FONT_SIZE.map((m) => (
            <Select.Option key={m.value} value={m.value}>
              {m.label}
            </Select.Option>
          ))}
        </Select>
      </Row>
      <Row>
        <FontStyle>
          <BoldItalic actived={data.textStyle.isItalic} onClick={setItalicText}>
            <ItalicOutlined />
          </BoldItalic>
          <Divide />
          <BoldItalic actived={data.textStyle.isBold} onClick={setBoldText}>
            <BoldOutlined />
          </BoldItalic>
          <Divide />
          <BoldItalic actived={data.textStyle.textAlign === ALIGN.LEFT} onClick={() => setTextAlign(ALIGN.LEFT)}>
            <AlignLeftOutlined />
          </BoldItalic>
          <Divide />
          <BoldItalic actived={data.textStyle.textAlign === ALIGN.CENTER} onClick={() => setTextAlign(ALIGN.CENTER)}>
            <AlignCenterOutlined />
          </BoldItalic>
          <Divide />
          <BoldItalic actived={data.textStyle.textAlign === ALIGN.RIGHT} onClick={() => setTextAlign(ALIGN.RIGHT)}>
            <AlignRightOutlined />
          </BoldItalic>
        </FontStyle>
      </Row>
      <Text.primary
        fontWeight="fw_600"
        fontSize="size_14"
      >
        {t('color')}:
      </Text.primary>
      <Row>
        <ColorPicker
          color={data.textStyle.color}
          onChangeComplete={handleChangeComplete}
        />
      </Row>
      <Row style={{ justifyContent: 'flex-end' }}>
        <EditButton disabled={!content} onClick={onSubmit}>
          {t('edit_text')}
        </EditButton>
      </Row>
    </Container>
  )
}

export default EditText
