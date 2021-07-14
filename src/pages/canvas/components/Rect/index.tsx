// 矩形Rectangular
import * as React from "react"

export default function Rect(props: any) {
    const ref = React.useRef<HTMLCanvasElement>(null)
    React.useEffect(() => {
        let ctx = null
        if (ref.current !== null) {
            ctx = ref.current.getContext("2d")
            const style = window.getComputedStyle(ref.current.parentNode as Element)
            /*
                问题1：CSS样式限定canvas尺寸和canvas自身属性尺寸不是一回事
                    canvas画布大小默认是300*150,
                    CSS样式规则 则是canvas画布在screen展示尺寸（画布大小和CSS规则不一致，会被缩放拉伸）
            */ 
            ref.current.width = parseInt(style.width as string)
            ref.current.height = parseInt(style.height as string) // 能够解析"978px",Number不能
        }
        if (ctx !== null) {
            // ctx.lineWidth = 10
            ctx.fillRect(25, 25, 100, 100)
            ctx.clearRect(45, 45, 60, 60)
            ctx.strokeRect(50, 50, 50, 50)

            ctx.fillRect(25, 130, 50, 50)
            ctx.strokeRect(25, 190, 50, 50)
            ctx.fillRect(25, 245, 60, 60)
            ctx.clearRect(30, 250, 50, 50)

        }
    }, [])
    return (
        <canvas className={props.className} height={"300px"} ref={ref}></canvas>
    )
}