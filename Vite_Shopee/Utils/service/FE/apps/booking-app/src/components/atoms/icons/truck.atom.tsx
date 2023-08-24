import Icon from '@ant-design/icons';
import { Children } from 'react';

interface TruckIconProps {
  selected?: boolean;
  className?: string;
  children?: any;
}

const TruckSvg = () => (
  <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M21 12C21 13.6569 19.6569 15 18 15C16.3432 15 15 13.6569 15 12C15 10.3431 16.3432 9 18 9C19.6569 9 21 10.3431 21 12Z" fill="#272F3E"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.0001 0H0V12H12.0001H24C24 5.37268 18.6276 0 12.0001 0Z" fill="#272F3E"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M9 12C9 13.6569 7.65689 15 6 15C4.34324 15 3 13.6569 3 12C3 10.3431 4.34324 9 6 9C7.65689 9 9 10.3431 9 12Z" fill="#272F3E"/>
  </svg>
);
const TruckSelectedSvg = () => (
  <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M21 12C21 13.6569 19.6569 15 18 15C16.3432 15 15 13.6569 15 12C15 10.3431 16.3432 9 18 9C19.6569 9 21 10.3431 21 12Z" fill="#04BAE0"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.0001 0H0V12H12.0001H24C24 5.37268 18.6276 0 12.0001 0Z" fill="#04BAE0"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M9 12C9 13.6569 7.65689 15 6 15C4.34324 15 3 13.6569 3 12C3 10.3431 4.34324 9 6 9C7.65689 9 9 10.3431 9 12Z" fill="#04BAE0"/>
  </svg>
);


export const TruckIcon = (props: TruckIconProps) => <Icon component={props.selected ? TruckSelectedSvg : TruckSvg} {...props} />;
