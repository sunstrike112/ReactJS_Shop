/* eslint-disable react/prop-types */
import React, { Fragment, forwardRef } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { useTranslation } from 'react-i18next'
import { Popconfirm, Popover } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { LESSON_TYPE } from '../../constants'
import { TextPrimary, ProgressSlider, ClickAble } from '../index'
import { REPORT, SURVEY, TEST, LESSON } from '../../assets'
import { PopoverWrapper, Divider, StyledWrapper, stylesIcon } from './styled'
import { getFileFromS3 } from '../../utils'
import Image from '../image'

const unitIconMapping = {
  [LESSON_TYPE.REPORT]: <REPORT style={stylesIcon} />,
  [LESSON_TYPE.SURVEY]: <SURVEY style={stylesIcon} />,
  [LESSON_TYPE.TEST]: <TEST style={stylesIcon} />,
  [LESSON_TYPE.LESSON]: <LESSON style={stylesIcon} />
}

const CardAsList = ({
  name,
  cardImage,
  courseOverviewText,
  icons = [],
  progress,
  isShowProgress = true,
  startTime,
  endTime,
  onNavigate,
  isNew = false,
  cantHidden,
  courseId,
  onHideCourse,
  ...rest
}, ref) => {
  const { t } = useTranslation()
  const onClick = () => {
    if (onNavigate) {
      onNavigate()
    }
  }
  const handleHideCourse = () => {
    if (onHideCourse) {
      onHideCourse({
        courseId
      })
    }
  }

  const Content = ({ html, title }) => (
    <PopoverWrapper>
      <TextPrimary className="popover__title" fontWeight="fw_600" fontSize="size_16">
        {title}
      </TextPrimary>
      <Divider />
      {ReactHtmlParser(html, {
        decodeEntities: true
      })}
      <div
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          {!!startTime && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {!!startTime && (
                <TextPrimary fontSize="size_12" fontWeight="fw_600">
                  {`${t('course_detail.course-period')} ${startTime}`}
                  {endTime && ` ~ ${endTime}`}
                </TextPrimary>
              )}
            </div>
          )}
        </div>
      </div>
    </PopoverWrapper>
  )

  return (

    <StyledWrapper {...rest} ref={ref}>
      {isNew && (
        <div className="new-channel">
          <span>{t('course_screen.mark_new')}</span>
        </div>
      )}
      {cantHidden && (
      <Popconfirm
        title={t('course_screen.hidden_course')}
        onConfirm={handleHideCourse}
        placement="left"
        okText={t('common.yes')}
        cancelText={t('common.no')}
      >
        <DeleteOutlined className="btn-hide-course" />
      </Popconfirm>
      )}
      <Popover
        content={(
          <Content
            html={courseOverviewText}
            title={name}
          />
        )}
        placement="top"
      >
        <ClickAble onClick={onClick} className="wrapper">
          <div className="left">
            <Image className="card-img" src={getFileFromS3(cardImage)} alt="card_image" />
            <div className="card-content">
              <TextPrimary fontWeight="fw_600" fontSize="size_16">
                {name}
              </TextPrimary>
              <TextPrimary fontSize="size_12" color="text_secondary">
                {courseOverviewText}
              </TextPrimary>
            </div>
          </div>
          <div className="right">
            {isShowProgress && (
            <>
              <TextPrimary className="progress" fontWeight="fw_500" fontSize="size_12">
                {progress}%&nbsp; <span>{t('home_screen.percent')}</span>
              </TextPrimary>
              <ProgressSlider percent={progress || 0} />
            </>
            )}
            <div className="right-units">
              {icons.map((icon) => <Fragment key={icon}>{unitIconMapping[icon]}</Fragment>)}
            </div>
          </div>

        </ClickAble>

      </Popover>
    </StyledWrapper>
  )
}

export default forwardRef(CardAsList)
