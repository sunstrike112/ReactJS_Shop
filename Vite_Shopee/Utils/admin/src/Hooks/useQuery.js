import { QUERY } from 'Constants'
import React from 'react'
import {
  useLocation
} from 'react-router-dom'

export const useQuery = () => {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

export const useGetQuery = () => {
  const query = useQuery()
  const workspaceid = query.get(QUERY.WORKSPACE_ID)
  const companyId = query.get(QUERY.COMPANY_ID)

  const queryWorkspaceID = {
    ONLY: workspaceid ? `?${QUERY.WORKSPACE_ID}=${workspaceid}` : '',
    CONNECT: workspaceid ? `&${QUERY.WORKSPACE_ID}=${workspaceid}` : ''
  }

  return {
    workspaceid,
    companyId,
    queryWorkspaceID
  }
}
