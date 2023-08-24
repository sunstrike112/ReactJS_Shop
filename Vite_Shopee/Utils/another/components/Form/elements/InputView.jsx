import { Box, Input } from '@chakra-ui/react';
import { COLORS } from 'dhm/utils/constants/style';
import { useSelector } from 'react-redux';

export function InputViewDropdown({ label, type, valueDropdown, ...props }) {
  const { dropdown } = useSelector((state) => state.common);
  const options = dropdown[type] || [];
  const option = options.find((opt) => opt.value === valueDropdown);

  return (
    <Box>
      <Box mb='8px'>{label}</Box>
      <Input value={option?.label || ''} background={COLORS.white} {...props} readOnly disabled borderColor='#646464' />
    </Box>
  );
}
