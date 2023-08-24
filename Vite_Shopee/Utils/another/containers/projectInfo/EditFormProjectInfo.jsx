import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { DHMBox } from 'dhm/components/Box';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
import { AsyncSelectForm } from 'dhm/components/Form/elements/AsyncSelect';
import { CheckboxForm } from 'dhm/components/Form/elements/CheckBox';
import { InputFormDate } from 'dhm/components/Form/elements/Date2';
import { FormTextArea } from 'dhm/components/Form/elements/FormTextArea';
import { SelectForm } from 'dhm/components/Form/elements/Select';
import { InputForm } from 'dhm/components/Form/elements/Text';
import { TextareaForm } from 'dhm/components/Form/elements/Textarea';
import { WrapperForm } from 'dhm/containers/auth/styled';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { DHMHook } from 'dhm/hooks/index';
import { ServiceProjectInfo } from 'dhm/store/projectInfo/services';
import { BUSINESS_CATEGORY_CODE, YEAR_RANGE } from 'dhm/utils/constants/select';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { isSameObj } from 'dhm/utils/helpers/condition';
import { addCommasCurrency, formatArray } from 'dhm/utils/helpers/method';
import { useCallback, useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { InputViewDropdown } from 'dhm/components/Form/elements/InputView';
import { ApproveModal } from 'dhm/components/Modal/elements/approveModal';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import styled from 'styled-components';
import { dataEditProjectInfo } from './config';

const WrapperFlex = styled(Flex)`
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${COLORS.gray_primary};
  }
`;

export function EditFormProjectInfo({
  onClose = () => {},
  originData,
  modeFeature = 'origin',
  isEditing = false,
  setIsActiveForm = () => {},
  setParamsChildren = () => {},
  isActiveForm,
}) {
  const { ID_KEY, canView, PermissionWrapper } = useContext(AbilityContext);
  const isViewWorkflow = modeFeature === 'workflow';
  const isEditWorkflow = ({ track = isEditing, other }) => (isViewWorkflow ? track : other);
  const { BoxText } = DHMBox;
  const { getProjectInfoAction, updateProjectInfoAction, OPTIONS_RECOGNIZE_PERSON } = ServiceProjectInfo();
  const { employeeId } = useParams();
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();
  const { tProjectInfo } = useContext(LanguageContext);
  const defaultValues = {
    projectId: originData.projectId,
    projectName: originData.projectName,
    client: originData.client,
    counter: originData.counter,
    start: originData.start,
    unitPrice: addCommasCurrency(`${originData?.unitPrice}`?.toString().replace(/,/g, '')),
    salesInCharge: originData.salesInCharge,
    sellTeam: addCommasCurrency(`${originData?.sellTeam}`?.toString().replace(/,/g, '')),
    evaluation: originData.evaluation,
    rater: originData.rater,
    qualEvalHrBrain: originData.qualitativeEvaluationHrBrain,
    qualEvalOthers: originData.qualitativeEvaluationOthers,
    businessContent: originData.businessContent,
    businessCategory: originData.businessCategory,
    recognitionOfPerson: originData.recognitionOfPerson,
    upstream: originData.businessCategory?.slice(1, -1).split(',').includes(BUSINESS_CATEGORY_CODE.UPSTREAM) ? 1 : 0,
    pmoCustomer: originData.businessCategory?.slice(1, -1).split(',').includes(BUSINESS_CATEGORY_CODE.PMO_CTM) ? 1 : 0,
    pmoSI: originData.businessCategory?.slice(1, -1).split(',').includes(BUSINESS_CATEGORY_CODE.PMO_SI) ? 1 : 0,
    SI: originData.businessCategory?.slice(1, -1).split(',').includes(BUSINESS_CATEGORY_CODE.SI) ? 1 : 0,
    app: originData.businessCategory?.slice(1, -1).split(',').includes(BUSINESS_CATEGORY_CODE.APP) ? 1 : 0,
    infrastructure: originData.businessCategory?.slice(1, -1).split(',').includes(BUSINESS_CATEGORY_CODE.IFR) ? 1 : 0,
    salesEvaluation: originData.salesEvaluation,
    salesComment: originData.salesComment,
    matterNo: originData.matterNo || null,
  };
  const methods = useForm({
    defaultValues,
    mode: 'onChange',
  });
  const { getValues, handleSubmit, setValue } = methods;
  useEffect(() => {
    if (isViewWorkflow) {
      if (Object.keys(originData).length) {
        methods.reset({
          projectId: originData.projectId,
          projectName: originData.projectName,
          client: originData.client,
          counter: originData.counter,
          start: originData.start,
          unitPrice: addCommasCurrency(originData?.unitPrice?.toString().replace(/,/g, '')),
          salesInCharge: originData.salesInCharge,
          sellTeam: addCommasCurrency(originData?.sellTeam?.toString().replace(/,/g, '')),
          evaluation: originData.evaluation,
          rater: originData.rater,
          qualEvalHrBrain: originData.qualitativeEvaluationHrBrain,
          qualEvalOthers: originData.qualitativeEvaluationOthers,
          businessContent: originData.businessContent,
          businessCategory: originData.businessCategory,
          recognitionOfPerson: originData.recognitionOfPerson,
          upstream: originData.businessCategory?.slice(1, -1).split(',').includes(BUSINESS_CATEGORY_CODE.UPSTREAM)
            ? 1
            : 0,
          pmoCustomer: originData.businessCategory?.slice(1, -1).split(',').includes(BUSINESS_CATEGORY_CODE.PMO_CTM)
            ? 1
            : 0,
          pmoSI: originData.businessCategory?.slice(1, -1).split(',').includes(BUSINESS_CATEGORY_CODE.PMO_SI) ? 1 : 0,
          SI: originData.businessCategory?.slice(1, -1).split(',').includes(BUSINESS_CATEGORY_CODE.SI) ? 1 : 0,
          app: originData.businessCategory?.slice(1, -1).split(',').includes(BUSINESS_CATEGORY_CODE.APP) ? 1 : 0,
          infrastructure: originData.businessCategory?.slice(1, -1).split(',').includes(BUSINESS_CATEGORY_CODE.IFR)
            ? 1
            : 0,
          salesEvaluation: originData.salesEvaluation,
          salesComment: originData.salesComment,
          matterNo: originData.matterNo || null,
        });
      }
    }
  }, [originData]);
  const { isValid } = DHMHook.useSetError();
  const getDataParams = () => {
    const data = getValues();
    const dataMain = dataEditProjectInfo({ data, employeeId, originData });
    const dataCompare = dataEditProjectInfo({ data: originData, employeeId, originData });
    const isDiff = isSameObj(dataCompare, dataMain);

    return { dataMain, dataCompare, isDiff };
  };
  useEffect(() => {
    if (isViewWorkflow) {
      if (methods.formState.isValid && isValid()) {
        setIsActiveForm(true);
      } else {
        setIsActiveForm(false);
      }
    }
  }, [methods.formState, isValid()]);
  useEffect(() => {
    if (isActiveForm) {
      const { dataMain } = getDataParams();
      setParamsChildren({
        projectInfo: dataMain,
      });
    }
  }, [isActiveForm]);
  const handleApprove = () => {
    const { isDiff } = getDataParams();
    if (isDiff) {
      onClose();
      setTimeout(() => {
        getProjectInfoAction({
          params: {
            employeeId,
            isHistory: false,
            sortColumn: 'start,updatedDatetime',
            sortType: 'desc,desc',
            isAll: false,
          },
        });
      }, 500);
    } else {
      onOpen();
    }
  };
  const onSubmit = useCallback(
    ({ moreParams }) => {
      const { dataMain } = getDataParams();
      const handleSuccess = () => {
        onClose();
        setTimeout(() => {
          getProjectInfoAction({
            params: {
              employeeId,
              isHistory: false,
              sortColumn: 'start,updatedDatetime',
              sortType: 'desc,desc',
              isAll: false,
            },
          });
        }, 500);
      };
      const payload = {
        data: { ...dataMain, ...moreParams },
        onSuccess: handleSuccess,
      };

      updateProjectInfoAction(payload);
    },
    [getValues],
  );

  const handleScrollSelect = () => {
    setTimeout(() => {
      const lastOption = formatArray().filter((item) => document.getElementById(item) !== null)[0];
      const selectedEl = document.getElementById(lastOption);
      if (selectedEl) {
        selectedEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }, 100);
  };

  return (
    <Box position='relative'>
      <FormProvider {...methods}>
        <WrapperForm
          onSubmit={handleSubmit(() => {
            if (isValid()) handleApprove();
          })}
        >
          <Flex flexDirection='column' justify='space-between' height={isViewWorkflow ? 'calc(100vh - 240px)' : '85vh'}>
            <WrapperFlex flexDirection='column' overflow='auto' pr='10px'>
              <Flex justify='space-between' pl={2} gap={5} mt={3}>
                <InputForm
                  width='230px'
                  name='projectId'
                  label={tProjectInfo('projectID')}
                  value={originData.projectId}
                  pointerEvents='none'
                  bg={COLORS.gray_400}
                  onlyView
                  overflow='hidden'
                />
                <Box width='100%'>
                  <Box fontWeight='500' mb={2}>
                    {tProjectInfo('projectName')}{' '}
                  </Box>
                  <BoxText
                    label={originData.projectName}
                    pl='15px'
                    pt='5px'
                    line={1}
                    alignItems='center'
                    width='230px'
                    height='40px'
                    overflow='hidden'
                    lineHeight='30px'
                    textOverflow='ellipsis'
                    bg={COLORS.gray_400}
                    border={BORDERS.border_1(COLORS.gray_700)}
                  >
                    {originData.projectName}
                  </BoxText>
                </Box>
              </Flex>
              <Flex justify='space-between' pl={2} gap={5} mt={3}>
                <InputForm
                  width='230px'
                  name='client'
                  label={tProjectInfo('client')}
                  isDisabled={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                />
                <InputForm
                  width='230px'
                  name='counter'
                  label={tProjectInfo('counter')}
                  isDisabled={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                />
              </Flex>
              <Flex justify='space-between' pl={2} gap={5} mt={3}>
                <Box width='555px'>
                  <InputFormDate
                    width='230px'
                    borderColor={COLORS.gray_700}
                    name='start'
                    label={tProjectInfo('start')}
                    methods={methods}
                    minDate={new Date()}
                    max={new Date(YEAR_RANGE.MAX)}
                    typeShow='month'
                    showIcon
                    disabled={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                    onlyView={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                  />
                </Box>
                <Box width='555px'>
                  <InputForm
                    width='230px'
                    name='salesInCharge'
                    label={tProjectInfo('saleInCharge')}
                    isDisabled={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                    onlyView={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                  />
                </Box>
              </Flex>
              <Flex position='relative' justify='space-between' pl={2} gap={5} mt={3}>
                <InputForm
                  width='230px'
                  textAlign='right'
                  name='unitPrice'
                  label={tProjectInfo('unitPrice')}
                  setValue={setValue}
                  isDisabled={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                />
                <Box position='absolute' left='250px' top='40px'>
                  万円
                </Box>
                <InputForm
                  width='230px'
                  textAlign='right'
                  name='sellTeam'
                  label={tProjectInfo('teamSale')}
                  setValue={setValue}
                  isDisabled={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                />
                <Box position='absolute' right='120px' top='40px'>
                  万円
                </Box>
              </Flex>
              <Flex justify='space-between' pl={2} gap={5} mt={3}>
                <InputForm
                  width='230px'
                  textAlign='right'
                  name='evaluation'
                  label={tProjectInfo('evaluation')}
                  isDisabled={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                />
                <InputForm
                  width='230px'
                  name='rater'
                  label={tProjectInfo('assessor')}
                  isDisabled={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                />
              </Flex>
              <Flex pl={2} gap={5}>
                <Flex mt={4} flexDirection='column' width='50%'>
                  <Box width='100%'>
                    <PermissionWrapper haveNoti={false} path={ID_KEY[26]}>
                      {isEditWorkflow({ track: !isEditing, other: canView(ID_KEY[26]) }) ? (
                        <InputViewDropdown
                          label='営業評価'
                          valueDropdown={methods.watch('salesEvaluation')}
                          type='SALE_EVALUATION'
                        />
                      ) : (
                        <AsyncSelectForm
                          typeDropdown='SALE_EVALUATION'
                          methods={methods}
                          name='salesEvaluation'
                          label='営業評価'
                          originValue={methods.watch('salesEvaluation')}
                        />
                      )}
                    </PermissionWrapper>
                  </Box>
                </Flex>
                <Flex mt={4} flexDirection='column' width='50%'>
                  <Box width='100%'>
                    <PermissionWrapper haveNoti={false} path={ID_KEY[27]}>
                      <TextareaForm
                        name='salesComment'
                        width='100%'
                        resize='none'
                        height='38'
                        minHeight='36px'
                        label='営業コメント'
                        disabled={isEditWorkflow({
                          track: !isEditing,
                          other: canView(ID_KEY[27]),
                        })}
                      />
                    </PermissionWrapper>
                  </Box>
                </Flex>
              </Flex>
              <Flex pl={2} gap={5}>
                <Flex mt={2} flexDirection='column' width='50%'>
                  <Box width='100%'>
                    <FormTextArea
                      label={tProjectInfo('qualitativeEvaluation')}
                      name='qualEvalHrBrain'
                      resize='none'
                      height={60}
                      rows={4}
                      disabled={isEditWorkflow({
                        track: !isEditing,
                        other: false,
                      })}
                    />
                  </Box>
                </Flex>
                <Flex mt={2} flexDirection='column' width='50%'>
                  <Box width='100%'>
                    <FormTextArea
                      label={tProjectInfo('qualitativeEvaluatioOther')}
                      name='qualEvalOthers'
                      resize='none'
                      height={60}
                      rows={4}
                      disabled={isEditWorkflow({
                        track: !isEditing,
                        other: false,
                      })}
                    />
                  </Box>
                </Flex>
              </Flex>
              <Flex mt={2} pl={2} flexDirection='column'>
                <Box width='100%'>
                  <FormTextArea
                    label={tProjectInfo('businessContent')}
                    name='businessContent'
                    resize='none'
                    height={70}
                    rows={4}
                    disabled={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                    onlyView={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                  />
                </Box>
              </Flex>
              <Flex flexDirection='column' gap='5px' my={2} pl={2}>
                <Box fontWeight='500'>{tProjectInfo('businessCategory')}</Box>
                <Flex width='90%'>
                  <CheckboxForm
                    mr={3}
                    type='checkbox'
                    label={tProjectInfo('upstream')}
                    name='upstream'
                    disabled={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                  />
                  <CheckboxForm
                    mr={3}
                    type='checkbox'
                    label={tProjectInfo('pmoCustomer')}
                    name='pmoCustomer'
                    disabled={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                  />
                  <CheckboxForm
                    mr={3}
                    type='checkbox'
                    label={tProjectInfo('pmoSI')}
                    name='pmoSI'
                    disabled={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                  />
                  <CheckboxForm
                    mr={3}
                    type='checkbox'
                    label={tProjectInfo('SI')}
                    name='SI'
                    disabled={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                  />
                  <CheckboxForm
                    mr={3}
                    type='checkbox'
                    label={tProjectInfo('app')}
                    name='app'
                    disabled={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                  />
                  <CheckboxForm
                    mr={3}
                    type='checkbox'
                    label={tProjectInfo('infrastructure')}
                    name='infrastructure'
                    disabled={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                  />
                </Flex>
              </Flex>
              <Flex flexDirection='column' pl={2}>
                <Box width='300px'>
                  <SelectForm
                    onMenuOpen={handleScrollSelect}
                    options={OPTIONS_RECOGNIZE_PERSON}
                    label={tProjectInfo('recognitionOfPerson')}
                    methods={methods}
                    name='recognitionOfPerson'
                    originValue={originData.recognitionOfPerson}
                    isDisabled={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                  />
                </Box>
              </Flex>
            </WrapperFlex>
            {!isViewWorkflow && (
              <Flex mt='10px' gap='10px' justifyContent='end'>
                <>
                  <CloseButton handleClose={onClose} />
                  <DHMButton text='update' type='submit' />
                </>
                <ApproveModal
                  typeBusinessDivision='プロジェクト Info'
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
          </Flex>
        </WrapperForm>
      </FormProvider>
    </Box>
  );
}
