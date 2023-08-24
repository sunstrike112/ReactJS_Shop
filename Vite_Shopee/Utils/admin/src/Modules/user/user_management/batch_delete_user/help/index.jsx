/* eslint-disable react/no-danger */
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { sanitize } from 'dompurify'

import { Title } from 'Components'
import { EDIT_ICON } from 'Assets'
import {
  Wrapper
} from './styled'
import content from './content'

const BatchRegisterUserHelpScreen = () => {
  const { t, i18n: { language } } = useTranslation(['user'])
  const htmlContent = useMemo(() => content[language], [language])

  return (
    <Wrapper>
      <div className="title">
        <Title
          icon={EDIT_ICON}
          title={t('batch_register_user.help.title')}
        />

      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: sanitize(htmlContent) }} />
    </Wrapper>
  )
}

export default BatchRegisterUserHelpScreen
