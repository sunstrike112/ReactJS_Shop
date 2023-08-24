import { Box, Flex, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { BoxTextFlex } from 'dhm/components/Box/BoxText';
import { DHMButton } from 'dhm/components/Button';
import { SelectForm } from 'dhm/components/Form/elements/Select';
import { InputForm } from 'dhm/components/Form/elements/Text';
import { TextareaForm } from 'dhm/components/Form/elements/Textarea';
import { WrapperForm } from 'dhm/containers/auth/styled';
import { getDropdownWorkflowADMIN } from 'dhm/store/common/action';
import { NO_SELECT_OPTION } from 'dhm/utils/constants/select';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { BORDERS, COLORS } from 'dhm/utils/index';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export function convertToNestedObject(inputObj) {
  function flattenObject(obj, parentKey = '', sep = '.') {
    return Object.entries(obj).reduce((result, [key, value]) => {
      const newKey = parentKey ? parentKey + sep + key : key;
      if (typeof value === 'object' && value !== null) {
        Object.assign(result, flattenObject(value, newKey, sep));
      } else {
        result[newKey] = value;
      }
      return result;
    }, {});
  }

  const flattenedObj = flattenObject(inputObj);
  return flattenedObj;
}

export function ApproveModal({ onConfirm = () => {}, onCancel = () => {}, isOpen = false, typeBusinessDivision = '' }) {
  const { dropdownWorkflowAdmin } = useSelector((state) => state.common);
  const { user } = useSelector((state) => state.auth);
  const renderFilter = useMemo(
    () =>
      dropdownWorkflowAdmin.map((item) => ({
        value: item.email,
        label: item.userName,
      })),
    [dropdownWorkflowAdmin],
  );
  const methods = useForm({
    mode: 'onChange',
  });
  const { handleSubmit, watch } = methods;
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const paramsWorkflow = {
      workflow: {
        approverRequest: data.approverRequest,
        matterName: data.matterName,
        agentRequest: data.agentRequest,
        applyComment: data.applyComment,
      },
    };
    onConfirm(paramsWorkflow);
    onCancel();
  };
  const handleCancel = () => {
    onCancel();
  };
  useEffect(() => {
    if (isOpen) {
      dispatch(getDropdownWorkflowADMIN());
    }
  }, [isOpen]);

  return (
    <>
      <Modal size='xl' isOpen={isOpen} closeOnOverlayClick={false} closeOnEsc={false} isCentered onClose={handleCancel}>
        <ModalOverlay />
        <ModalContent borderRadius={BORDERS.radius_0}>
          <ModalHeader
            background={COLORS.master_primary}
            color={COLORS.white}
            textAlign='start'
            borderRadius={BORDERS.radius_0_top}
          >
            申請
          </ModalHeader>
          <ModalBody pb={4}>
            <FormProvider {...methods}>
              <WrapperForm onSubmit={handleSubmit(onSubmit)}>
                <InputForm
                  mb='10px'
                  styleWrapperForm={{
                    display: 'flex',
                    gap: '50px',
                  }}
                  name='matterName'
                  label='リクエスト名'
                  width='205px'
                  styleError={{
                    position: 'absolute',
                    top: '35px',
                    left: '160px',
                    fontSize: '12px',
                  }}
                />
                <Flex margin='10px 0'>
                  <Box width='160px'>申請者</Box>
                  <BoxTextFlex
                    fontSize='16px'
                    height='38px'
                    bg='#fff'
                    border={BORDERS.border_1(`#b7b7b7`)}
                    cursor='not-allowed'
                    pointerEvents='all'
                    width='205px'
                    padding='5px 16px'
                  >
                    {user.mail}
                  </BoxTextFlex>
                </Flex>
                <Flex margin='10px 0'>
                  <Box width='160px'>申請日</Box>
                  <BoxTextFlex
                    fontSize='16px'
                    height='38px'
                    bg='#fff'
                    border={BORDERS.border_1(`#b7b7b7`)}
                    cursor='not-allowed'
                    pointerEvents='all'
                    width='205px'
                    padding='5px 16px'
                  >
                    {formatDateJP(new Date())}
                  </BoxTextFlex>
                </Flex>
                <Flex margin='10px 0'>
                  <Box width='160px'>業務区分</Box>
                  <BoxTextFlex
                    fontSize='16px'
                    height='38px'
                    bg='#fff'
                    border={BORDERS.border_1(`#b7b7b7`)}
                    cursor='not-allowed'
                    pointerEvents='all'
                    width='205px'
                    padding='5px 16px'
                  >
                    {typeBusinessDivision}
                  </BoxTextFlex>
                </Flex>
                <Box mt='10px' mb='25px'>
                  <SelectForm
                    options={renderFilter}
                    methods={methods}
                    name='approverRequest'
                    label='承認者'
                    originValue={watch('approverRequest')}
                    stylesProps={{
                      container: (provided) => ({
                        ...provided,
                        width: '205px',
                      }),
                    }}
                    styleWrapperForm={{
                      display: 'flex',
                      gap: '100px',
                    }}
                    styleError={{
                      position: 'absolute',
                      top: '33px',
                      left: '160px',
                      fontSize: '12px',
                    }}
                  />
                </Box>
                <Box mt='10px' mb='25px'>
                  <SelectForm
                    options={[NO_SELECT_OPTION, ...renderFilter]}
                    methods={methods}
                    name='agentRequest'
                    label='代理者'
                    originValue={watch('agentRequest')}
                    stylesProps={{
                      container: (provided) => ({
                        ...provided,
                        width: '205px',
                      }),
                    }}
                    styleWrapperForm={{
                      display: 'flex',
                      gap: '100px',
                    }}
                    styleError={{
                      position: 'absolute',
                      top: '33px',
                      left: '160px',
                      fontSize: '12px',
                    }}
                  />
                </Box>
                <TextareaForm
                  name='applyComment'
                  label='申請コメント'
                  resize='none'
                  height={100}
                  mt='10px'
                  width='357px'
                  styleWrapperForm={{
                    display: 'flex',
                    gap: '52px',
                  }}
                  styleError={{
                    position: 'absolute',
                    top: '110px',
                    left: '160px',
                    fontSize: '12px',
                  }}
                />
                <Flex mt={10} gap='10px' justifyContent='end'>
                  {/* <CloseButton handleClose={handleClose} /> */}
                  <DHMButton onClick={handleCancel} text='cancel' buttonType='cancel' />
                  <DHMButton text='update' type='submit' />
                </Flex>
              </WrapperForm>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
