import styled from 'styled-components'

export const Wrapper = styled.div`
  .language {
    display: flex;
    margin-left: 10px;
    img {
      margin-right: 10px;
    }
  }
  .top {
    display: flex;
    justify-content: flex-end;
    height: 64px;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.grey_blur};
  }
  .categories {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  p {
    word-break: break-word;
    cursor: pointer;
  }
  a {
    display: block;
    padding: 0;
    text-align: left;
    color: ${({ isActive, theme }) => (isActive ? theme.green : theme.grey)};
    &:hover {
      color: ${({ theme }) => theme.green};
    }
  }
}
`
