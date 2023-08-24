/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { LESSON_TYPE } from '../../../../constants'
import LessonLayout from '../lesson-layout'
import { Wrapper } from './styled'
import { getFileFromS3 } from '../../../../utils'

const LessonSlide = ({ courseDetail, lessonDetail, submitLesson, isSubmitEnd, courseId, lessonId, countViewUnit, historyId, isLoading }) => {
  const iframeRef = useRef()
  const { t } = useTranslation()

  const [isToggle, setIsToggle] = useState(true)

  const handleChange = useCallback(() => {
    if (
      lessonDetail?.path
      && !isSubmitEnd
    ) {
      submitLesson()
    }
  }, [lessonDetail, isSubmitEnd, historyId])

  useEffect(() => {
    countViewUnit({ courseId, lessonId, typeUnit: LESSON_TYPE.LESSON })
  }, [])

  return (
    <Wrapper>
      <LessonLayout
        courseDetail={courseDetail}
        lessonDetail={lessonDetail}
        submitLesson={submitLesson}
        isToggle={isToggle}
        isLoading={isLoading}
        setIsToggle={setIsToggle}
        headerRightAction={<Button danger size="large" type="primary" onClick={handleChange} icon={<SendOutlined />}>{t('common.submit_end')}</Button>}
      >
        <div className="iframe-wrapper">
          <iframe
            title="slides"
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${getFileFromS3(lessonDetail.path)}`}
            frameBorder="0"
            ref={iframeRef}
          />
        </div>
      </LessonLayout>
    </Wrapper>
  )
}

export default LessonSlide
