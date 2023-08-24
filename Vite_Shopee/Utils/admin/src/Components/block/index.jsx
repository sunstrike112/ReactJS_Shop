/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { useHistories } from 'Hooks'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 0;
  background-color: ${({ theme }) => theme.bg_block};
  border: 1px solid ${({ theme }) => theme.text_secondary};
  flex-direction: column;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.125);
  margin: 16px 0;
`
const Header = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  padding: 20px;
  align-items: center;
  font-size: 18px;
  background-color: ${({ theme }) => theme.bg_block_header};
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`
const Body = styled.div`
  width: 100%;
  display: flex;
  padding: 50px 20px;
  justify-content: space-between;
  color: ${({ theme }) => theme.primary};
  flex-wrap: wrap;
  flex-direction: row;
  background-color: ${({ theme }) => theme.bg_block};
`

const Item = styled.div`
  width: calc(50% - 10px);
  display: flex;
  padding: 14px 40px;
  color: ${({ theme }) => theme.text_hight_light};
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.text_hight_light};
  margin-top: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.primary};
  font-weight: 400;
  border-radius:6px;

  .icon {
    margin-right: 16px;
    fill: ${({ theme, fill }) => theme[fill]};
    stroke: ${({ theme, stroke }) => theme[stroke]};
  }
`

const Block = ({
  t,
  blocks = [],
  title
}) => {
  const history = useHistories()

  return (
    <Wrapper>
      <Header>
        {t(title)}
      </Header>
      <Body>
        {blocks.map((block) => {
          const { name, Icon, path, fill, stroke } = block
          return (
            <Item
              key={name}
              onClick={() => history.push(path)}
              fill={fill}
              stroke={stroke}
            >
              <Icon className="icon" />
              <span>{t(name)}</span>
            </Item>
          )
        })}
      </Body>
    </Wrapper>
  )
}
export default Block
