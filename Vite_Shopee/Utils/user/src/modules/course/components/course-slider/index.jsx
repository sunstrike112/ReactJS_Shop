/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Spin } from 'antd'
import React, { useRef, useEffect } from 'react'
import Slider from 'react-slick'
import { Card } from '../../../../components'
import { useCourseStudying, useHistories, useProfile } from '../../../../hooks'
import { dateFormat } from '../../../../utils'
import { FULL_DATE, FULL_DATE_TIME } from '../../../../utils/date'
import { NEXT_BUTTON, PREV_BUTTON } from '../../../../assets'

const CourseSlider = ({
  isPopupButton,
  type = 'COURSE-LIST',
  currentTab,
  tab,
  handleChangeSlide,
  indexSlider,
  cantHidden,
  data,
  onHideCourse,
  isLoading
}) => {
  const { profile, userRole } = useProfile()
  const {
    isLiking,
    voteLikeCourse,
    isLoadingPage
  } = useCourseStudying({ userRole })
  const history = useHistories()
  const sliderRef = useRef()

  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 5,
    afterChange: (current) => {
      if (current + 5 >= data.result.length && current < data.totalCourse && data.result.length < data.totalCourse) {
        handleChangeSlide(data.page + 1, [data.courseCategoryId], indexSlider)
      }
    },
    nextArrow: <img src={NEXT_BUTTON} alt="" />,
    prevArrow: <img src={PREV_BUTTON} alt="" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          afterChange: (current) => {
            if (current + 3 >= data.result.length && current < data.total && data.result.length < data.total) {
              handleChangeSlide(data.page + 1, [data.courseCategoryId], indexSlider)
            }
          }
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          afterChange: (current) => {
            if (current + 4 >= data.result.length && current < data.total && data.result.length < data.total) {
              handleChangeSlide(data.page + 1, [data.courseCategoryId], indexSlider)
            }
          }
        }
      }
    ]
  }

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0, true)
    }
  }, [isLoading, isLoadingPage])
  const handleNavigate = (item) => {
    history.push({
      pathname: `/course/detail/${item.courseId}`,
      search: `?fromTab=${tab}`,
      state: { flagCount: true }
    })
  }

  return (
    <Spin spinning={false} size="normal">
      <Slider {...settings} ref={sliderRef}>
        {data?.result?.map((item) => (
          <div
            className="course-tab-content"
          >
            <Card
              userId={profile?.userId}
              key={item.courseId}
              courseId={item.courseId}
              cardImage={item.courseImagePath}
              description={item.courseOverviewText}
              name={item.courseName}
              courseOverviewText={item.courseOverviewText}
              icons={item.lstTypeUnit}
              coursePrice={item.coursePrice || 0}
              progress={item.courseProgress}
              listTag={item.lstCourseTagName}
              isPopupButton={isPopupButton}
              startTime={dateFormat(item.startTime, FULL_DATE)}
              endTime={dateFormat(item.endTime, FULL_DATE_TIME)}
              onHideCourse={onHideCourse}
              voteLikeCourse={voteLikeCourse}
              userRole={userRole}
              type={type}
              course={item}
              currentTab={currentTab}
              tab={tab}
              cantHidden={cantHidden}
              isRequired={item.isRequired}
              item={item}
              isNew={item.statusCourse}
              isLiking={isLiking}
              onNavigate={() => handleNavigate(item)}
            />
          </div>
        ))}
      </Slider>
    </Spin>
  )
}

export default CourseSlider
