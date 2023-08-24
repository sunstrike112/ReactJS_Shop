/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'

export default ({ srcBlob, style, controls = false }) => {
  const src = useMemo(() => {
    if (srcBlob) {
      return URL.createObjectURL(srcBlob)
    }
    return null
  }, [srcBlob])

  if (!src) {
    return null
  }
  return (
    <video
      style={style}
      src={src}
      controls={controls}
      preload="metadata"
    />
  )
}
