/* eslint-disable react/prop-types */
import { Tree } from 'antd'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, PrimaryButton, TextPrimary } from '..'
import { ICON_ARROW_DOWN, SEARCH } from '../../assets'
import { useCourseList, useHistories } from '../../hooks'
import { COURSE_TYPE, USER_ROLE } from '../../constants'

import { Wrapper } from './styled'
import { STORAGE } from '../../utils'

const SiderBar = (props) => {
  // Props
  const {
    isUserCompany,
    isUserNissoken,
    userRole,
    profile,
    setCategories,
    setCourseSearch,
    isRequired,
    courseSearch,
    companyCategories,
    categories,
    nissokenCategories
  } = props
  // End Props
  const { t } = useTranslation()
  const history = useHistories()
  const {
    getCourseCost,
    getCourseFree,
    searchingCourseListAction,
    courseListTab
  } = useCourseList({ userId: profile?.userId })
  const languageStatus = localStorage.getItem(STORAGE.LANGUAGE) || 'jp'
  const [checkedKeys, setCheckedKeys] = useState({ company: [], nissoken: [] })

  useEffect(() => {
    const companyKeys = companyCategories.reduce((result, m) => {
      result.push(m.key)
      if (m.children) {
        result = result.concat(m.children.map((child) => child.key))
      }
      return result
    }, [])
    const nissokenKeys = nissokenCategories.reduce((result, m) => {
      result.push(m.key)
      if (m.children) {
        result = result.concat(m.children.map((child) => child.key))
      }
      return result
    }, [])
    setCheckedKeys({ company: categories.filter((f) => companyKeys.includes(f)), nissoken: categories.filter((f) => nissokenKeys.includes(f)) })
  }, [categories])

  const handleOnCheck = (checkedKeysValue, type) => {
    if (type === COURSE_TYPE.COMPANY) {
      setCheckedKeys({ ...checkedKeys, company: checkedKeysValue })
    } else {
      setCheckedKeys({ ...checkedKeys, nissoken: checkedKeysValue })
    }
  }

  const onSearchChange = (e) => {
    setCourseSearch(e.target.value)
  }

  const handleSearch = () => {
    const { company, nissoken } = checkedKeys
    const categoriesTotal = company.concat(nissoken)
    setCategories(categoriesTotal)
    setCourseSearch(courseSearch)
    if (isUserCompany || isUserNissoken) {
      searchingCourseListAction({ courseListTab, categories: categoriesTotal, courseSearch, isRequired, history })
    } else {
      // TODO: Not using both of these course currently
      getCourseCost(categoriesTotal, courseSearch, null)
      getCourseFree(categoriesTotal, courseSearch, null)
    }
  }

  return (
    <Wrapper languageStatus={languageStatus}>
      <div className="search">
        <Input
          placeholder={t('course_screen.search-placeholder')}
          background="grey_blur"
          onChange={onSearchChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
          value={courseSearch}
          icon={SEARCH}
          inputSize="input_stretch"
        />
        <PrimaryButton onClick={handleSearch} title={t('common.search')} />
      </div>
      {isUserCompany ? (
        <>
          {companyCategories.length && (
            <>
              <TextPrimary className="title" fontSize="size_18" fontWeight="fw_600">ジョブナビ</TextPrimary>
              <Tree
                checkable
                selectable={false}
                style={{ fontSize: 12 }}
                treeData={companyCategories}
                onCheck={(e) => handleOnCheck(e, COURSE_TYPE.COMPANY)}
                switcherIcon={() => <span><ICON_ARROW_DOWN /></span>}
                checkedKeys={checkedKeys.company}
              />
            </>
          )}
          {nissokenCategories.length && (
            <>
              <TextPrimary style={{ marginTop: 30 }} className="title" fontSize="size_18" fontWeight="fw_600">ジョブナレ</TextPrimary>
              <Tree
                checkable
                selectable={false}
                style={{ fontSize: 12 }}
                treeData={nissokenCategories}
                onCheck={(e) => handleOnCheck(e, COURSE_TYPE.NISSOKEN)}
                switcherIcon={() => <span><ICON_ARROW_DOWN /></span>}
                checkedKeys={checkedKeys.nissoken}
              />
            </>
          )}
        </>
      ) : (
        <>
          {nissokenCategories.length && (
            <>
              {userRole === USER_ROLE.NISSHOKEN_ADMIN && (
                <TextPrimary style={{ marginTop: 30 }} className="title" fontSize="size_16" fontWeight="fw_600">
                  ジョブナレ
                </TextPrimary>
              )}
              <Tree
                checkable
                selectable={false}
                treeData={nissokenCategories}
                onCheck={(e) => handleOnCheck(e, COURSE_TYPE.NISSOKEN)}
                switcherIcon={() => <span><ICON_ARROW_DOWN /></span>}
                checkedKeys={checkedKeys.nissoken}
              />
            </>
          )}
        </>
      )}
      <div className="searchBtn">
        <PrimaryButton onClick={handleSearch} title={t('common.search')} />
      </div>
    </Wrapper>
  )
}

export default SiderBar
