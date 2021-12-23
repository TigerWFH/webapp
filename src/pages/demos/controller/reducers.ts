import { AnyAction } from "redux"
import * as t from "./types"

const MOCK_BANNEL_LIST = [
    {
        key: 1,
        image: "https://static.test.dc.com/image/T1OYCbBQKP1RCvBVdK?img=/tf,q_70",
        url: "https://static.test.dc.com/image/T1OYCbBQKP1RCvBVdK?img=/tf,q_70"
    },
    {
        key: 2,
        image: "https://img-blog.csdnimg.cn/20201014180756925.png?x-oss-process=image/resize,m_fixed,h_64,w_64",
        url: "https://img-blog.csdnimg.cn/20201014180756925.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
    },
    {
        key: 3,
        image: "https://static.test.dc.com/image/T1AX__3CYT1RCvBVdK?img=/tf,q_70",
        url: "https://static.test.dc.com/image/T1AX__3CYT1RCvBVdK?img=/tf,q_70"
    },
    {
        key: 4,
        image: "https://static.test.dc.com/image/T1zWdlBQbT1RCvBVdK?img=/tf,q_70",
        url: "https://static.test.dc.com/image/T1zWdlBQbT1RCvBVdK?img=/tf,q_70"
    }
]
const MOCK_TAB_LIST = [
    {
        key: 0,
        name: "热门推荐",
        title: "热门推荐"
    },
    {
        key: 1,
        name: "商品商品",
        title: "商品商品"
    },
    {
        key: 2,
        name: "家具用品",
        title: "家具用品"
    },
    {
        key: 3,
        name: "服装服饰",
        title: "服装服饰"
    },
    {
        key: 4,
        name: "热门推荐4",
        title: "热门推荐"
    },
    {
        key: 5,
        name: "商品商品5",
        title: "商品商品"
    },
    {
        key: 6,
        name: "家具用品6",
        title: "家具用品"
    },
    {
        key: 7,
        name: "服装服饰7",
        title: "服装服饰"
    },
]
const MOCK_COMMODITY_LIST = [
    {
        id: 1,
        image: "https://static.test.dc.com/image/T1zWdlBQbT1RCvBVdK?img=/tf,q_70",
        title: "洁丽雅毛巾2条 纯棉洗脸家用成人男女不掉毛柔软全棉吸水加厚面面面面",
        price: "￥5656565656565656565656565656565656565656565656565656565656565656.9",
        strikethroughPrice: "￥ 565656565656565656565656565656565656565656565656565656565656565652.9",
        salesVolume: "销量 3309330933093309",
        profit: "￥123112311213231313230.69"
    },
    {
        id: 2,
        image: "https://static.test.dc.com/image/T1zWdlBQbT1RCvBVdK?img=/tf,q_70",
        title: "洁丽雅毛巾2条",
        price: "￥56.9",
        strikethroughPrice: "￥ 52.9",
        salesVolume: "销量 3309",
        profit: "￥0.69"
    },
    {
        id: 3,
        image: "https://static.test.dc.com/image/T1zWdlBQbT1RCvBVdK?img=/tf,q_70",
        title: "洁丽雅毛巾2条 纯棉洗脸家用成人男女不掉毛柔软全棉吸水加厚面面面面",
        price: "￥56.9",
        strikethroughPrice: "￥ 52.9",
        salesVolume: "销量 3309",
        profit: "￥0.69"
    },
    {
        id: 4,
        image: "https://static.test.dc.com/image/T1zWdlBQbT1RCvBVdK?img=/tf,q_70",
        title: "洁丽雅毛巾2条",
        price: "￥56.9",
        strikethroughPrice: "￥ 52.9",
        salesVolume: "销量 3309",
        profit: "￥0.69"
    }
]

// interface ICommodity {
//     commodityList: any[]
//     pageSize: number
//     pageNo: number
//     total: number
// }
interface IInitial {
    bannerList: any[]
    tabList: any[]
    // cacheCommodityObj?: { [propName: string]: ICommodity }
    // commodityList: any[]
    // total: number
    // pageSize: number
    // pageNo: number
    activeName: string | undefined
    homePageStatus: string
    [propName: string]: any
}
export const initialState: IInitial = {
    bannerList: [],
    tabList: [],
    // cacheCommodityObj: {},
    // commodityList: [],
    // total: 0,
    // pageNo: 0,
    // pageSize: 0,
    activeName: undefined,
    homePageStatus: "INITIAL"
}

export default function (state: any = initialState, action: AnyAction) {
    switch (action.type) {
        case t.GET_HOME_PAGE_SUCCESS: {
            const bannerList = MOCK_BANNEL_LIST
            const tabList = MOCK_TAB_LIST
            const activeName = MOCK_TAB_LIST[0].name

            const target: any = {}
            tabList.forEach((tab: any) => {
                target[tab.name] = []
            })
            return {
                ...state,
                bannerList,
                tabList,
                activeName,
                ...target,
                homePageStatus: "SUCCESS"
            }
        }
        case t.GET_HOME_PAGE_FAILURE: {
            return {
                ...state,
                homePageStatus: "FAILURE",
                bannerList: [],
                tabList: [],
                activeName: undefined
            }
        }
        case t.GET_ITEM_SUCCESS: {
            const {
                categoryId
            } = action.payload
            const newCommodityList = MOCK_COMMODITY_LIST
            
            return {
                ...state,
                [categoryId]: newCommodityList
            }
        }
        case t.GET_ITEM_FAILURE: {
            // 请求失败，保持原状
            return {
                ...state
            }
        }
        default:
            return state
    }
}