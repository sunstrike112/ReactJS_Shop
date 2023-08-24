import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Input, Select, Text } from '@chakra-ui/react';
import { PaginationVer2 } from 'dhm/components/Pagination';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { searchBasicInfo } from 'dhm/store/basicInfo/action';
import { COLORS } from 'dhm/utils/constants/style';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function PaginationList({ params, checkedEmployee, setParams, handlePayloadLevel2 = () => {} }) {
  const { basicInfo } = useSelector((state) => state.basicInfo);
  const { pagination } = basicInfo;
  const dispatch = useDispatch();
  const { totalPage, page, limit } = pagination;
  const { tTable } = useContext(LanguageContext);
  const handleChangeLimit = (e) => {
    const dataPayloadSub2 = handlePayloadLevel2(checkedEmployee);
    // console.log(dataPayloadSub2);
    const { value } = e.target;
    const payload = {
      params: {
        ...params,
        limit: value,
        ...dataPayloadSub2,
      },
    };
    setParams({
      ...params,
      limit: value,
    });
    dispatch(searchBasicInfo(payload));
  };
  const handlePageChange = (newPage) => {
    const dataPayloadSub2 = handlePayloadLevel2(checkedEmployee);
    const payload = {
      params: {
        ...params,
        page: newPage,
        ...dataPayloadSub2,
      },
    };
    dispatch(searchBasicInfo(payload));
  };
  const handlePageBlur = (e) => {
    const newPage = parseInt(e.target.value, 10);
    if (newPage !== page && newPage >= 1 && newPage <= totalPage) {
      handlePageChange(newPage);
    } else {
      // setCurrentPage(currentPage);
    }
  };

  return (
    <>
      <Flex justify='space-between'>
        <Select
          borderColor={COLORS.gray_700}
          cursor='pointer'
          w='80px'
          ml={4}
          onChange={handleChangeLimit}
          value={limit}
        >
          {[20, 50, 100, 200, 500].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
        <Flex width='65%' justify='space-between' gap='20px'>
          <Flex gap='5px'>
            <IconButton
              background={COLORS.gray_300}
              borderRadius='none'
              icon={<ChevronLeftIcon />}
              isDisabled={page === 1 || page < 1 || page > totalPage}
              onClick={() => handlePageChange(page - 1)}
              aria-label='Previous Page'
            />
            <PaginationVer2 total={totalPage} pageSize={limit} currentPage={page} handlePageChange={handlePageChange} />
            <IconButton
              background={COLORS.gray_300}
              borderRadius='none'
              icon={<ChevronRightIcon />}
              isDisabled={page === totalPage || page < 1 || page > totalPage}
              onClick={() => handlePageChange(page + 1)}
              aria-label='Next Page'
            />
          </Flex>
          <Flex alignItems='center'>
            <Text>{tTable('go_to_page')}</Text>
            <Input
              borderColor={COLORS.gray_700}
              type='number'
              min={1}
              max={totalPage}
              onBlur={handlePageBlur}
              w='50px'
              ml={4}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
