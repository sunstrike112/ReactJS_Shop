import { Box } from '@chakra-ui/react';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';

export function WrapperContainer({ title, children, ...props }) {
  return (
    <Box
      position='relative'
      borderRadius={BORDERS.radius_2}
      bg={COLORS.neutral_19}
      padding='24px'
      border={BORDERS.border_1('#4472C4')}
      {...props}
    >
      <Box
        position='absolute'
        bg={COLORS.white}
        border={BORDERS.border_1('#4472C4')}
        top='-42px'
        left='0'
        borderRadius={BORDERS.radius_2_top}
        width='max-content'
        padding='0'
      >
        {title}
      </Box>
      {children}
    </Box>
  );
}
