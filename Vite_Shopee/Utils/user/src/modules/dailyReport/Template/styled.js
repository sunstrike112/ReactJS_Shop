import { Button } from 'antd'
import styled from 'styled-components'

export const StyledWrapper = styled.div`
  min-width: 1088px;
  margin: 0px auto;
  justify-content: space-between;
  .ant-divider-vertical {
    height: 100%;
    @media screen and (max-width: 1170px) {
      display: none;
    }
  }
`

export const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.bg_scroll_bar};
  margin-top: 46px;
  border-radius: 4px;
  align-items: center;

  .title {
    margin-top: 26px;
    margin-left: 37px;
    margin-bottom: 24px;
  }

  .ant-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const StyledCreateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 37px;
  margin-top: 64px;
`

export const StyledCreateButton = styled(Button)`
  background-color: #00c271;
  color: ${({ theme }) => theme.bg_scroll_bar};
  width: 131px;
  height: 44px;
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.white};
    border-color: #00c271;
    color: #00c271;
  }
`

export const TextCustom = styled.text`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export const StyledTemplateContainer = styled.div`
  margin-bottom: 11px;
  display: flex;
  padding-left: 53px;
  padding-right: 53px;
`

export const StyledTemplateContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 16px;
  padding-right: 16px;
  border: 1px solid #f1f1f1;
  width: 43rem;
  height: auto;
  border-radius: 5px;
  align-items: center;
  margin-right: 10px;
  padding-top: 12px;
  padding-bottom: 12px;
`

export const StyledTemplateButton = styled(Button)`
  border: 1px solid;
  margin-right: 10px;
  width: 131px;
  height: 44px;
  border-radius: 4px;

  &.delete {
    border-color: #F33A27;
    color: #F33A27;
  }

  &.edit {
    border-color: #00C271;
    color: #00C271;
  }
`
