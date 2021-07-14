import * as React from 'react';
import styles from './index.module.scss';

interface IProps {
    className?: string;
    children?: any;
}

export default function View(props: IProps) {
    return (
        <div className={`${styles.view} ${props.className}`}>
            {
                props.children
            }
        </div>
    )
}