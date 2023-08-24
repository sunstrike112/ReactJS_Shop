import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(250, 249, 247, 0.8);
  width: 440px;
  margin-bottom: 67px;
`
const Header = styled.div`
  display: flex;
  background: ${({ theme }) => theme.white};
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 65px;
`
const Content = styled.div`
  display: flex;
  width: 100%;
  padding: 30px;
  flex-direction: column;
`
const Form = styled.form`
  margin-top: 19;
  width: 100%;
`

export {
  Wrapper,
  Form,
  Header,
  Content
}
