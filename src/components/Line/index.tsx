/*
    https://zhuanlan.zhihu.com/p/34908005
    预备知识：
        物理像素：屏幕分辨率
        设备独立像素：点分辨率（CSS的px）
        设备像素比：设备像素比 = 物理像素 / 设备独立像素
    实现物理1px细线方案：

    1、图片方案（border-image， background-image）：
        优点：可以设置单条、多条表框
        缺点：更换颜色样式麻烦，某些设备会模糊（确定不是图片缩放造成的？？？？？？）
    2、box-shadow边框阴影模拟方案：
        优点：代码少，兼容性好
        缺点：边框有阴影，有色差
    3、transform（伪元素，正常元素）方案：
        构建一个伪元素border设为1px，缩放50%
        优点：可以满足很多场景
        缺点：transform缩放，线变糊
        备注：正常元素模拟边框缩放，子元素也会被缩放，字体也会被缩放，很难还原字体，======边框也直接使用伪元素边框模拟，解决子元素缩放问题
    4、border: 0.5px方案
        优点：很完美
        缺点：安卓与低版本IOS不适用,2014年，IOS8和OS X Yosemite支持0.5px边框
*/ 
import * as React from 'react';
import styles from './index.module.scss';

interface IProps {
    className?: string;
}

export default function Line(props: IProps) {
    return (
        <div className={styles.line}>
            <span className={`${styles.content} ${props.className || ''}`}/>
        </div>
    )
}