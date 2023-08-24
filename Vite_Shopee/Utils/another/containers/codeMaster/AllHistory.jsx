import { ArrowUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button';
// import { ButtonImport } from 'dhm/components/Button/importButton';
import { ImportExcelFile } from 'dhm/components/Button/uploadButton/TestImport';
import DHMModal from 'dhm/components/Modal';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import { AppContext } from 'dhm/contexts/AppContext';
import LanguageContext from 'dhm/contexts/TranslateContext.jsx';
import { columnKeys } from 'dhm/services/table/columnKeysBE';
import { codeMasterAction, filterCodeMaster, searchDetailDisplay } from 'dhm/store/codeMaster/action.js';
import { BORDERS, COLORS } from 'dhm/utils/constants/style.js';
import { convertErrorsCsv } from 'dhm/utils/helpers/convert';
import { handleDownloadFile } from 'dhm/utils/helpers/method';
import { useContext, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommonTable } from '../table/tableContainer';

const { exportCsv, importCsv } = codeMasterAction;

export function TableAllHistory() {
  const { ID_KEY, canEdit } = useContext(AbilityContext);
  const { codeMaster } = useSelector((state) => state.codeMaster);
  const { pagination, data: dataTable } = codeMaster;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tTabs } = useContext(LanguageContext);
  const { heigthApp } = useContext(AppContext);
  const [isHistory, setIsHistory] = useState(false);
  const [listError, setListError] = useState([]);
  const dispatch = useDispatch();
  const handleExportCsv = () => {
    const onSuccess = (file) => {
      const fileName = `t_mst_code`;
      handleDownloadFile({
        response: file,
        fileName,
      });
    };
    const payload = {
      onSuccess,
    };
    dispatch(exportCsv(payload));
  };
  const handleImportCsv = (file, callback) => {
    setListError([]);
    const onSuccess = () => {
      callback();
    };
    const onFailed = (err) => {
      if (err?.errorsCsv) {
        onOpen();
        setListError(convertErrorsCsv(err));
      }
    };
    const payload = {
      file,
      onSuccess,
      onFailed,
    };
    dispatch(importCsv(payload));
  };
  const handleChangData = (e, table) => {
    table.options.meta.funcClearParamsFilter();
    if (e === 'history') {
      setIsHistory(true);
      table.options.meta.funcFilter({
        isHistory: true,
      });
    } else {
      setIsHistory(false);
      table.options.meta.funcFilter({
        isHistory: false,
      });
    }
  };

  const {
    codeListId,
    codeListName,
    codeName,
    codeValue,
    codeNameEn,
    createdDatetime,
    createdUser,
    updatedDatetime,
    deleteFlg,
    sortOrder,
    updatedUser,
  } = columnKeys;
  let columns;
  if (isHistory) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    columns = useMemo(
      () => [
        // columnFunc.keyIndexTable(),
        codeListId({ haveCustomFilter: true }),
        codeListName({ haveCustomFilter: true }),
        codeValue({ haveCustomFilter: true }),
        codeName({ haveCustomFilter: true }),
        codeNameEn({ haveCustomFilter: true }),
        sortOrder({ haveCustomFilter: true }),
        createdDatetime({ haveCustomFilter: true }),
        createdUser,
        updatedDatetime({ haveCustomFilter: true }),
        updatedUser({ haveCustomFilter: true }),
        deleteFlg,
      ],
      [isHistory],
    );
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    columns = useMemo(
      () => [
        codeListId({ haveCustomFilter: true }),
        codeListName({ haveCustomFilter: true }),
        codeValue({ haveCustomFilter: true }),
        codeName({ haveCustomFilter: true }),
        codeNameEn({ haveCustomFilter: true }),
        // statusHistory,
        sortOrder({ haveCustomFilter: true }),
        createdDatetime({ haveCustomFilter: true }),
        createdUser,
        updatedDatetime({ haveCustomFilter: true }),
        updatedUser({ haveCustomFilter: true }),
      ],
      [isHistory],
    );
  }

  const params = {
    isHistory,
    sortType: 'asc,asc,asc',
    codeListIds: null,
    sortColumn: 'codeValue,createdDatetime,updatedDatetime',
  };

  const payloadParams = {
    params,
  };
  const paramsFilter = {
    isHistory,
    deleteFlg: 0,
    isAll: true,
  };
  const propsCommonTable = {
    columns,
    data: dataTable,
    action: searchDetailDisplay,
    payloadParams,
    rowIdKey: 'id',
    pagination,
    actionFilter: filterCodeMaster,
    moreParamsFilter: paramsFilter,
    defaultSort: {
      sortType: params.sortType,
      sortColumn: params.sortColumn,
    },
    componentUnderSearch: ({ table }) => (
      <>
        <Flex alignItems='center' gap='3px'>
          <Box
            position='absolute'
            bg={COLORS.white}
            border={BORDERS.border_1('#4472C4')}
            top='-2px'
            left='0'
            borderRadius={BORDERS.radius_2_bottom}
            width='max-content'
            padding='0'
          >
            <Grid templateColumns='repeat(1, 1fr)' gap={0}>
              <RadioGroup onChange={(e) => handleChangData(e, table)} defaultValue='effective'>
                <Stack direction='row'>
                  <GridItem h='10' textAlign='center' paddingTop={2} width='164px'>
                    <Radio value='effective'>{tTabs('effective_target')}</Radio>
                  </GridItem>
                  <GridItem h='10' textAlign='center' paddingTop={2} width='164px' margin='0px !important'>
                    <Radio value='history'>{tTabs('all_history')}</Radio>
                  </GridItem>
                </Stack>
              </RadioGroup>
            </Grid>
          </Box>
        </Flex>
        <Flex justify='end' mr='5px'>
          <Flex gap='10px'>
            {canEdit(ID_KEY[19]) && (
              <ImportExcelFile
                onImport={(data) =>
                  handleImportCsv(data, () => {
                    table.options.meta.funcReset();
                    table.options.meta.funcClearParamsFilter();
                  })
                }
              />
            )}

            <DHMButton
              text={tTabs('export')}
              buttonType='master'
              rightIcon={<ArrowUpIcon />}
              onClick={handleExportCsv}
            />
          </Flex>
        </Flex>
      </>
    ),
  };

  return (
    <>
      <CommonTable {...propsCommonTable} />
      <DHMModal title='エラーがありました。' isOpen={isOpen} onClose={onClose} size='6xl' isShowClose>
        <Box height={`calc(${heigthApp} - 300px)`} overflow='auto'>
          <Text fontWeight='bold' fontSize='14px' mb='15px'>
            エラーがあるためインポート出来ません。CSVファイルを修正後、再度インポートしてください。
          </Text>
          <Table variant='simple' size='sm'>
            <Thead>
              <Tr>
                <Th>行数</Th>
                <Th>列名</Th>
                <Th>エラー内容</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listError.map((item) => (
                <Tr key={item.line}>
                  <Td>{+item.line}</Td>
                  <Td>
                    {item.codes.map((code, idx) => (
                      <Box key={idx} color='red.500'>
                        {code?.includes('DHM_COM_E') ? '--' : code}
                      </Box>
                    ))}
                  </Td>
                  <Td>
                    {item?.messages.map((message, index) => (
                      <Box key={index} color='red.500'>
                        {/* {tCsv(message.split(' ').slice(1).join(' '))} */}
                        {message}
                      </Box>
                    ))}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </DHMModal>
    </>
  );
}
