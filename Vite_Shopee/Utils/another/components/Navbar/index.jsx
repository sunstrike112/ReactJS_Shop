import { Box, Flex, HStack, IconButton, Img, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { useContext, useMemo } from 'react';
import { FiMenu } from 'react-icons/fi';
// import { ChangePassword } from 'dhm/containers/auth/changePassword';
import { DHMAssets } from 'dhm/assets';
import { DHMContext } from 'dhm/contexts';
import { ResponsiveContext } from 'dhm/contexts/ResponsiveContext';
import LanguageContext, { changeLanguage } from 'dhm/contexts/TranslateContext';
import { routes } from 'dhm/routes/app/config';
import i18n from 'dhm/translate/index';
import { getAllRoutes } from 'dhm/utils/constants/routes';
import { BORDERS, BOX_SHADOW, COLORS } from 'dhm/utils/constants/style';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../contexts/AuthContext';
import { BoxTextFlex } from '../Box/BoxText';

function MobileNav({ onOpen, ...rest }) {
  const { user } = useSelector((state) => state.auth);
  const { resLayout } = useContext(ResponsiveContext);
  const { tSidebar } = useContext(LanguageContext);
  const { signOut } = useContext(AuthContext);
  // const [isOpen, setOpen] = useState(false);
  const { currentUrl, isShowSidebar } = useContext(DHMContext.App.Context);
  const isSummary = Boolean(currentUrl.match(/\/summary/));
  const chooseRouteObj = useMemo(() => {
    const allPaths = getAllRoutes(routes);
    return allPaths.find((route) => route.path.split('/:')[0] === currentUrl);
  }, [currentUrl]);
  const currentLanguage = (lang) =>
    i18n.language === lang
      ? { color: COLORS.blue_primary, font_weight: 'bold' }
      : { color: COLORS.neutral_500, font_weight: 'normal' };
  return (
    <Box
      paddingLeft={{
        base: 0,
        md: `${isShowSidebar ? resLayout.widthFull : resLayout.widthHideSidebar}px`,
      }}
    >
      <Flex
        px={{ base: 4, md: 4 }}
        height={`${resLayout.heightNavbar}px`}
        alignItems='center'
        bg={COLORS.white_primary}
        borderBottomWidth='1px'
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'space-between' }}
        {...rest}
      >
        <Box paddingLeft='16px' fontWeight='600' display={{ base: 'none', md: 'block' }}>
          {/* {tHeader('personnel_management_system')} */}
          {!isSummary && chooseRouteObj?.typePage && (
            <Flex px={{ base: 4, md: 4 }}>
              <Text fontSize='24px' fontWeight='600' color={COLORS.black_primary}>
                {chooseRouteObj?.titlePage}
              </Text>
            </Flex>
          )}
          {isSummary && (
            <Flex px={{ base: 4, md: 4 }}>
              <Text fontSize='24px' fontWeight='600' color={COLORS.black_primary}>
                詳細
              </Text>
            </Flex>
          )}
          {currentUrl.includes('resume') && (
            <Flex px={{ base: 4, md: 4 }}>
              <Text fontSize='24px' fontWeight='600' color={COLORS.black_primary}>
                {tSidebar('resume')}
              </Text>
            </Flex>
          )}
          {currentUrl.includes('workHistory') && (
            <Flex px={{ base: 4, md: 4 }}>
              <Text fontSize='24px' fontWeight='600' color={COLORS.black_primary}>
                {tSidebar('workHistory')}
              </Text>
            </Flex>
          )}
        </Box>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant='outline'
          aria-label='open menu'
          icon={<FiMenu />}
        />
        <Img display={{ base: 'flex', md: 'none' }} src={DHMAssets.LogoDHM} width='100px' />
        <HStack spacing={{ base: '0', md: '6' }}>
          <Flex gap='3px'>
            <Box
              cursor='pointer'
              fontWeight={currentLanguage('jp').font_weight}
              color={currentLanguage('jp').color}
              onClick={() => changeLanguage('jp')}
            >
              JP
            </Box>
            /
            <Box
              cursor='pointer'
              fontWeight={currentLanguage('en').font_weight}
              color={currentLanguage('en').color}
              onClick={() => changeLanguage('en')}
            >
              EN
            </Box>
          </Flex>
          <Flex
            alignItems='center'
            width='180px'
            height={`${resLayout.heightBoxInfo}px`}
            justify='space-between'
            borderRadius={BORDERS.radius_0}
            bg={COLORS.white}
            boxShadow={BOX_SHADOW.primary_account}
            padding='0 12px'
          >
            <Flex>
              <HStack>
                {/* <Avatar size='sm' src={DHMAssets.LogoDHM} /> */}
                <VStack display={{ base: 'none', md: 'flex' }} alignItems='flex-start' spacing='1px' ml='2'>
                  <BoxTextFlex width='120px' fontSize='sm' fontWeight='600'>
                    {user?.userName || ''}
                  </BoxTextFlex>
                  <BoxTextFlex width='120px' color='gray.600' fontSize='sm'>
                    {user?.role}
                  </BoxTextFlex>
                </VStack>
              </HStack>
            </Flex>
            <Box cursor='pointer' onClick={signOut}>
              <Img src={DHMAssets.ICON_LOGOUT} />
            </Box>
            {/* <Menu isLazy>
              <MenuButton py={2} transition='all 0.3s' _focus={{ boxShadow: 'none' }}>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                zIndex='999'
              > */}
            {/* <MenuItem icon={<UnlockIcon />} onClick={() => setOpen(!isOpen)}>
                  {tForm('change_password')}
                </MenuItem> */}
            {/* <MenuItem>{tHeader('support')}</MenuItem> */}
            {/* <MenuItem onClick={signOut}>{tHeader('sign_out')}</MenuItem>
              </MenuList> */}
            {/* <ChangePassword onOpen={isOpen} setOpen={setOpen} /> */}
            {/* </Menu> */}
          </Flex>
        </HStack>
      </Flex>
    </Box>
  );
}

export { MobileNav };
