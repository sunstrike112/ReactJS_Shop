import Icon from '@ant-design/icons';

const CalendarSvg = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.75 13.75C1.75 14.0266 1.97344 14.25 2.25 14.25H13.75C14.0266 14.25 14.25 14.0266 14.25 13.75V7.1875H1.75V13.75ZM13.75 2.875H11.125V1.875C11.125 1.80625 11.0688 1.75 11 1.75H10.125C10.0562 1.75 10 1.80625 10 1.875V2.875H6V1.875C6 1.80625 5.94375 1.75 5.875 1.75H5C4.93125 1.75 4.875 1.80625 4.875 1.875V2.875H2.25C1.97344 2.875 1.75 3.09844 1.75 3.375V6.125H14.25V3.375C14.25 3.09844 14.0266 2.875 13.75 2.875Z" fill="#b0adc3"/>
  </svg>
);

export const CalendarIcon = props => <Icon component={CalendarSvg} {...props} />;
