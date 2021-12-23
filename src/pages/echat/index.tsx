import * as React from 'react'
// import * as Echarts from 'echarts'
interface IProps {}
interface IState {}
class Echat extends React.Component<IProps, IState> {
	constructor(props: IProps){
		super(props)
		this.state={}
	}
	static getStateFromDerivedProps(props: IProps, state: IState){
		return null
	}
	componentDidMount(){
	}
	shouldComponentUpdate(){
		return true
	}
	getSnapshotBeforeUpdate(prevProps: IProps, prevState: IState){
	return null
	}
	render(){
		return null
	}
}
export default Echat