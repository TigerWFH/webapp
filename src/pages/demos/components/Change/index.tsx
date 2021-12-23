import * as React from "react"
import styles from "./index.module.scss"

class Change extends React.Component<any, any> {
    render() {
        return (
            <div className={styles.change}>
                "render"
                <div className={styles.content}>
                    <span>CSS transform</span>
                    <div className={styles.transform}>
                        transform
                    </div>
                    <div className={styles.transform1}>
                        transform1
                    </div>
                </div>
            </div>
        )
    }
}

export default Change