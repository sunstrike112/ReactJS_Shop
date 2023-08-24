/* eslint-disable react/prop-types */
import React from 'react'
import { Modal as ModalAntd } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { OutlineButton, PrimaryButton, TextNormal } from '../../../../components'
import PaymentInfo from './paymentInfo'
import { changePlan } from '../../../../apis'

const ModalWrapper = styled(ModalAntd)`
  .footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }
`

const ChangePlanModal = ({
  isModalVisible,
  setIsModalVisible,
  onOk,
  description = '',
  title,
  okText = '',
  cancelText = '',
  onCancel,
  isCancel = true,
  setIsCancel,
  isError = false,
  paymentData = null,
  plan = null,
  dataPlan = null,
  profile = null,
  setChangePlanIsSuccess,
  ...rest
}) => {
  const { t } = useTranslation()
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    if (setIsCancel) {
      setIsCancel(true)
    }
    if (onOk) {
      onOk()
    }
  }

  const changePlanAction = async () => {
    if (!profile.isTrial) {
      const planIds = []
      if (plan) {
        planIds.push(plan.id)
      }

      if (dataPlan) {
        planIds.push(dataPlan.id)
      }

      const data = await changePlan(planIds)
      setChangePlanIsSuccess(data.code === 200)
      setIsModalVisible(false)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    if (setIsCancel) {
      setIsCancel(true)
    }
    if (onCancel) {
      onCancel()
    }
  }
  const footer = () => {
    if (isCancel) {
      return (
        <div className="footer">
          <OutlineButton
            onClick={handleCancel}
            title={cancelText || t('common.cancel')}
            key="cancel"
          />
          {isError ? (
            <PrimaryButton
              onClick={handleOk}
              title={okText || t('common.submit')}
              key="ok"
            />
          ) : (
            <>
              {!profile.isTrial ? (
                <PrimaryButton
                  onClick={() => changePlanAction()}
                  title={okText || t('common.payment')}
                  key="ok"
                />
              ) : (
                <PrimaryButton
                  form="payment-form"
                  htmlType="submit"
                  title={okText || t('common.payment')}
                  key="ok"
                />
              )}
            </>
          )}
        </div>
      )
    }
    return (
      <div className="footer">
        {isError ? (
          <PrimaryButton
            onClick={handleOk}
            title={okText || t('common.submit')}
            key="ok"
          />
        ) : (
          <>
            {!profile.isTrial ? (
              <PrimaryButton
                onClick={() => changePlanAction()}
                title={okText || t('common.payment')}
                key="ok"
              />
            ) : (
              <PrimaryButton
                form="payment-form"
                htmlType="submit"
                title={okText || t('common.payment')}
                key="ok"
              />
            )}
          </>
        )}
      </div>
    )
  }
  return (
    <ModalWrapper
      centered
      closable={false}
      showModal={showModal}
      visible={isModalVisible}
      onCancel={isCancel ? handleCancel : null}
      footer={footer()}
      {...rest}
    >
      {title
        && (
          <TextNormal
            className="header"
            color="primary"
            fontWeight="fw_600"
            fontSize="size_18"
          >
            {t('examination.confirm_popup_title')}
          </TextNormal>
        )}
      <TextNormal color="black" fontSize="size_18">
        {description}
      </TextNormal>
      {!isError && (
        <PaymentInfo
          selectedPlan={plan}
          paymentData={paymentData}
          dataPlan={dataPlan}
          profile={profile}
        />
      )}
      {!isError && profile.isTrial && (
        <form id="payment-form" action="https://credit.j-payment.co.jp/link/creditcard" method="POST">
          <input className="店舗ID" type="HIDDEN" name="aid" value="121896" />
          <input type="HIDDEN" name="pt" value="1" />
          <input className="AMOUNT" type="HIDDEN" name="am" value="0" />
          <input className="SHIPPING FEE" type="HIDDEN" name="sf" value="0" />
          <input className="TAX" type="HIDDEN" name="tx" value="0" />
          <input className="JOB" type="HIDDEN" name="jb" value="CAPTURE" />
          <input className="自動課金周期" type="HIDDEN" name="actp" value="4" />
          <input className="自動課金金額" type="HIDDEN" name="acam" value={paymentData?.amount || 1000} />
          <input className="商品名" type="HIDDEN" name="inm" value={plan?.name} />
          <input className="商品番号" type="HIDDEN" name="iid2" value={paymentData?.uid || new Date().getTime()} />
          <input className="課金日指定" type="HIDDEN" name="ac1" value="1" />
          <input type="hidden" value={paymentData?.token || ''} name="others" />
        </form>
      )}
    </ModalWrapper>
  )
}
export default ChangePlanModal
