// Import from antd
import React, { useEffect, useState } from 'react';
import { Space, Row, Col, Typography, Input } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { OGBasePageComponent } from '@ss-fe-fw/booking/organisms';
import { Service, SERVICE_PACKAGE_MODE as PACKAGE_MODE } from './service.organism';
import { ServiceAdd } from './service-add.organism';
import { ServiceAddPopup } from './service-add-popup.organism';
import { Package } from './package.organism';
import { bookingStepState, bookingServicesState } from '@ss-fe-fw/booking/stores';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { getServicesWithPackages } from '@ss-fe-fw/booking/api';
import { BookingService, convertBookingService } from '@ss-fe-fw/booking/configs';
import { BOOKING_STEPS } from '@ss-fe-fw/booking/constants';
import { cloneDeep } from 'lodash';

const { Text } = Typography;
const { TextArea } = Input;

/* eslint-disable-next-line */
export interface ServicesStepProps {
  children?: any;
  style?: any;
}

export function ServicesStep(props: ServicesStepProps) {
  // responsive
  const screens = useBreakpoint();

  // constants
  const PACKAGE_SPAN = screens['xs'] ? 12 : 6;
  const PACKAGE_ITEM_SPAN = screens['xs'] ? 24 : 12;
  const PACKAGE_POPUP_SPAN = screens['xs'] ? 24 : 8;
  const PACKAGE_NOTE_SPAN = screens['xs'] ? 24 : 12;

  // states
  const [services, setServices] = useState([]);
  const [activeServiceId, setActiveServiceId] = useState(0);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [servicePopupVisible, setServicePopupVisible] = useState(false);

  // global states
  const [bookingServices, setBookingServices] = useRecoilState(bookingServicesState);
  const setBookingStep = useSetRecoilState(bookingStepState);

  const updateBookingState = (states: {services: BookingService[], activeServiceId: number, selectedServiceIds: number[]}) => {
    setBookingServices(states.activeServiceId ? states : null);
  }

  // effects
  useEffect(() => {
    const fetchServices = async () => {
      const res = await getServicesWithPackages();
      
      const _services: BookingService[] = res.items?.map(item => convertBookingService(item));
      
      setServices(_services ?? []);
    }

    // recover from state from local storage if exists
    if (bookingServices ) {
      setServices(bookingServices.services);
      setSelectedServiceIds(bookingServices.selectedServiceIds);
      setActiveServiceId(bookingServices.activeServiceId);
    }
    else {
      fetchServices();
    }

    // set current step
    setBookingStep(BOOKING_STEPS.SERVICES);
  }, []);

  // handlers
  const handleAddOrSelectService = (serviceId: number, mode: number) => {
    let newServices = services;
    let newSelectedServiceIds = selectedServiceIds;
    let newActiveServiceId = serviceId;

    // a service template is selected for booking
    if (mode === PACKAGE_MODE.TEMPLATE) {
      setServicePopupVisible(false);
  
      newSelectedServiceIds = [...selectedServiceIds, serviceId];
      setSelectedServiceIds(newSelectedServiceIds);
      
      newServices = cloneDeep(services);
      newServices.find(item => item.id === serviceId).selected = true;
      setServices(newServices);
    }

    setActiveServiceId(newActiveServiceId);

    // store global state
    updateBookingState({
      services: newServices,
      selectedServiceIds: newSelectedServiceIds,
      activeServiceId: newActiveServiceId
    });
  }

  const handleRemoveService = (serviceId: number) => {
    let newActiveServiceId = serviceId;

    setServicePopupVisible(false);

    const newSelectedServiceIds = selectedServiceIds.filter(id => id !== serviceId);
    setSelectedServiceIds(newSelectedServiceIds);

    // unselect package & all items
    const newServices = cloneDeep(services);
    const removedService = newServices.find(item => item.id === serviceId);
    removedService.selected = false;
    removedService.note = '';
    removedService.packages.forEach(item => item.selected = false);

    setServices(newServices);

    // choose other candidate for being active
    if (activeServiceId === serviceId) {
      newActiveServiceId = newSelectedServiceIds.length > 0 ? newSelectedServiceIds[0] : 0;
      setActiveServiceId(newActiveServiceId);
    }

    // store global state
    updateBookingState({
      services: newServices,
      selectedServiceIds: newSelectedServiceIds,
      activeServiceId: newActiveServiceId
    });
  }

  const handleServicePopupDisplay = (visible: boolean) => {
    setServicePopupVisible(visible);
  }

  const handlePackageClick = (serviceId: number, packageId: number) => {
    const newServices = cloneDeep(services);
    const activeService = newServices.find(item => item.id === serviceId);
    activeService.packages.forEach(item => {
      if (item.id === packageId) {
        item.selected = !item.selected;
      }
      else if (activeService.selectType === 'single') {
        item.selected = false;
      }
    });

    setServices(newServices);
    
    // store global state
    updateBookingState({
      services: newServices,
      selectedServiceIds: selectedServiceIds,
      activeServiceId: activeServiceId
    });
  }

  const handleNote = (e) => {
    const newServices = cloneDeep(services);
    newServices.find(item => item.id === activeServiceId).note = e.target.value;

    setServices(newServices);

    // store global state
    updateBookingState({
      services: newServices,
      selectedServiceIds: selectedServiceIds,
      activeServiceId: activeServiceId
    });
  }

  // rendering
  const renderServicesUnselected = (span) => {
    return services.filter(service => !service.selected).map(service => {
      return (
        <Col key={service.id} span={span}>
          <Service 
            mode={PACKAGE_MODE.TEMPLATE}
            selected={false}
            service={service}
            addOrSelectHandler={handleAddOrSelectService}
            removeHandler={null}/>
            <div style={{height: 20}}/>
        </Col>
      );
    })
  }

  const renderPackagesSelected = () => {
    return selectedServiceIds.map(id => {
      const service = services.find(item => item.id === id);
      return (
        <>
          <Col key={id} span={PACKAGE_SPAN}>
            <Service 
              mode={PACKAGE_MODE.INSTANCE}
              selected={service.id === activeServiceId}
              service={service}
              addOrSelectHandler={handleAddOrSelectService}
              removeHandler={handleRemoveService}/>
              <div style={{height: 20}}/>
          </Col>
          {
            selectedServiceIds.length < services.length && 
            id === selectedServiceIds[selectedServiceIds.length - 1] &&
            <Col key={0} span={PACKAGE_SPAN}>
              <ServiceAdd displayHandler={handleServicePopupDisplay}/>
              <div style={{height: 20}}/>
            </Col>
          }
        </>
      );
    });
  } 

  const activeService: BookingService = services.find(item => item.id === activeServiceId);
  return (
    <OGBasePageComponent>
      <Space direction='vertical' className='services-select'>
        <Text className='title'>SELECT YOUR SERVICES</Text>
        <Text className='instruction'>Please select a service to begin</Text>
        <Row gutter={24} style={{marginTop: 30}}>
          {selectedServiceIds.length === 0
            ? renderServicesUnselected(PACKAGE_SPAN)
            : renderPackagesSelected()
          }
        </Row>
        {
          activeService && 
          <Space direction='vertical' className='package-items'>
            <Text className='instruction'>{activeService.description}</Text>
            <Row gutter={screens['xs'] ? [20, 20] : [24, 16]} style={{width: '100%'}}>
              {activeService.packages.map(item => {
                return (
                  <Col key={item.id} span={PACKAGE_ITEM_SPAN}>
                    <Package 
                      clickHandler={handlePackageClick}
                      item={item}/>
                  </Col>
                )
              })}
            </Row>
            <Text className='notes'>Notes</Text>
            <Row style={{width: '100%'}}>
              <Col span={PACKAGE_NOTE_SPAN}>
                <TextArea 
                  rows={3} 
                  maxLength={4000}
                  value={activeService.note}
                  onChange={handleNote}
                  placeholder='Leave a note here' 
                  className='notes-input'/>
              </Col>
            </Row>
          </Space>
        }
        <ServiceAddPopup 
          display={servicePopupVisible}
          serviceRender={renderServicesUnselected(PACKAGE_POPUP_SPAN)}
          displayHandler={handleServicePopupDisplay}
        />
      </Space>
      <style jsx global>{`
        .services-select {
          width: 100%;
          margin-bottom: ${screens['xs'] ? '118px' : '142px'};
        }
        .services-select .title {
          font-family: TT Commons;
          font-style: normal;
          font-weight: 900;
          font-size: 24px;
          line-height: 30px;
          
          color: #1D1655;
        }
        .services-select .instruction {
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          
          color: #888E9C;
        }
        .services-select .package-items {
          width: 100%;
          margin-top: 12px;
        }
        .package-items .instruction {
          font-family: Arial;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 24px;

          color: #1D1655;
        }
        .package-items .notes {
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 22px;
          
          color: #272F3E;
        }
        .package-items .notes-input {
          background: #FFFFFF;

          border: 1px solid #D5D8DD;
          box-sizing: border-box;
          border-radius: 2px;
        }
      `}</style>
    </OGBasePageComponent>
  );
}

export default ServicesStep;