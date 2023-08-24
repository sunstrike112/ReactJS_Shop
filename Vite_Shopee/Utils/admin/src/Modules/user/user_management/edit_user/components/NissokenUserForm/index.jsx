/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

import {
  FormInput,
  FormTreeSelect,
  FormUploadImage,
  FormDatePicker,
  FormRadio,
  FormLabel,
  FormTextArea,
  FormSelect
} from 'Components'
import { GENDER_OPTION } from 'Constants/user'
import { Divider, Right, Row } from '../../styled'

const NissokenUserForm = ({ t }) => (
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
      <FormLabel title={t('register_user.group')} description="Required" />
      <Right>
        <FormTreeSelect
          t={t}
          name="group"
          valueKey="groupId"
          labelKey="groupName"
          options={[]}
          multiple
        />
      </Right>
    </Row>
    <Divider />
    <Row>
      <FormLabel title={t('register_user.attribute')} description="Required" />
      <Right>
        <FormTreeSelect
          t={t}
          name="attribute"
          valueKey="attributeId"
          labelKey="attributeName"
          options={[]}
          multiple
        />
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
    <Divider />
    <Row>
      <FormLabel title={t('register_user.introduction')} description="Required" />
      <Right>
        <FormTextArea name="introduction" />
      </Right>
    </Row>
    <Divider />
    <Row>
      <FormLabel title={t('register_user.free_item')} description="Required" />
      <Right>
        <FormTextArea name="memo" />
      </Right>
    </Row>
    <Divider />
    <Row>
      <FormLabel title={t('register_user.company_name')} description="Required" />
      <Right>
        <FormSelect
          t={t}
          name="company"
          options={[]}
        />
      </Right>
    </Row>
  </>
)

export default NissokenUserForm
