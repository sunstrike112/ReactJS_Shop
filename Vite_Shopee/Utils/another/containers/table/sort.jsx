import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

export function CustomSort({ sort, handleSort, keySort }) {
  return (
    <Box>
      {Boolean((sort.sortColumn === keySort && sort.sortType === 'desc') || sort.sortColumn !== keySort) && (
        <IconButton
          background='transparent'
          aria-label='Sort'
          icon={<FaSortDown />}
          onClick={() => handleSort(keySort)}
          _hover={{
            bg: 'none',
          }}
          height='0'
          paddingBottom='2px'
          width='0'
        />
      )}
      {sort.sortColumn === keySort && sort.sortType === 'asc' && (
        <IconButton
          background='transparent'
          aria-label='Sort'
          icon={<FaSortUp />}
          onClick={() => handleSort(keySort)}
          _hover={{
            bg: 'none',
          }}
          height='0'
          paddingBottom='2px'
          width='0'
        />
      )}
    </Box>
  );
}
