import { Flex } from '@chakra-ui/react';
import { COLORS } from 'dhm/utils/constants/style';

export function BoxMiniFeat({ children, ...rest }) {
  return (
    <Flex
      borderRadius='16px'
      width='max-content'
      height='32px'
      bg={COLORS.gray_300}
      gap='10px'
      padding='8px 10px'
      {...rest}
    >
      {children}
    </Flex>
  );
}
