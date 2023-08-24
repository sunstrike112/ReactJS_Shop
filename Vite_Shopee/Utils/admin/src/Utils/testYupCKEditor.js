export function testYupCKEditor(value, max) {
  const dom = new DOMParser().parseFromString(value, 'text/html')
  return dom.body.textContent.length <= max
}

export function yupCKEditorErrorMessageMaxLength(t, key, max) {
  return t('error_message:validation.max_length', { key, max })
}
