export function convertToRawNumber(value) {
  return value.replace(/,/g, '')
}

export function formatNumber(value) {
  if (!value) return value

  value += ''
  const list = value.split('.')
  const prefix = list[0].charAt(0) === '-' ? '-' : ''
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ''
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
}

export const formatToCurrency = (number) => {
  const formater = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })
  const amount = formater.format(number).substr(1)
  return amount
}

export const getNumberOrder = (pagination, index) => (pagination.page - 1) * pagination.limit + (index + 1)
