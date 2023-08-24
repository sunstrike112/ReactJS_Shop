import { emailValidator } from '@ss-fe-fw/shared/ui';
import { FormResource } from '../../../interfaces/form.interface';

export const personalInformationForm: FormResource = {
  items: [
    {
      key: 'firstName',
      required: true,
      label: 'First Name',
      colSpan: 2,
    },
    {
      key: 'lastName',
      required: true,
      label: 'Last Name',
      colSpan: 2,
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
      key: 'phoneNumber',
      required: true,
      label: 'Phone Number',
      colSpan: 4,
    },
    {
      key: 'addressLine1',
      required: true,
      label: 'Address',
      colSpan: 4,
    },
    {
      key: 'postCode',
      required: true,
      label: 'Postcode',
      colSpan: 2,
    },
    {
      key: 'suburb',
      required: true,
      label: 'Suburb',
      colSpan: 2,
    },
  ],
};
