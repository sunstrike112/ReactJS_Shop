// Import from antd
import { Layout, Space, Grid, Row, Col, Typography, Card } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { useRouter } from 'next/router';
/* eslint-disable-next-line */
export interface LoginMainContentProps {
  children: any;
}

const { Content } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

export function LoginMainContent(props: LoginMainContentProps) {
  // utilize breakpoint hook to dynamically offset main content
  const screens = useBreakpoint();
  const router = useRouter();
  const backgroundImage = screens['xs']
    ? '/images/login-background-mobile.png'
    : '/images/login-background.png';

  const PATHNAME_MAP = {
    1: '/login',
    2: '/register',
  }

  const handleBack = () => {
    const currentPathname = router.pathname;
    switch (currentPathname) {
      case PATHNAME_MAP[2]:
        router.push(PATHNAME_MAP[1]);
        break;
      default:
        router.push('/')
        break;
    }
  }

  return (
    <Content className="content">
      <Space direction={'vertical'} className="main-content">
        <Row className="nav-back">
          <Col xs={{ offset: 1 }} md={{ offset: 8 }}>
            <Space
              direction={'horizontal'}
              className="back-button"
              onClick={handleBack}
            >
              <LeftOutlined className="icon" />
              <Text className="text">Back</Text>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col xs={{ offset: 1, span: 22 }} md={{ offset: 8, span: 8 }}>
            <Card className="rectangle" />
            <Space className="page-content">{props.children}</Space>
          </Col>
        </Row>
      </Space>

      <style jsx global>{`
        .content {
          background-image: url('${backgroundImage}');
          background-repeat: no-repeat;
          background-size: cover;
        }
        .main-content {
          width: 100%;
          margin: ${screens['xs'] ? '21px 0' : '138px 0'};
        }
        .nav-back {
          padding: 4px 6px;
        }
        .nav-back .icon {
          width: 16px;
          height: 16px;

          margin: 0px 7px;

          color: #ffffff;
        }
        .nav-back .text {
          margin: 0px 7px;

          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;

          color: #ffffff;
        }
        .nav-back .back-button {
          cursor: pointer;
        }
        .rectangle {
          height: ${screens['xs'] ? '10px' : '4px'};

          background: #04bae0;

          border: 0px;
          border-radius: 0 0 0 0;
        }
        .page-content {
          background: #ffffff;
          width: 100%;

          padding: ${screens['xs'] ? '32px 20px 48px' : '48px'};
          border-radius: 0 0 50px 0;
        }
        .page-content .ant-space-item {
          width: 100%;
        }
      `}</style>
    </Content>
  );
}

export default LoginMainContent;
