import { Box, Flex } from '@chakra-ui/react';
import { BoxValue } from 'dhm/components/Box/BoxValue';
import { ResponsiveContext } from 'dhm/contexts/ResponsiveContext';
import { ServiceEmployeeSuccess } from 'dhm/store/employeeSuccess/services';
import { isCanParse } from 'dhm/utils/helpers/condition';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ChartEmployeeSuccess } from '../employeeSuccess/chart';
import { WrapperCard } from './CardWrapper';

const CustomBox = styled(Flex)`
  // Scroll vertical style
  ::-webkit-scrollbar {
    height: 3px;
  }
`;
export function EmployeeSuccessAxis() {
  const { dropdown } = useSelector((state) => state.common);
  const { JOB_CONTENT, RELATIONSHIP, CAREER, MONEY, WORKING_WAY, OTHERS } = dropdown;
  const LIST_CHECKBOXS = [
    {
      id: 1,
      title: '① 仕事内容',
      list: JOB_CONTENT,
      key: 'jobDescription',
    },
    {
      id: 2,
      title: '② 人間関係',
      list: RELATIONSHIP,
      key: 'relationShips',
    },
    {
      id: 3,
      title: '③ キャリア',
      list: CAREER,
      key: 'career',
    },
    {
      id: 4,
      title: '④ お金',
      list: MONEY,
      key: 'money',
    },
    {
      id: 5,
      title: '⑤ 働き方',
      list: WORKING_WAY,
      key: 'workMethod',
    },
    {
      id: 6,
      title: '⑥ その他',
      list: OTHERS,
      key: 'otherSuccess',
    },
  ];
  const {
    resSummary: { employeeSuccess: resEmployeeSuccess },
  } = useContext(ResponsiveContext);
  const { state } = ServiceEmployeeSuccess();
  const { detailEmployeeSuccess } = state;
  const [checkboxValues, setCheckboxValues] = useState(() => ({
    jobDescription: [],
    relationShips: [],
    career: [],
    money: [],
    workMethod: [],
    otherSuccess: [],
  }));
  useEffect(() => {
    setCheckboxValues({
      jobDescription: isCanParse(detailEmployeeSuccess.jobDescription),
      relationShips: isCanParse(detailEmployeeSuccess.relationShips),
      career: isCanParse(detailEmployeeSuccess.career),
      money: isCanParse(detailEmployeeSuccess.money),
      workMethod: isCanParse(detailEmployeeSuccess.workMethod),
      otherSuccess: isCanParse(detailEmployeeSuccess.otherSuccess),
    });
  }, [detailEmployeeSuccess]);
  return (
    <WrapperCard
      title='Employee Success軸'
      height={resEmployeeSuccess.hLayout}
      typeHeader='gradient'
      typeEdit='employeeSuccess'
    >
      <Flex gap='12px'>
        <Box
          width={resEmployeeSuccess.wChart}
          height={resEmployeeSuccess.hChart}
          paddingTop={resEmployeeSuccess.ptChart}
        >
          <ChartEmployeeSuccess />
        </Box>
        <Box width='60%'>
          <Box
            fontSize={resEmployeeSuccess.fsContent}
            height={resEmployeeSuccess.hDes1}
            overflowY='auto'
            border='1px'
            padding='5px'
            mb='5px'
          >
            <Box>● KOF：{detailEmployeeSuccess.kof || ''}</Box>
            <Box>● その他：{detailEmployeeSuccess.otherKof || ''}</Box>
          </Box>
          <Box fontSize={resEmployeeSuccess.fsContent}>
            ESステータス:
            <Flex gap='10px' mt='5px' width='auto' flexFlow='wrap' height='30px' overflowY='auto'>
              {dropdown.ES_STATUS.map((item) => (
                <BoxValue
                  width='auto'
                  padding='2px 5px'
                  height={resEmployeeSuccess.hBoxValue}
                  lineHeight={resEmployeeSuccess.lhBoxValue}
                  fontSize={resEmployeeSuccess.fsContent}
                  isActive={state.detailEmployeeSuccess.esStatus === item.value}
                  key={item.value}
                >
                  {item.label}
                </BoxValue>
              ))}
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Box fontSize={resEmployeeSuccess.fsContent}>モチベーションフラグ:</Box>
      {LIST_CHECKBOXS.map((item) => (
        <Flex key={item.id}>
          <Box width='80px' pt='5px' fontSize={resEmployeeSuccess.fsContent}>
            {item.title}
          </Box>
          <CustomBox justify='start' gap='5px' overflowX='auto' mb='5px' width='100%'>
            {item.list.map((key) => (
              <Flex gap='5px' key={key.value}>
                <Box mb={resEmployeeSuccess.mbBoxValue}>
                  <BoxValue
                    fontSize={resEmployeeSuccess.fsContent}
                    width='max-content'
                    padding='2px 4px'
                    height={resEmployeeSuccess.hBoxValue}
                    isActive={checkboxValues[item.key]?.includes(key.value)}
                    lineHeight={resEmployeeSuccess.lhBoxValue}
                  >
                    {key.label}
                  </BoxValue>
                </Box>
                {item.key === 'otherSuccess' && key.value === '03' && checkboxValues[item.key]?.includes(key.value) && (
                  <Box border='1px' padding='2px 4px' height={resEmployeeSuccess.hDes2} width='100px' overflowY='auto'>
                    {detailEmployeeSuccess.otherSuccessDescription}
                  </Box>
                )}
              </Flex>
            ))}
          </CustomBox>
        </Flex>
      ))}
    </WrapperCard>
  );
}
