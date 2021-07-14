import * as React from "react"
import BraftEditor from "braft-editor"
import { Card } from "antd"
import 'braft-editor/dist/index.css'

class Editor extends React.Component<any, any> {

    onChange = (value: any) => {
        const { onEditor } = this.props
        if (typeof onEditor === "function") {
            onEditor(value)
        }
    }
    render() {
        return (
            <Card title="editor">
                <BraftEditor value={this.props.value} onChange={this.onChange} />
            </Card>
        )
    }
}

export default Editor