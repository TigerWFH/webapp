/*
Svg标签foreignObject
<svg xmlns="http://www.w3.org/2000/svg">
    <foreignObject width="120" height="50">
        <body xmlns="http://www.w3.org/1999/xhtml">
            <p>
                Hello World
            </p>
        </body>
    </foreignObject>
</svg>
X6正是借助该标签，可以渲染html、react、vue等。根本在html
自定义X6节点：使用React Component
    1、需要辅助工具：@antv/x6-react-shape
    2、指定节点shape: 'react-shape'
    3、指定组件component: <Log />
    4、节点渲染时，会被X6系统注入一个node属性，指向当前节点实例
    5、辅助工具@antv/x6-react-shape提供了usePortal工具，用于提升挂载性能
    6、React组件形式，无法使用graph.toJSON()导出画布数据，通过Graph.registerReactComponent()方法处理
*/
import * as React from "react";
import styles from "./index.module.scss";


const LOG_NODE_WIDTH = 180;
const LOG_NODE_HEIGHT = 60;

interface ILogProps {
    width: number
    height: number
    name: string
    bActive: boolean
    bDecision: boolean
    node?: any
}
class Log extends React.Component<ILogProps, never, never> {
    static defaultProps = {
        width: LOG_NODE_WIDTH,
        height: LOG_NODE_HEIGHT,
        name: "",
        bActive: false,
        bDecision: false,
    };
    shouldComponentUpdate() {
        const node = this.props.node;
        if (node) {
            if (node.hasChanged("data")) {
                return true;
            }
        }

        return false;
    }

    render() {
        const { name, bActive, bDecision, width, height } = this.props;
        const inlineStyles = {
            height: `${height}px`,
            width: `${width}px`,
        };
        return (
            <div className={bActive ? styles.active : styles.normal} style={inlineStyles}>
                <span className={styles.name}>{name}</span>
                {bDecision ? <div className={styles.icon}>button</div> : null}
            </div>
        );
    }
}


export default Log;
