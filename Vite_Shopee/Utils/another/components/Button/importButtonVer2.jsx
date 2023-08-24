import { Box, Flex, Text } from '@chakra-ui/react';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { useContext, useEffect, useState } from 'react';
import { MdClear } from 'react-icons/md';
import { DHMButton } from './index';
import { WrapperUploadFiles } from './uploadButton/WrapperUpload';

export function ButtonImportVer2({ onImport, prevContent = 'First content', nameFile, clearTrick = 0, ...props }) {
  const { tCsv } = useContext(LanguageContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleCancelImport = () => {
    setSelectedFile(null);
  };

  const handleFileSelect = (file) => {
    handleCancelImport();
    setSelectedFile(file[0]);
  };
  useEffect(() => {
    if (selectedFile) {
      const newFile = new File([selectedFile], `${nameFile}.csv`, { type: `text/csv` });
      onImport(newFile);
    } else {
      onImport(null);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (clearTrick) {
      handleCancelImport();
    }
  }, [clearTrick]);
  return (
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
        dropzoneElement,
        clickable,
        openFileChooser,
        isDragging,
      }) => (
        <Flex gap='20px' justifyContent='space-between'>
          <Box lineHeight='30px' width='120px'>
            {prevContent}
          </Box>
          <Flex
            ref={dropzoneElement}
            cursor='pointer'
            width='calc(80% - 120px)'
            justify='center'
            border={BORDERS.border_1(COLORS.gray_700)}
            alignItems='center'
            position='relative'
            onClick={clickable === true ? openFileChooser : null}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            bg={isDragging ? COLORS.business : COLORS.white}
          >
            {selectedFile ? (
              <>
                <Text
                  color={COLORS.blue_primary}
                  textAlign='center'
                  width='80%'
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                >
                  {selectedFile.name}
                </Text>
                <Box
                  position='absolute'
                  right='20px'
                  zIndex='999'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancelImport();
                  }}
                >
                  <MdClear />
                </Box>
              </>
            ) : (
              <Text color={COLORS.neutral_300} textAlign='center'>
                {tCsv('drag_drop')}
              </Text>
            )}
          </Flex>
          <DHMButton
            onClick={clickable === true ? openFileChooser : null}
            buttonType='import'
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            isDragging={isDragging}
            {...props}
          />
        </Flex>
      )}
    />
  );
}
