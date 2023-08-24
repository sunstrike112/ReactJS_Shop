import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, useDisclosure } from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button';
import { InputForm } from 'dhm/components/Form/elements/Text';
import DHMModal from 'dhm/components/Modal';
import { WrapperForm } from 'dhm/containers/auth/styled';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { inviteUser } from 'dhm/store/setting/action';
import { WIDTH } from 'dhm/utils/constants/style';
import { useContext } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export default function CreateAccount() {
  const { tForm } = useContext(LanguageContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const methods = useForm({
    mode: 'onChange',
  });
  const { handleSubmit, reset, control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'account',
  });
  const dispatch = useDispatch();

  const handleOpen = () => {
    reset();
    append({ email: '', name: '' });
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  const onSubmit = (data) => {
    const onSuccess = () => {
      handleClose();
    };
    const payload = {
      data: data.account,
      onSuccess,
    };
    dispatch(inviteUser(payload));
  };

  const propsModal = {
    size: '2xl',
    title: tForm('invite_user'),
    isOpen,
    onCancel: handleClose,
    typeHeader: 'info',
    onConfirm: handleSubmit(onSubmit),
  };

  return (
    <>
      <Box mt='5px' mb='5px'>
        <DHMButton w={WIDTH.w_160} buttonType='cancel' onClick={handleOpen} text={tForm('invite_user')} />
      </Box>
      <DHMModal
        {...propsModal}
        haveConfirm
        content={({ onOpenConfirm }) => (
          <FormProvider {...methods}>
            <WrapperForm
              onSubmit={(e) => {
                e.preventDefault();
                onOpenConfirm();
              }}
            >
              {fields.map((field, index) => (
                <HStack key={field.id} gap='24px' height='100px' alignItems='start'>
                  <Flex width='60%'>
                    <InputForm
                      placeholder='ex:ex@gmail.com'
                      label={tForm('email')}
                      {...field}
                      name={`account.${index}.email`}
                    />
                  </Flex>
                  <Flex width='40%' gap='40px'>
                    <InputForm label={tForm('name')} {...field} name={`account.${index}.name`} />
                    {fields.length > 1 && (
                      <Box alignSelf='center' pt='30px' cursor='pointer' onClick={() => remove(index)}>
                        <DeleteIcon boxSize={3} mr={2} />
                      </Box>
                    )}
                  </Flex>
                </HStack>
              ))}
              {fields.length < 5 && (
                <Box width='fit-content' cursor='pointer' onClick={() => append({ email: '', name: '' })}>
                  <AddIcon boxSize={3} mr={2} />
                  {tForm('add')}
                </Box>
              )}
              <Flex mt={5} gap='10px' justifyContent='end'>
                <DHMButton onClick={handleClose} text='cancel' buttonType='cancel' />
                <DHMButton buttonType='info' text='inviteUser' type='submit' />
              </Flex>
            </WrapperForm>
          </FormProvider>
        )}
      />
    </>
  );
}
