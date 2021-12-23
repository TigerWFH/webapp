import {
    bindActionCreators,
    ActionCreator,
    AnyAction
} from "redux"
import store from "@/store"

import * as t from "./types"
// ------------------------------------------------------------------------------
const getItemSuccess: ActionCreator<AnyAction> = (data: any) => {
    return {
        type: t.GET_ITEM_SUCCESS,
        payload: data
    }
}
// const getItemFailure: ActionCreator<AnyAction> = (err: any) => {
//     return {
//         type: t.GET_ITEM_FAILURE,
//         payload: err
//     }
// }
const requestGetItems = (params: any, bFirst: boolean) => {
    return (dispatch: any, getState: any) => {
        dispatch(getItemSuccess({
            categoryId: params.categoryId
        }))
    }
}
// ------------------------------------------------------------------------------
const getHomePageSuccess: ActionCreator<AnyAction> = (data: any) => {
    return {
        type: t.GET_HOME_PAGE_SUCCESS,
        payload: data
    }
}
// const getHomePageFailure: ActionCreator<AnyAction> = (err: any) => {
//     return {
//         type: t.GET_HOME_PAGE_FAILURE,
//         payload: err
//     }
// }
const requestGetYdyMallHomePage: any = () => {
    return (dispatch: any, getState: any) => {
        dispatch(getHomePageSuccess({}))
        return Promise.resolve()
    }
}

export default bindActionCreators({
    requestGetYdyMallHomePage,
    requestGetItems
}, store.dispatch)