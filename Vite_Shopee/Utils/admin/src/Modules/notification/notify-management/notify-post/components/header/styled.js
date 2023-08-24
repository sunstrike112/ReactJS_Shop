import styled from 'styled-components'
import { Divider as DividerAntd } from 'antd'

export const Header = styled.div`
  margin: 24px 0;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 5%);
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  form {
    width: 70%;
  }
`
export const Item = styled.div`
  display: flex;
  border: 0.5px solid ${({ theme }) => theme.text_secondary};
  &:not(:first-child) {
    border-top: none;
  }
`
export const Title = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  background: ${({ theme }) => theme.greyMid};
  span {
    color: white;
    font-weight: bold;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    padding: 0 5px;
    background: ${({ theme }) => theme.orangeLow};
    border-radius: 4px;
  }
`
export const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 15px 10px;
`
export const ListButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;
  button {
    &:first-child {
      width: max-content;
      margin-right: 5px;
      border: 1px solid ${({ theme }) => theme.blueHight};
      &:hover {
        border: 1px solid ${({ theme }) => theme.blueHight};
      }
    }
  }
`
export const Divider = styled(DividerAntd)`
  height: 2px;
  padding: 0;
  margin : 0;
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
`
export const Left = styled.div`
  display: flex;
  width: 30%;
  background-color: ${({ theme }) => theme.bg_primary};
  padding: 16px;
`

export const Right = styled.div`
  display: flex;
  width: 70%;
  padding: 16px;
  flex-direction: column;
`
export const RightFormDate = styled.div`
  display: flex;
  width: 30%;
  padding: 16px;
  flex-direction: column;
`
export const ButtonModal = styled.div`
  width: 30%;
  border: 1px solid;
  padding: 10px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.blueHight};
  color: beige;
  cursor: pointer;
`
