import React from 'react'

import { useTranslation } from 'react-i18next'
import { ICON_PEN_TOOL } from 'Assets'
import { Block, HeaderTab } from 'Components'

import { Wrapper } from './styled'
import CONSTANT from './constant'

const CourseScreen = () => {
  const { t } = useTranslation(['course'])

  return (
    <Wrapper>
      <HeaderTab icon={ICON_PEN_TOOL} title={t('course_management')} />
      <Block
        t={t}
        blocks={CONSTANT.course}
        title="block_course_title"
      />
      <Block
        t={t}
        blocks={CONSTANT.attendance_permissions}
        title="attendance_permissions"
      />
    </Wrapper>
  )
}

export default CourseScreen
