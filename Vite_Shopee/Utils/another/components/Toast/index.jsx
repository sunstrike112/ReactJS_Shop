import { createStandaloneToast } from '@chakra-ui/react';
import { TOAST_POSITION } from './dataToast';

const { toast } = createStandaloneToast();

function showToast(title, status, position = TOAST_POSITION.top, duration = 4000, isClosable = true) {
  toast({
    title,
    status,
    position,
    variant: 'left-accent',
    duration,
    isClosable,
  });
}

export default showToast;
