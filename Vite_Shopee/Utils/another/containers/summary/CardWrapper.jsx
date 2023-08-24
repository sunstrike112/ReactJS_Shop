import { EditIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import { ResponsiveContext } from 'dhm/contexts/ResponsiveContext';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { COLORS_TYPE } from 'dhm/utils/constants/type';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { DrawerContainer } from '../drawer';

export function WrapperCard({ title, children, typeHeader = 'card', typeEdit = 'default', ...props }) {
  const { ID_KEY, PermissionWrapper, canEdit } = useContext(AbilityContext);

  const { resSummary } = useContext(ResponsiveContext);
  const { staffSummary } = useSelector((state) => state.summary);
  const { detailEmployeeSuccess } = useSelector((state) => state.employeeSuccess);
  const chooseTypeEdit = {
    basicInfo: (
      <PermissionWrapper path={ID_KEY[7]} haveNoti={false}>
        <DrawerContainer modeForm={canEdit(ID_KEY[7]) ? 'summary' : 'summaryView'} originData={staffSummary} />
      </PermissionWrapper>
    ),
    default: <IconButton size='sm' icon={<EditIcon />} background='transparent' />,
    employeeSuccess: (
      <PermissionWrapper path={ID_KEY[9]} haveNoti={false}>
        <DrawerContainer
          modeForm={canEdit(ID_KEY[9]) ? 'summary' : 'summaryView'}
          modePage='employeeSuccess'
          originData={detailEmployeeSuccess}
        />
      </PermissionWrapper>
    ),
    policyProgress: (
      <PermissionWrapper path={ID_KEY[8]} haveNoti={false}>
        <DrawerContainer
          modeForm={canEdit(ID_KEY[8]) ? 'summary' : 'summaryView'}
          modePage='policyProgress'
          originData={staffSummary}
        />
      </PermissionWrapper>
    ),
    projectInfo: <DrawerContainer modeForm='projectInfo' modePage='projectInfo' originData={staffSummary} />,
    interviewLog: <DrawerContainer modeForm='interviewLog' modePage='interviewLog' originData={staffSummary} />,
  };
  const choosePath = {
    basicInfo: ID_KEY[7],
    employeeSuccess: ID_KEY[9],
    policyProgress: ID_KEY[8],
  };
  return (
    <Box bg={COLORS.white} borderRadius={BORDERS.radius_2} {...props}>
      <Box
        textAlign='center'
        position='relative'
        background={COLORS_TYPE[typeHeader]}
        borderRadius={BORDERS.radius_0_top}
        height={resSummary.height_title}
        lineHeight={resSummary.height_title}
        color={COLORS.white}
        fontWeight='600'
        fontSize={resSummary.fs_title}
      >
        {title}
        <Box
          position='absolute'
          right='12px'
          top='0px'
          transform={`translate(${resSummary.translateIcon}) scale(${resSummary.scaleIcon})`}
        >
          {chooseTypeEdit[typeEdit]}
        </Box>
      </Box>
      <Box fontSize='10px' padding='10px' paddingTop='5px'>
        {choosePath[typeEdit] ? (
          <PermissionWrapper path={choosePath[typeEdit]}>{children}</PermissionWrapper>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
}
