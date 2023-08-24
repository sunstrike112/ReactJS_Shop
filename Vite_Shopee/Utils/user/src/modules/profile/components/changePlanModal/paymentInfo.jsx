/* eslint-disable react/prop-types */
import React from 'react'
import { useTranslation } from 'react-i18next'

import { PassWrapper } from './styled'
import { TextPrimary, TextNormal } from '../../../../components'
import { InputWrapper } from '../../styled'

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  return `${Math.round(bytes / 1024 ** i, 2)} ${sizes[i]}`
}

const PaymentInfo = ({
  selectedPlan = null,
  paymentData = null,
  dataPlan = null,
  profile = null
}) => {
  const { t } = useTranslation()

  return (
    <PassWrapper>
      {(profile.planPackage?.id !== selectedPlan.id) && (
        <>
          <InputWrapper>
            <TextPrimary fontSize="size_14" fontWeight="fw_600">
              {t('profile.plan.currentPlan')}
            </TextPrimary>
            <TextNormal fontSize="size_14" fontWeight="fw_600">
              {selectedPlan?.name}
            </TextNormal>
          </InputWrapper>
          <InputWrapper>
            <TextPrimary fontSize="size_14" fontWeight="fw_600">
              {t('profile.plan.userUsage')}
            </TextPrimary>
            <TextNormal fontSize="size_14" fontWeight="fw_600">
              {t('profile.home.userUsage', { value: selectedPlan?.userUse })}
            </TextNormal>
          </InputWrapper>
          <InputWrapper>
            <TextPrimary fontSize="size_14" fontWeight="fw_600">
              {t('profile.plan.dataUsage')}
            </TextPrimary>
            <TextNormal fontSize="size_14" fontWeight="fw_600">
              {selectedPlan?.memory}
            </TextNormal>
          </InputWrapper>
          <InputWrapper>
            <TextPrimary fontSize="size_14" fontWeight="fw_600">
              {t('profile.plan.price')}
            </TextPrimary>
            <TextNormal fontSize="size_14" fontWeight="fw_600">
              {t('profile.home.price', { value: selectedPlan?.price })}
            </TextNormal>
          </InputWrapper>
        </>
      )}
      {!!dataPlan && (
        <InputWrapper>
          <TextPrimary fontSize="size_14" fontWeight="fw_600">
            {t('profile.plan.data')}
          </TextPrimary>
          <TextNormal fontSize="size_14" fontWeight="fw_600">
            {`${bytesToSize(dataPlan.memory)} - ${t('profile.home.price', { value: dataPlan.price })}`}
          </TextNormal>
        </InputWrapper>
      )}
      {
        !!paymentData && (
          <InputWrapper>
            <TextPrimary fontSize="size_14" fontWeight="fw_600">
              {t('profile.plan.amount')}
            </TextPrimary>
            <TextNormal fontSize="size_12" fontWeight="fw_600">
              {paymentData && t('profile.home.price', { value: paymentData?.amount })}
            </TextNormal>
          </InputWrapper>
        )
      }
    </PassWrapper>
  )
}

export default PaymentInfo
