/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint no-unused-expressions: 0 */
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { Popconfirm } from 'antd'
import { Table, TBody, Tr, Td as TdRoot } from 'Themes/facit'
import { FormSelectV2 } from 'Components'
import { useMyCompany } from 'Hooks'
import styled from 'styled-components'
import { VALUE_INIT_TABS, VALUE_INIT_MENUS, MENU_INIT, TAB_INIT, REGEX } from 'Constants'
import { getFileFromS3 } from 'Utils'
import WorkspaceAdminForm from './WorkspaceAdminForm'
import SuperAdminForm from './SuperAdminForm'
import editProfileSchema from './schema'
import { SubmitButton, CancelButton, ButtonWrapper, EditWrapper, CustomizeContainer } from './styled'
import { StyledTd, StyledTh } from '../CompanyInfos/styled'

const Td = styled(TdRoot)`
  padding: 1rem 1rem 0 1rem;
`

const EditCompanyForm = ({
  company,
  companyId,
  setIsEdit,
  isWorkspaceAdmin,
  isSuperAdmin
}) => {
  const { t } = useTranslation(['myCompany'])
  const { loadCompanyInfo, loadCompanyDetailAction, updateCompanyInfoAction } = useMyCompany()
  const form = useForm({
    resolver: yupResolver(editProfileSchema(t, isWorkspaceAdmin, isSuperAdmin, company?.isWorkspace))
  })
  const { handleSubmit, setValue, clearErrors, watch, getValues } = form

  const [menuWatch] = watch(['menu'])

  const initForm = useCallback(() => {
    setValue('companyName', company?.companyName || '')
    if (isSuperAdmin || company.isWorkspace === 2) {
      setValue('companyCodeSeraku', company?.companyCodeSeraku || '')
    }
    setValue('companyFuriganaName', company?.companyFuriganaName || '')
    setValue('managerFullName', company?.managerFullName || '')
    setValue('managerFuriganaFullName', company?.managerFuriganaFullName || '')
    setValue('career', company?.career || '')
    setValue('cellPhoneNumber', company?.cellPhoneNumber || '')
    setValue('address', company?.address || '')
    setValue('email', company?.email || '')
    setValue('numberOfEmployee', company?.numberOfEmployee || 0)
    setValue('menu', company?.initialDisplay.menu)
    setValue('tab', company?.initialDisplay.tab)
    clearErrors()
  }, [company])

  useEffect(() => {
    if (company) {
      initForm()
    }
  }, [company])

  useEffect(() => {
    clearErrors()
  }, [t])

  useEffect(() => {
    if (isSuperAdmin) {
      const companyCodeSeraku = getValues('companyCodeSeraku')
      if (typeof companyCodeSeraku === 'string') {
        setValue('companyCodeSeraku', companyCodeSeraku?.replace(REGEX.SERAKU_CODE, ''))
      }
    }
  }, [watch('companyCodeSeraku')])

  const onSubmit = useCallback((formData) => {
    const { menu, tab } = formData
    const initialDisplay = { menu, tab }
    const data = {
      ...formData,
      companyCodeSeraku: +formData.companyCodeSeraku,
      initialDisplay,
      imagePath: getFileFromS3(company.imagePath) || '',
      companyId: isSuperAdmin ? companyId : null
    }

    if (!isSuperAdmin || company?.isWorkspace === 2) {
      data.companyCodeSeraku = company?.companyCodeSeraku
    }

    updateCompanyInfoAction({
      data,
      callback: {
        done: () => {
          if (isSuperAdmin) {
            loadCompanyDetailAction({ companyId })
          } else {
            loadCompanyInfo()
          }
          setIsEdit(false)
        }
      }
    })
  }, [company, isSuperAdmin, companyId])

  const handleSelectMenu = useCallback((value) => {
    setValue('menu', value)

    const { menu: currentMenu, tab: currentTab } = company?.initialDisplay

    setValue('tab', value === currentMenu ? currentTab : VALUE_INIT_TABS.NISSOKEN)
  }, [company])

  return (
    <EditWrapper>
      <form>
        <FormProvider {...form}>
          <Table>
            <TBody>
              {isWorkspaceAdmin ? (
                <WorkspaceAdminForm company={company} />
              )
                : (
                  <SuperAdminForm company={company} isSuperAdmin={isSuperAdmin} />
                )}
              <Tr>
                <StyledTh>{t('init_display')}</StyledTh>
                <StyledTd>
                  <CustomizeContainer>
                    <FormSelectV2
                      name="menu"
                      options={MENU_INIT}
                      label={t('common:menu')}
                      wrapperProps={{
                        colon: false
                      }}
                      onChange={handleSelectMenu}
                    />
                    <FormSelectV2
                      name="tab"
                      options={menuWatch === VALUE_INIT_MENUS.TOP_PAGE ? TAB_INIT.TOP_PAGE : TAB_INIT.MY_PAGE}
                      label={t('common:tab')}
                      wrapperProps={{
                        colon: false
                      }}
                    />
                  </CustomizeContainer>
                </StyledTd>
              </Tr>
            </TBody>
          </Table>
          <ButtonWrapper>
            <CancelButton
              htmlType="button"
              title={t('cancel')}
              onClick={() => setIsEdit(false)}
            />
            <Popconfirm title={t('submit_confirm')} onConfirm={handleSubmit(onSubmit)} okText={t('common:change')} cancelText={t('common:cancel')}>
              <SubmitButton
                htmlType="submit"
                title={t('update')}
              />
            </Popconfirm>
          </ButtonWrapper>
        </FormProvider>
      </form>

    </EditWrapper>
  )
}

export default EditCompanyForm
