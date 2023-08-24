import { Input } from 'antd';
import { LABEL_SEARCH_PLACEHOLDER } from '@ss-fe-fw/constants'

/* eslint-disable-next-line */
export interface OGSearchResourceProps {
  apiEndpoint?: any;
  children?: any;
  searchKey?: any;
  onSearch?: any;
}

const { Search } = Input;

export function OGSearchResource(props: OGSearchResourceProps) {

  const onSearch = value => {
    props.onSearch(value)
  }

  return (
    <>
      <Search placeholder={LABEL_SEARCH_PLACEHOLDER} allowClear onSearch={onSearch} />
      {props.children}
    </>
  )
}

export default OGSearchResource
