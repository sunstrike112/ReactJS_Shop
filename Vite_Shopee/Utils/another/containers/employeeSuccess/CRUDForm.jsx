/* eslint-disable no-prototype-builtins */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { Box, Checkbox, Divider, Flex, Grid, Radio, RadioGroup, Select, useDisclosure } from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
import { InputForm } from 'dhm/components/Form/elements/Text';
import { TextareaForm } from 'dhm/components/Form/elements/Textarea';
import { ApproveModal } from 'dhm/components/Modal/elements/approveModal';
import { WrapperForm } from 'dhm/containers/auth/styled';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import { AppContext } from 'dhm/contexts/AppContext';
import { ServiceEmployeeSuccess } from 'dhm/store/employeeSuccess/services';
import {
  DEFAULT_SELECTED_VALUES,
  LIST_ROLES,
  LIST_ROLES_POSITION,
  keyMapping,
} from 'dhm/utils/constants/employeeSuccess';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { isCanParse, isSameObj } from 'dhm/utils/helpers/condition';
import { convertToInputFormatEmployeeSuccess } from 'dhm/utils/helpers/convert';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { DeleteModal } from '../modal/DeleteModal';
import { HistoryEmployeeSuccess } from './HistoryTable';

const CustomChecked = styled(Checkbox)`
  .chakra-checkbox__control {
    width: 32px;
    height: 32px;
  }
`;

const WrapperFlex = styled(Flex)`
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${COLORS.gray_primary};
  }
`;

const renderCheckbox = {
  relationShips: '220px 450px auto',
  career: '365px 160px 145px auto',
  other: '220px 145px 160px 145px auto',
};
export function CRUDForm({
  modeForm = 'create',
  onClose = () => {},
  originData = {},
  callbackAction = () => {},
  modeFeature = 'origin',
  isEditing = false,
  setIsActiveForm = () => {},
  setParamsChildren = () => {},
  isActiveForm,
}) {
  const isViewWorkflow = modeFeature === 'workflow';
  const isEditWorkflow = ({ track = isEditing, other }) => (isViewWorkflow ? track : other);

  const { ID_KEY, canView, canEdit } = useContext(AbilityContext);
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();
  const { heightApp } = useContext(AppContext);
  const { dropdown } = useSelector((state) => state.common);
  const { JOB_CONTENT, RELATIONSHIP, CAREER, MONEY, WORKING_WAY, OTHERS } = dropdown;
  const LIST_CHECKBOXS = [
    {
      id: 1,
      title: '仕事内容',
      list: JOB_CONTENT,
      key: 'jobDescription',
      position: '① ',
    },
    {
      id: 2,
      title: '人間関係',
      list: RELATIONSHIP,
      key: 'relationShips',
      position: '② ',
    },
    {
      id: 3,
      title: 'キャリア',
      list: CAREER,
      key: 'career',
      position: '③ ',
    },
    {
      id: 4,
      title: 'お金',
      list: MONEY,
      key: 'money',
      position: '④ ',
    },
    {
      id: 5,
      title: '働き方',
      list: WORKING_WAY,
      key: 'workMethod',
      position: '⑤ ',
    },
    {
      id: 6,
      title: 'その他',
      list: OTHERS,
      key: 'otherSuccess',
      position: '⑥ ',
    },
  ];
  const { event, action } = ServiceEmployeeSuccess();
  const methods = useForm({
    defaultValues: { ...originData, kof: originData?.kof || '', otherKof: originData?.otherKof || '' },
    mode: 'onChange',
  });
  useEffect(() => {
    if (isViewWorkflow) {
      if (Object.keys(originData).length) {
        methods.reset({
          ...originData,
          kof: originData?.kof || '',
          otherKof: originData?.otherKof || '',
        });
      }
    }
  }, [originData]);
  const [selectedValues, setSelectedValues] = useState(DEFAULT_SELECTED_VALUES());

  const [checkboxValues, setCheckboxValues] = useState(() => ({
    jobDescription: '[]',
    relationShips: '[]',
    career: '[]',
    money: '[]',
    workMethod: '[]',
    otherSuccess: '[]',
  }));
  const [selectedEsStatus, setSelectedEsStatus] = useState('');
  const handleCheckboxChange = (itemId, value) => {
    const { key } = LIST_CHECKBOXS[itemId - 1];
    const testKey = checkboxValues[key];
    const trimmedTestKey = testKey.slice(1, -1);
    const parsedTestKey = trimmedTestKey.split(',');
    setCheckboxValues((prev) => {
      if (parsedTestKey.includes(value)) {
        const index = parsedTestKey.indexOf(value);
        if (index !== -1) {
          parsedTestKey.splice(index, 1);
        }
      } else {
        parsedTestKey.push(value);
      }
      const verifyParse = parsedTestKey.filter((item) => item !== '');
      return {
        ...prev,
        [key]: `[${verifyParse}]`,
      };
    });
  };
  const { formState } = methods;

  const handleSelectChange = (role, index, value) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [role]: {
        ...prevState[role],
        [index]: value,
      },
    }));
  };
  const onSuccess = () => {
    callbackAction();
    onClose();
  };
  function convertToDesiredFormat(input, listMap) {
    const result = {};

    for (const mapping of listMap) {
      const { id } = mapping;
      const hopeKey = mapping.hope;
      const currentKey = mapping.current;

      const hopeValue = input[id]['0'];
      const currentValue = input[id]['1'];

      result[hopeKey] = hopeValue;
      result[currentKey] = currentValue;
    }

    return result;
  }

  useEffect(() => {
    // Get default Selected Values
    const {
      jobDesptDesired,
      jobDetailsCurrentStatus,
      humanRelationsHope,
      humanRelationsCurrentSituation,
      careerPreferred,
      careerCurrent,
      moneyHope,
      moneyCurrent,
      workStyleHope,
      workStyleCurrentSituation,
    } = originData;
    const inputObj = {
      jobDesptDesired,
      jobDetailsCurrentStatus,
      humanRelationsHope,
      humanRelationsCurrentSituation,
      careerPreferred,
      careerCurrent,
      moneyHope,
      moneyCurrent,
      workStyleHope,
      workStyleCurrentSituation,
    };
    const getDefaultSelectedValues = convertToInputFormatEmployeeSuccess(inputObj, keyMapping);
    setSelectedValues(getDefaultSelectedValues);
    // Get default esStatus
    setSelectedEsStatus(originData.esStatus);
    // Get default checkbox values
    const verifyArray = (value) => {
      if (typeof value === 'string') {
        return value;
      }
      return '[]';
    };
    const defaultCheckbox = {
      jobDescription: verifyArray(isCanParse(originData.jobDescription)) || '[]',
      relationShips: verifyArray(isCanParse(originData.relationShips)) || '[]',
      career: verifyArray(isCanParse(originData.career)) || '[]',
      money: verifyArray(isCanParse(originData.money)) || '[]',
      workMethod: verifyArray(isCanParse(originData.workMethod)) || '[]',
      otherSuccess: verifyArray(isCanParse(originData.otherSuccess)) || '[]',
    };
    setCheckboxValues(defaultCheckbox);
  }, [originData]);
  const data = methods.getValues();
  const handleGetSummary = () => {
    const { employeeId } = originData;
    const payloadSummaryStaff = {
      id: employeeId,
    };
    event.getDetailEmployeeSuccess(payloadSummaryStaff);
  };

  const getDataParams = () => {
    const isHaveOtherSuccessDescription = checkboxValues?.otherSuccess?.includes('03');
    const dataPayload = {
      employeeId: originData.employeeId,
      otherSuccessDescription: isHaveOtherSuccessDescription ? data.otherSuccessDescription : '',
      kof: data.kof,
      otherKof: data.otherKof,
      esStatus: selectedEsStatus,
      version: originData.version,
      ...checkboxValues,
      ...convertToDesiredFormat(selectedValues, keyMapping),
    };

    const dataToCompare = {
      employeeId: originData.employeeId,
      otherSuccessDescription: originData.otherSuccessDescription,
      kof: originData.kof,
      otherKof: originData.otherKof,
      esStatus: originData.esStatus,
      version: originData.version,
      jobDescription: originData.jobDescription,
      relationShips: originData.relationShips,
      career: originData.career,
      money: originData.money,
      workMethod: originData.workMethod,
      otherSuccess: originData.otherSuccess,
      jobDesptDesired: originData.jobDesptDesired,
      jobDetailsCurrentStatus: originData.jobDetailsCurrentStatus,
      humanRelationsHope: originData.humanRelationsHope,
      humanRelationsCurrentSituation: originData.humanRelationsCurrentSituation,
      careerPreferred: originData.careerPreferred,
      careerCurrent: originData.careerCurrent,
      moneyHope: originData.moneyHope,
      moneyCurrent: originData.moneyCurrent,
      workStyleHope: originData.workStyleHope,
      workStyleCurrentSituation: originData.workStyleCurrentSituation,
    };
    const isDiff = isSameObj(dataToCompare, dataPayload);
    return { dataPayload, isDiff };
  };
  useEffect(() => {
    if (isViewWorkflow) {
      if (formState.isValid) {
        setIsActiveForm(true);
      } else {
        setIsActiveForm(false);
      }
    }
  }, [formState]);
  useEffect(() => {
    if (isActiveForm) {
      const { dataPayload } = getDataParams();
      setParamsChildren({
        employeeSuccess: dataPayload,
      });
    }
  }, [isActiveForm]);
  const handleApprove = () => {
    const { isDiff } = getDataParams();
    if (isDiff) {
      onClose();
      setTimeout(() => {
        handleGetSummary();
      }, 500);
    } else {
      onOpen();
    }
  };

  const onSubmit = useCallback(
    ({ moreParams }) => {
      const { dataPayload } = getDataParams();
      const handleSuccessSummary = () => {
        onClose();
        setTimeout(() => {
          handleGetSummary();
        }, 500);
      };
      const payload = {
        data: { ...dataPayload, ...moreParams },
        onSuccess: modeForm === 'summary' ? handleSuccessSummary : onSuccess,
      };

      const chooseDispatch = {
        summary: event.updateEmloyeeSuccess,
      };

      chooseDispatch[modeForm](payload);
    },
    [checkboxValues, selectedEsStatus, selectedValues, data],
  );

  const { handleSubmit } = methods;
  return (
    <Box position='relative'>
      <FormProvider {...methods}>
        <WrapperForm
          onSubmit={handleSubmit(() => {
            handleApprove();
          })}
        >
          <WrapperFlex
            flexDirection='column'
            height={
              isViewWorkflow ? `calc(${heightApp} - ${isEditing ? '160px' : '240px'})` : `calc(${heightApp} - 180px)`
            }
            overflow='auto'
            paddingRight='10px'
            paddingBottom='20px'
          >
            <Flex mb='30px'>
              <InputForm
                name='employeeId'
                label='社員ID'
                width='258px'
                pointerEvents='none'
                bg={COLORS.gray_400}
                onlyView
              />
              <Box display={isViewWorkflow ? 'none' : 'block'}>
                {canEdit(ID_KEY[9]) && (
                  <DeleteModal
                    type='other'
                    othersHaveWF
                    morePayload={{
                      employeeId: originData.employeeId,
                      version: originData.version,
                    }}
                    callbackSuccess={() => {
                      onSuccess();
                      setTimeout(() => {
                        handleGetSummary();
                      }, 1000);
                    }}
                    action={action.deleteEmployeeSuccess}
                  />
                )}
              </Box>
            </Flex>
            <Flex
              position='relative'
              height='410px'
              mt='10px'
              alignItems='center'
              gap='20px'
              borderBottom={BORDERS.border_3(COLORS.black_second)}
              pb='20px'
            >
              <Flex
                width='50%'
                flexDirection='column'
                justify='space-between'
                border={BORDERS.border_1(COLORS.black_second)}
              >
                <Box
                  bg={COLORS.green_100}
                  height='38.8px'
                  lineHeight='36px'
                  textAlign='center'
                  position='relative'
                  mb='10px'
                  borderBottom={BORDERS.border_1(COLORS.black_second)}
                  fontWeight='500'
                >
                  レーダーチャートデータ
                  <Box position='absolute' top='10px' right='10px'>
                    <HistoryEmployeeSuccess
                      cursor='pointer'
                      ids={originData.employeeId}
                      employeeName={originData.employeeName}
                      modeView='radar'
                    />
                  </Box>
                </Box>
                <Flex justify='flex-end' p='5px 10px'>
                  <Box
                    width='82px'
                    height='31px'
                    lineHeight='29px'
                    textAlign='center'
                    border={BORDERS.border_1(COLORS.black_second)}
                    mr='20px'
                  >
                    希望
                  </Box>
                  <Box
                    width='82px'
                    height='31px'
                    lineHeight='29px'
                    textAlign='center'
                    border={BORDERS.border_1(COLORS.black_second)}
                  >
                    現状
                  </Box>
                </Flex>
                <Divider width='95%' mx='auto' />
                <Box pb='20px'>
                  {Object.keys(LIST_ROLES).map((item, index) => (
                    <Box key={index} mt='5px'>
                      <Flex justify='space-between' mb='5px' p='5px 10px'>
                        <Flex alignItems='center'>
                          <Box fontSize='25px'>{LIST_ROLES_POSITION[item]}</Box>
                          <Box>{LIST_ROLES[item]}</Box>
                        </Flex>
                        <Flex gap='20px'>
                          <Select
                            width='82px'
                            height='31px'
                            value={selectedValues[item]?.[0] || ''}
                            border={BORDERS.border_1(COLORS.black_second)}
                            disabled={isEditWorkflow({
                              track: !isEditing,
                              other: canView(ID_KEY[9]),
                            })}
                            onChange={(e) => handleSelectChange(item, 0, e.target.value)}
                          >
                            {[0, 1, 2, 3, 4, 5].map((keySelect) => (
                              <option key={keySelect} value={keySelect}>
                                {keySelect}
                              </option>
                            ))}
                          </Select>
                          <Select
                            width='82px'
                            height='31px'
                            value={selectedValues[item]?.[1] || ''}
                            border={BORDERS.border_1(COLORS.black_second)}
                            onChange={(e) => handleSelectChange(item, 1, e.target.value)}
                            disabled={isEditWorkflow({
                              track: !isEditing,
                              other: canView(ID_KEY[9]),
                            })}
                          >
                            {[0, 1, 2, 3, 4, 5].map((keySelect) => (
                              <option key={keySelect} value={keySelect}>
                                {keySelect}
                              </option>
                            ))}
                          </Select>
                        </Flex>
                      </Flex>
                      <Divider width='95%' mx='auto' borderTop='1px' />
                    </Box>
                  ))}
                </Box>
              </Flex>
              <Divider
                position='absolute'
                right='50%'
                bottom='-8px'
                orientation='vertical'
                height='420px'
                width='4px'
                my={2}
                bg={COLORS.black_second}
                opacity={1}
              />
              <Divider orientation='vertical' height='100%' width='4px' my={2} bg={COLORS.black_second} opacity={0} />
              <Flex width='50%' flexDirection='column' gap={5}>
                <Box>
                  <Flex justify='space-between' alignItems='center'>
                    <Box>■ KOF</Box>
                    <Box>
                      <HistoryEmployeeSuccess
                        cursor='pointer'
                        ids={originData.employeeId}
                        employeeName={originData.employeeName}
                        modeView='kof'
                      />
                    </Box>
                  </Flex>
                  <TextareaForm
                    name='kof'
                    mt='6px'
                    width='100%'
                    resize='none'
                    height={70}
                    disabled={isEditWorkflow({
                      track: !isEditing,
                      other: canView(ID_KEY[9]),
                    })}
                  />
                </Box>
                <Box>
                  <Box>■ その他</Box>
                  <TextareaForm
                    name='otherKof'
                    mt='6px'
                    width='100%'
                    resize='none'
                    height={100}
                    disabled={isEditWorkflow({
                      track: !isEditing,
                      other: canView(ID_KEY[9]),
                    })}
                  />
                </Box>
                <Box>
                  <Box>■ ESステータス</Box>
                  <RadioGroup
                    pointerEvents={
                      isEditWorkflow({
                        track: !isEditing,
                        other: canView(ID_KEY[9]),
                      }) && 'none'
                    }
                    onChange={setSelectedEsStatus}
                    value={selectedEsStatus}
                  >
                    <WrapperFlex
                      alignItems='flex-start'
                      height='100px'
                      overflow='auto scroll'
                      gap='10px'
                      flexFlow='wrap'
                    >
                      {dropdown.ES_STATUS.map((item) => (
                        <Radio
                          size='lg'
                          border={BORDERS.border_1(COLORS.black_second)}
                          key={item.value}
                          value={item.value}
                          disabled={canView(ID_KEY[9])}
                        >
                          {item.label}
                        </Radio>
                      ))}
                    </WrapperFlex>
                  </RadioGroup>
                </Box>
              </Flex>
            </Flex>
            {/* <Divider height='4px' my={2} bg={COLORS.black_second} opacity={1} /> */}
            <Box mt='10px'>
              <Box
                bg={COLORS.gray_200}
                height='38.8px'
                fontWeight='500'
                lineHeight='36px'
                textAlign='center'
                position='relative'
                border={BORDERS.border_1(COLORS.black_second)}
              >
                モチベーションフラグ
                <Box position='absolute' right='10px' top='10px'>
                  <HistoryEmployeeSuccess
                    cursor='pointer'
                    ids={originData.employeeId}
                    employeeName={originData.employeeName}
                    modeView='motivation'
                  />
                </Box>
              </Box>
              {LIST_CHECKBOXS.map((item) => (
                <Flex key={item.id} mt='10px' alignItems='center'>
                  <Flex width='100px' paddingTop='5px' alignItems='center' mr='10px'>
                    <Box fontSize='30px'>{item.position}</Box>
                    <Box>{item.title}</Box>
                  </Flex>
                  <Grid justify='space-between' templateColumns={renderCheckbox[item.key] || renderCheckbox.other}>
                    {item.list.map((key) => (
                      <Flex alignItems='center' key={key.value} position='relative'>
                        <CustomChecked
                          isChecked={checkboxValues[item.key]?.includes(key.value)}
                          onChange={() => handleCheckboxChange(item.id, key.value)}
                          colorScheme={COLORS.white}
                          iconColor={COLORS.black_primary}
                          disabled={isEditWorkflow({
                            track: !isEditing,
                            other: canView(ID_KEY[9]),
                          })}
                        >
                          {item.key === 'otherSuccess' && key.value === '03' ? (
                            <Box minWidth='150px'>{key.label}</Box>
                          ) : (
                            <>{key.label}</>
                          )}
                        </CustomChecked>
                        {item.key === 'otherSuccess' &&
                          key.value === '03' &&
                          checkboxValues[item.key]?.includes(key.value) && (
                            <TextareaForm
                              mt='5px'
                              name='otherSuccessDescription'
                              width='300px'
                              position='absolute'
                              top='20px'
                              left='-190px'
                              resize='none'
                              disabled={isEditWorkflow({
                                track: !isEditing,
                                other: canView(ID_KEY[9]),
                              })}
                              height={100}
                              styleError={{
                                position: 'absolute',
                                left: '120px',
                                top: '12px',
                                width: '120px',
                              }}
                            />
                          )}
                      </Flex>
                    ))}
                  </Grid>
                </Flex>
              ))}
            </Box>
          </WrapperFlex>
          {!isViewWorkflow && (
            <Flex mt={10} gap='10px' justifyContent='end'>
              <CloseButton handleClose={onClose} />
              {canEdit(ID_KEY[9]) && <DHMButton text={modeForm === 'create' ? 'register' : 'update'} type='submit' />}
              <ApproveModal
                typeBusinessDivision='Employee Success軸'
                isOpen={isOpen}
                onConfirm={(dataWF) => {
                  onSubmit({
                    moreParams: dataWF,
                  });
                  onCloseModal();
                }}
                onCancel={onCloseModal}
              />
            </Flex>
          )}
        </WrapperForm>
      </FormProvider>
    </Box>
  );
}
