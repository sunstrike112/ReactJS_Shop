import { Box, Flex, Select } from '@chakra-ui/react';
import { DHMBox } from 'dhm/components/Box';
import LanguageContext, { currentLanguage } from 'dhm/contexts/TranslateContext';
import { ServiceOvertime } from 'dhm/store/overtime/services';
import { LIST_MONTH_FISCAL_YEAR, OPTION_YEAR_OVERTIME } from 'dhm/utils/constants/select';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const WrapperFlex = styled(Flex)`
  .chakra-select {
    padding: 0 0 0 5px;
  }
  .chakra-select__icon-wrapper {
    position: absolute;
    right: -5px;
  }
`;

export function Overtime() {
  const { employeeId } = useParams();
  const { tCsv } = useContext(LanguageContext);
  const { BoxValue } = DHMBox;
  const { getOvertimeAction, overTimeData } = ServiceOvertime();

  const handleViewOvertime = (event) => {
    getOvertimeAction({
      employeeId,
      fiscalYear: event.target.value,
    });
  };

  useEffect(() => {
    getOvertimeAction({
      employeeId,
      fiscalYear: OPTION_YEAR_OVERTIME[0].value,
    });
  }, []);

  const listOvertime = LIST_MONTH_FISCAL_YEAR.map((monthObj) => {
    const isOvertime = overTimeData?.months[monthObj.value] || false;
    return { ...monthObj, isOvertime };
  });

  return (
    <WrapperFlex>
      <Flex gap='5px' mr='5px' flexDirection='column' color={COLORS.blue_primary} lineHeight='19px'>
        <Box fontWeight='bold'>{tCsv('overtime')} &nbsp;&nbsp;：</Box>
        <Flex>
          <Box mr='5px' fontSize='14px'>
            {tCsv('year')}
          </Box>
          <Select
            border={BORDERS.border_1(COLORS.gray_700)}
            fontSize='14px'
            height='20px'
            width='50px'
            iconSize='sm'
            onChange={(event) => handleViewOvertime(event)}
          >
            {OPTION_YEAR_OVERTIME.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
      <Flex direction='column' gap='6px'>
        <Flex gap='12px'>
          {listOvertime.slice(0, 6).map((item, index) => (
            <BoxValue
              lineHeight='20px'
              width='55px'
              height='20px'
              fontSize='10px'
              isActive={!item.isOvertime}
              key={index}
              typeBox='danger'
              border='none'
              color={COLORS.white}
            >
              {currentLanguage('jp') ? item.labelJP : item.labelEN}
            </BoxValue>
          ))}
        </Flex>
        <Flex gap='12px'>
          {listOvertime.slice(6).map((item, index) => (
            <BoxValue
              lineHeight='20px'
              width='55px'
              height='20px'
              fontSize='10px'
              isActive={!item.isOvertime}
              key={index}
              typeBox='danger'
              color={COLORS.white}
              border='none'
            >
              {currentLanguage('jp') ? item.labelJP : item.labelEN}
            </BoxValue>
          ))}
        </Flex>
      </Flex>
    </WrapperFlex>
  );
}
