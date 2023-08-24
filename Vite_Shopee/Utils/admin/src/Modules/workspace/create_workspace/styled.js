import styled from 'styled-components'

export const AdminsWrapper = styled.div`
  max-height: 50px;
  overflow-y: scroll;
`

export const AdminItem = styled.div`
  display: flex;
  justify-content: space-between;  
  align-items: center;

  padding: 10px 0;
`

export const ListAdminsStyled = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 0 10px;
  margin-bottom: 5px;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: #838383;
  }
`
