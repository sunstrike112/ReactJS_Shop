/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */

import React, { useMemo, useState } from 'react'
import { EditOutlined, SplitCellsOutlined, PauseCircleOutlined } from '@ant-design/icons'
import { Popover } from 'antd'

import { useVideoEditor } from 'Hooks'
import { TEXT_ICON } from 'Assets'
import styled from 'styled-components'
import moment from 'moment'
import { FORMAT_TIME } from 'Constants/formatTime'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { EditText, EditElement } from '../index'

import {
  TrashIcon,
  ImageName,
  LayerLeft,
  Container,
  ClickAble,
  ListElement
} from './styled'
import EditPause from '../editSplitPause'

const Name = styled.p`
  padding: 0;
  margin: 0;
  font-weight: 400;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-word;
  display: contents;
`

const PopoverCustomer = ({ data }) => {
  const [visible, setVisible] = useState(false)
  const { imageSrc: ImageSrc } = data
  return (
    <Popover
      onVisibleChange={(open) => setVisible(open)}
      content={data.type === 'text' ? <EditText visible={visible} onClosePopup={setVisible} data={{ ...data }} /> : <EditElement data={{ ...data, imageSrc: ImageSrc }} />}
      placement="bottom"
      trigger="click"
      visible={visible}
      overlayInnerStyle={{ width: 300, marginRight: 16 }}
    >
      <EditOutlined
        style={{ marginRight: 4 }}
      />
    </Popover>
  )
}

const PopupEdit = ({ data, pause, isPlay, setIsplay, videoRef, checkVisible }) => {
  const [visible, setVisible] = useState(false)
  const { imageSrc: ImageSrc } = data
  React.useEffect(() => {
    checkVisible(visible)
  }, [visible])

  return (
    <Popover
      onVisibleChange={(open) => setVisible(open)}
      content={(
        <EditPause
          pause={pause}
          isPlay={isPlay}
          setIsplay={setIsplay}
          videoRef={videoRef}
          visible={visible}
          onClosePopup={setVisible}
          data={{ ...data, imageSrc: ImageSrc }}
        />
      )}
      placement="bottom"
      trigger="click"
      visible={visible}
      overlayInnerStyle={{ width: 300, marginRight: 16 }}
    >
      <EditOutlined
        style={{ marginRight: 4 }}
      />
    </Popover>
  )
}

const Layers = ({ pause, isPlay, setIsplay, videoRef, checkVisible }) => {
  const {
    VideoEditorState,
    removeLayerAction,
    setTimeLinesAction
  } = useVideoEditor()
  const { timeLines } = VideoEditorState
  const handleClickLayer = (event) => event.stopPropagation()
  const onRemoveLayer = (layer) => removeLayerAction(layer.selector)
  // ß
  const timeLinesSplit = timeLines.filter((item) => item.type === 'split')
  const timeLinePause = timeLines.filter((item) => item.type === 'pause')
  const timeLineElement = timeLines.filter((item) => item.type !== 'pause' && item.type !== 'split')

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    if (result.destination.index === result.source.index) return

    const items = Array.from(timeLineElement)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setTimeLinesAction([...timeLinesSplit, ...timeLinePause, ...items])
  }

  return (
    <div>
      {useMemo(() => (
        timeLinesSplit.map(({ imageSrc: ImageSrc, type, ...item }) => (
          <Container key={item.selector} onClick={handleClickLayer} backgroundColor={item.isActiveItem}>
            <div style={{ display: 'contents', fill: 'none !important' }}>
              <LayerLeft color={type === 'text' ? item.textStyle.color : item.color}>
                <Name>
                  <SplitCellsOutlined
                    width={20}
                    height={20}
                    fill="black"
                    style={{ cursor: 'pointer', marginRight: '0.5rem' }}
                  />{`${moment.utc(item?.startTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND)} 
                  - ${moment.utc(item?.endTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND)}`}
                </Name>
              </LayerLeft>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {(item.name !== 'split' && item.name !== 'pause') ? <PopoverCustomer data={{ ...item, type, imageSrc: ImageSrc }} /> : (
                  <PopupEdit
                    pause={pause}
                    isPlay={isPlay}
                    setIsplay={setIsplay}
                    videoRef={videoRef}
                    data={{ ...item, type, imageSrc: ImageSrc }}
                    checkVisible={checkVisible}
                  />
                )}
                <ClickAble onClick={() => onRemoveLayer({ ...item })}>
                  <TrashIcon />
                </ClickAble>
              </div>
            </div>
          </Container>
        ))
      ), [timeLinesSplit])}
      {useMemo(() => (
        timeLinePause.map(({ imageSrc: ImageSrc, type, ...item }) => (
          <Container key={item.selector} onClick={handleClickLayer} backgroundColor={item.isActiveItem}>
            <div style={{ display: 'contents', fill: 'none !important' }}>
              <LayerLeft color={type === 'text' ? item.textStyle.color : item.color}>
                <Name>
                  <PauseCircleOutlined
                    fill="black"
                    style={{ cursor: 'pointer', marginRight: '0.5rem' }}
                  />{`${moment.utc(item?.startTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND)} 
                  - ${moment.utc(item?.endTime * 1000).format(FORMAT_TIME.HOUR_MINUTES_SECOND_MILISECOND)}`}
                </Name>
              </LayerLeft>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {(item.name !== 'split' && item.name !== 'pause') ? <PopoverCustomer data={{ ...item, type, imageSrc: ImageSrc }} /> : (
                  <PopupEdit
                    pause={pause}
                    isPlay={isPlay}
                    setIsplay={setIsplay}
                    videoRef={videoRef}
                    data={{ ...item, type, imageSrc: ImageSrc }}
                    checkVisible={checkVisible}
                  />
                )}
                <ClickAble onClick={() => onRemoveLayer({ ...item })}>
                  <TrashIcon />
                </ClickAble>
              </div>
            </div>
          </Container>
        ))), [timeLinePause])}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="timeLineElment" index={0}>
          {(provided) => (
            <ListElement
              className="characters"
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              {timeLineElement.map(({ imageSrc: ImageSrc, type, ...item }, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Container key={item.selector} onClick={handleClickLayer} backgroundColor={item.isActiveItem}>
                        <LayerLeft color={type === 'text' ? item.textStyle.color : item.color}>
                          {(item.name !== 'split' && item.name !== 'pause') && (
                            <div style={{ width: 64 }}>
                              {type === 'text' ? <TEXT_ICON /> : <ImageSrc />}
                            </div>
                          )}
                          <ImageName
                            isBold={item.textStyle.isBold}
                            isItalic={item.textStyle.isItalic}
                            fontFamily={item.textStyle.fontFamily}
                          >
                            {type === 'text' ? item.textStyle.content : item.name}
                          </ImageName>
                        </LayerLeft>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <PopoverCustomer data={{ ...item, type, imageSrc: ImageSrc }} />
                          <ClickAble onClick={() => onRemoveLayer({ ...item })}>
                            <TrashIcon />
                          </ClickAble>
                        </div>
                      </Container>
                    </li>
                  )}
                </Draggable>
              ))}
            </ListElement>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Layers
