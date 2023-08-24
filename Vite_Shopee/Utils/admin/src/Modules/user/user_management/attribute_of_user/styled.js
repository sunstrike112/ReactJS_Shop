import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Divider as DividerAntd } from 'antd'

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 24px;
  overflow: auto;
  color: ${({ theme }) => theme.text_primary};

  .anticon-search {
    margin-right: 0;
  }
`

export const Block = styled.div`
  width: 100%;
  margin: 1rem 0;

  .form-wrapper {
    background: #ffffff;
    border-radius: 1rem;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 5%);
    form {
      width: 80%;
      margin: 0 auto;
      padding: 1rem 0;
    }
  }

  .form-action-group {
    text-align: center;
    margin-top: .5rem;
  }
`

export const Table = styled.table`
  width: 100%;
`

export const TBody = styled.tbody`
`

export const Tr = styled.tr`
`

export const Th = styled.td`
  background-color: #E5E3E3;
  border: 1px solid #ccc;
  width: 200px;
  padding: .5rem;
  font-weight: 600;
`

export const Td = styled.td`
  border: 1px solid #ccc;
  padding: .5rem;
  word-break: break-all;
`

export const WrapperButton = styled.div`
  text-align: center;
  margin-top: .5rem;
`

export const RouterLink = styled(Link)`
  display: inline-block;
  margin-top: .75rem;
  padding: .5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fcfbfb;
  color: #000;
`

export const Action = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  width: 80%;
  justify-content: space-between;

  .icon {
    cursor: pointer;
    transition: opacity 0.2s;
    fill: ${({ theme }) => theme.white};
    background: ${({ theme }) => theme.primary};
    width: 32px;
    height: 32px;
    padding: 8px;
    border-radius: 4px;
     &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.7;
    }

    &.disabled {
      cursor: auto;
      opacity: 0.5;
    }
  }
`

export const TotalRecord = styled.div`
  align-self: flex-end;
  height: 60px;
  width: 220px;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_primary};
  border-radius: 4px;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
`

export const RecordCounting = styled.section`
  display: flex;
  justify-content: flex-end
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
