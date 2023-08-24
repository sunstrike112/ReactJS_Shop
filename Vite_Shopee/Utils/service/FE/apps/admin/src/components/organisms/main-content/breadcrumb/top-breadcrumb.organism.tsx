import React, { useState } from 'react'
// Import from antd
import { PageHeader, Breadcrumb } from 'antd'
import { randomUuid } from '@ss-fe-fw/utils/uuid'

/* eslint-disable-next-line */
export interface OGTopBreadcrumbProps {
  breadcrumb: any;
  title?: string;
  extra?: any[];
}

export function OGTopBreadcrumb(props: OGTopBreadcrumbProps) {
  const routes = props.breadcrumb

  const customBreadcrumbRender = (props) => {
    let customBreadcrumbElements = null;
    if (props.breadcrumb.routes != null && props.breadcrumb.routes.length > 0) {
      customBreadcrumbElements = props.breadcrumb.routes.map((route, index) => {
        if (route.path == null) {
          return (
            <Breadcrumb.Item className="breadcrumb-unlink" key={'custom-breadcrumb-' + index}>{route.breadcrumbName}</Breadcrumb.Item>
          )
        } else {
          return (
            <Breadcrumb.Item className="breadcrumb-link" key={'custom-breadcrumb-' + index}>
              <a href={route.path}>{route.breadcrumbName}</a>
            </Breadcrumb.Item>
          )
        }
      })
    }

    return customBreadcrumbElements ? <Breadcrumb>{customBreadcrumbElements}</Breadcrumb> : null
  }

  return (
    <>
      <PageHeader
        className="site-page-header"
        breadcrumb={{routes}}
        title={props.title}
        breadcrumbRender={customBreadcrumbRender}
        extra={
          props.extra && props.extra.map((item) => {
            const Component = item
            return <Component color="#272F3E" key={randomUuid()} />
          })
        }
      />
      <style jsx global>{`
      .ant-breadcrumb + .ant-page-header-heading {
        margin-top: 10px;
      }
      .breadcrumb-link a {
        color: #888E9C;
        font-size: 14px;
        line-height: 22px;
      }
      .breadcrumb-link a:hover {
        color: #04BAE0;
      }
      .breadcrumb-unlink {
        color: #272F3E;
        font-size: 14px;
        line-height: 22px;
      }
      .has-breadcrumb {
        margin-top: 64px;
        padding: ${props.title ? '17px 24px 18px 24px' : '9px 24px'} !important;
        background: #fff;
      }
      .has-breadcrumb .ant-page-header-heading * {
        margin: 0;
      }
      .ant-page-header-heading-title {
        font-weight: 700;
        color: #272F3E;
      }
      .ant-page-header-heading-extra button span {
        color: #272F3E;
      }
      `}</style>
    </>
  )
}

export default OGTopBreadcrumb
