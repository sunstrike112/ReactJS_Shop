/* eslint-disable react/prop-types */
import React from 'react'

import { useTranslation } from 'react-i18next'

import { TextPrimary, NotifyButton, Image, IconButton } from '../../components'
import { useCourseList, useHistories, useProfile } from '../../hooks'

import { DELETE_ICON, EMPTY_NOTIFY } from '../../assets'
import { Wrapper, EmptyBox, CourseList, CourseLink } from './styled'
import { getFileFromS3 } from '../../utils'

const CartBox = () => {
  const { profile } = useProfile()
  const { courseInCart, removeCourseFromCart } = useCourseList({ userId: profile.userId })
  const { t } = useTranslation()
  const history = useHistories()

  const handleViewCart = () => {
    history.push('/payment')
  }

  function currencyStr(number) {
    if (number) {
      return number
        ?.toFixed(1)
        .replace(/\d(?=(\d{3})+\.)/g, '$&.')
        .slice(0, -2)
    }
    return 0
  }

  const handleRemoveFromCart = (course) => {
    removeCourseFromCart(course)
  }
  const renderItem = (course, index) => (
    <CourseLink
      key={index}
    >
      <div className="img-box">
        <Image className="thumbnail" src={course.courseImagePath ? getFileFromS3(course.courseImagePath) : getFileFromS3(course.imagePath)} />
      </div>
      <div className="course-box">
        <div>
          <TextPrimary className="notify__title" style={{ marginBottom: 8, wordBreak: 'break-word' }} fontWeight="fw_600">
            {course?.courseName}
          </TextPrimary>
        </div>
        <div className="delete-box">
          <TextPrimary className="price" fontSize="size_16" style={{ marginBottom: 8 }} fontWeight="fw_600">
            {t('course_screen.price', { price: currencyStr(course.price) })}
          </TextPrimary>
          <IconButton className="delete-btn" src={DELETE_ICON} onClick={() => handleRemoveFromCart(course)} />
        </div>
      </div>
    </CourseLink>
  )
  return (
    <Wrapper>
      <div className="notice-ctn">
        <CourseList>
          {courseInCart && courseInCart.length > 0 ? (
            courseInCart.map((course, index) => renderItem(course, index))
          ) : (
            <EmptyBox>
              <Image width={122} src={EMPTY_NOTIFY} alt="empty" />
              <TextPrimary color="grey">{t('common.header.empty_notice')}</TextPrimary>
            </EmptyBox>
          )}
        </CourseList>
        <div className="action-bottom">
          <NotifyButton
            backgroundcolor="green_light"
            color="green"
            title={t('course_screen.payment')}
            onClick={() => handleViewCart()}
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default CartBox
