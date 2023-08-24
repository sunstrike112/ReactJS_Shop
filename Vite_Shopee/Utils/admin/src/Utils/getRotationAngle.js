export function getRotationAngle(target) {
  const obj = window.getComputedStyle(target, null)
  const matrix = obj.getPropertyValue('-webkit-transform')
        || obj.getPropertyValue('-moz-transform')
        || obj.getPropertyValue('-ms-transform')
        || obj.getPropertyValue('-o-transform')
        || obj.getPropertyValue('transform')

  let angle = 0
  if (matrix !== 'none') {
    const values = matrix.split('(')[1].split(')')[0].split(',')
    const a = Number(values[0])
    const b = Number(values[1])
    angle = Math.round(Math.atan2(b, a) * (180 / Math.PI))
  }
  const updateAngle = (angle < 0) ? angle += 360 : angle
  return updateAngle
}

export function getRotation(angle) {
  const updateAngle = angle % 360
  return (updateAngle < 0) ? updateAngle + 360 : updateAngle
}
