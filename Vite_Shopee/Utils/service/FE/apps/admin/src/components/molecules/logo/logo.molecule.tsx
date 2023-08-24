import React, { useState } from 'react'
import { AtomLogo } from '@ss-fe-fw/shared/ui';

import { LogoSvg } from './logo-svg';
import { LogoWithNameSvg } from './logo-with-name-svg';
import Icon from '@ant-design/icons';

const LogoIcon = (props: any) => <Icon component={LogoSvg} {...props} />;
const LogoWithNameIcon = (props: any) => <Icon component={LogoWithNameSvg} {...props} />;

/* eslint-disable-next-line */
export interface MCLogoProps {
  className?: string;
  style?: any;
  logoStyle?: any;
  displayBrandingName?: boolean;
}

export function MCLogo(props: MCLogoProps) {
  return (
    <AtomLogo
      className={props.className}
      style={props.style}
      // logoStyle={{ fontSize: 16, width: 32, height: 32 }}
      displayBrandingName={props.displayBrandingName}
      logoIcon={<LogoIcon style={props.logoStyle} />}
      logoWithNameIcon={<LogoWithNameIcon />}
      // brandingName="Siliconstack"
    />
  )
}

export default MCLogo
