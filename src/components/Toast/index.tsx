import * as React from 'react';
import { ReactTree } from "../Portal"
import styles from './index.module.scss';

let timer: any = null

interface IProps {
    message: string
    delayTime?: number // 单位是秒(s)
}
class Toast extends React.Component<IProps, never> {
    static mount(props: IProps) {
        const {
            delayTime = 3,
            ...rest
        } = props
        ReactTree.mount({
            content: <Toast {...rest} />,
            bMask: false
        })
        if (timer !== null) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            Toast.unmount()
        }, delayTime * 1000)
    }

    static unmount() {
        if (timer !== null) {
            clearTimeout(timer)
            timer = null
        }
        ReactTree.unmount()
    }

    render() {
        return (
            <div className={"flex-1 flex flex-center flex-center-h"}>
                <div className={`flex flex-center ${styles.toast}`}>
                    {
                        this.props.message
                    }
                </div>
            </div>
        )
    }
}

export default Toast;