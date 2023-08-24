import { Checkbox, Flex, Img, Tooltip, useDisclosure } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { DHMAssets } from 'dhm/assets/index';
import { WrapperSubForm } from 'dhm/components/Form/WrapperSubForm';
import { InputDebounceForm } from 'dhm/components/Form/elements/DebounceInput';
import DHMModal from 'dhm/components/Modal';
import { CommonTable } from 'dhm/containers/table/tableContainer.jsx';
import LanguageContext, { currentLanguage } from 'dhm/contexts/TranslateContext';
import { ServiceProjectInfo } from 'dhm/store/projectInfo/services';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { columnHistoryProjectInfo } from './columnHistoryProjectInfo';

const {
  projectId,
  projectName,
  client,
  counter,
  start,
  salesInCharge,
  unitPrice,
  sellTeam,
  evaluation,
  rater,
  qualitativeEvaluationHrBrain,
  qualitativeEvaluationOthers,
  businessContent,
  createdDatetime,
  createdUser,
  updatedDatetime,
  updatedUser,
  status,
} = columnHistoryProjectInfo;

export function TableHistoryProjectInfo({ ...props }) {
  const { employeeId } = useParams();
  const {
    historyProjectInfo,
    getHistoryProjectInfo,
    staffSummary,
    OPTIONS_BUSINESS_CATEGORY,
    OPTIONS_RECOGNIZE_PERSON,
  } = ServiceProjectInfo();
  const { data, pagination } = historyProjectInfo;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tProjectInfo, tForm } = useContext(LanguageContext);
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      projectId,
      projectName,
      client,
      counter,
      start,
      salesInCharge,
      unitPrice,
      sellTeam,
      evaluation,
      rater,
      qualitativeEvaluationHrBrain,
      qualitativeEvaluationOthers,
      businessContent,
      columnHelper.accessor('businessCategory', {
        header: tProjectInfo('businessCategory'),
        noTooltip: true,
        minSize: currentLanguage('jp') ? 800 : 900,
        cell: (info) => {
          const dataRow = info.row.original.businessCategory?.slice(1, -1).split(',');
          return (
            <Flex gap={10}>
              {[...OPTIONS_BUSINESS_CATEGORY].map((option) => (
                <Checkbox
                  isChecked={dataRow?.includes(option.value)}
                  size='lg'
                  colorScheme={COLORS.white}
                  iconColor={COLORS.black_primary}
                  borderColor={COLORS.gray_700}
                  key={option.value}
                  pointerEvents='none'
                >
                  {option.label}
                </Checkbox>
              ))}
            </Flex>
          );
        },
      }),
      columnHelper.accessor('recognitionOfPerson', {
        header: tProjectInfo('recognitionOfPerson'),
        minSize: 300,
        noTooltip: true,
        cell: (info) => {
          const dataRow = info.row.original.recognitionOfPerson;
          const dataLabel = OPTIONS_RECOGNIZE_PERSON.filter((option) => option.value === dataRow)[0]?.label;
          return <>{dataLabel}</>;
        },
      }),
      createdDatetime,
      createdUser,
      updatedDatetime,
      updatedUser,
      status,
    ],
    [data],
  );

  const propsModal = {
    title: tProjectInfo('projectInfoHistory'),
    isOpen,
    typeHeader: 'gradient',
    onCancel: onClose,
  };

  const params = {
    isHistory: true,
    sortType: 'desc',
    sortColumn: 'updatedDatetime',
    employeeId,
  };

  const payloadParams = {
    params,
  };

  const propsCommonTable = {
    columns,
    data,
    action: getHistoryProjectInfo,
    payloadParams,
    modeTable: 'gradient',
    rowIdKey: 'id',
    pagination,
    componentUnderSearch: () => (
      <>
        <WrapperSubForm title={tForm('employee')}>
          <Flex gap='20px'>
            <InputDebounceForm
              label='ID'
              width='220px'
              placeholder='ID'
              readOnly
              value={employeeId}
              border={BORDERS.border_1(COLORS.gray_700)}
              pointerEvents='none'
              bg={COLORS.gray_400}
            />
            <InputDebounceForm
              label={tForm('name')}
              width='220px'
              placeholder={tForm('name')}
              readOnly
              value={staffSummary.data.employeeName}
              border={BORDERS.border_1(COLORS.gray_700)}
              pointerEvents='none'
              bg={COLORS.gray_400}
            />
          </Flex>
        </WrapperSubForm>
      </>
    ),
  };

  return (
    <>
      <Tooltip label={tProjectInfo('projectInfoHistory')}>
        <Img src={DHMAssets.ICON_HISTORY} onClick={onOpen} {...props} />
      </Tooltip>
      <DHMModal {...propsModal} size='6xl' isShowClose>
        <CommonTable customPadding='0px 0px 0px 30px' {...propsCommonTable} />
      </DHMModal>
    </>
  );
}
