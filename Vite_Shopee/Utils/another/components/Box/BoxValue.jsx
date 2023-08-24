import { Box } from '@chakra-ui/react';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';

export function BoxValue({ children, isActive = false, typeBox = 'normal', ...rest }) {
  const chooseColor = {
    danger: COLORS.red_alert,
    normal: COLORS.gray_primary,
    cancel: COLORS.neutral_300,
    risk: COLORS.red_alert,
  };
  const chooseBgIsNotActive = {
    danger: COLORS.neutral_300,
    normal: COLORS.white,
  };

  return (
    <Box
      width='32px'
      height='16px'
      fontSize='14px'
      textAlign='center'
      lineHeight='15px'
      border={BORDERS.border_1(COLORS.black_primary)}
      color={isActive ? COLORS.white : COLORS.gray_500}
      bg={isActive ? chooseColor[typeBox] : chooseBgIsNotActive[typeBox]}
      {...rest}
    >
      {children}
    </Box>
  );
}
