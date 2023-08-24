import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Space } from 'antd'
import { NormalButton } from 'Components'

export const StyledContent = styled.div`
	display: flex;
	gap: 1rem;
`

export const RouterLink = styled(Link)`
  display: inline-block;
  margin: 24px 0;
  padding: .5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fcfbfb;
  color: #000;
  width: max-content;
  span {
    margin-left: 10px;
  }
`

export const ListButton = styled(Space)`
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0;
  align-items: center;
`

export const Action = styled.div`
  display: flex;
  justify-content: center;

  .anticon {
    cursor: pointer;
    transition: opacity 0.2s;
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

export const SubmitButton = styled(NormalButton)`
  background: ${({ theme }) => theme.bg_primary};
  border: 1px solid ${({ theme }) => theme.bg_primary};
  color: ${({ theme }) => theme.white}!important;
  font-weight: 600;
  font-size: .75rem;
  padding: .4rem 1.75rem;
  height: auto;
  border-radius: .75rem;
  margin: 10px auto 0;
  &:hover,
  &:focus {
    background-color: #5d4eb3;
    border-color: #5d4eb3;
    color: ${({ theme }) => theme.white}
  }
  p {
    color: ${({ theme }) => theme.white}
  }
  &.button__change__credit {
    background: none;
    border: 0;
    color: blue !important;
    margin: 0;
    padding-left: 0;
    text-decoration: underline;
    p {
      color: blue !important;
    }
  }
`

export const StyledSubmitButton = styled(SubmitButton)`
	margin: 10px 0 0 0;
`
