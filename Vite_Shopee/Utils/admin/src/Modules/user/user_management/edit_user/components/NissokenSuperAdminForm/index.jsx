/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

import {
  FormInput,
  FormUploadImage,
  FormDatePicker,
  FormRadio,
  FormLabel
} from 'Components'
import { GENDER_OPTION } from 'Constants/user'
import { Divider, Right, Row } from '../../styled'

const NissokenSuperAdminForm = ({ t }) => (
  <>
    <Divider />
    <Row>
      <FormLabel title={t('register_user.login_id')} description="Required" />
      <Right>
        <FormInput name="loginId" />
      </Right>
    </Row>
    <Divider />
    <Row>
      <FormLabel title={t('register_user.postcode')} description="Required" />
      <Right>
        <FormInput name="postcode" />
      </Right>
    </Row>
    <Divider />
    <Row>
      <FormLabel title={t('register_user.province')} description="Required" />
      <Right>
        <FormInput name="province" />
      </Right>
    </Row>
    <Divider />
    <Row>
      <FormLabel title={t('register_user.address')} description="Required" />
      <Right>
        <FormInput name="address" />
      </Right>
    </Row>
    <Divider />
    <Row>
      <FormLabel title={t('register_user.phone')} description="Required" />
      <Right>
        <FormInput name="phone" />
      </Right>
    </Row>
    <Divider />
    <Row>
      <FormLabel title={t('register_user.mobile')} description="Required" />
      <Right>
        <FormInput name="mobile" />
      </Right>
    </Row>
    <Divider />
    <Row>
      <FormLabel title={t('register_user.note')} description="Required" />
      <Right>
        <FormInput name="note" />
      </Right>
    </Row>
    <Divider />
    <Row>
      <FormLabel title={t('register_user.gender')} description="Required" />
      <Right>
        <FormRadio t={t} name="gender" options={GENDER_OPTION} />
      </Right>
    </Row>
    <Divider />
    <Row>
      <FormLabel title={t('register_user.dob')} description="Required" />
      <Right>
        <FormDatePicker
          name="dob"
          useDate
        />
      </Right>
    </Row>
    <Divider />
    <Row>
      <FormLabel title={t('register_user.avatar')} description="Required" />
      <Right>
        <FormUploadImage t={t} name="avatarPath" />
      </Right>
    </Row>
  </>
)

export default NissokenSuperAdminForm
