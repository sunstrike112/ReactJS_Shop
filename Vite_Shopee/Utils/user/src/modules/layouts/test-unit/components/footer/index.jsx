/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import useQuery from '../../../../../hooks/useQuery'
import { useGetQuery } from '../../../../../hooks'

import { PrimaryButtonLink } from '../../../../../components'

const Wrapper = styled.div`
  .examination-footer {
    height: 72px;
    display: flex;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    right: 0;
    width: calc(100%);
    background: #fbfbfb;
    border-top: 1px solid ${({ theme }) => theme.grey_blur};
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    .status {
      display: flex;
      align-items: center;
    }
    .progress {
      width: 154px;
      margin: 0px 25px 0px 16px;
    }
  }
  .mr-4 {
    margin-right: 4px;
  }
`
const TestResultFooter = ({
  isSubmit = true,
  redirectFrom = ''
}) => {
  const { t } = useTranslation()
  const { courseId, testId } = useParams()
  const query = useQuery()
  const fromTab = query.get('fromTab')
  const { queryWorkspaceID } = useGetQuery()

  return (
    <>
      {
        (isSubmit && redirectFrom !== 'admin') && (
          <Wrapper>
            <div style={{ width: '100%' }} className="examination-footer">
              <div />
              <PrimaryButtonLink
                backgroundcolor="primary_btn"
                to={`/examination/${courseId}/${testId}?fromTab=${fromTab}${queryWorkspaceID.CONNECT}`}
              >
                {t('examination.test_result.do_test_more_time')}
              </PrimaryButtonLink>
            </div>
          </Wrapper>
        )
      }
    </>
  )
}
export default TestResultFooter
