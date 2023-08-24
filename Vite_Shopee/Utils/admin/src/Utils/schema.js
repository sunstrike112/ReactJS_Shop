export const validateSpecialWord = (value) => {
  if (!value) return true

  const regxSpecialWord = /\[|\]/g
  return !regxSpecialWord.test(value)
}
