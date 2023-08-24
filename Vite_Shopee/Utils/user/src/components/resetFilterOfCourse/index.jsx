import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ROUTES_NAME } from '../../constants'
import { useCourseList, useCourseStudying, useProfile } from '../../hooks'
import { hasValuesInObject } from '../../utils'

const ResetFilterOfCourse = () => {
  const { profile, authenticated } = useProfile()
  const { resetFilterCourseListAction, savedFilter: savedFilterOfCourseList } = useCourseList({ userId: profile.userId })
  const { resetFilterMyPageAction, savedFilter: savedFilterOfMyPage } = useCourseStudying({ userRole: profile.userRole })
  const location = useLocation()

  useEffect(() => {
    const isLocatedCourseList = location.pathname.includes(ROUTES_NAME.COURSE_LIST)
    const isLocatedMyPage = location.pathname.includes(ROUTES_NAME.MY_PAGE)
    const isLocatedCourseDetail = location.pathname.includes(ROUTES_NAME.COURSE_DETAIL)
    const isLocatedLesson = location.pathname.includes(ROUTES_NAME.LESSON)
    || (location.pathname.includes(ROUTES_NAME.REPORT) && !location.pathname.includes(ROUTES_NAME.DAILY_REPORTS)) // Case special: Ignore "daily-reports" because it include "report" path
    || location.pathname.includes(ROUTES_NAME.SURVEY)
    || location.pathname.includes(ROUTES_NAME.EXAMINATION)

    const isLocatedPageIrrelevantWithCourseList = isLocatedCourseList || isLocatedCourseDetail || isLocatedLesson
    const isLocatedPageIrrelevantWithMyPage = isLocatedMyPage || isLocatedCourseDetail || isLocatedLesson

    // Reset filter of course-list and my-page when:
    // 1. Accessing page not irrelevant with data of both && have values in filter
    // 2. Change workspace (checking in component header/workspaces)
    // 3. Logout

    if ((!isLocatedPageIrrelevantWithCourseList && hasValuesInObject(savedFilterOfCourseList)) || !authenticated) {
      resetFilterCourseListAction()
    }
    if ((!isLocatedPageIrrelevantWithMyPage && hasValuesInObject(savedFilterOfMyPage)) || !authenticated) {
      resetFilterMyPageAction()
    }
  }, [location.pathname, authenticated])

  return null
}

export default ResetFilterOfCourse
