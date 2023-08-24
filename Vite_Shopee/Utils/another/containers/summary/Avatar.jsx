import { Box, Flex, Image, Img } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { DHMBox } from 'dhm/components/Box';
import { ResponsiveContext } from 'dhm/contexts/ResponsiveContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServicesOverviewInfo } from 'dhm/store/overviewInfo/services';
import { LEVEL_EMPLOYEE } from 'dhm/utils/constants/select';
import { BORDERS, BOX_SHADOW, COLORS } from 'dhm/utils/constants/style';
import { STATUS } from 'dhm/utils/constants/type';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { useContext } from 'react';

const avatarData = [
  {
    status: STATUS.NO_CONCERN,
    bg: COLORS.noConcern,
    src: DHMAssets.NO_CONCERN,
  },
  {
    status: STATUS.LOW_URGENT,
    bg: COLORS.lowUrgent,
    src: DHMAssets.LOW_URGENT,
  },
  {
    status: STATUS.HIGH_URGENT,
    bg: COLORS.highUrgent,
    src: DHMAssets.HIGH_URGENT,
  },
];

export function AvatarSummary() {
  const {
    resSummary: { avatar: resAvatar },
  } = useContext(ResponsiveContext);
  const { tOverviewInfo: t } = useContext(LanguageContext);
  const { BoxValue, BoxText } = DHMBox;
  const { overviewInfo } = ServicesOverviewInfo();

  const STATUS_STYLES = {
    width: resAvatar.whStatus,
    height: resAvatar.whStatus,
    borderRadius: '50%',
    p: '7px',
    borderBottom: BORDERS.border_3(COLORS.black_primary),
    borderRight: BORDERS.border_3(COLORS.black_primary),
    borderTop: BORDERS.border_1(COLORS.black_primary),
    borderLeft: BORDERS.border_1(COLORS.black_primary),
  };

  return (
    <Box>
      <Image
        width={resAvatar.whAvatar}
        height={resAvatar.whAvatar}
        rounded='50%'
        margin='0 auto'
        border={BORDERS.border_1(COLORS.primary_400)}
        src={overviewInfo.picPerson || DHMAssets.DEFAULT_USER}
        alt={overviewInfo.employeeId}
      />
      <Flex paddingTop={resAvatar.ptStatus} gap={resAvatar.gapStatus}>
        {avatarData.map((avatar, index) => (
          <Img
            key={index}
            {...STATUS_STYLES}
            bg={avatar.bg}
            opacity={avatar.status !== overviewInfo.status && COLORS.disable}
            boxShadow={avatar.status === overviewInfo.status && BOX_SHADOW.active_status}
            src={avatar.src}
          />
        ))}
      </Flex>
      <Flex fontSize={resAvatar.fsContent} direction='column' justify='space-around' mt={5} gap={resAvatar.gapContent}>
        <BoxText>
          <span>{t('esManager')}：</span>
          <span>{overviewInfo.esManagerName}</span>
        </BoxText>
        <BoxText>
          <span className='fs_text-avatar'>担当開始日：</span>
          {/* <span>{overviewInfo.esStartDate}</span> */}
          <span className='fs_text-avatar'>{formatDateJP(overviewInfo.esManagerStartDate)}</span>
        </BoxText>
        <Box>
          <span>{t('relationship')}：</span>
        </Box>
        <Flex gap={1}>
          {LEVEL_EMPLOYEE.filter((item) => item.value !== 0).map((employee, index) => (
            <BoxValue key={index} isActive={overviewInfo.relationship === employee.value}>
              {employee.value}
            </BoxValue>
          ))}
        </Flex>
        <Box>
          <span>{t('comprehension')}：</span>
        </Box>
        <Flex gap={1}>
          {LEVEL_EMPLOYEE.filter((item) => item.value !== 0).map((employee, index) => (
            <BoxValue key={index} isActive={overviewInfo.comprehension === employee.value}>
              {employee.value}
            </BoxValue>
          ))}
        </Flex>
        <BoxText color={COLORS.neutral_500}>
          <span>*{t('predecessor')}：</span>
          <span>{overviewInfo.predecessorName}</span>
        </BoxText>
        <BoxText color={COLORS.neutral_500}>
          <span className='fs_text-avatar'>*担当終了日：</span>
          {/* <span>{overviewInfo?.esEndDate}</span> */}
          <span className='fs_text-avatar'>{formatDateJP(overviewInfo.predecessorEndDate)}</span>
        </BoxText>
      </Flex>
    </Box>
  );
}
