import { QuestionIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { BoxMiniFeat } from 'dhm/components/Box/BoxMiniFeat';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
import { CloseIconButton } from 'dhm/components/Button/closeIcon';
import { InputFormDate } from 'dhm/components/Form/elements/Date2';
import { InputForm } from 'dhm/components/Form/elements/Text';
import DHMModal from 'dhm/components/Modal';
import { WrapperForm } from 'dhm/containers/auth/styled';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServiceOvertime } from 'dhm/store/overtime/services';
import { YEAR_RANGE } from 'dhm/utils/constants/select';
import { COLORS } from 'dhm/utils/constants/style';
import { formatDateJP, formatYearForDatepicker } from 'dhm/utils/helpers/format';
import { useCallback, useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { TableHistoryOvertimeSetting } from './TableHistoryOvertimeSetting';

const WrapperBox = styled(Box)`
  .react-datepicker {
    position: relative;
  }
  .react-datepicker__year {
    width: 200px;
  }
  .react-datepicker__year-wrapper {
    justify-content: center;
    margin: 0 auto;
  }
  .react-datepicker__navigation--next,
  .react-datepicker__navigation--previous {
    position: absolute;
    top: 7px;
  }
  .chakra-input:focus {
    outline: none;
  }
`;

export function RegisterOvertime({ isOpen, onClose }) {
  const { isOpen: isOpenConfirmModal, onOpen: onOpenConfirmModal, onClose: onCloseConfirmModal } = useDisclosure();
  const {
    confirmOvertimeSetting,
    createOvertimeAction,
    updateOvertimeAction,
    clearConfirmOvertimeSettingAction,
    yearOvertimeSetting,
    getYearOvertimeSettingAction,
    clearYearOvertimeSettingAction,
  } = ServiceOvertime();
  const { tCsv, tForm } = useContext(LanguageContext);
  const methods = useForm({
    defaultValues: {
      year: formatYearForDatepicker(new Date().getFullYear()),
      monthlyOtLimit: null,
    },
  });
  const { handleSubmit, getValues, setValue, watch, reset, clearErrors } = methods;
  const [fiscalYearWatch] = watch(['fiscalYearOvertime']);
  useEffect(() => {
    if (isOpen && fiscalYearWatch)
      getYearOvertimeSettingAction({ fiscalYear: formatDateJP(getValues().fiscalYearOvertime)?.slice(0, 4) });
  }, [fiscalYearWatch]);

  useEffect(() => {
    if (isOpen && fiscalYearWatch) {
      setValue('monthlyOtLimit', yearOvertimeSetting.monthlyOtLimit);
      clearErrors('monthlyOtLimit');
    }
  }, [fiscalYearWatch, yearOvertimeSetting.year]);

  const handleClose = () => {
    reset();
    clearYearOvertimeSettingAction();
    onClose();
  };
  const onSubmit = useCallback(() => {
    const payload = {
      data: {
        monthlyOtLimit: getValues().monthlyOtLimit,
        fiscalYear: formatDateJP(getValues().fiscalYearOvertime).slice(0, 4),
      },
      onSuccess: () => {
        onClose();
        clearYearOvertimeSettingAction();
      },
    };
    createOvertimeAction(payload);
  }, [getValues]);
  const onConfirmSubmit = useCallback(() => {
    const payload = {
      data: {
        monthlyOtLimit: getValues().monthlyOtLimit,
        fiscalYear: formatDateJP(getValues().fiscalYearOvertime).slice(0, 4),
      },
      onSuccess: () => {
        onClose();
      },
    };
    updateOvertimeAction(payload);
  }, [getValues]);

  const propsModal = {
    title: tCsv('overtime_setting'),
    isOpen,
    onCancel: handleClose,
    onConfirm: onSubmit,
  };

  useEffect(() => {
    if (confirmOvertimeSetting.type === 'confirm/overtime-setting') {
      onOpenConfirmModal();
    }
  }, [confirmOvertimeSetting]);

  const handleCancelConfirmModal = () => {
    clearConfirmOvertimeSettingAction();
    onCloseConfirmModal();
  };
  const handleSubmitConfirmModal = () => {
    onConfirmSubmit();
    clearConfirmOvertimeSettingAction();
    onCloseConfirmModal();
  };

  return (
    <>
      <DHMModal
        {...propsModal}
        haveConfirm
        typeConfirm='create'
        content={({ onOpenConfirm }) => (
          <FormProvider {...methods}>
            <WrapperForm position='relative' onSubmit={handleSubmit(onOpenConfirm)}>
              <WrapperBox position='absolute'>
                <InputForm width='0px' height='0px' name='clone' textAlign='right' border='0px' variant='unstyled' />
              </WrapperBox>
              <Flex flexDirection='column' gap='10px'>
                <WrapperBox width='200px'>
                  <InputFormDate
                    width='200px'
                    borderColor={COLORS.gray_700}
                    name='fiscalYearOvertime'
                    label={tCsv('year')}
                    dateFormat='yyyy'
                    methods={methods}
                    minDate={new Date(YEAR_RANGE.MIN)}
                    max={new Date(YEAR_RANGE.MAX)}
                    showYearPicker
                    showIcon
                  />
                </WrapperBox>
                <InputForm
                  label={tCsv('overtime_setting')}
                  name='monthlyOtLimit'
                  width='200px'
                  textAlign='right'
                  setValue={setValue}
                />
              </Flex>
              <Flex mt={10} gap='10px' justifyContent='end'>
                <CloseButton handleClose={handleClose} />
                <DHMButton text='register' type='submit' />
              </Flex>
              <BoxMiniFeat position='absolute' top='70px' right='15px' bg={COLORS.white}>
                <TableHistoryOvertimeSetting cursor='pointer' />
              </BoxMiniFeat>
              <Box position='absolute' top='15px' right='20px'>
                <CloseIconButton handleClose={handleClose} />
              </Box>
            </WrapperForm>
          </FormProvider>
        )}
      />
      {confirmOvertimeSetting.type === 'confirm/overtime-setting' && (
        <DHMModal
          title={tForm('confirm')}
          prevIcon={<QuestionIcon mr='5px' />}
          isOpen={confirmOvertimeSetting.type === 'confirm/overtime-setting' && isOpenConfirmModal}
          onCancel={onCloseConfirmModal}
          titleProps={{ textAlign: 'center' }}
          typeHeader='delete'
          content={() => (
            <>
              <Text>{confirmOvertimeSetting.message}</Text>
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
    </>
  );
}
