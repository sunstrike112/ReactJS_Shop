import { AddIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Img,
  useDisclosure,
} from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
import { InputForm } from 'dhm/components/Form/elements/Text';
import { ConfirmModal } from 'dhm/components/Modal/elements/confirmModal';
import { WrapperForm } from 'dhm/containers/auth/styled';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServiceRole } from 'dhm/store/manageUser/role/services';
import { COLORS } from 'dhm/utils/index';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TablePermission } from './tablePermission';

export function CRUForm({ type = 'create', originData = {}, table }) {
  const { tForm } = useContext(LanguageContext);
  const [dataListPermission, setDataListPermission] = useState([]);
  const { event } = ServiceRole();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

  const methods = useForm({
    defaultValues: originData,
    mode: 'onChange',
  });
  const { handleSubmit, reset, getValues } = methods;
  const getListPermission = () => {
    const payload = {
      onSuccess: () => {
        onOpen();
      },
    };
    event.getListPermission(payload);
  };
  const getDetailPermission = (id) => {
    const payload = {
      onSuccess: () => {
        const payloadDetail = {
          onSuccess: () => {
            onOpen();
          },
          data: {
            id,
          },
        };
        event.getDetailPermission(payloadDetail);
      },
    };
    event.getListPermission(payload);
  };
  const handleOpen = () => {
    reset();
    const methodOpen = {
      create: () => getListPermission(),
      edit: () => getDetailPermission(originData.roleId),
    };
    methodOpen[type]();
  };
  const handleClose = () => {
    onClose();
  };
  const onSubmit = () => {
    const data = getValues();
    const onSuccess = () => {
      handleClose();
      table.options.meta.funcResetDelete();
    };
    const payload = {
      data: {
        ...data,
        version: originData.version,
        roleId: data?.roleId?.trim() || 0,
        rolePermissionActionDto: dataListPermission,
      },
      onSuccess,
    };
    const dispatchFunc = {
      create: () => event.createRole(payload),
      // edit: () => event.updateRole(payload),
      edit: () => event.createRole(payload),
    };
    dispatchFunc[type]();
  };
  const titleModal = {
    create: tForm('role_create'),
    edit: tForm('role_edit'),
  };

  const chooseButton = {
    create: (
      <Box
        width='fit-content'
        cursor='pointer'
        onClick={handleOpen}
        padding='7px 18px'
        background={COLORS.neutral_300}
        color='white'
        _hover={{
          bg: COLORS.neutral_500,
        }}
      >
        <AddIcon boxSize={3} mr={2} />
        {tForm('add')}
      </Box>
    ),
    view: <IconButton size='sm' icon={<ViewIcon />} mr='2' onClick={handleOpen} />,
    edit: <Img src={DHMAssets.ICON_EDIT_BLACK} onClick={handleOpen} cursor='pointer' />,
  };
  return (
    <>
      {chooseButton[type]}
      <>
        <Drawer isOpen={isOpen} placement='right' onClose={onClose} id='basic_info' closeOnOverlayClick={false}>
          <DrawerOverlay />
          <DrawerContent position='relative'>
            <CloseButton handleClose={handleClose} typeClose='drawer' />
            <DrawerHeader color={COLORS.white} bg={COLORS.brand_1}>
              {titleModal[type]}
            </DrawerHeader>
            <DrawerBody>
              <FormProvider {...methods}>
                <WrapperForm onSubmit={handleSubmit(onOpenConfirm)}>
                  <Flex justify='space-between' mb='10px'>
                    <Flex gap='10px' minWidth='40%'>
                      <Flex gap='10px' paddingTop='10px'>
                        <Box mt='-4px' width='65px'>
                          ロールID
                        </Box>
                        <Box
                          fontSize='8px'
                          color={COLORS.white}
                          background={COLORS.danger_300}
                          padding='2px 11px'
                          height='18px'
                          width='40px'
                          display={type === 'create' ? 'block' : 'none'}
                        >
                          {tForm('required')}
                        </Box>
                      </Flex>
                      <InputForm name='roleId' isDisabled={type === 'edit'} />
                    </Flex>
                    <Flex gap='10px' minWidth='40%'>
                      <Flex gap='10px' paddingTop='10px'>
                        <Box mt='-4px' width='80px'>
                          ロール名称
                        </Box>
                        <Box
                          fontSize='8px'
                          color={COLORS.white}
                          background={COLORS.danger_300}
                          padding='2px 11px'
                          height='18px'
                          width='40px'
                        >
                          {tForm('required')}
                        </Box>
                      </Flex>
                      <InputForm name='roleName' />
                    </Flex>
                  </Flex>
                  <Flex justify='space-between' mb='10px'>
                    <Box> </Box>
                    <Flex gap='10px' minWidth='40%'>
                      <Flex gap='10px' paddingTop='10px'>
                        <Box mt='-4px' width='80px'>
                          ロール記述
                        </Box>
                        <Box fontSize='8px' padding='2px 11px' height='18px' width='40px' />
                      </Flex>
                      <InputForm width='100%' name='roleDescription' />
                    </Flex>
                  </Flex>
                  <TablePermission setDataPermission={setDataListPermission} />
                  <Flex mt={10} gap='10px' justifyContent='end'>
                    <CloseButton handleClose={handleClose} />
                    <DHMButton text={type === 'create' ? 'register' : 'update'} type='submit' />
                  </Flex>
                </WrapperForm>
              </FormProvider>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <ConfirmModal
          isOpen={isOpenConfirm}
          onConfirm={() => {
            onSubmit();
            onCloseConfirm();
          }}
          onCancel={() => {
            onCloseConfirm();
          }}
          type={type === 'create' ? 'create' : 'update'}
        />
      </>
    </>
  );
}
