import * as React from "react";
import { connect } from "react-redux";
import { Graph, Node, Edge, Shape, Cell } from "@antv/x6";
import { DagreLayout } from "@antv/layout";
import { ReactShape } from '@antv/x6-react-shape'
import '@antv/x6-react-shape'
import styles from "./index.module.scss";
export class MyComponent extends React.Component<{ node?: ReactShape; text: string }> {
    shouldComponentUpdate() {
        const node = this.props.node
        if (node) {
            if (node.hasChanged('data')) {
                return true
            }
        }

        return false
    }

    onDouble = (event: any) => {
        event.stopPropagation()
        console.log("123")
    }

    render() {
        return (
            <div className={styles.mine}>{
                this.props.text}
                <button onClick={this.onDouble}>
                    btn
            </button>
            </div>
        )
    }
}

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
/********************************************************************/
/*
    source
    target
    vertices：路径点
    router：路由
    connector：连线
    labels：标签
    defaultLabel：标签
*/

interface IX6Props {
    logs: {}
}
class X6 extends React.Component<IX6Props, never> {
    graph: Graph | null = null
    componentDidMount() {
        this.graph = new Graph({
            container: document.getElementById("x6") as HTMLElement,
            height: 1200,
            background: {
                color: "#fffbe6",
            },
            grid: {
                size: 10,
                visible: true,
            },
        })

        const { logs } = this.props;
        if (logs) {
            this.graph.fromJSON(logs);
        }
    }
    render() {
        const { logs } = this.props;
        if (this.graph) {
            this.graph.fromJSON(logs);
        }
        return (
            <div className={styles.container} id="x6">
            </div>
        )
    }
}

export default connect((state: any) => {
    const { x6 } = state

    return x6
})(X6)