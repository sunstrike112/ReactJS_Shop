/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/auth/store/saga'
import reducer from 'Modules/auth/store/reducer'
import { loadProfile } from 'Modules/auth/store/actions'
import { useInjectSaga, useInjectReducer } from 'Stores'
import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants/auth'
import { makeSelectAuthentication } from 'Modules/auth/store/selectors'
import { useMemo } from 'react'
import { useQuery } from './useQuery'

export const useAuth = () => {
  useInjectSaga({ key: 'auth', saga })
  useInjectReducer({ key: 'auth', reducer })

  const { isLoading, error, authenticated, profile, metaData } = useSelector(
    makeSelectAuthentication()
  )

  const dispatch = useDispatch()
  const loadProfileAction = (payload) => dispatch(loadProfile(payload))

  return {
    isLoading,
    error,
    authenticated,
    profile,
    metaData,
    loadProfileAction
  }
}

export const useRoles = () => {
  useInjectSaga({ key: 'auth', saga })
  useInjectReducer({ key: 'auth', reducer })

  const query = useQuery()
  const createBy = query.get('createBy')

  const { metaData, profile, isTrialExpired, isCancellation, isPaymentExpired } = useSelector(makeSelectAuthentication())

  const roleWorkspace = profile.isWorkSpace
  const isWorkspaceCompanyAdmin = [USER_WORKSPACE_ROLE.COMPANY_ADMIN].includes(roleWorkspace)
  const isWorkspaceAdmin = [USER_WORKSPACE_ROLE.WORKSPACE_ADMIN].includes(roleWorkspace)
  const isWorkspaceVirtual = [USER_WORKSPACE_ROLE.VIRTUAL_COMPANY].includes(roleWorkspace)

  const role = metaData?.roles ? metaData?.roles[0] : null
  const isSuperAdmin = [USER_ROLE.NISSHOKEN_SUPER_ADMIN].includes(role)
  const isAdmin = [USER_ROLE.NISSHOKEN_ADMIN].includes(role)
  const isCompany = [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(role)
  const isSubCompany = [USER_ROLE.SUB_ADMINISTRATOR].includes(role)
  const isCourseAdmin = [USER_ROLE.COURSE_ADMIN].includes(role)
  const isApprovalManagement = [USER_ROLE.APPROVAL_MANAGEMENT].includes(role)
  const { isTrial, planPackage } = profile
  const userUse = planPackage?.userUse || 0

  const isViewing = useMemo(() => isSuperAdmin && ([USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(createBy)),
    [isSuperAdmin, createBy])

  const isHideJobNare = useMemo(() => [USER_ROLE.COURSE_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(role) && [USER_WORKSPACE_ROLE.WORKSPACE_ADMIN].includes(roleWorkspace),
    [role, roleWorkspace])
  return {
    isSuperAdmin,
    isAdmin,
    isSubCompany,
    isCourseAdmin,
    isCompany,
    isWorkspaceCompanyAdmin,
    isWorkspaceAdmin,
    isWorkspaceVirtual,
    isApprovalManagement,
    isTrial,
    isTrialExpired,
    isCancellation,
    isPaymentExpired,
    userUse,
    role,
    roleWorkspace,
    isViewing,
    isHideJobNare,
    createBy
  }
}
