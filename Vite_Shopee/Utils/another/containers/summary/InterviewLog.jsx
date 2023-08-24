import { Box, Flex } from '@chakra-ui/react';
import { DHMBox } from 'dhm/components/Box';
import { ResponsiveContext } from 'dhm/contexts/ResponsiveContext';
import LanguageContext, { currentLanguage } from 'dhm/contexts/TranslateContext';
import { ServicesInterviewLog } from 'dhm/store/interviewLog/services';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { useContext } from 'react';
import styled from 'styled-components';
import { WrapperCard } from './CardWrapper';

const WrapperBox = styled(Box)`
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #505050;
  }
`;

export function InterviewLog() {
  const {
    resSummary: { interviewLog: resInterviewLog },
  } = useContext(ResponsiveContext);
  const { interviewLog } = ServicesInterviewLog();
  const { BoxTextFlex } = DHMBox;
  const { tInterviewLog } = useContext(LanguageContext);
  return (
    <WrapperCard
      title={tInterviewLog('interviewLog')}
      height={resInterviewLog.hLayout}
      typeHeader='gradient'
      typeEdit='interviewLog'
    >
      <Flex gap={2} flexDirection='column'>
        <Flex justify='space-between'>
          <BoxTextFlex fontSize={resInterviewLog.fsContent} contentTooltip={formatDateJP(interviewLog.data[0]?.date)}>
            ■ {tInterviewLog('date')}：{formatDateJP(interviewLog.data[0]?.date)}{' '}
          </BoxTextFlex>
          <BoxTextFlex
            fontSize={resInterviewLog.fsContent}
            maxWidth='120px'
            contentTooltip={interviewLog.data[0]?.esManager}
          >
            ■ {tInterviewLog('esStaff')}：{interviewLog.data[0]?.esManager}{' '}
          </BoxTextFlex>
          <BoxTextFlex
            fontSize={resInterviewLog.fsContent}
            maxWidth='200px'
            contentTooltip={
              currentLanguage('jp') ? interviewLog.data[0]?.categoryName : interviewLog.data[0]?.categoryNameEn
            }
          >
            ■ {tInterviewLog('inteviewCategory')}：
            {currentLanguage('jp') ? interviewLog.data[0]?.categoryName : interviewLog.data[0]?.categoryNameEn}
          </BoxTextFlex>
        </Flex>
        <Flex flexDirection='column'>
          <Box fontSize={resInterviewLog.fsContent}>■ {tInterviewLog('content')}：</Box>
          <WrapperBox
            mt='6px'
            width='100%'
            padding='6px 8px'
            height={resInterviewLog.hDes}
            overflow='auto'
            wordBreak='break-word'
            border={BORDERS.border_1(COLORS.black_primary)}
          >
            {interviewLog.data[0]?.content}
          </WrapperBox>
        </Flex>
        <BoxTextFlex
          fontSize={resInterviewLog.fsContent}
          width='fit-content'
          contentTooltip={formatDateJP(interviewLog.data[0]?.nextDate)}
        >
          ■ {tInterviewLog('dateOfNextInterview')}：{formatDateJP(interviewLog.data[0]?.nextDate)}
        </BoxTextFlex>
      </Flex>
    </WrapperCard>
  );
}
