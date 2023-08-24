import React from 'react'

import { useTranslation } from 'react-i18next'
import { ICON_PEN_TOOL } from 'Assets'
import { Block, HeaderTab } from 'Components'

import { Wrapper } from './styled'
import CONSTANT from './constant'

const CourseResultScreen = () => {
  const { t } = useTranslation(['courseResult'])

  return (
    <Wrapper>
      <HeaderTab icon={ICON_PEN_TOOL} title={t('course_result')} />
      <Block
        t={t}
        blocks={CONSTANT.course_result}
        title="course"
      />
      <Block
        t={t}
        blocks={CONSTANT.course_unit}
        title="unit"
      />
    </Wrapper>
  )
}

export default CourseResultScreen
