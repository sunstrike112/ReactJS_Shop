import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ListCardBasicInfo } from 'dhm/components/ListCard';
import { AbilityContext } from 'dhm/contexts/AbilityContext';

export function TableBasicInfo() {
  const { basicInfo } = useSelector((state) => state.basicInfo);
  const { data } = basicInfo;
  const { PermissionWrapper, ID_KEY } = useContext(AbilityContext);
  return (
    <>
      <PermissionWrapper path={ID_KEY[5]}>
        <ListCardBasicInfo data={data} />
      </PermissionWrapper>
    </>
  );
}
