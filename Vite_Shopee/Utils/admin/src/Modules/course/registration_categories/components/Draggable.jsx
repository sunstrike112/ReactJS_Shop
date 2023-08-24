/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import { Table } from 'antd'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const type = 'DraggableBodyRow'

const DraggableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = useRef()
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {}
      if (dragIndex === index) {
        return {}
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward'
      }
    },
    drop: (item) => {
      moveRow(item.index, index)
    }
  })
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })
  drop(drag(ref))

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  )
}

const DragSortingTable = ({ columns, dataSource, moveRow, ...rest }) => {
  const components = {
    body: {
      row: DraggableBodyRow
    }
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        columns={columns}
        dataSource={dataSource}
        components={components}
        onRow={(record, index) => ({
          index,
          moveRow
        })}
        pagination={false}
        {...rest}
      />
    </DndProvider>
  )
}

export default DragSortingTable
