import React from 'react'
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Square from '../Square'
import Knight from '../Knight'
import { ItemTypes } from '../../help'

interface IProps {
    position: any
}


function BoardSquare(props: any) {
    const black = (props.x + props.y) % 2 === 1;

    const [{ isOver, isName }, drop] = useDrop(() => ({
        accept: ItemTypes.KNIGHT,
        drop: () => props.setPosition(props),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            isName: ""
        })
    }), [props.x, props.y])

    return <div ref={drop} style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Square black={black}>{props.children}</Square>
        {
            isOver && (
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 1, opacity: 0.5, backgroundColor: 'yellow' }} />
            )
        }
    </div>
}


function renderSquare(i: number, position: any, setPosition: any) {
    const x = i % 8
    const y = Math.floor(i / 8)
    const isKnightHere = x === position.x && y === position.y
    const piece = isKnightHere ? <Knight /> : null

    return (
        <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
            <BoardSquare x={x} y={y} setPosition={setPosition}>
                {
                    piece
                }
            </BoardSquare>
        </div>
    )
}

export default function Board() {
    const [position, setPosition] = React.useState({ x: 3, y: 2 });
    const squares = []
    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i, position, setPosition))
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap' }}>
                {squares}
            </div>
        </DndProvider>
    )
}