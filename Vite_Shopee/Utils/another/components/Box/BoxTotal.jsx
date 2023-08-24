import { Box, Text } from '@chakra-ui/react';

export function BoxTotal({ data }) {
  return (
    <Box>
      <span>
        <Text display='inline-block' as={data > 0 && 'u'} cursor={data > 0 && 'pointer'}>
          {data}
        </Text>
      </span>{' '}
      <span>人</span>
    </Box>
  );
}
