/* 
	目的：
		1、INITIAL视觉：使用骨骼图代替，并展示请求进度
		2、SUCCESS视觉：正常渲染
		3、FAILURE视觉：第一次请求失败和后续请求失败两种场景
		3-1：第一次请求失败
		3-2：第二次请求失败
 */
import * as React from 'react';
import { connect } from 'react-redux';
import Error from 'Components/Error';
import actions from './controller/actions';

// portrait
interface IPortrait {
	name: string;
	deadline: number;
	portrait: string;
}

function Portrait(info: IPortrait) {
	if (!info.name) {
		return null
	}
	return (
		<div>
			<span>
				image
			</span>
			<span>
				<span>
					name
				</span>
				<span>
					deadline
				</span>
			</span>
			<span>
				续期与否
			</span>
		</div>
	)
}

interface IEgg {
	current: number;
}

function Rights(egg: IEgg) {
	return <div>
		eggs
	</div>
}

interface IProps {
	bInitial: boolean;
	info: IPortrait;
	rights: IEgg;
}

function Bones(props: IProps) {
	// 两个（多个）接口同时返回数据，才会渲染UI
	React.useEffect(() => {
		actions.requestRenderData();
		actions.renderDemoFn()
	}, [])
	// 两个（多个）接口任一个返回，就渲染UI
	// 第一个返回失败，第二返回成功；UI不可控
	// React.useEffect(() => {
	// 	actions.requestGetCard();
	// 	actions.requestGetCard2();
	// }, []);

	if (props.bInitial) {
		return null;/* <Default /> */
	}

	if (!props.info.name && !props.rights.current) {
		return <Error bReload={false} />
	}

	return (
		<div>
			<Portrait {...props.info} />
			<Rights {...props.rights} />
		</div>
	)

}
function mapStateToProps(state: any) {
	const { double } = state;
	return double;
}
export default connect(mapStateToProps)(Bones);