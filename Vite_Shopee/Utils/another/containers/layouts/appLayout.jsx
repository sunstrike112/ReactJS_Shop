import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { LoadingCommon } from 'dhm/components/Loading';
import { AppContext } from 'dhm/contexts/AppContext';
import { ResponsiveContext } from 'dhm/contexts/ResponsiveContext';
import { COLORS } from 'dhm/utils/constants/style';
import { useContext, useMemo } from 'react';
import { MobileNav } from '../../components/Navbar';
import { Sidebar } from '../sidebar';

export function LayoutApp({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isShowSidebar, currentUrl, isLoadingCommom, heightApp } = useContext(AppContext);
  const { resLayout } = useContext(ResponsiveContext);
  const isBgHaveColor = useMemo(() => currentUrl.includes('/summary/'), [currentUrl]);
  return (
    <Box minH='100vh' height='100vh' bg='#F5F5F5'>
      <Sidebar onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box
        width={{
          base: '100%',
          md: `calc(100% - ${isShowSidebar ? resLayout.widthFull : resLayout.widthHideSidebar}px)`,
        }}
        overflow={isLoadingCommom ? 'hidden' : 'auto'} // Don't change it to hidden (debugging)
        overflowX='hidden' // Remove tricky scrollbar
        height={`calc(${heightApp} - 75px)`}
        position='relative'
        p='4'
        ml='auto'
        background={isBgHaveColor ? COLORS.bg : COLORS.white}
      >
        {isLoadingCommom && <LoadingCommon isContent />}
        {children}
      </Box>
    </Box>
  );
}
