/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'
import saga from 'Modules/setting_domain/store/saga'
import reducer from 'Modules/setting_domain/store/reducer'
import { useInjectSaga, useInjectReducer } from 'Stores'
import {
  loadDomains,
  addDomain,
  deleteDomain
} from 'Modules/setting_domain/store/actions'
import { makeSettingDomain } from 'Modules/setting_domain/store/selectors'

export const useSettingDomain = () => {
  useInjectSaga({ key: 'settingDomain', saga })
  useInjectReducer({ key: 'settingDomain', reducer })

  const dispatch = useDispatch()

  const { isLoading, isAdding, isDeleting, pagination, domains } = useSelector(makeSettingDomain())

  const loadDomainsAction = (payload) => dispatch(loadDomains(payload))
  const addDomainAction = (payload) => dispatch(addDomain(payload))
  const deleteDomainAction = (payload) => dispatch(deleteDomain(payload))

  return {
    loadDomainsAction,
    addDomainAction,
    deleteDomainAction,
    isLoading,
    isAdding,
    isDeleting,
    pagination,
    domains
  }
}
