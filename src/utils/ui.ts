export function getClientHightForCalc() {
  if (process.platform === 'win32') {
    return '100vh - 30px'
  }
  return '100vh'
}

export function getModalTop(top: number) {
  if (process.platform === 'win32') {
    return top + 30
  }
  return top
}
