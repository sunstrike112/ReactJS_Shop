import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
import { InputFormDate } from 'dhm/components/Form/elements/Date2';
import { FormTextArea } from 'dhm/components/Form/elements/FormTextArea';
import { SelectForm } from 'dhm/components/Form/elements/Select';
import { ApproveModal } from 'dhm/components/Modal/elements/approveModal';
import { WrapperForm } from 'dhm/containers/auth/styled';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { DHMHook } from 'dhm/hooks/index';
import { ServicesInterviewLog } from 'dhm/store/interviewLog/services';
import { MESS_ERROR } from 'dhm/utils/constants/messageId';
import { YEAR_RANGE } from 'dhm/utils/constants/select';
import { formatDateJP } from 'dhm/utils/helpers/format';
import debounce from 'lodash/debounce';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getDataCreateInterviewLog } from './config';

export function CreateFormInterviewlog({ onClose = () => {} }) {
  const {
    getInterviewLogAction,
    createInterviewLogAction,
    listEsMngPred,
    OPTIONS_INTERVIEW_CATEGORY,
    loadingListEsManger,
    getEsMngPredAction,
  } = ServicesInterviewLog();

  const { employeeId } = useParams();
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();
  const { tInterviewLog } = useContext(LanguageContext);
  const methods = useForm({
    defaultValues: {
      employeeId,
    },
    mode: 'onChange',
  });

  const [listEsManagerPred, setListEsManagerPred] = useState(
    [...listEsMngPred.data]?.map((item) => ({
      value: item.userCode,
      label: item.esMngPred,
    })),
  );

  const { getValues, handleSubmit, watch } = methods;
  const [dateWatch, nextDateWatch] = watch(['date', 'nextDate']);
  const { isValid, setError, ShowError, clearError } = DHMHook.useSetError();

  const getDataParams = () => {
    const data = getValues();
    const dataPayload = getDataCreateInterviewLog({ data, employeeId });

    return { dataPayload };
  };
  const handleApprove = () => {
    onOpen();
  };
  const onSubmit = useCallback(
    ({ moreParams }) => {
      const { dataPayload } = getDataParams();
      const handleSuccess = () => {
        onClose();
        setTimeout(() => {
          getInterviewLogAction({
            params: {
              employeeId,
              isHistory: false,
              sortColumn: 'date',
              sortType: 'desc',
              isAll: false,
              limit: 10,
              page: 1,
            },
          });
        }, 500);
      };
      const payload = {
        data: { ...dataPayload, ...moreParams },
        onSuccess: handleSuccess,
      };
      createInterviewLogAction(payload);
    },
    [getValues],
  );

  useEffect(() => {
    getEsMngPredAction({
      params: {
        deleteFlg: 0,
        isHistory: false,
        sortType: 'desc',
        isAll: true,
      },
    });
  }, []);
  useEffect(() => {
    setListEsManagerPred(
      [...listEsMngPred.data]?.map((item) => ({
        value: item.userCode,
        label: item.esMngPred,
      })),
    );
  }, [listEsMngPred]);

  useEffect(() => {
    if (nextDateWatch && new Date(formatDateJP(dateWatch)) >= new Date(formatDateJP(nextDateWatch))) {
      setError('nextDate', {
        type: 'invalid',
        message: MESS_ERROR.INTERVIEW_LOG.nextDate,
      });
    } else {
      clearError('nextDate');
    }
    if (formatDateJP(dateWatch) === null) clearError('nextDate');
  }, [dateWatch, nextDateWatch]);

  const handleGetListEsMngPred = useCallback(
    debounce(() => {
      getEsMngPredAction({
        params: {
          deleteFlg: 0,
          isHistory: false,
          sortType: 'desc',
          isAll: true,
        },
      });
    }, 500),
    [],
  );

  return (
    <Box position='relative'>
      <FormProvider {...methods}>
        <WrapperForm
          onSubmit={handleSubmit(() => {
            if (isValid()) handleApprove();
          })}
        >
          <Flex width='80%' justify='space-between' alignItems='flex-start' gap={2} mt={4}>
            <Box width='200px'>
              <InputFormDate
                name='date'
                label={tInterviewLog('date')}
                methods={methods}
                minDate={new Date()}
                max={new Date(YEAR_RANGE.MAX)}
                showIcon
              />
            </Box>
            <Box width='200px'>
              <SelectForm
                options={listEsManagerPred}
                methods={methods}
                name='esManagerCode'
                label={tInterviewLog('esStaff')}
                onInputChange={() => handleGetListEsMngPred()}
                isLoading={loadingListEsManger}
              />
            </Box>
            <Box width='200px'>
              <SelectForm
                options={OPTIONS_INTERVIEW_CATEGORY}
                methods={methods}
                name='category'
                label={tInterviewLog('inteviewCategory')}
              />
            </Box>
          </Flex>
          <Flex mt={4} flexDirection='column'>
            <Box width='100%'>
              <FormTextArea
                label={tInterviewLog('content')}
                name='content'
                resize='none'
                minHeight='calc(100vh - 400px)'
                rows={4}
              />
            </Box>
          </Flex>
          <Box mt={4}>
            <InputFormDate
              name='nextDate'
              width='200px'
              label={tInterviewLog('dateOfNextInterview')}
              methods={methods}
              minDate={new Date()}
              max={new Date(YEAR_RANGE.MAX)}
              showIcon
            />
          </Box>
          <ShowError name='nextDate' mt='10px' />
          <Flex mt={10} gap='10px' justifyContent='end'>
            <>
              <CloseButton handleClose={onClose} />
              <DHMButton text='register' type='submit' />
            </>
            <ApproveModal
              typeBusinessDivision='面談ログ'
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
        </WrapperForm>
      </FormProvider>
    </Box>
  );
}
