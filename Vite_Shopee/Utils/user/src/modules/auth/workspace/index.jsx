import { Skeleton } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LOGO_COMPANY } from '../../../assets'
import { useGlobalStore, useProfile, useWorkspaces } from '../../../hooks'
import { CardWorkspace } from './components'
import { Header, WorkspaceContent, Wrapper, Title, WrapperWorkspace } from './styled'

const WorkSpaceScreen = () => {
  const { t } = useTranslation()

  const { isLoading, data } = useWorkspaces()
  const { getProfile, profile } = useProfile()
  const { infoCompany } = useGlobalStore()

  const handleRedirect = (companyId, setIsRedirecting) => {
    setIsRedirecting(true)
    getProfile({
      userId: profile.userId,
      workspaceid: companyId,
      hasRequestRedirectHome: true,
      callback: () => {
        setIsRedirecting(false)
      }
    })
  }

  return (
    <Wrapper>
      <Header>
        <img
          style={{ width: 150, height: 60, objectFit: 'contain' }}
          alt="workspace"
          src={infoCompany.logoPath || LOGO_COMPANY}
        />
        <span style={{ fontSize: '22px' }}>{t('common.header.welcome')}</span>
        <span>{infoCompany.name || 'Growthcollege'}</span>
      </Header>
      <Title>{t('common.header.title_workspace')}</Title>
      <WrapperWorkspace>
        <WorkspaceContent>
          {isLoading
            ? <Skeleton active />
            : data.map((item, index) => (
              <CardWorkspace item={item} key={index} handleRedirect={handleRedirect} />
            ))}
        </WorkspaceContent>
      </WrapperWorkspace>
    </Wrapper>
  )
}

export default WorkSpaceScreen
