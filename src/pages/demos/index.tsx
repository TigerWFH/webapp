import * as React from 'react';
import { connect } from 'react-redux';
import Tabs, { TabPanel } from 'Components/Tabs';
import Carousel from 'Components/Carousel';
import IconFont from 'Components/IconFont';
import Font from './components/Font';
import GPS from './components/GPS';
import Lines from './components/Lines';
import Change from './components/Change';
import Lazy from './components/Lazy';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// import styles from "./index.module.scss"
import actions from './controller/actions';

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
      bannerList = [],
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
        <Tabs defaultActiveName="carousel">
          <TabPanel key="@carousel" name="carousel" title="carousel">
            <Carousel autoPlay={true} dotType="bottom">
              {bannerList.map((metadata: any, index: number) => {
                return (
                  <div key={index}>
                    <img width={'100%'} src={metadata.image} />
                  </div>
                );
              })}
            </Carousel>
          </TabPanel>
          <TabPanel key="@tabs" name="tabs" title="tabs">
            <Tabs defaultActiveName={activeName} onChange={this.onChangeTab}>
              {tabList.map((tab: any, index: number) => {
                const commodityList = this.props[tab.name];
                return (
                  <TabPanel key={tab.id} name={tab.name} title={tab.title}>
                    {`${index}-commodityList-${commodityList.length}`}
                    {commodityList.map((commodity: any, index: number) => {
                      return <div key={index}>{commodity.title}</div>;
                    })}
                  </TabPanel>
                );
              })}
            </Tabs>
          </TabPanel>
          <TabPanel key="@font" name="font" title="font">
            <div style={{ overflow: 'auto' }}>
              <Font />
            </div>
          </TabPanel>
          <TabPanel key="@gps" name="gps" title="gps">
            <GPS />
          </TabPanel>
          <TabPanel key="@iconfont" name="iconfont" title="iconfont">
            <IconFont icon="edit" />
            <Lines />
            <IconFont icon="delete" />
            <Lines />
            <IconFont icon="close" />
            <Lines />
            <IconFont icon="circle" />
            <Lines />
            <Change />
          </TabPanel>
          <TabPanel key="@lazy" name="lazy" title="lazy">
            <Lazy />
            <LazyLoadImage src="https://static.test.pdc.com/image/T1OxdlB7KT1RCvBVdK?img=/rs,w_200,h_200/tf,q_70" />
            <LazyLoadImage src="http://ww3.sinaLazyLoadImage.cn/mw690/62aad664jw1f2nxvya0u2j20u01hc16p.jpg" />
            <LazyLoadImage src="http://ww1.sinaLazyLoadImage.cn/mw690/62aad664jw1f2nxvyo52qj20u01hcqeq.jpg" />
            <LazyLoadImage src="http://ww2.sinaLazyLoadImage.cn/mw690/62aad664jw1f2nxvz2cj6j20u01hck1o.jpg" />
            <LazyLoadImage src="http://ww1.sinaLazyLoadImage.cn/mw690/62aad664jw1f2nxw0e1mlj20u01hcgvs.jpg" />
            <LazyLoadImage src="http://ww4.sinaLazyLoadImage.cn/mw690/62aad664jw1f2nxw0p95dj20u01hc7d8.jpg" />
            <LazyLoadImage src="http://ww2.sinaLazyLoadImage.cn/mw690/62aad664jw1f2nxw134xqj20u01hcqjg.jpg" />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default connect((state: any) => {
  const { demos } = state;

  return demos;
})(Demos);
