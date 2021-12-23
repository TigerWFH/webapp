import * as React from 'react';
import { ThemeContext } from '../../context'
import { compressImage } from "@/utils/helper"
interface IProps { }
interface IState {
	context: string
	originImage: string
	compressedImage: string
	other: string
}
// context消费方式1：Class.contextType
class Toolbar extends React.Component<any, never> {
	static contextType = ThemeContext

	render() {
		console.log(`${this.props.type}-Toolbar=======>`, this.context)
		return (
			<div>
				Toobar
			</div>
		)
	}
}
// context消费方式2：Context.Consumer
function Tooltip(props: any) {
	return (
		<ThemeContext.Consumer>
			{
				(context) => {
					console.log(`${props.type}-Tooltip--->`, context)
					return <div>
						tooltip
					</div>
				}
			}
		</ThemeContext.Consumer>
	)
}
// Context修改方式：Context.Provider
class Context extends React.Component<IProps, IState> {
	static contextType = ThemeContext
	constructor(props: IProps,) {
		super(props);
		this.state = {
			context: 'Context-default',
			originImage: "",
			compressedImage: "",
			other: ""
		};
	}

	onChangeContext = () => {
		this.setState({
			context: 'Context-change'
		})
	}
	onUploadFile = (event: any) => {
		const fileList = event.target.files;
		const file = fileList[0]
		console.log("origin file===>", file)
		const fileName = (file.name || "").split(".")[0] || ""
		const fileRead = new FileReader();
		const that = this
		fileRead.onloadend = function (event) {
			if (this.result) {
				that.setState({
					originImage: this.result as string
				}, () => {
					const mimeType = "image/jpeg"
					const quality = 0.8
					compressImage(this.result as string, 200, mimeType, quality).then((res) => {
						const newImage = new File([res], fileName, {
							type: mimeType,
							lastModified: Date.now()
						})
						const RD = new FileReader();
						RD.onloadend = function () {
							if (this.result) {
								that.setState({
									compressedImage: this.result as string
								})
							}
						}
						RD.readAsDataURL(res)

						console.log("compressedImage===>", newImage)
					}).catch((err: any) => {
						console.log("图片压缩失败===>", err)
					})
				})
			}
		}
		fileRead.readAsDataURL(file);
	}
	render() {
		console.log("自己消费默认值Context-render==>", this.context)
		const {
			originImage,
			compressedImage
		} = this.state
		return (
			<div>
				<div>
					{
						compressedImage ? <img src={compressedImage} alt="" /> : null
					}
					{
						originImage ? <img src={originImage} alt="" /> : null
					}

				</div>
				<input type="file" multiple onChange={this.onUploadFile} />
				<button onClick={this.onChangeContext}>
					change context
				</button>
				<Toolbar type="first level" />
				<Tooltip type="first level" />
				<ThemeContext.Provider value={this.state.context}>
					Context
					<Toolbar type="child level" />
					<Tooltip type="child level" />
				</ThemeContext.Provider>
			</div>
		);
	}
}
export default Context;