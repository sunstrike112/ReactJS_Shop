import { Box, Flex, Text } from '@chakra-ui/react';
import { DHMBox } from 'dhm/components/Box';
import { BoxValue } from 'dhm/components/Box/BoxValue';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import { ResponsiveContext } from 'dhm/contexts/ResponsiveContext';
import LanguageContext, { currentLanguage } from 'dhm/contexts/TranslateContext';
import { useGetValueDropdown } from 'dhm/hooks/useGetValueDropdown';
import { ServiceProjectInfo } from 'dhm/store/projectInfo/services';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { addCommasCurrency } from 'dhm/utils/helpers/method';
import { useContext, useMemo } from 'react';
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

const CustomBox = styled(Flex)`
  // Scroll vertical style
  ::-webkit-scrollbar {
    height: 3px;
  }
`;

const X_LIMIT = 4;

export function ProjectInfo() {
  const { projectInfo, OPTIONS_BUSINESS_CATEGORY, OPTIONS_RECOGNIZE_PERSON } = ServiceProjectInfo();
  const { ID_KEY, PermissionWrapper } = useContext(AbilityContext);
  const { getValueDropdown } = useGetValueDropdown();
  const ARRAY_ACTIVE = useMemo(
    () => ({
      BUSINESS_CATEGORY: projectInfo.data[0]?.businessCategory?.slice(1, -1).split(','),
    }),
    [projectInfo],
  );
  const {
    resSummary: { projectInfo: resProjectInfo },
  } = useContext(ResponsiveContext);
  const { BoxTextFlex } = DHMBox;
  const { tProjectInfo } = useContext(LanguageContext);
  return (
    <WrapperCard
      title={tProjectInfo('projectInfo')}
      height={resProjectInfo.heightLayout}
      typeHeader='gradient'
      typeEdit='projectInfo'
    >
      <Flex flexDirection='column' gap={resProjectInfo.gapLayout}>
        <BoxTextFlex
          fontSize={resProjectInfo.fsContent}
          maxWidth='640px'
          contentTooltip={projectInfo.data[0]?.projectName}
        >
          ● {tProjectInfo('projectName')}：{projectInfo.data[0]?.projectName}
        </BoxTextFlex>
        <Flex justify='space-between'>
          <Flex gap={resProjectInfo.gapLayout} flexDirection='column'>
            <BoxTextFlex
              fontSize={resProjectInfo.fsContent}
              maxWidth='180px'
              contentTooltip={projectInfo.data[0]?.client}
            >
              ● {tProjectInfo('client')}：{projectInfo.data[0]?.client}
            </BoxTextFlex>
            <BoxTextFlex
              fontSize={resProjectInfo.fsContent}
              contentTooltip={
                projectInfo.data[0]?.unitPrice &&
                `${addCommasCurrency(projectInfo.data[0]?.unitPrice?.toString().replace(/,/g, ''))} 万円`
              }
            >
              ● {tProjectInfo('unitPrice')}：
              {projectInfo.data[0]?.unitPrice &&
                addCommasCurrency(projectInfo.data[0]?.unitPrice?.toString().replace(/,/g, ''))}{' '}
              万円
            </BoxTextFlex>
          </Flex>
          <Flex gap={resProjectInfo.gapLayout} flexDirection='column' justify='flex-end'>
            <BoxTextFlex
              fontSize={resProjectInfo.fsContent}
              maxWidth='160px'
              contentTooltip={projectInfo.data[0]?.counter}
            >
              ● {tProjectInfo('counter')}：{projectInfo.data[0]?.counter}
            </BoxTextFlex>
            <BoxTextFlex
              fontSize={resProjectInfo.fsContent}
              maxWidth='160px'
              contentTooltip={
                projectInfo.data[0]?.sellTeam &&
                `${addCommasCurrency(projectInfo.data[0]?.sellTeam?.toString().replace(/,/g, ''))} 万円`
              }
            >
              ● {tProjectInfo('teamSale')}：
              {projectInfo.data[0]?.sellTeam &&
                addCommasCurrency(projectInfo.data[0]?.sellTeam?.toString().replace(/,/g, ''))}{' '}
              万円
            </BoxTextFlex>
          </Flex>
          <Flex gap={resProjectInfo.gapLayout} flexDirection='column' justify='flex-end'>
            <BoxTextFlex
              fontSize={resProjectInfo.fsContent}
              maxWidth='160px'
              contentTooltip={projectInfo.data[0]?.salesInCharge}
            >
              ● {tProjectInfo('saleInCharge')}：{projectInfo.data[0]?.salesInCharge}
            </BoxTextFlex>
            <BoxTextFlex
              fontSize={resProjectInfo.fsContent}
              contentTooltip={projectInfo.data[0]?.evaluation.toFixed(1)}
            >
              ● {tProjectInfo('evaluation')}：{projectInfo.data[0]?.evaluation.toFixed(1)}
            </BoxTextFlex>
          </Flex>
          <Flex gap={resProjectInfo.gapLayout} flexDirection='column' justify='flex-end'>
            <BoxTextFlex
              fontSize={resProjectInfo.fsContent}
              contentTooltip={formatDateJP(projectInfo.data[0]?.start, 'month')}
            >
              ● {tProjectInfo('start')}：{formatDateJP(projectInfo.data[0]?.start, 'month')}
            </BoxTextFlex>
            <BoxTextFlex
              fontSize={resProjectInfo.fsContent}
              maxWidth='160px'
              contentTooltip={projectInfo.data[0]?.rater}
            >
              ● {tProjectInfo('assessor')}：{projectInfo.data[0]?.rater}
            </BoxTextFlex>
          </Flex>
        </Flex>
        <Flex justify='start' pl='30px' gap='32px'>
          <PermissionWrapper haveNoti={false} path={ID_KEY[26]}>
            <Flex flexDirection='column' gap={resProjectInfo.gapLayout}>
              <Text fontSize={resProjectInfo.fsContent}>● 営業評価</Text>
              <BoxTextFlex
                width='77px'
                p='2px 10px'
                fontSize='10px'
                height='32px'
                border={BORDERS.border_1(COLORS.black_primary)}
                lineHeight='24px'
              >
                {getValueDropdown('SALE_EVALUATION', projectInfo.data[0]?.salesEvaluation)}
              </BoxTextFlex>
            </Flex>
          </PermissionWrapper>
          <PermissionWrapper haveNoti={false} path={ID_KEY[27]}>
            <Flex flexDirection='column' gap={resProjectInfo.gapLayout} width='100%'>
              <Text fontSize={resProjectInfo.fsContent}>● 営業コメント</Text>
              <WrapperBox
                mt='0px'
                width='calc(100% - 25px)'
                height='32px'
                padding='0px 8px'
                fontSize={resProjectInfo.fsContent}
                overflow='auto'
                border={BORDERS.border_1(COLORS.black_primary)}
              >
                {projectInfo.data[0]?.salesComment}
              </WrapperBox>
            </Flex>
          </PermissionWrapper>
        </Flex>
        <Flex justify='space-evenly' pl='30px'>
          <Flex flexDirection='column' gap={resProjectInfo.gapLayout} width='50%' wordBreak='break-word'>
            <Text fontSize={resProjectInfo.fsContent} width={currentLanguage('jp') ? ' 130px' : '200px'}>
              ● {tProjectInfo('qualitativeEvaluation')}
            </Text>
            <WrapperBox
              mt='0px'
              width='90%'
              padding='0px 8px'
              height={resProjectInfo.heightDes}
              fontSize={resProjectInfo.fsContent}
              overflow='auto'
              border={BORDERS.border_1(COLORS.black_primary)}
            >
              {projectInfo.data[0]?.qualitativeEvaluationHrBrain}
            </WrapperBox>
          </Flex>
          <Flex flexDirection='column' gap={resProjectInfo.gapLayout} width='50%' wordBreak='break-word'>
            <Text fontSize={resProjectInfo.fsContent} width={currentLanguage('jp') ? ' 130px' : '200px'}>
              ● {tProjectInfo('qualitativeEvaluatioOther')}
            </Text>
            <WrapperBox
              mt='0px'
              width='90%'
              padding='0px 8px'
              fontSize={resProjectInfo.fsContent}
              height={resProjectInfo.heightDes}
              overflow='auto'
              border={BORDERS.border_1(COLORS.black_primary)}
            >
              {projectInfo.data[0]?.qualitativeEvaluationOthers}
            </WrapperBox>
          </Flex>
        </Flex>
        <Flex>
          <BoxTextFlex
            fontSize={resProjectInfo.fsContent}
            maxWidth='640px'
            contentTooltip={projectInfo.data[0]?.businessContent}
          >
            ● {tProjectInfo('businessContent')}：{projectInfo.data[0]?.businessContent}
          </BoxTextFlex>
        </Flex>
        <Flex>
          <Box fontSize={resProjectInfo.fsContent} minWidth={currentLanguage('jp') ? ' 80px' : '100px'}>
            ● {tProjectInfo('businessCategory')}
          </Box>
          <CustomBox overflowX='auto' paddingBottom='2px'>
            <CustomBox alignItems='center' gap={resProjectInfo.gapLayout}>
              {[...OPTIONS_BUSINESS_CATEGORY]
                .filter((option) => option.value <= X_LIMIT)
                .map((option) => (
                  <BoxValue
                    key={option.value}
                    width='max-content'
                    height={resProjectInfo.heightBox}
                    p='2px 10px'
                    fontSize={resProjectInfo.fsBox}
                    lineHeight={resProjectInfo.lineHeightBox}
                    isActive={ARRAY_ACTIVE.BUSINESS_CATEGORY?.includes(option.value)}
                  >
                    {option.label}
                  </BoxValue>
                ))}
              <Box>X</Box>
              {[...OPTIONS_BUSINESS_CATEGORY]
                .filter((option) => option.value > X_LIMIT)
                .map((option) => (
                  <BoxValue
                    key={option.value}
                    width='max-content'
                    height={resProjectInfo.heightBox}
                    p='2px 10px'
                    fontSize={resProjectInfo.fsBox}
                    lineHeight={resProjectInfo.lineHeightBox}
                    isActive={ARRAY_ACTIVE.BUSINESS_CATEGORY?.includes(option.value)}
                  >
                    {option.label}
                  </BoxValue>
                ))}
            </CustomBox>
          </CustomBox>
        </Flex>
        <Flex>
          <Box fontSize={resProjectInfo.fsContent} minWidth={currentLanguage('jp') ? ' 80px' : '100px'}>
            ● {tProjectInfo('recognitionOfPerson')}
          </Box>
          <Flex gap={resProjectInfo.gapLayout}>
            {OPTIONS_RECOGNIZE_PERSON.map((option) => (
              <BoxValue
                key={option.value}
                width='max-content'
                p='2px 10px'
                fontSize='10px'
                isActive={projectInfo.data[0]?.recognitionOfPerson === option.value}
                height={resProjectInfo.heightBox}
                lineHeight={resProjectInfo.lineHeightBox}
              >
                {option.label}
              </BoxValue>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </WrapperCard>
  );
}
