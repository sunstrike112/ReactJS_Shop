import { Box, Checkbox, CircularProgress, Flex, Input, Stack } from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { LIST_DEFINE_FILTERS, LIST_FILTER_DATE } from 'dhm/utils/constants/table';
import { convertToCurrentTime } from 'dhm/utils/helpers/convert';
import { deleteKey, removeFirstParentKey } from 'dhm/utils/helpers/format';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ViewportList } from 'react-viewport-list';

export function SearchFilter({
  keyValue,
  keyLabel,
  keySearch,
  moreParams,
  apiFilter,
  table,
  onClose,
  clearFilter,
  paramsFilter,
  setIsNoDataFilter,
  isNoDataFilter = false,
}) {
  const { tTable, tForm } = useContext(LanguageContext);
  const ref = useRef(null);
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const verifyOptions = (list) =>
    list
      .filter(
        ({ label }, index, self) =>
          self.findIndex((o) => o.label === label) === index && `${label}`?.toLowerCase().includes(query.toLowerCase()),
      )
      .map((option) => ({ ...option, value: option.label }));
  const convertOption = useMemo(() => verifyOptions(options), [options, query]);
  const [filteredOptions, setFilterdOptions] = useState([]);
  const allHaveChecked = useMemo(() => filteredOptions.every((option) => option.isChecked), [filteredOptions, query]);
  useEffect(() => {
    setFilterdOptions(convertOption);
  }, [convertOption]);
  const getParams = removeFirstParentKey(paramsFilter);

  const debouncedSearch = useCallback(
    debounce((more = null) => {
      const onSuccess = (res) => {
        const newOptions = res.records.map((item) => ({
          value: item[keyValue],
          label: item[keyLabel],
          isChecked: true,
        }));
        setOptions(newOptions);
      };
      const onFinally = () => {
        setLoading(false);
      };
      const payload = {
        params: {
          ...moreParams,
          ...(more || getParams),
        },
        onSuccess,
        onFinally,
      };
      dispatch(apiFilter(payload));
    }, 0),
    [],
  );
  useEffect(() => {
    if (!isNoDataFilter) {
      setLoading(true);
      debouncedSearch(query);
    }
    return debouncedSearch.cancel;
    //   }, [query, debouncedSearch]); // => re-call api when query change
  }, []);

  const handleFilter = () => {
    onClose();
    const listId = filteredOptions.filter((item) => item.isChecked).map((item) => item.value);
    const listValue = filteredOptions
      .filter((item) => item.isChecked)
      // .map((item) => (LIST_FILTER_DATE.includes(keySearch) ? revertTimeUTC(item.label) : item.label));
      .map((item) => item.label);

    const chooseList = {
      ids: listId,
    };
    const payloadDataKey = chooseList[LIST_DEFINE_FILTERS[keySearch]] || listValue;
    const params = {
      ...getParams,
      sortColumn: keySearch,
      [LIST_DEFINE_FILTERS[keySearch]]: payloadDataKey,
    };
    clearFilter(params);
    if (payloadDataKey?.length > 0) {
      setIsNoDataFilter(false);
      table.options.meta?.funcFilter(params, LIST_DEFINE_FILTERS[keySearch]);
    } else {
      setIsNoDataFilter(true);
    }
  };
  const handleChecked = (e, option) => {
    if (e.target.checked) {
      const newList = filteredOptions.map((item) =>
        item.value === option.value ? { ...item, isChecked: true } : item,
      );
      setFilterdOptions(newList);
    } else {
      const newList = filteredOptions.map((item) =>
        item.value === option.value ? { ...item, isChecked: false } : item,
      );
      setFilterdOptions(newList);
    }
  };
  const handleCheckAll = (e) => {
    if (e.target.checked) {
      const newList = filteredOptions.map((option) => ({ ...option, isChecked: true }));
      setFilterdOptions(newList);
    } else {
      const newList = filteredOptions.map((option) => ({ ...option, isChecked: false }));
      setFilterdOptions(newList);
    }
  };
  const handleClear = () => {
    setQuery('');
    const newFilter = deleteKey(paramsFilter, LIST_DEFINE_FILTERS[keySearch]);
    debouncedSearch(newFilter);
  };
  return (
    <>
      <Stack mb='5px'>
        <Box width='50px'>
          <DHMButton onClick={handleClear}>{tTable('clear')}</DHMButton>
        </Box>
        <Input placeholder={tForm('searchFilter')} value={query} onChange={(e) => setQuery(e.target.value)} />

        <Flex height='135px' overflowY='auto' direction='column' paddingLeft='10px' ref={ref}>
          {loading ? (
            <CircularProgress isIndeterminate color='gray' size='40px' />
          ) : (
            <>
              {filteredOptions.length > 1 && (
                <Checkbox isChecked={allHaveChecked} onChange={handleCheckAll}>
                  All
                </Checkbox>
              )}
              <ViewportList viewportRef={ref} items={filteredOptions}>
                {(item, index) => (
                  <Checkbox
                    key={index}
                    value={item.value}
                    isChecked={item.isChecked}
                    onChange={(e) => handleChecked(e, item)}
                  >
                    {LIST_FILTER_DATE.includes(keySearch) ? convertToCurrentTime(item.label) : item.label}
                  </Checkbox>
                )}
              </ViewportList>
            </>
          )}
        </Flex>
      </Stack>
      <Flex gap='10px' justify='end'>
        <DHMButton onClick={onClose} buttonType='cancel' text='cancel' />
        <DHMButton onClick={handleFilter} buttonType='create' text={tForm('apply_filter')} />
      </Flex>
    </>
  );
}

SearchFilter.propTypes = {
  keyValue: PropTypes.string,
  keyLabel: PropTypes.string,
  keySearch: PropTypes.string,
  moreParams: PropTypes.object,
  apiFilter: PropTypes.func,
  table: PropTypes.object,
  onClose: PropTypes.func,
  clearFilter: PropTypes.func,
  paramsFilter: PropTypes.object,
};

SearchFilter.defaultProps = {
  keyValue: 'value',
  keyLabel: 'label',
  keySearch: 'ids',
  moreParams: {},
  apiFilter: () => {},
  table: {},
  onClose: () => {},
  clearFilter: () => {},
  paramsFilter: {},
};
