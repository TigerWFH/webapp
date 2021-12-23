import * as React from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import Stencil from "./components/Stencil";
import Trigger from "./components/Trigger";
import styles from "./index.module.scss"

const MOCK_STENCIL_DATA = {
    'monkey的小屋monkey的小屋monkey的小屋': [<Trigger key={1} name="monkey" />, <div key={2}>123</div>, <div key={3}>123</div>, <div key={4}>123</div>, <div key={1}>123</div>, <div key={2}>123</div>, <div key={3}>123</div>, <div key={4}>123</div>],
    '卧室': [<div key={1}>卧室</div>, <div key={2}>1卧室23</div>],
    '厨房': [<div key={1}>厨房</div>, <div key={2}>厨房123</div>],
}
class Tools extends React.PureComponent {
    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <div className={styles.tools}>
                    <Stencil data={MOCK_STENCIL_DATA} />
                </div>
            </DndProvider>
        )
    }
}

export default Tools;