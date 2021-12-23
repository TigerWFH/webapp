import * as React from 'react';
import styles from './index.module.scss';
import typeUtils from '@/utils/typeUtils';

const DEFAULT_TITLE = '模板';
const SEARCH_LABEL = '请输入组件名称';

interface IGroupProps {
    groupName: string;
    elementList: React.ReactNode[]
    bCollapse?: boolean
    className?: string
}
function Group(props: IGroupProps) {
    const [bCollapse, setCollapse] = React.useState(props.bCollapse);
    const { groupName, elementList = [], className = "" } = props;
    function collapse() {
        setCollapse(!bCollapse);
    }
    return (
        <div className={styles.group}>
            <div className={bCollapse ? styles.title : styles.active} onClick={collapse}>
                <h3 className={styles.label}>
                    <abbr title={groupName} className={styles.abbr}>
                        {
                            groupName
                        }
                    </abbr>
                </h3>
            </div>
            {
                bCollapse ? <div className={`${styles.content} ${className}`}>
                    {
                        elementList.map((item, index) => (<span className={styles.wrapper} key={index}>
                            {
                                item
                            }
                        </span>))
                    }
                </div> : null
            }
        </div>
    )
}


interface IStencilData {
    [property: string]: React.ReactElement[]
}

interface IStencilGroupOptions {
    [property: string]: any;
}

interface IStencilProps {
    bSearch?: boolean
    title?: string
    data: IStencilData
    options?: IStencilGroupOptions
}
interface IStencilState {
    originData: IStencilData
    data: IStencilData
}
class Stencil extends React.Component<IStencilProps, IStencilState> {
    static defaultProps = {
        bSearch: true,
        title: DEFAULT_TITLE,
        data: {}
    }
    constructor(props: IStencilProps) {
        super(props);
        this.state = {
            originData: this.props.data,
            data: this.props.data
        }
    }

    onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchedText = e.target.value;
        const { originData } = this.state;
        if (searchedText) {
            if (typeUtils.isObject(originData)) {
                const newData: any = {};
                Object.keys(originData).forEach((key) => {
                    const dataList = originData[key] || [];
                    const tmp = dataList.filter((item) => {
                        const displayName = (item.type as any).displayName || '';
                        const name = (item.type as any).name || '';

                        return displayName.indexOf(searchedText) > -1 || name.indexOf(searchedText) > -1
                    })
                    if (tmp.length > 0) {
                        newData[key] = tmp
                    }
                })

                this.setState({
                    data: newData
                })
            }
        }
        else {
            this.setState({
                data: originData
            })
        }
    }

    renderStencilList = () => {
        const { data } = this.state;
        if (!data || !typeUtils.isObject(data)) {
            return null
        }
        const { options = {} } = this.props
        return Object.keys(data).map((stencil, index) => {
            return <Group key={`${stencil}-${index}`} groupName={stencil} elementList={data[stencil]} {...options} />
        })
    }

    render() {
        const { title, bSearch } = this.props
        return (
            <div className={styles.stencil}>
                <h3 className={styles.title}>
                    {
                        title
                    }
                </h3>
                {
                    bSearch ? <div className={styles.search}>
                        <input className={styles.input} placeholder={SEARCH_LABEL} onChange={this.onFilter} />
                    </div> : null
                }
                {
                    this.renderStencilList()
                }
            </div>
        )
    }
}

export default Stencil;