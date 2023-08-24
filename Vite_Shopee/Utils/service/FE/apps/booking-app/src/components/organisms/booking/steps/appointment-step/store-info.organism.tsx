import { Store } from '@ss-fe-fw/booking/configs';
import { Typography, Space } from 'antd';
import { RECOIL_KEY } from '@ss-fe-fw/booking/constants';

const { Text } = Typography;

interface StoreInfoProps {
  style?: any;
  children?: any;
}

export function StoreInfo(props: StoreInfoProps) {
  const recoilState = JSON.parse(localStorage.getItem(RECOIL_KEY)) ?? null;
  const storeState: Store = recoilState?.storeState ?? null;

  // rendering
  return (
    <>
      <Space direction='vertical' className='store-info' style={props.style}>
        <Text className='info'>Your selected Motorserve store</Text>
        <Text className='name'>{storeState?.name}</Text>
        <Text className='address'>
          {storeState?.addressLine1}, {storeState?.suburb} {storeState?.state} {storeState?.postCode}
        </Text>
        <Text className='phone'>{storeState?.contactPhoneNumber}</Text>
        <Text className='change' underline>Change store</Text>
      </Space>
      <style jsx global>{`
        .store-info {
          
        }
        .store-info .info {
          font-family: Arial;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 24px;
          color: #1D1655;
        }
        .store-info .name {
          font-family: Arial;
          font-style: normal;
          font-weight: bold;
          font-size: 24px;
          line-height: 32px;
          color: #1D1655;
        }
        .store-info .address {
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 22px;
          color: #888E9C;
        }
        .store-info .phone {
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 22px;
          color: #888E9C;
        }
        .store-info .change {
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          color: #1D1655;
        }
      `}</style>
    </>
  );
}

export default StoreInfo;