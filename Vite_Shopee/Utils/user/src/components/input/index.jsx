/* eslint-disable react/prop-types */
import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'
import { Image, ClickAble } from '..'
import { SEARCH_REMOVE_KEY } from '../../assets'
import { MEDIA_WIDTHS } from '../../themes'

const InputWrapper = styled.input`
  background-color: ${({ theme, background }) => theme[background]};
  /* padding: 8px ${({ icon }) => (icon ? '40px' : '8px')}; */
  padding: 8px 8px 8px 40px;
  font-size: 12px;
  border: 0.5px solid ${({ theme, borderColor }) => theme[borderColor] || theme.primary};
  border-radius: 4px;
  width: ${({ theme, inputSize }) => theme[inputSize]};
  transition: 0.2s;
  
  &:hover {
    opacity: 0.8;
    border: 0.5px solid ${({ theme }) => theme.green};
  }

  &:active {
    opacity: 0.7;
    border: 0.5px solid ${({ theme }) => theme.secondary};
  }

  &:focus {
    opacity: 1;
    border: 0.5px solid ${({ theme }) => theme.green};
    outline: none;
  }

  &.error {
    border-color: ${({ theme }) => theme.text_danger};
  }

  /* @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    font-size: 12px;
  }

  @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    font-size: 12px;
  }

  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    font-size: 10px;
  } */
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .icon {
    position: absolute;
    left: 16px;
    z-index: 99;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
  }
`

const Input = (
  {
    search = false,
    icon,
    background = 'white',
    widthBorder,
    borderColor,
    placeholder,
    inputSize = 'input_small',
    onChange,
    onSearch,
    disabled = false,
    ...rest
  },
  ref
) => {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    }
  }))
  return (
    <Wrapper>
      <InputWrapper
        {...rest}
        icon={icon}
        background={background}
        borderColor={borderColor}
        ref={inputRef}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        inputSize={inputSize}
      />
      {icon ? (
        <ClickAble
          className="icon"
          onClick={onSearch}
        >
          <Image src={icon} />
        </ClickAble>
      ) : (
        ''
      )}
      {search ? (
        <ClickAble onClick={onSearch}>
          <Image style={{ position: 'absolute', right: 16, cursor: 'pointer' }} src={SEARCH_REMOVE_KEY} />
        </ClickAble>
      ) : (
        ''
      )}
    </Wrapper>
  )
}

export default forwardRef(Input)
