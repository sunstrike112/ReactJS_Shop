import { Box, Flex } from '@chakra-ui/react';
import { DHMBox } from 'dhm/components/Box';
import { BoxText } from 'dhm/components/Box/BoxText';
import { DrawerContainer } from 'dhm/containers/drawer';
import { ResponsiveContext } from 'dhm/contexts/ResponsiveContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServicesOverviewInfo } from 'dhm/store/overviewInfo/services';
import { LEVEL_EMPLOYEE } from 'dhm/utils/constants/select';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { useContext } from 'react';

export function OverviewTag() {
  const { BoxValue } = DHMBox;
  const { overviewInfo } = ServicesOverviewInfo();
  const { tOverviewInfo: t } = useContext(LanguageContext);
  const {
    resSummary: { overview: resOverview },
  } = useContext(ResponsiveContext);
  const boxValuesData = [
    {
      prop: 'pinasaFlag',
      label: t('pinasaFlag'),
    },
    {
      prop: 'bossThin',
      label: '上司薄い',
    },
    {
      prop: 'overtimeFlag',
      label: t('overtimeFlag'),
    },
    {
      prop: 'leaveOff',
      label: t('leaveOff'),
    },
    {
      prop: 'childcareMaternityLeave',
      label: t('childcareMaternityLeave'),
    },
    {
      prop: 'notInOperation',
      label: t('notInOperation'),
    },
  ];

  return (
    <Flex direction='column' gap={resOverview.gapLayout} mb={resOverview.mbLayout} position='relative'>
      <Box position='absolute' top='-5px' right='5px'>
        <DrawerContainer modeForm='overview' modePage='overview' originData={overviewInfo} />
      </Box>
      <Flex gap={3} alignItems='center' justify='flex-start'>
        <BoxValue
          height={resOverview.heightContent}
          fontSize={resOverview.fsLine}
          lineHeight={resOverview.lineHeightContent}
          width={resOverview.wBoxLine}
          py={1}
          boxSizing='content-box'
          isActive={overviewInfo.actionRequired === LEVEL_EMPLOYEE[1].value}
        >
          {t('actionRequired')}
        </BoxValue>
        <BoxText
          height={resOverview.heightContentDate}
          fontSize={resOverview.fsLine}
          width={resOverview.wBoxLine}
          textAlign='center'
          border={BORDERS.border_1(COLORS.black_primary)}
          color={COLORS.black_primary}
          bg={COLORS.white}
          label={overviewInfo.whatTodo}
          boxSizing='content-box'
          lineHeight={resOverview.lineHeightContentDate}
          noOfLines={1}
        >
          {formatDateJP(overviewInfo.whenEnd)}
        </BoxText>
        <BoxText
          height={resOverview.heightContentDate}
          lineHeight={resOverview.lineHeightContentBox}
          fontSize={resOverview.fsLine}
          width='40%'
          maxWidth='320px'
          textAlign='center'
          border={BORDERS.border_1(COLORS.black_primary)}
          color={COLORS.black_primary}
          bg={COLORS.white}
          label={overviewInfo.whatTodo}
          boxSizing='content-box'
          noOfLines={1}
        >
          {overviewInfo.whatTodo}
        </BoxText>
      </Flex>
      <Flex gap={3}>
        {boxValuesData.map((data, index) => (
          <BoxValue
            fontSize={resOverview.fsLine}
            height={resOverview.heightContent}
            lineHeight={resOverview.lineHeightContent}
            key={index}
            width={resOverview.wBoxLine}
            py={1}
            boxSizing='content-box'
            isActive={overviewInfo[data.prop] === LEVEL_EMPLOYEE[1].value}
          >
            {data.label}
          </BoxValue>
        ))}
      </Flex>
    </Flex>
  );
}
