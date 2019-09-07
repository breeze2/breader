export function getClientHightForCalc() {
  if (process.platform === 'win32') {
    return '100vh - 30px'
  }
  return '100vh'
}
