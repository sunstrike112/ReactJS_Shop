import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  background-color: white;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  padding: 10px;
`

export const Box = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  margin-top: 8px;
  margin-bottom: 24px;
  .show__more {
    display: flex;
    align-items: center;
    img {
      margin-left: 6px;
    }
  }

  .ant-form-item {
    margin-bottom: 0;
    .ant-form-item-control {
      input {
        padding: 8px 16px;
      }
      .ant-form-item-explain {
        display: none;
      }
    }
  }
`

export const HeaderSearch = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.talk_primary};
  .search-ico {
    padding: 16px;
    font-size: 20px;
  }
`

export const Content = styled.div`
  padding: 32px 16px;
`

export const SearchWrapper = styled.div`
  margin-bottom: 16px;
	overflow: hidden;
    .ant-tag-checkable {
		display: inline-block;
    border: 1px solid ${({ theme }) => theme.grey_blur};
    padding: 4px 16px;
    font-weight: 600;
    border-radius: 4px;
    color: ${({ theme }) => theme.text_primary};
    margin: 3px;
    word-break: break-all;	
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: fit-content;
    max-width: 100%;
    &.ant-tag-checkable-checked {
      color: white;
      background: ${({ theme }) => theme.success};
      &:hover {
        color: ${({ theme }) => theme.grey_blur};
      }
    }
    &:hover {
        color: ${({ theme }) => theme.success};
    }
    &:active {
      background: ${({ theme }) => theme.success};
    }
    p {
      margin-bottom: 0px;
    }
  }
`

export const Title = styled.div`
  font-weight: 700;
  padding: 4px 8px;
  margin-bottom: 8px;
  border: 1px solid ${({ theme }) => theme.talk_primary};
  width: fit-content;
  border-radius: 4px;
`

export const WrapperButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  button {
    width: 100%;
    border-radius: 50px;
    max-width: 120px;
    padding: 10px 0;
    border: 1px solid ${({ theme }) => theme.success};
  }
  .btn__search {
    background-color: ${({ theme }) => theme.green};
    p {
      color: white;
    }
    &:hover, &:active, &:focus {
      opacity: 0.8;
      border: 1px solid ${({ theme }) => theme.success};
    }
  }
  .btn__reset {
    background-color: white;
    p {
      color: ${({ theme }) => theme.green};
      }
    &:hover {
      opacity: 0.8;
      border: 1px solid ${({ theme }) => theme.success};
      background-color: ${({ theme }) => theme.green};
      p {
        color: white;
      }
    }
    &:active, &:focus {
      border: 1px solid ${({ theme }) => theme.success};
    }
  }
`
