export const debounce = (func, mc = 300) => {
    let timer
    return (...args) => {
        clearInterval(timer)

        timer = setTimeout(() => { func.apply(this, args) }, mc)
    }
}