import * as React from 'react';
import styles from './index.module.scss';

interface IItemProps {
    history: any;
    title: string;
    href: string;
}
function Item(props: IItemProps) {
    const {
        history,
        title,
        href
    } = props;
    function onClick() {
        if (history.location.pathname === href) {
            return;
        }
        history.push(href);
    }
    return (
        <div className={styles.item}
            onClick={onClick}>
            {
                title
            }
        </div>
    )
}

interface IProps {
    itemList: Array<{
        href: string;
        title: string;
    }>;
    history: any;
    bSidebar: boolean;
}

class Sidebar extends React.Component<IProps, never> {
    static defaultProps = {
        bSidebar: true
    };
    renderItem() {
        const {
            itemList,
            history
        } = this.props;

        return itemList.map((item, index) => {
            return <Item key={`${index}-${item.href}`}
                title={item.title}
                href={item.href}
                history={history} />
        })
    }

    render() {
        const { bSidebar } = this.props;
        return (
            <div className={`${styles.sidebar} ${bSidebar ? styles.show : styles.hide}`}>
                {
                    this.renderItem()
                }
            </div>
        )
    }
}

export default Sidebar;