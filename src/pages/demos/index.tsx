import * as React from 'react';
import { connect } from 'react-redux';
// import Font from './components/Font';
// import GPS from './components/GPS';
// import IconFont from 'Components/IconFont';
// import Carousel from "Components/Carousel"
import Tabs, { TabPanel } from 'Components/Tabs';
// import Lines from "./components/Lines"
// import Change from "./components/Change"
// import Lazy from "./components/Lazy"
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// import styles from "./index.module.scss"
import actions from './controller/actions';
// import home from '../home';
// const MOCK_TABS_LIST = [
//     {
//         key: 0,
//         name: "热门推荐",
//         title: "热门推荐"
//     },
//     {
//         key: 1,
//         name: "商品商品",
//         title: "商品商品"
//     },
//     {
//         key: 2,
//         name: "家具用品",
//         title: "家具用品"
//     },
//     {
//         key: 3,
//         name: "服装服饰",
//         title: "服装服饰"
//     },
//     {
//         key: 4,
//         name: "热门推荐4",
//         title: "热门推荐"
//     },
//     {
//         key: 5,
//         name: "商品商品5",
//         title: "商品商品"
//     },
//     {
//         key: 6,
//         name: "家具用品6",
//         title: "家具用品"
//     },
//     {
//         key: 7,
//         name: "服装服饰7",
//         title: "服装服饰"
//     },
// ]
// const MOCK_BANNER_LIST = [
//     {
//         key: 1,
//         image: "http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvyo52qj20u01hcqeq.jpg",
//         url: "http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvyo52qj20u01hcqeq.jpg"
//     },
//     {
//         key: 2,
//         image: "https://img-blog.csdnimg.cn/20201014180756925.png?x-oss-process=image/resize,m_fixed,h_64,w_64",
//         url: "https://img-blog.csdnimg.cn/20201014180756925.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
//     },
//     {
//         key: 3,
//         image: "http://ww3.sinaimg.cn/mw690/62aad664jw1f2nxvya0u2j20u01hc16p.jpg",
//         url: "http://ww3.sinaimg.cn/mw690/62aad664jw1f2nxvya0u2j20u01hc16p.jpg"
//     },
//     {
//         key: 4,
//         image: "http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvzfjv6j20u01hc496.jpg",
//         url: "http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvzfjv6j20u01hc496.jpg"
//     }
// ]
// const MOCK_DATA = [
//     {
//         key: "1",
//         src: "https://img-blog.csdnimg.cn/20201014180756925.png?x-oss-process=image/resize,m_fixed,h_64,w_64",
//         width: "300px",
//         height: "300px"
//     },
//     {
//         key: "2",
//         src: "http://ww3.sinaimg.cn/mw690/62aad664jw1f2nxvya0u2j20u01hc16p.jpg",
//         width: "300px",
//         height: "300px"
//     },
//     {
//         key: "3",
//         src: "http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvyo52qj20u01hcqeq.jpg",
//         width: "300px",
//         height: "300px"
//     },
//     {
//         key: "4",
//         src: "http://ww2.sinaimg.cn/mw690/62aad664jw1f2nxvz2cj6j20u01hck1o.jpg",
//         width: "300px",
//         height: "300px"
//     },
//     {
//         key: "5",
//         src: "http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvzfjv6j20u01hc496.jpg",
//         width: "300px",
//         height: "300px"
//     }
// ]

// const MOCK_NAVIGATION_DATA = [
//     [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
//     [11, 22, 33, 44, 55],
//     [111, 222, 333, 444, 555]
// ] as any
const containerStyle = {
  overflow: 'hidden'
};

// async function getEle() {
//     const result = await new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(1)
//         }, 1000)
//     })

//     console.log("result====>", result)
// }

// async function getEle2() {
//     const result = await new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject(2)
//         }, 1000)
//     })

//     console.log("result====>", result)
// }

// async function getEle3() {
//     const result = await new Promise((resolve, reject) => {
//         setTimeout(() => {
//             throw new Error("Error")
//             // reject(123)
//         }, 1000)
//     })

//     console.log("result====>", result)
// }

// function getEle4() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             throw new Error("Error")
//             resolve(123)
//             // reject(123)
//         }, 1000)
//     })
// }

interface IProps {
  [x: string]: any;
  history: any;
}
class Demos extends React.Component<IProps, never> {
  componentDidMount() {
    actions.requestGetYdyMallHomePage().then((res: any) => {
      const params: any = {
        categoryId: '热门推荐',
        outBizType: ''
      };
      actions.requestGetItems(params, true);
    });
  }

  onChangeTab = (tabIndex: any) => {
    const params = {
      categoryId: tabIndex,
      outBizType: ''
    };
    actions.requestGetItems(params, true);
  };

  onSendMessage = () => {
    console.log('sendmessage');
    // targetWindow是接手消息的窗口句柄
    // window.open指向打开的窗口
    // window.opener指向打开当前窗口的窗口
    window.opener.postMessage('123', 'http://localhost:3000');
    window.opener = null;
    window.close();
  };

  render() {
    console.log('demos-render333333===>', this.props);
    const {
      // bannerList = [],
      tabList = [],
      homePageStatus,
      activeName
    } = this.props;

    if (homePageStatus !== 'SUCCESS') {
      return 'default';
    }
    return (
      <div style={containerStyle}>
        <button onClick={this.onSendMessage}>send message</button>
        {/* <Carousel autoPlay={true}
                    dotType="bottom">
                    {
                        bannerList.map((metadata: any, index: number) => {
                            return (
                                <div key={index}>
                                    <img width={"100%"} src={metadata.image} />
                                </div>
                            )
                        })
                    }
                </Carousel> */}
        <Tabs defaultActiveName={activeName} onChange={this.onChangeTab}>
          {tabList.map((tab: any, index: number) => {
            const commodityList = this.props[tab.name];
            return (
              <TabPanel key={tab.id} name={tab.name} title={tab.title}>
                {/* {
                                    console.log("TabPanel children===>", commodityList)
                                } */}
                {`${index}-commodityList-${commodityList.length}`}
                {commodityList.map((commodity: any, index: number) => {
                  return <div key={index}>{commodity.title}</div>;
                })}
              </TabPanel>
            );
          })}
        </Tabs>
        {/* {
                    MOCK_DATA.map((image: any) => {
                        return <LazyLoadImage wrapperClassName={styles.img}
                            threshold={100}
                            {...image}
                            effect="flur"
                            placeholderSrc="Loading" />
                    })
                } */}

        {/* <LazyLoadImage src="https://static.test.pdc.com/image/T1OxdlB7KT1RCvBVdK?img=/rs,w_200,h_200/tf,q_70" /> */}
        {/* <LazyLoadImage src="http://ww3.sinaLazyLoadImage.cn/mw690/62aad664jw1f2nxvya0u2j20u01hc16p.jpg" />
                    <LazyLoadImage src="http://ww1.sinaLazyLoadImage.cn/mw690/62aad664jw1f2nxvyo52qj20u01hcqeq.jpg" />
                    <LazyLoadImage src="http://ww2.sinaLazyLoadImage.cn/mw690/62aad664jw1f2nxvz2cj6j20u01hck1o.jpg" />
                    <LazyLoadImage src="http://ww1.sinaLazyLoadImage.cn/mw690/62aad664jw1f2nxw0e1mlj20u01hcgvs.jpg" />
                    <LazyLoadImage src="http://ww4.sinaLazyLoadImage.cn/mw690/62aad664jw1f2nxw0p95dj20u01hc7d8.jpg" />
                    <LazyLoadImage src="http://ww2.sinaLazyLoadImage.cn/mw690/62aad664jw1f2nxw134xqj20u01hcqjg.jpg" /> */}
        {/* <Lazy /> */}
      </div>
    );
  }
}

export default connect((state: any) => {
  const { demos } = state;

  return demos;
})(Demos);
