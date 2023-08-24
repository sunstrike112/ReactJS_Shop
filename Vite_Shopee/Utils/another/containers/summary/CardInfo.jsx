import { Box, Flex, Grid } from '@chakra-ui/react';
import { DHMBox } from 'dhm/components/Box';
import { ResponsiveContext } from 'dhm/contexts/ResponsiveContext';
import { useGetValueDropdown } from 'dhm/hooks/useGetValueDropdown';
import { ROYALTIES_OPTIONAL } from 'dhm/utils/constants/select';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { WrapperCard } from './CardWrapper';

const templateColumns = {
  base: '2fr 2fr 1fr',
  md: '1fr 1fr 1fr 1fr',
};
function TemplateGrid({ children, ...rest }) {
  return (
    <Grid templateColumns={templateColumns} gap={6} {...rest}>
      {children}
    </Grid>
  );
}

const { BoxValue, BoxTextFlex } = DHMBox;

const CustomBox = styled(Box)`
  padding-bottom: 5px;
  // Scroll vertical style
  ::-webkit-scrollbar {
    height: 3px;
  }
`;
export function CardInfo() {
  const {
    resSummary: { basicInfo: resBasicInfo },
  } = useContext(ResponsiveContext);
  const { staffSummary } = useSelector((state) => state.summary);
  const { getValueDropdown } = useGetValueDropdown();
  const {
    employeeId,
    employeeName,
    position,
    midCareerNewGraduate,
    sex,
    employeeNameKana,
    joiningCompany,
    formerJob,
    eduBackground,
    age,
    joiningCompanyReason,
    joiningPathOptional,
    coachMentor,
    hobby,
    retirement,
    retirementDate,
    esResponsibility,
    goodFriends,
    joiningPathDescription,
  } = staffSummary.data;

  const {
    can,
    royaltiesDescription,
    will,
    royaltiesOptional,
    canSelCatUpStream,
    canSelCatPmoCus,
    canSelCatPmoSi,
    canSelCatSi,
    canSelTerriroryApp,
    canSelTerriroryInfra,
    canSelEnglishReadAndWrite,
    canSelEnglishListenToSpeak,
  } = staffSummary.dataSub;
  const listCan = can?.split('|') || [];
  const listWill = will?.split('|') || [];
  const listJoiningCompanyReason = joiningCompanyReason?.split('|') || [];

  return (
    <WrapperCard title='基本Info' height={resBasicInfo.heightLayout} typeHeader='gradient' typeEdit='basicInfo'>
      <Flex flexDirection='column' gap='1px' fontSize={resBasicInfo.fsContent}>
        <TemplateGrid>
          <BoxTextFlex fontSize={resBasicInfo.fsContent} contentTooltip={employeeId}>
            ● 社員ID：{employeeId}
          </BoxTextFlex>
        </TemplateGrid>
        <TemplateGrid>
          <BoxTextFlex fontSize={resBasicInfo.fsContent} contentTooltip={employeeName}>
            ● 氏名：{employeeName}
          </BoxTextFlex>
          <BoxTextFlex fontSize={resBasicInfo.fsContent} contentTooltip={employeeNameKana}>
            ● カナ：{employeeNameKana}
          </BoxTextFlex>
          <BoxTextFlex fontSize={resBasicInfo.fsContent} contentTooltip={getValueDropdown('POSITION', position)}>
            ● 職位：{getValueDropdown('POSITION', position)}
          </BoxTextFlex>
          <BoxTextFlex fontSize={resBasicInfo.fsContent} contentTooltip={formatDateJP(joiningCompany, 'month') || ''}>
            ● 入社：{formatDateJP(joiningCompany, 'month')}
          </BoxTextFlex>
        </TemplateGrid>
        <TemplateGrid>
          <BoxTextFlex fontSize={resBasicInfo.fsContent} contentTooltip={getValueDropdown('GENDER', sex)}>
            ● 性別：{getValueDropdown('GENDER', sex)}
          </BoxTextFlex>
          <BoxTextFlex fontSize={resBasicInfo.fsContent} contentTooltip={age}>
            ● 年齢：{age}才
          </BoxTextFlex>
          <BoxTextFlex fontSize={resBasicInfo.fsContent} contentTooltip={formerJob}>
            ● 前職：{formerJob}
          </BoxTextFlex>
          <BoxTextFlex fontSize={resBasicInfo.fsContent} contentTooltip={eduBackground}>
            ● 学歴：{eduBackground}
          </BoxTextFlex>
        </TemplateGrid>
        <TemplateGrid marginBottom={resBasicInfo.mgContent}>
          <BoxTextFlex
            fontSize={resBasicInfo.fsContent}
            contentTooltip={getValueDropdown('MID_CAREER_NEW_GRADUATE', midCareerNewGraduate)}
          >
            ● 中途/新卒：{getValueDropdown('MID_CAREER_NEW_GRADUATE', midCareerNewGraduate)}
          </BoxTextFlex>
          <BoxTextFlex fontSize={resBasicInfo.fsContent} contentTooltip={coachMentor}>
            ● コーチ/メンター：{coachMentor}
          </BoxTextFlex>
          <BoxTextFlex fontSize={resBasicInfo.fsContent} contentTooltip={goodFriends}>
            ● 仲がいい人：{goodFriends}
          </BoxTextFlex>
          <BoxTextFlex fontSize={resBasicInfo.fsContent} contentTooltip={hobby}>
            ● 趣味：{hobby}
          </BoxTextFlex>
        </TemplateGrid>
        <Flex>
          <Box minWidth='max-content'>● 入社経路：{getValueDropdown('COMP_JOINED_ROUTE', joiningPathOptional)}</Box>
          {joiningPathDescription && (
            <BoxTextFlex fontSize={resBasicInfo.fsContent} contentTooltip={joiningPathDescription}>
              （{joiningPathDescription}）
            </BoxTextFlex>
          )}
        </Flex>
        <Flex>
          ● 入社理由：
          <Grid templateColumns='repeat(4, 1fr)' gap='10px' width='calc(100% - 65px)'>
            {listJoiningCompanyReason.map((item, index) => (
              <BoxTextFlex
                fontSize={resBasicInfo.fsContent}
                border={`1px dashed ${COLORS.business}70`}
                padding='0 5px'
                key={index}
              >
                {item}
              </BoxTextFlex>
            ))}
          </Grid>
        </Flex>
        <Flex>
          <Box width='70px' minWidth='70px'>
            ● Can（選択）
          </Box>
          <Box width='calc(100% - 70px)'>
            <Flex gap='5px'>
              <CustomBox maxWidth='calc(100% - 175px)' overflow='auto'>
                <Box position='sticky' left='0'>
                  ■カテゴリ
                </Box>
                <Flex gap='5px'>
                  <Flex gap='5px' minWidth='fit-content' align='center'>
                    上流
                    <BoxTextFlex
                      border={BORDERS.border_1(COLORS.black_primary)}
                      width='fit-content'
                      fs='10px'
                      p='2px 4px'
                      height='20px'
                    >
                      {getValueDropdown('CATEGORY_AREA', canSelCatUpStream)}
                    </BoxTextFlex>
                  </Flex>
                  <Flex gap='5px' minWidth='fit-content' align='center'>
                    PMO,顧客
                    <BoxTextFlex
                      border={BORDERS.border_1(COLORS.black_primary)}
                      width='fit-content'
                      fs='10px'
                      p='2px 4px'
                      height='20px'
                    >
                      {getValueDropdown('CATEGORY_AREA', canSelCatPmoCus)}
                    </BoxTextFlex>
                  </Flex>
                  <Flex gap='5px' minWidth='fit-content' align='center'>
                    PMO,SI
                    <BoxTextFlex
                      border={BORDERS.border_1(COLORS.black_primary)}
                      width='fit-content'
                      fs='10px'
                      p='2px 4px'
                      height='20px'
                    >
                      {getValueDropdown('CATEGORY_AREA', canSelCatPmoSi)}
                    </BoxTextFlex>
                  </Flex>
                  <Flex gap='5px' minWidth='fit-content' align='center'>
                    SI
                    <BoxTextFlex
                      border={BORDERS.border_1(COLORS.black_primary)}
                      width='fit-content'
                      fs='10px'
                      p='2px 4px'
                      height='20px'
                    >
                      {getValueDropdown('CATEGORY_AREA', canSelCatSi)}
                    </BoxTextFlex>
                  </Flex>
                </Flex>
              </CustomBox>
              <CustomBox>
                <Box position='sticky' left='0'>
                  ■カテゴリ
                </Box>
                <Flex gap='5px'>
                  <Flex gap='5px' minWidth='fit-content' align='center'>
                    アプリ
                    <BoxTextFlex
                      border={BORDERS.border_1(COLORS.black_primary)}
                      width='fit-content'
                      fs='10px'
                      p='2px 4px'
                      height='20px'
                    >
                      {getValueDropdown('CATEGORY_AREA', canSelTerriroryApp)}
                    </BoxTextFlex>
                  </Flex>
                  <Flex gap='5px' minWidth='fit-content' align='center'>
                    インフラ
                    <BoxTextFlex
                      border={BORDERS.border_1(COLORS.black_primary)}
                      width='fit-content'
                      fs='10px'
                      p='2px 4px'
                      height='20px'
                    >
                      {getValueDropdown('CATEGORY_AREA', canSelTerriroryInfra)}
                    </BoxTextFlex>
                  </Flex>
                </Flex>
              </CustomBox>
            </Flex>
            <Box>
              ■英語
              <Flex gap='10px'>
                <Flex gap='5px' minWidth='fit-content' align='center'>
                  読み書き
                  <BoxTextFlex
                    border={BORDERS.border_1(COLORS.black_primary)}
                    width='fit-content'
                    fs='10px'
                    p='2px 4px'
                    height='20px'
                  >
                    {getValueDropdown('ENGLISH_LEVEL', canSelEnglishReadAndWrite)}
                  </BoxTextFlex>
                </Flex>
                <Flex gap='5px' minWidth='fit-content' align='center'>
                  話す聞く
                  <BoxTextFlex
                    border={BORDERS.border_1(COLORS.black_primary)}
                    width='fit-content'
                    fs='10px'
                    p='2px 4px'
                    height='20px'
                  >
                    {getValueDropdown('ENGLISH_LEVEL', canSelEnglishListenToSpeak)}
                  </BoxTextFlex>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Flex>

        <Flex>
          ● Can：
          <Grid templateColumns='repeat(2, 1fr)' gap='10px' width='calc(100% - 65px)'>
            {listCan.slice(0, 2).map((item, index) => (
              <BoxTextFlex
                fontSize={resBasicInfo.fsContent}
                border={`1px dashed ${COLORS.business}70`}
                padding='0 5px'
                key={index}
              >
                {item}
              </BoxTextFlex>
            ))}
          </Grid>
        </Flex>
        <Flex marginBottom={resBasicInfo.mgContent}>
          ● Will：
          <Grid templateColumns='repeat(2, 1fr)' gap='10px' width='calc(100% - 65px)'>
            {listWill.slice(0, 2).map((item, index) => (
              <BoxTextFlex
                fontSize={resBasicInfo.fsContent}
                border={`1px dashed ${COLORS.business}70`}
                padding='0 5px'
                key={index}
              >
                {item}
              </BoxTextFlex>
            ))}
          </Grid>
        </Flex>
        <Flex justify='start' gap='10px'>
          <Box>
            <Flex align='center'>
              <Box width='80px'>● ロイヤリティ：</Box>
              <Flex gap='6px' paddingLeft='10px'>
                {ROYALTIES_OPTIONAL.map((number) => (
                  <BoxValue
                    key={number.value}
                    width={resBasicInfo.widthBox}
                    height={resBasicInfo.heightBox}
                    lineHeight={resBasicInfo.lineHeightBox}
                    isActive={+royaltiesOptional === number.value}
                    fontSize={resBasicInfo.fsBox}
                  >
                    {number.value}
                  </BoxValue>
                ))}
              </Flex>
            </Flex>
            <Flex mt={resBasicInfo.mgContent} gap='10px' align='center'>
              <BoxTextFlex
                fontSize={resBasicInfo.fsContent}
                contentTooltip={getValueDropdown('RETIREMENT', retirement)}
              >
                ● 退職：{getValueDropdown('RETIREMENT', retirement)}
              </BoxTextFlex>
              <BoxTextFlex
                fontSize={resBasicInfo.fsContent}
                contentTooltip={formatDateJP(retirementDate, 'month') || ''}
              >
                ● 退職年月：{formatDateJP(retirementDate, 'month')}
              </BoxTextFlex>
              <BoxValue
                width={resBasicInfo.widthEs}
                height={resBasicInfo.heightEs}
                lineHeight={resBasicInfo.lineHeightEs}
                fontSize='10px'
                isActive={esResponsibility}
              >
                ES責
              </BoxValue>
            </Flex>
          </Box>

          <Box
            width='100%'
            padding='6px 8px'
            height={resBasicInfo.heightDes}
            overflow='auto'
            border={BORDERS.border_1(COLORS.black_primary)}
          >
            {royaltiesDescription}
          </Box>
        </Flex>
      </Flex>
    </WrapperCard>
  );
}
