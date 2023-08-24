import { Action } from 'Themes/facit'
import React from 'react'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { getNumberOrder } from 'Utils'
import { TooltipButton } from 'Components'
import { DeleteButton } from 'Components/button'

export const COLUMNS = {
  ORDER: 'order',
  ACTIONS: 'actions'
}

const order = ({ pagination, rulesOrder = [] }) => [
  {
    title: 'No.',
    dataIndex: '',
    key: COLUMNS.ORDER,
    align: 'right',
    width: 80,
    render: (text, record, index) => (
      <div>{getNumberOrder(pagination, index)}</div>
    ),
    rules: rulesOrder
  }
]

const orderAction = ({
  t,
  pagination,
  getOrderByPag = true,
  onView,
  onEdit,
  onDelete,
  confirmDeleteText,
  verifyView = () => true,
  verifyEdit = () => true,
  verifyDelete = () => true,
  verifyDisabledView = () => false,
  verifyDisabledEdit = () => false,
  verifyDisabledDelete = () => false,
  rulesOrder = [],
  rulesAction = [],
  moreAction = [],
  language,
  width,
  textDelete
}) => [
  {
    title: 'No.',
    dataIndex: '',
    key: COLUMNS.ORDER,
    align: 'center',
    width: width?.no ? width?.no : language === 'jp' ? 20 : 80,
    render: (text, record, index) => (
      <div>{getOrderByPag ? getNumberOrder(pagination, index) : index + 1}</div>
    ),
    rules: rulesOrder
  },
  {
    title: t('common:action'),
    dataIndex: '',
    key: COLUMNS.ACTIONS,
    width: width?.action ? width?.action : language === 'jp' ? 60 : 150,
    align: 'center',
    render: (text, record) => {
      // FOR show button
      const isView = !!(verifyView(record) && onView)
      const isEdit = !!(verifyEdit(record) && onEdit)
      const isDelete = !!(verifyDelete(record) && onDelete)
      // FOR disabled button
      const disabledView = verifyDisabledView(record)
      const disabledEdit = verifyDisabledEdit(record)
      const disableDelete = verifyDisabledDelete(record)
      return (
        <Action>
          {isView && (
          <TooltipButton
            title={t('common:tooltip:view')}
            onClick={() => onView(record)}
            icon={EyeOutlined}
            disabled={disabledView}
          />
          )}
          {isEdit && (
          <TooltipButton
            title={t('common:tooltip:edit')}
            onClick={() => onEdit(record)}
            icon={EditOutlined}
            disabled={disabledEdit}
          />
          )}
          {/* Button delete is unique, because it have popup confirm */}
          {isDelete && (
          <DeleteButton
            popconfirmProps={{
              disabled: disableDelete,
              title: t(confirmDeleteText),
              cancelText: t('common:cancel'),
              okText: textDelete || t('common:delete'),
              onConfirm: () => onDelete(record)
            }}
            buttonProps={{
              disabled: disableDelete
            }}
          />
          )}
          {/* FOR more action */}
          {moreAction.length > 0 && moreAction.map(({
            title,
            icon,
            onClick,
            verifyShow = () => true,
            verifyDisable = () => false
          }) => {
            const isShow = !!(verifyShow(record) && onClick)
            const disabled = verifyDisable(record)
            return (
              isShow && (
              <TooltipButton
                key={title}
                title={t(title)}
                onClick={() => onClick(record)}
                icon={icon}
                disabled={disabled}
              />
              )
            )
          })}
        </Action>
      )
    },
    rules: rulesAction
  }
]

export const Column = {
  order,
  orderAction
}
