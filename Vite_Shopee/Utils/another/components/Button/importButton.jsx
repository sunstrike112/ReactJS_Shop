import { DownloadIcon } from '@chakra-ui/icons';
import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ListMessError } from 'dhm/utils/index';
import { useCallback, useContext, useState } from 'react';
import DHMModal from '../Modal';
import showToast from '../Toast';
import { TOAST_STATUS } from '../Toast/dataToast';
import { DHMButton } from './index';
import { WrapperUploadFiles } from './uploadButton/WrapperUpload';

export function ButtonImport({ onImport, ...props }) {
  const { tForm } = useContext(LanguageContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = useCallback((files) => {
    if (files[0]) {
      setSelectedFile(files[0]);
      onOpen();
    } else {
      showToast(ListMessError.DHM_COM_E_DHM_COM_S_INCORRECT_FORMAT_FILE, TOAST_STATUS.error);
    }
  });

  const handleConfirmImport = () => {
    onClose();
    onImport(selectedFile);
  };

  const handleCancelImport = () => {
    onClose();
    setSelectedFile(null);
  };
  const propsModal = {
    title: 'インポートの確認',
    isOpen,
    onCancel: handleCancelImport,
  };
  return (
    <>
      <WrapperUploadFiles
        accepts={['.csv']}
        onChange={(files) => {
          handleFileSelect(files);
        }}
        nodeUpload={({
          handleDrop,
          handleDragOver,
          handleDragEnter,
          handleDragLeave,
          // dropzoneElement,
          clickable,
          openFileChooser,
          isDragging,
        }) => (
          <>
            <DHMButton
              rightIcon={<DownloadIcon />}
              onClick={clickable === true ? openFileChooser : null}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              isDragging={isDragging}
              {...props}
            />
            <DHMModal {...propsModal} typeHeader='info'>
              <Text>{tForm('confirm_content')}</Text>
              <Flex mt={5} gap='10px' justifyContent='end'>
                <DHMButton onClick={handleCancelImport} text={tForm('cancel')} buttonType='cancel' />
                <DHMButton onClick={handleConfirmImport} text={tForm('confirm')} autoFocus />
              </Flex>
            </DHMModal>
          </>
        )}
      />
    </>
  );
}
