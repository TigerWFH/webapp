import * as React from "react"
// import TFSImage from "Components/TFSImage"
import Swiper from "../Swiper"
import styles from "./index.module.scss"
// import RouteUtil from "Utils/routeUtil";

const MOCK_BANNER_LIST = [
    {
        key: 1,
        img: "https://static.test.dc.com/image/T1OYCbBQKP1RCvBVdK?img=/tf,q_70",
        url: "https://static.test.dc.com/image/T1OYCbBQKP1RCvBVdK?img=/tf,q_70"
    },
    {
        key: 2,
        img: "https://static.test.dc.com/image/T1yfAg3yhT1RydL0tj?img=/tf,q_70",
        url: "https://static.test.dc.com/image/T1OYCbBQKP1RCvBVdK?img=/tf,q_70"
    },
    {
        key: 3,
        img: "https://static.test.dc.com/image/T1LQVg3yhT1RyWaeoq?img=/tf,q_70",
        url: "https://static.test.dc.com/image/T1OYCbBQKP1RCvBVdK?img=/tf,q_70"
    },
    {
        key: 4,
        img: "https://static.test.dc.com/image/T1OYCbBQKP1RCvBVdK?img=/tf,q_70",
        url: "https://static.test.dc.com/image/T1OYCbBQKP1RCvBVdK?img=/tf,q_70"
    }
]
interface IProps {
    bannerList?: any[],
}
export default function Banner(props: IProps) {
    const { bannerList = MOCK_BANNER_LIST } = props
    if (!Boolean(bannerList.length)) {
        return null
    }
    function onToBanner(banner: any) {
        console.log("banner===>", banner)
        // RouteUtil.goTo(banner.url)
    }
    function child() {
        return bannerList.map((banner: any, index: number) => {
            return (
                <div key={banner.key}
                    data-spm-content={true}
                    data-spm-pos={`${index + 1}`}
                    className={styles.imgContainer}
                    onClick={onToBanner.bind(null, banner)} >
                    <img src={banner.img}
                        alt=""
                        className={styles.img} />
                </div>
            )
        })
    }

    return (
        <div className={styles.banner}>
            <Swiper autoPlay={true}
                data-spm="advertising"
                frameHeight={90}
                showDotFlag={"cover"}>
                {
                    child()
                }
            </Swiper>
        </div>
    )
}