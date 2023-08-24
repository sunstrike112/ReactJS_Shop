// Import from antd
import { Layout, Grid, Image, Typography, Card} from 'antd'

/* eslint-disable-next-line */
interface MainHeaderProps {
  pageName: string;
}

const { Header } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

export function MainHeader(props: MainHeaderProps) {
  const screens = useBreakpoint();
  const backgroundImage = screens['xs'] ? '/images/main-header-background-mobile.png' 
                                        : '/images/main-header-background.png';

  return (
      <>
        <Header className="header">
          <Image
            width={'100%'}
            height={243}
            preview={false}
            src={backgroundImage}
          />
          <Text className={screens['xs'] ? 'header-name-mobile' : 'header-name'}>
            {props.pageName}
          </Text>
          <Card className={screens['xs'] ? 'rectangle-mobile' : 'rectangle'}/>
        </Header>
        <style jsx global>{`
          .header {
            width: 100%;
            height: 243px;

            padding: 0;
          }
          .header-name-mobile {
            position: absolute;
            left: 5.33%;
            top: 60px;

            font-family: TT Commons;
            font-style: normal;
            font-weight: 800;
            font-size: 36px;
            line-height: 43px;

            color: #FFFFFF;
          }
          .header-name {
            position: absolute;
            width: 310px;
            height: 52px;
            left: 190px;
            top: 71px;

            font-family: TT Commons;
            font-style: normal;
            font-weight: 900;
            font-size: 40px;
            line-height: 52px;
            
            color: #FFFFFF;
          }
          .rectangle-mobile {
            position: absolute;
            height: 44px;
            top: 200px;
            left: 20px;
            right: 0%;

            background: #FFFFFF;
            border-radius: 24px 0 0 0;
            border: none;
          }
          .rectangle {
            position: absolute;
            height: 50px;
            right: 0%;
            left: 120px;
            top: 193px;
            
            background: #FFFFFF;
            border-radius: 24px 0 0 0;
            border: none;
          }
        `}</style>
      </>
  );
}

export default MainHeader;
