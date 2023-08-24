/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Table } from 'antd'
import { Modal } from 'Components'
import { ModalWrapper } from './styled'
import { columns, dataGuider } from './constant'

const GuiderModal = ({
  visible,
  onClose
}) => {
  const { t } = useTranslation(['user', 'common'])
  const column = useMemo(
    () => columns({ t }).filter((item) => !!item),
    [t]
  )

  return (
    <Modal
      visible={visible}
      destroyOnClose
      forceRender
      overflow="visible"
      titleIcon={false}
      cancel={false}
      onSubmit={onClose}
      onClose={onClose}
      onSubmitText={t('common:OK')}
      title={t('batch_register_user.import_csv_intro')}
    >
      <ModalWrapper>
        <Table
          rowKey={(record) => record.title}
          dataSource={dataGuider}
          columns={column}
          pagination={false}
        />
      </ModalWrapper>
    </Modal>
  )
}

export default GuiderModal
