import { Tag } from 'antd'
import { paramCase } from "change-case";
import { MAX_CELL_TAGS_DISPLAY } from '@ss-fe-fw/constants'

/* eslint-disable-next-line */
export interface MCCellTagsProps {
  tags: any[];
  mainKey: string;
  fieldName: string;
}

export function MCCellTags(props: MCCellTagsProps) {
  const limitedTags = props.tags.length > 2 ? props.tags.slice(0, MAX_CELL_TAGS_DISPLAY) : props.tags
  const more = props.tags.length > 2 ? props.tags.length - MAX_CELL_TAGS_DISPLAY : 0
  return (
    <>
      { !Array.isArray(limitedTags) && props.tags }
      {
        Array.isArray(limitedTags) && limitedTags.map(tag => {
          const uniqueKey = `${props.mainKey}-${paramCase(tag[props.fieldName])}`
          return (
            <Tag key={uniqueKey}>
              {tag[props.fieldName]}
            </Tag>
          )
        })
      }
      { Array.isArray(limitedTags) && more > 0 && `+${more}` }
    </>
  )
}

export default MCCellTags
