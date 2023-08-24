import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Spin } from 'antd'
import Container from '../../../components/container'
import HomeLayout from '../../layouts/home'
import Wrapper from './styled'
import { CourseDetail } from '../components'
import { OutlineLightButton, PrimaryButton, TextPrimary, WarningButton } from '../../../components'
import { useCourseDetail, useCourseList, useGlobalStore, useHistories, useProfile } from '../../../hooks'
import { setLocalStorage, STORAGE } from '../../../utils'
import useQuery from '../../../hooks/useQuery'

const CourseDetailUnregistered = () => {
  const { courseId } = useParams()
  const { profile } = useProfile()
  const history = useHistories()
  const { initRoute } = useGlobalStore()
  const query = useQuery()
  const fromTab = query.get('fromTab')

  const { courseDetailUnregistered, getCourseDetailUnregistered } = useCourseDetail({
    userId: profile.userId,
    courseId
  })
  const { courseInCart, addCourseToCart } = useCourseList({ userId: profile.userId })
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    getCourseDetailUnregistered()
  }, [courseId])

  useEffect(() => {
    if (courseDetailUnregistered?.isPage) {
      setLocalStorage('redirect_url', '/')
    } else {
      setLocalStorage('redirect_url', '/course-list')
    }
  }, [courseDetailUnregistered])

  const { t } = useTranslation()

  function currencyStr(number) {
    if (number) {
      return number
        ?.toFixed(1)
        .replace(/\d(?=(\d{3})+\.)/g, '$&.')
        .slice(0, -2)
    }
    return 0
  }

  const goBack = () => {
    if (localStorage.getItem(STORAGE.SOURCE_PATH)) {
      history.push(`${localStorage.getItem(STORAGE.SOURCE_PATH)}?fromTab=${fromTab}`)
    } else {
      history.push(initRoute.home)
    }
  }

  const checkIsCourseInCart = () => courseInCart.find((c) => c.courseId === courseDetailUnregistered.courseId)
  return (
    <HomeLayout>
      {courseDetailUnregistered ? (
        <Wrapper isFree={courseDetailUnregistered.free}>
          <Container>
            <WarningButton
              title={t('examination.back')}
              color="text_primary"
              fontWeight="fw_600"
              onClick={goBack}
              className="back-button-mobile"
            />
            <div className="top">
              <WarningButton
                title={t('examination.back')}
                color="text_primary"
                fontWeight="fw_600"
                onClick={goBack}
                className="back-button"
              />
              <div className="course-content">
                <div className="course-content-bottom">
                  <div className="course-list ">
                    <CourseDetail dataSource={courseDetailUnregistered} isCourseDetail={false} />
                  </div>
                </div>
              </div>
              {!courseDetailUnregistered.free ? (
                <div className="buy-course-box">
                  <TextPrimary fontWeight="fw_600" fontSize="size_24">
                    {t('course_screen.price', { price: currencyStr(courseDetailUnregistered.price) })}
                  </TextPrimary>
                  {!checkIsCourseInCart() ? (
                    <>
                      <PrimaryButton className="add-to-card-btn" onClick={() => addCourseToCart(courseDetailUnregistered)} title={t('course_screen.add_to_card')} />
                      <OutlineLightButton className="buy-now-btn" title={t('course_screen.buy_now')} />
                    </>
                  ) : <PrimaryButton className="add-to-card-btn" title={t('course_screen.show_cart')} />}
                </div>
              ) : null}
            </div>
          </Container>
        </Wrapper>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </HomeLayout>
  )
}

export default CourseDetailUnregistered
