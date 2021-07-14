import * as React from 'react'
import { connect } from 'react-redux'
import actions from './controller/actions'

interface IOtherProps { }
function Other(props: IOtherProps) {
	console.log('other-render==========')
	return (
		<div>
			other
		</div>
	)
}
interface INestedProps {
	name: string
}
function Nested(props: INestedProps) {
	console.log('nested-render==========')
	return (
		<div>
			{
				props.name
			}
		</div>
	)
}
interface IToolProps {
	tool: string
}
function Tool(props: IToolProps) {
	console.log('tool-render==========', props.tool)
	return (
		<div>
			{
				props.tool
			}
		</div>
	)
}
interface IChildrenProps {
	children: any
	toolComponent: any
	name: string
}
function Children(props: IChildrenProps) {
	console.log('children-render==========')
	const [name, setName] = React.useState('monkey')
	const [tool, setTool] = React.useState('tool')
	return (
		<div>
			<button onClick={() => setName('cat')}>
				change name
			</button>
			<button onClick={() => setTool('too-cat')}>
				change tool
			</button>
			<Tool tool={tool} />
			<Other />
			<div>
				{
					name
				}
			</div>
			<div>
				{
					props.toolComponent
				}
			</div>
			<div>
				<h1>children</h1>
				{
					// React.cloneElement(props.children, {name: name})
					props.children
				}
			</div>
		</div>
	)
}

interface IProps {
	list: any[]
}
interface IState { }
class Child extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props)
		this.state = {}
	}
	static getStateFromDerivedProps(props: IProps, state: IState) {
		return null
	}
	componentDidMount() {
	}
	shouldComponentUpdate() {
		return true
	}
	getSnapshotBeforeUpdate(prevProps: IProps, prevState: IState) {
		return null
	}
	componentDidUpdate(prevProps: IProps, prevState: IState, snapshot: any) {

	}
	onAddList = () => {
		console.log("addTime===>", new Date().toLocaleString())
		actions.getListSuccess({})
	}
	render() {
		console.log("beigin render=====>", new Date().toLocaleString())
		console.log('child-render======', <div />)
		/*
			<div /> === React.createElement('div') ===执行后，返回一个ReactElement对象===>
			{
				$$typeof: Symbol('react.element'),
				type: 'div',
				key: null,
				ref: null,
				props: {},
				_owner: FiberNode {},
				_store: {},
				_self: null,
				_source: {},
				__proto__: Object
			 }
		*/
		console.log('child-render-create======', React.createElement('div'))
		console.log('child-render==========', <Children name={'monkey'} toolComponent={<Tool tool={'tool component position'} />}>
			<Nested name={'nested'} />
		</Children>)
		return (
			<div>
				<Children name={'123'} toolComponent={<Tool tool={'tool component position'} />}>
					<Nested name={'nested'} />
				</Children>
				<div>
					<button onClick={this.onAddList}>
						add list
					</button>
					<span>
						list
				</span>
					{
						this.props.list.map((item, index) => {
							return <div key={index}>
								<div>
									{
										item.name
									}
								</div>
								<div>
									{
										item.age
									}
								</div>
								<div>
									{
										item.comment
									}
								</div>
							</div>
						})
					}
				</div>
			</div>
		)
	}
}
function mapStateToProps(state: any) {
	const { child } = state
	return child
}
export default connect(mapStateToProps)(Child)
/**
 * 可以理解children就是props，props并没有变更，故不update
 *
 * tree diff
 * component diff
 * element diff
 *
 * 关于React.createElement(component, props, children):ReactElement
 * <Child /> ===> React.createElement('Child', {})
 *
 * <Container>
 * 		<Child />
 * </Container>
 * ===> React.createElement('Container', {}, React.createElement('Child', {}, {}))
 * ===>{
 * 	type: Container,
 * 	props: {
 * 		children: {
 * 			type: Child,
 * 			props: {},
 * 			children: {}
 * 		}
 * 	}
 * }
 */