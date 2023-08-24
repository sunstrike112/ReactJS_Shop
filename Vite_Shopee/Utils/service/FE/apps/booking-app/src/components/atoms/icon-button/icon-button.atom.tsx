// Import from antd
import { Card, Typography } from 'antd';
import { useState } from 'react';

export interface IconButtonProps {
  name?: string,
  width?: string,
  height?: string,
  style?: any;
  children?: any;
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void;
}

const { Text } = Typography;

export function IconButton(props: IconButtonProps) {
  const [name, setName] = useState(props.name || '');

  return (
    <>
        <Card className='icon-button' style={props.style} onClick={props.onClick}>
          {props.children}
          {name && <Text style={{marginLeft: 8}}>{name}</Text>}
        </Card>
        <style jsx global>{`
          .icon-button {
            width: ${props.width};
            height: ${props.height};
            background: #FFFFFF;

            border: 1px solid #EAECEF;
            box-sizing: border-box;
            border-radius: 50px;

            display: flex;
            justify-content: center;
            align-items: center;
          }
          .icon-button .ant-card-body {
            text-align: center;
            padding: 8px 0 8px 0;
          }
        `}</style>
    </>
  )
}
  
  export default IconButton