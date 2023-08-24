import React, { useEffect, useMemo, useState } from 'react'
import { Divider } from 'antd'
import { useUserCategories, useProfile, useCourseList, useGetQuery } from '../../hooks'
import HomeLayout from '../layouts/homeCourseList'
import { CourseTab } from './components'
import { Container, SiderBar, Image, Sidebar, SiderBarToggle } from '../../components'
import Wrapper from './styled'
import { TabsName, USER_ROLE } from '../../constants'
import { SIDEBAR_ICON } from '../../assets'

const CourseListScreen = () => {
  // Use hooks
  const { profile, userRole } = useProfile()
  const { fromTab, workspaceid } = useGetQuery()
  const { userCategories, companyCategories, nissokenCategories } = useUserCategories({ userId: profile?.userId, workspaceid })
  const {
    getCourseCost,
    getCourseFree,
    getCourseNissoken,
    getCourseCompany,
    savedFilter,
    totalCourse,
    courseCompany,
    courseNissoken,
    getNewCourse,
    coursesNew,
    viewsCourseList
  } = useCourseList({ userId: profile.userId })
  // End use hooks

  // Use states
  const [categories, setCategories] = useState([])
  const [courseSearch, setCourseSearch] = useState('')
  const [isSidebar, setIsSidebar] = useState(false)
  // End use states

  useEffect(() => {
    setCategories(savedFilter.categories)
    setCourseSearch(savedFilter.courseSearch)
  }, [savedFilter.categories, savedFilter.courseSearch])

  const isUserCompany = useMemo(() => [USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN].includes(userRole), [userRole])
  const isUserNissoken = useMemo(() => userRole === USER_ROLE.NISSHOKEN_ADMIN, [userRole])

  const getCourseByTab = ({ tab }) => {
    if (tab === TabsName.COMPANY_COURSE) {
      getCourseCompany({ ...savedFilter, page: courseCompany.page, limit: courseCompany.limit })
    } else if (tab === TabsName.NISSOKEN_COURSE) {
      getCourseNissoken({ ...savedFilter, page: courseNissoken.page, limit: courseNissoken.limit })
    } else if (tab === TabsName.NEW_COURSE) {
      getNewCourse({ ...savedFilter, page: coursesNew.page, limit: coursesNew.limit })
    }
  }

  useEffect(() => {
    if (profile.userId) {
      if ([USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN, USER_ROLE.NISSHOKEN_ADMIN].includes(userRole)) {
        getCourseByTab({ tab: fromTab })
      }
      // TODO: Temporary unused this role
      if (userRole === USER_ROLE.INDIVIDUAL_USER) {
        getCourseCost(profile.userId)
        getCourseFree(profile.userId)
      }
    }
  }, [profile.userId, workspaceid, viewsCourseList])

  return (
    <HomeLayout>
      <Wrapper>
        <Container>
          <Image className="sidebar__icon" onClick={() => setIsSidebar(true)} src={SIDEBAR_ICON} />
          <Sidebar width={390} placement="left" visible={isSidebar} onVisible={setIsSidebar}>
            <SiderBarToggle
              userCategories={userCategories}
              categories={categories}
              companyCategories={companyCategories}
              nissokenCategories={nissokenCategories}
              isUserCompany={isUserCompany}
              isUserNissoken={isUserNissoken}
              setCategories={setCategories}
              setCourseSearch={setCourseSearch}
              courseSearch={courseSearch}
              profile={profile}
              userRole={userRole}
              isRequired={savedFilter.isRequired}
            />
          </Sidebar>
          <SiderBar
            userCategories={userCategories}
            categories={categories}
            companyCategories={companyCategories}
            nissokenCategories={nissokenCategories}
            isUserCompany={isUserCompany}
            isUserNissoken={isUserNissoken}
            setCategories={setCategories}
            setCourseSearch={setCourseSearch}
            courseSearch={courseSearch}
            profile={profile}
            userRole={userRole}
            isRequired={savedFilter.isRequired}
          />
          <Divider type="vertical" style={{ margin: 0 }} />
          <div className="top">
            <div className="course-content">
              <div className="course-type">
                <CourseTab
                  categories={categories}
                  courseSearch={savedFilter.courseSearch}
                  totalCourse={totalCourse}
                  fromTab={fromTab}
                  getCourseByTab={getCourseByTab}
                />
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>
    </HomeLayout>
  )
}

export default CourseListScreen
