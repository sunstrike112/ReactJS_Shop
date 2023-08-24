import { WarningTwoIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Img, useDisclosure } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { DHMButton } from 'dhm/components/Button';
import DHMModal from 'dhm/components/Modal';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { deleteCodeMasterAllDisplay, searchDetailDisplay } from 'dhm/store/codeMaster/action.js';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';

export function DForm({ type = 'deleteAll', idRow = null, rowSelection, methodsTable, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tForm } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    const dataPayload = {
      deleteAll: rowSelection && Object.keys(rowSelection),
      delete: [idRow],
    };
    const data = dataPayload[type];
    const onSuccess = () => {
      methodsTable.callbackDelete();
      const paramsFilter = {
        params: { codeListIds: [idRow.codeListId] },
      };
      dispatch(searchDetailDisplay(paramsFilter));
      handleClose();
    };
    const payload = { data, onSuccess };
    dispatch(deleteCodeMasterAllDisplay(payload));
  };
  const chooseButton = {
    deleteAll: <DHMButton buttonType='delete' onClick={onOpen} {...props} text='deleteMulti' />,
    delete: (
      <IconButton
        aria-label='View department'
        size='sm'
        icon={<Img src={DHMAssets.ICON_DELETE} />}
        mr='2'
        onClick={onOpen}
      />
    ),
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
      <DHMModal
        {...propsModal}
        content={() => (
          <>
            『はい』をクリックすると、削除したレコードを元に戻すことできません。
            これらのレコードを削除してもよろしいですか?
            <Flex mt={5} gap='10px' justifyContent='end'>
              <DHMButton onClick={handleClose} text={tForm('no')} buttonType='cancelDelete' />
              <DHMButton onClick={handleConfirm} text={tForm('yes')} buttonType='yesDelete' />
            </Flex>
          </>
        )}
      />
    </>
  );
}
