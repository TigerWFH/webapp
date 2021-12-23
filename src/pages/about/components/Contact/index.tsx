import * as React from 'react';
import styles from './index.module.scss';

const HELLO = '打个招呼';
const PLACE = '上海';
const FRIEND = '新朋友';
const FUNNY = '有趣';
const TOUCH_ME = '如何找到我';
const MOBILE = '+8617612151221';
const EMAIL = '334080374@qq.com';

function Contact() {
    return (
        <div className={`flex flex-column flex-center ${styles.contact}`}>
                <span className={`flex flex-column flex-center ${styles.hello}`}>
                    {
                        HELLO
                    }
                </span>
                <div className={`flex flex-center-h flex-evenly ${styles.content}`}>
                    <div className={styles.hope}>
                        <div className={styles.want}>
                            目前常驻
                            <span>
                                {
                                    PLACE
                                }
                            </span>
                        </div>
                        <div className={styles.want}>
                            想结交
                            <span>
                                {
                                    FRIEND
                                }
                            </span>
                        </div>
                        <div className={styles.want}>
                            做<span>
                                {
                                    FUNNY
                                }
                            </span>
                            的事情
                        </div>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.tome}>
                            {
                                TOUCH_ME
                            }
                        </div>
                        <div className={styles.info}>
                            {
                                MOBILE
                            }
                        </div>
                        <div className={styles.info}>
                            {
                                EMAIL
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Contact;