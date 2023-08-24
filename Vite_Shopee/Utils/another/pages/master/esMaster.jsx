import { Box } from '@chakra-ui/react';
import { TableESMaster } from 'dhm/containers/esMaster/Table';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import React, { useContext } from 'react';

export default function TrainingMasterPage() {
  const { ID_KEY, PermissionWrapper } = useContext(AbilityContext);
  return (
    <Box padding='0 48px'>
      <PermissionWrapper path={ID_KEY[20]}>
        <TableESMaster />
      </PermissionWrapper>
    </Box>
  );
}
