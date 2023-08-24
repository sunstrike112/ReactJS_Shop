// Import from antd
import { Card, Space, Row, Col } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import useComboState from '@ss-fe-fw/booking/hooks/use-combo-state';
import { useRecoilState } from 'recoil';
import { bookingVehicleState } from '@ss-fe-fw/booking/stores';
import { useEffect } from 'react';
import Slider from 'react-slick';
import { CustomIcon } from '@ss-fe-fw/booking/atoms';

/* eslint-disable-next-line */
interface VehicleSearchConfirmProps {
  children?: any;
  vehiclesList: any[];
}

export function VehicleSearchConfirm(props: VehicleSearchConfirmProps) {
  // responsive
  const screens = useBreakpoint();

  const MARGIN_WIDTH = 380;
  const CARD_WIDTH = 330;
  const MARGIN_OF_CARD = screens['xs'] ? 10 : 30;
  const TOTAL_CARD_WIDTH = CARD_WIDTH + MARGIN_OF_CARD;
  const VARIANT_OUTLINE_ICON_URL = '/images/vehicle/variant-outline.svg';
  const TRANSMISSION_OUTLINE_ICON_URL =
    '/images/vehicle/transmission-outline.svg';
  const CYLINDER_OUTLINE_ICON_URL = '/images/vehicle/cylinder-outline.svg';

  const { vehiclesList } = props;
  const { state, setState } = useComboState({ selectedIndex: 0 });
  const [bookingVehicle, setBookingVehicle] = useRecoilState(
    bookingVehicleState
  );

  const onSelectVehicle = (index) => {
    setBookingVehicle(vehiclesList[index]);
    setState({ selectedIndex: index });
  };

  useEffect(() => {
    setBookingVehicle(vehiclesList[0]);
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const NUM_CARD_PER_SLIDE = Math.max(
    Math.floor((window.innerWidth - MARGIN_WIDTH) / TOTAL_CARD_WIDTH),
    1
  );
  const NUM_SLIDES = Math.ceil(
    (vehiclesList || []).length / NUM_CARD_PER_SLIDE
  );

  const getNextIndexOfVehicle = (slideIndex) => {
    return (slideIndex - 1) * NUM_CARD_PER_SLIDE;
  };

  // rendering
  return (
    <>
      <Row className="vehicle-list">
        <div style={{ width: '100%' }}>
          <Slider {...settings}>
            {Array(NUM_SLIDES)
              .fill(0)
              .map((_, i) => i + 1)
              .map((slideIndex) => (
                <div key={`slide-${slideIndex}`}>
                  {(vehiclesList || [])
                    .slice(
                      getNextIndexOfVehicle(slideIndex),
                      slideIndex * NUM_CARD_PER_SLIDE
                    )
                    .map((vehicle, vehicleIndex) => (
                      <Card
                        key={vehicleIndex}
                        className={
                          state.selectedIndex ===
                          getNextIndexOfVehicle(slideIndex) + vehicleIndex
                            ? 'vehicle-card selected'
                            : 'vehicle-card unselected'
                        }
                        onClick={() =>
                          onSelectVehicle(
                            getNextIndexOfVehicle(slideIndex) + vehicleIndex
                          )
                        }
                      >
                        <Row
                          wrap={false}
                          className="vehicle-card__top"
                          justify="space-between"
                        >
                          <Col className="vehicle-card-title">
                            {`${vehicle.make} ${vehicle.model} ${
                              vehicle.year || ''
                            }`}
                          </Col>
                          <Col className="tag">{vehicle.rego}</Col>
                        </Row>
                        <Space direction="vertical">
                          <Space direction="horizontal" align="start" size={0}>
                            <Row justify="start" className="info-card__left">
                              <CustomIcon src={VARIANT_OUTLINE_ICON_URL} />
                              Variant
                            </Row>
                            <Row className="info-card__right">
                              {vehicle.variant || ''}
                            </Row>
                          </Space>
                          <Space direction="horizontal" align="start" size={0}>
                            <Row justify="start" className="info-card__left">
                              <CustomIcon src={TRANSMISSION_OUTLINE_ICON_URL} />
                              Transmission
                            </Row>
                            <Row className="info-card__right">
                              {vehicle.transmission || ''}
                            </Row>
                          </Space>
                          <Space direction="horizontal" align="start" size={0}>
                            <Row justify="start" className="info-card__left">
                              <CustomIcon src={CYLINDER_OUTLINE_ICON_URL} />
                              Cylinder
                            </Row>
                            <Row className="info-card__right">
                              {vehicle.cylinder || ''}
                            </Row>
                          </Space>
                        </Space>
                      </Card>
                    ))}
                </div>
              ))}
          </Slider>
        </div>
      </Row>

      <style jsx global>{`
        .vehicle-list {
          margin: 32px 0 48px;
          gap: 30px !important;
        }
        .vehicle-card {
          font-family: Arial;
          box-sizing: border-box;
          border-radius: 0 0 50px 0;
          cursor: pointer;
          width: ${screens['xs'] ? 'auto' : ` ${CARD_WIDTH}px`};
          ${(vehiclesList || []).length > 1 &&
          `margin: ${
            screens['xs']
              ? `0 ${MARGIN_OF_CARD}px`
              : `0 ${MARGIN_OF_CARD}px 0 2px`
          };`}
        }
        .vehicle-card.selected {
          border: 2px solid #04bae0;
        }
        .vehicle-card.unselected {
          border: 1px solid #eaecef;
        }
        .vehicle-card.unselected:hover {
          box-shadow: 0px 2px 4px rgba(183, 183, 183, 0.5);
        }
        .vehicle-card .ant-card-body {
          padding: 20px;
        }
        .vehicle-card__top {
          gap: 8px;
          margin-bottom: 16px;
        }
        .vehicle-card-title {
          font-family: Arial !important;
          font-weight: bold;
          font-size: 20px;
          line-height: 28px;
          color: #1d1655;
        }
        .vehicle-card .tag {
          font-weight: bold;
          font-size: 16px;
          line-height: 24px;

          text-align: center;
          text-transform: uppercase;
          height: fit-content;
          background: #f9fafb;
          border: 1px solid #eaecef;
          box-sizing: border-box;
          border-radius: 4px;
          padding: 4px 12px;
        }
        .vehicle-card .info-card__left {
          width: 130px;
          color: #888e9c;
          gap: 8px;
        }
        .vehicle-card .info-card__right {
          color: #1d1655;
        }
        .vehicle-list .slick-slide > div > div {
          display: flex !important;
        }
        .vehicle-list .slick-prev {
          ${screens['xs'] && ' left: -15px !important;'}
        }
        .vehicle-list .slick-next {
          ${screens['xs'] && 'right: -15px !important;'}
        }
        .vehicle-list .slick-prev:before,
        .vehicle-list .slick-next:before {
          ${screens['xs'] && 'color: #eaecef !important;'}
        }
      `}</style>
    </>
  );
}

export default VehicleSearchConfirm;
