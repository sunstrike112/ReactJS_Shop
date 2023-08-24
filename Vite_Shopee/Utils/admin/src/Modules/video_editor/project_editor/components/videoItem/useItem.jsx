/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from 'react'
import { useVideoEditor } from 'Hooks'

import { FONTS } from '../../contants'

import { ALIGN } from '../../../constants'

const useItem = ({
  data,
  bounds,
  moveable,
  isPlay,
  boundingClientRect,
  canvas
}) => {
  const {
    VideoEditorState,
    updateItemPositionAction,
    setTimeLinesAction
  } = useVideoEditor()
  const { timeLines, videoData, ratioScale } = VideoEditorState

  const [targets, setTarget] = useState()
  const [imageSrc, setImageSrc] = useState(null)

  const [canvasDimension, setCanvasDimension] = useState({
    widthCanvas: 0,
    heightCanvas: 0
  })

  const [dimension, setDimension] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    widthBound: 0,
    heightBound: 0,
    posX: 0,
    posY: 0,
    rotate: 0
  })
  const { type, isCreateNewItem, endTime, startTime, selector, textStyle } = data
  const { currentTime } = videoData
  // const isText = useMemo(() => type === 'text', [type])
  const actived = useMemo(() => (currentTime >= startTime && currentTime <= endTime && type !== 'pause' && type !== 'split'), [startTime, endTime, currentTime])
  const almostInactived = useMemo(() => isPlay && actived && (endTime - currentTime) < 0.3, [endTime, currentTime, actived, isPlay])

  const ctx = useMemo(() => {
    if (canvas.current) {
      return canvas.current.getContext('2d')
    }
    return null
  }, [canvas.current])

  const content = useMemo(() => {
    const texts = textStyle.content.split('\n')
    if (canvas.current && ctx && texts && texts.length > 0 && type === 'text') {
      const fontStyle = textStyle.isItalic ? 'italic' : ''
      const fontWeight = textStyle.isBold ? 'bold' : ''
      const font = `${fontStyle} ${fontWeight} ${textStyle.fontSize}px ${textStyle.fontFamily}`

      ctx.font = font.trim()
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      ctx.fillStyle = textStyle.color

      const newTest = texts.reduce((prev = [], currentText = '') => {
        const currentWidth = ctx.measureText(currentText).width

        if (((data.position.x / ratioScale) + currentWidth + 5) > videoData.width) {
          let lines = []
          let line = ''
          let lineTest = ''
          const words = currentText.split(' ')
          words.forEach((word) => {
            lineTest = `${line}${word} `
            const lineWidth = ctx.measureText(lineTest).width
            if (((data.position.x / ratioScale) + lineWidth + 5) > videoData.width) {
              lines.push(line)
              line = `${word} `
            } else {
              line = lineTest
            }
          })
          if (line.trim()) {
            lines.push(line)
          }
          return [...prev, ...lines]
        }
        return [...prev, currentText]
      }, [])

      return newTest.filter((f) => !!f).map((text, i) => ({
        text: text.trim(),
        height: i * textStyle.fontSize
      }))
    }
    return []
  }, [
    textStyle.content,
    textStyle.fontSize,
    textStyle.isBold,
    textStyle.fontFamily,
    textStyle.color,
    textStyle.isItalic,
    ctx,
    type,
    canvas.current,
    videoData.width,
    ratioScale,
    textStyle.textAlign
  ])

  const setStyled = (position, element) => {
    setDimension({ ...position })

    if (type === 'text') {
      element.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${position.rotate}deg)`
    } else {
      element.style.width = `${position.width}px`
      element.style.height = `${position.height}px`
      element.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${position.rotate}deg)`
    }
  }

  useEffect(() => {
    const blockElement = document.getElementById(selector)
    if (blockElement && data && data.position) {
      setTarget(blockElement)
      if (type === 'text' && isCreateNewItem) {
        const textRect = blockElement?.getBoundingClientRect()
        blockElement.style.transform = `translate(${data.position.x}px, ${data.position.y}px) rotate(${data.position.rotate}deg)`
        setDimension({ ...data.position, width: textRect.width, height: textRect.height })
        updateItemPositionAction({
          dataItem: { ...data, position: { ...data.position, width: textRect.width, height: textRect.height }, isCreateNewItem: false },
          isChangePosition: true
        })
      }
      if (!type === 'text') {
        setStyled(data.position, blockElement)
      }
      moveable.current.updateRect()
    }
  }, [selector, data.position, isCreateNewItem])

  useEffect(() => {
    const blockElement = document.getElementById(selector)
    if (blockElement && data && data.position && bounds && moveable && moveable.current && actived) {
      setTarget(blockElement)
      setStyled(data.position, blockElement)
      moveable.current.updateRect()
    }
  }, [bounds, actived, selector])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (data && data.position) {
        if (type === 'text') {
          const blockElement = document.getElementById(selector)

          const textRect = blockElement?.getBoundingClientRect()
          blockElement.style.transform = `translate(${data.position.x}px, ${data.position.y}px) rotate(${data.position.rotate}deg)`

          updateItemPositionAction({
            dataItem: { ...data, position: { ...data.position, width: textRect.width, height: textRect.height }, isCreateNewItem: false },
            isChangePosition: false
          })
          moveable.current.updateRect()
        }
      }
    }, 100)

    return () => {
      clearTimeout(timeout)
    }
  }, [selector, textStyle, textStyle.fontFamily, content])

  useEffect(() => {
    const onClickOutSide = () => {
      const timeLineUpdate = timeLines.map((m) => ({ ...m, isActiveItem: !!m.isActiveItem }))
      setTimeLinesAction(timeLineUpdate)
    }
    window.addEventListener('click', onClickOutSide)

    return () => {
      window.removeEventListener('click', onClickOutSide)
    }
  }, [timeLines])

  const getBound = (target) => {
    if (boundingClientRect) {
      const targetRect = target?.getBoundingClientRect()
      return {
        heightBound: targetRect.height,
        widthBound: targetRect.width,
        posX: dimension.rotate === 0 ? dimension.x : targetRect.x - boundingClientRect.x > 0 ? targetRect.x - boundingClientRect.x : 0,
        posY: dimension.rotate === 0 ? dimension.y : targetRect.y - boundingClientRect.y > 0 ? targetRect.y - boundingClientRect.y : 0
      }
    }
    return {
      heightBound: 0,
      widthBound: 0,
      posX: 0,
      posY: 0
    }
  }

  const handleEvent = (target, bound, position) => {
    const { x, y, width, height, rotate, scale } = position
    setDimension({ ...dimension, width, height, x, y, rotate, scale, ...bound })

    if (type === 'text') {
      target.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`
    } else {
      target.style.width = `${width}px`
      target.style.height = `${height}px`
      target.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`
    }
  }

  const onDragStart = ({ set }) => {
    const translate = [dimension.x, dimension.y]
    set(translate)
    updateItemPositionAction({
      dataItem: { ...data, position: { ...dimension } },
      isChangePosition: true
    })
  }

  const handleEventEnd = ({ target }) => {
    if (actived) {
      const bound = getBound(target)
      updateItemPositionAction({
        dataItem: { ...data, position: { ...dimension, ...bound } },
        isChangePosition: true
      })
    }
  }

  const writeText = async (isReDraw = false) => {
    const textBaseline = 'top'
    const loadfonts = new FontFace(textStyle.fontFamily, `url(${FONTS[textStyle.fontFamily].url})`, FONTS[textStyle.fontFamily].options)
    loadfonts.load().then(() => {
      if (!isReDraw) {
        const fontStyle = textStyle.isItalic ? 'italic' : ''
        const fontWeight = textStyle.isBold ? 'bold' : ''
        const font = `${fontStyle} ${fontWeight} ${textStyle.fontSize}px ${textStyle.fontFamily}`

        ctx.font = font.trim()
        ctx.textAlign = textStyle.textAlign
        ctx.textBaseline = textBaseline
        ctx.fillStyle = textStyle.color
        const texts = content.map((item) => item.text)
        const maxWidth = texts.reduce((prev, current) => Math.max(prev, ctx.measureText(current).width), 0)
        setCanvasDimension({
          heightCanvas: textStyle.fontSize * content.length + 5,
          widthCanvas: maxWidth + 5
        })
      } else {
        const positionText = (textAlign) => {
          if (textAlign === ALIGN.LEFT) return 0
          if (textAlign === ALIGN.CENTER) return canvas?.current?.width / 2
          return canvas?.current?.width
        }
        ctx.beginPath()
        const fontStyle = textStyle.isItalic ? 'italic' : ''
        const fontWeight = textStyle.isBold ? 'bold' : ''
        const font = `${fontStyle} ${fontWeight} ${textStyle.fontSize}px ${textStyle.fontFamily}`

        ctx.font = font.trim()
        ctx.textAlign = textStyle.textAlign
        ctx.textBaseline = textBaseline
        ctx.fillStyle = textStyle.color

        content.forEach((f, i) => {
          if (i === 0) {
            ctx.fillText(f.text, positionText(textStyle.textAlign), 5)
          } else {
            ctx.fillText(f.text, positionText(textStyle.textAlign), f.height)
          }
        })
        const imgUrl = canvas?.current?.toDataURL('image/png')
        setImageSrc(imgUrl)

        const canvasRect = canvas.current?.getBoundingClientRect()
        ctx.clearRect(0, 0, canvasRect?.width, canvasRect?.height)

        updateItemPositionAction({
          dataItem: { ...data, textStyle: { ...textStyle, textEncode: imgUrl?.replace('data:image/png;base64,', '') } },
          isChangePosition: true
        })
      }
    })
  }
  useEffect(() => {
    if (ctx && textStyle.content && type === 'text' && canvas.current) {
      writeText(false)
    }
  }, [
    type,
    content,
    canvas.current
  ])

  useEffect(() => {
    if (ctx && type === 'text') {
      writeText(true)
    }
    return () => {
      if (ctx && canvas.current && type === 'text') {
        const canvasRect = canvas.current?.getBoundingClientRect()
        ctx.clearRect(0, 0, canvasRect?.width, canvasRect?.height)
        ctx.restore()
      }
    }
  }, [canvasDimension, ctx, type, canvas.current])

  return {
    dimension,
    targets,
    type,
    actived,
    getBound,
    almostInactived,
    handleEvent,
    onDragStart,
    handleEventEnd,
    content,
    heightCanvas: canvasDimension.heightCanvas,
    widthCanvas: canvasDimension.widthCanvas,
    imageSrc
  }
}

export { useItem }
