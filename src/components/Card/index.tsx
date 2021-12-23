import * as React from "react"
import styles from "./index.module.scss"

interface IProps {
    title?: string
    children?: React.ReactNode
    className?: string
}
function Card(props: IProps) {
    const {
        title,
        children = null,
        className = ""
    } = props
    return (
        <div className={`flex flex-column ${styles.card} ${Boolean(className) ? className : ""}`}>
            {
                Boolean(title) ?
                    <span className={styles.title}>
                        {
                            title
                        }
                    </span> : null
            }
            {
                children
            }
        </div>
    )
}

export default Card