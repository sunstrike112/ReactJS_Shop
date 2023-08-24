import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  .tab-item {
    position: relative;
    display: flex;
    padding: 0 8px;
    border-bottom: 0;
    margin-right: 18px;
    flex-direction: column;
    &::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      opacity: 0;
      transition: opacity 0.2s;
    }
    &::before {
      position: absolute;
      content: "";
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      opacity: 0;
    }
    &.active {
      &::after,
      &::before {
        opacity: 1;
      }
    }
  }
`
export const Divider = styled.div`
  width: 65%;
  border: 1px solid ${({ theme }) => theme.text_primary};
`

export const NumberCourse = styled.div`
  margin-left: 16px;
  width: 38px;
  background: ${({ theme }) => theme.grey_blur};
  display: flex;
  justify-content: center;
  align-items: center;
`
