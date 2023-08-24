/* eslint-disable radix */
/* eslint-disable react/prop-types */
import { UserOutlined } from '@ant-design/icons'
import { Title } from 'Components'
import { useRoles, useUserManagement } from 'Hooks'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import CompanyAdminForm from './components/CompanyAdminForm'
import DefaultForm from './components/DefaultForm'
import WorkSpaceForm from './components/WorkSpaceForm'
import WorkspaceVirtualForm from './components/WorkspaceVirtualForm'
import { StyledWrapper } from './styled'

const EditUserScreen = () => {
  const { t } = useTranslation(['user'])
  const { loadUserAction } = useUserManagement()

  const { isCompany, isWorkspaceVirtual, isWorkspaceAdmin } = useRoles()
  const { userId } = useParams()

  useEffect(() => {
    loadUserAction({ params: { userId } })
  }, [userId])

  const renderForm = useMemo(() => {
    switch (true) {
      case isWorkspaceAdmin: return <WorkSpaceForm userId={userId} />
      case isWorkspaceVirtual: return <WorkspaceVirtualForm userId={userId} />
      case isCompany: return <CompanyAdminForm userId={userId} />
      default: return <DefaultForm userId={userId} />
    }
  }, [isWorkspaceAdmin, isWorkspaceVirtual, isCompany, userId])

  return (
    <StyledWrapper>
      <Title
        icon={UserOutlined}
        title={t('edit_user.title')}
      />
      <div className="form-wrapper">
        {renderForm}
      </div>
    </StyledWrapper>
  )
}

export default EditUserScreen
