/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import { DownloadIcon } from '@chakra-ui/icons';
import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import DHMModal from 'dhm/components/Modal';
import showToast from 'dhm/components/Toast';
import { TOAST_STATUS } from 'dhm/components/Toast/dataToast';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ListMessError } from 'dhm/utils/index';
import React, { useContext, useRef, useState } from 'react';
import { DHMButton } from '../index';

export function ImportExcelFile({ onCloseImport = () => {}, onFinallyImport = () => {}, onImport = () => {} }) {
  const refInput = useRef(null);
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();
  const { tForm, tTabs } = useContext(LanguageContext);
  const [uploadExcel, setUpLoadExcel] = useState('');
  const [uploadExcelError, setUpLoadExcelError] = useState('');

  const onClose = () => {
    setUpLoadExcel('');
    setUpLoadExcelError('');
    onCloseImport();
    closeModal();
  };

  const onChangeFile = React.useCallback((selectFile) => {
    if (selectFile.target.files[0]) {
      const file = selectFile.target.files[0];
      if (file?.type === 'text/csv') {
        setUpLoadExcel(file);
        setUpLoadExcelError('');
        onOpen();
        return true;
      }
      setUpLoadExcel('');
      showToast(ListMessError.DHM_COM_E_DHM_COM_S_INCORRECT_FORMAT_FILE, TOAST_STATUS.error);
      return setUpLoadExcelError('FILE_INVALID');
    }
  }, []);
  const handleSubmit = React.useCallback(() => {
    if (uploadExcelError) {
      return false;
    }

    if (!uploadExcel) {
      return setUpLoadExcelError('MISSING FILE');
    }
    onImport(uploadExcel);
    setUpLoadExcel('');
    onCloseImport();
    closeModal();
    return false;
  }, [uploadExcel]);
  const propsModal = {
    title: 'インポートの確認',
    isOpen,
    onCancel: onClose,
  };
  return (
    <>
      <label htmlFor='file-upload' className='custom-file-upload'>
        <DHMButton
          rightIcon={<DownloadIcon />}
          text={tTabs('import')}
          buttonType='master'
          onClick={() => {
            refInput.current.click();
          }}
        />
      </label>
      {!isOpen && <input ref={refInput} id='file-upload' accept='.csv' type='file' hidden onChange={onChangeFile} />}

      <DHMModal {...propsModal} typeHeader='info'>
        <Text>{tForm('confirm_content')}</Text>
        <Flex mt={5} gap='10px' justifyContent='end'>
          <DHMButton onClick={onClose} text={tForm('cancel')} buttonType='cancel' />
          <DHMButton onClick={handleSubmit} text={tForm('confirm')} autoFocus />
        </Flex>
      </DHMModal>
    </>
  );
}
