import * as React from 'react';
import styles from './index.module.scss';

const TITLE_LABEL = "国内手机H5获取GOS测试";
const PHONE_1 = '港版IOS';
const PHONE_2 = '大陆版IOS';
const PHONE_3 = '华为大陆手机';
const PHONE_4 = '华为自带浏览器';
const PHONE_5 = '华为QQ浏览器';
const PHONE_6 = '华为UC浏览器';
const PHONE_7 = '百度数据（徐汇区平安大厦）';

function GPS(props: any) {
    return (
        <fieldset className={styles.field}>
            <legend className={styles.legend}>
                {
                    TITLE_LABEL
                }
            </legend>
            <div className={styles.sumary}>
                <span>
                    {
                        PHONE_1
                    }
                </span>
                <span>
                    <br />
                    纬度：31.1848 15726610754
                    <br />
                    经度：121.4520 5194767851
                </span>
            </div>
            <div className={styles.sumary}>
                <span>
                    {
                        PHONE_2
                    }
                </span>
                <span>
                    <br />
                    纬度：31.1848 1594222864
                    <br />
                    经度：121.4520 5068896756
                </span>
            </div>
            <div className={styles.sumary}>
                <span>
                    {
                        PHONE_3
                    }
                </span>
                <span>
                    <br />
                    纬度：31.1848 18
                    <br />
                    经度：121.4520 68
                </span>
            </div>
            <div className={styles.sumary}>
                <span>
                    {
                        PHONE_4
                    }
                </span>
                <span>
                    <br />
                    纬度：31.1848 22
                    <br />
                    经度：121.4520 51
                </span>
            </div>
            <div className={styles.sumary}>
                <span>
                    {
                        PHONE_5
                    }
                </span>
                <span>
                    <br />
                    纬度：31.1848 76
                    <br />
                    经度：121.4520 19
                </span>
            </div>
            <div className={styles.sumary}>
                <span>
                    {
                        PHONE_6
                    }
                </span>
                <span>
                    <br />
                    纬度：31.182761
                    <br />
                    经度：121.456563
                </span>
            </div>
            <div className={styles.sumary}>
                <span>
                    {
                        PHONE_7
                    }
                </span>
                <span>
                    <br />
                    纬度：31.189464
                    <br />
                    经度：121.462478
                </span>
            </div>
            <div className={styles.sumary}>
                知识储备：
                    目前主要有两种GPS坐标系，一个是世界通用的WGS84坐标系；一个是中国国家标准GCJ02坐标系；
                    厂商可以根据需要自行使用WGS84、GCJ02或者基于前两者的自家坐标系系统，国内地图厂商一定是基于
                    GCJ02坐标系，例如百度的BD09坐标系是在GCJ02基础上再加偏移完成的
                结论：
                <br />
                1、国内包括香港所有地图厂商数据都符合国家标准，即返回基于GCJ02坐标系下的数据或再加偏移的数据
                2、所有GPS设备返回的都是WGS84坐标系数据
            </div>
        </fieldset>
    )
}

export default GPS;