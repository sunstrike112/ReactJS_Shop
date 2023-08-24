import styled from 'styled-components'
import { Space } from 'antd'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1rem;
  flex-direction: column;
  overflow: auto;
  color: ${({ theme }) => theme.text_primary};
  min-height: 100vh;

  .anticon-search {
    margin-right: 0;
  }

  .content {
	  display: flex;
    .left {
      width: 30%;
      margin-right: .5rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
      border-radius: .75rem;
      box-shadow: 0px 4px 4px rgb(0 0 0 / 5%);
      background-color: #fff;
    }
    .right {
      width: 70%;
      margin-left: .5rem;
    }
  }

  .cell-flex {
    .folder-file {
      word-break: break-all;
    }
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
  }
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

export const ListButton = styled(Space)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin-bottom: 1rem;
  align-items: center;
`
