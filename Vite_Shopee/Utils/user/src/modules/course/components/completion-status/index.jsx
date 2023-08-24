/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'
import { Tag } from 'antd'

import { useTranslation } from 'react-i18next'
import ProgressSlider from '../../../../components/progress'
import { TextPrimary } from '../../../../components'
import { MEDIA_WIDTHS } from '../../../../themes'

const Style = styled.div`
  .completion-tab-content{
    background: ${({ theme }) => theme.bg_course_status};
    margin-bottom: 5px;
    border-radius: 8px;
    min-height: 113px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .box-status {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;      
      padding: 20px 32px;
      .ant-progress {
        width: 100%;
        .ant-progress-inner {
          background: #f1f1f1;
          }
        }
    }
  }
  .completion-tab {
    background: ${({ theme }) => theme.white};
    > div {
      border-bottom: 0;
      margin-bottom: 10px;
    }
    .tab-item {
      background: linear-gradient(180deg, #F7FBFF 0%, rgba(247, 251, 255, 0) 100%);
      border: 1px solid #373473;
      box-sizing: border-box;
      border-radius: 36px;
      padding: 0 20px;
      &.active {
        background: #FFFFFF;
        border: 1px solid #19BCFE;
        box-sizing: border-box;
        box-shadow: inset 0px 4px 4px #19BCFE;
        border-radius: 36px;
        p {
          color: ${({ theme }) => theme.text_hight_light};
        }
      }
    }
  }
  .footer {
    display: flex;
    width: 100%;
    div:first-child {
      margin-right: 120px;
    }
    @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
      display: flex;
      div:first-child {
        margin-right: 16px;
      }
    }
    div {
      display: flex;
      align-items: center;
      p:first-child {
        margin-right: 16px;
      }
    }
  }
  .header {
    display: flex;
    .list-tag {
      align-self: center;
      margin-left: auto;
      width: 80%;
      .course-tag {
        font-size: 15px;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 2px;
        color: white;
        padding: 2px 4px;
        word-wrap: break-word;
        white-space: normal;
        margin-right: 4px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`
const ComletionStatus = ({ isCourseDetail = true, courseProgress, courseTags, numberOfTotalCourse, numberOfCompletedCourse }) => {
  const { t } = useTranslation()

  const renderStatusRequired = () => (
    <>
      <div className="box-status">
        <div className="header">
          <TextPrimary className="progress-text" fontSize="size_16" fontWeight="fw_600">{t('course_screen.completed_courses_rate')}</TextPrimary>
        </div>
        <div className="rate">
          <div className="box-progress">
            <ProgressSlider
              percent={courseProgress || 0}
              status="active"
            />
          </div>
        </div>
        <div className="footer">
          <div>
            <TextPrimary fontSize="size_14">{t(`${isCourseDetail ? 'course_screen.completed_courses' : 'course_screen.completed_lessons'}`)}:</TextPrimary>
            <TextPrimary fontSize="size_18" fontWeight="fw_600">{numberOfCompletedCourse || 0 }/{numberOfTotalCourse || 0}</TextPrimary>
          </div>
          <div>
            <TextPrimary fontSize="size_14">{t('course_screen.completed_rate')}:</TextPrimary>
            <TextPrimary fontSize="size_18" color={courseProgress === 100 ? 'green' : 'yellow'} fontWeight="fw_600">{courseProgress || 0}%</TextPrimary>
          </div>
        </div>
      </div>
    </>
  )
  return (
    <Style>
      <div className="completion-tab">
        <div className="completion-tab-content">
          {renderStatusRequired()}
        </div>
      </div>
    </Style>
  )
}

export default ComletionStatus
