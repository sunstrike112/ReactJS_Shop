import styled from 'styled-components'

export const Wrapper = styled.div`
  .ant-form.ant-form-horizontal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .ant-form.ant-form-horizontal > div:nth-child(1) {
    margin-right: 100px;
    min-width: 900px;
    @media screen and (min-width: 1440px) {
      width: 1100px;
    }
    @media screen and (min-width: 1620px) {
      width: 1400px;
    }
  }

  .ant-form-vertical .ant-form-item {
    flex-direction: row;
  }

  form.ant-form.ant-form-vertical {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .dropdown-tree-select {
    padding: 0 4px 0 0;
    word-break: break-word;
  }   
`
