// 声明式Portal
import React, { Component } from 'react';
import {
    createPortal,
    render,
    unmountComponentAtNode
} from 'react-dom';
import styles from './index.module.scss';

interface IPortal {
    show: boolean;
    children?: React.ReactNode;
    bMaskClose?: boolean;
    bMask?: boolean;
    onClose?: () => any;
}

export default class Portal extends Component<IPortal, any> {
    container: Element | unknown;
    displayName: string;
    constructor(props: IPortal) {
        super(props);
        this.container = document.createElement('div');
        this.displayName = "monkey wong's Portal"
    }

    onClose = () => {
        const { bMaskClose, onClose } = this.props;
        if (bMaskClose && typeof onClose === 'function') {
            onClose();
        }
    };

    componentDidMount() {
        if (!this.container) {
            this.container = document.createElement('div');
        }
        document.documentElement &&
            document.documentElement.appendChild(this.container as Element);
    }

    componentWillUnmount() {
        if (this.container) {
            document.documentElement &&
                document.documentElement.removeChild(this.container as Element);
            this.container = null;
        }
    }

    render() {
        const { children, bMask, show } = this.props;
        if (!show) {
            return null;
        }

        const elem = (
            <div
                className={`${bMask ? styles.mask : styles.portal}`}
                onClick={this.onClose}
            >
                {children}
            </div>
        );
        return createPortal(elem, this.container as Element);
    }
}

/*
    使用ReactTree模拟Portal，这是一个独立的ReactTree
*/
let container: Element | unknown;
interface IProps {
    content: React.ReactNode;
    bMask?: boolean;
    onClose?: () => void;
}
export class ReactTree extends Component<IProps, never> {
    displayName: string;
    constructor(props: IProps) {
        super(props)
        this.displayName = "monkey wong's Portal"
    }
    static mount(props: IProps) {
        if (!container) {
            container = document.createElement('div');
            document.body.appendChild(container as Element);
        }

        render(<ReactTree {...props} />, container as Element,); /** 最新版：返回void，无法获取实例*/
    }

    static unmount() {
        if (container) {
            unmountComponentAtNode(container as Element);
        }
    }

    render() {
        const { content, bMask } = this.props;

        return (
            <div className={`${bMask ? styles.mask : styles.portal}`}>{content}</div>
        );
    }
}
