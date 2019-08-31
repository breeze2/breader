export function timeToDateString(time: number) {
  return new Date(time).toDateString()
}

export function timeToTimeString(time: number) {
  return new Date(time).toTimeString().substring(0, 5)
}

export function timeToDateTimeString(time: number) {
  return new Date(time).toString().substring(0, 21)
}
