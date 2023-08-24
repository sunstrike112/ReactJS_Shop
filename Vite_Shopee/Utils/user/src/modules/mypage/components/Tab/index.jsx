/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { TextPrimary } from '../../../../components'
import { MEDIA_WIDTHS } from '../../../../themes'

const Wrapper = styled.div`
  .course-list-title {
    display: flex;
    align-items: center;
    margin-right: 10px;
    @media screen and (min-width: 834px) {
      margin-right: 20px;
    }
    .tab_title {
      border-bottom: ${({ color }) => (color === 'black' ? `2px solid ${color}` : 'none')};
    }
      p {
        cursor: pointer;
        @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
          font-size: 20px;
        }
      }
    }
`
const MypageTab = ({
  onChangeTab,
  courseTotal,
  text,
  activeTab
}) => (
  <Wrapper color={activeTab ? 'black' : 'grey'}>
    <div className="course-list-title">
      <TextPrimary
        aria-hidden="true"
        onClick={onChangeTab}
        color={activeTab ? 'text_active_green' : 'grey'}
        fontSize="size_20"
        fontWeight="fw_600"
        className="tab_title"
      >
        {text}
      </TextPrimary>
      <div className="course-numbers-box">
        <TextPrimary
          color={activeTab ? 'text_active_green' : 'grey'}
          fontWeight="fw_600"
          fontSize="size_12"
        >
          {courseTotal || 0}
        </TextPrimary>
      </div>
    </div>
  </Wrapper>
)
export default MypageTab
