import * as React from "react"
import styles from './index.module.scss'
import { UaUtils } from '@/utils'

interface IProps {
    data: [][],
    scrollThreshold: number // 滑动阈值
}
function Navigation(props: IProps) {
    // refs
    const swiper: any = React.useRef(null)
    const container: any = React.useRef(null)
    const first: any = React.useRef(null)
    const second: any = React.useRef(null)
    const third: any = React.useRef(null)
    const map = new Map([
        [0, first],
        [1, second],
        [2, third],
    ])
    let index = 0;
    let target: any = {
        onTouchStart: start,
        onTouchMove: move,
        onTouchEnd: end
    }
    if (!UaUtils.bMobileBrowser()) {
        target = {
            onMouseDown: start,
            onMouseMove: move,
            onMouseUp: end
        }
    }
    // render 数据
    const data = props.data
    const scrollThreshold = props.scrollThreshold || 44
    // 触摸（鼠标）初始坐标
    let beginPositionX: any = undefined
    let beginPositionY: any = undefined
    let current = 1
    // 偏移量
    let offsetX = 0
    let offsetY = 0
    // 滑动方向
    let direction: string | undefined = undefined
    // 样式
    const containerStyle = {
        width: `${100 * data.length}%`,
        transform: `translateX(-${index / data.length * 100}%)`,
    }
    const frameStyle = {
        width: `${100 / data.length}%`,
        height: `${100 * Math.floor(data[index].length / 5)}px`
    }
    /*--------------------------------------------------------------------------*/
    function start(e: any) {
        current = Math.floor(data[index].length / 5)
        if (UaUtils.bMobileBrowser()) {
            beginPositionX = e.touches[0].clientX
            beginPositionY = e.touches[0].clientY
        }
        else {
            beginPositionX = e.clientX
            beginPositionY = e.clientY
        }
    }
    function move(e: any) {
        if (!Boolean(beginPositionX)) {
            return
        }
        let positionX: any = undefined
        let positionY: any = undefined
        if (UaUtils.bMobileBrowser()) {
            const { changedTouches = [] } = e
            if (changedTouches.length === 1) {
                const { clientX, clientY } = changedTouches[0]
                positionX = clientX
                positionY = clientY
            }
        }
        else {
            positionX = e.clientX
            positionY = e.clientY
        }
        computeDirection(positionX, positionY)
        if (direction === "left") {
            if (index + 1 <= 2) {
                container.current.style.transform = `translateX(-${index * swiper.current.clientWidth + offsetX}px)`
                const next = Math.floor(data[index + 1].length / 5)
                let height = 110 * current
                console.log("===>", height)
                console.log("offsetX===>", offsetX)
                if (next < current) {
                    height = (height - offsetX) < 110 ? 110 : (height - offsetX)
                } else if (next > current) {
                    height = height + offsetX
                }
                console.log("===>", height)
                map.get(0).current.style.height = `${height}px`
                map.get(1).current.style.height = `${height}px`
                map.get(2).current.style.height = `${height}px`
            }
        } else if (direction === "right") {
            if (index - 1 >= 0) {
                container.current.style.transform = `translateX(-${index * swiper.current.clientWidth - offsetX}px)`
                const next = Math.floor(data[index - 1].length / 5)
                let height = 110 * current
                if (next < current) {
                    height = height - offsetX
                } else if (next > current) {
                    height = height + offsetX
                }
                map.get(0).current.style.height = `${height}px`
                map.get(1).current.style.height = `${height}px`
                map.get(2).current.style.height = `${height}px`
            }
        } else if (direction === "up") {

        } else if (direction === "down") {

        }
    }
    function computeDirection(x: number, y: number) {
        const dx = x - beginPositionX
        const dy = y - beginPositionY
        offsetX = Math.abs(dx)
        offsetY = Math.abs(dy)
        const angle = Math.atan2(dy, dx) * 180 / Math.PI
        if (offsetX > scrollThreshold) {
            if (-45 < angle && angle < 45) {
                if (dx > scrollThreshold) {
                    direction = "right"
                }
            } else if (angle > 135 || angle < -135) {
                direction = "left"
            }
        }
        if (offsetY > scrollThreshold) {
            if (45 < angle && angle < 135) {
                direction = "down"
            } else if (-135 < angle && angle < -45) {
                direction = "up"
            }
        }
    }
    function end(e: any) {
        const containerWidth = swiper.current.clientWidth
        const bSwitch = containerWidth / 3 < offsetX

        if (direction === "left") {
            if (index + 1 <= 2 && bSwitch) {
                index = (index + 1) % 3
                current = Math.floor(data[index].length / 5)
            }
            let height = 110 * current
            map.get(0).current.style.height = `${height}px`
            map.get(1).current.style.height = `${height}px`
            map.get(2).current.style.height = `${height}px`
            let result = index * swiper.current.clientWidth
            container.current.style.transform = `translateX(-${result}px)`

        } else if (direction === "right") {
            if (index - 1 >= 0) {
                index = (index - 1) % 3
                current = Math.floor(data[index].length / 5)
            }
            let height = 110 * current
            map.get(0).current.style.height = `${height}px`
            map.get(1).current.style.height = `${height}px`
            map.get(2).current.style.height = `${height}px`
            let result = index * swiper.current.clientWidth
            container.current.style.transform = `translateX(-${result}px)`
        }
        beginPositionX = undefined
        beginPositionY = undefined
        direction = ""
    }
    return (
        <div className={styles.swiper}
            ref={swiper}
            {...target}>
            <div className={styles.container}
                ref={container}
                style={containerStyle}>
                {
                    data.map((itemList: any, index: number) => {
                        return <div key={index}
                            className={styles.frame}
                            ref={map.get(index)}
                            style={frameStyle}>
                            {
                                itemList.map((navigation: any, index: number) => {
                                    return (
                                        <div key={index}
                                            className={styles.info} >
                                            <img src="" alt="logo" className={styles.image} />
                                            <span>
                                                {
                                                    navigation
                                                }
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Navigation