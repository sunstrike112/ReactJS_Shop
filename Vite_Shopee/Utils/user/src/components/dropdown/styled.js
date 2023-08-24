import styled from 'styled-components'

export const OptionWrapper = styled.div`
  display: flex;
  padding: 10px 17px;
  align-items: center;
  &:hover {
    background : ${({ theme }) => theme.green_light};
  }
 .quantity-box {
   width: 20px;
   height: 15px;
   background : ${({ theme }) => theme.grey_blur};
   border-radius: 4px;
   display: flex; 
   margin-left: 8px;
   align-items: center;
   justify-content: center;
 } 
`
export const IndicatorWrapper = styled.div`
  transform: ${({ isDropdown }) => (isDropdown ? 'rotate(180deg)' : '')};
`
