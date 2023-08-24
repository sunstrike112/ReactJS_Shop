import React from 'react'
import { useTranslation } from 'react-i18next'

import HomeLayout from '../layouts/home'
import { TextPrimary, Container } from '../../components'
import Wrapper from './styled'

const HomeScreen = () => {
  const { t } = useTranslation()
  return (
    <HomeLayout>
      <Wrapper>
        <Container>
          <div className="top">
            <div className="course-header">
              <TextPrimary>
                {t('home_screen.course_title')}
              </TextPrimary>
            </div>
            <div className="course-content">
              <div className="course-type">
                <div className="course-type-title">
                  <div>
                    <TextPrimary>{t('home_screen.course.category_title')}</TextPrimary>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>
    </HomeLayout>
  )
}

export default HomeScreen
