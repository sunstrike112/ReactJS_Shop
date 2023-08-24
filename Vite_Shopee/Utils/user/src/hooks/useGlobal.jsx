/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'

import { useMemo } from 'react'
import { useInjectReducer, useInjectSaga } from '../store'
import reducer from '../routes/store/reducer'
import saga from '../routes/store/saga'
import { makeSelectMaintainNotice, makeSelectMaintainData, makeSelectInitDisplay, makeSelectCompany } from '../routes/store/selectors'
import { getMaintainNoticeRequest, setTheme } from '../routes/store/actions'
import { initMenuRouteMapping, initTabTextMapping, MY_PAGE_TABS, QUERY } from '../constants'
import { useGetQuery } from './useQuery'
import { useWorkspaces } from './auth'

export const useGlobalStore = () => {
  useInjectSaga({ key: 'globalStore', saga })
  useInjectReducer({ key: 'globalStore', reducer })

  const dispatch = useDispatch()

  // Hook custom
  const { workspaceid, queryWorkspaceID } = useGetQuery()
  const { hasOnlyOneWorkspace, data: workspaces } = useWorkspaces()

  // Selector
  const isMaintainNotice = useSelector(makeSelectMaintainNotice())
  const { menu, tab } = useSelector(makeSelectInitDisplay())
  const { isLoading, infoCompany, themeCompany, error: errorTheme } = useSelector(makeSelectCompany())

  // FOR setting init display
  const checkSelfHasInitTab = (pathname) => {
    if (pathname.includes(initMenuRouteMapping[menu])) return initTabTextMapping[tab]
    return false
  }
  const redirectHomeWithWorkSpaceID = (id) => `/${initMenuRouteMapping[menu]}?fromTab=${initTabTextMapping[tab]}&${QUERY.WORKSPACE_ID}=${id}`
  const home = useMemo(() => {
    switch (true) {
      case Boolean(workspaceid):
        return `/${initMenuRouteMapping[menu]}?fromTab=${initTabTextMapping[tab]}&${QUERY.WORKSPACE_ID}=${workspaceid}`
      case hasOnlyOneWorkspace:
        return `/${initMenuRouteMapping[menu]}?fromTab=${initTabTextMapping[tab]}&${QUERY.WORKSPACE_ID}=${workspaces[0].companyId}`
      default:
        return `/${initMenuRouteMapping[menu]}?fromTab=${initTabTextMapping[tab]}`
    }
  }, [workspaceid, menu, tab, hasOnlyOneWorkspace, workspaces])
  const topPage = `/course-list?fromTab=${checkSelfHasInitTab('course-list') || MY_PAGE_TABS.NISSOKEN_COURSE}${queryWorkspaceID.CONNECT}`
  const myPage = `/mypage?fromTab=${checkSelfHasInitTab('mypage') || MY_PAGE_TABS.NISSOKEN_COURSE}${queryWorkspaceID.CONNECT}`
  const initRoute = { home, topPage, myPage, redirectHomeWithWorkSpaceID }
  // END FOR setting init display

  // Actions dispatch
  const setThemeAction = (payload) => dispatch(setTheme(payload))

  return { isMaintainNotice, menu, initRoute, isLoading, infoCompany, themeCompany, errorTheme, setThemeAction }
}

export const useMaintainNotice = () => {
  useInjectSaga({ key: 'globalStore', saga })
  useInjectReducer({ key: 'globalStore', reducer })

  const dispatch = useDispatch()

  const { isLoading, data: maintainNoticeMessage, error } = useSelector(makeSelectMaintainData())
  const getMaintainNoticeAction = () => dispatch(getMaintainNoticeRequest())

  return { isLoading, maintainNoticeMessage, error, getMaintainNoticeAction }
}
