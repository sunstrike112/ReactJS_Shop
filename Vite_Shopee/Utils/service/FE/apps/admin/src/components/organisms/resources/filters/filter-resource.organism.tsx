import React, { useState, useEffect, useRef } from 'react'
// Import from antd
import {
  Drawer,
  Button,
  Typography,
  Space,
  Tag,
  Form,
} from 'antd'
import { useMount } from 'react-use';
import useSchemaResource from '@ss-fe-fw/hooks/use-schema-resource'
import {
  brandingColors,
  LABEL_FILTERED,
  LABEL_CLEAR_ALL,
  MAX_FILTER_TAGS_DISPLAY,
  LABEL_DRAWER_FILTER_TITLE,
} from '@ss-fe-fw/constants'
import {
  FilterFilled
} from '@ant-design/icons';
import OGFooterDrawerResource from './parts/footer-drawer-resource.organism'
import OGFormFilterResource from './parts/form-filter-resource.organism'
import { STANDARD_FORMAT_DATE_MOMENT } from '@ss-fe-fw/constants'
import { displayDateTime } from '@ss-fe-fw/shared/ui'
import {
  useRecoilValue,
} from 'recoil';
import { currentTimezoneState } from '@ss-fe-fw/stores';

/* eslint-disable-next-line */
export interface OGFilterResourceProps {
  apiEndpoint?: any;
  children?: any;
  filters?: any;
  onSetResultFiltered?: any;
}

const { Text, Link } = Typography;

export function OGFilterResource(props: OGFilterResourceProps) {
  const [mounted, setMounted] = useState(false)
  const {schema, isSchemaLoading, isSchemaError} = useSchemaResource({mounted, apiEndpoint: props.apiEndpoint})
  const [filterSchema, setFilterSchema] = useState([])
  const [isResetForm, setIsResetForm] = useState(false)
  const [visible, setVisible] = useState(false);
  const [filterTags, setFilterTags] = useState([]);
  const [form] = Form.useForm()
  const timezone = useRecoilValue(currentTimezoneState);
  const [currentFilterItems, setCurrentFilterItems] = useState(null)

  // Hooks Mounted
  useMount(() => setMounted(true))

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const callClearFilter = () => {
    setIsResetForm(true)
    // Need to set to false after = true
    setTimeout(() => setIsResetForm(false), 200);
  }

  const onResetFields = () => {
    callClearFilter()
    setFilterTags([])
    onClose()
  }

  const removeFilter = removedTag => {
    const tags = filterTags.filter(tag => tag.key !== removedTag.key)
    callClearFilter()
    setFilterTags([...tags])
  }

  const clearAll = () => {
    onResetFields()
  }

  const renderFilterTag = (tags) => {
    const displayTags = tags.length > 2 ? tags.slice(0, MAX_FILTER_TAGS_DISPLAY) : tags
    const more = tags.length > 2 ? tags.length - MAX_FILTER_TAGS_DISPLAY : 0
    return (
      <>
        {
          displayTags.map((tag, index) => {
            return (
              <Tag
                key={index}
                closable
                onClose={() => removeFilter(tag)}
                visible={true}
              >
                {tag.operator !== 'between' && <Text ellipsis={true} style={{ maxWidth: 200 }}>{tag.key + ' ' + tag.operator + ' ' + tag.value}</Text>}
                {tag.operator === 'between' && <Text ellipsis={true} style={{ maxWidth: 200 }}>{tag.key + ' ' + tag.value}</Text>}
              </Tag>
            )
          })
        }
        { more > 0 && <Link onClick={showDrawer}>more</Link> }
      </>
    )
  }

  const onApplyFilter = () => {
    form.submit()
    onClose()
  }

  const handleCallbackGetListFilter = (filterItems) => {
    let filters = [];
    setCurrentFilterItems(filterItems)
    Object.entries(filterItems).forEach(([key, item]: any) => {
      let _value = item.input
      let filterItem = item.input
      let isRelation = false
      let isSingleRelation = false
      let isBoolean = schema?.items?.fields[key].type === 'Boolean' ? true : false
      let isEnum = schema?.items?.fields[key].kind === 'enum' ? true : false
      let isDateTime = schema?.items?.fields[key].type === 'DateTime' ? true : false
      if (Array.isArray(_value) && _value.length > 0) {
        filterItem = filterItem.map((filterVal) => {
          return filterVal.value
        })
        _value = '[' + _value.map((inputVal) => inputVal.label).join() + ']'
        if (item.hasOwnProperty('relationName') && schema?.items?.fields[key].isList) isRelation = true
        if (item.hasOwnProperty('relationName') && !schema?.items?.fields[key].isList) isSingleRelation = true
      }
      if (_value?.from && _value?.to) {
        const from = displayDateTime(_value.from.toISOString(), timezone, STANDARD_FORMAT_DATE_MOMENT)
        if (item.operator === "between") {
          const to = displayDateTime(_value.to.toISOString(), timezone, STANDARD_FORMAT_DATE_MOMENT)
          _value = `${from}-${to}`
        } else {
          _value = `${from}`
        }
      } else if (_value && (_value.hasOwnProperty('from') && _value.from == null) && (_value.hasOwnProperty('to') && _value.to == null)) {
        _value = null
      }
      if (_value && _value !== null && !Array.isArray(_value)) {
        filters.push({
          key: key,
          operator: item.operator,
          value: _value,
          item: item,
          isRelation: isRelation,
          isSingleRelation: isSingleRelation,
          isBoolean: isBoolean,
          isEnum: isEnum,
          isDateTime: isDateTime,
          filterItem: filterItem
        })
      }
    })
    setFilterTags([...filters])
  }

  // On callback to parent
  useEffect(() => {
    props.onSetResultFiltered(filterTags)
  }, [filterTags])

  useEffect(() => {
    if (mounted && props?.filters?.fields) {
      const transform = props?.filters?.fields.filter((field) => schema?.items?.filter.includes(field.key))
      setFilterSchema(transform)
    }
    if (mounted && !props?.filters?.fields) setFilterSchema(schema?.items?.filter)
  }, [schema])

  useEffect(() => {
    currentFilterItems && handleCallbackGetListFilter(currentFilterItems)
  }, [timezone])

  return (
    <>
      <Space
        align="center"
        size="middle"
        // style={{ marginBottom: 8 }}
      >
        {filterTags.length > 0 &&
          <Space align="center" size="small">
            <Text>{LABEL_FILTERED}:</Text>
            <div>
              {filterTags && renderFilterTag(filterTags)}
            </div>
            <Link
              onClick={clearAll}
              underline
              style={{ color: brandingColors['text-color'], width: 70, textAlign: 'center', display: 'flex'}}
            >
              {LABEL_CLEAR_ALL}
            </Link>
          </Space>
        }
        <Button
          type={filterTags.length > 0 ? 'primary' : 'default'}
          size="large"
          onClick={showDrawer}
          icon={
            <FilterFilled
              style={{
                fontSize: 14,
                color: filterTags.length > 0 ? '#fff' : brandingColors['primary-color']
              }}
            />
          }
        />
      </Space>

      <Drawer
        title={LABEL_DRAWER_FILTER_TITLE}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={320}
        footer={
          <OGFooterDrawerResource
            onClose={onResetFields}
            onApply={onApplyFilter}
          />
        }
        footerStyle={{ borderTop: 'none' }}
      >
        {mounted &&
          <OGFormFilterResource
            form={form}
            fields={schema?.items?.fields}
            schema={filterSchema}
            relations={props?.filters?.relations}
            isLoading={isSchemaLoading}
            isError={isSchemaError}
            handleFormFinish={handleCallbackGetListFilter}
            initValueTags={filterTags}
            isReset={isResetForm}
          />
        }
      </Drawer>
      {props.children}
    </>
  )
}

export default OGFilterResource

