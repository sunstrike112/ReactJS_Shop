import { FormResource } from '../../../interfaces/form.interface'
import {
  emailValidator,
  suburbValidator,
  postcodeValidator,
  OGPostCodeWidget,
  OGSuburbWidget,
} from '@ss-fe-fw/shared/ui'
import * as _ from 'lodash'

export const organizationForm: FormResource = {
  items: [
    {
      key: 'name',
      required: true,
      label: 'Name',
      colSpan: 4
    },
    {
      key: 'contactPhoneNumber',
      required: true,
      label: 'Phone Number',
      colSpan: 4
    },
    {
      key: 'contactEmail',
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
      required: true,
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
    }
  ]
}

let _updateOrganizationForm = _.cloneDeep(organizationForm)

export const updateOrganizationForm = _updateOrganizationForm
