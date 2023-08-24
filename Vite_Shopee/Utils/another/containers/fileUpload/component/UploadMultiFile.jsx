import { Box, Flex, Img, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { DHMButton } from 'dhm/components/Button';
import DHMModal from 'dhm/components/Modal';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServiceFileUpload } from 'dhm/store/fileUpload/services';
import { MODE_UPLOAD } from 'dhm/utils/constants/type';
import { convertToCurrentTime } from 'dhm/utils/helpers/convert';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { BORDERS, COLORS } from 'dhm/utils/index';
import { useContext, useRef, useState } from 'react';
import { ModalHistoryFile } from './ModalHistoryFile';

export function UploadMultiFile({
  listFile = [],
  listError = {},
  listPreferenceFile = [],
  handleDeleteFile,
  handleFileChange,
  handleDrop,
  handleDragOver,
  typeUpload = '',
  employeeId,
  importTarget,
}) {
  const { tFileUpload, tForm } = useContext(LanguageContext);
  const { listFileVersion, getAllFileVersionAction, deleteFileAction, getListAllFileAction } = ServiceFileUpload();
  const [fileChooseDelete, setFileChooseDelete] = useState({
    fileName: null,
    employeeId: null,
  });
  const fileInputRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenConfirmModal, onOpen: onOpenConfirmModal, onClose: onCloseConfirmModal } = useDisclosure();

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  const handleLoadVersionFile = (file) => {
    getAllFileVersionAction({ employeeId: file.employeeId, fileName: file.fileName });
    onOpen();
  };
  const handleChooseFile = (file) => {
    setFileChooseDelete({
      fileName: file.fileName,
      employeeId: file.employeeId,
    });
    onOpenConfirmModal();
  };

  const handleDeleteFileS3 = () => {
    deleteFileAction({
      employeeId: fileChooseDelete.employeeId,
      fileName: fileChooseDelete.fileName,
      onSuccess: getListAllFileAction,
    });
    onCloseConfirmModal();
  };

  return (
    <Flex
      position='relative'
      flexDirection='row'
      justify='space-between'
      height='400px'
      p='20px'
      gap='15px'
      background={COLORS.white_primary}
      border={BORDERS.border_1(COLORS.gray_700)}
    >
      <Flex flexDirection='column' width='40%' gap='5px'>
        <Flex
          justify='center'
          alignItems='center'
          height='80px'
          mt='10px'
          cursor={importTarget === MODE_UPLOAD.INDIVIDUAL && employeeId === null ? 'not-allowed' : 'pointer'}
          border={BORDERS.border_dashed_2(COLORS.info)}
          onDrop={(e) => handleDrop(e, typeUpload)}
          onDragOver={handleDragOver}
          onClick={handleClickUpload}
        >
          <input
            id={typeUpload}
            type='file'
            multiple
            disabled={importTarget === MODE_UPLOAD.INDIVIDUAL && employeeId === null}
            onChange={(e) => handleFileChange(e, typeUpload)}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <Text fontSize='12px' color={COLORS.info} textAlign='center' px='10px'>
            {tFileUpload('dragDrop')}
          </Text>
        </Flex>
        <Box>{tFileUpload('newFileList')}</Box>
        <Flex flexDirection='column'>
          {listError.isFileTypeDifferent.includes(true) && <Flex textColor='red'>{tFileUpload('errorFileType')}</Flex>}
          {listError.isFileNameDifferent.includes(true) && (
            <Flex textColor='red'>{tFileUpload('errorFileFormat')}</Flex>
          )}
          {listError.isEmployeeNotFound.includes(true) && (
            <Flex textColor='red'>{tFileUpload('errorEmployeeNotFound')}</Flex>
          )}
          {listError.isEmployeeNotMatch.includes(true) && (
            <Flex textColor='red'>{tFileUpload('errorEmployeeNotMatch')}</Flex>
          )}
        </Flex>
        <Flex flexDirection='column' height='100%' overflow='auto'>
          <Box bg={COLORS.white} border={BORDERS.border_1(COLORS.gray_700)}>
            <Flex justify='space-between'>
              <Flex p='5px 20px'>{tFileUpload('fileName')}</Flex>
              <Flex p='5px' justify='center' width='30%' borderLeft={BORDERS.border_1(COLORS.gray_700)}>
                {tFileUpload('action')}
              </Flex>
            </Flex>
          </Box>
          <Box
            pt='5px'
            height='100%'
            overflow='auto'
            bg={COLORS.white}
            borderLeft={BORDERS.border_1(COLORS.gray_700)}
            borderRight={BORDERS.border_1(COLORS.gray_700)}
            borderBottom={BORDERS.border_1(COLORS.gray_700)}
          >
            {listFile.length !== 0 &&
              listFile.map((file, index) => (
                <Flex key={index} justify='space-between' gap='15px'>
                  <Tooltip label={file.name}>
                    <Flex
                      color={file.isError && COLORS.red_alert}
                      width='70%'
                      justifySelf='start'
                      p='5px 20px'
                      textOverflow='ellipsis'
                      height='34px'
                      noOfLines={1}
                      overflow='hidden'
                      wordBreak='break-all'
                    >
                      {file.name}
                    </Flex>
                  </Tooltip>
                  <Flex justifyContent='center' width='30%'>
                    <Img
                      width='20px'
                      height='20px'
                      src={file.isError ? DHMAssets.ICON_DELETE_FILE_RED : DHMAssets.ICON_DELETE_FILE}
                      onClick={() => handleDeleteFile(index, typeUpload)}
                      cursor='pointer'
                    />
                  </Flex>
                </Flex>
              ))}
          </Box>
        </Flex>
      </Flex>

      <Flex flexDirection='column' width='60%' gap='15px' height='100%' mt='10px'>
        <Box>{tFileUpload('existFileList')}</Box>
        <Flex flexDirection='column' height='100%'>
          <Box bg={COLORS.white} border={BORDERS.border_1(COLORS.gray_700)}>
            <Flex justify='space-between'>
              <Flex p='5px 20px' width='35%'>
                {tFileUpload('fileName')}
              </Flex>
              <Flex p='5px' justify='center' width='40%' borderLeft={BORDERS.border_1(COLORS.gray_700)}>
                {tFileUpload('lastUpdateDate')}
              </Flex>
              <Flex p='5px' justify='center' width='20%' borderLeft={BORDERS.border_1(COLORS.gray_700)}>
                {tFileUpload('action')}
              </Flex>
            </Flex>
          </Box>
          <Box
            pt='5px'
            height='100%'
            maxHeight='273px'
            overflow='auto'
            bg={COLORS.white}
            borderLeft={BORDERS.border_1(COLORS.gray_700)}
            borderRight={BORDERS.border_1(COLORS.gray_700)}
            borderBottom={BORDERS.border_1(COLORS.gray_700)}
          >
            {listPreferenceFile.length !== 0 &&
              (importTarget === MODE_UPLOAD.ALL || employeeId !== null) &&
              listPreferenceFile.map((file, index) => (
                <Flex key={index} justify='space-between' gap='15px' alignItems='center'>
                  <Tooltip label={file.fileName}>
                    <Flex
                      width='35%'
                      p='5px 20px'
                      textOverflow='ellipsis'
                      height='34px'
                      noOfLines={1}
                      overflow='hidden'
                      wordBreak='break-all'
                    >
                      {file.fileName}
                    </Flex>
                  </Tooltip>
                  <Flex width='40%' p='5px 20px' justifyContent='center'>
                    {formatDateJP(convertToCurrentTime(file.updatedDateTime), 'fulltime')}
                  </Flex>
                  <Flex width='20%' justifyContent='center'>
                    <Img
                      width='20px'
                      height='20px'
                      mr='10px'
                      src={DHMAssets.ICON_HISTORY_FILE}
                      onClick={() => handleLoadVersionFile(file)}
                      cursor='pointer'
                    />
                    <Img
                      width='20px'
                      height='20px'
                      src={DHMAssets.ICON_DELETE_FILE}
                      onClick={() => handleChooseFile(file)}
                      cursor='pointer'
                    />
                  </Flex>
                </Flex>
              ))}
          </Box>
        </Flex>
      </Flex>
      <ModalHistoryFile isOpen={isOpen} onClose={onClose} listFileVersion={listFileVersion} />
      <DHMModal
        title={tForm('confirm')}
        isOpen={isOpenConfirmModal}
        onCancel={onCloseConfirmModal}
        titleProps={{ textAlign: 'center' }}
        typeHeader='delete'
        content={() => (
          <>
            <Text textAlign='center' mb='40px'>
              {tFileUpload('confirmMessage')}
            </Text>
            <Flex gap='10px' justifyContent='center'>
              <DHMButton onClick={onCloseConfirmModal} text={tFileUpload('no')} buttonType='cancel' />
              <DHMButton onClick={() => handleDeleteFileS3()} text={tFileUpload('yes')} buttonType='other' autoFocus />
            </Flex>
          </>
        )}
      />
    </Flex>
  );
}
