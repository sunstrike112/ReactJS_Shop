import { CloseIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { ConfirmModal } from '../Modal/elements/confirmModal';

export function CloseIconButton({ handleClose }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton size='xs' icon={<CloseIcon />} onClick={onOpen} />
      <ConfirmModal onCancel={onClose} isOpen={isOpen} onConfirm={handleClose} type='cancel' />
    </>
  );
}
