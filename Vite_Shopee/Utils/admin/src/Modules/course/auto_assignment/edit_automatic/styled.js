import styled from 'styled-components'
import { Divider as DividerAntd } from 'antd'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 24px;
  flex-direction: column;
  color: ${({ theme }) => theme.text_primary};

  .ant-form-item {
    margin-bottom: 0;
  }

  .anticon-search {
    margin-right: 0;
  }
  
  form {
    margin-top: 24px;
  }
`

export const Action = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  width: 100%;
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

export const ListButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  .button__submit {
    margin-left: 5px;
    padding: 20px;
  }
  .icon {
    fill: ${({ theme }) => theme.white};
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

export const Divider = styled(DividerAntd)`
  background-color: ${({ theme, color }) => theme[color] || theme.bg_primary};
  height: 2px;
  padding: 0;
  margin: 0;
  &.space {
    margin-top: 24px;
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

export const CourseItem = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;  
  align-items: center;
`

export const DatePickerGroup = styled.div`
  display: flex;
  width: 80%;
`
