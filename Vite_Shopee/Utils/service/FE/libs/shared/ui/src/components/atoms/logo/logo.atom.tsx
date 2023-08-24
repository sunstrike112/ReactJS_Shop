/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space } from 'antd'

/* eslint-disable-next-line */
export interface AtomLogoProps {
  className?: string;
  style?: any;
  displayBrandingName?: boolean,
  brandingName?: string;
  logoIcon: any;
  logoWithNameIcon: any;
}

export function AtomLogo(props: AtomLogoProps) {
  return (
    <div className={props.className} style={props.style}>
      <Space size="small">
        {(!props.displayBrandingName || (props.displayBrandingName && props.brandingName)) &&
          // <LogoIcon style={props.logoStyle} />
          props.logoIcon
        }
        {(props.displayBrandingName && props.brandingName) && <h1>{props.brandingName}</h1>}
        {(props.displayBrandingName && !props.brandingName) && props.logoWithNameIcon}
      </Space>
    </div>
  );
}

export default AtomLogo;
