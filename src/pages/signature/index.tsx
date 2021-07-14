import * as React from 'react'
import SignatureCanvas from 'react-signature-canvas'
import styles from './index.module.scss'
interface IProps {}
interface IState {
	dataUrl: string | undefined
}
class Signature extends React.Component<IProps, IState> {
	signatureRef: any
	constructor(props: IProps){
		super(props)
		this.state={
			dataUrl: undefined
		}
		this.signatureRef = React.createRef()
	}
	// static getStateFromDerivedProps(props: IProps, state: IState){
	// 	return null
	// }
	// componentDidMount(){
	// }
	// shouldComponentUpdate(){
	// 	return true
	// }
	// getSnapshotBeforeUpdate(prevProps: IProps, prevState: IState){
	// return null
	// }
	onBegin = () => {
		console.log('begin draw stroke')
	}
	onEnd = () => {
		console.log('end draw stroke')
	}
	onGenerateSignature = () => {
		const DataUrl = this.signatureRef.current.toDataURL('image/png')
		this.setState({
			dataUrl: DataUrl
		})
	}
	onClear = () => {
		this.signatureRef.current.clear()
		this.setState({
			dataUrl: undefined
		})
	}
	render(){
		const {dataUrl} = this.state
		return (
			<div>
				<SignatureCanvas penColor={'green'}
					onBegin={this.onBegin}
					onEnd={this.onEnd}
					ref={this.signatureRef}
					canvasProps={{
						width: 500,
						height: 200,
						className: styles.signature
					}} />
					<div>
						<div>
						<button onClick={this.onGenerateSignature}>
							generate signature
						</button>
						<button onClick={this.onClear}>
							clear
						</button>
						</div>
						{
							dataUrl ? <img src={dataUrl} alt='签名' /> : null
						}
					</div>
			</div>
		)
	}
}
export default Signature