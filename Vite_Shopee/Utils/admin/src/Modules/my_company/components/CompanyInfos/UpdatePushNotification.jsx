import { Checkbox, Space, Spin } from 'antd'
import { useMyCompany, useQuery, useRoles } from 'Hooks'
import React, { memo } from 'react'
import { mappingBooleanWithNumber } from 'Utils'

const UpdatePushNotification = () => {
  const { updateCompanyPushNotificationAction, updatePushNotification, companyInfo, companyDetail } = useMyCompany()
  const { isSuperAdmin } = useRoles()
  const query = useQuery()
  const companyId = query.get('companyId')

  const isPushNotification = isSuperAdmin ? companyDetail.isPushNotification : companyInfo.isPushNotification

  const handleUpdate = (event) => {
    if (updatePushNotification.isLoading) return
    const { checked } = event.target
    updateCompanyPushNotificationAction({
      params: { isPushNotification: mappingBooleanWithNumber(checked) },
      headers: companyId ? { workspaceid: companyId } : {},
      isSuperAdmin,
      companyId
    })
  }
  return (
    <Space>
      <Spin spinning={updatePushNotification.isLoading}>
        <Checkbox
          checked={mappingBooleanWithNumber(isPushNotification)}
          onClick={handleUpdate}
        />
      </Spin>
    </Space>
  )
}
export default memo(UpdatePushNotification)
