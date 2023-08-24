// Import from antd
import { Layout } from 'antd';

/* eslint-disable-next-line */
interface MainContentProps {
  children: any;
}

const { Content } = Layout;

export function MainContent(props: MainContentProps) {

  return (
    <Content style={{background: '#FFFFFF'}}>
      {props.children}
    </Content>
  );
}

export default MainContent;
