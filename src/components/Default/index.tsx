import * as React from 'react';
import styles from './index.module.scss';

interface IDefault {

}

function Default(props: IDefault) {
    return (
        <div className={`flex flex-center ${styles.default}`}>
            <div className={`flex  ${styles.container}`}>
                <div className={`flex-1 flex flex-center ${styles.animation}`}>
                    Loading
                </div>
            </div>
        </div>
    )
}

export default Default;