import * as React from "react"
import { connect } from "react-redux"
import Text from "Components/Text"
import styles from "./index.module.scss"

const name = "陈曼曼陈漫漫漫漫"
const ALL_KEY = "ALL"
const MY_ORDER_TITLE = "我的订单"
// 待评价没有：COMMENT(待评价)
const ORDER_STATUS_MAP = new Map([
    ["WAITING_PAY", {
        icon: require("./res/pay.png"),
        label: "待付款",
    }],
    ["DELIVERED", {
        icon: require("./res/delivery.png"),
        label: "待收货",
    }],
    ["REFUNDED", {
        icon: require("./res/refunded.png"),
        label: "退款/售后",
    }],
    ["ALL", {
        icon: require("./res/allorder.png"),
        label: "全部订单",
    }]
])
// info
const INFO_MAP = new Map([
    ["address", {
        icon: require("./res/address.png"),
        label: "收货地址",
        url: ""
    }],
    ["service", {
        icon: require("./res/service.png"),
        label: "客服中心",
        url: ""
    }]
])
interface IProps {
    orderState: { [propName: string]: any }
}
class Mine extends React.Component<IProps, never> {
    onToOrderStatus = (status: string) => {
        console.log("status===>", status)
    }
    onToUrl = (info: any) => {
        console.log("url===>", info)
    }
    renderStatus = (count: number, status: string) => {
        const orderInfo: any = ORDER_STATUS_MAP.get(status) || {}
        return (
            <div key={status}
                onClick={this.onToOrderStatus.bind(null, status)}
                className={`flex flex-column flex-center-h ${status === ALL_KEY ? styles.all : styles.operationwrapper}`}>
                <img src={orderInfo.icon}
                    className={styles.icon}
                    alt="" />
                <span className={styles.label}>
                    {
                        orderInfo.label
                    }
                </span>
                <span className={styles.bubble}>
                    {
                        count
                    }
                </span>
            </div>
        )
    }
    renderAllStatus = () => {
        const {
            orderState = {}
        } = this.props
        // ALL_KEY样式需要单独处理
        const keyList: string[] = Array.from(ORDER_STATUS_MAP.keys()).filter((key: string) => key !== ALL_KEY)
        let allCount = 0
        return (
            <div className={`flex flex-between flex-center-h ${styles.orderwrapper}`}>
                <div className={`flex-1 flex`}>
                    {
                        keyList.map((key: string) => {
                            allCount = allCount + orderState[key]
                            return this.renderStatus(orderState[key], key)
                        })
                    }
                </div>
                {
                    this.renderStatus(allCount, ALL_KEY)
                }
            </div>
        )
    }
    renderInfo = (key: string, bLast: boolean) => {
        const info: any = INFO_MAP.get(key) || {}
        return (
            <div key={key}
                className={`flex flex-between flex-center-h ${bLast ? styles.lastwrapper : styles.linewrapper}`}>
                <div className={`flex-1 flex flex-center-h ${styles.container}`}
                    onClick={this.onToUrl.bind(null, info)}>
                    <img className={styles.image}
                        src={info.icon} alt="" />
                    <span className={styles.label}>
                        {
                            info.label
                        }
                    </span>
                </div>
                <img className={`flex-no-shrink`}
                    src={require("./res/right.png")}
                    alt="" />
            </div>
        )
    }
    renderAllInfo = () => {
        const keyList: string[] = Array.from(INFO_MAP.keys())
        return keyList.map((key: string, index: number) => {
            return this.renderInfo(key, index === (keyList.length - 1))
        })
    }
    render() {
        return (
            <div className={`flex flex-column ${styles.mine}`}>
                <div className={`flex flex-center-h ${styles.portraitwrapper}`}>
                    <div className={`flex flex-center flex-center-h ${styles.portrait}`}>
                        <img src={require("./res/portrait.png")}
                            alt=""
                        />
                    </div>
                    <Text className={styles.name}>
                        {
                            name
                        }
                    </Text>
                </div>
                <div className={`${styles.orderwrapper}`}>
                    <Text className={styles.title}
                        numberOfLines={1}>
                        {
                            MY_ORDER_TITLE
                        }
                    </Text>
                    {
                        this.renderAllStatus()
                    }
                </div>
                <div className={`${styles.infowrapper}`}>
                    {
                        this.renderAllInfo()
                    }
                </div>
            </div>
        )
    }
}

export default connect((state: any) => {
    const { mine } = state

    return mine
})(Mine)