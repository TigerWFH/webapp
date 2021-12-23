/*
    纯使用SVG自定义节点（扩展定义原生节点）
*/
import { Graph, Node, Edge, Shape } from '@antv/x6'
// class自定义节点方式
// first：class扩展方法
class Demo extends Node {
}
// second config配置
Demo.config({
    width: 200,
    height: 60,
    markup: [
        {
            tagName: "rect",
            selector: "body"
        }
    ],
    attrs: {
        body: {
            width: 200,
            height: 60,
            fill: "#00a3fe"
        }
    }
})
// third 注册
Graph.registerNode("demo", Demo)

// 快速自定义节点方式一
Shape.Rect.define({
    shape: "custom-rect",
    width: 200,
    height: 40,
    attrs: {
        body: {
            rx: 10,
            ry: 10,
            strokeWidth: 1,
            fill: "#5755a1",
            stroke: "#5755a1"
        },
        label: {
            fill: "#fff",
            fontSize: 18,
            refX: 10,
            textAnchor: "left"
        }
    }
})
// 快速自定义节点方式二
Graph.registerNode("custom-rect2", {
    inherit: "rect",
    width: 200,
    height: 60,
    sttrs: {
        body: {
            rx: 10, // 圆角矩形
            ry: 10,
            strokeWidth: 1,
            fill: '#5755a1',
            stroke: '#5755a1',
        },
        label: {
            fill: '#fff',
            fontSize: 18,
            refX: 10, // x 轴偏移，类似 css 中的 margin-left
            textAnchor: 'left', // 左对齐
        }
    }
})
/********************************************************************/
Graph.registerNode("custom-biz", {
    width: 200,
    height: 60,
    markup: [
        {
            tagName: "rect",
            selector: "body"
        },
        {
            tagName: "text",
            selector: "label"
        }
    ],
    attrs: {
        body: {
            refWidth: "100%",
            refHeight: "100%",
            fill: "#00a3fe"
        },
        label: {
            x: 100,
            y: 30,
            text: "default文案",
        }
    }
})
