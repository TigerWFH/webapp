import * as React from 'react';
import styles from "./index.module.scss"
import Text, { SingleLineText } from "Components/Text"
interface IState {
    time: number;
}
export default class Blog extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            time: 1
        };
    }
    componentDidMount() {
        let time = window.devicePixelRatio;
        if (!time) {
            time = 1;
        }
        this.setState({
            time
        });
    }
    render() {
        return (
            <div className={styles.blog}>

                <div className={styles.group}>
                    <span>测试Text和SingleLineText组件</span>
                    <div className={styles.cell}>

                        <Text numberOfLines={2}>
                            我们是共产主义接班人。明月几时有，把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。
                        </Text>
                    </div>
                    <div className={styles.cell}>
                        <Text numberOfLines={2} style={{ height: "50px" }}>
                            指定高度的bug。我们是共产主义接班人。明月几时有，把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。
                        </Text>
                    </div>
                    <div className={styles.cell}>
                        <SingleLineText>
                            我们是共产主义接班人。明月几时有，把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。
                        </SingleLineText>
                    </div>
                </div>
            </div>
        )
    }
    // render() {
    //     const { time } = this.state;
    //     return (
    //         <div style={{ fontSize: `${time * 12}px` }}>
    //             {/* <h1>
    //                 {
    //                     `字体根据设备像素比大小变化:${time}`
    //                 }
    //             </h1>
    //             <span>
    //                 我们是共产主义接班人。明月几时有，把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。
    //             </span>
    //             <span>
    //                 hello, world! this is a wonderful world.
    //             </span> */}
    //         </div>
    //     )
    // }
}