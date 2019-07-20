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

export async function batchOperate<A>(action: ((args: A) => Promise<boolean>), argsList: A[]) {
    const num = 6
    const len = argsList.length
    let tasks: Array<Promise<boolean>> = []
    let changes = 0
    for (let i = 0; i < len; i++) {
        tasks.push(action(argsList[i]))
        if (tasks.length === num) {
            const list = await Promise.all(tasks)
            list.forEach(el => (changes += el ? 1 : 0))
            tasks = []
        }
    }
    if (tasks.length) {
        const list = await Promise.all(tasks)
        list.forEach(el => (changes += el ? 1 : 0))
        tasks = []
    }
    return changes
}

export function timeToDateString(time: number) {
    return new Date(time).toDateString();
}

export function timeToTimeString(time: number) {
    return new Date(time).toTimeString().substring(0, 5);
}

export function timeToDateTimeString(time: number) {
    return new Date(time).toString().substring(0, 21);
}

export function sleep(sec: number) {
    return new Promise(resolve => setTimeout(resolve, sec * 1000))
}

const Utils = {
    debounce,
    throttle,

    batchOperate,
    sleep,
    timeToDateString,
    timeToDateTimeString,
    timeToTimeString,
}

export default Utils
