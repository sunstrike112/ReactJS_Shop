import { useDispatch, useSelector } from 'react-redux';
import {
  createCompanyPolicy,
  deleteCompanyPolicy,
  filterCompanyPolicy,
  historyCompanyPolicy,
  searchCompanyPolicy,
  updateCompanyPolicy,
} from './action';

export const ServicesCompanyPolicy = () => {
  const { companyPolicy, companyPolicyFilter, histCompanyPolicy } = useSelector((state) => state.companyPolicy);
  const dispatch = useDispatch();
  const searchCompanyPolicyAction = (payload) => dispatch(searchCompanyPolicy(payload));
  const historyCompanyPolicyAction = (payload) => dispatch(historyCompanyPolicy(payload));
  const filterCompanyPolicyAction = (payload) => dispatch(filterCompanyPolicy(payload));
  const createCompanyPolicyAction = (payload) => dispatch(createCompanyPolicy(payload));
  const deleteCompanyPolicyAction = (payload) => dispatch(deleteCompanyPolicy(payload));
  const updateCompanyPolicyAction = (payload) => dispatch(updateCompanyPolicy(payload));

  return {
    companyPolicy,
    companyPolicyFilter,
    histCompanyPolicy,
    searchCompanyPolicyAction,
    historyCompanyPolicyAction,
    filterCompanyPolicyAction,
    createCompanyPolicyAction,
    deleteCompanyPolicyAction,
    updateCompanyPolicyAction,
  };
};
