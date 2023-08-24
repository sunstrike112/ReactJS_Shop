import { Flex, Img, useDisclosure, VStack } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
import { DateForm } from 'dhm/components/Form/elements/Date';
import { InputForm } from 'dhm/components/Form/elements/Text';
import DHMModal from 'dhm/components/Modal';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServicesCompanyPolicy } from 'dhm/store/companyPolicy/services';
import { formatDateISO, formatDateJP } from 'dhm/utils/helpers/format';
import { useCallback, useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { WrapperForm } from '../auth/styled';

export function CRUForm({ type = 'create', originData = {}, methodsTable }) {
  const { tTable } = useContext(LanguageContext);
  const { createCompanyPolicyAction, updateCompanyPolicyAction } = ServicesCompanyPolicy();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const paramsDefaultEdit = { ...originData };
  const { handleSubmit, reset, watch, getValues, ...methods } = useForm({
    defaultValues: type === 'edit' ? paramsDefaultEdit : originData,
    mode: 'onChange',
  });

  const handleOpen = () => {
    reset();
    onOpen();
  };
  const handleClose = () => {
    onClose();
  };

  const onSubmit = useCallback(() => {
    const onSuccess = () => {
      methodsTable.callbackDelete();
      handleClose();
    };
    const payload = {
      data: {
        ...getValues(),
        effectStartDate: formatDateJP(getValues().effectStartDate),
        effectEndDate: formatDateJP(getValues().effectEndDate),
      },
      onSuccess,
    };
    const dispatchFunc = {
      create: () => createCompanyPolicyAction(payload),
      edit: () => updateCompanyPolicyAction(payload),
    };
    dispatchFunc[type]();
  }, [getValues, originData]);

  const titleModal = {
    create: tTable('company_policy_classification_registration'),
    edit: tTable('company_policy_classification_edit'),
    // view: tTable('training_detail'),
  };
  const propsModal = {
    title: titleModal[type],
    isOpen,
    onCancel: handleClose,
    onConfirm: onSubmit,
  };
  const chooseButton = {
    create: <DHMButton buttonType='create' onClick={handleOpen} text='register' />,
    // view: <IconButton aria-label='View department' size='sm' icon={<ViewIcon />} mr='2' onClick={handleOpen} />,
    edit: <Img src={DHMAssets.EditIcon} onClick={handleOpen} cursor='pointer' />,
  };
  return (
    <>
      {chooseButton[type]}
      <DHMModal
        {...propsModal}
        haveConfirm
        content={({ onOpenConfirm }) => (
          <FormProvider {...methods}>
            <WrapperForm onSubmit={handleSubmit(onOpenConfirm)}>
              <VStack spacing={4} w='full' maxW='md'>
                <InputForm
                  label={tTable('company_policy_classification_code')}
                  name='compPolicyClassCode'
                  isDisabled={type !== 'create'}
                  onlyView={type !== 'create'}
                  width='200px'
                />
                <InputForm
                  label={tTable('company_policy_classification_name')}
                  name='compPolicyClassName'
                  onlyView={type === 'view'}
                  width='200px'
                />
                {type === 'view' ? (
                  <Flex gap='24px'>
                    <InputForm
                      label={tTable('effective_start_date')}
                      name='effectStartDate'
                      value={formatDateJP(originData.effectStartDate)}
                      isDisabled={type !== 'create'}
                      onlyView={type === 'view'}
                    />
                    <InputForm
                      label={tTable('expiration_date')}
                      name='effectEndDate'
                      value={formatDateJP(originData.effectEndDate)}
                      isDisabled={type !== 'create'}
                      onlyView={type === 'view'}
                    />
                  </Flex>
                ) : (
                  <Flex gap='24px'>
                    <DateForm
                      label={tTable('effective_start_date')}
                      name='effectStartDate'
                      methods={methods}
                      defaultDate={originData.effectStartDate}
                      propsCalendar={{
                        min: formatDateISO(new Date()),
                        max: watch('effectEndDate') || null,
                      }}
                    />
                    <DateForm
                      label={tTable('expiration_date')}
                      name='effectEndDate'
                      methods={methods}
                      defaultDate={originData.effectEndDate}
                      propsCalendar={{
                        min: watch('effectStartDate') || null,
                      }}
                    />
                  </Flex>
                )}
              </VStack>
              <Flex mt={10} gap='10px' justifyContent='end'>
                <CloseButton handleClose={handleClose} />
                {type !== 'view' && <DHMButton text={type === 'create' ? 'register' : 'update'} type='submit' />}
              </Flex>
            </WrapperForm>
          </FormProvider>
        )}
      />
    </>
  );
}
