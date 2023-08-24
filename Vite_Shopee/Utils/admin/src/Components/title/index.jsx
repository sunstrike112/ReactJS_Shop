/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import { Dropdown, ConfigProvider } from 'antd'
import { FilterOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import Breadcrumb from 'Components/breadcrumb'
import { BackButton } from 'Themes/facit'
import { BackWrapper, TitleWrapper } from './styled'

const Title = ({ icon, onBackWithoutRoute, title, filter, breadcrumb, backRoute, backRouteText = 'back_to_list', active = false, ...rest }) => {
  const [trans] = useTranslation('common')
  const ComponentIcon = icon

  // const renderCurrentFilterTag = useMemo(() => {
  //   const founds = currentFilter
  //   Object.keys(currentFilter).forEach((key) => {
  //     if (Array.isArray(currentFilter[key]) && currentFilter[key].length === 0) {
  //       delete founds[key]
  //     }
  //     if (!currentFilter[key] && !Array.isArray(currentFilter[key])) {
  //       delete founds[key]
  //     }
  //   })
  //   const foundsTemp = Object.keys(founds).reduce((result, key) => {
  //     if (founds[key]) {
  //       result.push(
  //         <div className="filter-tag">
  //           <small>
  //             <strong>{camel2Text(key)}:</strong><span>&nbsp;{founds[key]}</span>
  //           </small>
  //         </div>
  //       )
  //     }
  //     return result
  //   }, [])
  //   return foundsTemp
  // }, [currentFilter])

  const renderGoBack = () => {
    if (breadcrumb || backRoute) {
      return (
        <>
          <div className="action">
            {breadcrumb && <Breadcrumb data={breadcrumb} />}
            {backRoute && (
            <BackButton active={active} to={backRoute}>
              <ArrowLeftOutlined />
              <span>{trans(backRouteText)}</span>
            </BackButton>
            )}
          </div>
          <div className="separator" />
        </>
      )
    }
    if (onBackWithoutRoute) {
      return (
        <>
          <div className="action">
            <BackWrapper onClick={onBackWithoutRoute}>
              <ArrowLeftOutlined />
            </BackWrapper>
          </div>
          <div className="separator" />
        </>
      )
    }
    return null
  }

  return (
    <TitleWrapper {...rest}>
      <div className="left">
        {renderGoBack()}
        <div className="title-wrap">
          {icon && <ComponentIcon className="icon" />}
          <span className="title">{title}</span>
        </div>
      </div>
      <div className="right">
        {filter && (
          <>
            {/* {renderCurrentFilterTag} */}
            <div className="separator" />
            <div id="filter-popup-container" style={{ position: 'relative' }}>
              <ConfigProvider getPopupContainer={() => document.getElementById('filter-popup-container')}>
                <Dropdown overlay={filter} trigger={['click']}>
                  <a href className="ant-dropdown-link filter" onClick={(e) => e.preventDefault()}>
                    <FilterOutlined />
                    <span>&nbsp;{trans('filter')}</span>
                  </a>
                </Dropdown>
              </ConfigProvider>
            </div>
          </>
        )}
      </div>
    </TitleWrapper>
  )
}

export default memo(Title)
