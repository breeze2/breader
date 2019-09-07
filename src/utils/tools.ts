export function debounce<F extends (...params: any[]) => void>(
  fn: F,
  delay: number
) {
  let timeoutID: number
  const wrapper = function(this: any, ...args: any[]) {
    if (!this && !args.length) {
      return
    }
    window.clearTimeout(timeoutID)
    timeoutID = window.setTimeout(() => fn.apply(this, args), delay)
  } as F
  return wrapper
}

export function throttle<F extends (...params: any[]) => void>(
  fn: F,
  delay: number
) {
  let isThrottled: boolean
  let lastThis: any
  let lastArgs: any[]
  const wrapper = function(this: any, ...args: any[]) {
    if (!this && !args.length) {
      return
    }
    if (isThrottled) {
      lastThis = this
      lastArgs = args
      return
    }
    isThrottled = true
    fn.apply(this, args)
    window.setTimeout(() => {
      isThrottled = false
      wrapper.apply(lastThis, lastArgs)
    }, delay)
  } as F
  return wrapper
}

export function sleep(sec: number) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000))
}

export async function asyncRedo<T = any>(
  todo: () => Promise<T>,
  until: (t: T) => boolean
) {
  let result = await todo()
  while (until(result)) {
    result = await todo()
  }
  return result
}
