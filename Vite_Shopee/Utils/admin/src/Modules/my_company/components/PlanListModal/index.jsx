/* eslint-disable react/prop-types */
import React from 'react'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { formatToCurrency } from 'Utils/number'

import './index.css'
import { Modal, Text } from 'Components'
import { ModalWrapper, PlanBox, PlanWrapper } from './styled'
import { SubmitButton } from '../../styled'

const PlanListModal = ({
  onClose,
  visible,
  errors,
  plans,
  handleSelectPlan,
  company
}) => {
  const { t } = useTranslation(['myCompany'])

  const renderPlan = ({ id, name, userUse, price }) => {
    const disableButtonSelectPlan = (company?.nextPlanPackageDto?.id === id || company?.isCancellation) && !company?.isPlanzz
    return (
      <PlanBox key={id}>
        <div className="planBox">
          <div>
            <Text.primary className="title" fontSize="size_16">{`${t('planName')}: `}
              <span>{name}</span>
            </Text.primary>
            <Text.primary className="title" fontSize="size_16">
              {`${t('planInfo.userUsageInfo')}: `}
              <span>{t('planInfo.userUsage', { value: userUse })}</span>
            </Text.primary>
            <Text.primary className="title" fontSize="size_16">
              {`${t('priceInfo')}: `}
              <span>{t('price', { value: formatToCurrency(price) })}</span>
            </Text.primary>
          </div>
          <SubmitButton
            className="button__submit"
            htmlType="button"
            title={t('select')}
            disabled={disableButtonSelectPlan}
            onClick={() => handleSelectPlan(id)}
          />
        </div>
      </PlanBox>
    )
  }

  return (
    <Modal
      visible={visible}
      onCancel={() => onClose(false)}
      title={t('planList')}
      disabledSubmit={!isEmpty(errors)}
      isNotFooterButton
      destroyOnClose
      forceRender
      titleIcon={false}
    >
      <ModalWrapper>
        <PlanWrapper>
          {plans && plans.filter((plan) => plan.id).map((plan) => renderPlan(plan))}
        </PlanWrapper>
      </ModalWrapper>
    </Modal>
  )
}

export default PlanListModal
