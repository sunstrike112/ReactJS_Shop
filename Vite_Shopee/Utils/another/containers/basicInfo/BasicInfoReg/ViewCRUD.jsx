import { Box, Checkbox, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { BoxMiniFeat } from 'dhm/components/Box/BoxMiniFeat';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
import { WrapperSubForm } from 'dhm/components/Form/WrapperSubForm';
import { AsyncSelectForm } from 'dhm/components/Form/elements/AsyncSelect';
import { InputFormDate } from 'dhm/components/Form/elements/Date2';
import { InputViewDropdown } from 'dhm/components/Form/elements/InputView';
import { SelectForm } from 'dhm/components/Form/elements/Select';
import { InputForm } from 'dhm/components/Form/elements/Text';
import { TextareaForm } from 'dhm/components/Form/elements/Textarea';
import { ApproveModal } from 'dhm/components/Modal/elements/approveModal';
import { WrapperForm } from 'dhm/containers/auth/styled';
import { DeleteModal } from 'dhm/containers/modal/DeleteModal';
import { NotificationModal } from 'dhm/containers/modal/NotificationModal';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import { AppContext } from 'dhm/contexts/AppContext';
import { deleteBasicInfo } from 'dhm/store/basicInfo/action';
import { ROUTES } from 'dhm/utils/constants/routes';
import { ROYALTIES_OPTIONAL } from 'dhm/utils/constants/select';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { useContext } from 'react';
import { FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import { HistoryBasicInfo } from '../HistoryBasicInfo';

const CustomChecked = styled(Checkbox)`
  .chakra-checkbox__control {
    width: 32px;
    height: 32px;
  }
`;
const templateColumns = {
  base: 'repeat(1, 1fr)',
  md: 'repeat(2, 1fr)',
  lg: 'repeat(3, 1fr)',
};

function TemplateGrid({ children }) {
  return (
    <Grid mt='10px' templateColumns={templateColumns} gap='20px'>
      {children}
    </Grid>
  );
}

export function ViewCRUD({
  methods,
  handleSubmit,
  isValid,
  originData,
  onSuccess,
  navigate,
  conditionEnbledForm,
  watch,
  editing,
  isFieldInvalid,
  esResponsibility,
  ShowError,
  setEsResponsibility,
  onClose,
  modeForm,
  tForm,
  isOpen,
  onCloseModal,
  onSubmit,
  updatedUser,
  updatedDatetime,
  isOpenRetirement,
  onOpenRetirement,
  onCloseRetirement,
  setValue,
  tTable,
  royaltiesOptional,
  handleApprove,
  isViewWorkflow,
  isEditWorkflow,
  isEditing,
}) {
  const { heightApp } = useContext(AppContext);
  const { ID_KEY, canEdit, canView } = useContext(AbilityContext);

  return (
    <Box position='relative'>
      <FormProvider {...methods}>
        <WrapperForm
          onSubmit={handleSubmit(() => {
            if (isValid()) handleApprove();
          })}
        >
          <Flex justify='end'>
            <BoxMiniFeat justifyContent='end'>
              <HistoryBasicInfo
                cursor='pointer'
                ids={originData.data.employeeId}
                employeeName={originData.data.employeeName}
                modeView='basicInfo'
              />
              <HistoryBasicInfo
                cursor='pointer'
                ids={originData.data.employeeId}
                employeeName={originData.data.employeeName}
                modeView='basicSub'
              />
              {canEdit(ID_KEY[7]) && !isViewWorkflow && (
                <DeleteModal
                  type='deleteWF'
                  idRow={originData.data.employeeId}
                  typeBusinessDivision='基本Info'
                  callbackSuccess={() => {
                    onSuccess();
                    navigate(ROUTES.basic_info);
                  }}
                  action={deleteBasicInfo}
                />
              )}
            </BoxMiniFeat>
          </Flex>
          <Box
            overflow='auto'
            height={isViewWorkflow ? `calc(${heightApp} - 280px)` : `calc(${heightApp} - 220px)`}
            marginTop='12px'
            paddingRight='10px'
          >
            <Box>
              <TemplateGrid>
                <InputForm
                  name='employeeId'
                  label='社員ID'
                  isDisabled={isEditWorkflow({
                    track: !isEditing,
                    other: !editing,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: canView(ID_KEY[7]),
                  })}
                />
                {isEditWorkflow({
                  other: conditionEnbledForm,
                }) ? (
                  <AsyncSelectForm
                    typeDropdown='POSITION'
                    methods={methods}
                    name='position'
                    label='職位'
                    originValue={watch('position')}
                  />
                ) : (
                  <InputViewDropdown label='職位' valueDropdown={watch('position')} type='POSITION' />
                )}
                {isEditWorkflow({
                  other: conditionEnbledForm,
                }) ? (
                  <AsyncSelectForm
                    typeDropdown='GENDER'
                    methods={methods}
                    name='sex'
                    label='性別'
                    originValue={watch('sex')}
                  />
                ) : (
                  <InputViewDropdown label='性別' valueDropdown={watch('sex')} type='GENDER' />
                )}
              </TemplateGrid>
              <TemplateGrid>
                <InputForm
                  name='employeeName'
                  label='氏名'
                  isDisabled={isEditWorkflow({
                    track: !isEditing,
                    other: !editing,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: canView(ID_KEY[7]),
                  })}
                />
                <InputForm
                  name='employeeNameKana'
                  label='氏名（カタカナ）'
                  isDisabled={isEditWorkflow({
                    track: !isEditing,
                    other: !editing,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: canView(ID_KEY[7]),
                  })}
                />
                <InputForm
                  name='formerJob'
                  label='前職'
                  isDisabled={isEditWorkflow({
                    track: !isEditing,
                    other: !conditionEnbledForm,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: !conditionEnbledForm,
                  })}
                />
              </TemplateGrid>
              <TemplateGrid>
                <InputFormDate
                  name='birthday'
                  label='生年月日'
                  methods={methods}
                  max={new Date()}
                  showIcon
                  disabled={isEditWorkflow({
                    track: !isEditing,
                    other: !editing,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: canView(ID_KEY[7]),
                  })}
                />
                <InputFormDate
                  name='joiningCompany'
                  label='入社'
                  methods={methods}
                  typeShow='month'
                  showIcon
                  disabled={isEditWorkflow({
                    track: !isEditing,
                    other: !editing,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: canView(ID_KEY[7]),
                  })}
                />
                {isEditWorkflow({
                  other: conditionEnbledForm,
                }) ? (
                  <AsyncSelectForm
                    typeDropdown='MID_CAREER_NEW_GRADUATE'
                    methods={methods}
                    name='midCareerNewGraduate'
                    label='中途/新卒'
                    originValue={watch('midCareerNewGraduate')}
                  />
                ) : (
                  <InputViewDropdown
                    label='中途/新卒'
                    valueDropdown={watch('midCareerNewGraduate')}
                    type='MID_CAREER_NEW_GRADUATE'
                  />
                )}
              </TemplateGrid>
              <TemplateGrid>
                <InputForm
                  name='hobby'
                  label='趣味'
                  isDisabled={isEditWorkflow({
                    track: !isEditing,
                    other: !conditionEnbledForm,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: !conditionEnbledForm,
                  })}
                />
                <InputForm
                  name='goodFriends'
                  label='仲が良い人'
                  isDisabled={isEditWorkflow({
                    track: !isEditing,
                    other: !conditionEnbledForm,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: !conditionEnbledForm,
                  })}
                />
                <InputForm
                  name='coachMentor'
                  label='コーチ/メンター'
                  isDisabled={isEditWorkflow({
                    track: !isEditing,
                    other: !conditionEnbledForm,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: !conditionEnbledForm,
                  })}
                />
              </TemplateGrid>
              <Grid
                mt='10px'
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(4, 1fr)',
                }}
                gap='20px'
              >
                <InputForm
                  name='eduBackground'
                  label='学歴'
                  isDisabled={isEditWorkflow({
                    track: !isEditing,
                    other: !conditionEnbledForm,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: !conditionEnbledForm,
                  })}
                />
                {isEditWorkflow({
                  track: !isEditing,
                  other: canView(ID_KEY[7]) || originData.data.retirement === '02',
                }) ? (
                  <InputViewDropdown label='退職' valueDropdown={watch('retirement')} type='RETIREMENT' />
                ) : (
                  <Box>
                    <AsyncSelectForm
                      typeDropdown='RETIREMENT'
                      methods={methods}
                      name='retirement'
                      label='退職'
                      originValue={watch('retirement')}
                      isDisabled={canView(ID_KEY[7])}
                    />
                    <ShowError name='retirement' />
                  </Box>
                )}
                <Box>
                  <InputFormDate
                    name='retirementDate'
                    label='退職年月'
                    methods={methods}
                    showIcon
                    typeShow='month'
                    inputProps={{
                      border: isFieldInvalid('retirementDate')
                        ? `${BORDERS.border_1('#E53E3E')}`
                        : BORDERS.border_1(COLORS.gray_700),
                      boxShadow: isFieldInvalid('retirementDate') ? '0 0 0 1px #E53E3E !important' : 'none',
                    }}
                    disabled={isEditWorkflow({
                      track: !isEditing,
                      other: canView(ID_KEY[7]),
                    })}
                    onlyView={isEditWorkflow({
                      track: !isEditing,
                      other: canView(ID_KEY[7]),
                    })}
                  />
                  <ShowError name='retirementDate' />
                </Box>
                <Box>
                  <Box mb='10px'>ES責</Box>
                  <CustomChecked
                    value={esResponsibility}
                    isChecked={esResponsibility}
                    onChange={(e) => setEsResponsibility(e.target.checked)}
                    disabled={isEditWorkflow({
                      track: !isEditing,
                      other: canView(ID_KEY[7]),
                    })}
                  />
                </Box>
              </Grid>
              <WrapperSubForm title='入社経路' mt='30px'>
                <Flex gap='20px' width='70%'>
                  {isEditWorkflow({
                    other: conditionEnbledForm,
                  }) ? (
                    <Box>
                      <AsyncSelectForm
                        typeDropdown='COMP_JOINED_ROUTE'
                        methods={methods}
                        name='joiningPathOptional'
                        label='選択'
                        originValue={watch('joiningPathOptional')}
                        stylesProps={{
                          container: (provided) => ({
                            ...provided,
                            width: '200px',
                          }),
                          control: (provided) => ({
                            ...provided,
                            border:
                              conditionEnbledForm && isFieldInvalid('joiningPathOptional')
                                ? `${BORDERS.border_1('#E53E3E')} !important`
                                : BORDERS.border_1(COLORS.gray_700),
                            boxShadow:
                              conditionEnbledForm && isFieldInvalid('joiningPathOptional')
                                ? '0 0 0 1px #E53E3E !important'
                                : 'none',
                          }),
                        }}
                      />
                      {isEditWorkflow({
                        other: conditionEnbledForm,
                      }) && <ShowError name='joiningPathOptional' />}
                    </Box>
                  ) : (
                    <InputViewDropdown
                      label='選択'
                      valueDropdown={watch('joiningPathOptional')}
                      type='COMP_JOINED_ROUTE'
                    />
                  )}
                  {/* <InputForm name='joiningPathChargePerson' label='担当者' isDisabled={!conditionEnbledForm} /> */}
                </Flex>
                <Box>
                  <InputForm
                    name='joiningPathDescription'
                    label='記述'
                    isDisabled={isEditWorkflow({
                      track: !isEditing,
                      other: !conditionEnbledForm,
                    })}
                    onlyView={isEditWorkflow({
                      track: !isEditing,
                      other: !conditionEnbledForm,
                    })}
                  />
                  {isEditWorkflow({
                    other: conditionEnbledForm,
                  }) && <ShowError name='joiningPathDescription' />}
                </Box>
                <Box position='relative'>
                  <Text mb='5px'>入社理由</Text>
                  {isEditWorkflow({ other: true }) && (
                    <Box
                      position='absolute'
                      left='75px'
                      fontSize='8px'
                      top='4px'
                      color={COLORS.white}
                      background={COLORS.danger_300}
                      display={canView(ID_KEY[7]) ? 'none' : 'block'}
                      padding='2px 8px'
                    >
                      {tForm('required')}
                    </Box>
                  )}

                  {isEditWorkflow({
                    other: conditionEnbledForm,
                  }) && <ShowError name='joiningCompanyReason' />}
                </Box>
                <Grid
                  templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(4, 1fr)',
                  }}
                  gap='20px'
                >
                  <InputForm
                    name='joiningCompanyReason1'
                    border={
                      conditionEnbledForm && isFieldInvalid('joiningCompanyReason')
                        ? `${BORDERS.border_1('#E53E3E')}`
                        : BORDERS.border_1(COLORS.gray_700)
                    }
                    boxShadow={
                      conditionEnbledForm && isFieldInvalid('joiningCompanyReason')
                        ? '0 0 0 1px #E53E3E !important'
                        : 'none'
                    }
                    isDisabled={isEditWorkflow({
                      track: !isEditing,
                      other: !conditionEnbledForm,
                    })}
                    onlyView={isEditWorkflow({
                      track: !isEditing,
                      other: !conditionEnbledForm,
                    })}
                  />
                  <InputForm
                    name='joiningCompanyReason2'
                    border={
                      conditionEnbledForm && isFieldInvalid('joiningCompanyReason')
                        ? `${BORDERS.border_1('#E53E3E')}`
                        : BORDERS.border_1(COLORS.gray_700)
                    }
                    boxShadow={
                      conditionEnbledForm && isFieldInvalid('joiningCompanyReason')
                        ? '0 0 0 1px #E53E3E !important'
                        : 'none'
                    }
                    isDisabled={isEditWorkflow({
                      track: !isEditing,
                      other: !conditionEnbledForm,
                    })}
                    onlyView={isEditWorkflow({
                      track: !isEditing,
                      other: !conditionEnbledForm,
                    })}
                  />
                  <InputForm
                    name='joiningCompanyReason3'
                    border={
                      conditionEnbledForm && isFieldInvalid('joiningCompanyReason')
                        ? `${BORDERS.border_1('#E53E3E')}`
                        : BORDERS.border_1(COLORS.gray_700)
                    }
                    boxShadow={
                      conditionEnbledForm && isFieldInvalid('joiningCompanyReason')
                        ? '0 0 0 1px #E53E3E !important'
                        : 'none'
                    }
                    isDisabled={isEditWorkflow({
                      track: !isEditing,
                      other: !conditionEnbledForm,
                    })}
                    onlyView={isEditWorkflow({
                      track: !isEditing,
                      other: !conditionEnbledForm,
                    })}
                  />
                  <InputForm
                    name='joiningCompanyReason4'
                    border={
                      conditionEnbledForm && isFieldInvalid('joiningCompanyReason')
                        ? `${BORDERS.border_1('#E53E3E')}`
                        : BORDERS.border_1(COLORS.gray_700)
                    }
                    boxShadow={
                      conditionEnbledForm && isFieldInvalid('joiningCompanyReason')
                        ? '0 0 0 1px #E53E3E !important'
                        : 'none'
                    }
                    isDisabled={isEditWorkflow({
                      track: !isEditing,
                      other: !conditionEnbledForm,
                    })}
                    onlyView={isEditWorkflow({
                      track: !isEditing,
                      other: !conditionEnbledForm,
                    })}
                  />
                </Grid>
              </WrapperSubForm>
            </Box>
            <WrapperSubForm title='評価' mt='30px'>
              <Flex align='center' mt='15px' mb='10px' gap='10px' justify='space-between'>
                <div />
                {updatedUser && updatedDatetime && (
                  <Flex justify='end' alignItems='center' gap='5px'>
                    <Heading position='absolute' top='14px' right='25px' fontSize='16px'>
                      {tTable('quarterly_evaluation')}
                    </Heading>
                    {`最終更新者： ${updatedUser?.split('@')[0]} (${formatDateJP(updatedDatetime)})`}
                  </Flex>
                )}
              </Flex>
              <Box mb='10px'>
                <Text mb='5px'>Can（選択）</Text>
                <Grid templateColumns={{ base: '2fr 1fr 1fr' }} pl='30px' pr='30px' gap='40px'>
                  {/* Category */}
                  <Box>
                    <Text mb='10px'>■カテゴリ</Text>
                    <Flex gap='12px' mb='10px'>
                      <Box width='100%' mb='10px'>
                        {isEditWorkflow({
                          other: conditionEnbledForm,
                        }) ? (
                          <AsyncSelectForm
                            typeDropdown='CATEGORY_AREA'
                            methods={methods}
                            name='canSelCatUpStream'
                            label='上流'
                            originValue={methods.watch('canSelCatUpStream')}
                          />
                        ) : (
                          <InputViewDropdown
                            label='上流'
                            valueDropdown={methods.watch('canSelCatUpStream')}
                            type='CATEGORY_AREA'
                          />
                        )}
                      </Box>
                      <Box width='100%'>
                        {isEditWorkflow({
                          other: conditionEnbledForm,
                        }) ? (
                          <AsyncSelectForm
                            typeDropdown='CATEGORY_AREA'
                            methods={methods}
                            name='canSelCatPmoCus'
                            label='PMO、顧客'
                            originValue={methods.watch('canSelCatPmoCus')}
                          />
                        ) : (
                          <InputViewDropdown
                            label='PMO、顧客'
                            valueDropdown={methods.watch('canSelCatPmoCus')}
                            type='CATEGORY_AREA'
                          />
                        )}
                      </Box>
                    </Flex>
                    <Flex gap='12px'>
                      <Box width='100%'>
                        {isEditWorkflow({
                          other: conditionEnbledForm,
                        }) ? (
                          <AsyncSelectForm
                            typeDropdown='CATEGORY_AREA'
                            methods={methods}
                            name='canSelCatPmoSi'
                            label='PMO、SI'
                            originValue={methods.watch('canSelCatPmoSi')}
                          />
                        ) : (
                          <InputViewDropdown
                            label='PMO、SI'
                            valueDropdown={methods.watch('canSelCatPmoSi')}
                            type='CATEGORY_AREA'
                          />
                        )}
                      </Box>
                      <Box width='100%'>
                        {isEditWorkflow({
                          other: conditionEnbledForm,
                        }) ? (
                          <AsyncSelectForm
                            typeDropdown='CATEGORY_AREA'
                            methods={methods}
                            name='canSelCatSi'
                            label='SI'
                            originValue={methods.watch('canSelCatSi')}
                          />
                        ) : (
                          <InputViewDropdown
                            label='SI'
                            valueDropdown={methods.watch('canSelCatSi')}
                            type='CATEGORY_AREA'
                          />
                        )}
                      </Box>
                    </Flex>
                  </Box>

                  {/* 領域 */}
                  <Box>
                    <Text mb='10px'>■領域</Text>
                    <Box>
                      <Box width='100%' mb='20px'>
                        {isEditWorkflow({
                          other: conditionEnbledForm,
                        }) ? (
                          <AsyncSelectForm
                            typeDropdown='CATEGORY_AREA'
                            methods={methods}
                            name='canSelTerriroryApp'
                            label='アプリ'
                            originValue={methods.watch('canSelTerriroryApp')}
                          />
                        ) : (
                          <InputViewDropdown
                            label='アプリ'
                            valueDropdown={methods.watch('canSelTerriroryApp')}
                            type='CATEGORY_AREA'
                          />
                        )}
                      </Box>
                      <Box width='100%'>
                        {isEditWorkflow({
                          other: conditionEnbledForm,
                        }) ? (
                          <AsyncSelectForm
                            typeDropdown='CATEGORY_AREA'
                            methods={methods}
                            name='canSelTerriroryInfra'
                            label='インフラ'
                            originValue={methods.watch('canSelTerriroryInfra')}
                          />
                        ) : (
                          <InputViewDropdown
                            label='インフラ'
                            valueDropdown={methods.watch('canSelTerriroryInfra')}
                            type='CATEGORY_AREA'
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>

                  {/* 英語 */}
                  <Box>
                    <Text mb='10px'>■英語</Text>
                    <Box>
                      <Box width='100%' mb='20px'>
                        {isEditWorkflow({
                          other: conditionEnbledForm,
                        }) ? (
                          <AsyncSelectForm
                            typeDropdown='ENGLISH_LEVEL'
                            methods={methods}
                            name='canSelEnglishReadAndWrite'
                            label='読み書き'
                            originValue={methods.watch('canSelEnglishReadAndWrite')}
                          />
                        ) : (
                          <InputViewDropdown
                            label='読み書き'
                            valueDropdown={methods.watch('canSelEnglishReadAndWrite')}
                            type='ENGLISH_LEVEL'
                          />
                        )}
                      </Box>
                      <Box width='100%'>
                        {isEditWorkflow({
                          other: conditionEnbledForm,
                        }) ? (
                          <AsyncSelectForm
                            typeDropdown='ENGLISH_LEVEL'
                            methods={methods}
                            name='canSelEnglishListenToSpeak'
                            label='話す聞く'
                            originValue={methods.watch('canSelEnglishListenToSpeak')}
                          />
                        ) : (
                          <InputViewDropdown
                            label='話す聞く'
                            valueDropdown={methods.watch('canSelEnglishListenToSpeak')}
                            type='ENGLISH_LEVEL'
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Box>
              <Box position='relative'>
                <Text mb='5px'>Can</Text>
                {isEditWorkflow({ other: true }) && (
                  <Box
                    position='absolute'
                    left='35px'
                    fontSize='8px'
                    top='4px'
                    color={COLORS.white}
                    background={COLORS.danger_300}
                    display={canView(ID_KEY[7]) ? 'none' : 'block'}
                    padding='2px 8px'
                  >
                    {tForm('required')}
                  </Box>
                )}
                <ShowError name='can' />
              </Box>
              <Grid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(2, 1fr)',
                }}
                gap='20px'
              >
                <InputForm
                  name='can1'
                  isDisabled={!editing}
                  onlyView={canView(ID_KEY[7])}
                  border={
                    conditionEnbledForm && isFieldInvalid('can')
                      ? `${BORDERS.border_1('#E53E3E')}`
                      : BORDERS.border_1(COLORS.gray_700)
                  }
                  boxShadow={conditionEnbledForm && isFieldInvalid('can') ? '0 0 0 1px #E53E3E !important' : 'none'}
                />
                <InputForm
                  name='can2'
                  isDisabled={!editing}
                  onlyView={canView(ID_KEY[7])}
                  border={
                    conditionEnbledForm && isFieldInvalid('can')
                      ? `${BORDERS.border_1('#E53E3E')}`
                      : BORDERS.border_1(COLORS.gray_700)
                  }
                  boxShadow={conditionEnbledForm && isFieldInvalid('can') ? '0 0 0 1px #E53E3E !important' : 'none'}
                />
              </Grid>
              <Box position='relative'>
                <Text mb='5px'>Will</Text>
                {isEditWorkflow({ other: true }) && (
                  <Box
                    position='absolute'
                    left='35px'
                    fontSize='8px'
                    top='4px'
                    color={COLORS.white}
                    background={COLORS.danger_300}
                    display={canView(ID_KEY[7]) ? 'none' : 'block'}
                    padding='2px 8px'
                  >
                    {tForm('required')}
                  </Box>
                )}
                <ShowError name='will' />
              </Box>
              <Grid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(2, 1fr)',
                }}
                gap='20px'
              >
                <InputForm
                  name='will1'
                  isDisabled={!editing}
                  onlyView={canView(ID_KEY[7])}
                  border={
                    conditionEnbledForm && isFieldInvalid('will')
                      ? `${BORDERS.border_1('#E53E3E')}`
                      : BORDERS.border_1(COLORS.gray_700)
                  }
                  boxShadow={conditionEnbledForm && isFieldInvalid('will') ? '0 0 0 1px #E53E3E !important' : 'none'}
                />
                <InputForm
                  name='will2'
                  isDisabled={!editing}
                  onlyView={canView(ID_KEY[7])}
                  border={
                    conditionEnbledForm && isFieldInvalid('will')
                      ? `${BORDERS.border_1('#E53E3E')}`
                      : BORDERS.border_1(COLORS.gray_700)
                  }
                  boxShadow={conditionEnbledForm && isFieldInvalid('will') ? '0 0 0 1px #E53E3E !important' : 'none'}
                />
              </Grid>
            </WrapperSubForm>

            <WrapperSubForm title='ロイヤリティ' mt='30px'>
              {isEditWorkflow({
                other: editing,
              }) ? (
                <SelectForm
                  options={ROYALTIES_OPTIONAL}
                  methods={methods}
                  name='royaltiesOptional'
                  label='選択'
                  originValue={+royaltiesOptional || 0}
                  stylesProps={{
                    container: (provided) => ({
                      ...provided,
                      width: '120px',
                    }),
                  }}
                  isDisabled={!canEdit(ID_KEY[7])}
                />
              ) : (
                <InputForm name='royaltiesOptional' mb='10px' width='120px' label='選択' isDisabled onlyView />
              )}

              <TextareaForm
                name='royaltiesDescription'
                label='記述'
                isDisabled={isEditWorkflow({
                  track: !isEditing,
                  other: !editing,
                })}
                onlyView={isEditWorkflow({
                  track: !isEditing,
                  other: canView(ID_KEY[7]),
                })}
              />
            </WrapperSubForm>
          </Box>
          {!isViewWorkflow && (
            <Flex mt={10} gap='10px' justifyContent='end'>
              <CloseButton handleClose={onClose} />
              {canEdit(ID_KEY[7]) && <DHMButton text={modeForm === 'create' ? 'register' : 'update'} type='submit' />}
              <ApproveModal
                typeBusinessDivision='基本Info'
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

          <NotificationModal
            isOpen={isOpenRetirement}
            onOpen={onOpenRetirement}
            onClose={onCloseRetirement}
            callbackSuccess={() => {
              setValue('retirement', '01');
            }}
          />
        </WrapperForm>
      </FormProvider>
    </Box>
  );
}
