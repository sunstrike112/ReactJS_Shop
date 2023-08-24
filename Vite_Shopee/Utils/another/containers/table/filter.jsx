import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { BORDERS, COLORS, ConstantSession, SessionStore } from 'dhm/utils/index';
import { MdFilterAlt } from 'react-icons/md';
import { SearchFilter } from './searchFilter';

export function FilterTable({
  keyValue,
  keyLabel,
  keySearch,
  moreParams = {},
  apiFilter,
  table,
  listFilter,
  listDataFilter,
  clearFilter,
  paramsFilter,
  setIsNoDataFilter,
  isNoDataFilter,
}) {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { remove } = SessionStore;
  const propsFilter = {
    keyValue,
    keyLabel,
    keySearch,
    moreParams,
    apiFilter,
    table,
    onClose,
    listFilter,
    listDataFilter,
    clearFilter,
    paramsFilter,
    setIsNoDataFilter,
    isNoDataFilter,
  };
  return (
    <Box position='relative'>
      <Button
        bg='transparent'
        _hover={{
          bg: 'none',
        }}
        height='0'
        onClick={onToggle}
      >
        <MdFilterAlt
          size='16px'
          color={COLORS.white}
          style={{
            position: 'absolute',
            top: '-10px',
            left: '0',
          }}
        />
      </Button>
      {isOpen && (
        <Popover
          isOpen={isOpen}
          onClose={() => {
            onClose();
            remove(ConstantSession.TABLE_FILTER_DRAFF);
          }}
          placement='bottom'
          closeOnBlur
        >
          <PopoverTrigger>
            <Button
              position='absolute'
              bg='transparent'
              _hover={{
                bg: 'none',
              }}
              height='0'
              width='0'
              opacity='0'
              left='0'
              bottom='0'
            />
          </PopoverTrigger>
          <PopoverContent height='325px' border={BORDERS.border_1(COLORS.prime_shade_6)}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody color='black'>{isOpen && <SearchFilter {...propsFilter} />}</PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </Box>
  );
}
