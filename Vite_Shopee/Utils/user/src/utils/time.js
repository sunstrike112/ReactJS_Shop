export const minuteToHour = (minute) => ({
  hour: Math.floor(minute / 60),
  minute: minute % 60
})
