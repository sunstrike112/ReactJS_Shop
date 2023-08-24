import { Flex, Radio, RadioGroup, useDisclosure } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { BoxMiniFeat } from 'dhm/components/Box/BoxMiniFeat';
import { DHMButton } from 'dhm/components/Button';
import { ConfirmModal } from 'dhm/components/Modal/elements/confirmModal';
import { DrawerContainer } from 'dhm/containers/drawer';
import { CommonTable } from 'dhm/containers/table/tableContainer';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { columnFunc } from 'dhm/services/table/columnKeysFunc';
import { ServiceWorkflow } from 'dhm/store/workflow/services';
import { STATUS, TYPE_RECORD, WF_STATUS } from 'dhm/utils/constants/select';
import { isShowButton } from 'dhm/utils/helpers/method';
import { BORDERS, COLORS } from 'dhm/utils/index';
import { useContext, useEffect, useMemo, useState } from 'react';
import StatusTag from '../component/StatusTag';
import { HistoryTable } from './HistoryTable';
import { ModalProcessList } from './ModalProcessList';
import { columnProcessList } from './column';

const { matterNo, matterName, careerName, applicant, approvedDate, approverRequest, agentRequest, wfStatusId } =
  columnProcessList;

export function TableProcessList() {
  const {
    user,
    listProcessIncomplete,
    listProcessCompleted,
    getProcessListIncomplete,
    getProcessListCompleted,
    updateProcessAction,
    getProcessListCompletedAction,
    getProcessListIncompleteAction,
  } = ServiceWorkflow();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDenial, onOpen: onOpenDenial, onClose: onCloseDenial } = useDisclosure();
  const { isOpen: isOpenCancel, onOpen: onOpenCancel, onClose: onCloseCancel } = useDisclosure();
  const [statusMatter, setStatusMatter] = useState(STATUS.DONE);
  const [processMatter, setProcessMatter] = useState(true);
  const { mail } = user;
  const { tWorkflow } = useContext(LanguageContext);
  const { data, pagination } = listProcessIncomplete;
  const { data: dataCompleted, pagination: paginationCompleted } = listProcessCompleted;
  const columnHelper = createColumnHelper();
  const isShowProcessAction = (typeProcess) => {
    switch (processMatter) {
      case true:
        if (typeProcess === WF_STATUS.APPLYING) return true;
        break;
      default:
        if (statusMatter === STATUS.DONE && typeProcess === WF_STATUS.DENIAL) return true;
        if (statusMatter === STATUS.ACTION_REQUIRED) return true;
        break;
    }
    return false;
  };

  const params = processMatter
    ? {
        isHistory: false,
        deleteFlg: 0,
        sortType: 'desc,desc',
        sortColumn: 'updatedDatetime,matterNo',
        applicant: true,
      }
    : {
        isHistory: false,
        deleteFlg: 0,
        sortType: 'desc,desc',
        sortColumn: 'updatedDatetime,matterNo',
        approverRequest: statusMatter === STATUS.DONE,
      };

  const paramsFilter = processMatter
    ? {
        isHistory: false,
        deleteFlg: 0,
        isAll: true,
        sortType: 'desc,desc',
        sortColumn: 'updatedDatetime,matterNo',
        applicant: true,
      }
    : {
        isHistory: false,
        deleteFlg: 0,
        isAll: true,
        sortType: 'desc,desc',
        sortColumn: 'updatedDatetime,matterNo',
        approverRequest: statusMatter === STATUS.DONE,
      };
  const payloadParams = {
    params,
  };

  const columns = useMemo(
    () =>
      processMatter || statusMatter !== STATUS.DONE
        ? [
            columnFunc.checkboxIncomplete(),
            matterNo,
            matterName,
            careerName,
            applicant,
            approvedDate,
            approverRequest,
            agentRequest,

            columnHelper.accessor('detail', {
              header: tWorkflow('detail'),
              noTooltip: true,
              cell: (info) => {
                const dataRow = info.row.original;
                const dataProcess = {
                  matterNo: dataRow.matterNo,
                  applyDate: dataRow.applyDate,
                  applicant: dataRow.applicant,
                  modePage: TYPE_RECORD[dataRow.careerId],
                  statusMatter,
                  processMatter,
                  payloadParams,
                  pagination,
                  paginationCompleted,
                  isShowButton: isShowButton(
                    mail,
                    dataRow.wfStatusId,
                    dataRow.applicant,
                    dataRow.approverRequest,
                    dataRow.agentRequest,
                  ),
                };
                return (
                  <BoxMiniFeat gap='20px'>
                    <DrawerContainer
                      modeForm='workflow'
                      modePage={TYPE_RECORD[dataRow.careerId]}
                      dataProcess={dataProcess}
                    />
                  </BoxMiniFeat>
                );
              },
            }),
            wfStatusId,
            columnHelper.accessor('process', {
              header: tWorkflow('process'),
              noTooltip: true,
              cell: (info) => {
                const dataRow = info.row.original;
                const originData = {
                  applicant: dataRow.applicant,
                  approverRequest: dataRow.approverRequest,
                  agentRequest: dataRow.agentRequest,
                  matterNo: dataRow.matterNo,
                  matterName: dataRow.matterName,
                  applyDate: dataRow.applyDate,
                  careerName: dataRow.careerName,
                  applyComment: dataRow.applyComment,
                };
                return (
                  <>
                    {isShowProcessAction(dataRow.wfStatusId) && (
                      <BoxMiniFeat gap='20px'>
                        <ModalProcessList
                          type='process'
                          originData={originData}
                          processMatter={processMatter}
                          pagination={pagination}
                          payloadParams={payloadParams}
                          paginationCompleted={paginationCompleted}
                          statusMatter={statusMatter}
                        />
                      </BoxMiniFeat>
                    )}
                  </>
                );
              },
            }),

            columnHelper.accessor('history', {
              header: tWorkflow('history'),
              noTooltip: true,
              cell: (info) => {
                const dataRow = info.row.original;
                const originData = {
                  matterNo: dataRow.matterNo,
                };
                return (
                  <BoxMiniFeat gap='20px'>
                    <HistoryTable mr={2} originData={originData} />
                  </BoxMiniFeat>
                );
              },
            }),
          ]
        : [
            matterNo,
            matterName,
            careerName,
            applicant,
            approvedDate,
            approverRequest,
            agentRequest,

            columnHelper.accessor('detail', {
              header: tWorkflow('detail'),
              noTooltip: true,
              cell: (info) => {
                const dataRow = info.row.original;
                const dataProcess = {
                  matterNo: dataRow.matterNo,
                  applyDate: dataRow.applyDate,
                  applicant: dataRow.applicant,
                  modePage: TYPE_RECORD[dataRow.careerId],
                  statusMatter,
                  processMatter,
                  payloadParams,
                  pagination,
                  paginationCompleted,
                  isShowButton: isShowButton(
                    mail,
                    dataRow.wfStatusId,
                    dataRow.applicant,
                    dataRow.approverRequest,
                    dataRow.agentRequest,
                  ),
                };
                return (
                  <BoxMiniFeat gap='20px'>
                    <DrawerContainer
                      modeForm='workflow'
                      modePage={TYPE_RECORD[dataRow.careerId]}
                      dataProcess={dataProcess}
                    />
                  </BoxMiniFeat>
                );
              },
            }),
            wfStatusId,
            columnHelper.accessor('process', {
              header: tWorkflow('process'),
              noTooltip: true,
              cell: (info) => {
                const dataRow = info.row.original;
                const originData = {
                  applicant: dataRow.applicant,
                  approverRequest: dataRow.approverRequest,
                  agentRequest: dataRow.agentRequest,
                  matterNo: dataRow.matterNo,
                  matterName: dataRow.matterName,
                  applyDate: dataRow.applyDate,
                  careerName: dataRow.careerName,
                  applyComment: dataRow.applyComment,
                };
                return (
                  <>
                    {isShowProcessAction(dataRow.wfStatusId) && (
                      <BoxMiniFeat gap='20px'>
                        <ModalProcessList
                          type='process'
                          originData={originData}
                          processMatter={processMatter}
                          pagination={pagination}
                          payloadParams={payloadParams}
                          paginationCompleted={paginationCompleted}
                          statusMatter={statusMatter}
                        />
                      </BoxMiniFeat>
                    )}
                  </>
                );
              },
            }),

            columnHelper.accessor('history', {
              header: tWorkflow('history'),
              noTooltip: true,
              cell: (info) => {
                const dataRow = info.row.original;
                const originData = {
                  matterNo: dataRow.matterNo,
                };
                return (
                  <BoxMiniFeat gap='20px'>
                    <HistoryTable mr={2} originData={originData} />
                  </BoxMiniFeat>
                );
              },
            }),
          ],
    [data, dataCompleted, statusMatter, processMatter],
  );

  const handleMultiProcess = (selectedProcess, type, onCloseModal) => {
    const payload = {
      data: {
        matterNos: selectedProcess,
        wfStatusId: type,
        processComment: null,
      },
      onSuccess: () => {
        if (processMatter)
          getProcessListIncompleteAction({
            params: {
              ...payloadParams.params,
              page: 1,
              limit: pagination.limit,
              applicant: true,
            },
          });
        else
          getProcessListCompletedAction({
            params: {
              ...payloadParams.params,
              page: 1,
              limit: paginationCompleted.limit,
              approverRequest: statusMatter === STATUS.DONE,
            },
          });
        onCloseModal();
      },
    };
    updateProcessAction(payload);
  };

  function ListButtonFunc({ rowSelection }) {
    return (
      <Flex gap='10px' mt='5px' mr='10px'>
        <>
          {processMatter ? (
            <DHMButton isDisabled={Object.keys(rowSelection).length === 0} onClick={onOpenCancel} buttonType='denial'>
              {tWorkflow('cancelBtn')}
            </DHMButton>
          ) : (
            statusMatter === STATUS.ACTION_REQUIRED && (
              <>
                <DHMButton isDisabled={Object.keys(rowSelection).length === 0} onClick={onOpen}>
                  {tWorkflow('approval')}
                </DHMButton>
                <DHMButton
                  isDisabled={Object.keys(rowSelection).length === 0}
                  onClick={onOpenDenial}
                  buttonType='denial'
                >
                  {tWorkflow('denial')}
                </DHMButton>
              </>
            )
          )}
        </>
        <ConfirmModal
          isOpen={isOpen}
          onConfirm={() => handleMultiProcess(Object.keys(rowSelection), WF_STATUS.APPROVAL, onClose)}
          onCancel={onClose}
          type='update'
        />
        <ConfirmModal
          isOpen={isOpenDenial}
          onConfirm={() => handleMultiProcess(Object.keys(rowSelection), WF_STATUS.DENIAL, onCloseDenial)}
          onCancel={onCloseDenial}
          type='update'
        />
        <ConfirmModal
          isOpen={isOpenCancel}
          onConfirm={() => handleMultiProcess(Object.keys(rowSelection), WF_STATUS.CANCEL, onCloseCancel)}
          onCancel={onCloseCancel}
          type='update'
        />
      </Flex>
    );
  }

  useEffect(() => {
    if (processMatter)
      getProcessListIncompleteAction({
        params: {
          ...payloadParams.params,
          page: 1,
          limit: pagination.limit,
          applicant: true,
        },
      });
    else
      getProcessListCompletedAction({
        params: {
          ...payloadParams.params,
          page: 1,
          limit: paginationCompleted.limit,
          approverRequest: statusMatter === STATUS.DONE,
        },
      });
  }, [statusMatter, processMatter]);

  const propsCommonTable = {
    columns,
    data: processMatter ? data : dataCompleted,
    action: processMatter ? getProcessListIncomplete : getProcessListCompleted,
    actionFilter: processMatter ? getProcessListIncomplete : getProcessListCompleted,
    payloadParams,
    pagination: processMatter ? pagination : paginationCompleted,
    moreParamsFilter: paramsFilter,
    rowIdKey: 'matterNo',
    componentUnderSearch: ({ table, rowSelection }) => (
      <Flex justify='space-between' my='30px'>
        <Flex gap='20px'>
          <Flex>
            <StatusTag
              title={tWorkflow('requestList')}
              isActive={processMatter}
              handleClick={() => setProcessMatter(true)}
            />
            <StatusTag
              title={tWorkflow('respondToRequest')}
              isActive={!processMatter}
              handleClick={() => setProcessMatter(false)}
            />
          </Flex>
          <Flex>
            {!processMatter && (
              <RadioGroup value={statusMatter} onChange={setStatusMatter}>
                <Flex flexDirection='column' alignItems='flex-start'>
                  <Radio size='md' border={BORDERS.border_1(COLORS.black_second)} value={STATUS.DONE}>
                    {tWorkflow('done')}
                  </Radio>
                  <Radio size='md' border={BORDERS.border_1(COLORS.black_second)} value={STATUS.ACTION_REQUIRED}>
                    {tWorkflow('actionRequired')}
                  </Radio>
                </Flex>
              </RadioGroup>
            )}
          </Flex>
        </Flex>
        <ListButtonFunc table={table} rowSelection={rowSelection} />
      </Flex>
    ),
  };
  return <CommonTable {...propsCommonTable} />;
}
