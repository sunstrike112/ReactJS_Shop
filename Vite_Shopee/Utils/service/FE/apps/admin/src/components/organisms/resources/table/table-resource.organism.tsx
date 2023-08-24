import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import { fetcher } from '@ss-fe-fw/api/fetcher'
import {useMount} from 'react-use'
// Import from local
import { STANDARD_FORMAT_DATETIME_MOMENT } from '@ss-fe-fw/constants'
import { MCMainTable, MCCellTags } from '@ss-fe-fw/molecules'
import { OGTextDateTime } from '@ss-fe-fw/shared/ui'
import { ITableColumnItem } from '@ss-fe-fw/configs'
import { snakeCase, noCase, paramCase } from "change-case"
import { titleCase } from "title-case"
// import { convertDateTimeToUtc } from '@ss-fe-fw/shared/ui'
import { fromString } from '@ss-fe-fw/utils/uuid'
import PubSub from 'pubsub-js'
import * as _ from 'lodash'
import {
  handleCombineWhere,
} from '@ss-fe-fw/organisms'
import MCCellStatusTag from '../../../molecules/tables/cell-status-tag.molecule'

/* eslint-disable-next-line */
export interface OGTableResourceProps {
  apiEndpoint: string;
  columns: ITableColumnItem[];
  transform?: any;
  query?: any;
  searchKey?: string;
  searchFields?: string[];
  searchCustomFormatFields?: any;
  listFiltered?: any[];
}

export function OGTableResource(props: OGTableResourceProps) {
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState(null)
  const url = `${props.apiEndpoint}/search`
  const [cacheKey, setCacheKey] = useState(null)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 })
  const [sorter, setSorter] = useState(null)
  const { data, error } = useSWR(
    (mounted && query) ? [cacheKey, url, 'POST', query] : null, (key, url, method, body) => fetcher(url, method, body)
  )
  const schema = useSWR(mounted ? `${props.apiEndpoint}/schema` : null, fetcher)
  const [columns, setColumns] = useState([])
  const [rowKeyTable, setRowKeyTable] = useState('id')
  const [prevListFiltered, setPrevListFiltered] = useState(null)
  const [prevSearchKey, setPrevSearchKey] = useState(null)
  // const [timezone, setTimezone] = useRecoilState(timezoneState);

  const handleExecuteQuery = (_pagination, _sorter = null) => {
    let orderByQuery = null
    const cloneProps = _.cloneDeep(props)
    const _query = cloneProps.query ?? null
    const [combineWhere, includeOrder] = handleCombineWhere(cloneProps, columns, schema)

    if (_sorter && _sorter?.order != undefined) {
      // Check virtual field of sorter column
      let sorterField = _sorter.field
      const column = props.columns.filter((column) => column.key === _sorter.field)
      if (column && column.length > 0 && column[0]?.realColumnSorter) sorterField = column[0].realColumnSorter

      if (sorterField) {
        orderByQuery = {
          orderBy: [{[sorterField]: _sorter.order === 'descend' ? 'desc' : 'asc' }]
        }
      }
    }

    const combinedQuery = {
      page: _pagination.current,
      size: _pagination.pageSize,
      ...(_query && includeOrder),
      ...combineWhere,
      ...(_sorter && orderByQuery)
    }

    setCacheKey(`${fromString(url)}-${snakeCase(fromString(JSON.stringify(combinedQuery)))}`)
    setQuery(combinedQuery)
  }

  const handleTableChange = (_pagination, _filters, _sorter) => {
    setPagination(_pagination)
    setSorter(_sorter)
    handleExecuteQuery(_pagination, _sorter)
  }

  const reloadExecuteQuery = () => {
    setMounted(true)
  }

  useMount(() => setMounted(true))

  // Handle Query with Search Key
  useEffect(() => {
    // Check prev of filtered and search key with new filtered / search key
    if (
      fromString(JSON.stringify(prevListFiltered)) !== fromString(JSON.stringify(props.listFiltered)) ||
      prevSearchKey !== props.searchKey
    ) {
      setPrevSearchKey(props.searchKey)
      setPrevListFiltered(props.listFiltered)
      const newDataPagination = { current: 1, pageSize: pagination.pageSize, total: 0 }
      setPagination(newDataPagination)
      handleExecuteQuery(newDataPagination, sorter)
    }
  }, [props.searchKey, props.query, props.listFiltered])

  // Handle Format and Render cell of table
  useEffect(() => {
    const formatItem = (item) => {
      let _item = null;
      if (typeof item === 'string') {
        _item = { title: titleCase(noCase(item)), dataIndex: item, key: item }
      } else {
        item.dataIndex = item.key
        _item = item
      }
      return _item;
    }
    const renderItem = (item, fields) => {
      if (item.render) return item
      if (item.key.includes('email')) {
        if (item?.linkToDetail) {
          item.render = (text, row) => text ?
            <Link href={item?.linkToDetail + '/' + row[rowKeyTable]}>
              <a>{text}</a>
            </Link> : ''
        } else {
          item.render = text => text ? <a>{text}</a> : ''
        }
      }
      if (!item.render && item?.linkToDetail) {
        item.render = (text, row) => text ?
          <Link href={item?.linkToDetail + '/' + row[rowKeyTable]}>
            <a>{text}</a>
          </Link> : ''
      }
      if (fields[item.key] && fields[item.key].kind === 'enum') {
        item.render = text => text ? text.charAt(0).toUpperCase() + text.slice(1) : ''
      }
      if (fields[item.key] && fields[item.key].type === 'Boolean') {
        if (item.type === 'status') {
          item.render = text => <MCCellStatusTag isActive={text} />
        } else {
          item.render = text => text ? 'Yes' : 'No'
        }
      }
      if (fields[item.key] && fields[item.key].type === 'DateTime') {
        item.render = text => text && <OGTextDateTime date={text} format={STANDARD_FORMAT_DATETIME_MOMENT} />
      }
      if (fields[item.key] && fields[item.key].type === 'Json') {
        item.render = text => text && JSON.stringify(text);
      }
      if (fields[item.key] && fields[item.key].kind === 'object') {
        item.render = arrItems => arrItems && item.fieldName && (
          <span>
            { (arrItems && !Array.isArray(arrItems)) && <span>{arrItems[item.fieldName]}</span> }
            { arrItems && arrItems.length > 0 && <MCCellTags tags={arrItems} mainKey={item.key} fieldName={item.fieldName} /> }
          </span>
        )
      }

      return item;
    }

    if (data && data.items && props.transform) data.items = props.transform(data.items)
    if (data && data.items) {
      setPagination({...pagination, total: data.total})
    }
    if (schema.data && schema.data.items) {
      Object.entries(schema.data.items.fields).forEach(([key, item]: any) => {
        if (item.isId) setRowKeyTable(item.name)
      });

      let cols = []
      const tableSchema = props?.columns?.length ? props.columns : schema.data.items.list
      tableSchema.forEach((item) => {
        // Auto remove relationship without define columns
        if (!schema.data.items.relations.includes(item)) {
          let _item = formatItem(item)
          _item = renderItem(_item, schema.data.items.fields)
          cols.push(_item)
        }
      })
      setColumns(cols)
    }
  }, [schema, data])

  useEffect(() => {
    const reloadSubscribe = PubSub.subscribe('reload_table', () => {
      setMounted(false)
      reloadExecuteQuery()
    });

    return () => {
      PubSub.unsubscribe(reloadSubscribe);
    }
  }, [])
  console.log(`url : ${url}`)
  console.log(`data table : ${data?.items}`)
  return (
    <>
      <MCMainTable
        pagination={pagination}
        dataSource={data?.items}
        columns={columns}
        rowKey={rowKeyTable}
        onChange={handleTableChange}
      />
    </>
  )
}

export default OGTableResource
