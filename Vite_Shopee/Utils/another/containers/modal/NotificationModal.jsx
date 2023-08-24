import { WarningTwoIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button';
import DHMModal from 'dhm/components/Modal';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { useContext } from 'react';

export function NotificationModal({
  callbackSuccess = () => {},
  isOpen = false,
  onClose = () => {},
  typeMess = 'retirtement',
}) {
  const chooseTypeMess = {
    retirtement: 'noti_retirtement',
  };
  const { tForm, tMessageContent } = useContext(LanguageContext);
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    callbackSuccess();
    onClose();
  };

  const propsModal = {
    title: tForm('warning'),
    isOpen,
    onCancel: handleClose,
    titleProps: {
      textAlign: 'center',
    },
    prevIcon: <WarningTwoIcon mr='5px' />,
    typeHeader: 'delete',
  };
  return (
    <>
      <DHMModal
        {...propsModal}
        haveConfirm
        typeConfirm='delete'
        content={() => (
          <>
            {tMessageContent(`${chooseTypeMess[typeMess]}.content`)}
            <Flex mt={5} gap='10px' justifyContent='end'>
              <DHMButton
                onClick={handleConfirm}
                text={tMessageContent('noti_retirtement.yes')}
                buttonType='yesDelete'
              />
            </Flex>
          </>
        )}
      />
    </>
  );
}
