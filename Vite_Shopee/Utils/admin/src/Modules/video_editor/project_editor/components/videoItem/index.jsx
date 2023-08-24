/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import { getRotation } from 'Utils'
import { useVideoEditor } from 'Hooks'

import { Container, ImageWrapper, StyledMoveable, TextWrapper } from './styled'
import { useItem } from './useItem'

const VideoItem = ({ dataSource, bounds, boundingClientRect, isPlay }) => {
  const moveableRef = useRef()
  const canvasRef = useRef(null)
  const {
    VideoEditorState
  } = useVideoEditor()
  const { ratioScale } = VideoEditorState
  const {
    dimension,
    targets,
    type,
    actived,
    getBound,
    almostInactived,
    handleEvent,
    onDragStart,
    handleEventEnd,
    heightCanvas,
    widthCanvas,
    imageSrc
  } = useItem({
    data: dataSource,
    bounds,
    moveable: moveableRef,
    isPlay,
    boundingClientRect,
    canvas: canvasRef
  })

  const [keepRatio, setKeepRatio] = useState(false)
  const { imageSrc: ImageSrc } = dataSource

  const onClickElement = (event) => event.stopPropagation()

  return (
    <Container>
      {
        type === 'text' && (
          <TextWrapper
            key={dataSource.selector}
            id={dataSource.selector}
            actived={actived}
            index={dataSource.zIndex}
            onClick={onClickElement}
            width={widthCanvas * ratioScale}
            height={heightCanvas * ratioScale}
          >
            <canvas
              width={widthCanvas}
              height={heightCanvas}
              ref={canvasRef}
            />
            {
              imageSrc && (<img src={imageSrc} alt="text" />)
            }
          </TextWrapper>
        )
      }
      {
        type === 'image' && dataSource?.position && (
          (
            <ImageWrapper
              key={dataSource.selector}
              id={dataSource.selector}
              actived={actived}
              index={dataSource.zIndex}
              onClick={onClickElement}
              color={dataSource.color}
            >
              <ImageSrc />
            </ImageWrapper>
          )
        )
      }
      <StyledMoveable
        actived={actived}
        renderDirections
        isActiveItem={!!dataSource.isActiveItem}
        ref={moveableRef}
        target={targets}
        resizable={!!dataSource.isActiveItem && type !== 'text'}
        scalable={!!dataSource.isActiveItem && type === 'text'}
        rotatable={!!dataSource.isActiveItem}
        origin={false}
        dragArea={false}
        edge={false}
        zoom={1}
        padding={{ 'left': 0, 'top': 0, 'right': 0, 'bottom': 0 }}
        rotationPosition="bottom"
        keepRatio={keepRatio}
        draggable
        snappable
        pinchable={false}
        throttleScale={0}
        throttleRotate={0}
        throttleResize={1}
        throttleDrag={0}
        bounds={bounds}
        onDragStart={onDragStart}
        onDrag={({ target, beforeTranslate, width, height }) => {
          if (actived && !almostInactived) {
            const [x, y] = beforeTranslate
            const bound = getBound(target)
            handleEvent(target, bound, { width, height, x, y, rotate: dimension.rotate, scale: dimension.scale })
          }
          if (almostInactived) handleEventEnd({ target })
        }}
        onDragEnd={handleEventEnd}
        onRotateStart={({ set }) => set(dimension.rotate)}
        onRotate={({ target, beforeRotate, drag }) => {
          if (actived && !almostInactived) {
            const bound = getBound(target)
            const { beforeTranslate, width, height } = drag
            const [x, y] = beforeTranslate
            handleEvent(target, bound, { width, height, x, y, rotate: getRotation(beforeRotate), scale: dimension.scale })
          }
          if (almostInactived) handleEventEnd({ target })
        }}
        onRotateEnd={handleEventEnd}
        onResizeStart={({ set, setMin, direction, setOrigin, dragStart }) => {
          setOrigin(['%', '%'])
          setKeepRatio(((direction[0] === 1 || direction[0] === -1) && (direction[1] === 1 || direction[1] === -1)) || type === 'text')
          set([dimension.width, dimension.height])
          dragStart.set([dimension.x, dimension.y])
          setMin([20, 20])
        }}
        onResize={({ target, width, height, drag }) => {
          if (actived && !almostInactived) {
            const { beforeTranslate } = drag
            const bound = getBound(target)

            const [x, y] = beforeTranslate
            handleEvent(target, bound, { width, height, x, y, rotate: dimension.rotate, scale: dimension.scale })
          }
          if (almostInactived) handleEventEnd({ target })
        }}
        onResizeEnd={handleEventEnd}
      />
    </Container>
  )
}

export default VideoItem
