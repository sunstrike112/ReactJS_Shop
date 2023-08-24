import React, { useEffect, useContext } from 'react'
import useSWR from 'swr'
import { fetcher } from '@ss-fe-fw/api/fetcher'
// Import from store
import {
  useRecoilState,
  useRecoilCallback
} from 'recoil';
import { userState } from '@ss-fe-fw/stores'
import { PROFILE_ENDPOINT } from '@ss-fe-fw/constants'
// import { AbilityBuilder, Ability } from '@casl/ability';
import { updateAbility } from '@ss-fe-fw/utils/ability';
import { AbilityContext } from '@ss-fe-fw/utils/can';

function useProfile() {
  const [, setUser] = useRecoilState(userState)
  const { data, error } = useSWR(PROFILE_ENDPOINT.BASE, fetcher)
  const ability = useContext(AbilityContext)

  const callbackSetUser = useRecoilCallback(() => async () => {
    if (data && !data.status) {
      setUser(data);
      updateAbility(ability, data);
    }
  });

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error,
    callbackSetUser: callbackSetUser
  };
}

export default useProfile;
