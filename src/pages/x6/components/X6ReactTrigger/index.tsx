import * as React from "react";
import styles from "./index.module.scss";


const LOG_NODE_WIDTH = 40;
const LOG_NODE_HEIGHT = 40;

interface ITrigger {

    width?: number
    height?: number
    name?: string
    content?: string
    node?: any
    onDelete?: () => any
}
class Trigger extends React.Component<ITrigger, any, never> {
    static defaultProps = {
        width: LOG_NODE_WIDTH,
        height: LOG_NODE_HEIGHT,
        name: "客群",
        type: 'consumer',
        content: 'default content'
    };
    constructor(props: any) {
        super(props);
        console.log("constructor")
        this.state = {
            name: '',
            editable: false
        }
    }
    shouldComponentUpdate(nextProps: any, nextState: any) {
        console.log("SCU====>", nextProps, nextState)
        const { name } = nextState;
        const oldName = this.state.name;
        if (name !== oldName) {
            return true;
        }
        const node = this.props.node;
        if (node) {
            if (node.hasChanged("data")) {
                return true;
            }
        }

        console.log("no-rerender======>", this.props.node === nextProps.node)

        return false;
    }
    componentDidUpdate() {
        console.log("didUpdate======>", this.props)
    }

    onChange = (e: any) => {
        this.setState({
            name: e.target.value
        })
    }

    onDelete = () => {
        // console.log("shanchu")
        // const { onDelete } = this.props;
        // if (typeof onDelete === 'function') {
        //     onDelete()
        // }
        const { editable } = this.state;
        this.setState({
            editable: !editable
        }, () => {
            const { node } = this.props;
            // const { data = {} } = node;
            const { name } = this.state;
            // data.name = name;
            node.setData({
                name
            })
        })
    }

    render() {
        console.log("render=======>", this.props)
        const { content } = this.props;
        const { name, editable } = this.state;
        return (
            <div className={styles.container} >
                <div className={styles.title}>
                    {
                        editable ? <input value={name} placeholder="请输入新名字" onChange={this.onChange} /> :
                            <span className={styles.name}>{name}</span>
                    }
                    <button className={styles.delete} onClick={this.onDelete}>
                        {
                            editable ? '保存' : '编辑'
                        }
                    </button>
                </div>
                <div className={styles.content}>
                    {
                        content
                    }
                </div>
            </div>
        );
    }
}


export default Trigger;