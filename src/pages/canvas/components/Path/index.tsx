// 矩形Rectangular
import * as React from "react"

function draw(ctx: CanvasRenderingContext2D) {
    if (ctx !== null) {
        const length = 4
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < 3; j++) {
                ctx.beginPath()
                const x = 240 + j * 50
                const y = 50 + i * 50
                const radius = 20
                const beginAngle = 0
                const endAngle = Math.PI + Math.PI * j / 2
                var anticlockwise = i % 2 === 0 ? false : true

                ctx.arc(x, y, radius, beginAngle, endAngle, anticlockwise)
                if (i > 1) {
                    ctx.fill()
                }
                else {
                    ctx.stroke()
                }
            }
        }
    }
}
export default function Path(props: any) {
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
                问题2：当前点（current position）确定
                    moveTo(x0, y0)直接指定当前点
                    lineTo(x, y)等函数在操作结束后会更新当前点为x,y
            */ 
            ref.current.width = parseInt(style.width as string)
            ref.current.height = parseInt(style.height as string) // 能够解析"978px",Number不能
        }
        if (ctx !== null) {
            /*
                canvas仅支持两种形式的图形绘制：矩形和路径
                路径：是通过不同颜色很宽度的线段或曲线相连形成的不同形状的点的集合。路径是闭合的。图形的基本元素是路径
                绘制路径步骤：
                    1、绘制起始点: 
                    2、画路径
                    3、路径闭合
                    4、描边或填充路径绘制图形
                    beginPath()：绘制路径，初始化上下文
                    moveTo(x, y)：移动画笔函数，移动画笔到指定点
                    lineTo(x, y)：绘线函数，绘制从当前位置到指定位置(x,y)的直线
                    closePath()：绘制完成
                    stroke()描边函数，调用前不会处理未闭合的路径
                    fill()填充函数，调用前没有闭合的路径会被自动闭合

            */
            /*
                绘制三角形
            */
            ctx.beginPath()
            ctx.moveTo(125, 50)
            ctx.lineTo(150, 75)
            ctx.lineTo(150, 25)
            ctx.fill()
            /*
                笑脸
                弧度参数（非角度参数）
                arc(x, y, radius, startAngle, endAngle, anticlockwise)
                arcTo(x1, y1, x2, y2, radius)
            */ 
            ctx.beginPath()
            ctx.arc(75, 75, 50, 0, Math.PI * 2, true) // 顺时针
            ctx.moveTo(110, 75)
            ctx.arc(75, 75, 35, 0, Math.PI, false) // 逆时针
            ctx.moveTo(65, 65)
            ctx.arc(60, 65, 5, 0, Math.PI * 2, true) // 左眼
            ctx.moveTo(95, 65)
            ctx.arc(90, 65, 5, 0, Math.PI * 2, true) // 右眼
            ctx.stroke()
            /*
                各种弧度
            */ 
            draw(ctx)
            ctx.beginPath()
            ctx.arc(450, 120, 60, 0, Math.PI, true) // true逆时针
            ctx.fill()
            ctx.beginPath()
            ctx.arc(450, 180, 60, 0, Math.PI, false) // true逆时针
            ctx.fill()
            /*
                贝塞尔曲线：学习资料https://www.jasondavies.com/animated-bezier/
                    定义：起始点、终止点（锚点）、控制点。通过调整控制点，贝塞尔曲线的形状会发生变化。
                控制点和结束点
                    1次贝塞尔曲线公式：已知起始点P0、终止点Pn，引入参数t，取值[0, 1]
                        B1 = (1-t)P0 + tPn
                    2次贝塞尔曲线公式：已知起始点P0、终止点Pn，控制点Pc，引入参数t，取值[0, 1]
                        递推计算方式
                        计算间接控制点Pc1和Pc2：
                            Pc1 = (1-t)P0 + tPc
                            Pc2 = (1-t)Pc + tPn
                        计算二次贝塞尔曲线：
                            B2 = (1-t)Pc1 + tPc2，带入间接控制点Pc1和Pc2
                参数是控制点和结束点
                二次贝塞尔曲线：quadraticCurveTo(cp1x, cp1y, x, y)
            */
           ctx.beginPath()
           ctx.moveTo(275, 225) // 起始点
           ctx.quadraticCurveTo(225, 225, 225, 262.5) // 控制点和结束点
           ctx.quadraticCurveTo(225, 300, 250, 300)
           ctx.quadraticCurveTo(250, 320, 230, 325)
           ctx.quadraticCurveTo(260, 320, 265, 300)
           ctx.quadraticCurveTo(325, 300, 325, 262.5)
           ctx.quadraticCurveTo(325, 225, 275, 225)
           ctx.closePath()
           ctx.stroke()
        /*
            三次贝塞尔曲线：bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        */   
            ctx.beginPath()
            ctx.moveTo(75, 240)
            ctx.bezierCurveTo(75, 237, 70, 225, 50, 225)
            ctx.bezierCurveTo(20, 225, 20, 262.5, 20, 262.5);
            ctx.bezierCurveTo(20, 280, 40, 302, 75, 320);
            ctx.bezierCurveTo(110, 302, 130, 280, 130, 262.5);
            ctx.bezierCurveTo(130, 262.5, 130, 225, 100, 225);
            ctx.bezierCurveTo(85, 225, 75, 237, 75, 240);
            ctx.fill();
        }
    }, [])
    return (
        <canvas className={props.className} height={"300px"} ref={ref}></canvas>
    )
}