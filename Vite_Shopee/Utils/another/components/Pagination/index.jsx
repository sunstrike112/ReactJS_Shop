/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable-loop */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { ConfirmModal } from '../Modal/elements/confirmModal';

// const ItemPagination = styled.a`
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   padding-left: 1px !important;
//   padding-right: 1px !important;
// `;
export function PaginationVer2({
  total,
  pageSize,
  currentPage,
  handlePageChange,
  isEdit = false,
  callbackEdit = () => {},
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [prevValue, setPrevValue] = useState(1);
  const checkMax = (data) => {
    for (let i = 1; i < data; i++) {
      return data === 5 * i ? 5 * i + 2 : 5 * i;
    }
  };
  const MAX = checkMax(pageSize);
  let pages = [];
  const totalPages = total;

  let start = 0;
  let end = totalPages;

  pages.length = 0;
  for (let i = 1; i <= end; i += 1) {
    pages.push({ page: i });
  }

  if (totalPages > MAX) {
    const leftOffset = Math.floor(MAX / 2);
    const rightOffset = MAX % 2 === 0 ? leftOffset - 1 : leftOffset;

    if (currentPage <= leftOffset) {
      // every beginning, no rotation -> [0..maxSize]
      end = MAX;
    } else if (totalPages - currentPage < leftOffset) {
      // every end, no rotation -> [len-maxSize..len]
      start = totalPages - MAX;
    } else {
      // rotate
      start = currentPage - leftOffset - 1;
      end = currentPage + rightOffset;
    }

    pages = pages.slice(start, end);

    if (start > 0) {
      if (start > 2) {
        pages.unshift({ type: -1, page: start - 1 });
      } else if (start === 2) {
        pages.unshift({ page: 2 });
      }
      pages.unshift({ page: 1 });
    }
    if (end < totalPages) {
      if (end < totalPages - 2) {
        pages.push({ type: -1, page: end + MAX });
      } else if (end === totalPages - 2) {
        pages.push({ page: totalPages - 1 });
      }
      pages.push({ page: totalPages });
    }
  }
  const handleGetPrev = (item) => {
    setPrevValue(item);
    onOpen();
  };
  return (
    <>
      <Flex gap='5px'>
        {pages.map((item, index) => (
          <Box key={`${item.page}-${index}`}>
            {item.type === -1 ? (
              <Box>...</Box>
            ) : (
              <>
                <Box
                  alignItems='center'
                  lineHeight='40px'
                  textAlign='center'
                  minWidth='40px'
                  height='40px'
                  paddingLeft='4px'
                  paddingRight='4px'
                  cursor='pointer'
                  pointerEvents={item.page === currentPage ? 'none' : 'pointer'}
                  borderRadius={BORDERS.radius_2}
                  fontWeight={item.page === currentPage ? 'bold' : 'normal'}
                  background={item.page === currentPage ? COLORS.black_primary : COLORS.white}
                  color={item.page === currentPage ? COLORS.white : COLORS.black_primary}
                  onClick={() => (isEdit ? handleGetPrev(item.page) : handlePageChange(item.page))}
                >
                  {item.page}
                </Box>
              </>
            )}
          </Box>
        ))}
      </Flex>
      <ConfirmModal
        isOpen={isOpen}
        onConfirm={() => {
          callbackEdit();
          handlePageChange(prevValue);
          onClose();
        }}
        onCancel={() => {
          handlePageChange(prevValue);
          onClose();
        }}
        type='confirmChange'
      />
    </>
  );
}

PaginationVer2.propTypes = {
  total: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
};

PaginationVer2.defaultProps = {
  total: 0,
  pageSize: 20,
  currentPage: 1,
};
