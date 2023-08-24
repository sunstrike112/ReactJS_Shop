/* eslint-disable react/prop-types */
import React from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { formatDate } from 'Utils'
import { Tr } from 'Themes/facit'
import { FORMAT_TIME } from 'Constants/formatTime'
import { FormInput, FormInputNumber, FormTextArea } from 'Components'
import { StyledTd, StyledTh } from '../CompanyInfos/styled'

const SuperAdminForm = ({ company, isSuperAdmin }) => {
  const { t } = useTranslation(['myCompany'])
  return (
    <>
      <Tr>
        <StyledTh>{t('register_date')}</StyledTh>
        <StyledTd>{formatDate(moment.unix(company?.registerDate / 1000), FORMAT_TIME.YEAR_MONTH_DATE)}</StyledTd>
      </Tr>
      <Tr>
        <StyledTh>{t('email')}</StyledTh>
        <StyledTd>
          <FormInput name="email" />
        </StyledTd>
      </Tr>
      <Tr>
        <StyledTh>{t('common:company_code')}</StyledTh>
        <StyledTd>{company?.companyCode}</StyledTd>
      </Tr>
      <Tr>
        <StyledTh>{t('company_name')}</StyledTh>
        <StyledTd>
          <FormInput name="companyName" maxLength={60} />
        </StyledTd>
      </Tr>
      {isSuperAdmin && company?.isWorkspace !== 2 && (
      <Tr>
        <StyledTh>{t('company_code_seraku')}</StyledTh>
        <StyledTd>
          <FormInput
            name="companyCodeSeraku"
            maxLength={18}
          />
        </StyledTd>
      </Tr>
      )}
      <Tr>
        <StyledTh>{t('fugigana_company_name')}</StyledTh>
        <StyledTd>
          <FormInput name="companyFuriganaName" maxLength={60} />
        </StyledTd>
      </Tr>
      <Tr>
        <StyledTh>{t('manager_name')}</StyledTh>
        <StyledTd>
          <FormInput name="managerFullName" maxLength={60} />
        </StyledTd>
      </Tr>
      <Tr>
        <StyledTh>{t('fugigana_manager_name')}</StyledTh>
        <StyledTd>
          <FormInput name="managerFuriganaFullName" maxLength={60} />
        </StyledTd>
      </Tr>
      <Tr>
        <StyledTh>{t('career_name')}</StyledTh>
        <StyledTd>
          <FormInput name="career" />
        </StyledTd>
      </Tr>
      <Tr>
        <StyledTh>{t('tel_phone')}</StyledTh>
        <StyledTd>
          <FormInput name="cellPhoneNumber" />
        </StyledTd>
      </Tr>
      <Tr>
        <StyledTh>{t('address')}</StyledTh>
        <StyledTd>
          <FormTextArea
            name="address"
            Trs={4}
            total={250}
          />
        </StyledTd>
      </Tr>
      <Tr>
        <StyledTh>{t('number_employee')}</StyledTh>
        <StyledTd>
          <FormInputNumber
            className="amount__employee"
            name="numberOfEmployee"
            min="0"
            prefix={null}
            isHideButtonHandle
            isTypingDot={false}
          />
        </StyledTd>
      </Tr>
    </>
  )
}

export default React.memo(SuperAdminForm)
