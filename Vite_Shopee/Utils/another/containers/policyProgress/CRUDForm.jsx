/* eslint-disable no-unused-vars */
import { Box, Divider, Flex, Image, useDisclosure } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { BoxMiniFeat } from 'dhm/components/Box/BoxMiniFeat';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
import { AsyncSelectForm } from 'dhm/components/Form/elements/AsyncSelect';
import { InputFormDate } from 'dhm/components/Form/elements/Date2';
import { FormTextArea } from 'dhm/components/Form/elements/FormTextArea';
import { InputViewDropdown } from 'dhm/components/Form/elements/InputView';
import { SelectForm } from 'dhm/components/Form/elements/Select';
import { InputForm } from 'dhm/components/Form/elements/Text';
import { ApproveModal } from 'dhm/components/Modal/elements/approveModal';
import { WrapperForm } from 'dhm/containers/auth/styled';
import { DeleteModal } from 'dhm/containers/modal/DeleteModal';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import LanguageContext, { currentLanguage } from 'dhm/contexts/TranslateContext';
import { DHMHook } from 'dhm/hooks/index';
import { deletePolicyProgress } from 'dhm/store/policyProgress/action';
import { ServicePolicyProgress } from 'dhm/store/policyProgress/services';
import { MESS_ERROR } from 'dhm/utils/constants/messageId';
import { ROUTES } from 'dhm/utils/constants/routes';
import { TYPE_SELECT, YEAR_RANGE } from 'dhm/utils/constants/select';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { formatYearForDatepicker } from 'dhm/utils/helpers/format';
import isEqual from 'lodash/isEqual';
import { useCallback, useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { TableHistoryPolicyProgress } from './HistoryPolicyProgress';
import { TableHistoryPromotion } from './HistoryPromotion';
import { TableHistoryTRisk } from './HistoryTRisk';
import { dataPayloadMain } from './config';

const WrapperBox = styled(Box)`
  .react-datepicker {
    position: relative;
  }
  .react-datepicker__year {
    width: 150px;
  }
  .react-datepicker__year-wrapper {
    justify-content: center;
  }
  .react-datepicker__navigation--next,
  .react-datepicker__navigation--previous {
    position: absolute;
    top: 7px;
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

export function CRUDFormPolicyProgress({
  onClose = () => {},
  originData = {},
  modeFeature = 'origin',
  isEditing = false,
  setIsActiveForm = () => {},
  setParamsChildren = () => {},
  isActiveForm = false,
}) {
  const isViewWorkflow = modeFeature === 'workflow';
  const isEditWorkflow = ({ track = isEditing, other }) => (isViewWorkflow ? track : other);
  const { ID_KEY, canView, PermissionWrapper } = useContext(AbilityContext);
  const {
    policyProgress,
    OPTIONS_TOBEFY,
    OPTIONS_TRISK,
    getPolicyProgressAction,
    updatePolicyProgressAction,
    getTobeFYAction,
    staffSummary,
  } = ServicePolicyProgress();
  useEffect(() => {
    if (isViewWorkflow) {
      getTobeFYAction({
        params: {
          isHistory: false,
          sortType: 'asc',
          sortColumn: 'codeValue',
          codeListIds: [
            TYPE_SELECT.TOBE_FY,
            TYPE_SELECT.T_RISK,
            TYPE_SELECT.INTERVIEW_CATEGORY,
            TYPE_SELECT.BUSINESS_CATEGORY,
            TYPE_SELECT.RECOGNIZE_PERSON,
          ],
          isAll: true,
        },
      });
    }
  }, []);
  const { employeeId } = useParams();
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();
  const { tForm, tPolicyProgress: t } = useContext(LanguageContext);
  const methods = useForm({
    defaultValues: {
      ...policyProgress,
      riskSelection: [...OPTIONS_TRISK].map((option) => option.value).includes(policyProgress.riskSelection)
        ? policyProgress.riskSelection
        : null,
      fiscalYear: policyProgress.fiscalYear === null ? null : formatYearForDatepicker(policyProgress.fiscalYear),
      employeeId,
    },
    mode: 'onChange',
  });
  const { getValues, handleSubmit, watch } = methods;
  useEffect(() => {
    if (isViewWorkflow) {
      if (Object.keys(originData).length) {
        methods.reset({
          ...originData,
          riskSelection: [...OPTIONS_TRISK].map((option) => option.value).includes(originData.riskSelection)
            ? originData.riskSelection
            : null,
          fiscalYear: originData.fiscalYear === null ? null : formatYearForDatepicker(null),
          employeeId: originData.employeeId,
        });
      }
    }
  }, [originData]);
  const [
    fiscalYearWatch,
    riskDescriptionWatch,
    riskSelectionWatch,
    tobeFyFiscalWatch,
    tobeFyFiscalPlus1Watch,
    tobeFyFiscalPlus2Watch,
    tobeFyFiscalPlus3Watch,
  ] = watch([
    'fiscalYear',
    'riskDescription',
    'riskSelection',
    'tobeFyFiscal',
    'tobeFyFiscalPlus1',
    'tobeFyFiscalPlus2',
    'tobeFyFiscalPlus3',
  ]);
  const { isValid, setError, ShowError, clearError } = DHMHook.useSetError();
  const navigate = useNavigate();
  const NO_SELECT_OPTION = {
    value: '',
    label: tForm('notSelect'),
  };

  useEffect(() => {
    if (riskDescriptionWatch && riskSelectionWatch === null) {
      setError('riskSelection', {
        type: 'invalid',
        message: MESS_ERROR.POLICY_PROGRESS.status,
      });
    } else {
      clearError('riskSelection');
    }
  }, [riskDescriptionWatch, riskSelectionWatch]);

  useEffect(() => {
    if (
      fiscalYearWatch === null ||
      tobeFyFiscalWatch === null ||
      tobeFyFiscalPlus1Watch === null ||
      tobeFyFiscalPlus2Watch === null ||
      tobeFyFiscalPlus3Watch === null
    ) {
      setError('tobe', {
        type: 'required',
        message: MESS_ERROR.POLICY_PROGRESS.tobe_required,
      });
    } else {
      clearError('tobe');
    }
  }, [fiscalYearWatch, tobeFyFiscalWatch, tobeFyFiscalPlus1Watch, tobeFyFiscalPlus2Watch, tobeFyFiscalPlus3Watch]);
  const getDataParams = () => {
    const data = getValues();
    const dataMain = dataPayloadMain({
      data,
      employeeId,
      policyProgress,
    });
    const dataToCompare = {
      ...policyProgress,
      riskSelection: [...OPTIONS_TRISK].map((option) => option.value).includes(policyProgress.riskSelection)
        ? policyProgress.riskSelection
        : null,
      fiscalYear: policyProgress.fiscalYear ? policyProgress.fiscalYear.toString() : null,
    };
    const isDiff = isEqual(dataMain, dataToCompare);

    return { dataMain, isDiff };
  };
  const handleApprove = () => {
    const { isDiff } = getDataParams();
    if (isDiff) {
      onClose();
      setTimeout(() => {
        getPolicyProgressAction({ employeeId });
      }, 500);
    } else {
      onOpen();
    }
  };
  const onSubmit = useCallback(
    ({ moreParmas }) => {
      const { dataMain } = getDataParams();
      const handleSuccessSummary = () => {
        onClose();
        setTimeout(() => {
          getPolicyProgressAction({ employeeId });
        }, 500);
      };
      const payload = {
        data: { ...dataMain, ...moreParmas },
        onSuccess: handleSuccessSummary,
      };

      updatePolicyProgressAction(payload);
    },
    [getValues],
  );

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
        policyProg: dataMain,
      });
    }
  }, [isActiveForm]);
  return (
    <Box position='relative'>
      <FormProvider {...methods}>
        <WrapperForm
          onSubmit={handleSubmit(() => {
            if (isValid()) handleApprove();
          })}
        >
          <WrapperFlex
            flexDirection='column'
            height={isViewWorkflow ? `calc(94vh - 190px)` : 'calc(94vh - 100px)'}
            overflow='auto'
            justify='flex-start'
            pr='10px'
          >
            <Flex justify='space-between' pl={2}>
              <InputForm
                width={304}
                name='employeeId'
                label={t('employeeId')}
                pointerEvents='none'
                bg={COLORS.gray_400}
                onlyView
              />
              {!isViewWorkflow && (
                <BoxMiniFeat justifyContent='end' position='absolute' top='5px' right='5px'>
                  <DeleteModal
                    type='deleteWF'
                    idRow={employeeId}
                    action={deletePolicyProgress}
                    typeBusinessDivision='方針と進捗'
                    callbackSuccess={() => {
                      onClose();
                      getPolicyProgressAction({ employeeId });
                      navigate(`${ROUTES.summary}/${employeeId}`);
                    }}
                  />
                </BoxMiniFeat>
              )}
            </Flex>
            <Flex mt={4} flexDirection='column'>
              <Flex mb={1} alignItems='center'>
                <Box>■&nbsp;{t('policyProgress')}</Box>
                <Box position='relative' width='fit-content'>
                  {isEditWorkflow({ other: true }) && (
                    <Box
                      ml='10px'
                      right={currentLanguage('jp') ? '-40px' : '-50px'}
                      fontSize='8px'
                      top='4px'
                      color={COLORS.white}
                      background={COLORS.danger_300}
                      padding='2px 8px'
                    >
                      {tForm('required')}
                    </Box>
                  )}
                </Box>
                <BoxMiniFeat bg={COLORS.white}>
                  <TableHistoryPolicyProgress
                    cursor='pointer'
                    employeeId={employeeId}
                    employeeName={staffSummary.data.employeeName}
                  />
                </BoxMiniFeat>
              </Flex>
              <FormTextArea
                name='policyProgress'
                resize='none'
                height={50}
                rows={2}
                isDisabled={isEditWorkflow({ track: !isEditing, other: false })}
              />
            </Flex>
            <Divider height='4px' mt={1} bg={COLORS.black_second} opacity={1} />
            <Flex flexDirection='column' mt={4}>
              <Flex mb={1} alignItems='center'>
                <Box>■&nbsp;{t('promotion')}</Box>
                <Box position='relative' width='fit-content'>
                  {isEditWorkflow({ other: true }) && (
                    <Box
                      ml='10px'
                      right={currentLanguage('jp') ? '-40px' : '-50px'}
                      fontSize='8px'
                      top='4px'
                      color={COLORS.white}
                      background={COLORS.danger_300}
                      padding='2px 8px'
                    >
                      {tForm('required')}
                    </Box>
                  )}
                </Box>
                <BoxMiniFeat bg={COLORS.white}>
                  <TableHistoryPromotion
                    cursor='pointer'
                    employeeId={employeeId}
                    employeeName={staffSummary.data.employeeName}
                  />
                </BoxMiniFeat>
              </Flex>

              <Flex border='1px' borderColor={COLORS.black_second}>
                <Flex borderRight='1px' width='50%' flexDirection='column'>
                  <Box
                    bg={COLORS.green_100}
                    borderBottom='1px'
                    borderColor={COLORS.black_second}
                    textAlign='center'
                    p={2}
                  >
                    {t('tobe')}
                  </Box>
                  <Flex flexDirection='column' gap={1} p={2} borderColor={COLORS.black_second}>
                    <Flex justifyContent='space-between' alignItems='center' px={2}>
                      <Box width='70px'>{t('tobeFY')}</Box>
                      <WrapperBox width='80px' position='relative'>
                        <Image src={DHMAssets.ICON_CALENDAR} position='absolute' top='12px' right='12px' />
                        <InputFormDate
                          name='fiscalYear'
                          minDate={new Date()}
                          max={new Date(YEAR_RANGE.FISCAL_YEAR)}
                          methods={methods}
                          onlyView
                          dateFormat='yy'
                          isClearable={false}
                          placeholderText=''
                          showYearPicker
                          disabled={isEditWorkflow({ track: !isEditing, other: false })}
                        />
                      </WrapperBox>
                      <Box width='270px'>
                        <SelectForm
                          options={OPTIONS_TOBEFY}
                          methods={methods}
                          name='tobeFyFiscal'
                          defaultValue={NO_SELECT_OPTION}
                          originValue={policyProgress.tobeFyFiscal}
                          isDisabled={isEditWorkflow({ track: !isEditing, other: false })}
                        />
                      </Box>
                    </Flex>
                    <Flex justifyContent='space-between' alignItems='center' px={2}>
                      <Box width='70px'>{t('tobeFY')}</Box>
                      <Box width='80px'>
                        <InputForm
                          name='tobeFyFiscalPlus1Sub'
                          value={
                            fiscalYearWatch
                              ? Number(new Date(fiscalYearWatch).getFullYear().toString().slice(2, 4)) + 1
                              : ''
                          }
                          pointerEvents='none'
                          bg={COLORS.gray_400}
                          onlyView
                        />
                      </Box>
                      <Box width='270px'>
                        <SelectForm
                          options={OPTIONS_TOBEFY}
                          methods={methods}
                          name='tobeFyFiscalPlus1'
                          defaultValue={NO_SELECT_OPTION}
                          originValue={policyProgress.tobeFyFiscalPlus1}
                          isDisabled={isEditWorkflow({ track: !isEditing, other: false })}
                        />
                      </Box>
                    </Flex>
                    <Flex justifyContent='space-between' alignItems='center' px={2}>
                      <Box width='70px'>{t('tobeFY')}</Box>
                      <Box width='80px'>
                        <InputForm
                          name='tobeFyFiscalPlus2Sub'
                          value={
                            fiscalYearWatch
                              ? Number(new Date(fiscalYearWatch).getFullYear().toString().slice(2, 4)) + 2
                              : ''
                          }
                          pointerEvents='none'
                          bg={COLORS.gray_400}
                          onlyView
                        />
                      </Box>
                      <Box width='270px'>
                        <SelectForm
                          options={OPTIONS_TOBEFY}
                          methods={methods}
                          name='tobeFyFiscalPlus2'
                          defaultValue={NO_SELECT_OPTION}
                          originValue={policyProgress.tobeFyFiscalPlus2}
                          isDisabled={isEditWorkflow({ track: !isEditing, other: false })}
                        />
                      </Box>
                    </Flex>
                    <Flex justifyContent='space-between' alignItems='center' px={2}>
                      <Box width='70px'>{t('tobeFY')}</Box>
                      <Box width='80px'>
                        <InputForm
                          name='tobeFyFiscalPlus3Sub'
                          value={
                            fiscalYearWatch
                              ? Number(new Date(fiscalYearWatch).getFullYear().toString().slice(2, 4)) + 3
                              : ''
                          }
                          onlyView
                          pointerEvents='none'
                          bg={COLORS.gray_400}
                        />
                      </Box>
                      <Box width='270px'>
                        <SelectForm
                          options={OPTIONS_TOBEFY}
                          methods={methods}
                          name='tobeFyFiscalPlus3'
                          defaultValue={NO_SELECT_OPTION}
                          originValue={policyProgress.tobeFyFiscalPlus3}
                          isDisabled={isEditWorkflow({ track: !isEditing, other: false })}
                        />
                      </Box>
                    </Flex>
                    {isEditWorkflow({ other: true }) && <ShowError name='tobe' mt='10px' />}
                  </Flex>
                </Flex>
                <Flex borderLeft={BORDERS.border_1(COLORS.black_second)} width='50%' flexDirection='column'>
                  <Box
                    bg={COLORS.gray_200}
                    borderBottom='1px'
                    borderColor={COLORS.black_second}
                    textAlign='center'
                    p={2}
                  >
                    {t('asis')}
                  </Box>
                  <Box p={2} borderColor={COLORS.black_second}>
                    <FormTextArea
                      name='asis'
                      resize='none'
                      defaultValue={policyProgress.asis}
                      height={170}
                      disabled={isEditWorkflow({ track: !isEditing, other: false })}
                    />
                  </Box>
                </Flex>
              </Flex>
            </Flex>
            <Divider height='4px' mt={1} bg={COLORS.black_second} opacity={1} />
            <Flex flexDirection='column' mt={4}>
              <Flex mb={1} alignItems='center'>
                <Box>■&nbsp;{t('tRisk')}</Box>
                <Box position='relative' width='fit-content'>
                  {isEditWorkflow({ other: true }) && (
                    <Box
                      ml='10px'
                      right={currentLanguage('jp') ? '-40px' : '-50px'}
                      fontSize='8px'
                      top='4px'
                      color={COLORS.white}
                      background={COLORS.danger_300}
                      padding='2px 8px'
                    >
                      {tForm('required')}
                    </Box>
                  )}
                </Box>
                <BoxMiniFeat bg={COLORS.white}>
                  <TableHistoryTRisk
                    cursor='pointer'
                    employeeId={employeeId}
                    employeeName={staffSummary.data.employeeName}
                  />
                </BoxMiniFeat>
              </Flex>

              <Flex border='1px' flexDirection='column' borderColor={COLORS.black_second} bg={COLORS.green_100}>
                <Flex py={2} px={5}>
                  <Box width='20%'>{t('status')}</Box>
                  <Box width='250px'>
                    <SelectForm
                      options={OPTIONS_TRISK}
                      methods={methods}
                      name='riskSelection'
                      defaultValue={NO_SELECT_OPTION}
                      originValue={
                        [...OPTIONS_TRISK].map((option) => option.value).includes(policyProgress.riskSelection)
                          ? policyProgress.riskSelection
                          : null
                      }
                      isDisabled={isEditWorkflow({ track: !isEditing, other: false })}
                    />
                    <ShowError name='riskSelection' mt='10px' />
                  </Box>
                </Flex>
                <Flex pl={5} pr={2} pb={2}>
                  <Box width='20%'>{t('description')}</Box>
                  <Box width='80%'>
                    <FormTextArea
                      name='riskDescription'
                      resize='none'
                      height={50}
                      rows={2}
                      disabled={isEditWorkflow({ track: !isEditing, other: false })}
                    />
                  </Box>
                </Flex>
              </Flex>
            </Flex>
            <Divider height='4px' mt={1} bg={COLORS.black_second} opacity={1} />
            <Flex>
              <Box width='100%' mt='16px'>
                <PermissionWrapper haveNoti={false} path={ID_KEY[26]}>
                  {isEditWorkflow({ track: !isEditing, other: canView(ID_KEY[28]) }) ? (
                    <InputViewDropdown
                      label='■ 方針'
                      valueDropdown={methods.watch('policy')}
                      type='POLICY'
                      width='180px'
                    />
                  ) : (
                    <AsyncSelectForm
                      typeDropdown='POLICY'
                      methods={methods}
                      name='policy'
                      label='■ 方針'
                      originValue={methods.watch('policy')}
                      styleWrapperForm={{
                        display: 'flex',
                        gap: '40.5px',
                        alignItems: 'baseline',
                      }}
                      styleError={{
                        position: 'absolute',
                        top: '34px',
                        left: '102px',
                      }}
                      isClearable={false}
                      stylesProps={{
                        container: (provided) => ({
                          ...provided,
                          width: '180px',
                        }),
                      }}
                    />
                  )}
                </PermissionWrapper>
              </Box>
            </Flex>
            <Flex mt={4} flexDirection='column'>
              <Flex mb={1} alignItems='center'>
                <Box>■&nbsp;{t('whatShoudBe')}</Box>
                <Box position='relative' width='fit-content'>
                  {isEditWorkflow({ other: true }) && (
                    <Box
                      ml='10px'
                      right={currentLanguage('jp') ? '-40px' : '-50px'}
                      fontSize='8px'
                      top='4px'
                      color={COLORS.white}
                      background={COLORS.danger_300}
                      padding='2px 8px'
                    >
                      {tForm('required')}
                    </Box>
                  )}
                </Box>
              </Flex>
              <Box width='100%'>
                <FormTextArea
                  name='assignDescription'
                  resize='none'
                  height={100}
                  rows={4}
                  disabled={isEditWorkflow({ track: !isEditing, other: false })}
                />
              </Box>
            </Flex>
          </WrapperFlex>
          {!isViewWorkflow && (
            <Flex mt={10} gap='10px' justifyContent='end'>
              <>
                <CloseButton handleClose={onClose} />
                <DHMButton text='update' type='submit' />
              </>
              <ApproveModal
                typeBusinessDivision='方針と進捗'
                isOpen={isOpen}
                onConfirm={(dataWF) => {
                  onSubmit({
                    moreParmas: dataWF,
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
