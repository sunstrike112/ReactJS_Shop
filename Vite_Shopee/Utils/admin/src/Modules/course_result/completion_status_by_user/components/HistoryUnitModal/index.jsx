/* eslint-disable react/prop-types */
import React, { memo, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Row } from 'antd'

import './index.css'
import { Modal, Text } from 'Components'
import { EyeOutlined } from '@ant-design/icons'
import { DEFAULT_PAG } from 'Utils'
import Table from '../../../component/TableSort'
import { ModalWrapper } from './styled'
import tableColumns from './column'

const DEFAULT_LIMIT = 20

const HistoryUnitModal = ({ onClose, visible, unitSelected }) => {
  const { t } = useTranslation(['courseResult'])

  const [pagination, setPagination] = useState({ page: DEFAULT_PAG.page, limit: DEFAULT_LIMIT, total: unitSelected.historyViewUnits?.length || 0 })

  const columns = useMemo(() => tableColumns({ t, pagination }), [t, pagination])

  const onChangePag = ({ current, pageSize }) => setPagination({ page: current, limit: pageSize })

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      title={t('viewingHistory')}
      isNotFooterButton
      destroyOnClose
      forceRender
      titleIcon={<EyeOutlined />}
    >
      <ModalWrapper>
        <Row justify="center" align="middle" className="modal-header" gutter={[4, 4]}>
          <div className="courseBox">
            <Text.primary className="title" fontSize="size_14">{t('course')}</Text.primary>
            <Text.primary className="value" fontSize="size_14">{unitSelected.courseName}</Text.primary>
          </div>
          <div className="unitBox">
            <Text.primary className="title" fontSize="size_14">{t('unit')}</Text.primary>
            <Text.primary className="value" fontSize="size_14">{unitSelected.unitName}</Text.primary>
          </div>
          <div className="unitBox">
            <Text.primary className="title" fontSize="size_14">{t('unit_setting:unitTypeName')}</Text.primary>
            <Text.primary className="value" fontSize="size_14">{t(`common:${unitSelected.unitType?.toLowerCase()}`)}</Text.primary>
          </div>
        </Row>
        <Table
          dataSource={unitSelected.historyViewUnits || []}
          columns={columns}
          rowKey={(record) => record.unitId}
          total={pagination.total}
          currentPage={pagination.page}
          pageSize={pagination.limit}
          onChange={onChangePag}
        />
      </ModalWrapper>
    </Modal>
  )
}

export default memo(HistoryUnitModal)
