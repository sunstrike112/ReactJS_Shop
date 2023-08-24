import { Box } from '@chakra-ui/react';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';

export function WrapperSubForm({ title, children, ...props }) {
  return (
    <Box
      position='relative'
      borderRadius={BORDERS.radius_2}
      bg={COLORS.white_primary}
      padding='24px'
      border={BORDERS.border_1(COLORS.blue_primary)}
      {...props}
    >
      <Box
        position='absolute'
        bg={COLORS.gray_600}
        color={COLORS.white}
        border={BORDERS.border_1('#141414')}
        top='-16px'
        borderRadius={BORDERS.radius_2}
        width='max-content'
        padding='4px 18px'
      >
        {title}
      </Box>
      {children}
    </Box>
  );
}
