import * as t from './type';
/*
    页面展示分为三种：
    1、初始Loading状态@@INITIAL
    2、接口或业务异常的Error状态@@FAILURE
    3、业务正常处理状态@@SUCCESS
    *****XXXXXX**********
    场景一：单接口决定UI渲染
    场景二：多接口决定UI渲染
        1、多接口具有时序性决定UI渲染
        2、多接口没有时序性，且任一个返回数据就可以渲染UI数据
        3、多接口没有时序性，且必须所有数据全部返回才可以渲染UI数据(可以考虑用Promise.all处理)
    Promise.race
    Promise.all所有接口都返回
 */
const MOCK_BANNER_LIST = [
  {
    key: 1,
    image: 'http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvyo52qj20u01hcqeq.jpg',
    url: 'http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvyo52qj20u01hcqeq.jpg'
  },
  {
    key: 2,
    image:
      'https://img-blog.csdnimg.cn/20201014180756925.png?x-oss-process=image/resize,m_fixed,h_64,w_64',
    url: 'https://img-blog.csdnimg.cn/20201014180756925.png?x-oss-process=image/resize,m_fixed,h_64,w_64'
  },
  {
    key: 3,
    image: 'http://ww3.sinaimg.cn/mw690/62aad664jw1f2nxvya0u2j20u01hc16p.jpg',
    url: 'http://ww3.sinaimg.cn/mw690/62aad664jw1f2nxvya0u2j20u01hc16p.jpg'
  },
  {
    key: 4,
    image: 'http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvzfjv6j20u01hc496.jpg',
    url: 'http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvzfjv6j20u01hc496.jpg'
  },
  {
    key: 5,
    image: 'http://ww3.sinaimg.cn/mw690/62aad664jw1f2nxvya0u2j20u01hc16p.jpg',
    url: 'http://ww3.sinaimg.cn/mw690/62aad664jw1f2nxvya0u2j20u01hc16p.jpg'
  }
];
export interface IHomeState {
  renderStatus: t.API_STATUS;
  bannerList: any[];
}
export const initialHomeState: IHomeState = {
  renderStatus: t.API_STATUS.INITIAL,
  bannerList: MOCK_BANNER_LIST
};

// reducer中的state就是对应的initialHomeState，此处没有必要设默认值
/* dispatch会将store中initialState透传给对应的reducer中的state，并代替reducer中的state默认值 */
export default function reducers(state: any = {}, action: any) {
  switch (action.type) {
    case t.GET_AUTHOR:
      return {
        ...state,
        renderStatus: t.API_STATUS.INITIAL
      };
    case t.GET_AUTHOR_SUCCESS:
      return {
        ...state,
        renderStatus: t.API_STATUS.SUCCESS
      };
    case t.GET_AUTHOR_FAILURE:
      return {
        ...state,
        renderStatus: t.API_STATUS.FAILURE
      };
    case t.GET_ARTICLE_LIST:
      return {
        ...state
      };
    case t.GET_ARTICLE_LIST_SUCCESS:
      return {
        ...state
      };
    case t.GET_ARTICLE_LIST_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
}
