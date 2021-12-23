import * as React from "react"
import styles from "./index.module.scss"
import {
    isSupportTouch,
    removeClass,
    addClass
} from "./helper"

const DEFAULT_FRAME_HEIGHT = 120
const DEFAULT_DELAY_TIME = 3000
// const MAP_ZOOM_FACTOR = new Map([
//     [0, "500px"],
//     [1, "1000px"],
//     [2, "2000px"],
//     [3, "5000px"],
//     [4, "8000px"]
// ])
interface IProps {
    className?: string
    children?: React.ReactNode
    frameHeight?: number // 一屏高度
    scrollThreshold?: number // 判断滑动阈值
    autoPlay?: boolean
    dotType?: string | undefined // 导航点展示类型，["bottom", "cover"]
}
interface IState {
    angle: number
    width: number
    order: number
}
const dotMap = new Map([
    ["bottom", styles.bottom],
    ["cover", styles.cover],
])
class Carousel extends React.Component<IProps, IState> {
    carouselRef: any = React.createRef()
    containerRef: any = React.createRef()
    events: { [propertyName: string]: any }
    position: { [propertyName: string]: number }
    direction: string | undefined = undefined // 滑动方向, 取值[undefined, top, right, bottom, left]
    offset: { [propertyName: string]: number }
    timer: any = null
    constructor(props: IProps) {
        super(props)
        document.addEventListener("visibilitychange", this.onVisibile)
        this.state = {
            angle: 0,
            order: 0,
            width: this.computeZ()
        }
        this.position = {
            x: 0,
            y: 0
        }
        this.offset = {
            x: 0,
            y: 0
        }
        this.events = {
            onTouchStart: this.start,
            onTouchMove: this.move,
            onTouchEnd: this.end
        }
        if (!isSupportTouch()) {
            this.events = {
                onMouseDown: this.start,
                onMouseMove: this.move,
                onMouseUp: this.end
            }
        }
    }
    computeZ = () => {
        let containerWidth = window.innerWidth || (document.documentElement && document.documentElement.clientWidth)
        if (Boolean(this.containerRef.current)) {
            containerWidth = this.containerRef.current.clientWidth || window.innerWidth || (document.documentElement && document.documentElement.clientWidth)
        }
        const length = React.Children.count(this.props.children)
        const width = (containerWidth && containerWidth / (2 * Math.tan(Math.PI / length))) || 0// 计算移动的Z距离
        
        return width
    }
    onVisibile = () => {
        // 解决mac上挂起状态，JS一直在计算但是UI没有渲染问题；还有移动端应用挂起场景
        if (document.visibilityState === "visible") {
            if (window.location.hash.indexOf("demos") > -1) {
                this.startAutoPlay()
            }
        } else if (document.visibilityState === "hidden") {
            this.endAutoPlay()
        }
    }
    start = (e: any) => {
        const { children } = this.props
        const length = React.Children.count(children)
        if (length <= 1) {
            return
        }
        this.endAutoPlay()
        removeClass(this.containerRef.current, styles.animation)
        if (isSupportTouch()) {
            this.position.x = e.touches[0].clientX
            this.position.y = e.touches[0].clientY
        }
        else {
            this.position.x = e.clientX
            this.position.y = e.clientY
        }
    }
    // 计算移动方向
    computeDirection = (x: number, y: number) => {
        if (x === 0 && y === 0) {
            this.direction = undefined
            return undefined
        }
        const { scrollThreshold = 44 } = this.props
        const dx = x - this.position.x
        const dy = y - this.position.y
        this.offset.x = Math.abs(dx)
        this.offset.y = Math.abs(dy)
        const angle = Math.atan2(dy, dx) * 180 / Math.PI
        if (this.offset.x > scrollThreshold) {
            if (-45 < angle && angle < 45) {
                if (dx > scrollThreshold) {
                    this.direction = "right"
                }
            } else if (angle > 135 || angle < -135) {
                this.direction = "left"
            }
        }
        if (this.offset.y > scrollThreshold) {
            if (45 < angle && angle < 135) {
                this.direction = "down"
            } else if (-135 < angle && angle < -45) {
                this.direction = "up"
            }
        }

        return
    }
    computeOrder = (order: number) => {
        const { children } = this.props
        const length = React.Children.count(children)
        if (length <= 0) {
            return 0
        }

        const result = order % length
        if (result < 0) {
            return result + length
        }

        return result
    }
    move = (e: any) => {
        const { 
            children,
            frameHeight = DEFAULT_FRAME_HEIGHT
         } = this.props
        const length = React.Children.count(children)
        if (length <= 1) {
            return
        }
        /*
            e.touches：列出所有当前在与触摸表面接触的  Touch 对象，不管触摸点是否已经改变或其目标元素是在处于 touchstart 阶段
            e.changedTouches：包含了代表所有从上一次触摸事件到此次事件过程中，状态发生了改变的触点的 Touch 对象
        */
        if (!Boolean(this.position.x)) {
            return
        }
        let x = 0
        let y = 0
        if (isSupportTouch()) {
            const { changedTouches = [] } = e
            if (changedTouches.length === 1) {// 处理单指操作
                x = changedTouches[0].clientX
                y = changedTouches[0].clientY
            }
        }
        else {
            x = e.clientX
            y = e.clientY
        }
        this.computeDirection(x, y)
        const metaangle = 360 / length
        const {
            width,
            angle
        } = this.state
        const dangle = this.offset.x / (window.innerWidth || (document.documentElement && document.documentElement.clientWidth) || 0) * metaangle
        if (this.direction === "left") {
            this.containerRef.current.style.transform = `translateZ(${-width}px) rotateY(${angle - dangle}deg)`
        } else if (this.direction === "right") {
            this.containerRef.current.style.transform = `translateZ(${-width}px) rotateY(${angle + dangle}deg)`
        }
        else if (this.direction === "down") {
            const dz = this.offset.y / frameHeight * 10000
            console.log("this.direction=======>", this.direction, dz, this.offset.y, frameHeight)
            this.containerRef.current.style.transform = `translateZ(${-dz}px)`
        }
    }
    end = (e: any) => {
        const { children } = this.props
        const length = React.Children.count(children)
        if (length <= 1) {
            return
        }
        const angle = 360 / length
        this.startAutoPlay()
        addClass(this.containerRef.current, styles.animation)
        switch (this.direction) {
            case "left": {
                this.setState((state: IState) => {
                    return {
                        angle: state.angle - angle,
                        order: (state.order + 1) % length
                    }
                })
                return
            }
            case "right": {
                this.setState((state: IState) => {
                    return {
                        angle: state.angle + angle,
                        order: (state.order - 1) % length
                    }
                })
                return
            }
            case "top": {
                return
            }
            case "down": {
                const { 
                    width,
                    angle
                 } = this.state
                this.containerRef.current.style.transform = `translateZ(${-width}px) rotateY(${angle}deg)`
                return
            }
            default:
                console.log("touch end")
        }
    }
    startAutoPlay = () => {
        const {
            children,
            autoPlay
        } = this.props
        const length = React.Children.count(children)
        if (length <= 1) {
            return
        }
        if (autoPlay) {
            const metaangle = 360 / length
            this.endAutoPlay()
            const that = this
            this.timer = setInterval(() => {
                that.setState((state: IState) => {
                    return {
                        angle: state.angle - metaangle,
                        order: (state.order + 1) % length
                    }
                })
            }, DEFAULT_DELAY_TIME)
        }

    }
    endAutoPlay = () => {
        const {
            autoPlay
        } = this.props
        if (autoPlay && this.timer !== null) {
            clearInterval(this.timer)
            this.timer = null
        }
    }
    renderChildren = (data: any[], width: number) => {
        const angle = 360 / data.length

        return data.map((metadata: React.ReactElement, index: number) => {
            const cellStyle = {
                transform: `rotateY(${index * angle}deg) translateZ(${width}px)`
            }
            return (
                <div className={styles.cell}
                    key={`${index}-${metadata.key}`}
                    style={cellStyle}>
                    {
                        metadata
                    }
                </div>
            )
        })
    }
    renderDot = () => {
        const {
            children,
            dotType = ""
        } = this.props
        const childList = React.Children.toArray(children)
        if (!Boolean(dotType) || childList.length <= 1) {
            return null
        }
        const {
            order
        } = this.state
        const result = this.computeOrder(order)
        return (
            <div className={dotMap.get(dotType)}>
                {
                    childList.map((metadata: any, index: number) => {
                        return (
                            <span className={`${styles.dot} ${result === index ? styles.active : ""}`}
                                key={index}
                            />
                        )
                    })
                }
            </div>
        )
    }
    componentDidMount() {
        if (Boolean(this.containerRef.current)) {
            this.setState({
                width: this.computeZ()
            })
        }
        this.startAutoPlay()
    }
    componentWillUnmount() {
        this.endAutoPlay()
        document.removeEventListener("visibilitychange", this.onVisibile)
    }
    render() {
        const {
            children,
            frameHeight = DEFAULT_FRAME_HEIGHT,
            className
        } = this.props
        const childList = React.Children.toArray(children)
        if (childList.length <= 0) {
            return null
        }
        const {
            angle,
            width
        } = this.state
        const contianerStyle = {
            height: `${frameHeight}px`,
        }
        const sceneStyle = {
            transform: `translateZ(${-width}px) rotateY(${angle}deg)`
        }
        console.log("carousel-render=====>", sceneStyle)
        return (
            <div className={`${styles.carousel} ${className}`}>
                <div className={styles.banner}
                    style={contianerStyle}
                    ref={this.carouselRef}>
                    <div className={`${styles.scene} ${styles.animation}`}
                        style={sceneStyle}
                        ref={this.containerRef}
                        {
                        ...this.events
                        }>
                        {
                            this.renderChildren(childList, width)
                        }
                    </div>
                </div>
                {
                    this.renderDot()
                }
            </div>
        )
    }
}

export default Carousel