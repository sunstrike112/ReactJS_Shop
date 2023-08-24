
import Icon from '@ant-design/icons';

const FacebookSvg = () => (
  <svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.38889 5.55539V4.08873C5.38889 3.45317 5.53555 3.11095 6.56222 3.11095H7.83333V0.666504H5.87778C3.43333 0.666504 2.45556 2.27984 2.45556 4.08873V5.55539H0.5V7.99984H2.45556V15.3332H5.38889V7.99984H7.54L7.83333 5.55539H5.38889Z" fill="#4267B2"/>
  </svg>
);

export const FacebookIcon = props => <Icon component={FacebookSvg} {...props} />;
