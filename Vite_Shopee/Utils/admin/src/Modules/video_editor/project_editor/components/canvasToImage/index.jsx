/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useRef, useState } from 'react'

import { useVideoEditor } from 'Hooks'

import {
  TextWrapper
} from './styled'

const Layer = () => {
  const {
    VideoEditorState,
    removeLayerAction
  } = useVideoEditor()
  const [finalSrc, setFinalSrc] = useState(null)

  const canvas = useRef(null)

  const image = useRef(null)
  useEffect(() => {
    const ctx = canvas.current.getContext('2d')
    image.current.onload = () => {
      ctx.drawImage(image.current, 0, 0)
      ctx.font = '40px Arial'
      ctx.fillText('Hello', 210, 75)
    }
  }, [])
  useEffect(() => {
    const ctx = canvas.current.getContext('2d')
    ctx.drawImage(image.current, 0, 0)
    ctx.font = '40px Courier'
    ctx.fillText('Hello', 210, 75)
    setFinalSrc(canvas.current.toDataURL('image/jpeg'))
  })

  return (
    <TextWrapper>
      <canvas ref={canvas} width={640} height={425} className="hidden" />
      <img
        ref={image}
        alt="Stackoverflow56203352"
        src={finalSrc}
        className="hidden"
        crossOrigin="anonymous"
      />
    </TextWrapper>
  )
}

export default Layer
