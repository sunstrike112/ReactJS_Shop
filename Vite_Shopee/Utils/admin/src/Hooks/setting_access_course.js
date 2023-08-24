import { useDispatch, useSelector } from 'react-redux'
import saga from 'Components/settingAccessCourse/store/saga'
import reducer from 'Components/settingAccessCourse/store/reducer'
import { useInjectSaga, useInjectReducer } from 'Stores'
import { loadCompanyTypes, loadCompanySelected } from 'Components/settingAccessCourse/store/actions'
import { makeSelectSettingAccessCourse } from 'Components/settingAccessCourse/store/selectors'

export const useSettingAccessCourse = () => {
  useInjectSaga({ key: 'settingAccessCourse', saga })
  useInjectReducer({ key: 'settingAccessCourse', reducer })

  const dispatch = useDispatch()

  const { companyTypes, pagination, filter, isLoading, companySelected } = useSelector(makeSelectSettingAccessCourse())
  const { data: listCompanySelected, pagination: paginationCompanySelected, isLoading: isLoadingCompanySelected, listCompanyId } = companySelected
  const loadCompanyTypesAction = (payload) => dispatch(loadCompanyTypes(payload))
  const loadCompanySelectedAction = (payload) => dispatch(loadCompanySelected(payload))

  return {
    loadCompanyTypesAction,
    companyTypes,
    pagination,
    filter,
    isLoading,
    listCompanySelected,
    paginationCompanySelected,
    isLoadingCompanySelected,
    loadCompanySelectedAction,
    listCompanyId
  }
}
