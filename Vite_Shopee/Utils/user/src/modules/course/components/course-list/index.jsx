/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { dateFormat, STORAGE } from '../../../../utils'
import { Card, Image, TextPrimary } from '../../../../components'
import { useHistories, useProfile } from '../../../../hooks'
import { EMPTYLIST } from '../../../../assets'
import { FULL_DATE, FULL_DATE_TIME } from '../../../../utils/date'
import { StyledWrapper } from './styled'
import CoursesAsList from './CoursesAsList'
import { BOOKMARK_COURSE_DISPLAY_TYPE } from '../../../../constants'

const CourseList = ({
  dataSource = [],
  isPopupButton,
  emptyCourse,
  type = 'COURSE-LIST',
  currentTab = 'COURSE_STUDYING',
  tab,
  cantHidden,
  onHideCourse,
  voteLikeCourse,
  isLiking,
  displayType
}) => {
  const { t } = useTranslation()
  const { profile, userRole } = useProfile()
  const history = useHistories()

  useEffect(() => {
    if (history.location.pathname.includes('/mypage')) {
      localStorage.setItem(STORAGE.SOURCE_PATH, history.location.pathname)
    }
  }, [history.location.pathname])

  const renderCourseList = () => {
    if (!dataSource.length) {
      return (
        <div className="list-empty">
          <Image src={emptyCourse.src || EMPTYLIST} />
          <TextPrimary color="grey" fontSize="size_16">{emptyCourse.title || t('course_screen.empty')}</TextPrimary>
        </div>
      )
    }

    if (displayType === BOOKMARK_COURSE_DISPLAY_TYPE.DEFAULT) {
      return (
        <CoursesAsList
          tab={tab}
          dataSource={dataSource}
          isPopupButton={isPopupButton}
          cantHidden={cantHidden}
          onHideCourse={onHideCourse}
        />
      )
    }

    return (
      <div className="course-tab-content">
        {dataSource.map((item) => (
          <Card
            userId={profile.userId}
            key={`${item.courseId}_${item.courseCategoryId}`}
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
            isNew={item.statusCourse}
            cantHidden={cantHidden}
            isRequired={item?.isRequired}
            item={item}
            isLiking={isLiking}
            onNavigate={() => history.push({
              pathname: `/course/detail/${item.courseId}`,
              search: `?fromTab=${tab}`,
              state: { flagCount: true }
            })}
          />
        ))}
      </div>
    )
  }

  return (
    <StyledWrapper>
      <div className="course-list-content">
        {renderCourseList()}
      </div>
    </StyledWrapper>
  )
}

export default CourseList
