import React from 'react'

interface IProps {
    black?: boolean
    children?: any
}

export default function Square(props: IProps) {
    const fill = props.black ? 'black' : 'white'
    const stroke = props.black ? 'white' : 'black'

    return <div style={{ backgroundColor: fill, color: stroke, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {
            props.children
        }
    </div>
}