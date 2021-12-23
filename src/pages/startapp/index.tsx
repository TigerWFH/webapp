import * as React from 'react'
import styles from './index.module.scss'
import Line from 'Components/Line'

interface IProps {}
function startApp(props: IProps) {

	function onOpenAlipay() {
		window.location.href = 'alipays://'
	}
	return (
		<div>
			<Line />
			启动app
			<div>
				<div className={styles.startapp}>
					<a href='weixin://'>
						打开微信
					</a>
				</div>
				<div className={styles.startapp}>
					<a href='alipays://'>
						打开支付宝
					</a>
				</div>
				<div className={styles.startapp}
					onClick={onOpenAlipay}>
					打开支付宝
				</div>
			</div>
		</div>
	)
}
export default startApp;