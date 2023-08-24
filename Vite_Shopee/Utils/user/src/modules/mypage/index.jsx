import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Spin, Pagination, Divider } from 'antd'
import { useTranslation } from 'react-i18next'
import { debounce } from 'lodash'
import Container from '../../components/containerFlex'
import HomeLayout from '../layouts/home'
import { Input } from '../../components'
import { useCourseStudying, useHistories, useProfile, useGetQuery, usePrevious } from '../../hooks'
import MypageTab from './components/Tab'

import { SEARCH, EMPTY_COURSE, LIST_ON, LIST_OFF, GRID_ON, GRID_OFF } from '../../assets'
import { Wrapper, TabWrapper, StyledTypeDisPlayImage, StyledCourseDisplayWrapper } from './styled'
import { CourseList, ComletionStatus } from '../course/components'
import { COMPANY_NAME_JP, USER_ROLE, MY_PAGE_TABS, QUERY, DEFAULT_PAG, BOOKMARK_COURSE_DISPLAY_TYPE } from '../../constants'
import { STORAGE } from '../../utils'

const MypageScreen = () => {
  // Use hooks
  const history = useHistories()
  const { t } = useTranslation()
  const { userRole } = useProfile()
  const { fromTab, workspaceid } = useGetQuery()
  const {
    courseCompany,
    courseNissoken,
    courseRequired,
    getCourseStudyingCompany,
    getCourseStudyingNissoken,
    getCourseStudyingRequired,
    getCourseStudyingIndividual,
    isLoading,
    isLiking,
    courseProgress,
    totalCourse,
    hiddenCourseAction,
    voteLikeCourse,
    savedFilter,
    displayType,
    updateDisplayTypeAction
  } = useCourseStudying({
    userRole
  })
  // End use hooks
  const languageStatus = localStorage.getItem(STORAGE.LANGUAGE) || 'jp'

  // Use states
  const [searchValue, setSearchValue] = useState(savedFilter.courseSearch)
  const [courses, setCourses] = useState({
    ...DEFAULT_PAG,
    result: []
  })
  // End use states

  const workspaceIdPrev = usePrevious(workspaceid)
  useEffect(() => {
    // Reset searchValue if changed workspace
    if ((workspaceIdPrev && workspaceid) && (workspaceIdPrev !== workspaceid) && searchValue) {
      setSearchValue('')
    }
  }, [workspaceIdPrev, workspaceid, searchValue])

  const { totalCourseCompanyIsBookmark, totalCourseNishokenIsBookmark, totalCourseRequired } = totalCourse

  const isUserCompany = useMemo(() => ([USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.COURSE_ADMIN].includes(userRole)), [userRole])

  const paramsCurrentTab = {
    page: fromTab === MY_PAGE_TABS.COMPANY_COURSE ? courseCompany.pageCourse.page : courseNissoken.pageCourse.page,
    limit: DEFAULT_PAG.limit,
    isCompanyCourse: fromTab === MY_PAGE_TABS.COMPANY_COURSE || !fromTab,
    courseSearch: searchValue
  }

  const getCourseByTab = ({
    page = null,
    limit = null,
    courseSearch = searchValue,
    isSearching = false,
    tab = fromTab
  }) => {
    if (tab === MY_PAGE_TABS.NISSOKEN_COURSE) {
      getCourseStudyingNissoken({
        page: page || courseNissoken.pageCourse.page,
        limit: limit || courseNissoken.pageCourse.limit,
        isCompanyCourse: false,
        courseSearch: courseSearch.trim(),
        isSearching
      })
    } else if (tab === MY_PAGE_TABS.REQUIRED_COURSE) {
      getCourseStudyingRequired({
        page: page || courseRequired.pageCourse.page,
        limit: courseRequired.pageCourse.limit,
        courseSearch: courseSearch.trim(),
        isSearching
      })
    } else {
      getCourseStudyingCompany({
        page: page || courseCompany.pageCourse.page,
        limit: limit || courseCompany.pageCourse.limit,
        isCompanyCourse: true,
        courseSearch: courseSearch.trim(),
        isSearching
      })
    }
  }

  useEffect(() => {
    if (userRole === USER_ROLE.INDIVIDUAL_USER) {
      getCourseStudyingIndividual({})
    }
    if ([USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COURSE_ADMIN].includes(userRole)) {
      getCourseByTab({ courseSearch: savedFilter.courseSearch })
    }
  }, [workspaceid])

  const handleInputSearch = (e) => {
    const value = e?.target?.value?.trim()
    getCourseByTab({ page: DEFAULT_PAG.page, limit: DEFAULT_PAG.limit, courseSearch: value, isSearching: true })
  }

  const debounceSearch = useCallback(debounce(handleInputSearch, 300), [fromTab])

  const onChangeKey = (e) => {
    setSearchValue(e.target.value)
    debounceSearch(e)
  }

  const onChangeTab = (tab) => {
    history.push(`/mypage?${QUERY.FROM_TAB}=${tab}`)
    getCourseByTab({ tab })
  }

  const handleOnChangePage = (page, pageSize) => {
    window.scrollTo(0, 0)
    getCourseByTab({ page, limit: pageSize })
  }

  useEffect(() => {
    if (fromTab === MY_PAGE_TABS.REQUIRED_COURSE) {
      setCourses(courseRequired.pageCourse)
    } else if (fromTab === MY_PAGE_TABS.NISSOKEN_COURSE) {
      setCourses(courseNissoken.pageCourse)
    } else {
      setCourses(courseCompany.pageCourse)
    }
  }, [courseCompany, courseNissoken, courseRequired, fromTab])

  const onChangeCoursesDisplay = (displayTypeSelected) => {
    if (displayTypeSelected !== displayType) {
      updateDisplayTypeAction({ displayType: displayTypeSelected })
    }
  }

  return (
    <HomeLayout>
      <Wrapper languageStatus={languageStatus}>
        <Container>
          <div className="top">
            <Spin spinning={isLoading} size="large" style={{ marginTop: 150 }}>
              <div className="course-content">
                <div className="course-content-bottom">
                  <div className="course-list">
                    <div className="tab-header">
                      <TabWrapper>
                        {userRole !== USER_ROLE.NISSHOKEN_ADMIN && (
                        <MypageTab
                          activeTab={!fromTab || fromTab === MY_PAGE_TABS.COMPANY_COURSE}
                          text={COMPANY_NAME_JP.COMPANY}
                          onChangeTab={() => onChangeTab(MY_PAGE_TABS.COMPANY_COURSE)}
                          courseTotal={totalCourseCompanyIsBookmark}
                        />
                        )}
                        <MypageTab
                          activeTab={fromTab === MY_PAGE_TABS.NISSOKEN_COURSE}
                          text={COMPANY_NAME_JP.NISSOKEN}
                          onChangeTab={() => onChangeTab(MY_PAGE_TABS.NISSOKEN_COURSE)}
                          courseTotal={totalCourseNishokenIsBookmark}
                        />
                        {isUserCompany && (
                        <MypageTab
                          text={isUserCompany ? t('course_screen.course_required') : t('course_screen.course_purchased')}
                          onChangeTab={() => onChangeTab(MY_PAGE_TABS.REQUIRED_COURSE)}
                          courseTotal={totalCourseRequired}
                          activeTab={fromTab === MY_PAGE_TABS.REQUIRED_COURSE}
                        />
                        )}
                      </TabWrapper>
                      <div className="tab-header-right">
                        <div className="input-search">
                          <Input
                            style={{
                              paddingTop: 6,
                              paddingBottom: 6
                            }}
                            value={searchValue}
                            onChange={onChangeKey}
                            placeholder={t('course_screen.search-placeholder')}
                            background="grey_blur"
                            icon={SEARCH}
                          />
                        </div>
                        <Divider type="vertical" className="tab-header-right-divider" />
                        <StyledCourseDisplayWrapper>
                          {displayType === BOOKMARK_COURSE_DISPLAY_TYPE.GRID
                            ? <StyledTypeDisPlayImage src={GRID_ON} />
                            : <StyledTypeDisPlayImage src={GRID_OFF} onClick={() => onChangeCoursesDisplay(BOOKMARK_COURSE_DISPLAY_TYPE.GRID)} />}
                          {displayType === BOOKMARK_COURSE_DISPLAY_TYPE.DEFAULT
                            ? <StyledTypeDisPlayImage src={LIST_ON} />
                            : <StyledTypeDisPlayImage src={LIST_OFF} onClick={() => onChangeCoursesDisplay(BOOKMARK_COURSE_DISPLAY_TYPE.DEFAULT)} />}
                        </StyledCourseDisplayWrapper>
                      </div>
                    </div>
                    {(fromTab === MY_PAGE_TABS.REQUIRED_COURSE && isUserCompany) && (
                    <ComletionStatus
                      numberOfTotalCourse={courseProgress?.totalCourse}
                      numberOfCompletedCourse={courseProgress?.completeCourse}
                      courseProgress={courseProgress?.progressCourse}
                    />
                    )}
                    <CourseList
                      emptyCourse={{ src: EMPTY_COURSE, title: t('common.no_data') }}
                      dataSource={courses.result}
                      voteLikeCourse={voteLikeCourse}
                      onHideCourse={(params) => hiddenCourseAction({ ...params, ...paramsCurrentTab })}
                      cantHidden={fromTab !== MY_PAGE_TABS.REQUIRED_COURSE}
                      type="MY-PAGE"
                      userRole={USER_ROLE}
                      tab={fromTab || MY_PAGE_TABS.COMPANY_COURSE}
                      isLiking={isLiking}
                      displayType={displayType}
                    />
                  </div>
                  <div style={{ marginTop: 24, justifyContent: 'center', alignItems: 'center', display: 'flex', marginBottom: 24 }}>
                    <Pagination
                      total={courses.total}
                      current={courses.page}
                      pageSize={courses.limit}
                      showSizeChanger={false}
                      onChange={handleOnChangePage}
                      hideOnSinglePage
                    />
                  </div>
                </div>
              </div>
            </Spin>
          </div>
        </Container>
      </Wrapper>
    </HomeLayout>
  )
}

export default MypageScreen
