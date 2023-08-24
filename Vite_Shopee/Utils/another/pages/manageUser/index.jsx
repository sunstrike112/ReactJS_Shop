import { Box } from '@chakra-ui/react';
import { TableRole } from 'dhm/containers/manageUser/role/table';
import { TableUser } from 'dhm/containers/manageUser/user/table';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import React, { useContext } from 'react';

function UserManage() {
  const { ID_KEY, PermissionWrapper } = useContext(AbilityContext);

  return (
    <Box padding='0 48px'>
      <PermissionWrapper path={ID_KEY[21]}>
        <TableUser />
      </PermissionWrapper>
    </Box>
  );
}
function RoleManage() {
  const { ID_KEY, PermissionWrapper } = useContext(AbilityContext);

  return (
    <Box padding='0 48px'>
      <PermissionWrapper path={ID_KEY[22]}>
        <TableRole />
      </PermissionWrapper>
    </Box>
  );
}

export { UserManage, RoleManage };
