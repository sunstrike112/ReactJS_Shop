import Link from 'next/link'
// Import from Antd
import {
  Button
} from 'antd';

/* eslint-disable-next-line */
export interface AtomNavLinkButtonProps {
  style?: any;
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  label: string;
  link?: any;
}

export function AtomNavLinkButton(props: AtomNavLinkButtonProps) {
  return (
    <Link href={props.link}>
      <Button style={props.style} type={props.type ?? 'default'}>{props.label}</Button>
    </Link>
  );
}

export default AtomNavLinkButton;
