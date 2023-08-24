import { QuestionIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
import { AsyncSelectForm } from 'dhm/components/Form/elements/AsyncSelect';
import { CheckboxForm } from 'dhm/components/Form/elements/CheckBox';
import { InputFormDate } from 'dhm/components/Form/elements/Date2';
import { FormTextArea } from 'dhm/components/Form/elements/FormTextArea';
import { InputViewDropdown } from 'dhm/components/Form/elements/InputView';
import { SelectForm } from 'dhm/components/Form/elements/Select';
import { InputForm } from 'dhm/components/Form/elements/Text';
import { TextareaForm } from 'dhm/components/Form/elements/Textarea';
import DHMModal from 'dhm/components/Modal';
import { ApproveModal } from 'dhm/components/Modal/elements/approveModal';
import { WrapperForm } from 'dhm/containers/auth/styled';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { DHMHook } from 'dhm/hooks/index';
import { ServiceProjectInfo } from 'dhm/store/projectInfo/services';
import { YEAR_RANGE } from 'dhm/utils/constants/select';
import { COLORS } from 'dhm/utils/constants/style';
import { formatArray } from 'dhm/utils/helpers/method';
import { useCallback, useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { dataConfirmProjectInfo, dataCreateProjectInfo } from './config';

const WrapperFlex = styled(Flex)`
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${COLORS.gray_primary};
  }
`;

export function CreateFormProjectInfo({ onClose = () => {} }) {
  const { ID_KEY, canView, PermissionWrapper } = useContext(AbilityContext);
  const {
    confirmProjectInfo,
    clearConfirmProjectInfoAction,
    getProjectInfoAction,
    createProjectInfoAction,
    updateProjectInfoAction,
    OPTIONS_RECOGNIZE_PERSON,
  } = ServiceProjectInfo();
  const { employeeId } = useParams();
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();
  const { isOpen: isOpenConfirmModal, onOpen: onOpenConfirmModal, onClose: onCloseConfirmModal } = useDisclosure();
  const { tForm, tProjectInfo } = useContext(LanguageContext);
  const methods = useForm({
    defaultValues: {
      employeeId,
      upstream: 0,
      pmoCustomer: 0,
      pmoSI: 0,
      SI: 0,
      app: 0,
      infrastructure: 0,
    },
    mode: 'onChange',
  });
  const { getValues, handleSubmit, setValue } = methods;
  const { isValid } = DHMHook.useSetError();

  const getDataParams = () => {
    const data = getValues();
    const dataMain = dataCreateProjectInfo({ data, employeeId });
    const dataConfirm = dataConfirmProjectInfo({ data, employeeId, confirmProjectInfo });

    return { dataMain, dataConfirm };
  };
  const handleApprove = () => {
    onOpen();
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
      createProjectInfoAction(payload);
    },
    [getValues],
  );
  const onConfirmSubmit = useCallback(() => {
    const { dataConfirm } = getDataParams();

    const payload = {
      data: dataConfirm,
      onSuccess: () => {
        onClose();
        clearConfirmProjectInfoAction();
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
      },
    };
    updateProjectInfoAction(payload);
  }, [getValues, confirmProjectInfo]);

  useEffect(() => {
    if (confirmProjectInfo.type === 'confirm') {
      onOpenConfirmModal();
    }
  }, [confirmProjectInfo]);

  const handleCancelConfirmModal = () => {
    clearConfirmProjectInfoAction();
    onCloseConfirmModal();
  };
  const handleSubmitConfirmModal = () => {
    onConfirmSubmit();
    onCloseConfirmModal();
  };
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
          <WrapperFlex
            flexDirection='column'
            height='calc(94vh - 100px)'
            overflow='auto'
            justify='flex-start'
            pr='10px'
          >
            <Flex justify='space-between' pl={2} gap={5} mt={3}>
              <InputForm width='230px' name='projectId' label={tProjectInfo('projectID')} />
              <InputForm width='230px' name='projectName' label={tProjectInfo('projectName')} />
            </Flex>
            <Flex justify='space-between' pl={2} gap={5} mt={3}>
              <InputForm width='230px' name='client' label={tProjectInfo('client')} />
              <InputForm width='230px' name='counter' label={tProjectInfo('counter')} />
            </Flex>
            <Flex justify='space-between' pl={2} gap={5} mt={3}>
              <Box width='540px'>
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
                />
              </Box>
              <Box width='540px'>
                <InputForm width='230px' name='salesInCharge' label={tProjectInfo('saleInCharge')} />
              </Box>
            </Flex>
            <Flex position='relative' justify='space-between' pl={2} gap={5} mt={3}>
              <InputForm
                name='unitPrice'
                width='230px'
                textAlign='right'
                label={tProjectInfo('unitPrice')}
                setValue={setValue}
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
              />
              <Box position='absolute' right='180px' top='40px'>
                万円
              </Box>
            </Flex>
            <Flex justify='space-between' pl={2} gap={5} mt={3}>
              <InputForm width='230px' textAlign='right' name='evaluation' label={tProjectInfo('evaluation')} />
              <InputForm width='230px' name='rater' label={tProjectInfo('assessor')} />
            </Flex>
            <Flex pl={2} gap={5}>
              <Flex mt={4} flexDirection='column' width='50%'>
                <Box width='100%'>
                  <PermissionWrapper
                    haveNoti={false}
                    path={ID_KEY[26]}
                    otherShow={() => (
                      <InputForm name='salesEvaluation' label='' position='absolute' width='0' height='0' opacity='0' />
                    )}
                  >
                    {canView(ID_KEY[26]) ? (
                      <>
                        <InputViewDropdown
                          label='営業評価'
                          valueDropdown={methods.watch('salesEvaluation')}
                          type='SALE_EVALUATION'
                        />
                      </>
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
                <PermissionWrapper haveNoti={false} path={ID_KEY[27]}>
                  <Box width='100%'>
                    <TextareaForm
                      name='salesComment'
                      width='100%'
                      resize='none'
                      height='38'
                      minHeight='36px'
                      label='営業コメント'
                      disabled={canView(ID_KEY[27])}
                    />
                  </Box>
                </PermissionWrapper>
              </Flex>
            </Flex>
            <Flex pl={2} gap={5}>
              <Flex mt={4} flexDirection='column' width='50%'>
                <Box width='100%'>
                  <FormTextArea
                    label={tProjectInfo('qualitativeEvaluation')}
                    name='qualEvalHrBrain'
                    resize='none'
                    height={70}
                    rows={4}
                  />
                </Box>
              </Flex>
              <Flex mt={4} flexDirection='column' width='50%'>
                <Box width='100%'>
                  <FormTextArea
                    label={tProjectInfo('qualitativeEvaluatioOther')}
                    name='qualEvalOthers'
                    resize='none'
                    height={70}
                    rows={4}
                  />
                </Box>
              </Flex>
            </Flex>
            <Flex pl={2} mt={4} flexDirection='column'>
              <Box width='100%'>
                <FormTextArea
                  label={tProjectInfo('businessContent')}
                  name='businessContent'
                  resize='none'
                  height={70}
                  rows={4}
                />
              </Box>
            </Flex>
            <Flex flexDirection='column' pl={2} gap={1} mt={1}>
              <Flex mb={1}>
                <Box fontWeight='500'>{tProjectInfo('businessCategory')}</Box>
              </Flex>
              <Flex width='90%'>
                <CheckboxForm mr={3} type='checkbox' label={tProjectInfo('upstream')} name='upstream' />
                <CheckboxForm mr={3} type='checkbox' label={tProjectInfo('pmoCustomer')} name='pmoCustomer' />
                <CheckboxForm mr={3} type='checkbox' label={tProjectInfo('pmoSI')} name='pmoSI' />
                <CheckboxForm mr={3} type='checkbox' label={tProjectInfo('SI')} name='SI' />
                <CheckboxForm mr={3} type='checkbox' label={tProjectInfo('app')} name='app' />
                <CheckboxForm mr={3} type='checkbox' label={tProjectInfo('infrastructure')} name='infrastructure' />
              </Flex>
            </Flex>
            <Flex flexDirection='column' gap={5} mt={2} pl={2}>
              <Box width='300px'>
                <SelectForm
                  onMenuOpen={handleScrollSelect}
                  options={OPTIONS_RECOGNIZE_PERSON}
                  methods={methods}
                  label={tProjectInfo('recognitionOfPerson')}
                  name='recognitionOfPerson'
                />
              </Box>
            </Flex>
          </WrapperFlex>
          <Flex mt={10} gap='10px' justifyContent='end'>
            <>
              <CloseButton handleClose={onClose} />
              <DHMButton text='register' type='submit' />
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
            {confirmProjectInfo.type === 'confirm' && (
              <DHMModal
                title={tForm('confirm')}
                prevIcon={<QuestionIcon mr='5px' />}
                isOpen={confirmProjectInfo.type === 'confirm' && isOpenConfirmModal}
                onCancel={onCloseConfirmModal}
                titleProps={{ textAlign: 'center' }}
                typeHeader='delete'
                content={() => (
                  <>
                    <Text>{confirmProjectInfo.message}</Text>
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
          </Flex>
        </WrapperForm>
      </FormProvider>
    </Box>
  );
}
