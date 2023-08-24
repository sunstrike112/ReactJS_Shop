import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button';
import { ConfirmModal } from 'dhm/components/Modal/elements/confirmModal';
import { CommonTable } from 'dhm/containers/table/tableContainer';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { columnFunc } from 'dhm/services/table/columnKeysFunc';
import { ServiceWorkflow } from 'dhm/store/workflow/services';
import { replaceElementsInArray } from 'dhm/utils/helpers/method';
import { BORDERS, COLORS } from 'dhm/utils/index';
import cloneDeep from 'lodash/cloneDeep';
import { useContext, useEffect, useMemo, useState } from 'react';
import ReactSelect from 'react-select';
import styled from 'styled-components';
import { columnsImportProcessList } from './column';

const WrapperFlex = styled(Flex)`
  .select-employeeId-pre__single-value {
    display: none;
  }
  .select-employeeId-pre__control {
    width: 200px;
    border-radius: 0px;
    border: ${BORDERS.border_1(COLORS.gray_700)};
  }
`;

export function TableImportProcessList() {
  const {
    listImportProcess,
    LIST_APPROVER_AND_AGENT,
    getImportProcessList,
    getImportProcessListAction,
    getListApproverAndAgentAction,
    assignImportProcessAction,
  } = ServiceWorkflow();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tWorkflow, tForm } = useContext(LanguageContext);
  const { data, pagination } = listImportProcess;
  const columns = useMemo(() => [columnFunc.checkbox(), ...columnsImportProcessList], [data]);
  const [editData, setEditData] = useState(data);
  useEffect(() => {
    getListApproverAndAgentAction();
  }, []);

  useEffect(() => {
    setEditData(data);
  }, [data]);

  const handleChangeApprover = (approver, rowSelection) => {
    const selectedProcess = cloneDeep(editData).filter((item) => Object.keys(rowSelection).includes(item.matterNo));
    const replaceValueArray = selectedProcess.map((item) => ({ ...item, approverRequest: approver.value }));
    setEditData(replaceElementsInArray(replaceValueArray, cloneDeep(editData)));
  };
  const handleChangeAgent = (agent, rowSelection) => {
    const selectedProcess = cloneDeep(editData).filter((item) => Object.keys(rowSelection).includes(item.matterNo));
    const replaceValueArray = selectedProcess.map((item) => ({ ...item, agentRequest: agent.value }));
    setEditData(replaceElementsInArray(replaceValueArray, cloneDeep(editData)));
  };

  const listAssignProcess = cloneDeep(editData).filter(
    (item) => (item.approverRequest !== '_' && item.approverRequest !== null) || item.agentRequest !== null,
  );

  const handleAssignImportProcessList = () => {
    if (listAssignProcess.length > 0)
      assignImportProcessAction({
        params: {
          approverRequest: listAssignProcess[0].approverRequest,
          agentRequest: listAssignProcess[0].agentRequest,
          applyIds: listAssignProcess.map((item) => item.matterNo),
        },
        onSuccess: () =>
          getImportProcessListAction({
            deleteFlg: 0,
            isHistory: false,
            isAll: false,
            sortType: 'desc,desc',
            sortColumn: 'updatedDatetime,matterNo',
            page: 1,
            limit: 10,
          }),
      });
  };

  const params = {
    deleteFlg: 0,
    isHistory: false,
    isAll: false,
    sortType: 'desc,desc',
    sortColumn: 'updatedDatetime,matterNo',
  };

  const paramsFilter = {
    isHistory: false,
    deleteFlg: 0,
    isAll: false,
  };
  const payloadParams = {
    params,
  };

  const propsCommonTable = {
    columns,
    data: editData,
    action: getImportProcessList,
    actionFilter: getImportProcessListAction,
    payloadParams,
    rowIdKey: 'matterNo',
    pagination,
    moreParamsFilter: paramsFilter,
    componentUnderPagination: () => (
      <Flex mt='10px' justify='end' gap='10px'>
        <DHMButton text='cancel' buttonType='cancel' />
        <DHMButton text='update' onClick={onOpen} isDisabled={listAssignProcess.length === 0} />
        <ConfirmModal
          isOpen={isOpen}
          onConfirm={() => handleAssignImportProcessList()}
          onCancel={onClose}
          type='update'
        />
      </Flex>
    ),
    componentUnderSearch: ({ rowSelection }) => (
      <Flex justify='space-between' alignItems='center' mt='18px' mb='15px' mr='5px'>
        <Box>{tWorkflow('openList')}</Box>
        <Flex gap='20px'>
          <Flex alignItems='center' gap='20px'>
            <Box>{tWorkflow('authorizer')}</Box>
            <WrapperFlex width='200px'>
              <ReactSelect
                className='select-employeeId'
                classNamePrefix='select-employeeId-pre'
                options={LIST_APPROVER_AND_AGENT}
                onChange={(approver) => handleChangeApprover(approver, rowSelection)}
                placeholder=''
                isDisabled={Object.keys(rowSelection).length === 0}
                noOptionsMessage={() => tForm('noData')}
                loadingMessage={() => tForm('loading')}
              />
            </WrapperFlex>
          </Flex>
          <Flex alignItems='center' gap='20px'>
            <Box>{tWorkflow('agentImport')}</Box>
            <WrapperFlex width='200px'>
              <ReactSelect
                className='select-employeeId'
                classNamePrefix='select-employeeId-pre'
                options={LIST_APPROVER_AND_AGENT}
                onChange={(agent) => handleChangeAgent(agent, rowSelection)}
                placeholder=''
                isDisabled={Object.keys(rowSelection).length === 0}
                noOptionsMessage={() => tForm('noData')}
                loadingMessage={() => tForm('loading')}
              />
            </WrapperFlex>
          </Flex>
        </Flex>
      </Flex>
    ),
  };
  return <CommonTable {...propsCommonTable} />;
}
