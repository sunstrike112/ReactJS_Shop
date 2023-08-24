/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import { ClickAble } from '..'

const Uploader = ({ children, onSelectFile, className, ...rest }) => {
  const fileRef = useRef(null)

  const handleSelectImage = (e) => {
    const selectedFile = e?.target?.files[0]
    if (selectedFile) {
      onSelectFile(selectedFile)
    }
  }

  return (
    <>
      <input
        {...rest}
        type="file"
        style={{ display: 'none' }}
        ref={fileRef}
        onChange={handleSelectImage}
        accept="image/png,image/gif,image/jpeg,image/jpg"
      />
      <ClickAble
        onClick={() => fileRef.current.click()}
        className={className}
      >
        {children}
      </ClickAble>
    </>
  )
}

export default Uploader
