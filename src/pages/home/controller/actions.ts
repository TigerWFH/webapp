import { bindActionCreators } from 'redux';
import * as t from './type';
// import * as apis from '@/apis/mock';
import store from '@/store';

export const changeCount = (data: any) => {
    return {
        type: t.CHANGE_COUNT,
        payload: data
    }
}
// 获取用户作者信息
const getAuthor = () => {
    return {
        type: t.GET_AUTHOR
    }
}
// const getAuthorSuccess = (data: any) => {
//     return {
//         type: t.GET_AUTHOR_SUCCESS,
//         payload: data
//     }
// }
// const getAuthorFailure = (err: any) => {
//     return {
//         type: t.GET_AUTHOR_FAILURE,
//         payload: err
//     }
// }
interface IInGetAuthor {
    pageSize: number;
    pageNo: number;
}

const requestGetAuthor = (params: IInGetAuthor) => {
    return (dispatch: any, getState: any) => {
        dispatch(getAuthor());
        // return apis.getAuthor().then((res) => {
        //     if (res.code === 0) {
        //         dispatch(getAuthorSuccess(res));
        //         // dispatch(getAuthorFailure(res));
        //         return res;
        //     }
        //     else {
        //         // 业务处理异常
        //         dispatch(getAuthorFailure(res));
        //         return Promise.reject();
        //     }
        // }).catch((err: any) => {
        //     // 其它异常
        //     dispatch(getAuthorFailure(err));
        //     return Promise.reject(err);
        // })
    }
}
// 获取文章列表
const getArticleList = () => {
    return {
        type: t.GET_ARTICLE_LIST
    }
}
// const getArticleListSuccess = (data: any) => {
//     return {
//         type: t.GET_ARTICLE_LIST_SUCCESS,
//         payload: data
//     }
// }
// const getArticleListFailure = (err: any) => {
//     return {
//         type: t.GET_ARTICLE_LIST_FAILURE,
//         payload: err
//     }
// }
interface IArticleList {
    pageSize: number;
    pageNo: number;
}
const requestGetArticleList = (params: IArticleList) => {
    return (dispatch: any, getState: any) => {
        dispatch(getArticleList());
        // return apis.getArticleList().then((res) => {
        //     if (res.code === 0) {
        //         dispatch(getArticleListSuccess(res.data));
        //         return res;
        //     }
        //     else {
        //         dispatch(getArticleListFailure(res));
        //         return Promise.reject(res);
        //     }
        // }).catch((err) => {
        //     dispatch(getArticleListFailure(err));
        //     return Promise.reject(err);
        // })
    }
}
export default bindActionCreators({
    requestGetArticleList,
    requestGetAuthor
}, store.dispatch)