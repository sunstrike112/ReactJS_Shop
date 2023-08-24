/* eslint-disable react/prop-types */
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 24px 0;
  display: flex;
  justify-content: ${({ position }) => (position ? 'space-between' : 'flex-end')};
  align-items: center;

  position: relative;
  .pagination {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const TotalSelected = styled.div`
  font-size: 18px;
  font-weight: 600;
  padding: 10px 8px;
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_primary};
  border-radius: 4px;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
`

const HeaderTable = ({ totalSelected, totalCounting }) => {
  const { t } = useTranslation()
  return (
    <Wrapper position={totalSelected}>
      {totalSelected && (
        <TotalSelected>{t('course_category.selected_category', { amount: totalSelected })}</TotalSelected>
      )}
      {totalCounting && (
        <TotalSelected>{t('course_category.total_category', { amount: totalCounting })}</TotalSelected>
      )}
    </Wrapper>
  )
}

export default HeaderTable
