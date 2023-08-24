import React, { useEffect, useState } from 'react'
// Import from antd
import {
  Row,
  Col,
  Space
} from 'antd'
import { OGTableResource, OGFilterResource, OGSearchResource } from '@ss-fe-fw/organisms'

/* eslint-disable-next-line */
export interface OGListResourcesProps {
  resource?: any;
  children?: any;
}

export function OGListResources(props: OGListResourcesProps) {
  // const [filters, setFilters] = useState(null)
  const [searchKey, setSearchKey] = useState('')
  const [listFiltered, setListFiltered] = useState([])

  const onSearch = (value) => {
    setSearchKey(value)
  }

  const onCallbackSetListFiltered = (resultFiltered) => {
    setListFiltered(resultFiltered)
  }

  console.log(`source : ${props.resource}`)

  return (
    <>
      <div className="box-list-resources">
        <Space size="middle" direction="vertical" className="box-list-resources__container">
          {
            props.resource?.ui?.list?.topControls?.top?.isDisplay &&
            props.resource?.ui?.list?.topControls?.top?.component && (
              React.createElement(
                props.resource?.ui?.list?.topControls?.top?.component,
                {
                  ...props,
                  searchKey: searchKey,
                  setSearchKey: setSearchKey,
                  listFiltered: listFiltered,
                  setListFiltered: setListFiltered
                }
              )
            )
          }
          { props.resource?.ui?.list?.topControls &&
            <Row className="box-list-resources__top-controls" gutter={[16, 16]} align="middle">
              <Col xs={24} sm={24} md={8} lg={6} xl={6}>
                <Row className="box-list-resources__top-controls-left" align="middle">
                  <Space>
                  {
                    (props.resource.ui.list.topControls.left.isDisplay &&
                    props.resource.ui.list.topControls.left.beforeExtraComponent) &&
                    React.createElement(props.resource.ui.list.topControls.left.beforeExtraComponent)
                  }
                  {
                    props.resource.ui.list.topControls.left.isDisplay &&
                    <OGSearchResource apiEndpoint={props.resource.apiEndpoint} searchKey={searchKey} onSearch={onSearch} />
                  }
                  {
                    (props.resource.ui.list.topControls.left.isDisplay &&
                    props.resource.ui.list.topControls.left.afterExtraComponent) &&
                    React.createElement(props.resource.ui.list.topControls.left.afterExtraComponent)
                  }
                  </Space>
                </Row>
              </Col>
              <Col xs={24} sm={24} md={16} lg={18} xl={18}>
                <Row className="box-list-resources__top-controls-right" justify="end" align="middle">
                  <Space>
                  {
                    (props.resource.ui.list.topControls.right.isDisplay &&
                    props.resource.ui.list.topControls.right.beforeExtraComponent) &&
                    React.createElement(props.resource.ui.list.topControls.right.beforeExtraComponent)
                  }
                  {
                    props.resource.ui.list.topControls.right.isDisplay &&
                    <OGFilterResource
                      apiEndpoint={props.resource.apiEndpoint}
                      filters={props.resource.ui.list.filters}
                      onSetResultFiltered={onCallbackSetListFiltered}
                    />
                  }
                  {
                    (props.resource.ui.list.topControls.right.isDisplay &&
                    props.resource.ui.list.topControls.right.afterExtraComponent) &&
                    React.createElement(props.resource.ui.list.topControls.right.afterExtraComponent)
                  }
                  </Space>
                </Row>
              </Col>
            </Row>
          }
          {/* <div>{searchKey}</div> */}
          { props.resource.ui.list.table.isDisplay &&
            <Row className="box-table-resource">
              <Col span={24}>
                <OGTableResource
                  apiEndpoint={props.resource.apiEndpoint}
                  columns={props.resource?.ui?.list?.table?.columns}
                  transform={props.resource?.ui?.list?.table?.transform}
                  query={props.resource?.ui?.list?.query}
                  searchKey={searchKey?.trim()}
                  searchFields={props.resource?.ui?.list?.search?.fields}
                  searchCustomFormatFields={props.resource?.ui?.list?.search?.customFormatFields}
                  listFiltered={listFiltered}
                />
              </Col>
            </Row>
          }
          { props.children &&
            <Row className="box-child-resource">
              {props.children}
            </Row>
          }
        </Space>
      </div>

      <style jsx global>{`
      .box-list-resources__container {
        width: 100%;
      }
      // .box-list-resources__top-controls-left {
      //   padding-bottom: 16px;
      // }
      `}</style>
    </>
  )
}

export default OGListResources
