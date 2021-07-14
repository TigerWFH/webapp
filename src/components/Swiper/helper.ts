export function addClass(dom: any, className: string) {
    const classList = dom.className
    if (classList.indexOf(className) <= -1) {
        dom.className = `${classList} ${className}`
    }
}
export function removeClass(dom: any, className: string) {
    const classList = dom.className
    if (classList.indexOf(className) > -1) {
        dom.className = classList.replace(className, "")
    }
}
export function isMobile() {
    return "ontouchmove" in window
}

export function isIOS() {
    return false
}