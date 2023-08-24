import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';

export interface AtomArrowProps {
  color,
  direction: 'left' | 'right',
  href
}

export function AtomArrowButton(props: AtomArrowProps) {
  return <button className="btn">
    <Link href={`${props.href}`}>
      {props.direction === 'right' ? <RightOutlined style={{color: `${props.color}`}}/> : <LeftOutlined  style={{color: `${props.color}`}} />}
    </Link>
    <style jsx>{`
      .btn {
        width: 24px;
        height: 24px;
        background: transparent;
        outline: 0;
        border-width: 1px;
        border-style: solid;
        box-sizing: border-box;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin: 0;
        border-color: ${props.color}
      }
    `}</style>
  </button>;
}

export default AtomArrowButton;
