import { useEffect } from 'react'
import { BOOKMARK_COURSE_DISPLAY_TYPE } from '../../constants'
import { useCourseStudying, useGetQuery, useProfile } from '../../hooks'

const BookmarkCourseDisplayTypeWatcher = () => {
  const { userRole, authenticated } = useProfile()
  const { updateDisplayTypeAction, displayType } = useCourseStudying({ userRole })
  const { workspaceid } = useGetQuery()

  useEffect(() => {
    if (!authenticated && displayType !== BOOKMARK_COURSE_DISPLAY_TYPE.DEFAULT) {
      updateDisplayTypeAction({ displayType: BOOKMARK_COURSE_DISPLAY_TYPE.DEFAULT })
    }
  }, [authenticated])

  useEffect(() => {
    if (displayType !== BOOKMARK_COURSE_DISPLAY_TYPE.DEFAULT) {
      updateDisplayTypeAction({ displayType: BOOKMARK_COURSE_DISPLAY_TYPE.DEFAULT })
    }
  }, [workspaceid])

  return null
}

export default BookmarkCourseDisplayTypeWatcher
