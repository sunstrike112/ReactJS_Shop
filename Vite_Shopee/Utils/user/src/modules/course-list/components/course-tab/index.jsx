/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Checkbox, Empty, Spin, Pagination } from 'antd'
import { CardCourse } from '../../../../components'
import TabBar from '../../../../components/tab-bar'
import { useCourseList, useHistories, useProfile } from '../../../../hooks'
import { COMPANY_NAME_JP, COURSE_ATTRIBUTES, DEFAULT_LIMIT_COURSE_LIST, DEFAULT_PAG, ROUTES_NAME, TabsName, USER_ROLE } from '../../../../constants'

import { dateFormat, isMappable, STORAGE } from '../../../../utils'
import Wrapper from './styled'
import { FULL_DATE_TIME } from '../../../../utils/date'

const getIsRequiredCourseList = (data) => {
  switch (true) {
    case Boolean(data[COURSE_ATTRIBUTES.REQUIRED]): return true
    case Boolean(data[COURSE_ATTRIBUTES.OPTIONAL]): return false
    default: return null
  }
}

const CourseTab = ({
  courseSearch,
  categories,
  totalCourse,
  fromTab,
  getCourseByTab
}) => {
  // Use hooks
  const { t } = useTranslation()
  const history = useHistories()
  const { totalCourseCompany, totalCourseNissoken, totalCourseNew } = totalCourse
  const { profile, userRole } = useProfile()
  const {
    isLiking,
    isUpdatingBookmark,
    courseCost,
    courseFree,
    courseCompany,
    courseNissoken,
    courseListTab,
    courseInCart,
    courseCompanyIsLoading,
    courseCostIsLoading,
    courseFreeIsLoading,
    courseNissokenIsLoading,
    onChangeTab,
    getCourseCost,
    getCourseFree,
    getCourseNissoken,
    getCourseCompany,
    addCourseToCart,
    voteLikeCourse,
    isSearching,
    error,
    savedFilter,
    coursesNew,
    getNewCourse,
    updateBookmarkAction,
    resetPageToInitOfCourseListAction
  } = useCourseList({ userId: profile.userId })
  // End use hooks

  // Use states

  const [dataSource, setDataSource] = useState({
    result: [],
    page: DEFAULT_PAG.page,
    pages: DEFAULT_PAG.pages,
    limit: DEFAULT_LIMIT_COURSE_LIST,
    total: DEFAULT_PAG.total
  })
  const [checkBoxStatus, setCheckboxStatus] = useState({ required: false, optional: false })
  // End use states

  useEffect(() => {
    setCheckboxStatus({ required: savedFilter.isRequired, optional: savedFilter.isRequired === false })
  }, [savedFilter.isRequired])

  const isUserCompany = useMemo(() => (
    [USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN].includes(userRole)
  ), [userRole])

  const isNissoken = useMemo(() => (userRole === USER_ROLE.NISSHOKEN_ADMIN), [userRole])

  useEffect(() => {
    if (history.location.pathname.includes(ROUTES_NAME.COURSE_LIST)) {
      localStorage.setItem(STORAGE.SOURCE_PATH, history.location.pathname)
    }
  }, [history.location.pathname])

  const onTabChange = (tab) => {
    onChangeTab(tab.key)
    getCourseByTab({ tab: tab.key })
    history.push(`${ROUTES_NAME.COURSE_LIST}?fromTab=${tab.key}`)
    if (tab.key === TabsName.PAID_COURSE) {
      getCourseCost(categories, courseSearch, getIsRequiredCourseList(checkBoxStatus))
    }
    if (tab.key === TabsName.FREE_COURSE) {
      getCourseFree(categories, courseSearch, getIsRequiredCourseList(checkBoxStatus))
    }
  }

  const USER_TABS = [{
    name: t('course_list.freeCourse'),
    key: TabsName.FREE_COURSE,
    numberCourse: courseFree.length || 0
  },
  {
    name: t('course_list.paidCourse'),
    key: TabsName.PAID_COURSE,
    numberCourse: courseCost.length || 0
  }]

  const COMPANY_TABS = [{
    name: COMPANY_NAME_JP.COMPANY,
    key: TabsName.COMPANY_COURSE,
    numberCourse: totalCourseCompany
  },
  {
    name: COMPANY_NAME_JP.NISSOKEN,
    key: TabsName.NISSOKEN_COURSE,
    numberCourse: totalCourseNissoken
  },
  {
    name: t('course_screen.new_course'),
    key: TabsName.NEW_COURSE,
    numberCourse: totalCourseNew || DEFAULT_PAG.total
  }]

  const NISSOKEN_TABS = [{
    name: COMPANY_NAME_JP.NISSOKEN,
    key: TabsName.NISSOKEN_COURSE,
    numberCourse: totalCourseNissoken
  }]

  useEffect(() => {
    if (isUserCompany) {
      onChangeTab(TabsName.COMPANY_COURSE)
    }
    if (isNissoken) {
      onChangeTab(TabsName.NISSOKEN_COURSE)
    }
    if (userRole === USER_ROLE.INDIVIDUAL_USER) {
      onChangeTab(TabsName.FREE_COURSE)
    }
  }, [])

  useEffect(() => {
    onChangeTab(fromTab)
  }, [fromTab])

  useEffect(() => {
    if (courseListTab === TabsName.PAID_COURSE) {
      setDataSource(courseCost)
    }
    if (courseListTab === TabsName.FREE_COURSE) {
      setDataSource(courseFree)
    }

    if (courseListTab === TabsName.COMPANY_COURSE) {
      setDataSource(courseCompany)
    }
    if (courseListTab === TabsName.NISSOKEN_COURSE) {
      setDataSource(courseNissoken)
    }

    if (courseListTab === TabsName.NEW_COURSE) {
      setDataSource(coursesNew)
    }

    if (!courseCompanyIsLoading && !courseCostIsLoading && !courseFreeIsLoading && !courseNissokenIsLoading) {
      // if (searching) {
      //   let tabCurr = courseListTab
      //   if (courseNissoken?.total) {
      //     tabCurr = TabsName.NISSOKEN_COURSE
      //   }
      //   // TODO: E-4337 - need change total to totalAllCourse
      //   if ((courseCompany?.total && !courseNissoken?.total)) {
      //     tabCurr = TabsName.COMPANY_COURSE
      //     history.push(`/course-list?fromTab=${tabCurr}`)
      //   } else if ((!courseCompany?.total && !courseNissoken?.total)) {
      //     tabCurr = TabsName.COMPANY_COURSE
      //   } else if ((courseCompany?.total && courseNissoken?.total)) {
      //     tabCurr = TabsName.COMPANY_COURSE
      //     history.push(`/course-list?fromTab=${tabCurr}`)
      //   }
      //   if (fromTab !== TabsName.NISSOKEN_COURSE || !courseNissoken?.total) {
      //     history.push(`/course-list?fromTab=${tabCurr}`)
      //   }
      // }
    }
  }, [
    courseListTab,
    courseCost,
    courseFree,
    courseNissoken,
    courseCompany,
    coursesNew
  ])

  const buyNow = () => { }

  const handleOnCheckBox = async (e) => {
    const { name, checked } = e.target
    const checkedItem = { [name]: checked }

    setCheckboxStatus(checkedItem)
    resetPageToInitOfCourseListAction()

    if (fromTab === TabsName.COMPANY_COURSE) {
      getCourseCompany({
        page: DEFAULT_PAG.page,
        limit: DEFAULT_LIMIT_COURSE_LIST,
        categories,
        courseSearch,
        isRequired: getIsRequiredCourseList(checkedItem)
      })
    } else if (fromTab === TabsName.NISSOKEN_COURSE) {
      getCourseNissoken({
        page: DEFAULT_PAG.page,
        limit: DEFAULT_LIMIT_COURSE_LIST,
        categories,
        courseSearch,
        isRequired: getIsRequiredCourseList(checkedItem)
      })
    } else if (fromTab === TabsName.NEW_COURSE) {
      getNewCourse({
        page: DEFAULT_PAG.page,
        limit: DEFAULT_LIMIT_COURSE_LIST,
        categories,
        courseSearch,
        isRequired: getIsRequiredCourseList(checkedItem)
      })
    }
  }

  const handleOnChangePage = (page, pageSize) => {
    window.scrollTo(0, 0)
    if (courseListTab === TabsName.COMPANY_COURSE) {
      getCourseCompany({
        page,
        limit: pageSize,
        categories,
        courseSearch,
        isRequired: getIsRequiredCourseList(checkBoxStatus)
      })
    }
    if (courseListTab === TabsName.NISSOKEN_COURSE) {
      getCourseNissoken({
        page,
        limit: pageSize,
        categories,
        courseSearch,
        isRequired: getIsRequiredCourseList(checkBoxStatus)
      })
    }
    if (courseListTab === TabsName.NEW_COURSE) {
      getNewCourse({
        page,
        limit: pageSize,
        categories,
        courseSearch,
        isRequired: getIsRequiredCourseList(checkBoxStatus)
      })
    }
  }

  const renderCourseList = () => {
    if (!dataSource.result || dataSource.result.length <= 0) return <Empty className="course-empty" description={t('common.no_data')} />
    return (
      <div className={`course-tab-content ${isSearching ? 'justifyCenter' : ''}`}>
        {(isMappable(dataSource.result)) && dataSource.result.map((item) => (
          <CardCourse
            userId={profile.userId}
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
            isRequired={item?.isRequired}
            course={item}
            courseInCart={courseInCart}
            addToCart={() => addCourseToCart(item)}
            buyNow={() => buyNow(item)}
            isNew={item.statusCourse}
            tab={courseListTab}
            item={item}
            isLiking={isLiking}
            isUpdatingBookmark={isUpdatingBookmark}
            updateBookmarkAction={updateBookmarkAction}
            onNavigate={() => {
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
            }}
          />
        ))}
      </div>
    )
  }

  const tabs = useMemo(() => {
    if (isUserCompany) return COMPANY_TABS
    if (isNissoken) return NISSOKEN_TABS
    return USER_TABS
  }, [isUserCompany, isNissoken, totalCourse, t])

  return (
    <Spin
      spinning={isSearching && Object.keys(error || {}).length === 0}
      size="large"
      style={{ marginTop: 150 }}
    >
      <Wrapper>
        <div className="course-tab">
          <div className="header">
            <TabBar
              currentTab={courseListTab}
              onChange={onTabChange}
              tabs={tabs}
            />
            {isUserCompany && (
              <div className="filter">
                <Checkbox name={COURSE_ATTRIBUTES.REQUIRED} onChange={handleOnCheckBox} checked={checkBoxStatus.required}>
                  {t('course_screen.required')}
                </Checkbox>
                <Checkbox name={COURSE_ATTRIBUTES.OPTIONAL} onChange={handleOnCheckBox} checked={checkBoxStatus.optional}>
                  {t('course_screen.optional')}
                </Checkbox>
              </div>
            )}
          </div>
          {renderCourseList()}
          <div style={{ marginTop: 24, justifyContent: 'center', alignItems: 'center', display: 'flex', marginBottom: 24 }}>
            <Pagination
              total={dataSource.total}
              current={dataSource.page}
              pageSize={dataSource.limit}
              showSizeChanger={false}
              onChange={handleOnChangePage}
              hideOnSinglePage
            />
          </div>
        </div>
      </Wrapper>
    </Spin>
  )
}

export default CourseTab
