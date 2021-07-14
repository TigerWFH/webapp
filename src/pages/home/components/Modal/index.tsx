/** 
 * 实现Modal方式
 * 1、正常的Modal组件，用样式定位
 *  1-1：当父组件容器overflow： hidden或者存在z-index时候，需要在视觉上突破父组件的容器
 * 2、使用ReactDOM.render(instance, container[, callback]):null | reference
 *    使用ReactDOM.unmountComponentAtNode()
 * 3、使用ReactDOM.unstable_renderSubtreeIntoContainer(parent, component, container, callback)
 * 4、使用ReactDOM.createPortal(instance, container)
 * 
 * 区别：
 *  一、render函数意味着Modal是一个单独的react tree
 *  二、createPortal和createElement同级，创建的Portal仍然属于一个react tree
 * 
 *  跨react tree自然带来数据传递和事件冒泡的问题
 *  场景1：Modal内容触发事件，父组件是否可以感知问题
 *      render中，父组件不感知Modal触发的事件
 *      createPo中，父组件能够感知到Modal触发的事件
 *  场景2：父组件所在的react tree的conotext共享问题
 *      
 *  场景3：父组件更重新state，Modal是否可以更新问题
 *      render中，
 *          如果在父组件的render中直接调用ReactDOM.render则可以根据state实时更新内容，
 *              是因为react自身的更新就是通过ReactDOM.render完成的
 *          如果直接调用ReactDOM.render，则无法根据state实时更新内容，因为ReactDOM.render没有再次调用
 *      createPortal中，并未脱离React Tree，无论如何操作都会根据state进行更新
 *  
 *      
 * */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styles from './index.module.scss'

interface IProps {}
interface IState {
    name: string
    bModal: boolean
}
let container: HTMLElement = window.document.createElement('div')
let container2: HTMLElement = window.document.createElement('div')

function Hello(props: any) {
    return (
        <div className={`${props.className}`} onClick={() => alert(props.content)}>
            <h1>hello world</h1>
            <div>
                {
                    props.content
                }
            </div>
        </div>
    )
}
export default class Compare extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
            name: 'default',
            bModal: false
        }
        if (container === null) {
            container = window.document.createElement('div')
        }
        window.document.body.appendChild(container)
        if (container2 === null) {
            container2 = window.document.createElement('div')
        }
        window.document.body.appendChild(container2)
    }
    onRenderParent = () => {
        // alert('renderParent')
        const elem = <div onClick={this.onChangeState}>
            change state
            <span>
                {
                    this.state.name
                }
            </span>
        </div>
        ReactDOM.render(<Hello className={styles.hello} content={elem}/>, container)
    }
    onPortalParent = (e: any) => {
        e.stopPropagation()
        alert('portalParent')
        this.setState({
            bModal: true
        })
    }
    onChangeState = () => {
        this.setState({
            name: 'monkey'
        })
    }
    render() {
        const elem = <div onClick={this.onChangeState}>
            change state
            <span>
                {
                    this.state.name
                }
            </span>
        </div>
        return (
            <div>
                <div onClick={this.onRenderParent}>
                    动态加载render
                    {/* <h1>ReactDOM.render</h1>
                    {
                        ReactDOM.render(<Hello className={styles.hello} content={elem}/>, container)
                    } */}
                </div>
                <div onClick={this.onPortalParent}>
                    <h1>ReactDOM.createPortal</h1>
                    {
                        this.state.bModal ? ReactDOM.createPortal(<Hello className={styles.hello2}  content={elem} />, container2) : null
                    }
                </div>
            </div>
        )
    }
}