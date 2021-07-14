/*
    CSS global：inherit、initial、unset
    hyphens：[none, manual, auto](草案阶段)，连字符
    word-break：[normal, break-all, keep-all，break-word(被弃用，作用同word-wrap,但仍然有效)]，1、断行处是否应该出现在一个词中
        normal：Non-CJK文本在word中间不断行且换行，CJK文本断行
        keep-all：Non-CJK文本在word中间不断行且换行，CJK文本不断行
        break-all：Non-CJK文本在word中间断行且不换行，CJK文本断行

        word-break：Non-CJK文本中的word中间断行且换行，CJK文本断行
    word-wrap（overflow-wrap，别名是word-wrap）：[normal, anywhere, break-word]，1、控制长度超过一行的单词是否被拆分换行
        normal（anywhere）：Non-CJK文本在word中间不断行且不换行（同keep-all）
        break-word：Non-CJK文本在word中间断行且换行（同word-break）
    white-space：[normal, nowrap, pre, pre-wrap, pre-line]，1、控制空白字符的展示；2、控制换行(主要用于CJK？)
    text-overflow：[clip, ellipsis]
*/
import * as React from 'react';
import styles from './index.module.scss';

// 这个组件是个伪省略，指定高度时，在安卓手机上会露出很少的折行文本的顶部，单行建议使用SingleLineText

interface ISingleLineProps {
    className?: string
    children?: any
}
export function SingleLineText(props: ISingleLineProps) {
    return (
        <span className={`${styles.single} ${props.className}`}>
            {
                props.children
            }
        </span>
    )
}

interface IProps {
    numberOfLines?: number;
    className?: string;
    children?: React.ReactChild;
    style?: any
}
function Text(props: IProps) {
    const {
        numberOfLines,
        className,
        children,
        style = {},
        ...rest
    } = props;
    const final = Number(numberOfLines) > 0
        ? styles['limited-text']
        : styles['text'];
    return (
        <span className={`${final} ${className || ''}`}
            style={{ WebkitLineClamp: props.numberOfLines, ...style }}
            {...rest}>
            {
                children
            }
        </span>
    )
}

export default Text;