import { Space, Dropdown, Typography } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { serviceCentreState } from '@ss-fe-fw/stores';
import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import useProfile from '@ss-fe-fw/hooks/use-profile';

export interface AtomServiceCenterProps {
  placement?: any;
  styleBox?: any;
  styleBoxBadge?: any;
  styleBadge?: any;
  styleIcon?: any;
}

const { Text } = Typography;

export function AtomServiceCenter(props: AtomServiceCenterProps) {
  const router = useRouter();
  const [serviceCentreList] = useRecoilState(serviceCentreState);
  const [selectedServiceCentre, setSelectedServiceCentre] = useState();
  const { callbackSetUser } = useProfile();
  const xOrganizationId = localStorage.getItem('xOrganizationId');

  useEffect(() => {
    const selectedStore = serviceCentreList?.find(sc => sc.value == xOrganizationId);

    if (selectedStore) {
      setSelectedServiceCentre(selectedStore.label);
    }
  }, [xOrganizationId]);

  const changeServiceCentre = (serviceCentre) => {
    localStorage.setItem('xOrganizationId', serviceCentre.value);
    setSelectedServiceCentre(serviceCentre.label);
    callbackSetUser();
    router.reload();
  };

  const menu = (
    <Menu>
      {serviceCentreList?.map(serviceCentre => (
        <Menu.Item onClick={() => changeServiceCentre(serviceCentre)}>
          {serviceCentre.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} placement={props.placement}>
        <Space className="box-servicecenter" size="small" style={props.styleBox}>
          <Text>{selectedServiceCentre}</Text>
          <CaretDownOutlined />
        </Space>
      </Dropdown>
      <style jsx global>{`
        .box-servicecenter {
          font-size: 16px;
          line-height: 24px;
          height: 64px;
          font-weight: normal;
          border-right: 1px solid #F4F5F7 !important;
        }
        .box-servicecenter:hover {
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

export default AtomServiceCenter;
