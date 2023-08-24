import * as yup from 'yup'

export const recordingSchema = yup.object().shape({
  videoName: yup.string().required('video_required_name').trim()
})
