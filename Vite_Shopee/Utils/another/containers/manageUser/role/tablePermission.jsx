/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Radio, Button, Flex, Box, useDisclosure } from '@chakra-ui/react';
import { ServiceRole } from 'dhm/store/manageUser/role/services';
import { COLORS } from 'dhm/utils/index';
import { ConfirmForm } from 'dhm/containers/auth/resetPassword/confirmForm';
import { ConfirmModal } from 'dhm/components/Modal/elements/confirmModal';
import { combineArray, combineResult } from './methodPermission';

const WIDTH_FIRST_COLUMN = '350px';
const WIDTH_OTHER_COLUMN = '200px';
export function TablePermission({ setDataPermission = () => {} }) {
  const { state } = ServiceRole();
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenLevel1, onOpen: onOpenLevel1, onClose: onCloseLevel1 } = useDisclosure();
  const [prevSelected, setPrevSelected] = useState({
    keyChildren: [],
    mainKey: null,
    mainAction: null,
  });
  const handlePermissionChange = (key, actionId) => {
    const [keyLevel1, keyLevel2] = key.split('-');

    if (keyLevel2) {
      const filterKeylevel1 = Object.keys(selectedPermissions).filter((item) => item === keyLevel1);
      const getValueKeyLevel1 = selectedPermissions[filterKeylevel1];
      if (actionId < getValueKeyLevel1) {
        onOpen();
      } else {
        setSelectedPermissions((prev) => ({
          ...prev,
          [key]: actionId,
        }));
      }
    } else {
      const filterKeylevel2 = Object.keys(selectedPermissions)
        .filter((item) => item.includes(key))
        .filter((item) => item !== key);
      const valueKeylevel2 = Math.max(filterKeylevel2.map((item) => selectedPermissions[item]));
      if (valueKeylevel2 && actionId > valueKeylevel2) {
        onOpenLevel1();
        setPrevSelected({
          keyChildren: filterKeylevel2,
          mainKey: key,
          mainAction: actionId,
        });
      } else {
        setSelectedPermissions((prev) => ({
          ...prev,
          [key]: actionId,
        }));
      }
    }
  };

  const data = useMemo(() => {
    const arrayData = combineArray(state.listPermission, state.detailPermission);
    const combinedData = arrayData.map((item) => ({
      id: item.id,
      permissionLevel1Name: item.permissionLevel1Name,
      permissionLevel2Name: item.permissionLevel2Name || '',
      permissionLevel1: item.permissionLevel1,
      permissionLevel2: item.permissionLevel2 || '',
      versionPermission: item.version,
      actionId: +item.actionId,
    }));
    const level1Permissions = combinedData.filter((item) => item.permissionLevel2 === '');
    const level2Permissions = combinedData.filter((item) => item.permissionLevel2 !== '');

    level1Permissions.forEach((level1) => {
      handlePermissionChange(level1.permissionLevel1, level1.actionId);
      level1.children = level2Permissions.filter((level2) => {
        handlePermissionChange(`${level2.permissionLevel1}-${level2.permissionLevel2}`, level2.actionId);
        return level2.permissionLevel1 === level1.permissionLevel1;
      });
    });
    return level1Permissions;
  }, [state.listPermission]);
  const [expandedLevel1, setExpandedLevel1] = useState([]);

  const handleToggleExpand = (permissionLevel1) => {
    setExpandedLevel1((prev) => {
      if (prev.includes(permissionLevel1)) {
        return prev.filter((item) => item !== permissionLevel1);
      }
      return [...prev, permissionLevel1];
    });
  };

  const handleGetFinalData = useCallback(() => {
    const finalData = Object.keys(selectedPermissions).map((key) => {
      const [permissionLevel1, permissionLevel2] = key.split('-');
      return {
        permissionLevel1: permissionLevel1 || null,
        permissionLevel2: permissionLevel2 || null,
        actionId: selectedPermissions[key],
        versionPermission: state.detailPermission.length > 0 ? state.detailPermission[0]?.version : 0,
      };
    });
    // const handleData = combineResult(finalData, state.detailPermission);
    // if (state.detailPermission.length > 0) {
    //   setDataPermission(handleData);
    // } else {
    //   setDataPermission(finalData);
    // }
    setDataPermission(finalData);
  }, [selectedPermissions, state.detailPermission]);

  useEffect(() => {
    handleGetFinalData();
  }, [handleGetFinalData]);

  const renderHeaders = () => (
    <Tr>
      <Th paddingLeft='10px' color={COLORS.white} width={WIDTH_FIRST_COLUMN}>
        許可名称
      </Th>
      <Th textAlign='center' color={COLORS.white} width={WIDTH_OTHER_COLUMN}>
        編集
      </Th>
      <Th textAlign='center' color={COLORS.white} width={WIDTH_OTHER_COLUMN}>
        参照のみ
      </Th>
      <Th textAlign='center' color={COLORS.white} width={WIDTH_OTHER_COLUMN}>
        参照不可
      </Th>
    </Tr>
  );
  const renderRow = (row) => {
    const { permissionLevel1, permissionLevel2, permissionLevel1Name, permissionLevel2Name, id } = row;
    const setKey = permissionLevel2 ? `${permissionLevel1}-${permissionLevel2}` : permissionLevel1;

    const actionIdData = selectedPermissions[setKey];
    const hasChildren = row.children && row.children.length > 0;
    const isExpanded = expandedLevel1.includes(permissionLevel1);

    return (
      <React.Fragment key={id}>
        <Tr>
          <Td paddingLeft='20px' width={WIDTH_FIRST_COLUMN}>
            {hasChildren && (
              <Button
                padding='0'
                size='sm'
                ml='-32px'
                background='transparent'
                _hover={{
                  bg: 'transparent',
                }}
                onClick={() => handleToggleExpand(permissionLevel1)}
              >
                {isExpanded ? <i className='fa-solid fa-minus' /> : <i className='fa-sharp fa-solid fa-plus' />}
              </Button>
            )}
            <span
              style={{
                paddingLeft: permissionLevel2Name ? '20px' : '0px',
              }}
            >
              {permissionLevel2Name || permissionLevel1Name}
            </span>
          </Td>
          {[1, 2, 3].map((item) => (
            <Td textAlign='center' key={item}>
              <Radio isChecked={actionIdData === item} onChange={() => handlePermissionChange(setKey, item)} />
            </Td>
          ))}
        </Tr>
        {hasChildren && isExpanded && row.children.map((child) => renderRow(child))}
      </React.Fragment>
    );
  };
  return (
    <>
      <Flex justify='space-between' marginTop='30px'>
        <Box height='40px' lineHeight='38px' width={WIDTH_FIRST_COLUMN}>
          許可リスト
        </Box>
        <Box
          height='40px'
          lineHeight='38px'
          bg={COLORS.primary_25}
          textAlign='center'
          width={`calc(100% - ${WIDTH_FIRST_COLUMN})`}
        >
          実施行動
        </Box>
      </Flex>
      <Box height='calc(100vh - 350px)' overflow='auto'>
        <Table size='xl'>
          <Thead position='sticky' zIndex='50' top='0' height='40px' fontSize='14px' bg={COLORS.brand_2}>
            {renderHeaders()}
          </Thead>
          <Tbody>{data.map(renderRow)}</Tbody>
        </Table>
      </Box>
      <ConfirmModal
        isOpen={isOpen}
        onConfirm={() => {
          onClose();
        }}
        onCancel={() => {
          onClose();
        }}
        type='roleLv2'
      />
      <ConfirmModal
        isOpen={isOpenLevel1}
        onConfirm={() => {
          onCloseLevel1();
          const objKeyChild = prevSelected.keyChildren.reduce((ac, a) => ({ ...ac, [a]: prevSelected.mainAction }), {});
          setSelectedPermissions((prev) => ({
            ...prev,
            [prevSelected.mainKey]: prevSelected.mainAction,
            ...objKeyChild,
          }));
        }}
        onCancel={() => {
          onCloseLevel1();
          setPrevSelected({});
        }}
        type='roleLv1'
      />
    </>
  );
}
