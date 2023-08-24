import { Box, Flex, Text } from '@chakra-ui/react';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { useContext, useEffect, useState } from 'react';
import { MdClear } from 'react-icons/md';

export function ButtonImportOvertime({ onImport, clearTrick = 0 }) {
  const { tCsv } = useContext(LanguageContext);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleCancelImport = () => {
    setSelectedFile(null);
  };
  const handleDrop = (event) => {
    handleCancelImport();
    event.preventDefault();
    setIsDragging(false);
    const { files } = event.dataTransfer;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleFileSelect = (event) => {
    handleCancelImport();
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      const newFile = new File([selectedFile], `${selectedFile.name}`, { type: `text/csv` });
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
    <Flex gap='20px' justifyContent='space-between'>
      <Flex
        cursor='pointer'
        width='100%'
        height='100px'
        justify='center'
        border={BORDERS.border_dashed_2(COLORS.master_primary)}
        alignItems='center'
        onClick={() => {
          handleCancelImport();
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.csv';
          input.addEventListener('change', handleFileSelect);
          input.click();
        }}
        position='relative'
        onDrop={handleDrop}
        onDragOver={handleDragOver}
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
            {tCsv('drag_drop_overtime')}
          </Text>
        )}
      </Flex>
    </Flex>
  );
}
