import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDailyReports } from '../../../../hooks'
import { ROUTES_NAME } from '../../../../constants'

const UnreadDailyReportWatcher = () => {
  const { pathname } = useLocation()
  const { getUnreadDailyReportAction, dailyReports: { isMarkingRead } } = useDailyReports()

  useEffect(() => {
    const isLocatedDailyReportDetail = pathname.includes(ROUTES_NAME.DAILY_REPORT_DETAIL)
    if (!isLocatedDailyReportDetail && !isMarkingRead) {
      getUnreadDailyReportAction()
    }
  }, [pathname, isMarkingRead])

  return null
}

export default UnreadDailyReportWatcher
