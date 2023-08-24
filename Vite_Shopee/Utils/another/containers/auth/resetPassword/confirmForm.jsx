import { InfoIcon } from '@chakra-ui/icons';
import DHMModal from 'dhm/components/Modal';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ROUTES } from 'dhm/utils/constants/routes';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export function ConfirmForm({ onOpen }) {
  const navigate = useNavigate();
  const { tForm } = useContext(LanguageContext);

  const handleClose = () => {
    navigate(ROUTES.login);
  };

  const propsModal = {
    title: tForm('confirm'),
    isOpen: onOpen,
    titleProps: {
      textAlign: 'center',
    },
    onCancel: handleClose,
    prevIcon: <InfoIcon mr='5px' />,
  };
  return (
    <>
      <DHMModal {...propsModal}>{tForm('check_mail')}</DHMModal>
    </>
  );
}
