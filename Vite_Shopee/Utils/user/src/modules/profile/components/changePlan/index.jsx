/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import { useTranslation } from 'react-i18next'

import { PassWrapper } from './styled'
import { TextPrimary, TextNormal, SubmitButton, PrimaryButton, SecondaryButton, Toast } from '../../../../components'
import { InputBox, InputItem, InputWrapper } from '../../styled'
import { useHistories, useProfile } from '../../../../hooks'
import useQuery from '../../../../hooks/useQuery'
import { generateToken } from '../../../../apis'
import ChangePlanModal from '../changePlanModal'

const { Option } = Select

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  return `${Math.round(bytes / 1024 ** i, 2)} ${sizes[i]}`
}

const ChangePlan = () => {
  const { t } = useTranslation()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [selectedDataPlan, setSelectedDataPlan] = useState(null)
  const query = useQuery()
  const history = useHistories()
  let [options, setOptions] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [descriptionText, setDescriptionText] = useState('')
  const [paymentData, setPaymentData] = useState('')
  const [okText, setOkText] = useState('')
  const [isError, setIsError] = useState(false)
  const [isChangePlanSuccess, setChangePlanIsSuccess] = useState(false)
  const [successContent, setsuccessContent] = useState('')

  const { profile, getPlan, plans, dataPlans, getDataPlan, getProfile } = useProfile()

  useEffect(async () => {
    await getPlan()
    await getDataPlan()
  }, [])

  useEffect(() => {
    if (profile && profile.isTrial) {
      return setSelectedPlan({
        id: 0,
        memory: '100GB',
        userUse: 0,
        name: t('profile.home.trial')
      })
    }
    return setSelectedPlan(profile.planPackage)
  }, [profile])

  useEffect(() => {
    options = []
    if (profile && profile.isTrial) {
      options.push({
        value: 0,
        label: t('profile.home.trial')
      })
    }

    plans?.forEach((plan) => {
      options.push({
        value: plan.id,
        label: plan.name
      })
    })
    setOptions(options)
  }, [plans, profile, dataPlans])
  useEffect(() => {
    if (selectedPlan?.id !== profile.planPackage?.id && selectedDataPlan?.id) {
      return setsuccessContent(t('profile.home.change_plan_and_add_data_success'))
    }

    if (selectedPlan?.id !== profile.planPackage?.id && !selectedDataPlan?.id) {
      return setsuccessContent(t('profile.home.change_plan_success'))
    }

    if (selectedPlan?.id === profile.planPackage?.id && selectedDataPlan?.id) {
      return setsuccessContent(t('profile.home.add_data_success'))
    }
    return setsuccessContent('')
  }, [selectedPlan, selectedDataPlan])
  useEffect(() => {
    setTimeout(() => {
      setChangePlanIsSuccess(false)
    }, 3000)
    if (isChangePlanSuccess) {
      getProfile({ userId: profile.userId })
    }
  }, [isChangePlanSuccess])

  const handleGetpaymentData = async (selectedPlanId = 0, selectedDataPlanId = 0) => {
    if ((!selectedPlanId && !selectedDataPlanId) || (selectedPlanId === profile.planPackage?.id && !selectedDataPlanId)) {
      return setPaymentData(null)
    }
    selectedPlanId = selectedPlanId === profile.planPackage?.id ? 0 : selectedPlanId
    const data = (await generateToken(selectedPlanId, selectedDataPlanId))
    if (data?.code === 200) {
      setIsError(false)
      return setPaymentData(data.data)
    }
    return false
  }
  const onSelect = async (value, type) => {
    if (type === 'plan') {
      let selected = {
        id: 0,
        memory: '100GB',
        userUse: 0,
        name: t('profile.home.trial')
      }
      if (value) {
        selected = plans.find((plan) => plan.id === value)
      }
      await handleGetpaymentData(selected?.id, selectedDataPlan?.id)
      setSelectedPlan(selected)
    } else {
      setSelectedDataPlan(dataPlans.find((plan) => plan.id === value))
      await handleGetpaymentData(selectedPlan?.id, value)
    }
  }

  const handleChangePlan = async () => {
    if (!selectedPlan?.id && !selectedDataPlan?.id) {
      setDescriptionText(t('profile.home.cantSelectTrialPlan'))
      setIsOpenModal(true)
      setOkText(t('common.tryAgain'))
      setIsError(true)
      return false
    }

    if (!selectedPlan?.id && selectedDataPlan?.id) {
      setDescriptionText(t('profile.home.changePlanBeforeBuyMorData'))
      setIsOpenModal(true)
      setOkText(t('common.tryAgain'))
      setIsError(true)
      return false
    }

    if (selectedPlan?.id && !selectedDataPlan?.id) {
      if (selectedPlan?.id === profile.planPackage?.id) {
        setDescriptionText(t('profile.home.cantSelectCurrentPlan'))
        setIsOpenModal(true)
        setOkText(t('common.tryAgain'))
        setIsError(true)
      } else {
        setIsOpenModal(true)
        setDescriptionText(t('profile.home.changePlanConfirm'))
        setOkText(t('common.payment'))
        setIsError(false)
      }
      return false
    }
    setIsOpenModal(true)
    setDescriptionText(t('profile.home.changePlanConfirm'))
    setOkText(t('common.payment'))
    setIsError(false)
    return false
  }

  const handleBackToProfile = () => {
    history.push('/profile')
  }

  const handleBackToChangePlan = () => {
    history.push('/profile/change-plan')
  }

  return (
    <PassWrapper className={(query.get('rst') && parseInt(query.get('rst'), 10) === 1) ? 'isSuccess' : ''}>
      {query.get('rst') ? (
        <>
          {parseInt(query.get('rst'), 10) === 1 && (
            <div className="successWrapper">
              <TextPrimary className="pass__header" fontSize="size_24" fontWeight="fw_600">
                {t('profile.home.change_plan_success')}
              </TextPrimary>
              <PrimaryButton
                onClick={handleBackToProfile}
                title={t('profile.home.backToProfile')}
              />
            </div>
          )}
          {parseInt(query.get('rst'), 10) === 0 && (
            <div className="successWrapper fail">
              <TextPrimary className="pass__header" fontSize="size_24" fontWeight="fw_600">
                {t('profile.home.change_plan_fail')}
              </TextPrimary>
              <SecondaryButton
                onClick={handleBackToChangePlan}
                title={t('common.tryAgain')}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <TextPrimary className="pass__header" fontSize="size_24" fontWeight="fw_600">
            {t('profile.menu.changePlan')}
          </TextPrimary>
          <InputWrapper>
            <TextPrimary fontSize="size_14" fontWeight="fw_600">
              {t('profile.plan.currentPlan')}
            </TextPrimary>
            <InputItem>
              <InputBox>
                <Select
                  name="plan"
                  className="plan-select"
                  value={selectedPlan?.id}
                  options={options}
                  onChange={(value) => onSelect(value, 'plan')}
                />
              </InputBox>
            </InputItem>
          </InputWrapper>
          {selectedPlan && (
            <>
              <InputWrapper>
                <TextPrimary fontSize="size_14" fontWeight="fw_600">
                  {t('profile.plan.userUsage')}
                </TextPrimary>
                <TextNormal fontSize="size_12" fontWeight="fw_600">
                  {t('profile.home.userUsage', { value: selectedPlan?.userUse })}
                </TextNormal>
              </InputWrapper>
              <InputWrapper>
                <TextPrimary fontSize="size_14" fontWeight="fw_600">
                  {t('profile.plan.dataUsage')}
                </TextPrimary>
                <TextNormal fontSize="size_12" fontWeight="fw_600">
                  {selectedPlan?.memory}
                </TextNormal>
              </InputWrapper>
              <InputWrapper>
                <TextPrimary fontSize="size_14" fontWeight="fw_600">
                  {t('profile.plan.price')}
                </TextPrimary>
                <TextNormal fontSize="size_12" fontWeight="fw_600">
                  {profile.isTrial ? t('profile.plan.free') : t('profile.home.price', { value: profile.planPackage?.price })}
                </TextNormal>
              </InputWrapper>
              <InputWrapper>
                <TextPrimary fontSize="size_14" fontWeight="fw_600">
                  {t('profile.plan.select_data')}
                </TextPrimary>
                <InputItem>
                  <InputBox>
                    <Select
                      name="dataPlan"
                      className="plan-select"
                      allowClear
                      value={selectedDataPlan?.id}
                      onChange={(value) => onSelect(value, 'data')}
                    >
                      {!!dataPlans && dataPlans.map((plan) => <Option value={plan.id} key={plan.id}>{`${bytesToSize(plan.memory)} - ${t('profile.home.price', { value: plan.price })}`}</Option>)}
                    </Select>
                  </InputBox>
                </InputItem>
              </InputWrapper>
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
            </>
          )}
          <SubmitButton onClick={handleChangePlan} title={t('profile.edit.change')} />
        </>
      )}
      <ChangePlanModal
        isModalVisible={isOpenModal}
        setIsModalVisible={setIsOpenModal}
        description={descriptionText}
        cancelText={t('common.no')}
        paymentData={paymentData}
        isError={isError}
        plan={selectedPlan}
        dataPlan={selectedDataPlan}
        profile={profile}
        okText={okText}
        setChangePlanIsSuccess={setChangePlanIsSuccess}
      />
      <Toast content={successContent} type="success" isShow={isChangePlanSuccess} />
    </PassWrapper>
  )
}

export default ChangePlan
