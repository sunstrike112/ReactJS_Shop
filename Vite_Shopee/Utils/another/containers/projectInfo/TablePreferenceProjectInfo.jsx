import { Box, Checkbox, Flex } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { BoxMiniFeat } from 'dhm/components/Box/BoxMiniFeat';
import { InputDebounceForm } from 'dhm/components/Form/elements/DebounceInput';
import DHMModal from 'dhm/components/Modal';
import { DrawerContainer } from 'dhm/containers/drawer';
import { CommonTable } from 'dhm/containers/table/tableContainer.jsx';
import LanguageContext, { currentLanguage } from 'dhm/contexts/TranslateContext';
import { ServiceProjectInfo } from 'dhm/store/projectInfo/services';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { TableHistoryProjectInfo } from './TableHistoryProjectInfo';
import { columnProjectInfo } from './columnProjectInfo';

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
} = columnProjectInfo;

export function TablePreferenceProjectInfo({ isOpen, onClose }) {
  const { projectInfo, getProjectInfo, OPTIONS_BUSINESS_CATEGORY, OPTIONS_RECOGNIZE_PERSON } = ServiceProjectInfo();
  const { employeeId } = useParams();
  const { data, pagination } = projectInfo;
  const columnHelper = createColumnHelper();
  const { tProjectInfo, tTable } = useContext(LanguageContext);

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
        noTooltip: true,
        minSize: currentLanguage('jp') ? 280 : 300,
        cell: (info) => {
          const dataRow = info.row.original.recognitionOfPerson;
          const dataLabel = OPTIONS_RECOGNIZE_PERSON.filter((option) => option.value === dataRow)[0]?.label;
          return <>{dataLabel}</>;
        },
      }),
      columnHelper.accessor('action', {
        header: tTable('action'),
        noTooltip: true,
        cell: (info) => {
          const dataRow = info.row.original;
          const originData = {
            projectId: dataRow.projectId,
            projectName: dataRow.projectName,
            client: dataRow.client,
            counter: dataRow.counter,
            start: dataRow.start,
            salesInCharge: dataRow.salesInCharge,
            unitPrice: dataRow.unitPrice,
            sellTeam: dataRow.sellTeam,
            evaluation: dataRow.evaluation,
            rater: dataRow.rater,
            qualitativeEvaluationHrBrain: dataRow.qualitativeEvaluationHrBrain,
            qualitativeEvaluationOthers: dataRow.qualitativeEvaluationOthers,
            businessContent: dataRow.businessContent,
            businessCategory: dataRow.businessCategory,
            recognitionOfPerson: dataRow.recognitionOfPerson,
            matterNo: dataRow.matterNo,
            version: dataRow.version,
            salesEvaluation: dataRow.salesEvaluation,
            salesComment: dataRow.salesComment,
          };
          return (
            <BoxMiniFeat ml='20px' gap='20px'>
              <DrawerContainer modeForm='projectInfo' modePage='projectInfo' type='edit' originData={originData} />
            </BoxMiniFeat>
          );
        },
      }),
    ],
    [data],
  );

  const propsModal = {
    title: tProjectInfo('projectInfoRef'),
    isOpen,
    typeHeader: 'gradient',
    onCancel: onClose,
  };

  const params = {
    isHistory: false,
    sortType: 'desc',
    sortColumn: 'start',
    employeeId,
  };

  const payloadParams = {
    params,
  };

  const propsCommonTable = {
    columns,
    data,
    action: getProjectInfo,
    payloadParams,
    modeTable: 'gradient',
    rowIdKey: 'projectId',
    pagination,
    componentUnderSearch: () => (
      <>
        <Flex gap='20px'>
          <InputDebounceForm
            label={tTable('employeeId')}
            width='220px'
            placeholder='ID'
            readOnly
            value={employeeId}
            border={BORDERS.border_1(COLORS.gray_700)}
            pointerEvents='none'
            bg={COLORS.gray_400}
          />
        </Flex>
        <Flex alignItems='center' my={2}>
          <Box>{tProjectInfo('projectInfoList')}</Box>
          <BoxMiniFeat bg={COLORS.white}>
            <TableHistoryProjectInfo cursor='pointer' />
          </BoxMiniFeat>
        </Flex>
      </>
    ),
  };

  return (
    <>
      <DHMModal isOpen {...propsModal} size='6xl' isShowClose>
        <CommonTable customPadding='0px 0px 0px 30px' {...propsCommonTable} />
      </DHMModal>
    </>
  );
}
