/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/notification/send_email/store/saga'
import reducer from 'Modules/notification/send_email/store/reducer'
import {
  makeSelectSendEmail
} from 'Modules/notification/send_email/store/selectors'
import {
  loadAttributes,
  loadGroups,
  loadReceiverEmail,
  loadReceiverEmailSelected,
  sendEmail
} from 'Modules/notification/send_email/store/actions'
import { useInjectSaga, useInjectReducer } from 'Stores'

export const useReceiverEmail = () => {
  useInjectSaga({ key: 'sendEmail', saga })
  useInjectReducer({ key: 'sendEmail', reducer })

  const {
    groups: { isLoading: isLoadingGroups, data: groupOptions },
    attributes: { isLoading: isLoadingAttributes, data: attributesOptions },
    receiverEmail: { isLoading: isLoadingReceiverEmail, data: dataSourceReceiver, pagination, filter, sort }
  } = useSelector(makeSelectSendEmail())

  const dispatch = useDispatch()

  const loadGroupsAction = () => dispatch(loadGroups())
  const loadAttributesAction = (payload) => dispatch(loadAttributes(payload))
  const loadReceiverEmailAction = (payload) => dispatch(loadReceiverEmail(payload))

  return {
    isLoadingGroups,
    isLoadingAttributes,
    groupOptions,
    attributesOptions,
    isLoadingReceiverEmail,
    dataSourceReceiver,
    pagination,
    filter,
    sort,
    loadGroupsAction,
    loadAttributesAction,
    loadReceiverEmailAction
  }
}

export const useSendEmail = () => {
  useInjectSaga({ key: 'sendEmail', saga })
  useInjectReducer({ key: 'sendEmail', reducer })

  const {
    isLoading,
    receiverEmailSelected: { isLoading: isLoadingReceiverEmailSelected, data: listReceiverEmailSelected, pagination }
  } = useSelector(makeSelectSendEmail())

  const dispatch = useDispatch()

  const loadReceiverEmailSelectedAction = (payload) => dispatch(loadReceiverEmailSelected(payload))
  const sendEmailAction = (payload) => dispatch(sendEmail(payload))

  return {
    isLoading,
    pagination,
    isLoadingReceiverEmailSelected,
    listReceiverEmailSelected,
    loadReceiverEmailSelectedAction,
    sendEmailAction
  }
}
