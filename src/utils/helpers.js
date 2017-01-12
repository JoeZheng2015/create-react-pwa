export function createCounter(fn, interval) {
    const everyTime = (new Date().getMilliseconds()) % interval

    let handler = setTimeout(adjuster, interval)

    function adjuster() {
        const now = new Date()
        const wakeupTime = now.getMilliseconds()
        const nextTime = interval + everyTime - (wakeupTime % interval)

        fn()

        handler = setTimeout(adjuster, nextTime)
    }

    return function clearCounter() {
        clearTimeout(handler)
    }
}

export function second2minute(time) {
    const minute = ~~(time / 60)
    const second = time % 60

    return {
        minute,
        second,
    }
}

export function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n 
}
