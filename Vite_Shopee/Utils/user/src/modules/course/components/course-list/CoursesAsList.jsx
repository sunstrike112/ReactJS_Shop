import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { CardAsList } from '../../../../components'
import { dateFormat } from '../../../../utils'
import { FULL_DATE, FULL_DATE_TIME } from '../../../../utils/date'
import { useCourseStudying, useHistories, useProfile } from '../../../../hooks'
import { MY_PAGE_TABS } from '../../../../constants'

const transformData = (data = []) => data.map((course) => ({
  ...course,
  id: `item-${course.courseId}`, // id required prefix 'item-'
  content: course.courseName
}))

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const CoursesAsList = ({ tab, cantHidden, onHideCourse, dataSource = [], isPopupButton }) => {
  // Use hooks
  const { userRole } = useProfile()
  const history = useHistories()
  const { updateOrderCoursesAction, savedFilter: { courseSearch } } = useCourseStudying({ userRole })
  // End use hooks

  const dataSourceAsList = useMemo(() => transformData(dataSource), [dataSource])

  const onDragEnd = (result) => {
    // dropped outside the list || not changed index || list === 1
    if (!result.destination || result.source.index === result.destination.index || dataSourceAsList.length === 1) {
      return
    }

    const newItems = reorder(
      dataSourceAsList,
      result.source.index,
      result.destination.index
    )
    const idOfCourseDragged = newItems.findIndex((_, index) => index === result.destination.index)
    const offsetBefore = newItems[idOfCourseDragged - 1]?.userCourseOffset || ''
    const offsetAfter = newItems[idOfCourseDragged + 1]?.userCourseOffset || ''
    updateOrderCoursesAction({
      newItems,
      tab,
      courseId: Number(newItems[idOfCourseDragged].courseId),
      params: { offsetBefore, offsetAfter }
    })
  }
  // Ignore drag if tab is 'required' and searching
  if (tab === MY_PAGE_TABS.REQUIRED_COURSE || courseSearch) {
    return (
      <div className="course-as-list">
        {dataSourceAsList.map((item) => (
          <CardAsList
            course={item}
            cardImage={item.courseImagePath}
            key={`${item.courseId}_${item.courseCategoryId}`}
            name={item.courseName}
            courseOverviewText={item.courseOverviewText}
            icons={item.lstTypeUnit}
            coursePrice={item.coursePrice || 0}
            progress={item.courseProgress}
            isPopupButton={isPopupButton}
            startTime={dateFormat(item.startTime, FULL_DATE)}
            endTime={dateFormat(item.endTime, FULL_DATE_TIME)}
            isNew={item.statusCourse}
            cantHidden={cantHidden}
            onHideCourse={onHideCourse}
            courseId={item.courseId}
            onNavigate={() => history.push({
              pathname: `/course/detail/${item.courseId}`,
              search: `?fromTab=${tab}`,
              state: { flagCount: true }
            })}
          />
        ))}
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="course-as-list"
          >
            {dataSourceAsList.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(providedDraggable) => (
                  <CardAsList
                    ref={providedDraggable.innerRef}
                    {...providedDraggable.draggableProps}
                    {...providedDraggable.dragHandleProps}
                    course={item}
                    cardImage={item.courseImagePath}
                    name={item.courseName}
                    courseOverviewText={item.courseOverviewText}
                    icons={item.lstTypeUnit}
                    coursePrice={item.coursePrice || 0}
                    progress={item.courseProgress}
                    isPopupButton={isPopupButton}
                    startTime={dateFormat(item.startTime, FULL_DATE)}
                    endTime={dateFormat(item.endTime, FULL_DATE_TIME)}
                    isNew={item.statusCourse}
                    cantHidden={cantHidden}
                    onHideCourse={onHideCourse}
                    courseId={item.courseId}
                    onNavigate={() => history.push({
                      pathname: `/course/detail/${item.courseId}`,
                      search: `?fromTab=${tab}`,
                      state: { flagCount: true }
                    })}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

CoursesAsList.propTypes = {
  tab: PropTypes.string,
  dataSource: PropTypes.array,
  isPopupButton: PropTypes.bool,
  cantHidden: PropTypes.bool,
  onHideCourse: PropTypes.func
}

export default CoursesAsList
