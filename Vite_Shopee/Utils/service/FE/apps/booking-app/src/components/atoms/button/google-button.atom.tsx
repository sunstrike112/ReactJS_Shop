import { IconButton, GoogleIcon, FacebookIcon } from '@ss-fe-fw/booking/atoms';

export interface GoogleButtonProps {
  style?: any;
  children?: any;
}

export function GoogleButton(props: GoogleButtonProps) {
  return (
    <IconButton name="Google" style={props.style}>
      <GoogleIcon />
    </IconButton>
  );
}
