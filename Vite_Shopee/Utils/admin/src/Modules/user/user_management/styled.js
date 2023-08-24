import styled from 'styled-components'
import { Divider as DividerAntd, Space, Button } from 'antd'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 24px;
  flex-direction: column;
  overflow: auto;
  color: ${({ theme }) => theme.text_primary};

  .anticon-search {
    margin-right: 0;
  }
`
export const Header = styled.div`
  width: 100%;
  display: flex;
  height: 120px;
  background-color: ${({ theme }) => theme.bg_block};
  border: 1px solid ${({ theme }) => theme.text_secondary};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.125);
  margin: 24px 0;
  padding: 16px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  span {
    margin-right: 10px;
  }
`

export const Title = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  padding: 20px;
  align-items: center;
  font-size: 24px;
  background-color: ${({ theme }) => theme.bg_block_header};
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  .icon {
    stroke: ${({ theme }) => theme.primary};
    margin-right: 16px;
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
  height: 60px;
  display: flex;
  padding: 0;
  align-items: center;
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

export const Divider = styled(DividerAntd)`
  background-color: ${({ theme, color }) => theme[color] || theme.bg_primary};
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
  .react-select-container {
    width: 100%;
  }
  .upload-button {
    display: flex;
    align-items: center;
    border-radius: 4px;
    margin-bottom: 4px;
    span {
      margin-left: 8px;
    }
  }
`

export const NumberSelectedRecord = styled.div`
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
  justify-content: space-between
`

export const UploadButton = styled.section`
  display: flex;

  .remove-upload-button {
    margin-right: 8px;
  }
`

export const Text = styled(Button)`
  border: none;
  background: transparent;
  box-shadow: none;
  width: 100%;
  text-align: left;
  &.ant-btn:hover, &.ant-btn:focus, &.ant-btn:active {
    background: transparent;
  }
`
