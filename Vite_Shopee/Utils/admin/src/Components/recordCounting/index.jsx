/* eslint-disable react/prop-types */
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: ${({ showSelectedRecord }) => (showSelectedRecord ? 'space-between' : 'flex-end')};
  align-items: center;
`
const RecordItem = styled.div`
  height: 60px;
  width: 220px;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_primary};
  border-radius: 4px;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
`

const RecordCounting = ({ showSelectedRecord = true, selectedRecord, totalRecord }) => {
  const { t } = useTranslation(['common'])
  return (
    <Wrapper showSelectedRecord={showSelectedRecord}>
      {showSelectedRecord && (
        <RecordItem>
          <span>
            {t('selected_record', {
              amount: selectedRecord
            })}
          </span>
        </RecordItem>
      )}
      <RecordItem>
        <span>
          {t('total_record', {
            amount: totalRecord
          })}
        </span>
      </RecordItem>
    </Wrapper>
  )
}

export default RecordCounting
