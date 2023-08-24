import { Box, Flex, Modal, ModalBody, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { convertToCurrentTime } from 'dhm/utils/helpers/convert';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { useContext } from 'react';

export function ModalHistoryFile({ isOpen, onClose, listFileVersion }) {
  const { tFileUpload } = useContext(LanguageContext);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='6xl' isCentered>
        <ModalOverlay />
        <ModalContent borderRadius='0px'>
          <ModalBody p='0px'>
            {listFileVersion.length !== 0 && (
              <Flex flexDirection='column' gap='15px' height='100%' border={BORDERS.border_1(COLORS.gray_700)}>
                <Flex flexDirection='column' height='100%'>
                  <Box bg={COLORS.white} border={BORDERS.border_1(COLORS.gray_700)}>
                    <Flex justify='space-between'>
                      <Flex p='5px 20px' width='40%'>
                        {tFileUpload('fileName')}
                      </Flex>
                      <Flex p='5px' justify='center' width='20%' borderLeft={BORDERS.border_1(COLORS.gray_700)}>
                        {tFileUpload('size')}
                      </Flex>
                      <Flex p='5px' justify='center' width='30%' borderLeft={BORDERS.border_1(COLORS.gray_700)}>
                        {tFileUpload('lastUpdateDate')}
                      </Flex>
                    </Flex>
                  </Box>
                  <Box
                    pt='5px'
                    height='100%'
                    maxHeight='270px'
                    overflow='auto'
                    bg={COLORS.white}
                    borderLeft={BORDERS.border_1(COLORS.gray_700)}
                    borderRight={BORDERS.border_1(COLORS.gray_700)}
                    borderBottom={BORDERS.border_1(COLORS.gray_700)}
                  >
                    <Text ml={4}> {listFileVersion.length && listFileVersion[0].fileName}</Text>
                    {listFileVersion.length !== 0 &&
                      listFileVersion.map((file, index) => (
                        <Flex key={index} justify='space-between' gap='15px' ml={4}>
                          <Flex width='40%' p='5px 20px'>
                            リーバージョン #{listFileVersion.length - index}
                            {index === 0 ? ` (${tFileUpload('current')})` : null}
                          </Flex>
                          <Flex width='20%' p='5px 20px' justifyContent='center'>
                            {Math.ceil(file.size / 1024)} kB
                          </Flex>
                          <Flex width='30%' justifyContent='center'>
                            {formatDateJP(convertToCurrentTime(file.updatedDateTime), 'fulltime')}
                          </Flex>
                        </Flex>
                      ))}
                  </Box>
                </Flex>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
