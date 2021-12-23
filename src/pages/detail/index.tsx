import * as React from 'react'
import { connect } from 'react-redux'
import actions from './controller/actions'

interface IProps {
	match: any;
	history: any;
	detail: any;
	detailDemo: string
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
		console.log('Detail===constructor======>', this.skuid)
	}
	static getDerivedStateFromProps(props: IProps, state: IState) {
		console.log('Detail===getderivedstatefromprops======>', props)
		return null
	}
	componentDidMount() {
		console.log('Detail===didMount======>', this.skuid)
		actions.requestDetail()
	}

	shouldComponentUpdate() {
		console.log('Detail===shouldComponentUpdate======>', this.skuid)
		return true;
	}
	getSnapshotBeforeUpdate(prevProps: IProps, prevState: IState) {
		console.log('Detail===snapshot======>', this.skuid)
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
		console.log('Detail===didUpdate======>',)
		// 拿到skuid，可以更新页面
	}
	componentWillUnmount() {
		console.log('Detail===componentWillUnmount======>', this.skuid)
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
	onChangeDetail = () => {
		actions.chnageDetail()
	}
	render() {
		console.log("Detail===render======>", this.skuid)
		const { detailDemo } = this.props;
		return (
			<div>
				<button onClick={this.onChangeDetail}>changeDetail</button>
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
				<div>
					{
						`Detail:${detailDemo}`
					}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state: any, ownProps: IProps) {
	const { detail } = state

	return { detail }
}

export default connect(mapStateToProps, null)(Detail);