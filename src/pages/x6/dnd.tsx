import * as React from "react";
import Board from './components/Board'
import Dustbin from './components/Dustbin'

interface IProps { }

const boardStyle = {
    width: 600,
    height: 600,
    border: '1px solid black'
}
class Dnd extends React.Component {
    render() {
        return (
            <div>
                <h1>国际象棋</h1>
                <div style={boardStyle}>
                    <Board />
                </div>
                <h1>Dustbin</h1>
                <div style={boardStyle}>
                    <Dustbin />
                </div>
            </div>
        )
    }
}

export default Dnd;