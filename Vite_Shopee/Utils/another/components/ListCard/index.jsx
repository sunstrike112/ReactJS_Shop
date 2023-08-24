import {
  Box,
  Button,
  Flex,
  Img,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  SimpleGrid,
} from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { DrawerContainer } from 'dhm/containers/drawer';
import { AppContext } from 'dhm/contexts/AppContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { DB_LIST_DEFAULT_CHECKED, DB_LIST_FILTER_CHECKED, useIndexedDB } from 'dhm/services/indexeddb';
import { searchBasicInfo } from 'dhm/store/basicInfo/action';
import { formatTrimMultiKeyword } from 'dhm/utils/helpers/format';
import { ConstantLocal, LocalStore } from 'dhm/utils/helpers/local';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DHMButton } from '../Button';
import {
  combineSort,
  compareObjectsFilter,
  countKeyOccurrences,
  handleChangeParams,
  handleDataPayloadChecked,
  revertDataRC,
  verifyParams,
} from '../Filter';
import { FilterAppRC } from '../Filter/FilterRCTree';
import { InputDebounceForm } from '../Form/elements/DebounceInput';
import { CardItemBasicInfo } from './elements/Card';
import { PaginationList } from './elements/Pagination';

export function ListCardBasicInfo({ data = [], ...props }) {
  const { add, clear } = useIndexedDB(DB_LIST_FILTER_CHECKED);
  const { getAll } = useIndexedDB(DB_LIST_DEFAULT_CHECKED);

  const { basicInfo, loadingBasicInfo } = useSelector((state) => state.basicInfo);
  const { loadingMenuFilter } = useSelector((state) => state.common);
  const { set, isExits, get } = LocalStore;
  const { pagination } = basicInfo;
  const { page, limit } = pagination;
  const [keyWord, setKeyWord] = useState('');
  const { tMessageContent, tForm } = useContext(LanguageContext);
  const { heightApp } = useContext(AppContext);
  const [checked, setChecked] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [checkedEmployee, setCheckedEmployee] = useState([]);
  const [recallApi, setRecallApi] = useState(0);
  const dispatch = useDispatch();
  const paramsDefault = {
    isHistory: false,
    deleteFlg: 0,
    sortType: 'desc',
    limit,
    keyWord: formatTrimMultiKeyword(keyWord),
    page,
  };
  const [params, setParams] = useState(paramsDefault);
  const payloadParams = {
    params,
  };
  const dataCheckedEmployee = get(ConstantLocal.FILTER_MENU_EMPLOYEE_LIST);
  const dataLengthLevel2Filter = get(ConstantLocal.FILTER_LENGTH_LV2);
  const isExitsFilterEmployee = isExits(ConstantLocal.FILTER_MENU_EMPLOYEE_LIST);
  const handlePayloadLevel2 = (data_checked) => {
    let finalParams = {};
    if (isExitsFilterEmployee) {
      const mainFilter = compareObjectsFilter(countKeyOccurrences(data_checked), dataLengthLevel2Filter);
      let payloadFilterSub2 = {};
      payloadFilterSub2 = handleChangeParams(mainFilter);
      let payloadAll = {};
      payloadAll = verifyParams(mainFilter, handleDataPayloadChecked(data_checked));
      const result = { ...payloadFilterSub2, ...payloadAll };
      finalParams = result;
    } else {
      finalParams = {};
    }
    return finalParams;
  };

  useEffect(() => {
    if (isExitsFilterEmployee) {
      const dataPayloadSub2 = handlePayloadLevel2(dataCheckedEmployee);
      dispatch(searchBasicInfo({ params: { ...payloadParams.params, ...dataPayloadSub2 } }));
    } else {
      dispatch(searchBasicInfo(payloadParams));
    }
  }, []);

  const handleFilter = (onClose) => {
    const dataPayloadSub2 = handlePayloadLevel2(checkedEmployee);
    const param = {
      ...params,
    };
    setParams(param);
    set(ConstantLocal.FILTER_MENU_EMPLOYEE_LIST, checkedEmployee);
    onClose();
    dispatch(searchBasicInfo({ params: { ...param, ...dataPayloadSub2 } }));
  };
  const handleCustomizeFilter = (onClose, arrayData = []) => {
    const dataPayloadSub2 = handlePayloadLevel2(arrayData);
    const param = {
      ...params,
    };
    setParams(param);
    onClose();
    dispatch(searchBasicInfo({ params: { ...param, ...dataPayloadSub2 } }));
  };

  const handleSearch = (dt) => {
    const dataPayloadSub2 = handlePayloadLevel2(checkedEmployee);
    const payload = {
      params: {
        ...params,
        keyWord: formatTrimMultiKeyword(dt),
        ...dataPayloadSub2,
      },
    };
    setKeyWord(formatTrimMultiKeyword(dt));
    setParams({ ...params, keyWord: formatTrimMultiKeyword(dt) });
    dispatch(searchBasicInfo(payload));
  };
  const refetchData = () => {
    const dataPayloadSub2 = handlePayloadLevel2(checkedEmployee);
    const payload = {
      params: { ...params, ...dataPayloadSub2 },
    };
    dispatch(searchBasicInfo(payload));
  };
  return (
    <Flex flexDirection='column' gap='20px'>
      <Box paddingTop='5px'>
        <DrawerContainer modeForm='create' callbackAction={refetchData} />
      </Box>
      <Flex>
        <InputDebounceForm
          width='200px'
          action={handleSearch}
          haveIconSearch
          placeholder={tForm('search_multi_key')}
          autoComplete='search'
        />
        <Popover
          onClose={() => {
            setCheckedEmployee(get(ConstantLocal.FILTER_MENU_EMPLOYEE_LIST));
          }}
          onOpen={() => setRefresh((prev) => prev + 1)}
          closeOnEsc={false}
        >
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <Button
                  bg='none'
                  _hover={{
                    background: 'none',
                  }}
                  padding='0'
                >
                  <i className='fa-solid fa-filter' />
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverBody>
                    {get(ConstantLocal.FILTER_MENU)?.length > 0 ? (
                      <>
                        <FilterAppRC
                          checked={checkedEmployee}
                          setChecked={setCheckedEmployee}
                          keyDataLocal={ConstantLocal.FILTER_MENU_EMPLOYEE_LIST}
                          refresh={refresh}
                        />
                        <Flex mt={5} gap='10px' justifyContent='end'>
                          <DHMButton
                            onClick={() => {
                              onClose();
                            }}
                            text={tMessageContent('filter.no')}
                            buttonType='cancel'
                          />
                          <DHMButton
                            onClick={() => {
                              handleFilter(onClose);
                            }}
                            text={tMessageContent('filter.yes')}
                            autoFocus
                          />
                        </Flex>
                      </>
                    ) : (
                      'フィルターデータなし'
                    )}
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </>
          )}
        </Popover>
        <Popover
          onClose={() => setChecked(get(ConstantLocal.FILTER_MENU))}
          onOpen={() => !loadingMenuFilter && setRecallApi((prev) => prev + 1)}
          closeOnEsc={false}
        >
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <Button
                  bg='none'
                  _hover={{
                    background: 'none',
                  }}
                  padding='0'
                >
                  <i className='fa-solid fa-gear' />
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverBody>
                    <FilterAppRC
                      checked={checked}
                      setChecked={setChecked}
                      keyDataLocal={ConstantLocal.FILTER_MENU}
                      recallApi={recallApi}
                    />
                    <Flex mt={5} gap='10px' justifyContent='end'>
                      <DHMButton
                        onClick={() => {
                          onClose();
                        }}
                        text={tMessageContent('filter.no')}
                        buttonType='cancel'
                      />
                      <DHMButton
                        onClick={() => {
                          set(ConstantLocal.FILTER_MENU_EMPLOYEE_LIST, []);
                          setCheckedEmployee([]);
                          getAll().then((res) => {
                            const convertSortList = combineSort(res[0], checked);
                            clear().then(() =>
                              add(revertDataRC(convertSortList)).then(() => {
                                set(ConstantLocal.FILTER_MENU_EMPLOYEE_LIST, convertSortList);
                                setCheckedEmployee(convertSortList);
                              }),
                            );
                            setRefresh((prev) => prev + 1);
                          });
                          set(ConstantLocal.FILTER_MENU, checked);

                          handleCustomizeFilter(onClose, checked);
                        }}
                        text={tMessageContent('filter.yes')}
                        autoFocus
                      />
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </>
          )}
        </Popover>
      </Flex>
      <SimpleGrid
        position='relative'
        columns={{ sm: 1, md: 1, lg: 2, xl: 3 }}
        templateRows={{
          sm: 'repeat(auto-fill, 130px)',
          md: 'repeat(auto-fill, 130px)',
          lg: 'repeat(auto-fill, 130px)',
          xl: 'repeat(auto-fill, 130px)',
        }}
        spacing='10px'
        height={`calc(${heightApp} - 270px)`}
        overflow='auto'
      >
        {data.length > 0 &&
          data.map((item, index) => (
            <div key={index}>
              <CardItemBasicInfo {...item} {...props} callbackAction={refetchData} />
            </div>
          ))}
        {!loadingBasicInfo && data.length === 0 && (
          <Flex
            position='absolute'
            display='flex'
            width='100%'
            height='100%'
            alignItems='center'
            justifyContent='center'
          >
            <Img width='415px' height='365px' scale='1.2' src={DHMAssets.NoDataTable} alt='' />
          </Flex>
        )}
      </SimpleGrid>
      <PaginationList
        params={params}
        checkedEmployee={checkedEmployee}
        setParams={setParams}
        handlePayloadLevel2={handlePayloadLevel2}
      />
    </Flex>
  );
}
