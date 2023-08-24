import { Box, Flex } from '@chakra-ui/react';
import { BORDERS, COLORS } from 'dhm/utils/index';
import React from 'react';

export default function StatusTag({ title, isActive, handleClick }) {
  return (
    <Flex
      border={BORDERS.border_1(COLORS.black_primary)}
      alignItems='center'
      mr='20px'
      height='48px'
      cursor='pointer'
      color={COLORS.white}
      bg={isActive ? COLORS.master_primary : COLORS.gray_700}
      onClick={() => handleClick()}
    >
      <Box textAlign='center' width='max-content' px='30px'>
        {title}
      </Box>
    </Flex>
  );
}
