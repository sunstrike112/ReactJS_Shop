import { Carousel } from 'antd';
import React, { useImperativeHandle, useRef } from 'react';

interface CarouselCustomProps {
  arrows: boolean;
  dots: boolean;
  infinite: boolean;
  slidesToShow: number;
  slidesToScroll: number;
  children?: any;
}

export const CarouselCustom = React.forwardRef((props: CarouselCustomProps, ref) => {
  const cRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      goTo: (index) => cRef.current.goTo(index)
    }
  }, []);

  return (
    <>
      <Carousel
        ref={cRef}
        {...props}
        className='carousel-custom'
      >
        {props.children}
      </Carousel>
      <style jsx global>{`
        .carousel-custom {
          width: 100%;
        }

        .ant-carousel .carousel-custom .slick-next,
        .ant-carousel .carousel-custom .slick-prev {
          margin-top: 0;
        }
        .ant-carousel .carousel-custom .slick-next::before,
        .ant-carousel .carousel-custom .slick-prev::before {
          color: #000000;
          font-family: slick;
          font-size: 20px;
          line-height: 1;
          opacity: .75;
        }
      `}</style>
    </>
  );
});

export default CarouselCustom;