import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb as BC, Typography } from 'antd'

const Breadcrumb = ({ t, root = '/', data, onSelectItem }) => (
  <BC separator="">
    <BC.Item onClick={() => onSelectItem()} style={{ marginRight: 8 }}><Typography.Link>{root}</Typography.Link></BC.Item>
    {data?.map((item, index) => (
      <Fragment key={item.key}>
        {index > 0 && <BC.Separator />}
        {(index < data.length - 1) ? <BC.Item onClick={() => onSelectItem(item)}><Typography.Link>{item.data?.keyFile ? t(item.data.keyFile) : item.text}</Typography.Link></BC.Item>
          : <BC.Item>{item.data?.keyFile ? t(item.data.keyFile) : item.text}</BC.Item>}
      </Fragment>
    ))}
  </BC>
)

Breadcrumb.propTypes = {
  root: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  data: PropTypes.array,
  onSelectItem: PropTypes.func
}

export default Breadcrumb
