export function isSupportTouch() {
    return "ontouchmove" in window
}
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