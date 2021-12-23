import { bindActionCreators } from 'redux';
import store from '@/store';
import * as t from './type';

// const detail = () => ({
//     type: t.DETAIL
// })

const detailSuccess = (data: any) => ({
  type: t.DETAIL_SUCCESS,
  payload: data
});

const chnageDetail = () => {
  return (dispatch: any, getState: any) => {
    dispatch({
      type: t.CHANGE_DETAIL,
      payload: 'changedDetail'
    });
  };
};

const requestDetail = () => {
  // 这里的dispatch和getState都是redux-thunk注入进来的
  // redux的dispatch只返回plain object，中间件会返回多样式数据包括异步
  return (dispatch: any, getState: any) => {
    console.log('dispatch-detail');
    setTimeout(() => {
      dispatch(detailSuccess({}));
    }, 2000);
  };
};

export default bindActionCreators(
  {
    requestDetail,
    chnageDetail
  },
  store.dispatch
);
