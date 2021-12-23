import {
    AnyAction,
    ActionCreator,
    bindActionCreators
} from "redux"
import * as t from "./types"
import store from "@/store"
/***************************************************************/ 
const getOrderInfoSuccess: ActionCreator<AnyAction> = (data: any) => {
    return {
        type: t.GET_ORDER_INFO_SUCCESS,
        payload: data
    }
}
const getOrderInfoFailure: ActionCreator<AnyAction> = (err: any) => {
    return {
        type: t.GET_ORDER_INFO_FAILURE,
        payload: err
    }
}
export const requestOrderInfo = (params: any) => {

}
/***************************************************************/ 
const getUserInfoSuccess: ActionCreator<AnyAction> = (data: any) => {
    return {
        type: t.GET_USER_INFO_SUCCESS,
        payload: data
    }
}
const getUserInfoFailure: ActionCreator<AnyAction> = (err: any) => {
    return {
        type: t.GET_USER_INFO_FAILURE,
        payload: err
    }
}
export const requestUserInfo = (params: any) => {

}

export default bindActionCreators({
    requestUserInfo,
    requestOrderInfo
}, store.dispatch)