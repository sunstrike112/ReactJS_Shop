import { Box, Flex, Img, useDisclosure } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { DHMBox } from 'dhm/components/Box';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
import { FormTextArea } from 'dhm/components/Form/elements/FormTextArea';
import { SelectForm } from 'dhm/components/Form/elements/Select';
import DHMModal from 'dhm/components/Modal';
import { WrapperForm } from 'dhm/containers/auth/styled';
import LanguageContext, { currentLanguage } from 'dhm/contexts/TranslateContext';
import { ServiceWorkflow } from 'dhm/store/workflow/services';
import { PROCESS_TYPE } from 'dhm/utils/constants/select';
import { STATUS } from 'dhm/utils/constants/type';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { BORDERS, COLORS } from 'dhm/utils/index';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export function ModalProcessList({
  type = 'create',
  originData = {},
  processMatter,
  pagination,
  paginationCompleted,
  payloadParams,
  statusMatter,
}) {
  const { user, updateProcessAction, getProcessListIncompleteAction, getProcessListCompletedAction } =
    ServiceWorkflow();
  const { tForm, tWorkflow } = useContext(LanguageContext);
  const { BoxText } = DHMBox;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const methods = useForm({
    defaultValues: originData,
    mode: 'onChange',
  });
  const { mail } = user;
  const { ALL, CANCEL, APPROVAL_DENIAL } = PROCESS_TYPE;

  const processTypeDropdown = (applicant, approverRequest, agentRequest) => {
    const cancelArray = CANCEL.map((item) => ({ value: item.value, label: tWorkflow(item.label) }));
    const approvalDenialArray = APPROVAL_DENIAL.map((item) => ({ value: item.value, label: tWorkflow(item.label) }));
    const allArray = ALL.map((item) => ({ value: item.value, label: tWorkflow(item.label) }));

    if (mail === applicant && mail !== approverRequest && mail !== agentRequest) return cancelArray;
    if (mail !== applicant && mail === approverRequest && mail !== agentRequest) return approvalDenialArray;
    if (mail !== applicant && mail !== approverRequest && mail === agentRequest) return approvalDenialArray;
    if (mail === applicant && mail === approverRequest && mail !== agentRequest) return allArray;
    if (mail !== applicant && mail === approverRequest && mail === agentRequest) return approvalDenialArray;
    if (mail === applicant && mail !== approverRequest && mail === agentRequest) return allArray;
    if (mail === applicant && mail === approverRequest && mail === agentRequest) return allArray;
    return [];
  };

  const { handleSubmit, reset, getValues } = methods;
  const handleOpen = () => {
    reset();
    onOpen();
  };
  const handleClose = () => {
    onClose();
  };
  const onSubmit = () => {
    const payload = {
      data: {
        matterNos: [originData.matterNo],
        wfStatusId: getValues().wfStatusId,
        processComment: getValues().processComment,
      },
      onSuccess: () => {
        if (processMatter)
          getProcessListIncompleteAction({
            params: {
              ...payloadParams.params,
              page: 1,
              limit: pagination.limit,
              applicant: true,
            },
          });
        else
          getProcessListCompletedAction({
            params: {
              ...payloadParams.params,
              page: 1,
              limit: paginationCompleted.limit,
              approverRequest: statusMatter === STATUS.DONE,
            },
          });

        handleClose();
      },
    };
    updateProcessAction(payload);
  };

  const propsModal = {
    title: tWorkflow('caseProcessing'),
    isOpen,
    onCancel: handleClose,
    onConfirm: onSubmit,
  };
  const chooseButton = {
    process: <Img src={DHMAssets.ICON_PROCESS} onClick={handleOpen} cursor='pointer' />,
  };
  return (
    <>
      {chooseButton[type]}
      <DHMModal
        {...propsModal}
        haveConfirm
        size='3xl'
        typeConfirm='update'
        content={({ onOpenConfirm }) => (
          <FormProvider {...methods}>
            <WrapperForm onSubmit={handleSubmit(onOpenConfirm)}>
              <Flex flexDirection='column' gap='20px'>
                <Flex position='relative'>
                  <Box width='250px'>{tWorkflow('processingType')}</Box>
                  <Box
                    position='absolute'
                    width='fit-content'
                    left={currentLanguage('jp') ? '80px' : '120px'}
                    top='5px'
                    fontSize='8px'
                    color={COLORS.white}
                    background={COLORS.danger_300}
                    padding='2px 8px'
                  >
                    {tForm('required')}
                  </Box>
                  <Box width='200px'>
                    <SelectForm
                      options={processTypeDropdown(
                        originData.applicant,
                        originData.approverRequest,
                        originData.agentRequest,
                      )}
                      methods={methods}
                      name='wfStatusId'
                      label=''
                    />
                  </Box>
                </Flex>
                <Flex>
                  <Box width='250px'>{tWorkflow('matterNo')}</Box>
                  <BoxText
                    width='200px'
                    height='38px'
                    label={originData.matterNo}
                    pl='15px'
                    pt='5px'
                    line={1}
                    alignItems='center'
                    overflow='hidden'
                    lineHeight='30px'
                    textOverflow='ellipsis'
                    bg={COLORS.gray_400}
                    border={BORDERS.border_1(COLORS.black_primary)}
                  >
                    {originData.matterNo}
                  </BoxText>
                </Flex>
                <Flex>
                  <Box width='250px'>{tWorkflow('matterName')}</Box>
                  <BoxText
                    width='200px'
                    height='38px'
                    label={originData.matterName}
                    pl='15px'
                    pt='5px'
                    line={1}
                    alignItems='center'
                    overflow='hidden'
                    lineHeight='30px'
                    textOverflow='ellipsis'
                    bg={COLORS.gray_400}
                    border={BORDERS.border_1(COLORS.black_primary)}
                  >
                    {originData.matterName}
                  </BoxText>
                </Flex>
                <Flex>
                  <Box width='250px'>{tWorkflow('applicationInformation')}</Box>
                  <Flex flexDirection='column' border={BORDERS.border_1(COLORS.black_primary)}>
                    <Flex>
                      <Flex
                        width='200px'
                        height='38px'
                        pl='10px'
                        alignItems='center'
                        borderRight={BORDERS.border_1(COLORS.black_primary)}
                        borderBottom={BORDERS.border_1(COLORS.black_primary)}
                      >
                        {tWorkflow('applicant')}
                      </Flex>
                      <BoxText
                        width='240px'
                        pl='10px'
                        pt='3px'
                        alignItems='center'
                        label={originData.applicant}
                        line={1}
                        overflow='hidden'
                        lineHeight='30px'
                        textOverflow='ellipsis'
                        bg={COLORS.gray_400}
                        borderBottom={BORDERS.border_1(COLORS.black_primary)}
                      >
                        {originData.applicant}
                      </BoxText>
                    </Flex>
                    <Flex>
                      <Flex
                        width='200px'
                        height='38px'
                        pl='10px'
                        alignItems='center'
                        borderRight={BORDERS.border_1(COLORS.black_primary)}
                        borderBottom={BORDERS.border_1(COLORS.black_primary)}
                      >
                        {tWorkflow('applicantDate')}
                      </Flex>
                      <BoxText
                        width='240px'
                        pl='10px'
                        pt='3px'
                        alignItems='center'
                        label={originData.applyDate}
                        line={1}
                        overflow='hidden'
                        lineHeight='30px'
                        textOverflow='ellipsis'
                        bg={COLORS.gray_400}
                        borderBottom={BORDERS.border_1(COLORS.black_primary)}
                      >
                        {formatDateJP(originData.applyDate)}
                      </BoxText>
                    </Flex>
                    <Flex>
                      <Flex
                        width='200px'
                        height='38px'
                        pl='10px'
                        alignItems='center'
                        borderRight={BORDERS.border_1(COLORS.black_primary)}
                        borderBottom={BORDERS.border_1(COLORS.black_primary)}
                      >
                        {tWorkflow('applicationComment')}
                      </Flex>
                      <BoxText
                        width='240px'
                        pl='10px'
                        pt='3px'
                        alignItems='center'
                        label={originData.applyComment}
                        line={1}
                        overflow='hidden'
                        lineHeight='30px'
                        textOverflow='ellipsis'
                        bg={COLORS.gray_400}
                        borderBottom={BORDERS.border_1(COLORS.black_primary)}
                      >
                        {originData.applyComment}
                      </BoxText>
                    </Flex>
                    <Flex>
                      <Flex
                        alignItems='center'
                        width='200px'
                        height='38px'
                        pl='10px'
                        borderRight={BORDERS.border_1(COLORS.black_primary)}
                      >
                        {tWorkflow('businessDivision')}
                      </Flex>
                      <BoxText
                        width='240px'
                        pl='10px'
                        pt='3px'
                        alignItems='center'
                        label={originData.careerName}
                        line={1}
                        overflow='hidden'
                        lineHeight='30px'
                        textOverflow='ellipsis'
                        bg={COLORS.gray_400}
                      >
                        {originData.careerName}
                      </BoxText>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex>
                  <Box width='250px'>{tWorkflow('processingComment')}</Box>
                  <Box borderColor={COLORS.black_second} width='440px'>
                    <FormTextArea name='processComment' resize='none' height={100} />
                  </Box>
                </Flex>
              </Flex>
              <Flex mt={10} gap='10px' justifyContent='end'>
                <CloseButton handleClose={handleClose} />
                <DHMButton text='update' type='submit' />
              </Flex>
            </WrapperForm>
          </FormProvider>
        )}
      />
    </>
  );
}
