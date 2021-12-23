/*
一般情况下你可以直接在 Store 实例上调用 dispatch。如果你在 React 中使用 Redux，react-redux 会提供 dispatch 函数让你直接调用它 。
惟一会使用到 bindActionCreators 的场景是当你需要把 action creator 往下传到一个组件上，却不想让这个组件觉察到 Redux 的存在，
而且不希望把 dispatch 或 Redux store 传给它
// 注入dispatch的地方有：
    1、redux-thunk会向异步action直接注入dispatch和getState
    2、bindActionCreators会直接使用dispatch触发actionCreators
    3、react-redux会注入dispatch（待补充细节）
 */ 
import { bindActionCreators, ActionCreator, AnyAction } from 'redux';
import * as t from './type';
// import * as apis from '@/apis/mock';
import store from '@/store';


const getCrad: ActionCreator<AnyAction> = () => {
    return {
        type: t.GET_CARD
    }
}
// const getCradSuccess: ActionCreator<AnyAction> = (data: any) => {
//     return {
//         type: t.GET_CARD_SUCCESS,
//         payload: data
//     }
// }
// const getCradFailure: ActionCreator<AnyAction> = (err: any) => {
//     return {
//         type: t.GET_CARD_FAILURE,
//         payload: err
//     }
// }
const requestGetCard = () => {
    return (dispatch: any, getState: any) => {
        dispatch(getCrad());
        // return apis.getCard().then((res: any) => {
        //     if (res.code === 0) {
        //         dispatch(getCradSuccess(res.data));
        //         return res;
        //     }
        //     else {
        //         dispatch(getCradFailure(res));
        //         return Promise.reject(res);
        //     }
        // }).catch((err: any) => {
        //     dispatch(getCradFailure(err));
        //     return Promise.reject(err);
        // })
    }
}

const getCrad2: ActionCreator<AnyAction> = () => {
    return {
        type: t.GET_CARD2
    }
}
// const getCradSuccess2: ActionCreator<AnyAction> = (data: any) => {
//     return {
//         type: t.GET_CARD_SUCCESS2,
//         payload: data
//     }
// }
// const getCradFailure2: ActionCreator<AnyAction> = (err: any) => {
//     return {
//         type: t.GET_CARD_FAILURE2,
//         payload: err
//     }
// }
const requestGetCard2 = () => {
    return (dispatch: any, getState: any) => {
        dispatch(getCrad2());
        // return apis.getCard().then((res: any) => {
        //     if (res.code === 0) {
        //         dispatch(getCradSuccess(res.data));
        //         return res;
        //     }
        //     else {
        //         dispatch(getCradFailure(res));
        //         return Promise.reject(res);
        //     }
        // }).catch((err: any) => {
        //     dispatch(getCradFailure(err));
        //     return Promise.reject(err);
        // })
    }
}

const renderUI: ActionCreator<AnyAction> = () => {
    return {
        type: t.RENDER_UI
    }
}
// const renderUISuccess: ActionCreator<AnyAction> = (data: any) => {
//     return {
//         type: t.RENDER_UI_SUCCESS,
//         payload: data
//     }
// }
const renderDemoFn = () => {
    return renderDemo
}
export const renderDemo = {
    type: t.RENDER_UI,
    payload: 'demo'
}
// const renderUIFailure: ActionCreator<AnyAction> = (err: any) => {
//     return {
//         type: t.RENDER_UI_FAILURE,
//         payload: err
//     }
// }
// 异步action
const requestRenderData = () => {
    return (dispatch: any, getState: any) => {
        dispatch(renderUI());
        // return Promise.all([apis.getCard(), apis.getCard2()]).then((res: any) => {
        //     const [res1, res2] = res;
        //     if (res1.code === 0 && res2.code === 0) {
        //         dispatch(renderUISuccess(res));
        //         return res;
        //     }
        //     else {
        //         dispatch(renderUIFailure(res));
        //         return Promise.reject(res);
        //     }
        // }).catch((err: any) => {
        //     dispatch(renderUIFailure(err));
        //     return Promise.reject(err);
        // })
    }
}

export default bindActionCreators({
    requestRenderData,
    requestGetCard,
    requestGetCard2,
    renderDemoFn
}, store.dispatch);