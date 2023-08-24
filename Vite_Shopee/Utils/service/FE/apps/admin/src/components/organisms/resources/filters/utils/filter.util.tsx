
import { convertDateTimeToUtc } from '@ss-fe-fw/shared/ui'

export interface IIncludeOrderQuery {
  include?: any,
  orderBy?: any,
  where?: any
}

export interface ISearchProps {
  searchKey?: string;
  searchFields?: any[];
  searchCustomFormatFields?: any;
  listFiltered?: any[];
  query?: IIncludeOrderQuery;
}


export const handlePrepareQueryWithSearchKey = (props: ISearchProps, columns, schema) => {
  let prepareQuery = {};
  if (props.searchKey && props.searchKey !== '') {
    let where: any = {
      OR: []
    }

    if (props.searchFields && props.searchFields.length > 0) {
      props.searchFields.forEach((item) => {
        where.OR = [...where.OR, { [item]: { contains: props.searchKey, mode: "insensitive" } }]
      })
    } else {
      columns.forEach((item) => {
        if (schema?.data?.items?.fields[item.key] && schema?.data?.items?.fields[item.key]?.type === 'String') {
          where.OR = [...where.OR, { [item.key]: { contains: props.searchKey, mode: "insensitive" } }]
        }
      })
    }
    if (props.searchCustomFormatFields) {
      const customFormat = props.searchCustomFormatFields.format(props.searchKey);
      Object.entries(customFormat).forEach(([key, customQuery]) => {
        where.OR = [...where.OR, {[key]: customQuery}]
      })
    }
    if (where.OR.length === 0) where = null
    prepareQuery = where
  }
  return prepareQuery
}

export const handlePrepareQueryWithListFiltered = (props: ISearchProps) => {
  if (props.listFiltered && props.listFiltered.length > 0) {
    let where: any = {
      AND: []
    }
    props.listFiltered.forEach((item) => {
      let objQuery = null
      if (item.isRelation) {
        // Relations One - Many
        objQuery = {[item.key]: { some: { [item.item.idKey]: { [item.operator]: item.filterItem }}}}
      } else if (item.isSingleRelation) {
        // One - One
        objQuery = {[item.key]: {[item.item.idKey]: { [item.operator]: item.filterItem }}}
      } else {
        if (item.isBoolean) item.filterItem = item.filterItem === 'true' ? true : false
        objQuery = {[item.key]: { [item.operator]: item.filterItem, mode: "insensitive" }}

        if (item.isDateTime) {
          const from = convertDateTimeToUtc(item.filterItem.from, 'start').toISOString()
          const to = convertDateTimeToUtc(item.filterItem.to, 'end').toISOString()
          objQuery = {
            AND: [
              { [item.key]: { gte: from } },
              { [item.key]: { lte: to } }
            ]
          }
        }
        isNeedRemoveMode(item) && delete objQuery[item.key].mode
      }
      where.AND = [...where.AND, objQuery]
    })
    return where
  }
  return null
}

export const isNeedRemoveMode = (item) => {
  if (['bigint', 'number'].includes(typeof item.filterItem) ||
    item.isBoolean ||
    item.isEnum // Enum type
  ) {
    return true
  }
  return false
}

export const handleCombineWhere = (props: ISearchProps, columns, schema) => {
  const searchQuery = handlePrepareQueryWithSearchKey(props, columns, schema)
  const filteredQuery = handlePrepareQueryWithListFiltered(props)
  const combineWhere: any = {
    where: {
      AND: []
    }
  }
  if (searchQuery) combineWhere.where.AND = { ...combineWhere.where.AND, ...searchQuery }
  if (filteredQuery) combineWhere.where.AND = { ...combineWhere.where.AND, ...filteredQuery }

  const customQuery = props?.query
  let where = null
  if (customQuery?.where) {
    where = customQuery.where
    // delete customQuery.where
  }
  const includeOrder = customQuery

  if (where) {
    Object.entries(where).forEach(([key, itemWhere]) => {
      if (combineWhere.where.AND.AND) {
        const index = combineWhere?.where?.AND?.AND?.findIndex(_item => {
          const [_key, ] = Object.entries(_item)
          return _key[0] === key
        })
        if (index >= 0) combineWhere.where.AND.AND.splice(index, 1)
        combineWhere.where.AND.AND = [...combineWhere.where.AND.AND, { [key]: itemWhere }]
      } else {
        combineWhere.where.AND = { ...combineWhere.where.AND, ...{AND: [{ [key]: itemWhere }]}}
      }
    })
  }

  return [combineWhere, includeOrder]
}
