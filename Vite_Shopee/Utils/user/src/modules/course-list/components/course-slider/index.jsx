/* eslint-disable react/prop-types */
import { Spin } from 'antd'
import React, { useEffect, useRef, useMemo } from 'react'
import Slider from 'react-slick'
import { CardCourse } from '../../../../components'
import { USER_ROLE } from '../../../../constants'
import { useCourseList, useHistories, useProfile } from '../../../../hooks'
import { dateFormat } from '../../../../utils'
import { FULL_DATE_TIME } from '../../../../utils/date'
import { NEXT_BUTTON, PREV_BUTTON } from '../../../../assets'

const CourseSlider = ({
  isLoading,
  data,
  indexSlider,
  handleChangeSlide
}) => {
  const { profile, userRole } = useProfile()
  const sliderRef = useRef()
  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    afterChange: (current) => {
      if (current + 4 >= data.result.length && current < data.total && data.result.length < data.total) {
        handleChangeSlide(data.page + 1, [data.courseCategoryId], indexSlider)
      }
    },
    nextArrow: <img src={NEXT_BUTTON} alt="" />,
    prevArrow: <img src={PREV_BUTTON} alt="" />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          afterChange: (current) => {
            if (current + 3 >= data.result.length && current < data.total && data.result.length < data.total) {
              handleChangeSlide(data.page + 1, [data.courseCategoryId], indexSlider)
            }
          }
        }
      }
    ]
  }

  const {
    isLiking,
    courseListTab,
    courseInCart,
    addCourseToCart,
    voteLikeCourse
  } = useCourseList({ userId: profile.userId })

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0, true)
    }
  }, [isLoading])

  const history = useHistories()

  const isUserCompany = useMemo(() => (
    [USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN].includes(userRole)
  ), [userRole])

  const isNissoken = useMemo(() => (userRole === USER_ROLE.NISSHOKEN_ADMIN), [userRole])

  const buyNow = () => { }

  const handleNavigate = (item) => {
    if (isUserCompany || isNissoken) {
      history.push({
        pathname: `/course/detail/${item.courseId}`,
        search: `?isCourseList=TRUE&fromTab=${courseListTab}`,
        state: { flagCount: true }
      })
    } else {
      history.push({
        pathname: `/course/detail-unregistered/${item.courseId}?fromTab=${courseListTab}`,
        search: `?isCourseList=TRUE&fromTab=${courseListTab}`,
        state: { flagCount: true }
      })
    }
  }

  return (
    <Spin spinning={false} size="normal">
      <Slider
        {...settings}
        ref={sliderRef}
      >
        {data?.result?.map((item) => (
          <div
            key={item.courseId}
            className="course-tab-content"
          >
            <CardCourse
              userId={profile?.userId}
              key={item.courseId}
              courseId={item.courseId}
              cardImage={item.imagePath}
              description={item.description}
              descriptionText={item.descriptionText}
              listTag={item.tagCourse}
              name={item.courseName}
              courseOverviewText={item.descriptionText}
              icons={item.tagLesson}
              unit={item.unit}
              isShowProgress={false}
              isPopupButton
              coursePrice={item.price}
              voteLikeCourse={voteLikeCourse}
              startTime={dateFormat(item.startDate, FULL_DATE_TIME)}
              endTime={dateFormat(item.endDate, FULL_DATE_TIME)}
              userRole={userRole}
              isRequired={item.isRequired}
              course={item}
              courseInCart={courseInCart}
              addToCart={() => addCourseToCart(item)}
              buyNow={() => buyNow(item)}
              isNew={item.statusCourse}
              tab={courseListTab}
              item={item}
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
