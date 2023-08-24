import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
import { ImportExcelFile } from 'dhm/components/Button/uploadButton/TestImport';
import { InputDebounceFormUserManage } from 'dhm/components/Form/elements/DebounceInputUserManage';
import DHMModal from 'dhm/components/Modal';
import { ConfirmModal } from 'dhm/components/Modal/elements/confirmModal';
import { CommonTable } from 'dhm/containers/table/tableContainer';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { getDropdownRole } from 'dhm/store/common/action';
import { ServiceUser } from 'dhm/store/manageUser/user/services';
import { convertErrorsCsv } from 'dhm/utils/helpers/convert';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { HistoryTable } from './HistoryTable';
import { columnUserEdit, columnsUser } from './column';
import { CRUForm } from './form';

function ListButtonFunc({ table }) {
  return (
    <Flex justify='start' gap='10px'>
      <CRUForm table={table} />
    </Flex>
  );
}
export function TableUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();
  const { ID_KEY, canEdit } = useContext(AbilityContext);
  const dispatch = useDispatch();
  const { state, action, event } = ServiceUser();
  const { tForm } = useContext(LanguageContext);
  const [isEdit, setIsEdit] = useState(false);
  const { data, pagination } = state.user;
  const [listError, setListError] = useState([]);
  const [dataUser, setDataUser] = useState(data || []);
  const [keyword, setKeyword] = useState('');
  const updateUser = (table) => {
    const dataPayload = dataUser.map((item) => ({
      mailAddress: item.mailAddress,
      userName: item.userName,
      roleId: item.roleId,
      version: item.version,
      deleteFlag: item.deleteFlg,
    }));
    const onSuccess = () => {
      table.options.meta.funcReset();
      setIsEdit(false);
    };
    const paramsPayload = {
      data: dataPayload,
      onSuccess,
    };
    event.updateUser(paramsPayload);
  };
  useEffect(() => setDataUser(data), [data]);
  const columns = useMemo(() => [...columnsUser], [data]);
  const columnsEdit = useMemo(() => [...columnUserEdit], [data]);

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
    event.importUser(payload);
  };
  const params = {
    isHistory: false,
    deleteFlg: 0,
    sortType: 'desc',
    sortColumn: 'updatedDatetime',
    keyWord: keyword,
  };

  const paramsFilter = {
    isHistory: false,
    deleteFlg: 0,
    isAll: true,
  };
  const payloadParams = {
    params,
  };
  const refreshDropdownRole = () => {
    dispatch(getDropdownRole());
  };
  const propsCommonTable = {
    columns: isEdit ? columnsEdit : columns,
    data,
    action: action.searchUser,
    payloadParams,
    rowIdKey: 'userCode',
    componentUnderSearch: ({ table, rowSelection }) => (
      <Flex justify='space-between'>
        <Box pt='30px'>
          <Box />
          <InputDebounceFormUserManage
            width='200px'
            action={(value) => {
              setKeyword(value);
              table.options.meta.funcFilter({
                keyWord: value,
              });
            }}
            haveIconSearch
            placeholder={tForm('search_sinlge_key')}
            autoComplete='search'
          />
        </Box>
        <Box>
          {!isEdit && (
            <>
              <Flex gap='15px' justify='end'>
                {canEdit(ID_KEY[21]) && (
                  <Box
                    cursor='pointer'
                    type='button'
                    onClick={() => {
                      refreshDropdownRole();
                      setIsEdit(!isEdit);
                    }}
                  >
                    <i className='fa-solid fa-pen' />
                  </Box>
                )}
                <HistoryTable mr={2} modeView='userAll' />
              </Flex>
              <Flex gap='10px' pt='10px'>
                {canEdit(ID_KEY[21]) && (
                  <>
                    <ImportExcelFile
                      onImport={(fileData) =>
                        handleImportCsv(fileData, () => {
                          table.options.meta.funcReset();
                          table.options.meta.funcClearParamsFilter();
                        })
                      }
                    />
                    <ListButtonFunc table={table} rowSelection={rowSelection} />
                  </>
                )}
              </Flex>
            </>
          )}
        </Box>
      </Flex>
    ),
    pagination,
    actionFilter: action.filterUser,
    moreParamsFilter: paramsFilter,
  };
  return (
    <>
      <CommonTable
        getDataEdit={isEdit ? setDataUser : null}
        isEdit={isEdit}
        callbackModeEdit={(table) => {
          setIsEdit(false);
          updateUser(table);
        }}
        {...propsCommonTable}
        componentUnderPagination={({ table }) =>
          isEdit && (
            <Flex mt='10px' justify='end' gap='10px'>
              <CloseButton handleClose={() => setIsEdit(false)} />
              <DHMButton text='update' onClick={onOpenConfirm} />
              <ConfirmModal
                isOpen={isOpenConfirm}
                onConfirm={() => updateUser(table)}
                onCancel={onCloseConfirm}
                type='update'
              />
            </Flex>
          )
        }
      />
      <DHMModal title='エラーがありました。' isOpen={isOpen} onClose={onClose} size='6xl' isShowClose>
        <Box height='calc(100vh - 300px)' overflow='auto'>
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
