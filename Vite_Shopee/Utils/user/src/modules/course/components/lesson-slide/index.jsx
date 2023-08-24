/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react'
import { debounce } from 'lodash'
import Slider from 'react-slick'
import { Progress } from 'antd'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { SLIDE_NEXT_IMAGE, PLUS, CORNER_OUT, MINUS } from '../../../../assets'
import LessonLayout from '../lesson-layout'
import { Wrapper, SlideItem } from './styled'
import { Image } from '../../../../components'
import { LESSON_TYPE } from '../../../../constants'

const LessonSlide = ({
  courseDetail,
  lessonDetail,
  submitLesson,
  isSubmitEnd,
  courseId,
  lessonId,
  countViewUnit
}) => {
  const ref = useRef()

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isToggle, setIsToggle] = useState(true)
  const [type, setType] = useState('NEXT')
  const settings = {
    dots: false,
    infinite: false,
    speed: 100,
    slidesToShow: isToggle ? 6 : 8,
    slidesToScroll: 1,
    arrows: false,
    cssEase: 'linear',
    accessibility: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: isToggle ? 6 : 8,
          slidesToScroll: 1,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false
        }
      }
    ]
  }

  useEffect(() => {
    countViewUnit({
      courseId,
      lessonId,
      typeUnit: LESSON_TYPE.LESSON
    })
  }, [lessonId])

  const next = () => {
    setType('NEXT')
    if (currentSlide < lessonDetail?.images.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      setCurrentSlide(currentSlide)
    }
  }
  const previous = () => {
    setType('PREV')
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1)
    } else setCurrentSlide(0)
  }

  const [isFullScreen, setIsFullScreen] = useState(false)
  const handle = useFullScreenHandle()
  const handleFullScreen = () => {
    if (!isFullScreen) {
      setIsFullScreen(true)
      handle.enter()
    } else {
      setIsFullScreen(false)
      handle.exit()
    }
  }

  useEffect(() => {
    if (ref && ref.current && lessonDetail && lessonDetail.images && lessonDetail.images.length > 0) {
      if (currentSlide >= 0 && currentSlide < lessonDetail?.images.length - 4) {
        if (type === 'NEXT') ref?.current.slickGoTo(currentSlide > 3 ? currentSlide : 0)
        else ref?.current.slickGoTo(currentSlide - 3 > 0 ? currentSlide : 0)
      }
      if (currentSlide < 0) {
        ref?.current.slickGoTo(0)
      }
      if (currentSlide >= lessonDetail?.images.length - 4) {
        ref?.current.slickGoTo(lessonDetail?.images.length - 4)
      }
    }
  }, [currentSlide, ref, lessonDetail, type])

  const handleEsc = (event) => {
    switch (event.keyCode) {
      case 39:
        return debounce(() => {
          setType('NEXT')
          if (currentSlide < lessonDetail?.images.length - 1) {
            setCurrentSlide(currentSlide + 1)
          } else {
            setCurrentSlide(currentSlide)
          }
        }, 200)()
      case 37:
        return debounce(() => {
          setType('PREV')
          if (currentSlide > 1) {
            setCurrentSlide(currentSlide - 1)
          } else setCurrentSlide(0)
        }, 500)()
      default:
        return null
    }
  }
  const refImage = useRef()
  useEffect(() => {
    if (refImage) {
      refImage.current.scrollIntoView(true, { block: 'start', inline: 'nearest' })
    }
    window.scrollTo(0, 0)

    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [currentSlide])

  useEffect(() => {
    if (
      lessonDetail?.images
      && lessonDetail.images.length > 0
      && currentSlide === lessonDetail.images.length - 1
      && !isSubmitEnd
    ) {
      submitLesson()
    }
  }, [currentSlide, lessonDetail])

  const renderBottomSlide = (item, index) => (
    <SlideItem
      aria-hidden="true"
      onClick={() => setCurrentSlide(index)}
      key={index}
      isActive={currentSlide === index}
      className="slide-item"
    >
      <div className="expect-16-9">
        <Image className="current-image" src={item} />
      </div>
    </SlideItem>
  )
  return (
    <Wrapper isFullScreen={isFullScreen}>
      <LessonLayout
        courseDetail={courseDetail}
        lessonDetail={lessonDetail}
        submitLesson={submitLesson}
        isToggle={isToggle}
        setIsToggle={setIsToggle}
      >
        <div>
          <FullScreen
            handle={handle}
            onChange={(state) => {
              if (!state) {
                setIsFullScreen(false)
                handle.exit()
              }
            }}
          >
            <TransformWrapper
              wheel={{ disabled: 'true' }}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <div className="current-slide">
                  <div className="slide-info">
                    {currentSlide + 1}/{lessonDetail?.images?.length || 0}
                  </div>
                  <TransformComponent>
                    <div className="expect-16-9">
                      <Image
                        className="current-image"
                        id="im"
                        ref={refImage}
                        src={lessonDetail?.images?.[currentSlide]}
                      />
                    </div>
                  </TransformComponent>
                  <div className="action">
                    <div aria-hidden="true" onClick={() => zoomIn()} className="box">
                      <Image src={PLUS} />
                    </div>
                    <div aria-hidden="true" onClick={() => zoomOut()} className="box">
                      <Image src={MINUS} />
                    </div>
                    <div aria-hidden="true" className="box" onClick={handleFullScreen}>
                      <Image src={CORNER_OUT} />
                    </div>
                  </div>
                </div>
              )}
            </TransformWrapper>
          </FullScreen>
          {lessonDetail && lessonDetail.images && lessonDetail.images.length > 0 && (
            <div style={{ position: 'relative' }}>
              <Slider ref={ref} {...settings}>
                {lessonDetail?.images.map((item, index) => renderBottomSlide(item, index))}
              </Slider>
              <div className="arrows-slick">
                <div className="previous">
                  {currentSlide !== 0 ? <Image onClick={previous} src={SLIDE_NEXT_IMAGE} /> : <div />}
                </div>
                <div className="next">
                  {currentSlide + 1 !== lessonDetail?.images?.length ? (
                    <Image onClick={next} src={SLIDE_NEXT_IMAGE} />
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
          )}
          <Progress
            size="small"
            strokeColor="#838383"
            showInfo={false}
            percent={((currentSlide + 1) / lessonDetail?.images?.length) * 100}
          />
        </div>
      </LessonLayout>
    </Wrapper>
  )
}

export default LessonSlide
