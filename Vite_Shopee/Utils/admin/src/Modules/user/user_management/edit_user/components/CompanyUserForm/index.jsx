/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useGroupAttribute } from 'Hooks/user'

import {
  FormTreeSelect,
  FormLabel
} from 'Components'
import { Divider, Right, Row } from '../../styled'

const CompanyUserForm = ({ t }) => {
  const {
    attributes,
    groups,
    loadAttributesAction,
    loadGroupsAction
  } = useGroupAttribute()
  useEffect(() => {
    loadAttributesAction({
      params: {}
    })
    loadGroupsAction({
      params: {}
    })
  }, [])
  return (
    <>
      <Divider />
      <Row>
        <FormLabel
          title={t('register_user.group')}
          description="Optional"
        />
        <Right>
          <FormTreeSelect
            t={t}
            name="departmentIdList"
            valueKey="departmentId"
            labelKey="name"
            options={groups}
            wrapperProps={{
              colon: false
            }}
            multiple
            getParentValue
          />
        </Right>
      </Row>
      <Divider />
      <Row>
        <FormLabel
          title={t('register_user.attribute')}
          description="Optional"
        />
        <Right>
          <FormTreeSelect
            t={t}
            name="attributeIdList"
            valueKey="attributeId"
            labelKey="attributeName"
            options={attributes}
            wrapperProps={{
              colon: false
            }}
            multiple
          />
        </Right>
      </Row>
    </>
  )
}

export default CompanyUserForm
