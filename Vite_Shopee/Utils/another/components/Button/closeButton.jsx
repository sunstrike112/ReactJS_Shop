import { useDisclosure } from '@chakra-ui/react';
import { COLORS } from 'dhm/utils/index';
import { ConfirmModal } from '../Modal/elements/confirmModal';
import { DHMButton } from './index';

export function CloseButton({ handleClose, typeClose = 'modal' }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const chooseView = {
    modal: <DHMButton text='cancel' buttonType='cancel' onClick={onOpen} />,
    drawer: (
      <DHMButton
        position='absolute'
        top='18px'
        right='15px'
        color={COLORS.black_primary}
        bg={COLORS.white}
        width='30px'
        height='30px'
        size='sm'
        onClick={onOpen}
      >
        <i className='fa-solid fa-xmark' />
      </DHMButton>
    ),
  };
  return (
    <>
      {chooseView[typeClose]}
      <ConfirmModal onCancel={onClose} isOpen={isOpen} onConfirm={handleClose} type='cancel' />
    </>
  );
}
