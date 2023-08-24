/* eslint-disable-next-line */
// Import from antd
import { Layout } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { Footer } = Layout;

interface MainFooterProps {
  children?: any;
}

export function MainFooter(props: MainFooterProps) {
  // responsive
  const screens = useBreakpoint();

  // rendering
  return (
    <>
      <Footer className='main-footer fixed-bottom'>
        {props.children}
      </Footer>
      <style jsx global>{`
        .main-footer {
          width: 100%;
          padding: 0;
          background: #F9FAFB;
        }
        .fixed-bottom {
          position: fixed;
          bottom: 0;
          z-index: 101;
        }
      `}</style>
    </>
  );
}

export default MainFooter