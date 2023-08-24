import { useSelector } from 'react-redux';

export const useGetValueDropdown = () => {
  const { dropdown } = useSelector((state) => state.common);
  const getValueDropdown = (type, value) => {
    const dropdownList = dropdown[type];
    const valueDropdown = dropdownList?.find((item) => item.value === value) || {};
    return valueDropdown?.label || '';
  };

  return { getValueDropdown };
};
