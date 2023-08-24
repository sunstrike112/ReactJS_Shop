import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Modal, Text, Title } from 'Components'
import { Wrapper } from 'Themes/facit'
import { useQuery, useRoles, useMyCompany } from 'Hooks'
import PaymentInfo from './components/PaymentInfo'
import CompanyInfo from './components/CompanyInfos'
import { StyledContent } from './styled'

const MyCompanyScreen = () => {
  const { t } = useTranslation(['myCompany'])
  const query = useQuery()
  const companyId = query.get('companyId')
  const {
    loadCompanyInfo,
    loadCompanyDetailAction,
    companyInfo,
    companyDetail,
    errorAPI
  } = useMyCompany()
  const { isSuperAdmin, isWorkspaceAdmin } = useRoles()

  const [isErrorUpdateMemberType, setIsErrorUpdateMemberType] = useState(false)

  useEffect(() => {
    if (errorAPI) {
      setIsErrorUpdateMemberType(true)
    }
  }, [errorAPI])

  useEffect(() => {
    if (isSuperAdmin) {
      loadCompanyDetailAction({ companyId })
    }
  }, [isSuperAdmin, companyId])

  useEffect(() => {
    if (isWorkspaceAdmin) {
      loadCompanyInfo()
    }
  }, [isWorkspaceAdmin])

  return (
    <Wrapper>
      <Title
        title={t((isSuperAdmin) ? 'company_detail' : 'title')}
      />
      <StyledContent>
        <CompanyInfo
          company={(isSuperAdmin) ? companyDetail : companyInfo}
          getMyCompany={loadCompanyInfo}
          isSuperAdmin={isSuperAdmin}
          isWorkspaceAdmin={isWorkspaceAdmin}
          companyId={isSuperAdmin ? companyId : companyInfo.companyId}
          loadCompanyDetailAction={loadCompanyDetailAction}
          errorAPI={errorAPI}
        />
        {!isWorkspaceAdmin && (
        <PaymentInfo
          company={isSuperAdmin ? companyDetail : companyInfo}
          isSuperAdmin={isSuperAdmin}
          companyId={companyId}
          errorAPI={errorAPI}
        />
        )}
      </StyledContent>
      {isErrorUpdateMemberType && (
        <Modal
          visible={isErrorUpdateMemberType}
          onSubmitText={t('common:yes')}
          onCancelText={t('common:cancel')}
          onClose={() => setIsErrorUpdateMemberType(false)}
          type="error"
          ok={false}
        >
          <Text.primary
            fontWeight="fw_600"
            style={{ color: 'red', textAlign: 'center' }}
            fontSize="size_16"
          >
            {errorAPI.message}
          </Text.primary>
        </Modal>
      )}
    </Wrapper>
  )
}

export default MyCompanyScreen
