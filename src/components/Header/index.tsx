import * as React from 'react';
import styles from './index.module.scss';

const BREAD_CRUMBS_PREFIX = 'Monkey的小屋';
const LOGOUT_LABEL = '退出';

interface IProps {
    title: string;
    name: string;
    onSwitchSidebar?: () => void;
    onLogout?: () => void
}
export default function Header(props: IProps) {
    const {
        onSwitchSidebar,
        onLogout,
        title,
        name
    } = props;

    function onSwitch() {
        if (typeof onSwitchSidebar === 'function') {
            onSwitchSidebar();
        }
    }

    function onOut() {
        if (typeof onLogout === 'function') {
            onLogout()
        }
    }

    return (
        <div className={styles.header}>
            <span className={styles.logo}>
            </span>
            <span className={styles.hide}
                onClick={onSwitch}>
            </span>
            <span className={styles['title-info']}>
                <span className={styles.platform}>
                    {
                        BREAD_CRUMBS_PREFIX
                    }
                </span>
                <span className={styles.title}>
                    {
                        title
                    }
                </span>
            </span>
            <span className={styles['staff-info']}>
                <span className={styles.portrait}>
                </span>
                <span className={styles.name}>
                    {
                        name || 'default'
                    }
                </span>
                <span className={styles.logout}
                onClick={onOut}>
                    {
                        LOGOUT_LABEL
                    }
                </span>
            </span>
        </div>
    )
}