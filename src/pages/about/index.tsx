import * as React from 'react';
import styles from './index.module.scss';

import Profile from './components/Profile';
import Technology from './components/Technology';
import Experience from './components/Experience';
import Contact from './components/Contact';

class About extends React.Component<any, any> {
	root: any;
	constructor(props: any) {
		super(props)
		this.state = {
			count: 1,
			start: "",
			end: ""
		}
	}
	toNextPage = () => {
		let height = this.root.clientHeight;
		this.root.scrollTop += height + 10;
	};

	componentDidMount() {
		// let ret = window.getComputedStyle(this.root, null)
		let root = this.root
		while (root && root !== document) {
			console.log("parent==>", root.style.overflowY)
			root = root.parentNode
		}

		this.setState({
			start: this.root.style.overflowY
		})
	}
	componentWillUnmount() {
		console.log("About unmount===========>")
	}

	onStart = (e: any) => {
		this.root.style.overflowY = "hidden"
	}
	onEnd = (e: any) => {
		this.root.style.overflowY = "auto"
		this.setState({
			end: this.root.style.overflowY
		})
	}
	onMove = (e: any) => {
		this.setState((state: any) => {
			return {
				count: state.count + 1
			}
		})
	}

	render() {
		return (
			<div id="about"
				className={styles.about}
				style={{ overflowY: "scroll" }}
				ref={(root) => { this.root = root; }}
			>
				<Profile />
				<Technology />
				<Experience />
				<Contact />
			</div>
		);
	}
}

export default About;
