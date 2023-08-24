/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Image, TextPrimary, TextCategory } from '../../../../components'
import { CourseInfo, Wrapper } from './styled'
import LessonList from '../lesson-list'
import { dateFormat, getFileFromS3 } from '../../../../utils'
import { SLASH_DATE_FORMAT } from '../../../../utils/date'
import { minuteToHour } from '../../../../utils/time'
import { SHOWLESS_ICON, SHOWMORE_ICON } from '../../../../assets'

const CourseDetailComponent = ({ dataSource, isCourseDetail = true }) => {
  const { t } = useTranslation()
  const overViewRef = useRef()

  const [isReadMore, setIsReadMore] = useState(false)
  const [isShowMore, setIsShowMore] = useState(false)

  const dataLesson = useMemo(() => {
    if (!isCourseDetail) {
      return dataSource.listUserCourseUnitResponse || []
    }
    return dataSource.unit || []
  }, [dataSource, isCourseDetail])

  const isFree = useMemo(() => {
    if (!isCourseDetail) {
      return dataSource.free
    }
    return true
  }, [dataSource, isCourseDetail])

  useEffect(() => {
    if (overViewRef.current.scrollHeight > overViewRef.current.clientHeight) {
      setIsShowMore(true)
    }
  }, [])

  const renderCourseRequired = () => (
    <>
      <div className="box-course-type">
        <div className="section-info-course">
          <TextPrimary fontSize="size_24" fontWeight="fw_600">
            {dataSource.courseName}
          </TextPrimary>
          <div className="info">
            <div className="section-image-course">
              <Image src={getFileFromS3(dataSource.courseImagePath)} />
            </div>
            <div className="course-detail">
              <table>
                <tbody>
                  <CourseInfo>
                    <td>
                      <TextPrimary>{t('course_detail.course_type')}</TextPrimary>
                    </td>
                    <td>
                      {dataSource.listCourseCategoryName
                      && dataSource?.listCourseCategoryName.map((category, index) => (
                        <TextCategory
                          key={category.courseCategoryId}
                          className="course_category"
                          color="black"
                          fontWeight="fw_600"
                          fontSize="size_12_6"
                        >
                          {category.courseCategoryName}
                          <TextCategory className="line" color="text_placeholder">
                            {index + 1 !== dataSource.listCourseCategoryName.length && '|'}
                          </TextCategory>
                        </TextCategory>
                      ))}
                    </td>
                  </CourseInfo>
                  {!!dataSource.startTime && (
                  <CourseInfo>
                    <td>
                      <TextPrimary>{t('course_detail.course_time')}</TextPrimary>
                    </td>
                    <td>
                      <TextPrimary color="black" fontWeight="fw_600">
                        {dateFormat(dataSource.startTime, SLASH_DATE_FORMAT)}
                        <br />
                        {!!dataSource.endTime && `~${dateFormat(dataSource.endTime, SLASH_DATE_FORMAT)}`}
                      </TextPrimary>
                    </td>
                  </CourseInfo>
                  )}
                  {!!dataSource.recentStudyTime && (
                  <CourseInfo>
                    <td>
                      <TextPrimary>{t('course_detail.date_time')}</TextPrimary>
                    </td>
                    <td>
                      <TextPrimary color="black" fontWeight="fw_600">
                        {dateFormat(dataSource.recentStudyTime, SLASH_DATE_FORMAT)}
                      </TextPrimary>
                    </td>
                  </CourseInfo>
                  )}
                  {!!dataSource.recentStudyUnitName && (
                  <CourseInfo>
                    <td>
                      <TextPrimary>{t('course_detail.last_unit')}</TextPrimary>
                    </td>
                    <td>
                      <TextPrimary color="black" fontWeight="fw_600">
                        {dataSource.recentStudyUnitName}
                      </TextPrimary>
                    </td>
                  </CourseInfo>
                  )}
                  {!!dataSource.recentStudyUnitName && (
                  <CourseInfo>
                    <td>
                      <TextPrimary>{t('course_detail.study_quantity')}</TextPrimary>
                    </td>
                    <td>
                      <TextPrimary color="black" fontWeight="fw_600">
                        {t('course_detail.studyTimes', { times: dataSource.studyTimes })}
                      </TextPrimary>
                    </td>
                  </CourseInfo>
                  )}
                  {dataSource.targetTime ? (
                    <CourseInfo>
                      <td>
                        <TextPrimary>{t('course_detail.estimate_time')}</TextPrimary>
                      </td>
                      <td>
                        <TextPrimary color="black" fontWeight="fw_600">
                          {t('common.time.hour', {
                            hour: minuteToHour(dataSource.targetTime).hour,
                            minute: minuteToHour(dataSource.targetTime).minute
                          })}
                        </TextPrimary>
                      </td>
                    </CourseInfo>
                  ) : null}
                </tbody>
              </table>
              <div
                ref={overViewRef}
                className="description"
                dangerouslySetInnerHTML={{ __html: dataSource.overview }}
              />
              {isShowMore && (
              <div aria-hidden onClick={() => setIsReadMore(!isReadMore)} className="show_more">
                {isReadMore ? (
                  <>
                    <TextPrimary fontSize="size_14" color="green">
                      {t('course_detail.show_less')}
                    </TextPrimary>
                    <Image src={SHOWLESS_ICON} />
                  </>
                ) : (
                  <>
                    <TextPrimary fontSize="size_14" color="green">
                      {t('course_detail.show_more')}
                    </TextPrimary>
                    <Image src={SHOWMORE_ICON} />
                  </>
                )}
              </div>
              )}
            </div>
          </div>
        </div>
        <LessonList lessons={dataLesson} isFree={isFree} />
      </div>
    </>
  )

  return (
    <Wrapper isShowMore={isShowMore} isReadMore={isReadMore}>
      <div className="course-list-content">
        <div className="course-tab-content">
          <div>{renderCourseRequired()}</div>
        </div>
      </div>
    </Wrapper>
  )
}

export default CourseDetailComponent
