import { WarningTwoIcon } from '@chakra-ui/icons';
import { Flex, Img, useDisclosure } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { DHMButton } from 'dhm/components/Button';
import DHMModal from 'dhm/components/Modal';
import { ApproveModal } from 'dhm/components/Modal/elements/approveModal';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';

export function DeleteModal({
  type = 'deleteAll',
  idRow = null,
  rowSelection,
  callbackSuccess = () => {},
  action = () => () => {},
  morePayload = {},
  typeBusinessDivision = '',
  othersHaveWF = false,
  ...props
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tForm, tMessageContent } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = ({ moreParams = {} }) => {
    const dataPayload = {
      deleteAll: rowSelection && Object.keys(rowSelection),
      delete: [idRow],
      other: morePayload,
      deleteWF: idRow,
    };
    const data = dataPayload[type];
    const onSuccess = (resp) => {
      callbackSuccess(resp);
      handleClose();
    };
    const payload = { data, onSuccess, paramsWF: moreParams.workflow };
    dispatch(action(payload));
  };
  const chooseButton = {
    deleteAll: <DHMButton buttonType='delete' onClick={onOpen} {...props} text='deleteMulti' />,
    delete: <Img src={DHMAssets.ICON_DELETE} onClick={onOpen} cursor='pointer' />,
    other: <Img src={DHMAssets.ICON_DELETE} onClick={onOpen} cursor='pointer' />,
    deleteWF: <Img src={DHMAssets.ICON_DELETE} onClick={onOpen} cursor='pointer' />,
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
      {chooseButton[type]}

      {type === 'deleteWF' || othersHaveWF ? (
        <ApproveModal
          isOpen={isOpen}
          onConfirm={(dataWF) => {
            handleConfirm({
              moreParams: dataWF,
            });
            handleClose();
          }}
          typeBusinessDivision={typeBusinessDivision}
          onCancel={handleClose}
        />
      ) : (
        <DHMModal
          {...propsModal}
          haveConfirm
          typeConfirm='delete'
          content={() => (
            <>
              {tMessageContent('delete.content')}
              <Flex mt={5} gap='10px' justifyContent='end'>
                <DHMButton onClick={handleClose} text={tForm('no')} buttonType='cancelDelete' />
                <DHMButton onClick={handleConfirm} text={tForm('yes')} buttonType='yesDelete' />
              </Flex>
            </>
          )}
        />
      )}
    </>
  );
}
