/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import { Popover } from 'antd'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { LESSON_TYPE, USER_ROLE } from '../../constants'
import { VoteLike, Watched, ClickAble, TextPrimary, ProgressSlider, Image, BookMark } from '../index'
import { REPORT, SURVEY, TEST, LESSON, ICON_CART_WHITE } from '../../assets'
import Wrapper, { PopoverWrapper, Divider } from './styled'
import { IconButton, OutlineButton, PrimaryButton } from '../button'
import { getFileFromS3 } from '../../utils'

const stylesIcon = {
  fontSize: 24,
  width: 24,
  height: 24,
  marginLeft: 0
}

const renderIcon = (icon) => {
  if (icon === LESSON_TYPE.REPORT) {
    return <REPORT style={stylesIcon} />
  }
  if (icon === LESSON_TYPE.SURVEY) {
    return <SURVEY style={stylesIcon} />
  }
  if (icon === LESSON_TYPE.TEST) {
    return <TEST style={stylesIcon} />
  }
  return <LESSON style={stylesIcon} />
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

const CardCourse = ({
  course = {},
  cardImage,
  courseId,
  name,
  courseOverviewText,
  description,
  descriptionText,
  icons = [],
  progress,
  isPopupButton = false,
  isShowProgress = true,
  coursePrice,
  startTime,
  endTime,
  userId,
  onNavigate,
  type = 'COURSE-LIST',
  userRole,
  isRequired = false,
  currentTab = 'COURSE_STUDYING',
  tab,
  addToCart,
  buyNow,
  courseInCart = [],
  isNew = false,
  voteLikeCourse,
  item,
  isLiking,
  isUpdatingBookmark,
  unit = [],
  updateBookmarkAction,
  ...rest
}) => {
  const { t } = useTranslation()
  const filterUnitName = unit?.map((i) => i.unitName)

  const isHideShoppingCart = true
  const onClick = () => {
    if (onNavigate) {
      onNavigate()
    }
  }

  const handleVoteLikeCourse = useCallback(() => {
    voteLikeCourse({
      courseId,
      tab,
      item
    })
  }, [courseId, tab, item])

  const handleBookmark = useCallback(() => {
    updateBookmarkAction({ queryParam: { courseId }, tab, item })
  }, [courseId, tab, item])

  const renderLabel = () => {
    if (userRole === 'INDIVIDUAL_USER' && type !== 'MY-PAGE') {
      if (coursePrice) {
        return (
          <div>
            <TextPrimary fontWeight="fw_600" fontSize="size_18">
              {t('course_screen.price', { price: currencyStr(coursePrice) })}
            </TextPrimary>
          </div>
        )
      }

      return (
        <div className="free_course_box">
          <TextPrimary color="green" fontWeight="fw_600">
            {t('course_screen.course_free')}
          </TextPrimary>
        </div>
      )
    }

    if ((userRole === 'INDIVIDUAL_USER' && type === 'MY-PAGE' && currentTab === 'COURSE_STUDYING' && !!coursePrice)
      || (userRole === 'INDIVIDUAL_USER' && type !== 'MY-PAGE')) {
      return (
        <div className="free_course_box">
          <TextPrimary color="green" fontWeight="fw_600">
            {t('course_screen.bought')}
          </TextPrimary>
        </div>
      )
    }
    if ([USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN].includes(userRole) && isRequired) {
      return (
        <div className="required_course_box">
          <TextPrimary color="white" fontWeight="fw_600">
            {t('course_screen.require')}
          </TextPrimary>
        </div>
      )
    }

    return null
  }

  const checkIsCourseInCart = () => courseInCart.find((c) => c.courseId === course.courseId)

  const Content = ({ title }) => (
    <PopoverWrapper>
      <TextPrimary className="popover__title" fontWeight="fw_600" fontSize="size_16">
        {title}
      </TextPrimary>
      <Divider />
      <div
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          {!!startTime && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {!!startTime && (
            <TextPrimary fontSize="size_12" fontWeight="fw_600">
              {`${_.slice(filterUnitName, 0, 3)}`}
              {endTime && ` ~ ${endTime}`}
            </TextPrimary>
            )}
          </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          {!!startTime && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {!!startTime && (
                <TextPrimary fontSize="size_12" fontWeight="fw_600">
                  {`${t('course_detail.course-period')} ${startTime}`}
                  {endTime && ` ~ ${endTime}`}
                </TextPrimary>
              )}
            </div>
          )}
        </div>
        {coursePrice && isHideShoppingCart ? (
          !checkIsCourseInCart() ? (
            <div className="buy-course-box">
              <div className="add-to-cart-button">
                <IconButton className="cart-icon" onClick={addToCart} src={ICON_CART_WHITE} />
                <PrimaryButton onClick={addToCart} className="add-to-cart-btn" title={t('course_screen.add_to_card')} />
              </div>
              <OutlineButton onClick={buyNow} title={t('course_screen.buy_now')} />
            </div>
          ) : (
            <div className="buy-course-box">
              <PrimaryButton onClick={() => buyNow} className="view-cart-btn" title={t('course_screen.show_cart')} />
              <OutlineButton onClick={buyNow} title={t('course_screen.buy_now')} />
            </div>
          )
        ) : null}
      </div>
    </PopoverWrapper>
  )

  return (
    <Wrapper className="box-course-type" {...rest}>
      <Popover
        content={(
          <Content
            html={description}
            title={t('program_list')}
            startTime={startTime}
            endTime={endTime}
            coursePrice={coursePrice}
            isPopupButton={isPopupButton}
            course={course}
            t={t}
            unit={unit}
          />
        )}
        placement="right"
      >
        <ClickAble
          onClick={onClick}
        >
          {isNew && (
            <>
              <div className="mark-new d-flex align-items-center">{t('course_screen.mark_new')}</div>
              <div className="mark-draw" />
            </>
          )}
          <div className="expect-16-9">
            <Image className="card-img" src={getFileFromS3(cardImage)} alt="card_image" />
          </div>
          <div className="ctn">
            <div className="label-course">
              <div className="label-course_unit" style={{ height: 38 }}>
                {icons?.length > 0 ? (icons || []).map((icon) => (
                  <ClickAble key={icon}>{renderIcon(icon)}</ClickAble>
                )) : <div style={{ height: 38 }} />}
              </div>
            </div>
            <div style={{ height: 40, marginBottom: 7 }}>
              <TextPrimary className="course-name" fontWeight="fw_600" fontSize="size_16">
                {name}
              </TextPrimary>
            </div>
            <div className="course-overview">
              <TextPrimary fontSize="size_14">
                {courseOverviewText}
              </TextPrimary>
            </div>
            <div>
              {isShowProgress && (
                <>
                  <div style={{ display: 'flex' }}>
                    <TextPrimary fontWeight="fw_500" fontSize="size_12">
                      {progress}%&nbsp;
                    </TextPrimary>
                    <TextPrimary color="grey" fontSize="size_12">
                      {t('home_screen.percent')}
                    </TextPrimary>
                  </div>
                  <ProgressSlider percent={progress || 0} />
                </>
              )}
            </div>
          </div>
        </ClickAble>
        <div className="label-wrapper">
          <div className="label-course_vote">
            <VoteLike
              isLike={course.isLike}
              isLiking={isLiking}
              voteNumber={course.countLikeCourse}
              voteAction={handleVoteLikeCourse}
              currentTab={currentTab}
            />
            <Watched voteNumber={course.countOpenLesson} />
            <BookMark active={course.isBookmark} isLoading={isUpdatingBookmark} action={handleBookmark} />
          </div>
          {renderLabel()}
        </div>
      </Popover>
      <style>{`
        .ant-popover-inner {
          width: 390px;
          max-height: 240px;
        }
      `}
      </style>
    </Wrapper>
  )
}

export default CardCourse
