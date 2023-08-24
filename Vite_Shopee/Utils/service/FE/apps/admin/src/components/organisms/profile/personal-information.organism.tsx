import { userState } from '@ss-fe-fw/stores';
import { personalInformationForm } from 'apps/admin/src/configs/routes/profile/form/personal-information.form';
import { useRecoilState } from 'recoil';
import OGFormResources from '../resources/form/form-resources.organism';

/* eslint-disable-next-line */
export interface OGPersonalInformationProps {}

export function OGPersonalInformation(props: OGPersonalInformationProps) {
  const [user, setUser ] = useRecoilState(userState);

  const handleFinish = (success, result) => {
    if (success) {
      setUser(result);
    }
  };

  return (
    <OGFormResources
      apiEndpoint="/auth/profiles"
      formType="update"
      form={{
        columns: 4,
        meta: personalInformationForm,
        initialValues: user,
        include: {
          author: true,
        },
        handleFinish: handleFinish,
        style: { width: '70%' },
      }}
      {...props}
    />
  );
}

export default OGPersonalInformation;
