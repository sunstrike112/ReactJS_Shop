/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'

import { ClickAble, TextPrimary, Image } from '../../../../components'
import { CAROSEL_NEXT } from '../../../../assets'
import { isMappable } from '../../../../utils/utils'
import { MEDIA_WIDTHS } from '../../../../themes'
import { getFileFromS3 } from '../../../../utils'

const Wrapper = styled.div`
  .course-type-content {
    padding: 2px 0;
    margin-bottom: 5px;
    .ant-carousel {
      width: 100%;
    }

    .box-course-type {
      margin-bottom: 2px;
      border-radius: 8px;
      border: 1px solid ${({ theme }) => theme.grey_blur};
      margin: 0px 16px;
      .ctn {
        width: 60%;
        padding-right: 10px;
        p:last-child {
          font-size: 10px;
        }
      }

      .bottom {
        padding: 12px;
        img {
          width: 24px;
          height: 24px;
        }
      }
    }

    .slick-slider {
      margin: 0 auto;
      @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
        width: 90%;
      }
      @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
        width: 80%;
      }
      .slick-prev,
      .slick-next {
        width: 52px;
        height: 52px;
        margin: 30px -50px;
        opacity: 1;
        color: transparent;
        background: url(${CAROSEL_NEXT}) no-repeat;
        background-size: cover;
        @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
          margin: 30px -35px;
          width: 42px;
          height: 42px;
        }
        @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
          margin: 30px -20px;
        }
      }

      .slick-next:before {
        content: '';
      }

      .slick-prev:before {
        content: '';
      }

      .slick-prev {
        transform: translate(0, 0) rotate(180deg);
        top: 29%;
        display: ${({ isFirst }) => (isFirst ? 'none' : 'block')} !important;
      }

      .slick-next {
        transform: translate(0, 0);
        top: 29%;
        display: ${({ isLast }) => (isLast ? 'none' : 'block')} !important;
      }

      .slick-track {
        margin-left: 0px;
      }
    }

    .course-box {
      padding: 10px;
      .description {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .line {
      height: 2px !important;
      width: 20%;
      margin-top: 8px;
      margin-bottom: 32px;
      background: ${({ theme }) => theme.black};
    }

    .line-clamp {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .expect-16-9 {
      width: 100%;
      overflow: hidden;
      margin: 0;
      padding-top: 56.25%;
      position: relative;
      .card-img {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
      }
      .tag-wrapper {
        position: absolute;
        bottom: 8px;
        width: 100%;
        left: 8px;
      }
    }
  }
`

const CourseCategories = ({ courseCategories = [] }) => {
  const [isFirst, setIsFirst] = useState(true)
  const [isLast, setIsLast] = useState(false)

  const settings = {
    dots: false,
    speed: 500,
    swipeToSlide: false,
    accessibility: false,
    lazyLoad: false,
    slidesToShow: 4,
    draggable: false,
    slidesToScroll: 4,
    infinite: false,
    afterChange: (current) => {
      setIsFirst(current === 0)
      setIsLast(courseCategories.length - current === 4)
    },
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          speed: 500,
          dots: false,
          afterChange: (current) => {
            setIsFirst(current === 0)
            setIsLast(courseCategories.length - current === 3)
          }
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
          afterChange: (current) => {
            setIsFirst(current === 0)
            setIsLast(courseCategories.length - current === 2)
          }
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          afterChange: (current) => {
            setIsFirst(current === 0)
            setIsLast(courseCategories.length - current === 1)
          }
        }
      }
    ]
  }
  return (
    <Wrapper isLast={isLast} isFirst={isFirst}>
      <div className="course-type-content">
        <Slider {...settings}>
          {isMappable(courseCategories)
            && courseCategories.map((e) => (
              <div key={e.courseCategoryId}>
                <ClickAble className="box-course-type">
                  <div className="expect-16-9">
                    <Image className="card-img" src={getFileFromS3(e.imagePath)} alt="" />
                  </div>
                  <div className="course-box">
                    <div style={{ height: 'max-content' }}>
                      <TextPrimary className="description" fontSize="size_20" fontWeight="fw_600">
                        {e.courseCategoryName}
                      </TextPrimary>
                    </div>
                  </div>
                </ClickAble>
              </div>
            ))}
        </Slider>
      </div>
    </Wrapper>
  )
}

export default CourseCategories
