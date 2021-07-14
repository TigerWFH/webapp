import * as React from "react"
import Demo1 from "./components/Demo1"
import Rect from "./components/Rect"
import Path from "./components/Path"
import styles from "./index.module.scss"

export default function Canvas(props: any) {
    
    return (
        <div className={styles.canvas}>
            <div className={styles.container}>
                <Path className={styles.component}/>
            </div>
            <div className={styles.container}>
                <Rect className={styles.component}/>
            </div>
            <div className={styles.container}>
                <Demo1 className={styles.component}/>
            </div>
        </div>
    )
}