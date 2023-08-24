import { QuestionIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  IconButton,
  Img,
  Radio,
  RadioGroup,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { DHMButton } from 'dhm/components/Button';
import { InputFormDate } from 'dhm/components/Form/elements/Date2';
import DHMModal from 'dhm/components/Modal';
import { WrapperForm } from 'dhm/containers/auth/styled';
import { AppContext } from 'dhm/contexts/AppContext';
import LanguageContext, { currentLanguage } from 'dhm/contexts/TranslateContext';
import { ServiceOvertime } from 'dhm/store/overtime/services';
import { LIST_MONTH_FISCAL_YEAR, YEAR_RANGE } from 'dhm/utils/constants/select';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { convertErrorsCsv } from 'dhm/utils/helpers/convert';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { RegisterOvertime } from './RegisterOvertime';
import { CardImport } from './cardImport';

const WrapperFlex = styled(Flex)`
  .react-datepicker {
    position: relative;
  }
  .react-datepicker__month-container,
  .react-datepicker__year {
    width: 200px;
  }
  .react-datepicker__year-wrapper,
  .react-datepicker__month-wrapper {
    justify-content: center;
    margin: 0 auto;
  }
  .react-datepicker__navigation--next,
  .react-datepicker__navigation--previous {
    position: absolute;
    top: 7px;
  }
`;

export function ImportOvertime() {
  const { heightApp } = useContext(AppContext);
  const { confirmOvertime, importOvertimeAction, clearConfirmOvertimeImportAction } = ServiceOvertime();
  const { tKeyValidator, tCsv, tForm } = useContext(LanguageContext);
  const methods = useForm({
    mode: 'onChange',
  });
  const {
    getValues,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = methods;
  const [files, setFiles] = useState({ overtime: null });
  const [importTarget, setImportTarget] = useState('year');
  const [listError, setListError] = useState({ overtime: [] });
  const [clearTrick, setClearTrick] = useState(0);

  const clearData = () => {
    setFiles({
      overtime: null,
    });
    setImportTarget('year');
    setValue('year', null);
    setClearTrick(clearTrick + 1);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenConfirmModal, onOpen: onOpenConfirmModal, onClose: onCloseConfirmModal } = useDisclosure();
  const {
    isOpen: isOpenOvertimeSetting,
    onOpen: onOpenOvertimeSetting,
    onClose: onCloseOvertimeSetting,
  } = useDisclosure();
  const handleSetListFiles = (key, file) => {
    setFiles({
      ...files,
      [key]: file,
    });
  };
  const onSubmit = useCallback(() => {
    setListError({});
    const onSuccess = () => {};
    const onFailed = (err) => {
      const listKeys = ['overtime'];
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
    const [fiscalYear, valueMonth] = formatDateJP(getValues().year).split('/');
    const payload = {
      files,
      fiscalYear,
      valueMonth:
        importTarget === 'month'
          ? LIST_MONTH_FISCAL_YEAR.find((item) => Number(item.month) === Number(valueMonth)).value
          : null,
      importTarget,
      checkDuplicate: false,
      onSuccess,
      onFailed,
    };
    importOvertimeAction(payload);
  }, [getValues, files, importTarget, confirmOvertime]);

  const onConfirmSubmit = () => {
    setListError({});
    const onSuccess = () => {};
    const onFailed = (err) => {
      const listKeys = ['overtime'];
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
    const [fiscalYear, valueMonth] = formatDateJP(getValues().year).split('/');
    const payload = {
      files,
      fiscalYear,
      valueMonth:
        importTarget === 'month'
          ? LIST_MONTH_FISCAL_YEAR.find((item) => Number(item.month) === Number(valueMonth)).value
          : null,
      importTarget,
      checkDuplicate: true,
      onSuccess,
      onFailed,
    };
    importOvertimeAction(payload);
  };
  useEffect(() => {
    if (confirmOvertime.code === 'DHM_OVERTIME_CONFIRM') {
      onOpenConfirmModal();
    }
  }, [confirmOvertime]);

  const handleCancelConfirmModal = () => {
    clearConfirmOvertimeImportAction();
    onCloseConfirmModal();
  };
  const handleSubmitConfirmModal = () => {
    onConfirmSubmit();
    onCloseConfirmModal();
  };

  return (
    <>
      <FormProvider {...methods}>
        <WrapperForm onSubmit={handleSubmit(() => {})}>
          <Box position='relative'>
            <IconButton
              position='absolute'
              right='10px'
              top='20px'
              icon={<Img src={DHMAssets.ICON_SETTING} />}
              onClick={onOpenOvertimeSetting}
              background='transparent'
              size='sm'
            />
            <WrapperFlex
              flexDirection='column'
              width='100%'
              gap='10px'
              height='calc(98vh - 200px)'
              overflow='auto'
              paddingTop='15px'
            >
              <Flex mb='20px'>
                <Box fontWeight={500} mr='10px'>
                  {tCsv('import_target')}
                </Box>
                <RadioGroup value={importTarget} onChange={setImportTarget}>
                  <Flex alignItems='flex-start' gap='10px' flexFlow='wrap'>
                    <Radio size='lg' border={BORDERS.border_1(COLORS.black_second)} value='year'>
                      {tCsv('select_year')}
                    </Radio>
                    <Radio size='lg' border={BORDERS.border_1(COLORS.black_second)} value='month'>
                      {tCsv('select_month')}
                    </Radio>
                  </Flex>
                </RadioGroup>
              </Flex>
              <Box width='200px'>
                <InputFormDate
                  width='150px'
                  borderColor={COLORS.gray_700}
                  name='year'
                  label={tCsv('year')}
                  dateFormat={importTarget === 'year' ? 'yyyy' : 'yyyy/MM'}
                  methods={methods}
                  minDate={new Date(YEAR_RANGE.MIN)}
                  max={new Date(YEAR_RANGE.MAX)}
                  showYearPicker={importTarget === 'year'}
                  typeShow={importTarget === 'month' && importTarget}
                  showIcon
                />
              </Box>
              <CardImport handleSetListFiles={handleSetListFiles} keyMain='overtime' clearTrick={clearTrick} />
            </WrapperFlex>
            <Flex gap='10px' justify='end' mt='20px'>
              <DHMButton text='cancel' buttonType='cancel' onClick={() => clearData()} />
              <DHMButton
                text={tCsv('import')}
                type='submit'
                onClick={() => {
                  onSubmit();
                }}
                isDisabled={Object.values(files).every((item) => !item) || !isValid}
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
        </WrapperForm>
      </FormProvider>
      {confirmOvertime.code === 'DHM_OVERTIME_CONFIRM' && (
        <DHMModal
          title={tForm('confirm')}
          prevIcon={<QuestionIcon mr='5px' />}
          isOpen={confirmOvertime.code === 'DHM_OVERTIME_CONFIRM' && isOpenConfirmModal}
          onCancel={onCloseConfirmModal}
          titleProps={{ textAlign: 'center' }}
          typeHeader='delete'
          content={() => (
            <>
              <Text>{confirmOvertime.message}</Text>
              <Flex mt={4} gap='10px' justifyContent='end'>
                <DHMButton onClick={handleCancelConfirmModal} text={tForm('cancel')} buttonType='cancel' />
                <DHMButton
                  onClick={handleSubmitConfirmModal}
                  text={tForm('confirm')}
                  buttonType='yesDelete'
                  autoFocus
                />
              </Flex>
            </>
          )}
        />
      )}
      <RegisterOvertime
        isOpen={isOpenOvertimeSetting}
        onOpen={onOpenOvertimeSetting}
        onClose={onCloseOvertimeSetting}
      />
    </>
  );
}
