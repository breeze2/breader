import { ipcRenderer, openExternalUrl } from './electron'

export function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
    let timeoutID: number
    const wrapper = function (this: any, ...args: any[]) {
        if (!this && !args.length) {
            return
        }
        window.clearTimeout(timeoutID)
        timeoutID = window.setTimeout(() => fn.apply(this, args), delay)
    } as F
    return wrapper
}

export function throttle<F extends (...params: any[]) => void>(fn: F, delay: number) {
    let isThrottled: boolean
    let lastThis: any
    let lastArgs: any[]
    const wrapper = function (this: any, ...args: any[]) {
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

export function timeToDateString(time: number) {
    return new Date(time).toString().substring(4, 15);
}

export function timeToTimeString(time: number) {
    return new Date(time).toString().substring(16, 21);
}

const Utils = {
    debounce,
    throttle,

    ipcRenderer,
    openExternalUrl,
    timeToDateString,
    timeToTimeString,
}

export default Utils
