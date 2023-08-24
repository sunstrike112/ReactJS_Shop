import { useLocation } from 'react-router-dom'
import { QUERY } from '../constants'
import { useWorkspaces } from './auth'

export default function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export const useGetQuery = () => {
  const query = useQuery()
  const workspaceid = query.get(QUERY.WORKSPACE_ID)
  const fromTab = query.get(QUERY.FROM_TAB)

  const { hasOnlyOneWorkspace, hasWorkspaces } = useWorkspaces()
  const queryWorkspaceID = {
    ONLY: hasOnlyOneWorkspace || hasWorkspaces ? `?${QUERY.WORKSPACE_ID}=${workspaceid}` : '',
    CONNECT: hasOnlyOneWorkspace || hasWorkspaces ? `&${QUERY.WORKSPACE_ID}=${workspaceid}` : ''
  }

  return {
    workspaceid,
    fromTab,
    queryWorkspaceID
  }
}
