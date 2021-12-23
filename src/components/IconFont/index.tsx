import * as React from 'react';
import styles from './index.module.scss';
import glyph from './fonts';

interface IProps {
    icon: string;
    className?: string;
}
export default function IconFont(props: IProps) {
    const {
        icon,
        className
    } = props;
    return (
        <span className={`${styles.iconfont} ${className}`}>
            {
                glyph[icon]
            }
        </span>
    )
}