/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, TBody, Tr } from 'Themes/facit'
import moment from 'moment'
import axios from 'axios'
import { Spin, notification } from 'antd'
import { FORMAT_TIME } from 'Constants/formatTime'

import { Image, Text, Modal, FormDatePicker, FormCheckbox } from 'Components'
import { useMyCompany, useSettingPasswordPlan } from 'Hooks'
import { getS3PresinedUrl, uploadAvatar } from 'APIs'
import { AVATAR_DEFAULT, CAMERA_ICON } from 'Assets'
import { useForm, FormProvider } from 'react-hook-form'
import { formatDate, getFileFromS3 } from 'Utils'
import { initMenuTextMapping, initTabTextMapping, USER_CLASSIFICATIONS } from 'Constants'
import { InfoWrapper, CompanyInfoHeader, SubmitButton, StyledAvatarWrapper, StyledWrapper, StyledTd, StyledTh } from './styled'
import EditCompanyForm from '../EditProfile'
import UpdatePushNotification from './UpdatePushNotification'

const size = 10
const CompanyInfo = ({
  company,
  isSuperAdmin,
  isWorkspaceAdmin,
  companyId,
  loadCompanyDetailAction,
  errorAPI
}) => {
  const { blockCompanyAction, isBlocking, isUpdateTrialTime, updateTrialTimeAction, isLoading } = useMyCompany()
  const { changeStatusPlanZZAction, isChangingStatus } = useSettingPasswordPlan()
  const { t } = useTranslation(['myCompany', 'setting_password_plan'])
  const [trans] = useTranslation(['error_message'])

  const form = useForm()
  const { handleSubmit, watch, clearErrors, setValue } = form
  const { trialEndDate: trialEndDateWatch } = watch()

  const inputFile = useRef(null)

  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [error, setError] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [visibleBlockModal, setIsVisibleBlockModal] = useState(false)
  const [isActiveUpdateTrialTime, setIsActiveUpdateTrialTime] = useState(false)

  useEffect(() => {
    setAvatar(getFileFromS3(company.imagePath))
  }, [company.imagePath])

  useEffect(() => {
    clearErrors()
  }, [t])

  const handleUploadAvatar = async (event) => {
    const file = event.target.files[0]
    if (file.size / 1024 > size * 1024) {
      return setError(trans('error_message:validation.max_file_size', {
        fileName: file.name,
        size: file.size / 1024
      }))
    }
    setError('')
    setIsUploadLoading(true)
    const fileList = [
      {
        fileName: event.target.files[0]?.name,
        fileType: event.target.files[0]?.type
      }
    ]
    const { data } = await getS3PresinedUrl({ fileList })
    const config = {
      headers: { 'content-type': event.target.files[0]?.type }
    }
    await axios.put(data[0].preSignedURL, event.target.files[0], config)

    const responseData = await uploadAvatar({ imagePath: getFileFromS3(data[0].url) })
    if (responseData.code === 200) {
      setIsUploadLoading(false)
      setAvatar(data[0].url)
      setError('')
    }
    return false
  }

  const handleBlockCompany = () => {
    blockCompanyAction({
      data: [companyId],
      params: {
        status: !company.isBlock
      },
      callback: () => setIsVisibleBlockModal(false)
    })
  }

  const onUpdateTrialTime = ({ trialEndDate }) => {
    const trialEndTimeUpdate = new Date(trialEndDate)
    const currentDate = new Date()
    if (moment(trialEndTimeUpdate).startOf('day').valueOf() < moment(currentDate).startOf('day').valueOf()) {
      notification.error({
        message: t('common:error'),
        description: t('validate.trial_end_date_past'),
        duration: 2
      })
    } else {
      updateTrialTimeAction({
        params: {
          companyId: +companyId,
          email: company.email,
          trialEndDate: trialEndTimeUpdate.getTime()
        },
        callback: {
          done: async () => {
            await loadCompanyDetailAction({ companyId })
            setIsActiveUpdateTrialTime(false)
          }
        }
      })
    }
  }

  const handleOnChangePlanZZ = () => {
    if (isChangingStatus || isLoading) return
    changeStatusPlanZZAction({
      companyId,
      callback: () => loadCompanyDetailAction({ companyId })
    })
  }

  const handleActiveUpdateTrialTime = () => {
    setIsActiveUpdateTrialTime(true)
    if (company?.trialEndDate) {
      setValue('trialEndDate', moment(company?.trialEndDate).format(FORMAT_TIME.YEAR_MONTH_DATE))
    } else {
      setValue('trialEndDate', moment(new Date().getTime()).format(FORMAT_TIME.YEAR_MONTH_DATE))
    }
  }
  const disabledTrialButton = useMemo(() => !(company?.memberType && company?.isTrial) || !company?.trialEndDate, [company?.memberType, company?.isTrial, company?.trialEndDate])

  const renderInitDisplay = () => (
    <div className="init__display">
      <p>{t('common:menu')}: {t(initMenuTextMapping[company?.initialDisplay?.menu])}</p>
      <p>{t('common:tab')}: {t(initTabTextMapping[company?.initialDisplay?.tab])}</p>
    </div>
  )

  const renderTrialEndDate = () => (
    <>
      {isActiveUpdateTrialTime ? (
        <FormDatePicker
          name="trialEndDate"
          format={FORMAT_TIME.YEAR_MONTH_DATE}
          placeholder={FORMAT_TIME.YEAR_MONTH_DATE}
          value={trialEndDateWatch ? moment(trialEndDateWatch) : null}
          allowClear={false}
        />
      ) : company?.trialEndDate ? (
        <span className="update__trial__date">
          {formatDate(moment.unix(company?.trialEndDate / 1000), FORMAT_TIME.YEAR_MONTH_DATE)}
        </span>
      ) : (
        ''
      )}
      <SubmitButton
        className="update__trial__btn"
        onClick={isActiveUpdateTrialTime
          ? handleSubmit(onUpdateTrialTime)
          : handleActiveUpdateTrialTime}
        disabled={disabledTrialButton}
        loading={isUpdateTrialTime}
      >
        {t(isActiveUpdateTrialTime ? 'common:save' : 'change')}
      </SubmitButton>
    </>
  )

  const renderSettingPlanZZ = () => (
    <FormCheckbox
      t={t}
      name="isPlanzz"
      onChange={handleOnChangePlanZZ}
      checked={company?.isPlanzz}
      text={t('common:apply')}
    />
  )

  const CompanyInfoRows = useMemo(() => [
    { name: t('companyInfo'), value: company?.companyName },
    { name: t('register_date'), value: formatDate(moment.unix(company?.registerDate / 1000), FORMAT_TIME.YEAR_MONTH_DATE) },
    { name: t('cancellation_date'), value: formatDate(company?.cancellationDate, FORMAT_TIME.YEAR_MONTH_DATE), hidden: !company?.isCancellation },
    { name: t('email'), value: company?.email, hidden: isWorkspaceAdmin },
    { name: t('common:company_code_v2'), value: company?.companyCode },
    { name: t('company_name'), value: company?.companyName },
    { name: t('company_code_seraku'), value: company?.companyCodeSeraku, hidden: company?.isWorkspace === 2 || !isSuperAdmin },
    { name: t('fugigana_company_name'), value: company?.companyFuriganaName, hidden: isWorkspaceAdmin },
    { name: t('manager_name'), value: company?.managerFullName, hidden: isWorkspaceAdmin },
    { name: t('fugigana_manager_name'), value: company?.managerFuriganaFullName, hidden: isWorkspaceAdmin },
    { name: t('career_name'), value: company?.career, hidden: isWorkspaceAdmin },
    { name: t('tel_phone'), value: company?.cellPhoneNumber, hidden: isWorkspaceAdmin },
    { name: t('number_employee'), value: company?.numberOfEmployee, hidden: isWorkspaceAdmin },
    { name: t('trial_end_date'), Component: renderTrialEndDate, hidden: !isSuperAdmin, className: 'update__trial' },
    { name: t('settingPasswordPlan:apply_plan_zz'), Component: renderSettingPlanZZ, hidden: !isSuperAdmin },
    { name: t('number_employee_position'),
      value: company?.listCareers
    && USER_CLASSIFICATIONS.map((item, index) => `${item.label}: ${company.listCareers[`classification${index + 1}`]}${index !== (USER_CLASSIFICATIONS.length - 1) ? ', ' : ''}`),
      hidden: !isSuperAdmin },
    { name: t('init_display'), Component: renderInitDisplay },
    { name: t('common:notice'), Component: UpdatePushNotification }
  ].map((m) => {
    const { hidden, name, value, Component, className } = m
    return !hidden
      ? (
        <Tr key={name}>
          <StyledTh isKeepPadding={isWorkspaceAdmin}>{name}</StyledTh>
          {Component
            ? <StyledTd isKeepPadding={isWorkspaceAdmin} className={className || ''}><Component /></StyledTd>
            : <StyledTd isKeepPadding={isWorkspaceAdmin} className={className || ''}>{value || ''}</StyledTd>}
        </Tr>
      ) : <></>
  }), [company, isEdit, t, isActiveUpdateTrialTime, trialEndDateWatch])

  return (
    <StyledWrapper>
      <InfoWrapper isWorkspaceAdmin={isWorkspaceAdmin}>
        <StyledAvatarWrapper isWorkspaceAdmin={isWorkspaceAdmin}>
          <div className="content">
            <div className="avatar">
              <Image src={getFileFromS3(avatar) || AVATAR_DEFAULT} />
              {!isSuperAdmin && (
              <button className={`avatar__upload ${isUploadLoading ? 'loading' : ''}`} onClick={() => { inputFile.current.click() }}>
                {isUploadLoading ? <Spin /> : <CAMERA_ICON />}
                <input
                  type="file"
                  id="file"
                  onChange={(event) => handleUploadAvatar(event)}
                  ref={inputFile}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
              </button>
              )}
            </div>
            <div className="description">
              {!(isSuperAdmin) && t('note_text_img')}
              {isSuperAdmin && (
              <SubmitButton
                className="button__submit"
                htmlType="button"
                title={t(company.isBlock ? 'unblock' : 'block')}
                onClick={() => setIsVisibleBlockModal(true)}
              />
              )}
            </div>
          </div>
          <Text.primary fontWeight="fw_400" fontSize="size_12" color="error">
            {error}
          </Text.primary>
        </StyledAvatarWrapper>
        <div className="info">
          <CompanyInfoHeader>
            {!isEdit && (
              <>
                <Table>
                  <TBody>
                    <FormProvider {...form}>
                      {CompanyInfoRows}
                    </FormProvider>
                  </TBody>
                </Table>
                {(!isSuperAdmin || !isWorkspaceAdmin) && (
                  <SubmitButton
                    className="button_submit"
                    htmlType="button"
                    title={t('editInfo')}
                    onClick={() => setIsEdit(!isEdit)}
                    disabled={errorAPI}
                  />
                )}
              </>
            )}
            {isEdit && (
            <EditCompanyForm
              setIsEdit={setIsEdit}
              company={company}
              companyId={companyId}
              isSuperAdmin={isSuperAdmin}
              isWorkspaceAdmin={isWorkspaceAdmin}
            />
            )}
          </CompanyInfoHeader>
        </div>

      </InfoWrapper>

      <Modal
        visible={visibleBlockModal}
        onSubmitText={t('common:yes')}
        onCancelText={t('common:cancel')}
        onSubmit={handleBlockCompany}
        onClose={() => setIsVisibleBlockModal(false)}
        type="error"
        loadingSubmit
        isLoadingSubmit={isBlocking}
      >
        <Text.primary
          fontWeight="fw_600"
          style={{ textAlign: 'center' }}
          fontSize="size_16"
        >
          {t(company.isBlock ? 'message.confirm_unblock_company' : 'message.confirm_block_company')}
        </Text.primary>
      </Modal>
    </StyledWrapper>
  )
}

export default CompanyInfo
