import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, CloseButton, Flex, Heading, IconButton, Img, List, useColorModeValue } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets';
import { AppContext } from 'dhm/contexts/AppContext';
import { ResponsiveContext } from 'dhm/contexts/ResponsiveContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { LinkItems } from 'dhm/services/sidebar/menu';
import { COLORS } from 'dhm/utils/constants/style';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { NavItem } from './elements/navItem';

const ListContainer = styled(List)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

function SidebarContent({ onClose, currentUrl, handleClick, ...rest }) {
  const { resLayout } = useContext(ResponsiveContext);
  const { user } = useSelector((state) => state.auth);
  // eslint-disable-next-line no-unused-vars
  const { role } = user;
  const { tHeader } = useContext(LanguageContext);
  const { setIsShowSidebar, isShowSidebar } = useContext(AppContext);
  const allowedIds = 'All';
  const filteredLinkItems = LinkItems.filter((item) => {
    if (!item.id || allowedIds === 'All' || !allowedIds.includes(item.id)) {
      return (
        !item.subMenu ||
        item.subMenu.some((subItem) => !subItem.id || allowedIds === 'All' || allowedIds.includes(subItem.id))
      );
    }
    return false;
  });
  return (
    <Box
      bg={COLORS.black_primary}
      zIndex='999'
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: `${isShowSidebar ? resLayout.widthFull : resLayout.widthHideSidebar}px` }}
      paddingTop={{ base: '20px', md: '28px' }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <IconButton
        icon={isShowSidebar ? <ChevronLeftIcon boxSize='20px' /> : <ChevronRightIcon boxSize='20px' />}
        size='sm'
        onClick={() => setIsShowSidebar(!isShowSidebar)}
        position='absolute'
        top='21px'
        right='-15px'
        borderRadius='50%'
      />
      <Flex h='20' alignItems='center' mx='8' justifyContent='center'>
        <Img src={DHMAssets.LogoDHM} width='120px' />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Heading
        color='white'
        textAlign='center'
        fontSize={`${resLayout.fsTitle}px`}
        display={{
          base: 'block',
          md: isShowSidebar ? 'block' : 'none',
        }}
      >
        Dirbato
      </Heading>
      <Box color={COLORS.white} textAlign='center'>
        {isShowSidebar ? tHeader('personnel_management_system') : 'ESDB'}
      </Box>
      <ListContainer spacing={3} mt='4' height='calc(100% - 156px)' overflowY='auto'>
        {filteredLinkItems.map((item, index) => (
          <NavItem key={index} item={item} currentUrl={currentUrl} onClick={handleClick} />
        ))}
      </ListContainer>
    </Box>
  );
}

export const MemoizedSidebarContent = React.memo(SidebarContent);
