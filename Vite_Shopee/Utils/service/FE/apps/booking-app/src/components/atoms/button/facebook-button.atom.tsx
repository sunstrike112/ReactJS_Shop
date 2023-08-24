import { IconButton, GoogleIcon, FacebookIcon } from '@ss-fe-fw/booking/atoms';

export interface FacebookButtonProps {
  style?: any;
  children?: any;
}

export function FacebookButton(props: FacebookButtonProps) {
  return (
    <IconButton name="Facebook" style={props.style}>
      <FacebookIcon />
    </IconButton>
  );
}
