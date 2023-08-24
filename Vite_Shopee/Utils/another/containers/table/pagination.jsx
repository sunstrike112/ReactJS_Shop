/* eslint-disable react/jsx-no-bind */
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, HStack, IconButton, Input, Select, Text, useDisclosure } from '@chakra-ui/react';
import { ConfirmModal } from 'dhm/components/Modal/elements/confirmModal';
import { PaginationVer2 } from 'dhm/components/Pagination';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { COLORS } from 'dhm/utils/constants/style';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';

export function PaginationTable({
  page,
  totalPage,
  limit,
  total,
  pageSizeOptions,
  defaultPageSize,
  handleChangePage,
  handlePageSizeChange,
  onlyRowsPerPage = false,
  totalPerPage,
  isEdit = false,
  callbackEdit = () => {},
  ...props
}) {
  const { tTable } = useContext(LanguageContext);
  const { isOpen: isOpenPrevPage, onOpen: onOpenPrevPage, onClose: onClosePrevPage } = useDisclosure();
  const { isOpen: isOpenNextPage, onOpen: onOpenNextPage, onClose: onCloseNextPage } = useDisclosure();
  const { isOpen: isOpenGoTo, onOpen: onOpenGoTo, onClose: onCloseGoTo } = useDisclosure();
  const { isOpen: isOpenChangeSize, onOpen: onOpenChangeSize, onClose: onCloseChangeSize } = useDisclosure();

  const [prevGoto, setPrevGoto] = useState(null);
  const [prevChangeSize, setPrevChangeSize] = useState(null);
  function handlePageChange(newPage) {
    handleChangePage(newPage);
  }

  function handlePageSizeChangeInternal(event) {
    const newPageSize = parseInt(event.target.value, 10);
    handlePageSizeChange(newPageSize);
  }
  function handlePrevPageSizeChangeInternal(event) {
    const newPageSize = parseInt(event.target.value, 10);
    setPrevChangeSize(newPageSize);
    onOpenChangeSize();
  }
  function handlePageBlur(event) {
    const newPage = parseInt(event.target.value, 10);
    if (newPage !== page && newPage >= 1 && newPage <= totalPage) {
      handlePageChange(newPage);
    }
  }
  function handlePrevPageBlur(event) {
    const newPage = parseInt(event.target.value, 10);
    if (newPage !== page && newPage >= 1 && newPage <= totalPage) {
      setPrevGoto(newPage);
      onOpenGoTo();
    }
  }

  return (
    <>
      <HStack spacing={4} mt='5px' {...props}>
        <Flex width='40%' alignItems='center'>
          <Text>{tTable('display')}</Text>
          <Select
            borderColor={COLORS.gray_700}
            cursor='pointer'
            value={limit}
            onChange={isEdit ? handlePrevPageSizeChangeInternal : handlePageSizeChangeInternal}
            w='80px'
            ml={4}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
          <Text ml={4}>{tTable('display_page')}</Text>
          <Text ml={2} fontWeight='bold'>
            {totalPerPage}/{total}
          </Text>
          <Text ml={2}>{tTable('total')}</Text>
        </Flex>

        <Flex width='60%' justify='space-between'>
          <Flex
            gap='5px'
            display={{
              base: onlyRowsPerPage ? 'none' : 'flex',
            }}
          >
            <IconButton
              background={COLORS.gray_300}
              borderRadius='none'
              icon={<ChevronLeftIcon />}
              isDisabled={page === 1 || page < 1 || page > totalPage}
              onClick={() => (isEdit ? onOpenPrevPage() : handlePageChange(page - 1))}
              aria-label='Previous Page'
            />
            {/* {renderPageNumbers()} */}
            <PaginationVer2
              total={totalPage}
              pageSize={limit}
              currentPage={page}
              handlePageChange={handleChangePage}
              isEdit={isEdit}
              callbackEdit={callbackEdit}
            />
            <IconButton
              background={COLORS.gray_300}
              borderRadius='none'
              icon={<ChevronRightIcon />}
              isDisabled={page === totalPage || page < 1 || page > totalPage}
              onClick={() => (isEdit ? onOpenNextPage() : handlePageChange(page + 1))}
              aria-label='Next Page'
            />
          </Flex>

          <Flex
            alignItems='center'
            display={{
              base: onlyRowsPerPage ? 'none' : 'flex',
            }}
          >
            <Text>{tTable('go_to_page')}</Text>
            <Input
              borderColor={COLORS.gray_700}
              type='number'
              min={1}
              max={totalPage}
              onBlur={isEdit ? handlePrevPageBlur : handlePageBlur}
              w='50px'
              ml={4}
            />
          </Flex>
        </Flex>
      </HStack>
      {/* Prevent pagination when mode Edit */}
      <ConfirmModal
        isOpen={isOpenPrevPage}
        onConfirm={() => {
          callbackEdit();
          handleChangePage(page - 1);
          onClosePrevPage();
        }}
        onCancel={() => {
          handleChangePage(page - 1);
          onClosePrevPage();
        }}
        type='confirmChange'
      />
      <ConfirmModal
        isOpen={isOpenNextPage}
        onConfirm={() => {
          callbackEdit();
          handleChangePage(page + 1);
          onCloseNextPage();
        }}
        onCancel={() => {
          handleChangePage(page + 1);
          onCloseNextPage();
        }}
        type='confirmChange'
      />
      <ConfirmModal
        isOpen={isOpenChangeSize}
        onConfirm={() => {
          callbackEdit();
          handlePageSizeChange(prevChangeSize);
          onCloseChangeSize();
          setPrevChangeSize(null);
        }}
        onCancel={() => {
          handlePageSizeChange(prevChangeSize);
          onCloseChangeSize();
          setPrevChangeSize(null);
        }}
        type='confirmChange'
      />
      <ConfirmModal
        isOpen={isOpenGoTo}
        onConfirm={() => {
          callbackEdit();
          handleChangePage(prevGoto);
          onCloseGoTo();
          setPrevGoto(null);
        }}
        onCancel={() => {
          handleChangePage(prevGoto);
          onCloseGoTo();
          setPrevGoto(null);
        }}
        type='confirmChange'
      />
    </>
  );
}

PaginationTable.propTypes = {
  defaultPageSize: PropTypes.number,
  handleChangePage: PropTypes.func,
  handlePageSizeChange: PropTypes.func,
  limit: PropTypes.number,
  page: PropTypes.number,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  totalPage: PropTypes.number,
};

PaginationTable.defaultProps = {
  defaultPageSize: 10,
  handleChangePage: () => {},
  handlePageSizeChange: () => {},
  limit: 2,
  page: 1,
  pageSizeOptions: [10, 20, 50, 100],
  totalPage: 1,
};
