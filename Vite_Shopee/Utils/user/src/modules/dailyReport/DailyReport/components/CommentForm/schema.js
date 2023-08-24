import * as yup from 'yup'

export default () => yup.object().shape({
  content: yup
    .string()
    .trim()
    .required('talk_board.content_required')
    .max(4000, 'talk_board.content_max_length')
})
