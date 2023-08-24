/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'
import saga from 'Modules/store/saga'
import reducer from 'Modules/store/reducer'
import {
  toggleSidebar,
  hoverSidebar,
  setTheme,
  updateApi82105
} from 'Modules/store/actions'
import {
  makeSelectGlobal
} from 'Modules/store/selectors'
import { useInjectReducer, useInjectSaga } from 'Stores'

export const useRoot = () => {
  useInjectSaga({ key: 'global', saga })
  useInjectReducer({ key: 'global', reducer })
  const dispatch = useDispatch()

  const { sidebarCompact, sidebarHover, company, api82105 } = useSelector(makeSelectGlobal())
  const { infoCompany, themeCompany } = company

  const toggleSidebarAction = (payload) => dispatch(toggleSidebar(payload))
  const hoverSidebarAction = (payload) => dispatch(hoverSidebar(payload))
  const setThemeAction = (payload) => dispatch(setTheme(payload))
  const updateApi82105Action = (payload) => dispatch(updateApi82105(payload))

  return {
    sidebarCompact,
    sidebarHover,
    infoCompany,
    themeCompany,
    api82105,
    toggleSidebarAction,
    hoverSidebarAction,
    setThemeAction,
    updateApi82105Action
  }
}
