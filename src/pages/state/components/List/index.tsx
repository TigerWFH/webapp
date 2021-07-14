import * as React from 'react'

interface IProps {
    count: number
    key: any
}
interface IState {}
export default class List extends React.Component<IProps, IState> {
    old: any
    constructor(props: IProps) {
        super(props)
        console.log('List-Component-constructor===>', this.props)
    }
    componentWillReceiveProps(nextProps: any) {
        console.log("List-Component-willReceiveProps===>", nextProps)
    }
    shouldComponentUpdate(nextProps: any, nextState: any) {
        if (nextProps.count === this.props.count) {
            console.log("List-Component-shouldComponentUpdate-没有update===>", this.props)
            return false
        }
        return true
    }
    componentWillUnmount() {
        console.log('List-Component-willunmount===>', this.props)
    }
    render() {
        console.log('List-Component-render===>', this.props)
        if (this.old) {
            console.log("List-Component-render==old=>", this.old)
        }
        else {
            this.old = JSON.stringify(this.props)
        }
        return <div>
            {
                this.props.count
            }
        </div>
    }
}