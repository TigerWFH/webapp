import * as React from 'react';
import { ReactTree } from "Components/Portal"
import styles from './index.module.scss'

export function LoadingV2(props: any) {
    return (
        <div className={`flex-1 flex flex-center flex-center-h`}>
            <div className={styles.root}>
                <div className={styles.square} />
            </div>
        </div>
    )
}
LoadingV2.mount = () => {
    ReactTree.mount({
        content: <LoadingV2 />,
        bMask: true
    })
}
LoadingV2.unmount = () => {
    ReactTree.unmount()
}

function Loading(props: any) {
    return (
        <div className={`flex-1 flex flex-center flex-center-h`}>
            <img
                src={require("./loading.gif")}
                alt="" />
        </div>
    )
}

Loading.mount = () => {
    ReactTree.mount({
        content: <Loading />,
        bMask: true
    })
}
Loading.unmount = () => {
    ReactTree.unmount()
}

export default Loading;