/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { Box, Flex, Grid, Heading } from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button';
import { SummaryContainer } from 'dhm/containers/summary';
import { Overtime } from 'dhm/containers/summary/Overtime';
import { ResponsiveContext } from 'dhm/contexts/ResponsiveContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ROUTES } from 'dhm/utils/constants/routes';
import { COLORS } from 'dhm/utils/constants/style';
import { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

export const ContextSummary = createContext();
const BoxHover = styled(Box)`
  position: relative;
  ${({ isactive = false }) =>
    isactive &&
    `
    &::before {
      content: '';
      position: absolute;
      top: -6px;
      left: -6px;
      width: calc(100% + 12px);
      height: calc(100% + 12px);
      border: 2px solid ${COLORS.danger_300};
      border-style: dashed;
      z-index: 0;
    }
  `}
`;
const {
  AvatarSummary,
  CardInfo,
  ProjectInfo,
  Middleware,
  OverviewTag,
  InterviewLog,
  PolicyProgress,
  EmployeeSuccessAxis,
} = SummaryContainer;

function TemplateGrid({ children, type = 1 }) {
  const { resSummary } = useContext(ResponsiveContext);
  const setType = {
    1: {
      base: 'repeat(1, 1fr)',
      md: resSummary.layout_top,
    },
    2: {
      base: 'repeat(2, 1fr)',
      md: resSummary.layout_bot,
    },
  };
  return (
    <Grid templateColumns={setType[type]} gap={6}>
      {children}
    </Grid>
  );
}

function WrapperHoverFocus({ children, type, setIsHoverFocus, isHover }) {
  const handleAllFalse = () => {
    // only [type] is true
    setIsHoverFocus((prev) => {
      const newPrev = {};
      for (const key in prev) {
        newPrev[key] = false;
      }
      return { ...newPrev, [type]: true };
    });
  };
  return (
    <BoxHover
      onMouseEnter={handleAllFalse}
      onMouseLeave={() => setIsHoverFocus((prev) => ({ ...prev, [type]: false }))}
      isactive={isHover ? 1 : 0}
    >
      <Box position='relative'>{children}</Box>
    </BoxHover>
  );
}

export default function SummaryPage() {
  const { tFileUpload } = useContext(LanguageContext);
  const navigate = useNavigate();
  const { resSummary } = useContext(ResponsiveContext);
  const { employeeId } = useParams();
  const { isValidUser, loadingValidUser } = useSelector((state) => state.summary);
  const [isHoverFocus, setIsHoverFocus] = useState({
    overviewTag: false,
    cardInfo: false,
    projectInfo: false,
    policyProgress: false,
    employeeSuccessAxis: false,
    interviewLog: false,
  });

  if (employeeId?.includes('coming-soon')) return <>Coming soon...</>;
  const ViewSummary = (
    <>
      {isValidUser ? (
        <Flex flexDirection='column' gap={resSummary.gapLayout} paddingBottom='24px'>
          <TemplateGrid>
            <WrapperHoverFocus type='overviewTag' setIsHoverFocus={setIsHoverFocus} isHover={isHoverFocus.overviewTag}>
              <AvatarSummary />
            </WrapperHoverFocus>
            <Flex direction='column' gap={resSummary.gapOverviewBasic} justify={resSummary.jusOverviewBasic}>
              <WrapperHoverFocus
                type='overviewTag'
                setIsHoverFocus={setIsHoverFocus}
                isHover={isHoverFocus.overviewTag}
              >
                <OverviewTag />
              </WrapperHoverFocus>
              <WrapperHoverFocus type='cardInfo' setIsHoverFocus={setIsHoverFocus} isHover={isHoverFocus.cardInfo}>
                <CardInfo />
              </WrapperHoverFocus>
            </Flex>
            <Flex direction='column' gap={2} justify='space-between'>
              <Box textAlign='end'>
                <Heading fontSize='24px' fontWeight='700' color={COLORS.black_primary} mb='3px'>
                  社員明細情報
                </Heading>
              </Box>
              <Box>
                <WrapperHoverFocus
                  type='projectInfo'
                  setIsHoverFocus={setIsHoverFocus}
                  isHover={isHoverFocus.projectInfo}
                >
                  <ProjectInfo />
                </WrapperHoverFocus>
              </Box>
            </Flex>
          </TemplateGrid>
          <TemplateGrid type={2}>
            <WrapperHoverFocus
              type='policyProgress'
              setIsHoverFocus={setIsHoverFocus}
              isHover={isHoverFocus.policyProgress}
            >
              <PolicyProgress />
            </WrapperHoverFocus>
            <WrapperHoverFocus
              type='employeeSuccessAxis'
              setIsHoverFocus={setIsHoverFocus}
              isHover={isHoverFocus.employeeSuccessAxis}
            >
              <EmployeeSuccessAxis />
            </WrapperHoverFocus>
            <WrapperHoverFocus
              type='interviewLog'
              setIsHoverFocus={setIsHoverFocus}
              isHover={isHoverFocus.interviewLog}
            >
              <InterviewLog />
            </WrapperHoverFocus>
          </TemplateGrid>
          <Flex gap='35px' width='70%'>
            <Flex gap={resSummary.gapLayout} width='50%'>
              <Box width='71px' color={COLORS.blue_primary} lineHeight='18px' fontSize={resSummary.fs_title}>
                More info click right
              </Box>
              <DHMButton
                text={tFileUpload('resume')}
                buttonType='cancel'
                bg={COLORS.gray_500}
                fontSize={resSummary.fs_title}
                onClick={() => navigate(`${ROUTES.viewPDF}/${employeeId}/resume`)}
              />
              <DHMButton
                text={tFileUpload('workHistory')}
                buttonType='cancel'
                bg={COLORS.gray_500}
                fontSize={resSummary.fs_title}
                onClick={() => navigate(`${ROUTES.viewPDF}/${employeeId}/workHistory`)}
              />
              <DHMButton
                text='面接時ログ詳細'
                buttonType='cancel'
                isDisabled
                bg={COLORS.neutral_700}
                fontSize={resSummary.fs_title}
              />
            </Flex>
            <Box minWidth='550px'>
              <Overtime />
            </Box>
          </Flex>
        </Flex>
      ) : (
        <Box>No data</Box>
      )}
    </>
  );
  return (
    <ContextSummary.Provider value={{}}>
      <Middleware />
      {loadingValidUser ? '...' : ViewSummary}
    </ContextSummary.Provider>
  );
}
