import { Box, Flex } from '@chakra-ui/react';
import { BoxText, BoxTextFlex } from 'dhm/components/Box/BoxText';
import { BoxValue } from 'dhm/components/Box/BoxValue';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import { ResponsiveContext } from 'dhm/contexts/ResponsiveContext';
import LanguageContext, { currentLanguage } from 'dhm/contexts/TranslateContext';
import { useGetValueDropdown } from 'dhm/hooks/useGetValueDropdown';
import { ServicePolicyProgress } from 'dhm/store/policyProgress/services';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
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

export function PolicyProgress() {
  const { getValueDropdown } = useGetValueDropdown();

  const {
    resSummary: { policyProgress: resPolicyProgress },
  } = useContext(ResponsiveContext);
  const { ID_KEY, PermissionWrapper } = useContext(AbilityContext);
  const { policyProgress: data, optionsTRisk, OPTIONS_TOBEFY } = ServicePolicyProgress();
  const { tPolicyProgress } = useContext(LanguageContext);
  return (
    <WrapperCard
      title={tPolicyProgress('policyProgress')}
      height={resPolicyProgress.hLayout}
      typeHeader='gradient'
      typeEdit='policyProgress'
    >
      <Box>
        <BoxText
          fontSize={resPolicyProgress.fsContent}
          bg={COLORS.white}
          label={data.policyProgress}
          boxSizing='content-box'
          noOfLines={2}
        >
          {data.policyProgress || tPolicyProgress('noData')}
        </BoxText>
      </Box>
      <Flex gap='8px' fontSize={resPolicyProgress.fsBox}>
        <Box minWidth='164px' width='50%' height='260px'>
          <PermissionWrapper haveNoti={false} path={ID_KEY[28]}>
            <Box>
              ■ {tPolicyProgress('promotion')}
              <Box>
                - {tPolicyProgress('tobe')}
                <Box>
                  {data.fiscalYear
                    ? `・FY${data.fiscalYear?.toString()?.substring(2)}：`
                    : `・FY：${tPolicyProgress('noData')}`}
                  {OPTIONS_TOBEFY?.find((option) => option.value === data.tobeFyFiscal)?.label}
                </Box>
                <Box>
                  {data.fiscalYear
                    ? `・FY${(data.fiscalYear + 1)?.toString()?.substring(2)}：`
                    : `・FY：${tPolicyProgress('noData')}`}
                  {OPTIONS_TOBEFY?.find((option) => option.value === data.tobeFyFiscalPlus1)?.label}
                </Box>
              </Box>
              <Box>
                - {tPolicyProgress('asis')}
                <Box>
                  <BoxText
                    fontSize={resPolicyProgress.fsContent}
                    minHeight='15px'
                    bg={COLORS.white}
                    label={data.policyProgress}
                    boxSizing='content-box'
                    noOfLines={1}
                  >
                    {data.asis ? `・${data.asis}` : tPolicyProgress('noData')}
                  </BoxText>
                </Box>
              </Box>
            </Box>
          </PermissionWrapper>

          <Box mt='1.5px' width='100%'>
            {/* <PermissionWrapper haveNoti={false} path={ID_KEY[28]}> */}
            <Flex justify='space-between'>
              <Box> ■ {tPolicyProgress('tRisk')}</Box>
              <Flex gap='2px'>
                ■ 方針
                <BoxTextFlex
                  width='40px'
                  p='2px 3px'
                  fontSize='10px'
                  height='16px'
                  lineHeight='8px'
                  border={BORDERS.border_1(COLORS.black_primary)}
                >
                  {getValueDropdown('POLICY', data?.policy)}
                </BoxTextFlex>
              </Flex>
            </Flex>
            {/* </PermissionWrapper> */}

            <Box>{tPolicyProgress('status')}</Box>
            <Flex gap={resPolicyProgress.gapBox} flexWrap='wrap' mt='5px' width='180px' height='55px' overflow='auto'>
              {optionsTRisk.map((option) => (
                <BoxValue
                  key={option.codeValue}
                  width='75px'
                  boxSizing='content-box'
                  isActive={data.riskSelection === option.codeValue}
                  typeBox={data.riskSelection === '03' || data.riskSelection === '04' ? 'risk' : 'normal'}
                  height='20px'
                  fontSize={resPolicyProgress.fsContent}
                  lineHeight='18px'
                >
                  {currentLanguage('jp') ? option.codeName : option.codeNameEn}
                </BoxValue>
              ))}
            </Flex>
            <WrapperBox
              mt='6px'
              width='100%'
              maxWidth='250px'
              padding='6px 8px'
              height={resPolicyProgress.hDes1}
              overflow='auto'
              border={BORDERS.border_1(COLORS.black_primary)}
            >
              {data.riskDescription}
            </WrapperBox>
          </Box>
        </Box>
        <WrapperBox minWidth='115px' width='50%' height='260px'>
          <BoxText
            fontSize={resPolicyProgress.fsContent}
            bg={COLORS.white}
            label={data.policyProgress}
            boxSizing='content-box'
            noOfLines={1}
          >
            ■ {tPolicyProgress('whatTodoAssign')}
          </BoxText>
          <WrapperBox
            mt='8px'
            width='100%'
            maxWidth='240px'
            padding='6px 8px'
            height={resPolicyProgress.hDes2}
            overflow='auto'
            border={BORDERS.border_1(COLORS.black_primary)}
          >
            {data.assignDescription}
          </WrapperBox>
        </WrapperBox>
      </Flex>
    </WrapperCard>
  );
}
