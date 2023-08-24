import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Wrapper } from './styled'
import { TableNotification } from './components'

const NotifyManagement = () => {
  const { t } = useTranslation(['notification'])
  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  return (
    <Wrapper>
      <TableNotification t={t} rowSelected={rowSelected} setRowSelected={setRowSelected} />
    </Wrapper>
  )
}

export default NotifyManagement
