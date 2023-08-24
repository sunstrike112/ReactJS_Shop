import { Box, Flex, Image, Stack } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { BORDERS } from 'dhm/utils/constants/style';

export function LayoutAuth({ children }) {
  const loadSSO = window.location.pathname.includes('/esdb');
  return (
    <>
      <Stack minH='100vh' height='100vh' direction={{ base: 'column', md: 'row' }}>
        <Flex
          flex={1}
          position='relative'
          display={{
            base: 'none',
            md: loadSSO ? 'none' : 'flex',
          }}
        >
          <Image
            borderRadius={BORDERS.radius_3}
            alt='Login Image'
            objectFit='cover'
            src={DHMAssets.BackgroundSignIn}
            width='100%'
            height='100%'
            objectPosition='top'
          />
        </Flex>
        {/* <Box position='absolute' right='0'>
          <Flex h='20' alignItems='center' mx='8' justifyContent='center'>
            <Img bg='black' src={DHMAssets.LogoDHM} width='120px' />
          </Flex>
          <Heading textAlign='center'>Dirbato</Heading>
        </Box> */}
        <Flex flex={1} align='center' justify='center'>
          <Stack spacing={4} w='full' maxW='md'>
            <Box>{children}</Box>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}
