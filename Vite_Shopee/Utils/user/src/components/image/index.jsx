/* eslint-disable react/prop-types */
import React, { useState, useEffect, forwardRef } from 'react'
import { IMG_DEFAULT } from '../../assets'

const Image = ({
  src = '',
  srcDefault = IMG_DEFAULT,
  ...rest
}, ref) => {
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (src) {
      setIsError(false)
    }
  }, [src])

  if (src && !isError) {
    return (
      <img
        src={src}
        onError={() => setIsError(true)}
        alt=""
        ref={ref}
        {...rest}
      />
    )
  }

  return (
    <img
      ref={ref}
      alt="IMG_DEFAULT"
      src={srcDefault}
      {...rest}
    />
  )
}

export default forwardRef(Image)
