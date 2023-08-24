/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect } from 'react'

// import { E_LEARNING_LOGO } from 'Assets'
import { COMPANY_LOGO } from 'Assets'
import { Image, Text } from 'Components'
import { useAmountOfCompanyUnapproved, useRoles, useRoot } from 'Hooks'
import { Button, Popover, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { PopoverWrapper, Wrapper } from './styled'

const HomeScreen = () => {
  const { t } = useTranslation('common')
  const { infoCompany } = useRoot()
  const { isSuperAdmin, isApprovalManagement } = useRoles()

  const { amountOfCompanyUnapproved, isNoticeToSuperAdmin, getAmountOfCompanyUnapprovedAction, closeNoticeToSuperAdminAction } = useAmountOfCompanyUnapproved()

  const onClose = () => {
    closeNoticeToSuperAdminAction()
  }

  useEffect(() => {
    if (isSuperAdmin || isApprovalManagement) {
      getAmountOfCompanyUnapprovedAction()
    }
  }, [isSuperAdmin])

  return (
    <Wrapper id="intro">
      <Popover
        open={isNoticeToSuperAdmin}
        content={(
          <PopoverWrapper>
            <Text.primary>{t('notice_approve.1', { number: amountOfCompanyUnapproved })}</Text.primary>
            <Text.primary>{t('notice_approve.2')}</Text.primary>
            <Space style={{ width: '100%', justifyContent: 'center' }}>
              <Button onClick={onClose}>{t('create.close')}</Button>
            </Space>
          </PopoverWrapper>
				)}
        trigger="click"
        placement="topRight"
      >
        <div className="popover" />
      </Popover>
      <div className="container">
        <div className="container__content">
          <Image className="container__content--img" src={infoCompany.logoPath || COMPANY_LOGO} />
          <h1 className="container__content--title">Welcome to</h1>
          <h2 className="container__content--company">{infoCompany.name || 'Growthcollege'}</h2>
        </div>
      </div>
    </Wrapper>
  )
}

export default HomeScreen
