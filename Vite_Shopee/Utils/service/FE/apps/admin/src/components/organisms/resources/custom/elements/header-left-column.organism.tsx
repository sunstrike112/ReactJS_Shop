import React, { useEffect } from 'react'
import {
  PageHeader,
  Space,
} from 'antd';
import { useRouter } from 'next/router'

/* eslint-disable-next-line */
export interface OGHeaderLeftColumnProps {
  title?: string;
  backLink?: string;
  extra?: any[];
  children?: any;
}

export function OGHeaderLeftColumn(props: OGHeaderLeftColumnProps) {
  const router = useRouter()

  const onBack = () => {
    if (!props.backLink) return window.history.back()
    return router.push(props.backLink)
  }

  return (
    <>
      <PageHeader
        className="left-content-header"
        onBack={onBack}
        title=" "
        style={{ padding: 0, margin: 0, height: 30 }}
        extra={props.extra}
      />
      { props.title && <span className="ant-page-header-heading-title" title={props.title}>{props.title}</span> }
      <style jsx global>{`
      .left-content-header .ant-page-header-heading {
        height: 29.6px
      }
      .left-content-header .ant-page-header-heading-extra,
      .left-content-header .ant-page-header-heading-left {
        margin: 0;
      }
      .left-content-header .ant-page-header-heading-extra {
        display: flex;
      }
      `}</style>
    </>
  )
}

export default OGHeaderLeftColumn
