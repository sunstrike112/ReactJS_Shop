import { FormResource } from '../../../interfaces/form.interface'
import {
  emailValidator,
  postcodeValidator,
  OGPostCodeWidget,
  OGSuburbWidget,
} from '@ss-fe-fw/shared/ui'
import { cloneDeep } from 'lodash';

export const customerForm: FormResource = {
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
      colSpan: 2
    },
    {
      key: 'email',
      required: true,
      label: 'Email',
      colSpan: 2,
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
      label: 'Address Line 1',
      colSpan: 4
    },
    {
      key: 'addressLine2',
      label: 'Address Line 2',
      colSpan: 4
    },
    {
      key: 'postCode',
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
      label: 'Suburb',
      colSpan: 2,
      forwardRef: true,
      widget: (props) => (<OGSuburbWidget {...props} />),
      initialValue: { input: null, postCode: null },
      dependField: 'postCode'
    },
    {
      key: 'companyName',
      label: 'Company Name',
      colSpan: 2
    },
    {
      key: 'nrma',
      label: 'NRMA Member No.',
      colSpan: 2
    },
  ]
}

let _updateCustomerForm = cloneDeep(customerForm)

export const updateCustomerForm = _updateCustomerForm
