/* eslint-disable no-await-in-loop */
import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
import { AppContext } from 'dhm/contexts/AppContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServiceFileUpload } from 'dhm/store/fileUpload/services';
import { FILE_UPLOAD_JP, MODE_UPLOAD, TYPE_FILE_UPLOAD } from 'dhm/utils/constants/type';
import { clearFileInput, extractEmployeeId } from 'dhm/utils/helpers/method';
import { BORDERS, COLORS } from 'dhm/utils/index';
import cloneDeep from 'lodash/cloneDeep';
import { useContext, useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import styled from 'styled-components';
import { UploadMultiFile } from './component/UploadMultiFile';

const WrapperFlex = styled(Flex)`
  .select-employeeId-pre__control {
    width: 200px;
    border-radius: 0px;
    border: ${BORDERS.border_1(COLORS.gray_700)};
  }
  .chakra-collapse {
    margin-top: -20px;
  }
  .chakra-accordion__button:hover {
    background: ${COLORS.gray_800};
  }
`;

export function FileUpload() {
  const { tFileUpload, tCsv, tForm } = useContext(LanguageContext);
  const { heightApp } = useContext(AppContext);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({
    employeePic: [],
    resume: [],
    workHistory: [],
  });
  const [importTarget, setImportTarget] = useState(MODE_UPLOAD.INDIVIDUAL);

  const {
    listAllFile,
    loadingListEmployeeId,
    LIST_EMPLOYEE_ID,
    OPTION_EMPLOYEE_ID,
    getListEmployeeIdAction,
    getListAllFileAction,
    uploadFileByEmployeeIdAction,
  } = ServiceFileUpload();

  const arrayEmployeeId = {
    employeePic: selectedFiles.employeePic.map((item) =>
      extractEmployeeId(item.name, FILE_UPLOAD_JP.EMPLOYEE_PIC_PREFIX),
    ),
    resume: selectedFiles.resume.map((item) => extractEmployeeId(item.name, FILE_UPLOAD_JP.RESUME_PREFIX)),
    workHistory: selectedFiles.workHistory.map((item) =>
      extractEmployeeId(item.name, FILE_UPLOAD_JP.WORK_HISTORY_PREFIX),
    ),
  };

  const handleFileChange = (event, typeUpload) => {
    const files = Array.from(event.target.files);
    let updatedFiles = [];

    switch (typeUpload) {
      case TYPE_FILE_UPLOAD.EMPLOYEE_PIC:
        updatedFiles = cloneDeep(selectedFiles.employeePic);
        break;
      case TYPE_FILE_UPLOAD.RESUME:
        updatedFiles = cloneDeep(selectedFiles.resume);
        break;
      default:
        updatedFiles = cloneDeep(selectedFiles.workHistory);
        break;
    }

    files.forEach((newFile) => {
      const existingFileIndex = updatedFiles.findIndex((file) => file.name === newFile.name);
      if (existingFileIndex !== -1) {
        updatedFiles[existingFileIndex] = newFile;
      } else {
        updatedFiles.push(newFile);
      }
    });

    switch (typeUpload) {
      case TYPE_FILE_UPLOAD.EMPLOYEE_PIC:
        setSelectedFiles({
          ...selectedFiles,
          employeePic: updatedFiles,
        });
        break;
      case TYPE_FILE_UPLOAD.RESUME:
        setSelectedFiles({
          ...selectedFiles,
          resume: updatedFiles,
        });
        break;
      default:
        setSelectedFiles({
          ...selectedFiles,
          workHistory: updatedFiles,
        });
        break;
    }
    event.target.files = null;
  };

  const handleDrop = (event, typeUpload) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    let updatedFiles = [];

    switch (typeUpload) {
      case TYPE_FILE_UPLOAD.EMPLOYEE_PIC:
        updatedFiles = cloneDeep(selectedFiles.employeePic);
        break;
      case TYPE_FILE_UPLOAD.RESUME:
        updatedFiles = cloneDeep(selectedFiles.resume);
        break;
      default:
        updatedFiles = cloneDeep(selectedFiles.workHistory);
        break;
    }

    files.forEach((newFile) => {
      const existingFileIndex = updatedFiles.findIndex((file) => file.name === newFile.name);
      if (existingFileIndex !== -1) {
        updatedFiles[existingFileIndex] = newFile;
      } else {
        updatedFiles.push(newFile);
      }
    });

    switch (typeUpload) {
      case TYPE_FILE_UPLOAD.EMPLOYEE_PIC:
        setSelectedFiles({
          ...selectedFiles,
          employeePic: updatedFiles,
        });
        break;
      case TYPE_FILE_UPLOAD.RESUME:
        setSelectedFiles({
          ...selectedFiles,
          resume: updatedFiles,
        });
        break;
      default:
        setSelectedFiles({
          ...selectedFiles,
          workHistory: updatedFiles,
        });
        break;
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClear = () => {
    setSelectedFiles({
      employeePic: [],
      resume: [],
      workHistory: [],
    });
    clearFileInput(document.getElementById(`${TYPE_FILE_UPLOAD.EMPLOYEE_PIC}`));
    clearFileInput(document.getElementById(`${TYPE_FILE_UPLOAD.RESUME}`));
    clearFileInput(document.getElementById(`${TYPE_FILE_UPLOAD.WORK_HISTORY}`));
  };

  const handleDeleteFile = (indexToRemove, typeUpload) => {
    switch (typeUpload) {
      case TYPE_FILE_UPLOAD.EMPLOYEE_PIC:
        setSelectedFiles({
          ...selectedFiles,
          employeePic: cloneDeep(selectedFiles.employeePic).filter((item, index) => index !== indexToRemove),
        });
        clearFileInput(document.getElementById(`${typeUpload}`));
        break;
      case TYPE_FILE_UPLOAD.RESUME:
        setSelectedFiles({
          ...selectedFiles,
          resume: cloneDeep(selectedFiles.resume).filter((item, index) => index !== indexToRemove),
        });
        clearFileInput(document.getElementById(`${typeUpload}`));
        break;
      default:
        setSelectedFiles({
          ...selectedFiles,
          workHistory: cloneDeep(selectedFiles.workHistory).filter((item, index) => index !== indexToRemove),
        });
        clearFileInput(document.getElementById(`${typeUpload}`));
        break;
    }
  };

  const handleUploadFile = async () => {
    const uploadFile = async (file, employeeId, index = 0) => {
      if (file.length > 0) {
        await new Promise((resolve) => {
          uploadFileByEmployeeIdAction({
            data: { file: file[index] },
            employeeId,
            onSuccess: resolve,
          });
        });
      }
    };

    if (importTarget === MODE_UPLOAD.INDIVIDUAL) {
      await uploadFile(selectedFiles.employeePic, selectedEmployeeId);
      clearFileInput(document.getElementById(`${TYPE_FILE_UPLOAD.EMPLOYEE_PIC}`));
      await uploadFile(selectedFiles.resume, selectedEmployeeId);
      clearFileInput(document.getElementById(`${TYPE_FILE_UPLOAD.RESUME}`));
      await uploadFile(selectedFiles.workHistory, selectedEmployeeId);
      clearFileInput(document.getElementById(`${TYPE_FILE_UPLOAD.WORK_HISTORY}`));
    } else {
      for (let i = 0; i < arrayEmployeeId.employeePic.length; i++) {
        await new Promise((resolve) => {
          uploadFileByEmployeeIdAction({
            data: { file: selectedFiles.employeePic[i] },
            employeeId: arrayEmployeeId.employeePic[i],
            onSuccess: () => resolve(),
          });
        });
      }
      clearFileInput(document.getElementById(`${TYPE_FILE_UPLOAD.EMPLOYEE_PIC}`));
      for (let i = 0; i < arrayEmployeeId.resume.length; i++) {
        await new Promise((resolve) => {
          uploadFileByEmployeeIdAction({
            data: { file: selectedFiles.resume[i] },
            employeeId: arrayEmployeeId.resume[i],
            onSuccess: () => resolve(),
          });
        });
      }
      clearFileInput(document.getElementById(`${TYPE_FILE_UPLOAD.RESUME}`));
      for (let i = 0; i < arrayEmployeeId.workHistory.length; i++) {
        await new Promise((resolve) => {
          uploadFileByEmployeeIdAction({
            data: { file: selectedFiles.workHistory[i] },
            employeeId: arrayEmployeeId.workHistory[i],
            onSuccess: () => resolve(),
          });
        });
      }
      clearFileInput(document.getElementById(`${TYPE_FILE_UPLOAD.WORK_HISTORY}`));
    }
    getListAllFileAction();
    setSelectedFiles({
      employeePic: [],
      resume: [],
      workHistory: [],
    });
  };

  const listPreferenceFile = selectedEmployeeId
    ? {
        employeePic: listAllFile.filter(
          (item) => item.fileName.startsWith(FILE_UPLOAD_JP.EMPLOYEE_PIC) && item.fileName.includes(selectedEmployeeId),
          // selectedEmployeeId === extractEmployeeId(item.fileName, FILE_UPLOAD_JP.EMPLOYEE_PIC_PREFIX),
        ),
        resume: listAllFile.filter(
          (item) => item.fileName.startsWith(FILE_UPLOAD_JP.RESUME) && item.fileName.includes(selectedEmployeeId),
          // selectedEmployeeId === extractEmployeeId(item.fileName, FILE_UPLOAD_JP.RESUME_PREFIX),
        ),
        workHistory: listAllFile.filter(
          (item) => item.fileName.startsWith(FILE_UPLOAD_JP.WORK_HISTORY) && item.fileName.includes(selectedEmployeeId),
          // selectedEmployeeId === extractEmployeeId(item.fileName, FILE_UPLOAD_JP.WORK_HISTORY_PREFIX),
        ),
      }
    : {
        employeePic: listAllFile.filter((item) => item.fileName.startsWith(FILE_UPLOAD_JP.EMPLOYEE_PIC)),
        resume: listAllFile.filter((item) => item.fileName.startsWith(FILE_UPLOAD_JP.RESUME)),
        workHistory: listAllFile.filter((item) => item.fileName.startsWith(FILE_UPLOAD_JP.WORK_HISTORY)),
      };

  const listFileLocal = {
    employeePic: selectedFiles.employeePic.map((item) => ({
      name: item.name,
      isError:
        !item.name.endsWith(FILE_UPLOAD_JP.JPG_FILE) ||
        !item.name.startsWith(FILE_UPLOAD_JP.EMPLOYEE_PIC) ||
        !LIST_EMPLOYEE_ID.includes(extractEmployeeId(item.name, FILE_UPLOAD_JP.EMPLOYEE_PIC_PREFIX)) ||
        (importTarget === MODE_UPLOAD.INDIVIDUAL &&
          extractEmployeeId(item.name, FILE_UPLOAD_JP.EMPLOYEE_PIC_PREFIX) !== selectedEmployeeId),
    })),
    resume: selectedFiles.resume.map((item) => ({
      name: item.name,
      isError:
        !item.name.endsWith(FILE_UPLOAD_JP.PDF_FILE) ||
        !item.name.startsWith(FILE_UPLOAD_JP.RESUME) ||
        !LIST_EMPLOYEE_ID.includes(extractEmployeeId(item.name, FILE_UPLOAD_JP.RESUME_PREFIX)) ||
        (importTarget === MODE_UPLOAD.INDIVIDUAL &&
          extractEmployeeId(item.name, FILE_UPLOAD_JP.RESUME_PREFIX) !== selectedEmployeeId),
    })),
    workHistory: selectedFiles.workHistory.map((item) => ({
      name: item.name,
      isError:
        !item.name.endsWith(FILE_UPLOAD_JP.PDF_FILE) ||
        !item.name.startsWith(FILE_UPLOAD_JP.WORK_HISTORY) ||
        !LIST_EMPLOYEE_ID.includes(extractEmployeeId(item.name, FILE_UPLOAD_JP.WORK_HISTORY_PREFIX)) ||
        (importTarget === MODE_UPLOAD.INDIVIDUAL &&
          extractEmployeeId(item.name, FILE_UPLOAD_JP.WORK_HISTORY_PREFIX) !== selectedEmployeeId),
    })),
  };

  const listErrors = {
    employeePic: {
      isFileTypeDifferent: selectedFiles.employeePic.map((item) => !item.name.endsWith(FILE_UPLOAD_JP.JPG_FILE)),
      isFileNameDifferent: selectedFiles.employeePic.map((item) => !item.name.startsWith(FILE_UPLOAD_JP.EMPLOYEE_PIC)),
      isEmployeeNotMatch:
        importTarget === MODE_UPLOAD.INDIVIDUAL
          ? selectedFiles.employeePic.map(
              (item) => extractEmployeeId(item.name, FILE_UPLOAD_JP.EMPLOYEE_PIC_PREFIX) !== selectedEmployeeId,
            )
          : [false],
      isEmployeeNotFound: selectedFiles.employeePic.map(
        (item) => !LIST_EMPLOYEE_ID.includes(extractEmployeeId(item.name, FILE_UPLOAD_JP.EMPLOYEE_PIC_PREFIX)),
      ),
    },
    resume: {
      isFileTypeDifferent: selectedFiles.resume.map((item) => !item.name.endsWith(FILE_UPLOAD_JP.PDF_FILE)),
      isFileNameDifferent: selectedFiles.resume.map((item) => !item.name.startsWith(FILE_UPLOAD_JP.RESUME)),
      isEmployeeNotMatch:
        importTarget === MODE_UPLOAD.INDIVIDUAL
          ? selectedFiles.resume.map(
              (item) => extractEmployeeId(item.name, FILE_UPLOAD_JP.RESUME_PREFIX) !== selectedEmployeeId,
            )
          : [false],
      isEmployeeNotFound: selectedFiles.resume.map(
        (item) => !LIST_EMPLOYEE_ID.includes(extractEmployeeId(item.name, FILE_UPLOAD_JP.RESUME_PREFIX)),
      ),
    },
    workHistory: {
      isFileTypeDifferent: selectedFiles.workHistory.map((item) => !item.name.endsWith(FILE_UPLOAD_JP.PDF_FILE)),
      isFileNameDifferent: selectedFiles.workHistory.map((item) => !item.name.startsWith(FILE_UPLOAD_JP.WORK_HISTORY)),
      isEmployeeNotMatch:
        importTarget === MODE_UPLOAD.INDIVIDUAL
          ? selectedFiles.workHistory.map(
              (item) => extractEmployeeId(item.name, FILE_UPLOAD_JP.WORK_HISTORY_PREFIX) !== selectedEmployeeId,
            )
          : [false],
      isEmployeeNotFound: selectedFiles.workHistory.map(
        (item) => !LIST_EMPLOYEE_ID.includes(extractEmployeeId(item.name, FILE_UPLOAD_JP.WORK_HISTORY_PREFIX)),
      ),
    },
  };

  const isDisableUploadFile = () => {
    if (importTarget === MODE_UPLOAD.INDIVIDUAL && !selectedEmployeeId) return true;
    if (
      selectedFiles.employeePic.length === 0 &&
      selectedFiles.resume.length === 0 &&
      selectedFiles.workHistory.length === 0
    )
      return true;
    if (
      listFileLocal.employeePic.map((item) => item.isError).includes(true) ||
      listFileLocal.resume.map((item) => item.isError).includes(true) ||
      listFileLocal.workHistory.map((item) => item.isError).includes(true)
    )
      return true;
    return false;
  };

  const handleSelectEmployeeId = (employeeIdSelect) => {
    setSelectedEmployeeId(employeeIdSelect.value);
  };

  useEffect(() => {
    getListEmployeeIdAction();
  }, []);

  useEffect(() => {
    if (importTarget === MODE_UPLOAD.ALL) getListAllFileAction();
    if (importTarget === MODE_UPLOAD.ALL) setSelectedEmployeeId(null);
    handleClear();
  }, [importTarget]);

  useEffect(() => {
    if (selectedEmployeeId) getListAllFileAction();
  }, [selectedEmployeeId]);

  return (
    <>
      <Flex flexDirection='column' height={`calc(${heightApp} - 180px)`} overflow='auto'>
        <Flex justify='space-between' m='0px 15px 25px'>
          <Flex alignItems='center' height='50px'>
            <Box fontWeight={500} mr='50px'>
              {tFileUpload('upload_mode')}
            </Box>
            <RadioGroup value={importTarget} onChange={setImportTarget}>
              <Flex alignItems='flex-start' gap='40px' flexFlow='wrap'>
                <Radio size='lg' border={BORDERS.border_1(COLORS.black_second)} value={MODE_UPLOAD.ALL}>
                  {tFileUpload('all')}
                </Radio>
                <Radio size='lg' border={BORDERS.border_1(COLORS.black_second)} value={MODE_UPLOAD.INDIVIDUAL}>
                  {tFileUpload('individual')}
                </Radio>
              </Flex>
            </RadioGroup>
          </Flex>
          {importTarget === MODE_UPLOAD.INDIVIDUAL && (
            <Flex width='420px' alignItems='center' justify='flex-end' height='50px'>
              <Box fontWeight={500} mr='10px' width='100px'>
                {tFileUpload('employeeID')}
              </Box>
              <WrapperFlex width='200px'>
                <ReactSelect
                  className='select-employeeId'
                  classNamePrefix='select-employeeId-pre'
                  options={OPTION_EMPLOYEE_ID}
                  onChange={(employeeIdSelect) => handleSelectEmployeeId(employeeIdSelect)}
                  placeholder=''
                  noOptionsMessage={() => tForm('noData')}
                  loadingMessage={() => tForm('loading')}
                  isLoading={loadingListEmployeeId}
                />
              </WrapperFlex>
              {OPTION_EMPLOYEE_ID.length !== 0 && selectedEmployeeId && (
                <Box ml='10px'>
                  {OPTION_EMPLOYEE_ID.find((option) => option.value === selectedEmployeeId).employeeName}
                </Box>
              )}
            </Flex>
          )}
        </Flex>

        <WrapperFlex flexDirection='column' px='15px' gap='30px'>
          <Accordion allowMultiple>
            <AccordionItem border='none' mb={2}>
              <Flex pl={5}>
                <AccordionButton width='190px' bg={COLORS.gray_800} color={COLORS.white} zIndex={999}>
                  <Box
                    as='span'
                    flex='1'
                    textAlign='left'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    {tFileUpload('employeePIC')}
                    <AccordionIcon />
                  </Box>
                </AccordionButton>
              </Flex>
              <AccordionPanel p={0} pb={4}>
                <UploadMultiFile
                  title={tFileUpload('employeePIC')}
                  employeeId={selectedEmployeeId}
                  importTarget={importTarget}
                  typeUpload={TYPE_FILE_UPLOAD.EMPLOYEE_PIC}
                  listPreferenceFile={listPreferenceFile.employeePic}
                  listFile={listFileLocal.employeePic}
                  listError={listErrors.employeePic}
                  handleClear={handleClear}
                  handleDeleteFile={handleDeleteFile}
                  handleFileChange={handleFileChange}
                  handleDrop={handleDrop}
                  handleDragOver={handleDragOver}
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem border='none' mb={2}>
              <Flex pl={5}>
                <AccordionButton width='190px' bg={COLORS.gray_800} color={COLORS.white} zIndex={999}>
                  <Box
                    as='span'
                    flex='1'
                    textAlign='left'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    {tFileUpload('resume')}
                    <AccordionIcon />
                  </Box>
                </AccordionButton>
              </Flex>
              <AccordionPanel p={0} pb={4}>
                <UploadMultiFile
                  title={tFileUpload('resume')}
                  employeeId={selectedEmployeeId}
                  importTarget={importTarget}
                  typeUpload={TYPE_FILE_UPLOAD.RESUME}
                  listPreferenceFile={listPreferenceFile.resume}
                  listFile={listFileLocal.resume}
                  listError={listErrors.resume}
                  handleClear={handleClear}
                  handleDeleteFile={handleDeleteFile}
                  handleFileChange={handleFileChange}
                  handleDrop={handleDrop}
                  handleDragOver={handleDragOver}
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem border='none' mb={2}>
              <Flex pl={5}>
                <AccordionButton width='190px' bg={COLORS.gray_800} color={COLORS.white} zIndex={999}>
                  <Box
                    as='span'
                    flex='1'
                    textAlign='left'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    {tFileUpload('workHistory')}
                    <AccordionIcon />
                  </Box>
                </AccordionButton>
              </Flex>
              <AccordionPanel p={0} pb={4}>
                <UploadMultiFile
                  title={tFileUpload('workHistory')}
                  employeeId={selectedEmployeeId}
                  importTarget={importTarget}
                  typeUpload={TYPE_FILE_UPLOAD.WORK_HISTORY}
                  listPreferenceFile={listPreferenceFile.workHistory}
                  listFile={listFileLocal.workHistory}
                  listError={listErrors.workHistory}
                  handleClear={handleClear}
                  handleDeleteFile={handleDeleteFile}
                  handleFileChange={handleFileChange}
                  handleDrop={handleDrop}
                  handleDragOver={handleDragOver}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </WrapperFlex>
      </Flex>
      <Flex gap='10px' justify='end' mt='20px'>
        <CloseButton handleClose={() => handleClear()} />
        <DHMButton
          text={tCsv('import')}
          type='button'
          onClick={() => handleUploadFile()}
          isDisabled={isDisableUploadFile()}
        />
      </Flex>
    </>
  );
}
