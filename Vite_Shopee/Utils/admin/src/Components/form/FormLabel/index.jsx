/* eslint-disable react/prop-types */
import React from 'react'
import { Text } from 'Components'
import { useTranslation } from 'react-i18next'
import { Content, Description, Label } from './styled'

const FormLabel = ({ title, subtitle, width = 30, description }) => {
  const { t } = useTranslation(['common'])
  return (
    <Label width={width}>
      <Content>
        <Text.primary fontWeight="fw_500" fontSize="size_13">{title}</Text.primary>
        {description && (
        <Description description={description}>
          {description === 'Optional' ? t('label_optional') : t('label_required')}
        </Description>
        )}
      </Content>
      {subtitle && <Text.primary fontSize="size_12">{subtitle}</Text.primary>}
    </Label>
  )
}

export default FormLabel
