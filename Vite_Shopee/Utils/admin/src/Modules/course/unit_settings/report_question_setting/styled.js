import styled from 'styled-components'
import { Divider as DividerAntd } from 'antd'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 24px;
  flex-direction: column;
  color: ${({ theme }) => theme.text_primary};

  .anticon-search {
    margin-right: 0;
  }
  
  form {
    margin-top: 24px;
  }
  
  p {
    margin-bottom: 0;
  }

  

  button {
    width: max-content;
    &.change__question {
      padding: 20px;
      .icon {
        fill: ${({ theme }) => theme.text_primary};
      }
    }
    &.button__submit {
      padding: 20px;
      .icon {
        fill: ${({ theme }) => theme.white};
      }
    }
  }
`

export const ListButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

export const Divider = styled(DividerAntd)`
  background-color: ${({ theme, color }) => theme[color] || theme.bg_primary};
  height: 2px;
  padding: 0;
  margin: 0;
  &.space {
    margin-top: 20px;
  }
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
  span {
    font-weight: 600;
  }
`

export const Right = styled.div`
  display: flex;
  width: 70%;
  padding: 16px;
  flex-direction: column;
  &.question__setting {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: max-content;
  }
  &.upload__file {
    flex-direction: row;
    align-items: center;
  }
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

export const ContentUpload = styled.div`
  width: 70%;
  overflow: hidden;
`

export const ActionUpload = styled.div`
  flex: 1;
  margin-left: 10px;
`
