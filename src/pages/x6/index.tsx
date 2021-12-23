import * as React from "react";
import { connect } from "react-redux";
import X6DndGraph from './components/X6DndGraph'

interface IX6Props {
    logs: {}
    groupList: any[]
}

class X6 extends React.Component<IX6Props, never> {
    render() {
        return (
            <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                <X6DndGraph />
            </div>
        )
    }
}

export default connect((state: any) => {
    const { x6 } = state

    return x6
})(X6)