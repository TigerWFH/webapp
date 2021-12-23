import * as React from "react"
import Text from "Components/Text"
import Swiper from "../Swiper"
import styles from "./index.module.scss"
const MOCK_DATA = [
    [
        {
            key: "1",
            id: "1",
            title: "mouse",
            img: "",
            url: "mouse"
        },
        {
            key: "2",
            id: "2",
            title: "bull",
            img: "",
            url: "bull"
        },
        {
            key: "3",
            id: "3",
            title: "tiger",
            img: "",
            url: "tiger"
        },
        {
            key: "4",
            id: "4",
            title: "rabbit",
            img: "",
            url: "rabbit"
        },
        {
            key: "5",
            id: "5",
            title: "dragon",
            img: "",
            url: "dragon"
        },
        {
            key: "6",
            id: "6",
            title: "snak",
            img: "",
            url: "snake"
        },
        {
            key: "7",
            id: "7",
            title: "horse",
            img: "",
            url: "horse"
        },
        {
            key: "8",
            id: "8",
            title: "goat",
            img: "",
            url: "goat"
        },
        {
            key: "9",
            id: "9",
            title: "monkey",
            img: "",
            url: "monkey"
        },
        {
            key: "10",
            id: "10",
            title: "rooster",
            img: "",
            url: "rooster"
        }
    ],
    [
        {
            key: "11",
            id: "11",
            title: "1mouse",
            img: "",
            url: "mouse"
        },
        {
            key: "22",
            id: "22",
            title: "2bull",
            img: "",
            url: "bull"
        },
        {
            key: "33",
            id: "33",
            title: "3tiger",
            img: "",
            url: "tiger"
        },
        {
            key: "44",
            id: "44",
            title: "4rabbit",
            img: "",
            url: "rabbit"
        },
        {
            key: "55",
            id: "55",
            title: "5dragon",
            img: "",
            url: "dragon"
        }
    ]
]
interface IProps {
    history?: any
    scrollThreshold?: number
    data?: any[]
    onToTarget?: (navigation: any) => void
}

export class Navigation extends React.Component<IProps, any> {
    onToBall = (navigation: any) => {
        console.log("ball--->", navigation)
    }
    render() {
        const { data = MOCK_DATA, ...rest } = this.props
        return <Swiper showDotFlag={"bottom"} {...rest}>
            {
                data.map((itemList: any, index: number) => {
                    return <div key={index}
                        data-height={Math.floor(itemList.length / 5)}
                        className={styles.frame} >
                        {
                            itemList.map((navigation: any, order: number) => {
                                return (
                                    <div key={navigation.key}
                                        data-spm-content={true}
                                        data-spm-position={order + 1}
                                        onClick={this.onToBall.bind(null, navigation)}
                                        className={styles.info} >
                                        <img src={navigation.img}
                                            alt="logo"
                                            className={styles.image} />
                                        <Text numberOfLines={1}
                                            className={styles.title}>
                                            {
                                                navigation.title
                                            }
                                        </Text>
                                    </div>
                                )
                            })
                        }
                    </div>
                })
            }
        </Swiper>
    }
}

export default Navigation