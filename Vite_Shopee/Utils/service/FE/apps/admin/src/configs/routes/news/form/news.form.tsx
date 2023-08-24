import { FormResource } from '../../../interfaces/form.interface'
import {
  requiredValidator,
  OGRelationsInput,
} from '@ss-fe-fw/shared/ui'

export const newsForm: FormResource = {
  items: [
    {
      key: 'title',
      required: true,
      label: 'Title',
      colSpan: 2
    },
    {
      key: 'author',
      required: true,
      label: 'Author',
      colSpan: 2,
      forwardRef: true,
      widget: (props) => (<OGRelationsInput {...props} />),
      initialValue: {
        input: null,
        urlSearch: '/users/search',
        idKey: 'id',
        fieldName: 'email'
      },
      widgetProps: {
        style: {
          width: '100%'
        }
      },
      rules: [
        {
          validator: async (rule, value, callback) => {
            return requiredValidator(value?.input, 'author')
          }
        }
      ]
    },
    {
      key: 'content',
      required: true,
      label: 'Content',
      widget: 'textarea',
      colSpan: 4
    },
    {
      key: 'published',
      required: true,
      label: 'Published',
      colSpan: 2,
      widget: 'switch',
      initialValue: true
    },
    {
      key: 'updatedAt',
      label: 'Updated At',
      widget: 'date-picker',
      colSpan: 2,
      widgetProps: {
        showTime: true,
        style: {
          width: '100%'
        }
      }
    }
  ]
}
