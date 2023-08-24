/* eslint-disable react/prop-types */
import { UserOutlined } from '@ant-design/icons'
import { Title } from 'Components'
import { USER_WORKSPACE_ROLE } from 'Constants/auth'
import { useAuth, useRoles, useUserManagement, useGetQuery } from 'Hooks'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CompanyAdminForm from './components/CompanyAdminForm'
import SuperAdminForm from './components/SuperAdminForm'
import WorkspaceForm from './components/WorkspaceForm'
import WorkspaceVirtualForm from './components/WorkspaceVirtualForm'
import { StyledWrapper } from './styled'

const UserRegisterScreen = () => {
  const { t } = useTranslation(['user'])
  const { workspaceid } = useGetQuery()
  const { isSuperAdmin, isWorkspaceVirtual } = useRoles()
  const { profile } = useAuth()

  const {
    isSubmitting,
    createNissokenUserAction,
    companies,
    loadCompaniesAction
  } = useUserManagement()

  const [visibleUserWorkSpace, setVisibleUserWorkSpace] = useState(false)

  const renderForm = useMemo(() => {
    switch (true) {
      case profile.isWorkSpace === USER_WORKSPACE_ROLE.WORKSPACE_ADMIN: {
        return (
          <WorkspaceForm
            workspaceid={workspaceid}
            visibleUserWorkSpace={visibleUserWorkSpace}
            setVisibleUserWorkSpace={setVisibleUserWorkSpace}
            isSubmitting={isSubmitting}
            companies={companies}
            loadCompaniesAction={loadCompaniesAction}
          />
        )
      }
      case isSuperAdmin: {
        return (
          <SuperAdminForm
            createNissokenUserAction={createNissokenUserAction}
            isSubmitting={isSubmitting}
            isSuperAdmin={isSuperAdmin}
          />
        )
      }
      case isWorkspaceVirtual: {
        return (
          <WorkspaceVirtualForm />
        )
      }
      default: {
        return <CompanyAdminForm />
      }
    }
  }, [profile.isWorkSpace, workspaceid, visibleUserWorkSpace, isSubmitting, companies, isSuperAdmin, isWorkspaceVirtual])

  return (
    <StyledWrapper>
      <Title
        icon={UserOutlined}
        title={t('register_user.title')}
      />
      <div className="form-wrapper">
        {renderForm}
      </div>
    </StyledWrapper>
  )
}

export default UserRegisterScreen
