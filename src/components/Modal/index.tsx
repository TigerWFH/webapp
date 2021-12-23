import React, { Component } from 'react';
import { ReactTree } from 'Components/Portal';
import Text from 'Components/Text';
import Line from 'Components/Line';
import styles from './index.module.scss';

interface IProps {
    header?: React.ReactChild;
    className?: string;/* 用来改变header样式 */
    content?: React.ReactChild;
    footer?: React.ReactChild;
}
class Modal extends Component<IProps, never> {
    static mount = function (props: IProps) {
        ReactTree.mount({
            content: <Modal {...props} />
        });
    }

    static unmount = function () {
        ReactTree.unmount();
    }
    renderHeader() {
        if (!this.props.header) {
            return null;
        }

        return (
            <div className={`flex flex-center ${styles.header}`}>
                {
                    this.props.header
                }
            </div>
        )
    }

    renderContent() {
        const {
            content
        } = this.props;
        if (typeof content === 'string' || typeof content === 'number') {
            return <Text>
                {
                    content
                }
            </Text>
        }

        return content;
    }

    renderFooter() {
        if (this.props.footer) {
            return (
                <div className={`flex ${styles.footer}`}>
                    {
                        this.props.footer
                    }
                </div>
            )
        }

        return <div className={`flex ${styles.footer}`}>
            <span>
                button
            </span>
        </div>
    }
    render() {
        const {
            header
        } = this.props;
        return (
            <div className={`flex flex-column ${styles.modal}`}>
                {
                    this.renderHeader()
                }
                {
                    header ? <Line /> : null
                }
                <div className={`flex-1 flex ${styles.content}`}>
                    {
                        this.renderContent()
                    }
                </div>
                <Line />
                {
                    this.renderFooter()
                }
            </div>
        )
    }
}

export default Modal;