import { Center } from '@chakra-ui/react';
import { COLORS } from 'dhm/utils/constants/style';

export default function TagLabel({ text }) {
  return (
    <Center
      minWidth='200px'
      height='70px'
      fontWeight='700'
      color={COLORS.white}
      background={COLORS.neutral_700}
      textAlign='center'
      mr='20px'
    >
      {text}
    </Center>
  );
}
