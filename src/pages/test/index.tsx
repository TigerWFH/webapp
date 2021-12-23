import * as React from "react";

/*
    Node.textContent：返回一个节点及其后代的文本内容，可以防止XSS
        获取所有元素的内容，包括script和style元素
    Node.insertAdjancetText()
    HTMLElement.innerText：返回一个节点及其后代的渲染出来的文本内容
        受css样式影响，不会返回隐藏元素的文本
    Element.innerHTML：设置或获取HTML语法表示的元素的后代
    Element.insertAdjacentHTML()：将指定的文本解析为Element元素，并将结果节点插入到DOM树种指定的位置
    -----------------
    处理文本节点：建议使用node.textContent和node.insertAdjancetText()
    处理HTML内容：建议使用Element.innerHTML和Element.insertAdjacentHTML()
*/
class Test extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            test: {
                name: "firstLevel",
                second: {
                    age: "secondLevel",
                    third: {
                        grade: "third"
                    }
                }
            },
            demo: "demo"
        }
    }

    onChangeName = () => {
        // 改变了test，触发rerender
        this.setState({
            test: {
                ...this.state.test,
                name: "changeName"
            },
            demo: "changeName"
        })
    }

    onChangeAge = () => {
        // test不变，改变了second，触发rerender
        const { test } = this.state;
        test.second = {
            ...test.second,
            age: "change age"

        };
        this.setState({
            test
        })
    }
    onChangeGrade = () => {
        // test、second不变，改变了third，无法触发rerender
        console.log("change grade")
        const { test } = this.state;
        const { second } = test;
        second.third = {
            ...second.third,
            grade: "change grade"
        }
    }

    render() {
        console.log("first")
        return (
            <div>
                <button onClick={this.onChangeName}>
                    change name
                </button>
                <button onClick={this.onChangeAge}>
                    change age
                </button>
                <button>
                    change age again
                </button>
                <button onClick={this.onChangeGrade}>
                    change grade
                </button>
                <button>
                    change grade again
                </button>

                {
                    this.state.test.name
                }
                <Second second={this.state.test.second} />
                {
                    React.cloneElement(this.props.children as any, { demo: this.state.demo })
                }
            </div>
        )
    }
}

class Second extends React.Component<any, any> {
    render() {
        console.log("second")
        return (
            <div>
                {
                    this.props.second.age
                }
                <Third third={this.props.second.third.age} />
            </div>
        )
    }
}
class Third extends React.Component<any, any> {
    edit: any = null
    onSelect = () => {
        const selection = document.getSelection();
        console.log("=========>", selection)
        if (selection !== null) {
            const { anchorNode } = selection;
            const range = selection.getRangeAt(0);
            console.log("reange====>", range, range.toString())
            console.log("anchorNode===>", anchorNode)
        }
    }
    onGetContent = () => {
        if (this.edit) {
            const innerText = this.edit.innerText;
            console.log("innerText=====>", innerText)
            const textContent = this.edit.textContent;
            console.log("textContent=====>", textContent)
            const innerHtml = this.edit.innerHTML;
            console.log("innerHtml=====>", innerHtml)
        }
    }
    onChangeColor = () => {
        // const selection = window.getSelection();
        document.execCommand("", false);
    }
    onAdd = () => {
        const selection = document.getSelection();
        console.log("=========>", selection)
        /*
        anchorNode: null
anchorOffset: 0
baseNode: null
baseOffset: 0
extentNode: null
extentOffset: 0
focusNode: null
focusOffset: 0
isCollapsed: true
rangeCount: 
        */
        if (selection !== null) {
            // const { anchorOffset, anchorNode, focusOffset, focusNode } = selection;
            const range = selection.getRangeAt(0);
            console.log("reange====>", range)
        }


        document.execCommand("createlink", false, 'https://www.baidu.com');
    }
    onChangeFont = () => {
        document.execCommand("forecolor", false, 'red');
    }
    onInsert = () => {
        if (this.edit != null) {
            this.edit.replace();
        }
    }
    render() {
        console.log("third")
        return (
            <div>
                {
                    this.props.third
                }
                <h3>富文本编辑器</h3>
                <div>
                    <div>
                        <button onClick={this.onSelect}>选中内容</button>
                        <button onClick={this.onGetContent}>获取内容</button>
                        <button onClick={this.onChangeColor}>改变颜色</button>
                        <button onClick={this.onAdd}>add anchod</button>
                        <button onClick={this.onChangeFont}>改变字体</button>
                    </div>
                    <div ref={(edit) => (this.edit = edit)} contentEditable={true}>
                        <span>我是富文本</span>
                        <div>
                            <span style={{ width: "80px", display: "inline-block" }}></span>
                            <span>我是富文本2</span>
                            <span>我是富文本3</span>
                            <span>我是富文本4</span>
                        </div>
                        <span style={{ visibility: "hidden" }}>我是隐藏的</span>
                        <span>footer</span>
                    </div>
                </div>
            </div>
        )
    }
}

class Demo extends React.Component<any, any> {
    render() {
        console.log("demo-render")
        return (
            <div>
                {
                    this.props.demo
                }
            </div>
        )
    }
}



export default function () {
    return (
        <Test>
            <Demo demo="initial demo" />
        </Test>
    )
};