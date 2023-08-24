import moment from 'moment'

export const isActiveLesson = (lesson) => {
  const date = moment()
  if (!lesson.limitAttendPeriodStart && !lesson.limitAttendPeriodEnd) return true
  if (lesson.limitAttendPeriodStart && !lesson.limitAttendPeriodEnd && lesson.limitAttendPeriodStart <= moment(date).valueOf()) return true
  return moment(date).isBetween(moment(lesson.limitAttendPeriodStart).toDate(), moment(lesson.limitAttendPeriodEnd).toDate())
}
