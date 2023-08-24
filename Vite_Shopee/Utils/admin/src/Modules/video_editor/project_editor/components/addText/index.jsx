/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from 'react'
import { Select, Input, AutoComplete } from 'antd'
import { Text } from 'Components'
import { useTranslation } from 'react-i18next'
import { BoldOutlined, ItalicOutlined, AlignRightOutlined, AlignLeftOutlined, AlignCenterOutlined } from '@ant-design/icons'

import { useVideoEditor } from 'Hooks'
import { STORAGE, getLocalStorage, getRandomId } from 'Utils'

import {
  Container,
  Row,
  FontStyle,
  BoldItalic,
  ColorPicker,
  Space,
  AddButton
} from './styled'
import { getNewTrack, FONTS, TABSKEY, ALIGN, FONT_SIZE, FONTS_JP } from '../../../constants'

const AddText = ({
  pause,
  isPlay,
  setIsplay,
  play,
  setActiveKey,
  activeKey
}) => {
  const { t } = useTranslation('project')

  const {
    VideoEditorState,
    addItemToTrackAction
  } = useVideoEditor()

  const {
    timeLineDimension,
    videoData
  } = VideoEditorState
  const language = getLocalStorage(STORAGE.LANGUAGE)

  const fontLang = language === 'jp' ? FONTS_JP : FONTS
  const [isBold, setIsBold] = useState(false)
  const [fontSize, setFontSize] = useState(FONT_SIZE[0].value)

  const [isItalic, setIsItalic] = useState(false)
  const [textAlign, setTextAlign] = useState(ALIGN.LEFT)
  const [color, setColor] = useState('#000000')
  const [fontFamily, setFontFamily] = useState(fontLang[0].value)
  const [content, setContent] = useState('')
  const resetState = () => {
    setContent('')
    setFontFamily(fontLang[0].value)
    setColor('#000000')
    setIsItalic(false)
    setIsBold(false)
    setTextAlign(ALIGN.LEFT)
  }
  const onSubmit = async () => {
    const playing = isPlay
    if (playing) {
      await setIsplay(false)
      await pause()
    }
    const id = getRandomId()
    const width = timeLineDimension.width / 8
    const xPosition = (videoData.currentTime * timeLineDimension.offsetWidth) / videoData.duration
    const startTime = xPosition < (width * 7) ? videoData.currentTime : (videoData.duration * 7) / 8

    const getEndTime = () => {
      if (xPosition < (width * 7)) {
        return ((width * videoData.duration) / (timeLineDimension.offsetWidth)) + videoData.currentTime
      }
      return videoData.duration
    }

    const newTrack = getNewTrack({
      id,
      initialEndTime: VideoEditorState.initialTime,
      imageName: null,
      imageSrc: null,
      name: 'text',
      type: 'text',
      textStyle: {
        fontSize,
        isBold,
        fontFamily,
        content,
        color,
        isItalic,
        textAlign
      }
    })

    addItemToTrackAction({
      ...newTrack,
      width,
      xPosition,
      startTime,
      endTime: getEndTime()
    })

    if (playing) {
      setTimeout(() => {
        setIsplay(true)
        play()
      }, 500)
    }

    setActiveKey(TABSKEY.LAYER)
  }

  React.useEffect(() => {
    resetState()
  }, [activeKey])

  const handleChangeComplete = (colorHex) => setColor(colorHex.hex)
  const handleSelect = (value) => setFontFamily(value)
  const setBold = () => setIsBold(!isBold)
  const setItalic = () => setIsItalic(!isItalic)

  const changeText = (e) => {
    const { value } = e.target
    setContent(value)
  }
  const disabled = React.useMemo(() => !content.trim() || !fontSize, [fontSize, content])

  const changeFontSize = (value) => {
    setFontSize(value)
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
          onChange={changeText}
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
          value={fontFamily}
          style={{ display: 'flex', flex: 1 }}
          onChange={handleSelect}
        >
          {fontLang.map((m) => (
            <Select.Option key={m.value} value={m.value}>
              {m.label}
            </Select.Option>
          ))}
        </Select>
        <Space />
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
      <Row style={{ width: '100%' }}>
        <FontStyle>
          <BoldItalic actived={isItalic} onClick={setItalic}>
            <ItalicOutlined />
          </BoldItalic>
          <Space />
          <BoldItalic actived={isBold} onClick={setBold}>
            <BoldOutlined />
          </BoldItalic>
          <Space />
          <BoldItalic actived={textAlign === ALIGN.LEFT} onClick={() => setTextAlign(ALIGN.LEFT)}>
            <AlignLeftOutlined />
          </BoldItalic>
          <Space />
          <BoldItalic actived={textAlign === ALIGN.CENTER} onClick={() => setTextAlign(ALIGN.CENTER)}>
            <AlignCenterOutlined />
          </BoldItalic>
          <Space />
          <BoldItalic actived={textAlign === ALIGN.RIGHT} onClick={() => setTextAlign(ALIGN.RIGHT)}>
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
      <ColorPicker
        color={color}
        onChangeComplete={handleChangeComplete}
      />
      <Row style={{ justifyContent: 'flex-end' }}>
        <AddButton disabled={disabled} onClick={onSubmit}>
          {t('add_text')}
        </AddButton>
      </Row>
    </Container>
  )
}

export default AddText
