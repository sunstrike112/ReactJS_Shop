import { FormResource } from '../../../interfaces/form.interface'
import {
  emailValidator,
  suburbValidator,
  postcodeValidator,
  requiredValidator,
  OGEnumInput,
  OGPostCodeWidget,
  OGSuburbWidget,
  OGRelationsInput,
} from '@ss-fe-fw/shared/ui'
import * as _ from 'lodash'

export const userForm: FormResource = {
  items: [
    {
      key: 'firstName',
      required: true,
      label: 'First Name',
      colSpan: 2
    },
    {
      key: 'lastName',
      required: true,
      label: 'Last Name',
      colSpan: 2
    },
    {
      key: 'phoneNumber',
      label: 'Mobile Number',
      colSpan: 4
    },
    {
      key: 'email',
      required: true,
      label: 'Email',
      colSpan: 4,
      rules: [
        {
          validator: async (rule, value, callback) => {
            return emailValidator(value)
          }
        }
      ]
    },
    {
      key: 'addressLine1',
      label: 'Address',
      colSpan: 4
    },
    {
      key: 'postCode',
      required: true,
      label: 'Postcode',
      colSpan: 2,
      forwardRef: true,
      widget: (props) => (<OGPostCodeWidget {...props} style={{ width: '100%' }} />),
      widgetProps: {
        style: {
          width: '100%'
        }
      },
      rules: [
        {
          validator: async (rule, value, callback) => {
            return postcodeValidator(value)
          }
        }
      ]
    },
    {
      key: 'suburb',
      required: true,
      label: 'Suburb',
      colSpan: 2,
      forwardRef: true,
      widget: (props) => (<OGSuburbWidget {...props} />),
      initialValue: { input: null, postCode: null },
      dependField: 'postCode',
      rules: [
        {
          validator: async (rule, value, callback) => {
            return suburbValidator(value?.input)
          }
        }
      ]
    },
    {
      key: 'organizations',
      required: true,
      label: 'Stores',
      colSpan: 4,
      forwardRef: true,
      can: 'Organization',
      widget: (props) => (<OGRelationsInput {...props} mode="multiple" />),
      initialValue: {
        input: null,
        urlSearch: '/organizations/search',
        idKey: 'id',
        fieldName: 'name'
      },
      widgetProps: {
        style: {
          width: '100%'
        }
      },
      rules: [
        {
          validator: async (rule, value, callback) => {
            return requiredValidator(value?.input, 'organizations')
          }
        }
      ]
    },
  ]
}

let _updateUserForm = _.cloneDeep(userForm)
const updateUserFormItems = _updateUserForm.items.map((item) => {
  if (item.key === 'email') item.disabled = true
  return item
})
_updateUserForm = {..._updateUserForm, items: updateUserFormItems}

export const updateUserForm = _updateUserForm
