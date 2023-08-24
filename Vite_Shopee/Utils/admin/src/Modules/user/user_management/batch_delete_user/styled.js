import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: calc(100vh - 39px);
  display: flex;
  width: 100%;
  padding: 0 1rem;
  flex-direction: column;
  overflow: auto;
  color: ${({ theme }) => theme.text_primary};

  .introduce {
    background-color: #d9edf7;
    color: #31708f;
    border: 1px solid #bce8f1;
    border-radius: 4px;
    padding: 1rem;
    margin: 1rem 0;
  }

  & h3, label {
    color: #31708f;
  }

  & .ant-form-item-label>label {
    font-weight: bold;
  }
`
