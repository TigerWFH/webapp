import * as React from "react";
import styles from "./index.module.scss";

console.log("styles===>", styles)

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
