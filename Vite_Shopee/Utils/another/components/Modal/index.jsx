import PropTypes from 'prop-types';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { ConfirmModal } from './elements/confirmModal';
import { ApproveModal } from './elements/approveModal';

function DHMModal({
  title,
  onCancel,
  children,
  typeHeader,
  titleProps,
  prevIcon,
  haveConfirm = false,
  onConfirm,
  content = () => null,
  typeConfirm = 'create',
  isShowClose = false,
  isApproved = false,
  ...modalProps
}) {
  const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();
  const handleCancel = () => {
    onCancel();
  };
  const chooseHeader = {
    master: {
      bg: COLORS.master_primary,
      color: COLORS.white,
      bgClose: COLORS.white,
      colorClose: COLORS.master,
      ptBody: '32px',
    },
    info: {
      bg: COLORS.info,
      color: COLORS.white,
      bgClose: COLORS.white,
      colorClose: COLORS.master,
      ptBody: '32px',
    },
    delete: {
      bgClose: COLORS.waring_700,
      colorClose: COLORS.neutral_250,
      ptBody: '20px',
    },
    gradient: {
      bg: COLORS.brand_1,
      color: COLORS.white,
      bgClose: COLORS.white,
      colorClose: COLORS.master,
      ptBody: '32px',
    },
  };
  const modalHeader = chooseHeader[typeHeader];
  return (
    <>
      <Modal closeOnOverlayClick={false} closeOnEsc={false} onClose={handleCancel} isCentered {...modalProps}>
        <ModalOverlay />
        <ModalContent borderRadius={BORDERS.radius_0}>
          <ModalHeader
            {...titleProps}
            bg={modalHeader.bg}
            color={modalHeader.color}
            borderRadius={BORDERS.radius_0_top}
          >
            {prevIcon}
            {title}
          </ModalHeader>
          {isShowClose && (
            <ModalCloseButton
              bg={modalHeader.bgClose}
              size='sm'
              marginRight='10px'
              marginTop='10px'
              color={modalHeader.colorClose}
            />
          )}
          <ModalBody pb={4} paddingTop={modalHeader.ptBody}>
            {content({
              onOpenConfirm,
            })}
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
      {haveConfirm &&
        (isApproved ? (
          <ApproveModal isOpen={isOpenConfirm} onConfirm={onConfirm} onCancel={onCloseConfirm} />
        ) : (
          <ConfirmModal isOpen={isOpenConfirm} onConfirm={onConfirm} onCancel={onCloseConfirm} type={typeConfirm} />
        ))}
    </>
  );
}

DHMModal.propTypes = {
  cancelButtonText: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  saveButtonText: PropTypes.string,
  title: PropTypes.string,
  prevIcon: PropTypes.node,
  typeHeader: PropTypes.oneOf(['master', 'info', 'delete', 'gradient']),
};

DHMModal.defaultProps = {
  cancelButtonText: 'Cancel',
  children: null,
  isOpen: false,
  onCancel: null,
  saveButtonText: 'Save',
  title: '',
  prevIcon: null,
  typeHeader: 'master',
};

export default DHMModal;
