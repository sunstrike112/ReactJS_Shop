/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { SearchOutlined } from '@ant-design/icons'

import { NormalButton } from 'Components'

const Header = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.bg_block};
  border: 1px solid ${({ theme }) => theme.text_secondary};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.125);
  margin: 24px 0;
  padding: 16px;
  border-radius: 4px;
`

const Footer = styled.footer`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  button {
    margin-right: 0.5rem;
  }
`

const CancelButton = styled(NormalButton)`
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};
  border: 1px solid ${({ theme }) => theme.grey};
  height: 35px;
  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.grey};
    background: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.black};
  }
`

const SubmitButton = styled(NormalButton)`
  background: ${({ theme }) => theme.blueHight};
  border: 1px solid ${({ theme }) => theme.blueHight};
  color: ${({ theme }) => theme.white};
  font-size: 17px;
  &:hover,
  &:focus {
    background: ${({ theme }) => theme.blueHight};
    border: 1px solid ${({ theme }) => theme.blueHight};
    color: ${({ theme }) => theme.white};
  }
`

const HeaderSearch = ({ children, onCancel, onSubmit }) => {
  const { t } = useTranslation()

  return (
    <Header>
      {children}
      <Footer>
        {onCancel && (
        <CancelButton backgroundcolor="white" onClick={onCancel}>{t('clear')}</CancelButton>
        )}
        {onSubmit && <SubmitButton htmlType="submit" icon={<SearchOutlined />}>{t('common:search_with_condition')}</SubmitButton>}
      </Footer>
    </Header>
  )
}

HeaderSearch.propTypes = {
  onSubmit: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onCancel: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
}

export default HeaderSearch
