import styled from 'styled-components'

export const ModalWrapper = styled.div`
  .modal-header {
    display: flex;
    width: 70%;
    justify-content: start;
    margin: 15px auto!important;
    flex-direction: column;
    .courseBox {
      display:flex;
      width: 100%;
      p {
        padding: 10px 15px;
        border: 1px solid #eeeeee;
      }
    }
    .unitBox {
      display:flex;
      width: 100%;
      margin-top: -5px;
      p {
        padding: 10px 15px;
        border: 1px solid #eeeeee;
      }
    }
    .title {
      width: 20%;
      font-weight: 600;
    }
    .value {
      width: 80%;
    }
  }
`
