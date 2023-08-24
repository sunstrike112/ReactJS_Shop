export const getNumberOfTrack = (listTrack, imageName) => {
  const elementFollowTrack = listTrack.filter((f) => f.imageName === imageName)
  return elementFollowTrack.length + 1
}

export const getInitialColor = (element) => {
  switch (element) {
    case 'CLOSED':
      return '#4169FB'
    case 'ARROW_UP':
      return '#82FF8E'
    case 'CIRCLE':
      return '#1480FF'
    case 'SQUARE':
      return '#07CF84'
    case 'RED_CIRCLE':
      return '#F33A27'
    case 'RECTANGLE':
      return '#1C4EFF'
    case 'TRIANGLE':
      return '#1C4EFF'
    default:
      return ''
  }
}
