// Import from antd
import { Row, Col, Image, Typography } from 'antd';
import { AtomArrowButton } from '@ss-fe-fw/atoms'
import Link from 'next/link';

/* eslint-disable-next-line */
export interface LoginLayoutProps {
  children: any;
}

const { Title, Text } = Typography;

export function LoginLayout(props: LoginLayoutProps) {
  return (
    <>
      <Row style={{ height: '100vh' }} className="login">
        <div  style={{ margin: "auto 0", width: "100%" }}>
        <div className="login-inner">
          <Col xs={{ span: 0 }} sm={{ span: 0 }} md={{ span: 11 }} className="left-login-sidebar">
            <div>
              <div className="logo">
                <Image
                  width={315}
                  height={59}
                  src="/images/logo-purple.svg"
                  preview={false}
                />
              </div>
              <div>
                <div className="box-login-info">
                  <h4>Update: version 1.0.1.1</h4>
                  <p>Montes, adipiscing viverra gravida proin elementum ultrices varius risus. Semper facilisis venenatis sed proin sagittis. Sed felis facilisis amet fames fermentum sit amet elit euismod. Praesent quis diam consectetur.</p>
                  <Link href="/">
                    <a>See more</a>
                  </Link>
                </div>
                <div className="box-login-action">
                  <AtomArrowButton color="#fff" href="/login" direction="left"/>
                  <AtomArrowButton color="#fff" href="/login" direction="right"/>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 13 }} className="right-login-sidebar-wrapper">
            <div className="right-login-sidebar">
              {props.children}
            </div>
          </Col>
        </div>
        <Col  style={{ marginLeft: "auto", marginTop: 32 }} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 13 }}>
          <p className="copyright">Copyright © 2021 Silicon Stack (ver 1.0.1.1)</p>
        </Col>
        </div>
      </Row>
      <style jsx global>{`
        .login {
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.43), rgba(0, 0, 0, 0.43)), linear-gradient(0deg, rgba(22, 9, 116, 0.5), rgba(22, 9, 116, 0.5)), url(/images/login-cover.png);
          background-size: cover;
          margin: auto 0;
        }
        .login-inner {
          max-height: 650px;
          display: flex;
          width: 100%;
        }
        .left-login-sidebar > div {
          margin-left: auto;
          max-width: 430px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }
        .box-login-info {
          color: #fff;
          max-width: 430px;
        }
        .box-login-info h4 {
          font-weight: bold;
          color: #fff;
          font-size: 20px;
          line-height: 28px;
        }
        .box-login-info p {
          font-size: 12px;
          line-height: 20px;
          margin-top: 13px;
        }
        .box-login-info a {
          color: #04BAE0;
        }
        .right-login-sidebar-wrapper {
          margin: auto;
        }
        .right-login-sidebar {
          margin: 0 auto;
          width: 540px;
          max-height: 650px;
          min-height: 600px;
          background-color: #fff;
          border-radius: 2px;
          padding: 6em 3em;
        }
        .box-login-action {
          display: flex;
          width: 100%;
          margin-top: 65px;
        }
        .box-login-action *:not(:first-child) {
          margin-left: 10px;
        }
        .copyright {
          font-size: 12px;
          line-height: 20px;
          color: #fff;
          width: 100%;
          text-align: center;
          margin-bottom: 0;
        }
        .box-form-login-back {
          display: flex;
        }
        .box-form-login-back p {
          margin-left: 10px;
          margin-top: 0 !important;
        }
        .box-form-login > h3 {
          font-size: 38px;
          margin-bottom: 0px;
          font-weight: bold;
          line-height: 46px;
          color: #272F3E;
        }
        .box-form-login p {
          font-size: 14px;
          line-height: 22px;
          color: #272F3E;
          margin-top: 16px;
        }
        .box-form-login a {
          color: #272F3E;
          text-decoration-line: underline;
        }
        .box-form-login .ant-form-item-control {
          width: 100%;
        }
        .ant-checkbox-checked .ant-checkbox-inner {
          background-color: #04BAE0;
          border-color: #04BAE0;
        }
        .ant-btn, .ant-btn:active, .ant-btn:focus, .ant-btn:hover {
          color: #272F3E;
          background-color: #04BAE0;
          border: 0;
          margin-bottom: 0,
        }
      `}</style>
    </>
  );
}

export default LoginLayout
