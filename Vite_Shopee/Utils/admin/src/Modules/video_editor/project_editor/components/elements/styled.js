import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 8px;
`

const IconButton = styled.div`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;

  @media only screen and (max-width: 1440px),
  screen and (max-height: 800px){
    img {
      width: 48px;
      height: 48px;
    }
  }

  @media screen and (max-width: 1280px) {
    img {
      width: 48px;
      height: 48px;
    }
  }

  @media only screen and (max-width: 1280px),
  screen and (max-height: 800px){
    img {
      width: 48px;
      height: 48px;
    }
  }
`
export {
  Container,
  IconButton
}
