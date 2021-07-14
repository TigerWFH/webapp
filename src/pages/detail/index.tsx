import * as React from 'react'
import { connect } from 'react-redux'
import actions from './controller/actions'

interface IProps {
	match: any;
	history: any;
	detail: any
}
interface IState {
	skuid: string;
}
class Detail extends React.Component<IProps, IState> {
	skuid: any
	constructor(props: IProps) {
		super(props);
		this.state = {
			skuid: 'default'
		};
		const { match } = this.props
		this.skuid = match.params.skuid
		console.log('constructor======>', this.skuid)
	}
	static getDerivedStateFromProps(props: IProps, state: IState) {
		console.log('getderivedstatefromprops======>', props)
		return null
	}
	componentDidMount() {
		console.log('didMount======>', this.skuid)
		actions.requestDetail()
	}

	shouldComponentUpdate() {
		console.log('shouldComponentUpdate======>', this.skuid)
		return true;
	}
	getSnapshotBeforeUpdate(prevProps: IProps, prevState:IState) {
		console.log('snapshot======>', this.skuid)
		const { match } = this.props
		const skuid = match.params.skuid
		if (this.skuid !== skuid) {
			this.setState((prevState, props) => {
				this.skuid = skuid
				return {
					skuid
				}
			})
		}

		return null
	}
	componentDidUpdate(prevProps: IProps, prevState: IState, snapshot: any) {
		console.log('didUpdate======>', )
		// 拿到skuid，可以更新页面
	}
	componentWillUnmount() {
		console.log('componentWillUnmount======>', this.skuid)
	}
	onToNext = () => {
		const { history } = this.props
		history.push('/detail/next')
	}
	onToButton = () => {
		this.skuid = "123"
		this.setState({
			skuid: "123"
		})
	}
	render(){
		console.log("render======>", this.skuid)
		return (
			<div>
				<button onClick={this.onToNext}>
					路由跳转重用
				</button>
				<br />
				<button onClick={this.onToButton}>
					setState重用当前页面
				</button>
				{
					this.state.skuid
				}
			</div>
		);
	}
}

function mapStateToProps(state: any, ownProps: IProps) {
	const { detail } = state
	if (ownProps.detail) {
	}

	return {detail}
}

export default connect(mapStateToProps, null)(Detail);