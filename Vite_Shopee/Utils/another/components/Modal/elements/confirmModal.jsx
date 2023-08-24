import { QuestionIcon } from '@chakra-ui/icons';
import { Flex, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { useContext } from 'react';

export function ConfirmModal({ isOpen, onCancel, onConfirm, type = 'create' }) {
  const { tMessageContent } = useContext(LanguageContext);

  const chooseModal = {
    create: {
      title: tMessageContent('add.title'),
      content: tMessageContent('add.content'),
      yes: tMessageContent('add.yes'),
      no: tMessageContent('add.no'),
      type: 'create',
      colorClose: COLORS.white,
      bgClose: COLORS.master,
    },
    update: {
      title: tMessageContent('update.title'),
      content: tMessageContent('update.content'),
      yes: tMessageContent('update.yes'),
      no: tMessageContent('update.no'),
      type: 'create',
      colorClose: COLORS.white,
      bgClose: COLORS.master,
    },
    delete: {
      title: tMessageContent('delete.title'),
      content: tMessageContent('delete.content'),
      yes: tMessageContent('delete.yes'),
      no: tMessageContent('delete.no'),
      type: 'yesDelete',
      colorClose: COLORS.neutral_250,
      bgClose: COLORS.waring_700,
    },
    cancel: {
      title: tMessageContent('cancel.title'),
      content: tMessageContent('cancel.content'),
      yes: tMessageContent('cancel.yes'),
      no: tMessageContent('cancel.no'),
      type: 'create',
      colorClose: COLORS.neutral_250,
      bgClose: COLORS.waring_700,
    },
    roleLv2: {
      title: tMessageContent('role_lv_2.title'),
      content: tMessageContent('role_lv_2.content'),
      yes: tMessageContent('role_lv_2.yes'),
      type: 'create',
      colorClose: COLORS.neutral_250,
      bgClose: COLORS.waring_700,
    },
    roleLv1: {
      title: tMessageContent('role_lv_1.title'),
      content: tMessageContent('role_lv_1.content'),
      yes: tMessageContent('role_lv_1.yes'),
      no: tMessageContent('role_lv_1.no'),
      type: 'create',
      colorClose: COLORS.neutral_250,
      bgClose: COLORS.waring_700,
    },
    confirmChange: {
      title: tMessageContent('confirm_update.title'),
      content: tMessageContent('confirm_update.content'),
      yes: tMessageContent('confirm_update.yes'),
      no: tMessageContent('confirm_update.no'),
      type: 'create',
      colorClose: COLORS.neutral_250,
      bgClose: COLORS.waring_700,
    },
    confirmRole: {
      title: tMessageContent('confirmRole.title'),
      content: tMessageContent('confirmRole.content'),
      yes: tMessageContent('confirmRole.yes'),
      type: 'create',
      colorClose: COLORS.neutral_250,
      bgClose: COLORS.waring_700,
    },
  };
  const handleCancel = () => {
    onCancel();
  };
  const handleConfirm = () => {
    onConfirm();
    onCancel();
  };
  const getModal = chooseModal[type] || chooseModal.create;
  return (
    <Modal size='sm' isOpen={isOpen} closeOnOverlayClick={false} closeOnEsc={false} isCentered onClose={handleCancel}>
      <ModalOverlay />
      <ModalContent borderRadius={BORDERS.radius_0}>
        <ModalHeader textAlign='center' borderRadius={BORDERS.radius_0_top}>
          <QuestionIcon mr='5px' />
          {getModal.title}
        </ModalHeader>
        <ModalBody pb={4}>
          <Text>{getModal.content}</Text>
          <Flex mt={5} gap='10px' justifyContent='end'>
            {type === 'roleLv2' || type === 'confirmRole' ? (
              ''
            ) : (
              <DHMButton onClick={handleCancel} text={getModal.no} buttonType='cancel' />
            )}
            <DHMButton onClick={handleConfirm} text={getModal.yes} buttonType={getModal.type} autoFocus />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
