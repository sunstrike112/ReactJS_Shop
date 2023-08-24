import { TableCodeMaster } from 'dhm/containers/codeMaster/Table';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import { useContext } from 'react';

export default function CodeMasterPage() {
  const { ID_KEY, PermissionWrapper } = useContext(AbilityContext);

  return (
    <PermissionWrapper path={ID_KEY[19]}>
      <TableCodeMaster />
    </PermissionWrapper>
  );
}
