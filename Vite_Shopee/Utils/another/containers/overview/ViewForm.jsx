import { Box, Flex, Grid, Image, Img } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { BoxMiniFeat } from 'dhm/components/Box/BoxMiniFeat';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
import { CheckboxForm } from 'dhm/components/Form/elements/CheckBox';
import { InputFormDate } from 'dhm/components/Form/elements/Date2';
import { SelectForm } from 'dhm/components/Form/elements/Select';
import { InputForm } from 'dhm/components/Form/elements/Text';
import { ApproveModal } from 'dhm/components/Modal/elements/approveModal';
import { WrapperForm } from 'dhm/containers/auth/styled';
import { TableHistoryOverviewInfo } from 'dhm/containers/overview/HistoryOverviewInfo';
import { LEVEL_RELATION, YEAR_RANGE } from 'dhm/utils/constants/select';
import { BORDERS, BOX_SHADOW, COLORS } from 'dhm/utils/constants/style';
import { FormProvider } from 'react-hook-form';

const templateColumns = {
  base: 'repeat(1, 1fr)',
  md: 'repeat(2, 1fr)',
  lg: 'repeat(3, 1fr)',
};

function TemplateGrid({ children, ...rest }) {
  return (
    <Grid mt='25px' templateColumns={templateColumns} gap='20px' {...rest}>
      {children}
    </Grid>
  );
}

export function ViewForm({
  methods,
  handleSubmit,
  isValid,
  inputFile,
  employeeId,
  imgPreview,
  originData,
  NO_SELECT_OPTION,
  handleGetListEsMngPred,
  loadingListEsManger,
  listEsManagerPred,
  t,
  actionRequiredWatch,
  handleHighUrgent,
  status,
  onClose,
  isOpen,
  onCloseModal,
  ShowError,
  handleUploadAvatar,
  staffSummary,
  heightApp,
  handleNoConcern,
  handleLowUrgent,
  onSubmit,
  handleApprove,
  watch,
  setValue,
  isViewWorkflow,
  isEditWorkflow,
  isEditing,
}) {
  return (
    <Box position='relative'>
      <FormProvider {...methods}>
        <WrapperForm
          onSubmit={handleSubmit(() => {
            if (isValid()) handleApprove();
          })}
        >
          <Box position='absolute' top='50px' right='10px'>
            <button type='button' onClick={() => inputFile.current.click()}>
              <Image
                width='134px'
                height='134px'
                rounded='50%'
                alt={employeeId}
                border={BORDERS.border_1(COLORS.primary_400)}
                src={imgPreview || originData.picPerson || DHMAssets.DEFAULT_USER}
              />
              <input
                type='file'
                id='file'
                onChange={(event) => handleUploadAvatar(event)}
                ref={inputFile}
                style={{ display: 'none' }}
                accept='image/*'
                disabled={isEditWorkflow({
                  track: !isEditing,
                  other: false,
                })}
              />
            </button>
          </Box>
          <Flex justify='space-between' pl={2}>
            <TemplateGrid>
              <InputForm
                width={304}
                name='employeeId'
                label={t('employeeId')}
                pointerEvents='none'
                bg={COLORS.gray_400}
                onlyView
              />
            </TemplateGrid>
            <BoxMiniFeat justifyContent='end' position='absolute' top='5px' right='10px'>
              <TableHistoryOverviewInfo
                cursor='pointer'
                employeeId={employeeId}
                employeeName={staffSummary.data.employeeName}
              />
            </BoxMiniFeat>
          </Flex>
          <Box
            overflow='auto'
            height={isViewWorkflow ? `calc(${heightApp} - 340px)` : `calc(${heightApp} - 275px)`}
            marginTop='12px'
            pl={2}
          >
            <Box>
              <Flex flexDirection='column'>
                <Box fontWeight={600} my={2}>
                  {t('status')}
                </Box>
                <Flex pointerEvents='auto' justifyContent='start' width={200} gap={5}>
                  <Img
                    p='10px'
                    width='50px'
                    height='50px'
                    rounded='50%'
                    name='noConcern'
                    cursor='pointer'
                    bg={COLORS.noConcern}
                    onClick={handleNoConcern}
                    opacity={status.isNoConcern && COLORS.disable}
                    boxShadow={!status.isNoConcern && BOX_SHADOW.active_status}
                    borderBottom={BORDERS.border_3(COLORS.black_primary)}
                    borderRight={BORDERS.border_3(COLORS.black_primary)}
                    borderTop={BORDERS.border_1(COLORS.black_primary)}
                    borderLeft={BORDERS.border_1(COLORS.black_primary)}
                    src={DHMAssets.NO_CONCERN}
                    pointerEvents={
                      isEditWorkflow({
                        track: !isEditing,
                        other: false,
                      })
                        ? 'none'
                        : 'all'
                    }
                  />
                  <Img
                    p='10px'
                    width='50px'
                    height='50px'
                    rounded='50%'
                    name='lowUrgent'
                    cursor='pointer'
                    bg={COLORS.lowUrgent}
                    onClick={handleLowUrgent}
                    opacity={status.isLowUrgent && COLORS.disable}
                    boxShadow={!status.isLowUrgent && BOX_SHADOW.active_status}
                    borderBottom={BORDERS.border_3(COLORS.black_primary)}
                    borderRight={BORDERS.border_3(COLORS.black_primary)}
                    borderTop={BORDERS.border_1(COLORS.black_primary)}
                    borderLeft={BORDERS.border_1(COLORS.black_primary)}
                    src={DHMAssets.LOW_URGENT}
                    pointerEvents={
                      isEditWorkflow({
                        track: !isEditing,
                        other: false,
                      })
                        ? 'none'
                        : 'all'
                    }
                  />
                  <Img
                    p='10px'
                    width='50px'
                    height='50px'
                    rounded='50%'
                    name='highUrgent'
                    cursor='pointer'
                    bg={COLORS.highUrgent}
                    onClick={handleHighUrgent}
                    opacity={status.isHighUrgent && COLORS.disable}
                    boxShadow={!status.isHighUrgent && BOX_SHADOW.active_status}
                    borderBottom={BORDERS.border_3(COLORS.black_primary)}
                    borderRight={BORDERS.border_3(COLORS.black_primary)}
                    borderTop={BORDERS.border_1(COLORS.black_primary)}
                    borderLeft={BORDERS.border_1(COLORS.black_primary)}
                    src={DHMAssets.HIGH_URGENT}
                    pointerEvents={
                      isEditWorkflow({
                        track: !isEditing,
                        other: false,
                      })
                        ? 'none'
                        : 'all'
                    }
                  />
                </Flex>
                <ShowError name='status' mt='10px' />
              </Flex>
              <Flex gap='20px' my={5}>
                <Box width='300px'>
                  <SelectForm
                    options={listEsManagerPred}
                    methods={methods}
                    name='esManager'
                    label={t('esManager')}
                    defaultValue={NO_SELECT_OPTION}
                    originValue={watch('esManager')}
                    onInputChange={() => handleGetListEsMngPred()}
                    isLoading={loadingListEsManger}
                    otherOnChange={() => {
                      if (originData?.esManager !== (watch('esManager') || '')) {
                        setValue('esManagerStartDate', null);
                        setValue('predecessorEndDate', null);
                      }
                    }}
                    isDisabled={isEditWorkflow({ track: !isEditing, other: false })}
                    onlyView={isEditWorkflow({ track: !isEditing, other: false })}
                  />
                </Box>
                <Box>
                  <InputFormDate
                    name='esManagerStartDate'
                    label='担当開始日'
                    methods={methods}
                    defaultDate={originData.esManagerStartDate}
                    minDate={new Date()}
                    max={new Date(YEAR_RANGE.MAX)}
                    showIcon
                    disabled={isEditWorkflow({
                      track: !isEditing,
                      other: originData?.esManager === (watch('esManager') || ''),
                    })}
                  />
                </Box>
                <Box width='100px'>
                  <SelectForm
                    options={LEVEL_RELATION}
                    methods={methods}
                    name='relationship'
                    label={t('relationship')}
                    originValue={originData.relationship}
                    isDisabled={isEditWorkflow({ track: !isEditing, other: false })}
                  />
                </Box>
                <Box width='100px'>
                  <SelectForm
                    options={LEVEL_RELATION}
                    methods={methods}
                    name='comprehension'
                    label={t('comprehension')}
                    originValue={originData.comprehension}
                    isDisabled={isEditWorkflow({ track: !isEditing, other: false })}
                  />
                </Box>
              </Flex>
              <TemplateGrid>
                <SelectForm
                  options={[NO_SELECT_OPTION, ...listEsManagerPred]}
                  methods={methods}
                  name='predecessor'
                  label={t('predecessor')}
                  originValue={watch('predecessor')}
                  defaultValue={NO_SELECT_OPTION}
                  onInputChange={() => handleGetListEsMngPred()}
                  isLoading={loadingListEsManger}
                  isDisabled={isEditWorkflow({ track: !isEditing, other: false })}
                />
                <Box width='214.4px'>
                  <InputFormDate
                    name='predecessorEndDate'
                    label='担当終了日'
                    methods={methods}
                    defaultDate={watch('predecessorEndDate')}
                    showIcon={false}
                    disabled
                    showBoxBlank={!watch('predecessor')}
                  />
                </Box>
              </TemplateGrid>
              <TemplateGrid>
                <CheckboxForm
                  type='checkbox'
                  label={t('actionRequired')}
                  name='actionRequired'
                  disabled={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                />
              </TemplateGrid>
              <TemplateGrid>
                <Box>
                  <InputFormDate
                    name='whenEnd'
                    label={t('whenEnd')}
                    methods={methods}
                    defaultDate={originData.whenEnd}
                    isClearable={actionRequiredWatch}
                    minDate={new Date()}
                    max={new Date(YEAR_RANGE.MAX)}
                    showIcon={actionRequiredWatch}
                    disabled={
                      !actionRequiredWatch
                        ? true
                        : isEditWorkflow({
                            track: !isEditing,
                            other: !actionRequiredWatch,
                          })
                    }
                    onlyView={
                      !actionRequiredWatch
                        ? true
                        : isEditWorkflow({
                            track: !isEditing,
                            other: !actionRequiredWatch,
                          })
                    }
                  />
                  <ShowError name='whenEnd' mt='10px' />
                </Box>
                <Box>
                  <InputForm
                    name='whatTodo'
                    label={t('whatToDo')}
                    isDisabled={
                      !actionRequiredWatch
                        ? true
                        : isEditWorkflow({
                            track: !isEditing,
                            other: !actionRequiredWatch,
                          })
                    }
                    onlyView={
                      !actionRequiredWatch
                        ? true
                        : isEditWorkflow({
                            track: !isEditing,
                            other: !actionRequiredWatch,
                          })
                    }
                  />
                  <ShowError name='whatTodo' mt='10px' />
                </Box>
              </TemplateGrid>
              <TemplateGrid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(4, 1fr)',
                }}
              >
                <CheckboxForm
                  type='checkbox'
                  label={t('pinasaFlag')}
                  name='pinasaFlag'
                  disabled={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                />
                <CheckboxForm
                  type='checkbox'
                  label='上司薄い'
                  name='bossThin'
                  disabled={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                />
                <CheckboxForm
                  type='checkbox'
                  label={t('overtimeFlag')}
                  name='overtimeFlag'
                  disabled={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                />
                <CheckboxForm
                  type='checkbox'
                  label={t('leaveOff')}
                  name='leaveOff'
                  disabled={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                />
              </TemplateGrid>
              <TemplateGrid
                mt={30}
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(4, 1fr)',
                }}
              >
                <CheckboxForm
                  type='checkbox'
                  label={t('childcareMaternityLeave')}
                  name='childcareMaternityLeave'
                  disabled={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                />
                <CheckboxForm
                  type='checkbox'
                  label={t('notInOperation')}
                  name='notInOperation'
                  disabled={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                />
              </TemplateGrid>
            </Box>
          </Box>
          {!isViewWorkflow && (
            <Flex mt={10} gap='10px' justifyContent='end'>
              <>
                <CloseButton handleClose={onClose} />
                <DHMButton text='update' type='submit' />
              </>

              <ApproveModal
                typeBusinessDivision='概要'
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
