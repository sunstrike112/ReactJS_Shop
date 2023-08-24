import { getAutocompleteCourse } from 'APIs'

const handleConvertToOptions = (v, valueKey, labelKey) => ({
  data: v,
  label: v[valueKey],
  value: v[labelKey]
})

const handleConvertToGroupOptions = (data, valueKey, labelKey, t) => Object.keys(data).map((key) => ({
  label: key === 'No category' ? t('filter.no_category') : key,
  options: data[key].map((v) => handleConvertToOptions(v, valueKey, labelKey))
}))

export const getCourseOptions = async (inputValue, t) => {
  const response = await getAutocompleteCourse({ courseName: inputValue })
  const courseGroupByCategoryObj = response.data.data
  const groupOptions = handleConvertToGroupOptions(courseGroupByCategoryObj, 'courseName', 'courseName', t)
  return groupOptions
}
