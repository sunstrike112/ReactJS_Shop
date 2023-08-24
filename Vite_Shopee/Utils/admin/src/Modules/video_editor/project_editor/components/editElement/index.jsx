/* eslint-disable react/prop-types */
import React from 'react'
import { Input } from 'antd'
import { Text } from 'Components'

import { useVideoEditor } from 'Hooks'

import {
  Container,
  Row,
  ColorPicker
} from './styled'

const EditElement = ({ data }) => {
  const {
    updateItemPositionAction
  } = useVideoEditor()

  const handleChangeName = (e) => {
    const { value } = e.target
    const dataItem = {
      ...data,
      name: value
    }

    updateItemPositionAction({
      dataItem,
      isChangePosition: true
    })
  }

  const handleChangeComplete = (color) => updateItemPositionAction({
    dataItem: {
      ...data,
      color: color.hex
    },
    isChangePosition: true
  })

  return (
    <Container>
      <Row>
        <Text.primary
          fontWeight="fw_400"
          fontSize="size_12"
          style={{ marginRight: 6, marginTop: 8 }}
        >
          Name:
        </Text.primary>
        <Input
          maxLength={20}
          value={data.name}
          onChange={handleChangeName}
        />
      </Row>
      <Row style={{ margin: 0 }}>
        <ColorPicker
          color={data.textStyle.color}
          onChangeComplete={handleChangeComplete}
        />
      </Row>
    </Container>
  )
}

export default EditElement
