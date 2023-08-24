/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { ICON_CART, ICON_CART_ACTIVE } from '../../../../assets'
import { TextPrimary, IconButton } from '../../..'
import { useOnClickOutside } from '../../../../hooks'
import CartBox from '../../../../modules/carts'

const NoticeNumber = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  left: 15px;
  align-items: center;
  top: 2px;
  justify-content: center;
  background: ${({ theme }) => theme.error};
`
const Cart = ({ number = 0 }) => {
  const [isCart, setIsCart] = useState(false)
  const noticeEl = useRef()
  useOnClickOutside(noticeEl, () => setIsCart(false))
  return (
    <div ref={noticeEl}>
      <div style={{ position: 'relative' }}>
        <IconButton
          height={48}
          width={48}
          src={!isCart ? ICON_CART : ICON_CART_ACTIVE}
          direction="row"
          onClick={() => setIsCart(!isCart)}
        />
        {number > 0 && (
          <NoticeNumber>
            <TextPrimary color="white">{number}</TextPrimary>
          </NoticeNumber>
        )}
        {isCart && <CartBox />}
      </div>
    </div>
  )
}

export default Cart
