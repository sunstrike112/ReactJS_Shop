import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button';
import DHMModal from 'dhm/components/Modal';
import { AppContext } from 'dhm/contexts/AppContext';
import LanguageContext, { currentLanguage } from 'dhm/contexts/TranslateContext';
import { ServiceImport } from 'dhm/store/import/services';
import { convertErrorsCsv } from 'dhm/utils/helpers/convert';
import { useContext, useState } from 'react';
import { CardImport } from './cardImport';
import { LIST_IMPORTS_BASIC_INFO } from './listImport';

export function ImportBasicInfo() {
  const { event } = ServiceImport();
  const { tKeyValidator, tCsv } = useContext(LanguageContext);
  const { heightApp } = useContext(AppContext);
  const { importAll } = event;
  const [files, setFiles] = useState({
    basic_info: null,
    basic_info_his: null,
    policy_and_progress: null,
    policy_and_progress_his: null,
    overview_info: null,
    overview_info_his: null,
    employee_success_axis: null,
    employee_success_axis_his: null,
    project_info: null,
    project_info_his: null,
    interview_log: null,
    interview_log_his: null,
  });
  const [listError, setListError] = useState({
    basic_info: [],
    basic_info_his: [],
    policy_and_progress: [],
    policy_and_progress_his: [],
    overview_info: [],
    overview_info_his: [],
    employee_success_axis: [],
    employee_success_axis_his: [],
    project_info: [],
    project_info_his: [],
    interview_log: [],
    interview_log_his: [],
  });
  const [clearTrick, setClearTrick] = useState(0);
  const resetAll = () => {
    setFiles({
      basic_info: null,
      basic_info_his: null,
      policy_and_progress: null,
      policy_and_progress_his: null,
      overview_info: null,
      overview_info_his: null,
      employee_success_axis: null,
      employee_success_axis_his: null,
      project_info: null,
      project_info_his: null,
      interview_log: null,
      interview_log_his: null,
    });
    setClearTrick(clearTrick + 1);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const {} = useContext(LanguageContext);
  const handleSetListFiles = (key, file) => {
    setFiles({
      ...files,
      [key]: file,
    });
  };

  const handleImportCsv = () => {
    setListError({});
    const onSuccess = () => {
      // callback();
    };
    const onFailed = (err) => {
      const listKeys = [
        'basic_info',
        'basic_info_his',
        'policy_and_progress',
        'policy_and_progress_his',
        'overview_info',
        'overview_info_his',
        'employee_success_axis',
        'employee_success_axis_his',
        'project_info',
        'project_info_his',
        'interview_log',
        'interview_log_his',
      ];
      if (Object.keys(err).length > 0 && Object.keys(err).some((key) => listKeys.includes(key))) {
        onOpen();
        Object.keys(err).forEach((key) => {
          const convertErr = convertErrorsCsv(err[key]);
          setListError((prev) => ({
            ...prev,
            [key]: convertErr,
          }));
        });
      }
    };
    const payload = {
      files,
      onSuccess,
      onFailed,
    };
    importAll(payload);
  };
  return (
    <>
      <Box paddingTop='20px'>
        <Flex
          flexDirection='column'
          justifyContent='space-between'
          width='100%'
          gap='30px'
          height={`calc(${heightApp} - 200px)`}
          overflow='auto'
          paddingTop='15px'
        >
          {LIST_IMPORTS_BASIC_INFO.map((item) => (
            <Box
              key={item.id}
              pointerEvents={item.status === 'disable' ? 'none' : 'auto'}
              opacity={item.status === 'disable' ? '0.3' : '1'}
            >
              <CardImport
                title={tCsv(item.title)}
                handleSetListFiles={handleSetListFiles}
                keyMain={item.keyPayloadMain}
                keyHistory={item.keyPayloadHistory}
                clearTrick={clearTrick}
              />
            </Box>
          ))}
        </Flex>
        <Flex gap='10px' justify='end' mt='20px'>
          <DHMButton text='cancel' buttonType='cancel' onClick={() => resetAll()} />
          <DHMButton
            text={tCsv('import')}
            onClick={() => {
              handleImportCsv();
              resetAll();
            }}
            isDisabled={Object.values(files).every((item) => !item)}
          />
        </Flex>
      </Box>
      <DHMModal title={tCsv('error_alert')} isOpen={isOpen} onClose={onClose} size='6xl' isShowClose>
        <Box height={`calc(${heightApp} - 300px)`} overflow='auto'>
          <Text fontWeight='bold' fontSize='14px' mb='15px'>
            {tCsv('cannot_import')}
          </Text>
          <Text textAlign='end' color='red.600' fontWeight='500'>
            {tCsv('total')} {Object.keys(listError).length}
          </Text>
          <Accordion defaultIndex={[0]} allowMultiple>
            {Object.keys(listError).map((key) => (
              <AccordionItem key={key}>
                <AccordionButton>
                  <Flex width='100%'>
                    <Box flex='1' textAlign='left'>
                      {tKeyValidator(key)}
                    </Box>
                    <Box color='red.600'>
                      {listError[key].length} {tCsv('error_alert')}
                    </Box>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {listError[key].map(
                    (item, index) =>
                      item.codes[0]?.includes('DHM_COM_E_DHM_COM_S_IMPORT_FILE_FAIL') && (
                        <Box key={index} color='red.500' mb='10px'>
                          {item.messages}
                        </Box>
                      ),
                  )}
                  <Table variant='simple'>
                    <Thead>
                      <Tr>
                        <Th width={currentLanguage('jp') ? '80px' : '170px'}>{tCsv('number_of_line')}</Th>
                        <Th minWidth='80px'>{tCsv('column_name')}</Th>
                        <Th>{tCsv('error_content')}</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {listError[key].map((item, index) =>
                        item.codes[0]?.includes('DHM_COM_E_DHM_COM_S_IMPORT_FILE_FAIL') ? (
                          <Tr key={index}>
                            <Td>-</Td>
                            <Td>-</Td>
                            <Td>-</Td>
                          </Tr>
                        ) : (
                          <Tr key={index}>
                            <Td width='80px'>{+item.line || '--'}</Td>
                            {+item.line ? (
                              <Td>
                                {item.codes.map((code, idx) => (
                                  <Box key={idx} color='red.500'>
                                    {code?.includes('DHM_COM_E') ? '--' : code}
                                  </Box>
                                ))}
                              </Td>
                            ) : (
                              <Td>--</Td>
                            )}

                            <Td>
                              {item.messages.map((code, idx) => (
                                <Box key={idx} color='red.500'>
                                  {code}
                                </Box>
                              ))}
                            </Td>
                          </Tr>
                        ),
                      )}
                    </Tbody>
                  </Table>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </DHMModal>
    </>
  );
}
