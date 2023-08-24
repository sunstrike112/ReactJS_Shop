/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ClickAble, TextNormal } from '..'
import { EYE_DISABLE_ICON, EYE_ICON } from '../../assets'

export const Input = styled.input`
  width: 100%;
  padding: 4px 11px;
  min-height: 44px;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  background: ${({ theme, readOnly }) => (!readOnly ? theme.white : theme.grey_blur)};
  border-radius: 4px;
  outline: none;
  margin-bottom: 8px;
  transition: all 300ms ease;
  &:focus,
  &:hover {
    border: 1px solid
      ${({ theme, readOnly }) => (!readOnly ? theme.green : theme.grey_blur)};
  }
  &.error {
    border-color: ${({ theme }) => theme.text_danger};
  }
`

const InputWrapper = styled.div`
  position: relative;
`

const ShowPasswordWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);

  svg {
    color: rgba(0, 0, 0, 0.45) !important;
  }
`

const InputBox = ({
  error,
  isShowErrorText = true,
  register,
  name,
  placeholder,
  isPassword,
  type,
  style,
  ...rest
}) => {
  const { t } = useTranslation()
  const [isShowPassword, setIsShowPass] = useState(false)
  return (
    <>
      <InputWrapper>
        <Input
          className={error && 'error'}
          {...register(name)}
          placeholder={placeholder}
          type={isShowPassword ? 'text' : type || 'text'}
          style={style}
          {...rest}
        />
        {isPassword && (
          <ShowPasswordWrapper>
            {!isShowPassword && (
              <ClickAble onClick={() => setIsShowPass(true)}>
                <EYE_DISABLE_ICON />
              </ClickAble>
            )}
            {isShowPassword && (
              <ClickAble onClick={() => setIsShowPass(false)}>
                <EYE_ICON />
              </ClickAble>
            )}
          </ShowPasswordWrapper>
        )}
      </InputWrapper>

      <TextNormal fontSize="size_14" fontWeight="fw_400" color="text_danger">
        {(error && isShowErrorText) && t(error.message)}
      </TextNormal>
    </>
  )
}

export default InputBox
